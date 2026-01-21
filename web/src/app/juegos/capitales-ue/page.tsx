'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EU_MEMBERS_LIST } from '@/components/games/data/capitals-data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EUCapitalsMapPage() {
    return (
        <main className="min-h-screen bg-transparent pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/juegos"
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Capitales de la UE</h1>
                        <p className="text-slate-400">Ubica en el mapa el país correspondiente a la capital (Mapa Interactivo).</p>
                    </div>
                </div>

                <CapitalGame
                    paths={EUROPE_PATHS}
                    targetList={EU_MEMBERS_LIST}
                    title="Capitales de la UE"
                />
            </div>
        </main>
    );
}
