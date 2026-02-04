
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PhysicalGameLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
    colorTheme?: 'emerald' | 'blue' | 'teal';
}

export default function PhysicalGameLayout({
    title,
    description,
    children,
    colorTheme = 'emerald'
}: PhysicalGameLayoutProps) {
    const { t } = useLanguage();

    const themeColors = {
        emerald: 'bg-emerald-500/10 bg-teal-600/10',
        blue: 'bg-blue-500/10 bg-cyan-600/10',
        teal: 'bg-teal-500/10 bg-emerald-600/10'
    };

    const gradientClasses = themeColors[colorTheme as keyof typeof themeColors] || themeColors.emerald;
    const [color1, color2] = gradientClasses.split(' ');

    return (
        <div className="min-h-screen bg-transparent flex flex-col">
            <main className="flex-1 p-4 pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${color1} rounded-full blur-[100px]`} />
                    <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] ${color2} rounded-full blur-[100px]`} />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="px-4 md:px-8">
                        <Link href="/juegos" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 mb-6">
                            <ArrowLeft className="w-4 h-4" /> {t.common.backToGames || 'Volver a Juegos'}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
                            {title}
                        </h1>
                        <p className="text-slate-700 font-medium text-lg max-w-2xl mb-8 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
}
