'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EuropeCapitalsMapPage() {
    return (
        <main className="min-h-screen bg-[#0f172a] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/juegos"
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Capitales de Europa</h1>
                        <p className="text-slate-400">Ubica en el mapa todos los países de Europa (Mapa Interactivo).</p>
                    </div>
                </div>

                <CapitalGame
                    paths={EUROPE_PATHS}
                    title="Capitales de Europa"
                />
            </div>
        </main>
    );
}
