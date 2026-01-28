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
                            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="headerCapGradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#2dd4bf" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                    <linearGradient id="headerGlassEffect" x1="16" y1="6" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                                    </linearGradient>
                                    <filter id="headerGlow" x="-2" y="-2" width="36" height="36" filterUnits="userSpaceOnUse">
                                        <feGaussianBlur stdDeviation="1" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                <path d="M7 16V20C7 22.2091 11.0294 24 16 24C20.9706 24 25 22.2091 25 20V16" stroke="url(#headerCapGradient)" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M8 17V19.5C8 20.8807 11.5817 22 16 22C20.4183 22 24 20.8807 24 19.5V17" stroke="#0f172a" strokeOpacity="0.1" strokeWidth="1.5" />
                                <path d="M16 5L28 12L16 19L4 12L16 5Z" fill="url(#headerCapGradient)" />
                                <path d="M16 6L26.5 12L16 18L5.5 12L16 6Z" fill="url(#headerGlassEffect)" />
                                <path d="M16 5L28 12L16 19L4 12L16 5Z" stroke="white" strokeOpacity="0.2" strokeWidth="0.5" />
                                <path d="M28 12V19" stroke="url(#headerCapGradient)" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="28" cy="20" r="1.5" fill="url(#headerCapGradient)" filter="url(#headerGlow)" />
                            </svg>
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
