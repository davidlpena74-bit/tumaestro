import { default as RiversGame } from '@/components/games/RiversGame';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

export default function MapaRiosPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-950 flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 w-full max-w-6xl">
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
        </ProtectedRoute>
    );
}
