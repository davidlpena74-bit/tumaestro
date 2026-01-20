'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';

export default function EuropeCapitalsPage() {
    return (
        <main className="min-h-screen bg-[#0f172a] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-2">Capitales de Europa</h1>
                    <p className="text-slate-400">Ubica en el mapa el país correspondiente a cada capital.</p>
                </header>
                <CapitalGame
                    paths={EUROPE_PATHS}
                    title="Capitales de Europa"
                />
            </div>
        </main>
    );
}
