'use client';

import MapGame from '@/components/games/MapGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

export default function MapaProvinciasPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <Header />
            <main className="flex-1 p-4 pt-32 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="mb-0">
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 mb-2">
                            Reto Geográfico
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Demuestra tu conocimiento del mapa de España. Localiza todas las provincias antes de que se agote el tiempo.
                        </p>
                    </div>

                    <MapGame />
                </div>
            </main>
        </div>
    );
}
