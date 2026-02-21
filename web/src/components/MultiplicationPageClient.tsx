'use client';

import MultiplicationGame from '@/components/games/MultiplicationGame';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function MultiplicationPageClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();

    return (
        <PhysicalGameLayout
            title={t.gamesPage.multiplicationGame.title}
            description={t.gamesPage.multiplicationGame.description}
            colorTheme="blue"
            activityId="multiplicaciones"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <MultiplicationGame taskId={taskId} activityId="multiplicaciones" />
            </motion.div>

            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-16 grid md:grid-cols-3 gap-8 pb-12"
            >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">1</div>
                    <h3 className="text-slate-800 font-bold text-lg mb-2">Dibuja Líneas</h3>
                    <p className="text-slate-600 text-sm">Representamos cada número con un conjunto de líneas paralelas.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 text-pink-600 font-bold text-xl">2</div>
                    <h3 className="text-slate-800 font-bold text-lg mb-2">Cruza los Factores</h3>
                    <p className="text-slate-600 text-sm">Cruzamos las líneas de ambos números para ver las intersecciones.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">3</div>
                    <h3 className="text-slate-800 font-bold text-lg mb-2">Cuenta los Puntos</h3>
                    <p className="text-slate-600 text-sm">El número total de puntos donde se cruzan las líneas es el resultado.</p>
                </div>
            </motion.div>
        </PhysicalGameLayout>
    );
}

