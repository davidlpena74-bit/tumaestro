import { Metadata } from 'next';
import RegionGame from '@/components/games/RegionGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa de Comunidades Autónomas - Juego de Geografía | TuMaestro.es',
    description: 'Juego interactivo para aprender las Comunidades Autónomas de España. Pon a prueba tus conocimientos de geografía.',
};

export default function MapaComunidadesPage() {
    return (
        <main className="min-h-screen bg-transparent text-white pt-32 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-0">
                    <Link href="/juegos" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 mb-2">
                        Reto C. Autónomas
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Demuestra que conoces el mapa político de España. Ubica las 17 Comunidades y 2 Ciudades Autónomas.
                    </p>
                </div>

                <RegionGame />
            </div>
        </main>
    );
}
