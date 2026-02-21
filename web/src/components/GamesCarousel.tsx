'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    Dna,
    MapTrifold,
    Calculator,
    Brain
} from '@phosphor-icons/react';

const GAMES = [
    {
        id: 'celula-animal',
        title: 'Célula Animal',
        category: 'Biología',
        image: '/images/games/animal-cell-hq.png',
        href: '/actividades/celula-animal',
        color: 'from-blue-500 to-indigo-600',
        icon: Dna
    },
    {
        id: 'celula-vegetal',
        title: 'Célula Vegetal',
        category: 'Biología',
        image: '/images/games/plant-cell-hq.png',
        href: '/actividades/celula-vegetal',
        color: 'from-green-500 to-emerald-600',
        icon: Dna
    },
    {
        id: 'esqueleto',
        title: 'Esqueleto Humano',
        category: 'Anatomía',
        image: '/images/games/skeleton-combined-hq.png',
        href: '/actividades/esqueleto',
        color: 'from-slate-500 to-slate-700',
        icon: Dna
    },
    {
        id: 'capitales-europa',
        title: 'Capitales de Europa',
        category: 'Geografía',
        image: null,
        href: '/actividades/capitales-europa',
        color: 'from-emerald-500 to-teal-600',
        icon: MapTrifold
    },
    {
        id: 'musculos',
        title: 'Músculos del Cuerpo',
        category: 'Anatomía',
        image: '/images/games/muscles-combined-hq-v2.png',
        href: '/actividades/musculos',
        color: 'from-rose-500 to-red-600',
        icon: Dna
    },
    {
        id: 'divisiones',
        title: 'Aprende a Dividir',
        category: 'Matemáticas',
        image: null,
        href: '/actividades/divisiones',
        color: 'from-orange-500 to-amber-600',
        icon: Calculator
    },
    {
        id: 'multiplicaciones',
        title: 'Multiplicación Visual',
        category: 'Matemáticas',
        image: '/images/games/multiplication-hq.png',
        href: '/actividades/multiplicaciones',
        color: 'from-blue-500 to-indigo-600',
        icon: Calculator
    }
];

export default function GamesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Triplicate for infinite loop
    const displayGames = [...GAMES, ...GAMES, ...GAMES];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        // Start from middle set
        const initScroll = () => {
            container.scrollLeft = container.scrollWidth / 3;
        };
        setTimeout(initScroll, 100);

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && container) {
                // Scroll LEFT (normal direction for this one? Or reverse?)
                // User said "Haz lo mismo", implies same carousel style.
                // But previous carousel (BookCarousel) was "Reverse Carousel" (moving Right).
                // "Featured Teachers" was moving Left (standard).
                // "BookCarousel" was moving Right.
                // Let's make this one move Left (standard) to alternate: Left (Teachers) -> Right (Books) -> Left (Games).

                container.scrollLeft += 0.5;

                if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
                    container.scrollLeft = container.scrollWidth / 3;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden py-4 mt-8 whitespace-nowrap mask-linear-fade"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
        >
            {displayGames.map((game, index) => (
                <Link
                    key={`${game.id}-${index}`}
                    href={game.href}
                    className="min-w-[200px] w-[200px] inline-block group relative aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 bg-slate-900"
                >
                    {/* Semi-transparent Glass Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40 z-0 transition-all duration-300 group-hover:opacity-60 backdrop-blur-sm`} />

                    {/* Image if available */}
                    {game.image ? (
                        <div className="absolute inset-0 z-0 p-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay">
                            <img src={game.image} alt={game.title} className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 rotate-12 scale-150 group-hover:scale-125 transition-transform duration-500">
                            <game.icon className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" weight="duotone" />
                        </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 whitespace-normal text-left">
                        <div className="flex items-center gap-2 mb-1">
                            <game.icon className="w-4 h-4 text-white/80" weight="fill" />
                            <span className="text-[10px] uppercase font-bold text-white/80 tracking-wider">{game.category}</span>
                        </div>
                        <h3 className="text-white font-bold text-sm leading-tight mb-0.5 line-clamp-1">{game.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}
