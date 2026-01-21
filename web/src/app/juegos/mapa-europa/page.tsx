'use client';

import EuropeGame from '@/components/games/EuropeGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EuropeMapPage() {
    return (
        <main className="min-h-screen bg-transparent pt-32 pb-12 px-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <Link href="/juegos" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Mapa de Europa</span> 🌍
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        ¿Puedes localizar todos los países? Demuestra tus conocimientos de geografía.
                    </p>
                </div>

                <EuropeGame />
            </div>
        </main>
    );
}
