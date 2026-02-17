
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

interface PhysicalGameLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    colorTheme?: 'emerald' | 'blue' | 'teal';
}

export default function PhysicalGameLayout({
    title,
    description,
    children,
    colorTheme = 'emerald'
}: PhysicalGameLayoutProps) {
    const { t } = useLanguage();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const themeColors = {
        emerald: 'bg-emerald-500/10 bg-teal-600/10',
        blue: 'bg-blue-500/10 bg-cyan-600/10',
        teal: 'bg-teal-500/10 bg-emerald-600/10'
    };

    const gradientClasses = themeColors[colorTheme as keyof typeof themeColors] || themeColors.emerald;
    const [color1, color2] = gradientClasses.split(' ');

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${color1} rounded-full blur-[100px]`} />
                    <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] ${color2} rounded-full blur-[100px]`} />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    <div className="px-4">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="relative w-fit flex-shrink-0">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onMouseEnter={() => setTooltipOpen(true)}
                                    onMouseLeave={() => setTooltipOpen(false)}
                                    onClick={() => window.location.href = '/actividades'}
                                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all z-20 cursor-pointer"
                                >
                                    <ArrowLeft size={24} weight="bold" />
                                    <AnimatePresence>
                                        {tooltipOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-[10px] font-black rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50 uppercase tracking-wider border border-white/10"
                                            >
                                                Volver a Actividades
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                                {title}
                            </h1>
                        </div>
                        <p className="text-slate-700 font-medium text-lg mb-8 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
}
