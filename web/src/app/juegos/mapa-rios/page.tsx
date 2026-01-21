import { default as RiversGame } from '@/components/games/RiversGame';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MapaRiosPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col pt-32">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4 pt-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-6xl">
                    <Link href="/juegos" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                    </Link>

                    <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                    Ríos de España
                                </span>
                            </h1>
                            <p className="text-blue-200 text-lg">
                                Identifica los ríos principales en el mapa.
                            </p>
                        </div>
                    </div>

                    <RiversGame />
                </div>
            </main>
        </div>
    );
}
