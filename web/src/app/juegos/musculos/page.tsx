'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HumanMusclesGame from '@/components/games/HumanMusclesGame';

export default function MusculosPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col pt-20">
            <main className="flex-1 px-4 pb-8 pt-0">
                <div className="w-full max-w-7xl mx-auto mb-4">
                    <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
                        <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                    </Link>
                </div>
                <HumanMusclesGame />
            </main>
        </div>
    );
}
