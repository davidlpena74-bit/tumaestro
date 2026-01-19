'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <Link href="/" className="relative flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="flex items-center gap-2">
                        <div className="text-teal-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 8l11 6 9-4.91V17h2V9L12 2zm0 2.18l7.27 3.96L12 12.13 4.73 8.16 12 4.18zM3.82 10.36l1.45.8v4.91c0 1.99 3.03 3.6 6.73 3.6s6.73-1.61 6.73-3.6v-4.91l1.45-.8V16c0 2.87-3.9 5-8.18 5s-8.18-2.13-8.18-5v-5.64z" /></svg>
                        </div>
                        <div className="text-white font-bold text-2xl tracking-tighter drop-shadow-md">
                            TuMaestro<span className="text-teal-400">.es</span>
                        </div>
                    </div>
                </Link>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                    <Link href="/juegos" className="hidden md:block text-white/80 hover:text-teal-400 font-medium transition-colors text-sm">
                        Juegos
                    </Link>
                    <Link href="/recursos" className="hidden md:block text-white/80 hover:text-teal-400 font-medium transition-colors text-sm">
                        Recursos
                    </Link>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:from-white hover:to-white hover:text-teal-900 transition-all shadow-lg group">
                        <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Acceso Usuarios</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
