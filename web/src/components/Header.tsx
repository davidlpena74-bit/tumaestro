'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { User as UserIcon, CaretDown, Check, SignOut, Bell } from '@phosphor-icons/react';
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
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    // Notifications state
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifMenuOpen, setNotifMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check active session
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchNotifications(currentUser.id);
            }
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchNotifications(currentUser.id);
            } else {
                setNotifications([]);
            }
        });

        // Optional: Polling for notifications every 30s
        const interval = setInterval(() => {
            if (user) fetchNotifications(user.id);
        }, 30000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
            clearInterval(interval);
        };
    }, [user?.id]); // Re-run if user ID changes

    const fetchNotifications = async (userId: string) => {
        const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(10);

        if (data) {
            setNotifications(data as Notification[]);
            setUnreadCount(data.filter((n: any) => !n.read).length);
        }
    };

    const markAsRead = async (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        await supabase.from('notifications').update({ read: true }).eq('id', id);
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const handleAcceptRequest = async (notification: Notification, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) return;

        // Verify it's a connection request
        if (notification.type === 'connection_request') {
            // Get teacher_id from data (it was stored as teacher_id in RoleBasedDashboard)
            // Fallback to sender_id just in case, though teacher_id is the standard now
            const teacher_id = notification.data?.teacher_id || notification.data?.sender_id;
            const class_id = notification.data?.class_id;

            if (!teacher_id) {
                console.error("No teacher_id found in notification data", notification);
                return;
            }

            // 1. Update status to accepted
            const { error: updateError } = await supabase
                .from('student_teachers')
                .update({ status: 'accepted' })
                .eq('student_id', user.id)
                .eq('teacher_id', teacher_id);

            if (!updateError) {
                // 2. If there was a class involved, add to class_students
                if (class_id) {
                    const { error: classError } = await supabase.from('class_students').insert({
                        class_id: class_id,
                        student_id: user.id
                    });

                    if (classError) console.error("Error adding to class:", classError);
                }

                // 3. Delete notification so it doesn't appear again
                const { error: deleteError } = await supabase.from('notifications').delete().eq('id', notification.id);

                if (deleteError) {
                    console.error("Error deleting notification:", deleteError);
                    // Optimistic update even if delete failed (for UI consistency)
                    setNotifications(prev => prev.filter(n => n.id !== notification.id));
                    setUnreadCount(prev => Math.max(0, prev - 1));
                    alert('¡Solicitud aceptada correctamente!');
                } else {
                    // Update local state by removing the notification
                    setNotifications(prev => prev.filter(n => n.id !== notification.id));
                    setUnreadCount(prev => Math.max(0, prev - 1));
                    alert('¡Solicitud aceptada correctamente!');
                }
            } else {
                console.error("Error accepting connection:", updateError);
                alert('Error al aceptar la solicitud: ' + updateError.message);
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserMenuOpen(false);
        window.location.href = '/';
    };

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
                <div className="flex items-center gap-4">
                    <Link href="/juegos" className="hidden md:block text-white/80 hover:text-teal-400 font-medium transition-colors text-sm">
                        {t.header.games}
                    </Link>
                    <Link href="/recursos" className="hidden md:block text-white/80 hover:text-teal-400 font-medium transition-colors text-sm">
                        {t.header.resources}
                    </Link>
                    <Link href="/profesores" className="hidden md:block text-white/80 hover:text-teal-400 font-medium transition-colors text-sm">
                        {t.header.teachers}
                    </Link>

                    {/* Language Selector Dropdown */}
                    <div className="relative">
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
                        <div className="relative">
                            <button
                                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                                className="relative p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                            >
                                <Bell size={24} weight="fill" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
                                )}
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
                                            {notifications.length === 0 ? (
                                                <div className="px-4 py-12 text-center">
                                                    <Bell size={32} className="mx-auto text-slate-200 mb-2" weight="duotone" />
                                                    <p className="text-slate-400 text-xs">No tienes notificaciones</p>
                                                </div>
                                            ) : (
                                                notifications.map(n => (
                                                    <div
                                                        key={n.id}
                                                        onClick={() => !n.read && markAsRead(n.id)}
                                                        className={`px-4 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/40' : ''}`}
                                                    >
                                                        <div className="flex justify-between items-start gap-2">
                                                            <div className="flex-1">
                                                                <p className="font-bold text-slate-800 text-sm leading-tight mb-1">{n.title}</p>
                                                                <p className="text-slate-500 text-xs leading-relaxed">{n.message}</p>
                                                                <p className="text-[10px] text-slate-400 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
                                                            </div>
                                                            {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                                                        </div>

                                                        {n.type === 'connection_request' && !n.read && (
                                                            <div className="mt-3 flex gap-2">
                                                                <button
                                                                    onClick={(e) => handleAcceptRequest(n, e)}
                                                                    className="flex-1 text-xs bg-slate-900 text-white px-3 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm"
                                                                >
                                                                    Aceptar
                                                                </button>
                                                                <button
                                                                    onClick={(e) => markAsRead(n.id, e)}
                                                                    className="flex-1 text-xs bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors"
                                                                >
                                                                    Ignorar
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
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
                        <div className="relative">
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
                                        className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50"
                                    >
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conectado como</p>
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${user.user_metadata?.role === 'teacher'
                                                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/20'
                                                    : 'bg-teal-500/20 text-teal-400 border-teal-500/20'
                                                    }`}>
                                                    {user.user_metadata?.role === 'teacher' ? (language === 'es' ? 'Profesor' : 'Teacher') : (language === 'es' ? 'Alumno' : 'Student')}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-white truncate">{user.email}</p>
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
        </header>
    );
}
