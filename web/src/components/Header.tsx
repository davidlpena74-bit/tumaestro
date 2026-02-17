'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { User as UserIcon, CaretDown, Check, SignOut, Bell, List, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

type Notification = {
    id: string;
    type: 'connection_request' | 'connection_accepted';
    title: string;
    message: string;
    data: any;
    read: boolean;
    created_at: string;
};

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Notifications state
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifMenuOpen, setNotifMenuOpen] = useState(false);

    // Refs for click outside
    const langMenuRef = useRef<HTMLDivElement>(null);
    const notifMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Global click-outside listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (langMenuOpen && langMenuRef.current && !langMenuRef.current.contains(target)) {
                setLangMenuOpen(false);
            }
            if (notifMenuOpen && notifMenuRef.current && !notifMenuRef.current.contains(target)) {
                setNotifMenuOpen(false);
            }
            if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [langMenuOpen, notifMenuOpen, userMenuOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check active session
        const checkUser = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                const currentUser = session?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    fetchNotifications(currentUser.id);
                    // Fetch profile for role
                    const { data: p } = await supabase.from('profiles').select('role').eq('id', currentUser.id).single();
                    if (p) setProfile(p);
                }
            } catch (err: any) {
                console.warn("Supabase auth session error (expected if token expired):", err.message);
                if (err.message?.includes('Refresh Token Not Found')) {
                    // Force sign out to clear local storage if token is corrupted
                    await supabase.auth.signOut();
                    setUser(null);
                    setProfile(null);
                }
            }
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchNotifications(currentUser.id);
                // Fetch profile for role
                const { data: p } = await supabase.from('profiles').select('role').eq('id', currentUser.id).single();
                if (p) setProfile(p);
            } else {
                setNotifications([]);
                setProfile(null);
            }
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    // Dedicated effect for Realtime Notifications
    useEffect(() => {
        if (!user?.id) return;

        const realtimeChannel = supabase
            .channel(`notifs-${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications',
                    filter: `user_id=eq.${user.id}`
                },
                () => {
                    fetchNotifications(user.id);
                }
            )
            .subscribe();

        return () => {
            if (realtimeChannel) realtimeChannel.unsubscribe();
        };
    }, [user?.id]);

    // Listen for local updates triggers (optimistic and refresh)
    useEffect(() => {
        const handleRefresh = () => {
            if (user?.id) fetchNotifications(user.id);
        };

        const handleProcessed = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail && typeof customEvent.detail.countChange === 'number') {
                setUnreadCount(prev => Math.max(0, prev + customEvent.detail.countChange));
            }
            // Also fetch to be sure
            if (user?.id) fetchNotifications(user.id);
        };

        window.addEventListener('notification-updated', handleRefresh);
        window.addEventListener('notification-processed', handleProcessed);

        return () => {
            window.removeEventListener('notification-updated', handleRefresh);
            window.removeEventListener('notification-processed', handleProcessed);
        };
    }, [user?.id]);

    const fetchNotifications = async (userId: string) => {
        // Fetch last 20 for the list
        const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(20);

        // Fetch actual total unread count (not just from the top 20)
        // using a robust filter for read=false OR read=null
        const { count } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('user_id', userId)
            // Fix: Explicitly check for read=false. 'or' syntax can be tricky with types if read can be null.
            // But normally boolean is false.
            .eq('read', false);

        if (data) {
            setNotifications(data as Notification[]);

            // Calculate unread from the loaded list to use as a minimum fallback
            const unreadInList = data.filter(n => !n.read).length;

            // Use server count if available, otherwise fallback to list count
            // Also ensure we don't show 0 if we see unread items in the list
            setUnreadCount(count !== null ? Math.max(count, unreadInList) : unreadInList);
        } else if (count !== null) {
            setUnreadCount(count);
        }
    };

    const markAsRead = async (id: string) => {
        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));

        const { error } = await supabase.rpc('mark_notification_read', { notif_id: id });

        if (error) {
            // Fallback to direct update
            await supabase.from('notifications')
                .update({ read: true })
                .eq('id', id)
                .eq('user_id', user?.id);
        }
    };


    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserMenuOpen(false);
        window.location.href = '/';
    };

    const pathname = usePathname();

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="relative flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="relative">
                            <img
                                src="/images/icons/logo-text-brush.png"
                                alt="TuMaestro.es"
                                className="h-32 w-auto object-contain drop-shadow-md -my-10"
                            />
                        </div>
                    </Link>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/clases"
                        className={`hidden md:flex flex-col items-center gap-1 transition-all text-sm group ${pathname.startsWith('/clases') ? 'text-white font-black' : 'text-white/80 hover:text-white font-medium'}`}
                    >
                        <span>{t.header.teachers}</span>
                        <motion.div
                            className={`h-0.5 bg-white rounded-full transition-all ${pathname.startsWith('/clases') ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
                        />
                    </Link>
                    <Link
                        href="/material"
                        className={`hidden md:flex flex-col items-center gap-1 transition-all text-sm group ${pathname.startsWith('/material') ? 'text-white font-black' : 'text-white/80 hover:text-white font-medium'}`}
                    >
                        <span>{t.header.resources}</span>
                        <motion.div
                            className={`h-0.5 bg-white rounded-full transition-all ${pathname.startsWith('/material') ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
                        />
                    </Link>
                    <Link
                        href="/juegos"
                        className={`hidden md:flex flex-col items-center gap-1 transition-all text-sm group ${pathname.startsWith('/juegos') ? 'text-white font-black' : 'text-white/80 hover:text-white font-medium'}`}
                    >
                        <span>{t.header.games}</span>
                        <motion.div
                            className={`h-0.5 bg-white rounded-full transition-all ${pathname.startsWith('/juegos') ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
                        />
                    </Link>
                    <Link
                        href="/actividades"
                        className={`hidden md:flex flex-col items-center gap-1 transition-all text-sm group ${pathname.startsWith('/actividades') ? 'text-white font-black' : 'text-white/80 hover:text-white font-medium'}`}
                    >
                        <span>{t.header.activities}</span>
                        <motion.div
                            className={`h-0.5 bg-white rounded-full transition-all ${pathname.startsWith('/actividades') ? 'w-full' : 'w-0 group-hover:w-1/2'}`}
                        />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex md:hidden items-center justify-center p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                    >
                        {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
                    </button>

                    {/* Language Selector Dropdown */}
                    <div className="relative" ref={langMenuRef}>
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 pl-2.5 pr-2.5 py-1.5 rounded-full text-sm font-bold text-white transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src={
                                        language === 'es' ? 'https://flagcdn.com/es.svg' :
                                            language === 'en' ? 'https://flagcdn.com/gb.svg' :
                                                language === 'fr' ? 'https://flagcdn.com/fr.svg' :
                                                    'https://flagcdn.com/de.svg'
                                    }
                                    className="w-5 h-4 object-cover rounded-sm shadow-sm"
                                    alt={language}
                                />
                                <span>
                                    {
                                        language === 'es' ? 'Español' :
                                            language === 'en' ? 'English' :
                                                language === 'fr' ? 'Français' :
                                                    'Deutsch'
                                    }
                                </span>
                            </span>
                            <CaretDown className={`w-3 h-3 text-white/50 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} weight="bold" />
                        </button>

                        <AnimatePresence>
                            {langMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-40 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50"
                                >
                                    <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        {language === 'es' ? 'Idioma' : language === 'fr' ? 'Langue' : language === 'de' ? 'Sprache' : 'Language'}
                                    </div>

                                    {[
                                        { code: 'es', label: 'Español', flag: 'es.svg' },
                                        { code: 'en', label: 'English', flag: 'gb.svg' },
                                        { code: 'fr', label: 'Français', flag: 'fr.svg' },
                                        { code: 'de', label: 'Deutsch', flag: 'de.svg' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code as any); setLangMenuOpen(false); }}
                                            className={`w-full text-left px-2.5 py-1.5 text-sm font-medium flex items-center justify-between hover:bg-white/5 transition-colors ${language === lang.code ? 'text-teal-400 bg-teal-500/10' : 'text-white'}`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <img src={`https://flagcdn.com/${lang.flag}`} className="w-5 h-4 object-cover rounded-sm" alt={lang.code.toUpperCase()} />
                                                {lang.label}
                                            </span>
                                            {language === lang.code && <Check className="w-3 h-3" weight="bold" />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Notifications Bell */}
                    {user && (
                        <div className="relative" ref={notifMenuRef}>
                            <button
                                onClick={() => {
                                    setNotifMenuOpen(!notifMenuOpen);
                                    if (!notifMenuOpen && user?.id) fetchNotifications(user.id);
                                }}
                                className="relative flex items-center gap-1 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                            >
                                <div className="relative">
                                    <Bell size={24} weight={unreadCount > 0 ? "fill" : "regular"} />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 pointer-events-none">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                        </span>
                                    )}
                                </div>
                                <CaretDown className={`w-3 h-3 text-white/50 transition-transform ${notifMenuOpen ? 'rotate-180' : ''}`} weight="bold" />
                            </button>

                            <AnimatePresence>
                                {notifMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl overflow-hidden py-1 z-50 border border-slate-100"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                            <span className="font-bold text-slate-800 text-sm">Notificaciones</span>
                                            {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{unreadCount} nuevas</span>}
                                        </div>
                                        <div className="max-h-[350px] overflow-y-auto">
                                            {notifications.filter(n => !n.read).length === 0 ? (
                                                <div className="px-4 py-12 text-center">
                                                    <Bell size={32} className="mx-auto text-slate-200 mb-2" weight="duotone" />
                                                    <p className="text-slate-400 text-xs">No tienes notificaciones nuevas</p>
                                                </div>
                                            ) : (
                                                notifications
                                                    .filter(n => !n.read)
                                                    .map(n => (
                                                        <Link
                                                            key={n.id}
                                                            href="/notificaciones"
                                                            onClick={() => setNotifMenuOpen(false)}
                                                            className="block relative px-4 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors bg-blue-50/40"
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <p className="font-bold text-slate-800 text-sm leading-tight uppercase tracking-tight">{n.title}</p>
                                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                                            </div>
                                                            <p className="text-slate-500 text-xs leading-relaxed">{n.message}</p>
                                                            <p className="text-[10px] text-slate-400 mt-2">{new Date(n.created_at).toLocaleString()}</p>
                                                        </Link>
                                                    ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Auth Section */}
                    {user ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-white pl-2 pr-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-lg group"
                            >
                                <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-xs font-black text-white uppercase">
                                    {user.email?.[0] || 'U'}
                                </div>
                                <span className="max-w-[100px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                                <CaretDown className={`w-3 h-3 text-white/50 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} weight="bold" />
                            </button>

                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="pt-3 pb-0.5 flex justify-center">
                                            <span className="px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-teal-500 text-white border border-teal-400 shadow-sm">
                                                {(profile?.role || user.user_metadata?.role) === 'teacher' ? (language === 'es' ? 'Profesor' : 'Teacher') : (language === 'es' ? 'Alumno' : 'Student')}
                                            </span>
                                        </div>

                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5 text-center">Conectado como</p>
                                            <p className="text-xs font-bold text-white truncate text-center">{user.email}</p>
                                        </div>

                                        <div className="py-1">
                                            <Link
                                                href="/perfil"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                                            >
                                                <UserIcon size={16} weight="bold" />
                                                Mi Perfil
                                            </Link>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Mi Panel
                                            </Link>
                                            <Link
                                                href="/notificaciones"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 flex items-center gap-2 transition-colors"
                                            >
                                                <Bell size={16} weight="bold" />
                                                Notificaciones
                                            </Link>
                                        </div>

                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
                                            >
                                                <SignOut size={16} weight="bold" />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:from-white hover:to-white hover:text-teal-900 transition-all shadow-lg group"
                        >
                            <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" weight="bold" />
                            <span>{t.header.login}</span>
                        </button>
                    )}
                </div>
            </div>

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-2xl flex flex-col p-8 pt-24 md:hidden"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 text-white"
                        >
                            <X size={32} weight="bold" />
                        </button>

                        <div className="flex flex-col gap-6 items-center w-full">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full"
                            >
                                <img
                                    src="/images/icons/logo-text-brush.png"
                                    alt="TuMaestro.es"
                                    className="h-24 w-auto object-contain mx-auto mb-8"
                                />
                            </Link>

                            <Link
                                href="/clases"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-full text-center py-4 rounded-2xl border transition-all text-xl font-black ${pathname.startsWith('/clases') ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                {t.header.teachers}
                            </Link>
                            <Link
                                href="/material"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-full text-center py-4 rounded-2xl border transition-all text-xl font-black ${pathname.startsWith('/material') ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                {t.header.resources}
                            </Link>
                            <Link
                                href="/juegos"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-full text-center py-4 rounded-2xl border transition-all text-xl font-black ${pathname.startsWith('/juegos') ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                {t.header.games}
                            </Link>
                            <Link
                                href="/actividades"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`w-full text-center py-4 rounded-2xl border transition-all text-xl font-black ${pathname.startsWith('/actividades') ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10'}`}
                            >
                                {t.header.activities}
                            </Link>

                            <div className="mt-8 flex flex-col items-center gap-4 w-full">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t.header.language || 'Language'}</div>
                                <div className="flex gap-4">
                                    {[
                                        { code: 'es', flag: 'es.svg' },
                                        { code: 'en', flag: 'gb.svg' },
                                        { code: 'fr', flag: 'fr.svg' },
                                        { code: 'de', flag: 'de.svg' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { setLanguage(lang.code as any); setMobileMenuOpen(false); }}
                                            className={`p-2 rounded-xl border transition-all ${language === lang.code ? 'bg-teal-500/20 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-white/5 border-white/10'}`}
                                        >
                                            <img src={`https://flagcdn.com/${lang.flag}`} className="w-8 h-6 object-cover rounded shadow-sm" alt={lang.code} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {!user && (
                                <button
                                    onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                                    className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black text-xl shadow-xl shadow-teal-500/20"
                                >
                                    {t.header.login}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
