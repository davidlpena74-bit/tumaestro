'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, BrainCircuit, ArrowRight, Calculator, Globe, MapPin, GraduationCap, Landmark, Puzzle, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Game = {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: any;
    color: string;
};

type Category = {
    id: string;
    title: string;
    games: Game[];
};

export default function GamesHubPage() {
    const { t } = useLanguage();

    const categories: Category[] = [
        {
            id: 'geography',
            title: t.gamesPage.categories.geography, // 'Geografía'
            games: [
                {
                    id: 'region',
                    title: t.gamesPage.gameTitles.region,
                    description: t.gamesPage.gameTitles.regionDesc,
                    href: '/juegos/mapa-comunidades',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'mapa',
                    title: t.gamesPage.gameTitles.provinces,
                    description: t.gamesPage.gameTitles.provincesDesc,
                    href: '/juegos/mapa-provincias',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'europe',
                    title: t.gamesPage.gameTitles.europeMap,
                    description: t.gamesPage.gameTitles.europeMapDesc,
                    href: '/juegos/mapa-europa',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'capitals-ue',
                    title: t.gamesPage.gameTitles.euCapitalsMap,
                    description: t.gamesPage.gameTitles.euCapitalsMapDesc,
                    href: '/juegos/capitales-ue',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'capitals-europe',
                    title: t.gamesPage.gameTitles.europeCapitalsMap,
                    description: t.gamesPage.gameTitles.europeCapitalsMapDesc,
                    href: '/juegos/capitales-europa',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'rios',
                    title: t.gamesPage.gameTitles.riversSpain,
                    description: t.gamesPage.gameTitles.riversSpainDesc,
                    href: '/juegos/mapa-rios',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'rios-europa',
                    title: t.gamesPage.gameTitles.riversEurope,
                    description: t.gamesPage.gameTitles.riversEuropeDesc,
                    href: '/juegos/rios-europa',
                    icon: Map,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'capitals-ue-match',
                    title: t.gamesPage.gameTitles.euCapitalsPuzzle,
                    description: t.gamesPage.gameTitles.euCapitalsPuzzleDesc,
                    href: '/juegos/capitales-ue-match',
                    icon: Puzzle,
                    color: 'from-emerald-500 to-teal-600',
                },
                {
                    id: 'capitals-europe-match',
                    title: t.gamesPage.gameTitles.europeCapitalsPuzzle,
                    description: t.gamesPage.gameTitles.europeCapitalsPuzzleDesc,
                    href: '/juegos/capitales-europa-match',
                    icon: Puzzle,
                    color: 'from-emerald-500 to-teal-600',
                }
            ]
        },
        {
            id: 'math',
            title: t.gamesPage.categories.math, // 'Matemáticas'
            games: [
                {
                    id: 'division',
                    title: t.gamesPage.gameTitles.division,
                    description: t.gamesPage.gameTitles.divisionDesc,
                    href: '/juegos/divisiones',
                    icon: Calculator,
                    color: 'from-orange-500 to-amber-600',
                }
            ]
        },
        {
            id: 'culture',
            title: t.gamesPage.categories.culture, // 'Cultura General'
            games: [
                {
                    id: 'quiz',
                    title: t.gamesPage.gameTitles.quiz,
                    description: t.gamesPage.gameTitles.quizDesc,
                    href: '/juegos/quiz-cultura',
                    icon: BrainCircuit,
                    color: 'from-violet-500 to-indigo-600',
                }
            ]
        },
        {
            id: 'idiomas',
            title: 'Idiomas',
            games: [
                {
                    id: 'verbos-irregulares',
                    title: 'Verbos Irregulares',
                    description: 'Practica lo formas de los verbos irregulares en inglés.',
                    href: '/juegos/verbos-irregulares',
                    icon: Languages,
                    color: 'from-pink-500 to-rose-600',
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            {/* Background handled globally by PageBackground */}


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

                <div className="space-y-16">
                    {categories.map((category, catIdx) => (
                        <div key={category.id}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (catIdx * 0.1) }}
                                className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4"
                            >
                                <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                                <div className="h-1 flex-1 bg-gradient-to-r from-white/10 to-transparent rounded-full" />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.games.map((game, idx) => (
                                    <motion.div
                                        key={game.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (idx * 0.05) }}
                                    >
                                        <Link href={game.href} className="group relative block h-full">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
                                            <div className={`h-full bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-5px] overflow-hidden relative`}>

                                                {/* Hover Glow */}
                                                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${game.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                                    <game.icon className="w-8 h-8 text-white" />
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                                    {game.title}
                                                </h3>
                                                <p className="text-gray-400 mb-8 leading-relaxed">
                                                    {game.description}
                                                </p>

                                                <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
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

                {/* Coming Soon Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-10 border-t border-white/5 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                        <GraduationCap className="w-4 h-4" />
                        <span>{t.gamesPage.comingSoon}</span>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
