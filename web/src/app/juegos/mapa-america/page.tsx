import { Metadata } from 'next';
import AmericaMapGame from '@/components/games/AmericaMapGame';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mapa de América - Juego de Geografía | TuMaestro.es',
    description: 'Juego interactivo para aprender los países de América. Pon a prueba tus conocimientos de geografía ubicando naciones de Norte, Centro y Sudamérica.',
};

export default function AmericaMapPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                {/* Visual Background Blurs matching Mapa 1 */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div>
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 -mb-8 relative z-[100] pb-2 drop-shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
                            Reto Mapa de América 🌍
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mb-6 relative z-10 mt-[1.5cm]">
                            ¿Puedes localizar todos los países desde el Ártico hasta la Patagonia? Demuestra tus conocimientos sobre el continente americano.
                        </p>
                    </div>

                    <AmericaMapGame />
                </div>
            </main>
        </div>
    );
}
