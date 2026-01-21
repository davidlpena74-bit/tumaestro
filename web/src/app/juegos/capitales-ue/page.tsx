'use client';

import CapitalMatchingGame from '@/components/games/CapitalMatchingGame';

export default function EUCapitalsPage() {
    return (
        <main className="min-h-screen bg-[#0f172a] pt-24 pb-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
                <CapitalMatchingGame />
            </div>
        </main>
    );
}
