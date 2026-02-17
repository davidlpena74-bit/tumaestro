'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PlantCellGame from '@/components/games/PlantCellGame';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';

export default function PlantCellPage() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                {/* Visual Glows (Template consistency) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="px-4 md:px-8">
                        <Link href="/actividades" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-6">
                            <ArrowLeft className="w-4 h-4" /> {t.common.back} a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                            {t.gamesPage.gameTitles.plantCell} 🌿
                        </h1>
                        <p className="text-slate-700 font-medium text-lg mb-8 leading-relaxed max-w-3xl">
                            {t.gamesPage.gameTitles.plantCellDesc}. Arrastra cada etiqueta para conectarla con su ubicación correspondiente en el modelo interactivo de la célula vegetal.
                        </p>
                    </div>

                    <PlantCellGame taskId={taskId} />
                </div>
            </main>
        </div>
    );
}
