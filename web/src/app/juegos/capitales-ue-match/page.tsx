import CapitalMatchingGame from '@/components/games/CapitalMatchingGame';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CapitalMatchingPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/juegos"
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                            Capitales UE: Reto de Cajas
                        </h1>
                        <p className="text-slate-400 font-medium">
                            Arrastra cada capital a su país correspondiente
                        </p>
                    </div>
                </div>

                <CapitalMatchingGame />
            </div>
        </div>
    );
}
