import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EuropeCapitalsGame from '@/components/games/EuropeCapitalsGame';

export const metadata: Metadata = {
    title: 'Puzzle: Capitales de Europa - Juego Interactivo | TuMaestro.es',
    description: 'Completa el mapa de Europa arrastrando cada capital a su país. Un reto educativo divertido para todas las edades.',
};

export default function EuropeCapitalsMatchPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div>
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-6">
                            <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 -mb-8 relative z-[100] pb-2 drop-shadow-[0_4px_20px_rgba(20,184,166,0.3)]">
                            Puzzle: Capitales Europa 🧩
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mb-6 relative z-10 mt-[1.5cm]">
                            El gran reto de las capitales europeas. Arrastra y suelta cada nombre en el país correcto para completar el continente.
                        </p>
                    </div>

                    <EuropeCapitalsGame />
                </div>
            </main>
        </div>
    );
}
