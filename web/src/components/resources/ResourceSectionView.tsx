'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';

interface ResourceSectionViewProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    showComingSoon?: boolean;
}

export default function ResourceSectionView({ title, subtitle, children, showComingSoon = true }: ResourceSectionViewProps) {
    const { t } = useLanguage();

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <Link
                    href="/recursos"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white/40 px-4 py-2 rounded-2xl border border-slate-200"
                >
                    <ArrowLeft weight="bold" /> {t.resources.backToLibrary}
                </Link>
            </div>

            <header className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight uppercase leading-tight">
                    {title}
                </h2>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </header>

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
