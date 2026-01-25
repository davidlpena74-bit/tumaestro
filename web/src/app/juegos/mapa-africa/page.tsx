import { Metadata } from 'next';
import AfricaMapGame from '@/components/games/AfricaMapGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa de África - Juego de Geografía | TuMaestro.es',
    description: 'Aprende los países de África con este mapa interactivo. Ubica las 54 naciones del continente africano y mejora tu geografía.',
};

export default function AfricaMapPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div>
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-6">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                            Reto Mapa de África 🌍
                        </h1>
                        <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            Explora el continente con el mayor número de países. ¿Serás capaz de ubicarlos todos sin fallar?
                        </p>
                    </div>

                    <AfricaMapGame />
                </div>
            </main>
        </div>
    );
}
