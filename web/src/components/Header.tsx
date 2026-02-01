'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { User as UserIcon, Globe, CaretDown, Check, SignOut } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Check active session
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserMenuOpen(false);
        window.location.reload();
    };

    // Close menu on click outside could be added here, but simple toggle is enough for now.

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <Link href="/" className="relative flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="relative">
                        <img
                            src="/images/icons/logo-text-brush.png"
                            alt="TuMaestro.es"
                            className="h-32 w-auto object-contain drop-shadow-md -my-10"
                        />
                    </div>
                </Link>

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
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 pl-3 pr-3 py-2 rounded-full text-sm font-bold text-white transition-all min-w-[130px]"
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src={language === 'es' ? 'https://flagcdn.com/es.svg' : 'https://flagcdn.com/us.svg'}
                                    className="w-5 h-4 object-cover rounded-sm shadow-sm"
                                    alt={language === 'es' ? 'Español' : 'English'}
                                />
                                <span>{language === 'es' ? 'Español' : 'English'}</span>
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
                                        {language === 'es' ? 'Idioma' : 'Language'}
                                    </div>
                                    <button
                                        onClick={() => { setLanguage('es'); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between hover:bg-white/5 transition-colors ${language === 'es' ? 'text-teal-400 bg-teal-500/10' : 'text-white'}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <img src="https://flagcdn.com/es.svg" className="w-5 h-4 object-cover rounded-sm" alt="ES" />
                                            Español
                                        </span>
                                        {language === 'es' && <Check className="w-4 h-4" weight="bold" />}
                                    </button>
                                    <button
                                        onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between hover:bg-white/5 transition-colors ${language === 'en' ? 'text-teal-400 bg-teal-500/10' : 'text-white'}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <img src="https://flagcdn.com/us.svg" className="w-5 h-4 object-cover rounded-sm" alt="EN" />
                                            English
                                        </span>
                                        {language === 'en' && <Check className="w-4 h-4" weight="bold" />}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

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
                                        className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50"
                                    >
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-xs text-slate-400 font-semibold">Conectado como</p>
                                            <p className="text-sm font-bold text-white truncate">{user.email}</p>
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
                        <Link href="/login" className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:from-white hover:to-white hover:text-teal-900 transition-all shadow-lg group">
                            <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" weight="bold" />
                            <span>{t.header.login}</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
