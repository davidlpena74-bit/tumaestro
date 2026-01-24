'use client';

import CopiaJuego1 from '@/components/games/CopiaJuego1';

export default function CopiaJuego1Page() {
    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            {/* Background handled globally by PageBackground */}
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white pb-2">Copia Juego 1</h1>
                </header>
                <CopiaJuego1 />
            </div>
        </main>
    );
}
