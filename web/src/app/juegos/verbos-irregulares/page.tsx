'use client';

import IrregularVerbsGame from '@/components/games/IrregularVerbsGame';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IrregularVerbsGamePage() {
    return (
        <main className="min-h-screen bg-transparent pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/juegos"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Verbos Irregulares</h1>
                        <p className="text-slate-400">Pon a prueba tu conocimiento de los verbos irregulares en inglés.</p>
                    </div>
                </div>

                <IrregularVerbsGame />
            </div>
        </main>
    );
}
