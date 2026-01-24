'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Globe, CaretDown, Check } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on click outside could be added here, but simple toggle is enough for now.

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <Link href="/" className="relative flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="flex items-center gap-2">
                        <div className="text-teal-300 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 8l11 6 9-4.91V17h2V9L12 2zm0 2.18l7.27 3.96L12 12.13 4.73 8.16 12 4.18zM3.82 10.36l1.45.8v4.91c0 1.99 3.03 3.6 6.73 3.6s6.73-1.61 6.73-3.6v-4.91l1.45-.8V16c0 2.87-3.9 5-8.18 5s-8.18-2.13-8.18-5v-5.64z" /></svg>
                        </div>
                        <div className="text-white font-bold text-2xl tracking-tighter drop-shadow-md">
                            TuMaestro<span className="text-teal-300">.es</span>
                        </div>
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

                    <button className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:from-white hover:to-white hover:text-teal-900 transition-all shadow-lg group">
                        <User className="w-4 h-4 group-hover:scale-110 transition-transform" weight="bold" />
                        <span>{t.header.login}</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
