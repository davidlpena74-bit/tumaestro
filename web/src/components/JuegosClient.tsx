'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
    Plant,
    CaretDown,
    Funnel
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
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const categories: Category[] = [
        {
            id: 'geography',
            title: t.gamesPage.categories.geography,
            icon: MapTrifold,
            colorTheme: 'from-emerald-600 to-teal-800',
            subsections: [
                {
                    title: t.gamesPage.regions.spain,
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
                        },
                        {
                            id: 'montanas-espana',
                            title: t.gamesPage.gameTitles.mountainsSpain,
                            description: t.gamesPage.gameTitles.mountainsSpainDesc,
                            href: '/juegos/montanas-espana',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.europe,
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
                            id: 'capitals-europe-match',
                            title: t.gamesPage.gameTitles.europeCapitalsPuzzle,
                            description: t.gamesPage.gameTitles.europeCapitalsPuzzleDesc,
                            href: '/juegos/capitales-europa-match',
                            icon: PuzzlePiece,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.puzzle
                        },
                        {
                            id: 'montanas-europa',
                            title: t.gamesPage.gameTitles.mountainsEurope,
                            description: t.gamesPage.gameTitles.mountainsEuropeDesc,
                            href: '/juegos/montanas-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-europa',
                            title: t.gamesPage.gameTitles.oceansEurope,
                            description: t.gamesPage.gameTitles.oceansEuropeDesc,
                            href: '/juegos/mares-europa',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.america,
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
                        },
                        {
                            id: 'montanas-america',
                            title: t.gamesPage.gameTitles.mountainsAmerica,
                            description: t.gamesPage.gameTitles.mountainsAmericaDesc,
                            href: '/juegos/montanas-america',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-america',
                            title: t.gamesPage.gameTitles.oceansAmerica,
                            description: t.gamesPage.gameTitles.oceansAmericaDesc,
                            href: '/juegos/mares-america',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.africa,
                    games: [
                        {
                            id: 'mapa-africa',
                            title: t.gamesPage.gameTitles.africaMap,
                            description: t.gamesPage.gameTitles.africaMapDesc,
                            href: '/juegos/mapa-africa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.africa,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.asia,
                    games: [
                        {
                            id: 'mapa-asia',
                            title: t.gamesPage.gameTitles.asiaMap,
                            description: t.gamesPage.gameTitles.asiaMapDesc,
                            href: '/juegos/mapa-asia',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-asia',
                            title: t.gamesPage.gameTitles.mountainsAsia,
                            description: t.gamesPage.gameTitles.mountainsAsiaDesc,
                            href: '/juegos/montanas-asia',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-asia',
                            title: t.gamesPage.gameTitles.oceansAsia,
                            description: t.gamesPage.gameTitles.oceansAsiaDesc,
                            href: '/juegos/mares-asia',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.oceania,
                    games: [
                        {
                            id: 'mapa-oceania',
                            title: t.gamesPage.gameTitles.oceaniaMap,
                            description: t.gamesPage.gameTitles.oceaniaMapDesc,
                            href: '/juegos/mapa-oceania',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-oceania',
                            title: t.gamesPage.gameTitles.mountainsOceania,
                            description: t.gamesPage.gameTitles.mountainsOceaniaDesc,
                            href: '/juegos/montanas-oceania',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-oceania',
                            title: t.gamesPage.gameTitles.oceansOceania,
                            description: t.gamesPage.gameTitles.oceansOceaniaDesc,
                            href: '/juegos/mares-oceania',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
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
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'celula-vegetal',
                            title: t.gamesPage.gameTitles.plantCell,
                            description: t.gamesPage.gameTitles.plantCellDesc,
                            href: '/juegos/celula-vegetal',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'male-reproductive',
                            title: t.gamesPage.gameTitles.maleReproductive,
                            description: t.gamesPage.gameTitles.maleReproductiveDesc,
                            href: '/juegos/sistema-reproductor-masculino',
                            icon: Dna,
                            color: 'from-blue-500 to-indigo-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'female-reproductive',
                            title: t.gamesPage.gameTitles.femaleReproductive,
                            description: t.gamesPage.gameTitles.femaleReproductiveDesc,
                            href: '/juegos/sistema-reproductor-femenino',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'musculos',
                            title: t.gamesPage.gameTitles.muscles,
                            description: t.gamesPage.gameTitles.musclesDesc,
                            href: '/juegos/musculos',
                            icon: Brain,
                            color: 'from-blue-500 to-cyan-600',
                            grade: '5º Prim.',
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'esqueleto',
                            title: t.gamesPage.gameTitles.skeleton,
                            description: t.gamesPage.gameTitles.skeletonDesc,
                            href: '/juegos/esqueleto',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: '5º Prim.',
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
                        },
                        {
                            id: 'multiplication',
                            title: t.gamesPage.gameTitles.multiplication,
                            description: t.gamesPage.gameTitles.multiplicationDesc,
                            href: '/juegos/multiplicaciones',
                            icon: Calculator,
                            color: 'from-orange-500 to-amber-600',
                            grade: '2º Prim.',
                            gameType: t.gamesPage.gameTypes.math
                        }
                    ]
                }
            ]
        },
        {
            id: 'idiomas',
            title: t.gamesPage.regions.languages,
            icon: Translate,
            colorTheme: 'from-pink-600 to-rose-800',
            subsections: [
                {
                    games: [
                        {
                            id: 'verbos-irregulares',
                            title: t.gamesPage.gameTitles.verbs,
                            description: t.gamesPage.gameTitles.verbsDesc,
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

    // Get unique grades available in all games for the filter
    const availableGrades = useMemo(() => {
        const grades = new Set<string>();
        categories.forEach(cat => {
            cat.subsections.forEach(sub => {
                sub.games.forEach(game => grades.add(game.grade));
            });
        });
        return Array.from(grades).sort();
    }, [categories]);

    // Filter categories and subsections based on selected grade and selected subject
    const filteredCategories = useMemo(() => {
        let result = categories;

        // 1. Filter by Grade (Course)
        if (selectedGrade !== 'all') {
            result = result.map(cat => ({
                ...cat,
                subsections: cat.subsections.map(sub => ({
                    ...sub,
                    games: sub.games.filter(game => game.grade === selectedGrade)
                })).filter(sub => sub.games.length > 0)
            })).filter(cat => cat.subsections.length > 0);
        }

        // 2. Filter by Subject (Category ID) if one is selected
        if (selectedSubject) {
            result = result.filter(cat => cat.id === selectedSubject);
        }

        return result;
    }, [selectedGrade, selectedSubject, categories]);

    // Categories available for the current grade (used for chips)
    const availableCategories = useMemo(() => {
        if (selectedGrade === 'all') return categories;
        return categories.filter(cat =>
            cat.subsections.some(sub =>
                sub.games.some(game => game.grade === selectedGrade || game.grade === 'Todo')
            )
        );
    }, [selectedGrade, categories]);

    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12 text-center relative">
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
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 px-4 relative z-20 w-full"
                >
                    {availableCategories.map((category) => (
                        <motion.a
                            key={category.id}
                            href={`#${category.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                // Toggle subject filter
                                if (selectedSubject === category.id) {
                                    setSelectedSubject(null);
                                } else {
                                    setSelectedSubject(category.id);
                                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                                }
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
                                "relative w-full px-4 py-4 rounded-2xl border transition-all duration-300",
                                "group-hover:border-slate-300 shadow-sm overflow-hidden",
                                "flex flex-col items-center justify-center gap-3 preserve-3d",
                                "text-slate-700 font-bold",
                                selectedSubject === category.id ? "bg-white/70 border-slate-400 ring-2 ring-slate-400/10" : "bg-white/30 border-slate-200/60",
                                category.id === 'geography' && (selectedSubject === 'geography' ? "bg-emerald-100/60" : "bg-emerald-50/40"),
                                category.id === 'biology' && (selectedSubject === 'biology' ? "bg-blue-100/60" : "bg-blue-50/40"),
                                category.id === 'math' && (selectedSubject === 'math' ? "bg-orange-100/60" : "bg-orange-50/40"),
                                category.id === 'idiomas' && (selectedSubject === 'idiomas' ? "bg-pink-100/60" : "bg-pink-50/40")
                            )}>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Theme Background Overlay (Subtle) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.colorTheme} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                                {/* Icon */}
                                <category.icon className={cn("w-6 h-6 mb-1 transition-transform duration-300 group-hover:scale-110",
                                    category.id === 'geography' && "text-emerald-600",
                                    category.id === 'biology' && "text-blue-600",
                                    category.id === 'math' && "text-orange-600",
                                    category.id === 'idiomas' && "text-pink-600"
                                )} weight="duotone" />

                                <span className="relative z-10 tracking-tight text-center whitespace-nowrap">{category.title}</span>

                                {/* Active Indicator Dash - 3D Bar */}
                                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${category.colorTheme} shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:scale-x-110 mb-1`} />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* GRADE FILTER DROPDOWN */}
                <div className="mb-20 flex justify-center">
                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 pl-5 pr-4 py-3 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm min-w-[200px]"
                        >
                            <Funnel className="w-4 h-4 text-slate-400" weight="bold" />
                            <span className="flex-grow text-left">
                                {selectedGrade === 'all' ? t.gamesPage.regions.allGrades : selectedGrade}
                            </span>
                            <CaretDown className={`w-4 h-4 text-slate-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} weight="bold" />
                        </button>

                        <AnimatePresence>
                            {filterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-1 z-50 text-slate-700"
                                >
                                    <button
                                        onClick={() => { setSelectedGrade('all'); setFilterOpen(false); }}
                                        className={cn(
                                            "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                            selectedGrade === 'all' && "bg-teal-50 text-teal-600"
                                        )}
                                    >
                                        {t.gamesPage.regions.allGrades}
                                    </button>
                                    {availableGrades.map((grade) => (
                                        <button
                                            key={grade}
                                            onClick={() => { setSelectedGrade(grade); setFilterOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                                selectedGrade === grade && "bg-teal-50 text-teal-600"
                                            )}
                                        >
                                            {grade}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="space-y-24">
                    {filteredCategories.map((category, catIdx) => (
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                                                    className="perspective-1000 h-full"
                                                >
                                                    <Link href={game.href} className="group relative block h-full preserve-3d">
                                                        {/* 3D Shadow/Glow Background */}
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[2rem] blur-3xl -z-10`} />

                                                        <div className={cn(
                                                            "h-full border border-white/10 py-4 px-5 rounded-3xl transition-all duration-500 transform-gpu relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:border-white/25",
                                                            "bg-slate-950",
                                                            game.color.includes('emerald') && "bg-emerald-950/70",
                                                            game.color.includes('blue') && "bg-blue-950/70",
                                                            game.color.includes('orange') && "bg-orange-950/70",
                                                            game.color.includes('violet') && "bg-violet-950/70",
                                                            game.color.includes('pink') && "bg-pink-950/70",
                                                            game.color.includes('rose') && "bg-rose-950/70",
                                                            game.color.includes('amber') && "bg-amber-950/70",
                                                            game.color.includes('yellow') && "bg-yellow-950/70"
                                                        )}>
                                                            {/* 3D Top Glare Effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                            {/* Floating Radial Highlight */}
                                                            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${game.color} opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity pointer-events-none`} />

                                                            <div className="mb-3 flex items-start gap-3">
                                                                <div className={`w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                                                    <game.icon className="w-6 h-6 text-white" weight="duotone" />
                                                                </div>

                                                                <div className="flex flex-col gap-1.5 pt-0.5">
                                                                    {game.gameType && (
                                                                        <div className={cn(
                                                                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-fit backdrop-blur-md whitespace-nowrap",
                                                                            "bg-white/40 text-slate-700 border-white/20"
                                                                        )}>
                                                                            {(() => {
                                                                                if (game.gameType === t.gamesPage.gameTypes.map) return <MapTrifold className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.puzzle) return <PuzzlePiece className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.quiz) return <Brain className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.math) return <Calculator className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.verbs) return <Translate className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.logic) return <Brain className="w-3 h-3" weight="regular" />;
                                                                                return <MapTrifold className="w-3 h-3" weight="regular" />;
                                                                            })()}
                                                                            {game.gameType}
                                                                        </div>
                                                                    )}

                                                                    <div className="flex gap-1.5">
                                                                        <div className={cn(
                                                                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-fit backdrop-blur-md whitespace-nowrap",
                                                                            "bg-white/40 text-slate-700 border-white/20"
                                                                        )}>
                                                                            <Student className="w-3 h-3" weight="regular" />
                                                                            {game.grade}
                                                                        </div>

                                                                        {game.region && (
                                                                            <div className={cn(
                                                                                "px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-fit backdrop-blur-md whitespace-nowrap",
                                                                                "bg-white/40 text-slate-700 border-white/20"
                                                                            )}>
                                                                                <GlobeHemisphereWest className="w-3 h-3" weight="regular" />
                                                                                {game.region}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <h3 className="text-lg font-bold text-white mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-100 transition-colors drop-shadow-md line-clamp-2 min-h-[2.4rem]">
                                                                {game.title}
                                                            </h3>
                                                            <p className="text-gray-400 mb-3 leading-relaxed text-xs line-clamp-3 min-h-[2.8rem]">
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

                {filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <p className="text-slate-500 text-lg">{t.gamesPage.regions.noGames}</p>
                        <button
                            onClick={() => { setSelectedGrade('all'); setSelectedSubject(null); }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            {t.gamesPage.regions.viewAll}
                        </button>
                    </motion.div>
                )}

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

