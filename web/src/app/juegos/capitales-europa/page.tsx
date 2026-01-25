import { Metadata } from 'next';
import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Capitales de Europa - Juego de Geografía Interactiva | TuMaestro.es',
    description: '¿Conoces todas las capitales de Europa? Pon a prueba tu rapidez en este mapa interactivo y localiza cada país por su capital.',
};

export default function EuropeCapitalsMapPage() {
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
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                            Reto Capitales de Europa 🏰
                        </h1>
                        <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            Un desafío completo: identifica todos los países del continente europeo a través de sus capitales en este mapa interactivo.
                        </p>
                    </div>

                    <CapitalGame
                        paths={EUROPE_PATHS}
                        title="Capitales de Europa"
                    />
                </div>
            </main>
        </div>
    );
}
