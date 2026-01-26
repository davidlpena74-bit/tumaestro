import { Metadata } from 'next';
import CopiaJuego1 from '@/components/games/CopiaJuego1';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa de Provincias de España - Juego de Geografía | TuMaestro.es',
    description: 'Aprende las 50 provincias de España con este juego interactivo gratuito. Ubica cada provincia en el mapa y mejora tu conocimiento geográfico.',
    keywords: ['provincias de españa', 'geografía española', 'juego interactivo', 'educación primaria', 'mapa político', 'aprender provincias'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos/mapa-provincias',
    },
};

export default function MapaProvinciasPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto pl-10 pr-4">
                    <div>
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-6">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                            Reto Provincias de España
                        </h1>
                        <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            ¿Eres capaz de ubicar las 50 provincias en el mapa? Pon a prueba tu rapidez y precisión geográfica.
                        </p>
                    </div>

                    <CopiaJuego1 />
                </div>
            </main>
        </div>
    );
}
