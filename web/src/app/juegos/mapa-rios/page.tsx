import { default as RiversGame } from '@/components/games/RiversGame';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MapaRiosPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <Header />
            <main className="flex-1 p-4 pt-32 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <Link href="/juegos" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                    </Link>

                    <div className="mb-0">
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 mb-2">
                            Ríos de España
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Identifica los ríos principales en el mapa.
                        </p>
                    </div>

                    <RiversGame />
                </div>
            </main>
        </div>
    );
}
