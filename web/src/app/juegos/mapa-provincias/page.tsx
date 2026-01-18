'use client';

import MapGame from '@/components/games/MapGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MapaProvinciasPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
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
    );
}
