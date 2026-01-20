'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EU_PATHS } from '@/components/games/data/eu-paths';
import { EU_MEMBERS_LIST } from '@/components/games/data/capitals-data';

export default function EUCapitalsPage() {
    return (
        <main className="min-h-screen bg-[#0f172a] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white mb-2">Capitales de la Unión Europea</h1>
                    <p className="text-slate-400">¿Conoces las capitales de los 27 estados miembros?</p>
                </header>
                <CapitalGame
                    paths={EU_PATHS}
                    targetList={EU_MEMBERS_LIST}
                    title="Capitales de la UE"
                />
            </div>
        </main>
    );
}
