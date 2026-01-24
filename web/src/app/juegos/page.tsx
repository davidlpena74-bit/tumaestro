'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
    MapTrifold,
    Brain,
    Calculator,
    GlobeHemisphereWest,
    Student,
    PuzzlePiece,
    Translate,
    ArrowRight
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Game = {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: any;
    color: string;
    grade: string;
    region?: string;
    gameType?: string;
};

type Subsection = {
    title?: string;
    games: Game[];
};

type Category = {
    id: string;
    title: string;
    colorTheme: string; // The base color for the whole section
    subsections: Subsection[];
};

export default function GamesHubPage() {
    const { t } = useLanguage();

    const categories: Category[] = [
        {
            id: 'geography',
            title: t.gamesPage.categories.geography,
            colorTheme: 'from-emerald-500 to-teal-600',
            subsections: [
                {
                    title: 'España',
                    games: [
                        {
                            id: 'region',
                            title: t.gamesPage.gameTitles.region,
                            description: t.gamesPage.gameTitles.regionDesc,
                            href: '/juegos/mapa-comunidades',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa',
                            title: t.gamesPage.gameTitles.provinces,
                            description: t.gamesPage.gameTitles.provincesDesc,
                            href: '/juegos/mapa-provincias',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'rios',
                            title: t.gamesPage.gameTitles.riversSpain,
                            description: t.gamesPage.gameTitles.riversSpainDesc,
                            href: '/juegos/mapa-rios',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: 'Europa',
                    games: [
                        {
                            id: 'europe',
                            title: t.gamesPage.gameTitles.europeMap,
                            description: t.gamesPage.gameTitles.europeMapDesc,
                            href: '/juegos/mapa-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'capitals-ue',
                            title: t.gamesPage.gameTitles.euCapitalsMap,
                            description: t.gamesPage.gameTitles.euCapitalsMapDesc,
                            href: '/juegos/capitales-ue',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'capitals-europe',
                            title: t.gamesPage.gameTitles.europeCapitalsMap,
                            description: t.gamesPage.gameTitles.europeCapitalsMapDesc,
                            href: '/juegos/capitales-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'rios-europa',
                            title: t.gamesPage.gameTitles.riversEurope,
                            description: t.gamesPage.gameTitles.riversEuropeDesc,
                            href: '/juegos/rios-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'capitals-ue-match',
                            title: t.gamesPage.gameTitles.euCapitalsPuzzle,
                            description: t.gamesPage.gameTitles.euCapitalsPuzzleDesc,
                            href: '/juegos/capitales-ue-match',
                            icon: PuzzlePiece,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.puzzle
                        },
                        {
                            id: 'capitals-europe-match',
                            title: t.gamesPage.gameTitles.europeCapitalsPuzzle,
                            description: t.gamesPage.gameTitles.europeCapitalsPuzzleDesc,
                            href: '/juegos/capitales-europa-match',
                            icon: PuzzlePiece,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.puzzle
                        }
                    ]
                },
                {
                    title: 'América',
                    games: [
                        {
                            id: 'mapa-norteamerica',
                            title: t.gamesPage.gameTitles.northAmericaMap,
                            description: t.gamesPage.gameTitles.northAmericaMapDesc,
                            href: '/juegos/mapa-norteamerica',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-sudamerica',
                            title: t.gamesPage.gameTitles.southAmericaMap,
                            description: t.gamesPage.gameTitles.southAmericaMapDesc,
                            href: '/juegos/mapa-sudamerica',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-usa',
                            title: t.gamesPage.gameTitles.usaStatesMap,
                            description: t.gamesPage.gameTitles.usaStatesMapDesc,
                            href: '/juegos/mapa-usa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-america',
                            title: t.gamesPage.gameTitles.americaMap,
                            description: t.gamesPage.gameTitles.americaMapDesc,
                            href: '/juegos/mapa-america',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: 'África',
                    games: [
                        {
                            id: 'mapa-africa',
                            title: 'Mapa de África',
                            description: 'Explora y aprende la ubicación de las naciones del continente africano.',
                            href: '/juegos/mapa-africa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: 'África',
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: 'Asia y Oceanía',
                    games: [
                        {
                            id: 'mapa-asia-oceania',
                            title: 'Mapa de Asia y Oceanía',
                            description: 'Un gran reto: desde el gigante asiático hasta las islas del Pacífico.',
                            href: '/juegos/mapa-asia-oceania',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: 'Asia/Oceanía',
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                }
            ]
        },
        {
            id: 'math',
            title: t.gamesPage.categories.math,
            colorTheme: 'from-orange-500 to-amber-600',
            subsections: [
                {
                    games: [
                        {
                            id: 'division',
                            title: t.gamesPage.gameTitles.division,
                            description: t.gamesPage.gameTitles.divisionDesc,
                            href: '/juegos/divisiones',
                            icon: Calculator,
                            color: 'from-orange-500 to-amber-600',
                            grade: '3º Prim.',
                            gameType: t.gamesPage.gameTypes.math
                        }
                    ]
                }
            ]
        },
        {
            id: 'culture',
            title: t.gamesPage.categories.culture,
            colorTheme: 'from-violet-500 to-indigo-600',
            subsections: [
                {
                    games: [
                        {
                            id: 'quiz',
                            title: t.gamesPage.gameTitles.quiz,
                            description: t.gamesPage.gameTitles.quizDesc,
                            href: '/juegos/quiz-cultura',
                            icon: Brain,
                            color: 'from-violet-500 to-indigo-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.quiz
                        }
                    ]
                }
            ]
        },
        {
            id: 'idiomas',
            title: 'Idiomas',
            colorTheme: 'from-pink-500 to-rose-600',
            subsections: [
                {
                    games: [
                        {
                            id: 'verbos-irregulares',
                            title: 'Verbos Irregulares',
                            description: 'Practica lo formas de los verbos irregulares en inglés.',
                            href: '/juegos/verbos-irregulares',
                            icon: Translate,
                            color: 'from-pink-500 to-rose-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.verbs
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white pb-2"
                    >
                        {t.gamesPage.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mt-2"
                    >
                        {t.gamesPage.subtitle}
                    </motion.p>
                </header>

                <div className="space-y-24">
                    {categories.map((category, catIdx) => (
                        <div key={category.id}>
                            {/* Main Category Title */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (catIdx * 0.1) }}
                                className="flex items-center gap-4 mb-10 pb-1"
                            >
                                <h2 className={cn("text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r pb-2", category.colorTheme)}>{category.title}</h2>
                            </motion.div>
                            <div className={`w-full h-1 bg-gradient-to-br ${category.colorTheme} mt-0`} />

                            <div className="space-y-12 mt-8">
                                {category.subsections.map((sub, subIdx) => (
                                    <div key={subIdx}>
                                        {/* Subsection Title */}
                                        {sub.title && (
                                            <motion.h3
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xl font-bold text-gray-400 mb-6 flex items-center gap-3"
                                            >
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${category.colorTheme}`} />
                                                <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", category.colorTheme)}>
                                                    {sub.title}
                                                </span>
                                            </motion.h3>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {sub.games.map((game, idx) => (
                                                <motion.div
                                                    key={game.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.4 + (idx * 0.05) }}
                                                >
                                                    <Link href={game.href} className="group relative block h-full">
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
                                                        <div className={`h-full bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-5px] overflow-hidden relative`}>

                                                            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${game.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

                                                            <div className="mb-6">
                                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                                                    <game.icon className="w-10 h-10 text-white" weight="duotone" />
                                                                </div>

                                                                <div className="absolute top-6 right-6 flex flex-col items-end gap-1.5 pointer-events-none text-right">
                                                                    {game.gameType && (
                                                                        <div className={cn(
                                                                            "px-3 py-1 rounded-full text-[9px] font-medium border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-[92px] justify-start backdrop-blur-md whitespace-nowrap truncate",
                                                                            "bg-white/5 text-white/40 border-white/10"
                                                                        )}>
                                                                            {(() => {
                                                                                if (game.gameType === t.gamesPage.gameTypes.map) return <MapTrifold className="w-3.5 h-3.5" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.puzzle) return <PuzzlePiece className="w-3.5 h-3.5" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.quiz) return <Brain className="w-3.5 h-3.5" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.math) return <Calculator className="w-3.5 h-3.5" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.verbs) return <Translate className="w-3.5 h-3.5" weight="regular" />;
                                                                                return <MapTrifold className="w-3.5 h-3.5" weight="regular" />;
                                                                            })()}
                                                                            {game.gameType}
                                                                        </div>
                                                                    )}

                                                                    <div className={cn(
                                                                        "px-3 py-1 rounded-full text-[9px] font-medium border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-[92px] justify-start backdrop-blur-md whitespace-nowrap truncate",
                                                                        "bg-white/5 text-white/40 border-white/10"
                                                                    )}>
                                                                        <Student className="w-3.5 h-3.5" weight="regular" />
                                                                        {game.grade}
                                                                    </div>

                                                                    {game.region && (
                                                                        <div className={cn(
                                                                            "px-3 py-1 rounded-full text-[9px] font-medium border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-[92px] justify-start backdrop-blur-md whitespace-nowrap truncate",
                                                                            "bg-white/5 text-white/40 border-white/10"
                                                                        )}>
                                                                            <GlobeHemisphereWest className="w-3.5 h-3.5" weight="regular" />
                                                                            {game.region}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                                                {game.title}
                                                            </h3>
                                                            <p className="text-gray-400 mb-8 leading-relaxed">
                                                                {game.description}
                                                            </p>

                                                            <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors mt-auto">
                                                                {t.gamesPage.playBtn} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-10 border-t border-white/5 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                        <Student className="w-4 h-4" />
                        <span>{t.gamesPage.comingSoon}</span>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
