'use client';

import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import MultiplicationGame from '@/components/games/MultiplicationGame';
import ContentWrapper from '@/components/ContentWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function MultiplicationPageClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();

    return (
        <main className="min-h-screen">
            <Header />
            <PageBackground />

            <ContentWrapper className="pt-24 pb-12 relative z-10">
                <div className="mb-8">
                    <Link
                        href="/actividades"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>{t.common.back}</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight uppercase">
                                {t.gamesPage.multiplicationGame.title}
                            </h1>
                            <p className="text-xl text-blue-300 font-medium max-w-2xl">
                                {t.gamesPage.multiplicationGame.description}
                            </p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <MultiplicationGame taskId={taskId} />
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 grid md:grid-cols-3 gap-8"
                >
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 font-bold text-xl">1</div>
                        <h3 className="text-white font-bold text-lg mb-2">Dibuja Líneas</h3>
                        <p className="text-gray-400 text-sm">Representamos cada número con un conjunto de líneas paralelas.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4 text-pink-400 font-bold text-xl">2</div>
                        <h3 className="text-white font-bold text-lg mb-2">Cruza los Factores</h3>
                        <p className="text-gray-400 text-sm">Cruzamos las líneas de ambos números para ver las intersecciones.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 text-emerald-400 font-bold text-xl">3</div>
                        <h3 className="text-white font-bold text-lg mb-2">Cuenta los Puntos</h3>
                        <p className="text-gray-400 text-sm">El número total de puntos donde se cruzan las líneas es el resultado.</p>
                    </div>
                </motion.div>
            </ContentWrapper>
        </main>
    );
}
