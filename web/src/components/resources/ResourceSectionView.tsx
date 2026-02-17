'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

interface ResourceSectionViewProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    showComingSoon?: boolean;
}

export default function ResourceSectionView({ title, subtitle, children, showComingSoon = true }: ResourceSectionViewProps) {
    const { t } = useLanguage();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto p-0 relative z-10">
            <div className="p-0 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="relative flex items-center">
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onClick={() => window.location.href = '/material'}
                                className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-amber-600 hover:border-amber-100 transition-all z-20 cursor-pointer"
                            >
                                <ArrowLeft size={20} weight="bold" />
                                <AnimatePresence>
                                    {tooltipOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50"
                                        >
                                            {t.resources.backToLibrary}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>

                    <header className="text-center mb-12 -mt-24">
                        <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight uppercase leading-tight">
                            {title}
                        </h2>
                        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-8">
                            {subtitle}
                        </p>
                    </header>
                </div>
            </div>

            {/* Injected Content */}
            <div className="mb-20">
                {children}
            </div>

            {/* Empty State / Coming Soon */}
            {showComingSoon && (
                <section className="w-full max-w-4xl mx-auto mb-12">
                    <div className="bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group border-dashed">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10"
                        >
                            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <BookOpen className="w-12 h-12 text-slate-400" weight="duotone" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">
                                {t.resources.comingSoon}
                            </h3>
                            <p className="text-lg text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                                {t.resources.comingSoonDesc}
                            </p>
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-200/20 rounded-full blur-3xl" />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-slate-200/20 rounded-full blur-3xl" />
                    </div>
                </section>
            )}
        </div>
    );
}
