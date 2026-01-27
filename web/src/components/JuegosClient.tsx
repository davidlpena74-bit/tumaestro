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
    ArrowRight,
    Dna,
    Plant
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
    icon: any;
    colorTheme: string; // The base color for the whole section
    subsections: Subsection[];
};

export default function JuegosClient() {
    const { t } = useLanguage();

    const categories: Category[] = [
        {
            id: 'geography',
            title: t.gamesPage.categories.geography,
            icon: MapTrifold,
            colorTheme: 'from-emerald-600 to-teal-800',
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
            id: 'biology',
            title: t.gamesPage.categories.biology,
            icon: Dna,
            colorTheme: 'from-blue-600 to-cyan-800',
            subsections: [
                {
                    games: [
                        {
                            id: 'celula-animal',
                            title: t.gamesPage.gameTitles.animalCell,
                            description: t.gamesPage.gameTitles.animalCellDesc,
                            href: '/juegos/celula-animal',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: '1º ESO',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'celula-vegetal',
                            title: t.gamesPage.gameTitles.plantCell,
                            description: t.gamesPage.gameTitles.plantCellDesc,
                            href: '/juegos/celula-vegetal',
                            icon: Plant,
                            color: 'from-blue-500 to-emerald-600',
                            grade: '1º ESO',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'musculos',
                            title: t.gamesPage.gameTitles.muscles,
                            description: t.gamesPage.gameTitles.musclesDesc,
                            href: '/juegos/musculos',
                            icon: Brain,
                            color: 'from-blue-500 to-cyan-600',
                            grade: 'Primaria',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'esqueleto',
                            title: t.gamesPage.gameTitles.skeleton,
                            description: t.gamesPage.gameTitles.skeletonDesc,
                            href: '/juegos/esqueleto',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: 'Primaria',
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                }
            ]
        },
        {
            id: 'math',
            title: t.gamesPage.categories.math,
            icon: Calculator,
            colorTheme: 'from-orange-600 to-amber-800',
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
            icon: Brain,
            colorTheme: 'from-violet-600 to-indigo-800',
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
            icon: Translate,
            colorTheme: 'from-pink-600 to-rose-800',
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
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-slate-800 pb-2"
                    >
                        {t.gamesPage.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 max-w-2xl mx-auto mt-2 font-medium"
                    >
                        {t.gamesPage.subtitle}
                    </motion.p>
                </header>

                {/* Subject Jump-Links (Chips) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20 px-4 relative z-20 w-full"
                >
                    {categories.map((category) => (
                        <motion.a
                            key={category.id}
                            href={`#${category.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileHover={{
                                y: -8,
                                rotateX: 6,
                                rotateY: -3,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative block w-full perspective-1000"
                        >
                            <div className={cn(
                                "relative w-full px-4 py-4 rounded-2xl border border-white/10 text-white font-bold text-sm transition-all duration-300",
                                "group-hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden",
                                "flex flex-col items-center justify-center gap-3 preserve-3d",
                                "bg-slate-950",
                                category.id === 'geography' && "bg-emerald-950/60",
                                category.id === 'biology' && "bg-blue-950/60",
                                category.id === 'math' && "bg-orange-950/60",
                                category.id === 'culture' && "bg-violet-950/60",
                                category.id === 'idiomas' && "bg-pink-950/60"
                            )}>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Theme Background Overlay (Subtle) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.colorTheme} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                                {/* Icon */}
                                <category.icon className={cn("w-6 h-6 mb-1 transition-transform duration-300 group-hover:scale-110",
                                    category.id === 'geography' && "text-emerald-400",
                                    category.id === 'biology' && "text-blue-400",
                                    category.id === 'math' && "text-orange-400",
                                    category.id === 'culture' && "text-violet-400",
                                    category.id === 'idiomas' && "text-pink-400"
                                )} weight="duotone" />

                                <span className="relative z-10 tracking-tight text-center whitespace-nowrap">{category.title}</span>

                                {/* Active Indicator Dash - 3D Bar */}
                                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${category.colorTheme} shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:scale-x-110 mb-1`} />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                <div className="space-y-24">
                    {categories.map((category, catIdx) => (
                        <div key={category.id} id={category.id} className="scroll-mt-32">
                            {/* Main Category Title */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (catIdx * 0.1) }}
                                className="flex items-center gap-4 mb-1 pb-0"
                            >
                                <h2 className="text-4xl font-black text-slate-800 mb-1 pb-2">{category.title}</h2>
                            </motion.div>
                            <div className="w-full h-0.5 bg-slate-800/30 mt-0" />

                            <div className="space-y-12 mt-8">
                                {category.subsections.map((sub, subIdx) => (
                                    <div key={subIdx}>
                                        {/* Subsection Title */}
                                        {sub.title && (
                                            <motion.h3
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xl font-bold mb-6 flex items-center gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-slate-700/50" />
                                                <span className="text-slate-700">
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
                                                    whileHover={{
                                                        y: -12,
                                                        rotateX: 4,
                                                        rotateY: -2,
                                                        transition: { duration: 0.3 }
                                                    }}
                                                    className="perspective-1000"
                                                >
                                                    <Link href={game.href} className="group relative block h-full preserve-3d">
                                                        {/* 3D Shadow/Glow Background */}
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[2rem] blur-3xl -z-10`} />

                                                        <div className={cn(
                                                            "h-full border border-white/10 p-8 rounded-[2rem] transition-all duration-500 transform-gpu relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:border-white/25",
                                                            "bg-slate-950",
                                                            game.color.includes('emerald') && "bg-emerald-950/70",
                                                            game.color.includes('blue') && "bg-blue-950/70",
                                                            game.color.includes('orange') && "bg-orange-950/70",
                                                            game.color.includes('violet') && "bg-violet-950/70",
                                                            game.color.includes('pink') && "bg-pink-950/70",
                                                            game.color.includes('rose') && "bg-rose-950/70"
                                                        )}>
                                                            {/* 3D Top Glare Effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                            {/* Floating Radial Highlight */}
                                                            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${game.color} opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity pointer-events-none`} />

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

                                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-100 transition-colors drop-shadow-md">
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-100 text-sm font-medium shadow-lg">
                        <Student className="w-4 h-4 text-emerald-400" />
                        <span>{t.gamesPage.comingSoon}</span>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
