import { Metadata } from 'next';
import RegionGame from '@/components/games/RegionGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa de Comunidades Autónomas - Juego de Geografía | TuMaestro.es',
    description: 'Juego interactivo para aprender las Comunidades Autónomas de España. Pon a prueba tus conocimientos de geografía política de forma divertida y gratuita.',
    keywords: ['comunidades autónomas', 'mapa españa', 'geografía española', 'juego interactivo', 'aprender regiones', 'educación primaria'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos/mapa-comunidades',
    },
};

export default function MapaComunidadesPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div>
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-6">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-[0_4px_15px_rgba(255,255,255,0.3)]">
                            Reto Comunidades Autónomas
                        </h1>
                        <p className="text-white/80 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            Demuestra que conoces el mapa político de España. Ubica las 17 Comunidades y 2 Ciudades Autónomas.
                        </p>
                    </div>

                    <RegionGame />
                </div>
            </main>
        </div>
    );
}
