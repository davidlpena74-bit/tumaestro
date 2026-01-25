'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NorthAmericaMapGame from '@/components/games/NorthAmericaMapGame';

export default function NorthAmericaGamePage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-12 px-4">
            <div className="w-full max-w-7xl mx-auto mb-4">
                <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
                    <ArrowLeft className="w-4 h-4" /> Volver a Juegos
                </Link>
            </div>
            <NorthAmericaMapGame />
        </main>
    );
}
