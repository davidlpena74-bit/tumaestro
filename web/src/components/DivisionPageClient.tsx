'use client';

import DivisionGame from '@/components/games/DivisionGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DivisionPageClient() {
    return (
        <main className="min-h-screen bg-transparent pt-24 pb-12 px-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-400">Reparto de Pizzas</span> 🍕
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Ayuda a repartir las pizzas equitativamente entre los amigos. ¡Aprende a dividir jugando!
                    </p>
                </div>

                <DivisionGame />
            </div>
        </main>
    );
}
