'use client';

import React from 'react';
import Link from 'next/link';
import { CaretLeft } from '@phosphor-icons/react';
import ContentWrapper from '@/components/ContentWrapper';
import PageBackground from '@/components/PageBackground';
import PlantCellGame from '@/components/games/PlantCellGame';
import { useLanguage } from '@/context/LanguageContext';

export default function PlantCellGamePage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen relative overflow-hidden bg-slate-950">
            <PageBackground />

            <ContentWrapper className="relative z-10 pt-8">
                {/* Back Button */}
                <div className="mb-6 flex justify-start">
                    <Link
                        href="/juegos"
                        className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all transform hover:-translate-x-1"
                    >
                        <CaretLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-bold text-sm uppercase tracking-widest">{t.common.back} a Juegos</span>
                    </Link>
                </div>

                <PlantCellGame />
            </ContentWrapper>
        </main>
    );
}
