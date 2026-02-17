'use client';

import QuizGame from '@/components/games/QuizGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function QuizCulturaClient() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');
    return (
        <main className="min-h-screen bg-transparent text-white pt-24 pb-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/actividades" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Volver a Actividades
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                        Desafío de Conocimiento
                    </h1>
                    <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                        Pon a prueba tu cultura general con este quiz rápido. ¿Podrás acertar todas?
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-1 md:p-8 border border-white/10 shadow-2xl">
                    <QuizGame taskId={taskId} />
                </div>
            </div>
        </main>
    );
}
