import { Metadata } from 'next';
import EuropeRiversGame from '@/components/games/EuropeRiversGame';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Ríos de Europa - Juego de Hidrografía Interactiva | TuMaestro.es',
    description: 'Aprende los ríos más importantes de Europa: el Danubio, el Rin, el Volga y muchos más. ¡Ponte a prueba en nuestro mapa interactivo gratuito!',
    keywords: ['ríos de europa', 'hidrografía europa', 'juego interactivo', 'danubio', 'rin', 'volga', 'geografía continental'],
    alternates: {
        canonical: 'https://tumaestro.es/juegos/rios-europa',
    },
};

export default function EuropeRiversPage() {
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
                            Reto Ríos de Europa 🌊
                        </h1>
                        <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            ¿Podrás identificar los grandes cursos fluviales europeos? Desde el Rin hasta el Volga, demuestra tu dominio de la hidrografía continental.
                        </p>
                    </div>

                    <EuropeRiversGame />
                </div>
            </main>
        </div>
    );
}
