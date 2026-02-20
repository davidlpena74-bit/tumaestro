'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Globe, MapPin, Waves, Mountain, GraduationCap, Microscope, Calculator, BookOpen, Dna, Brain, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ActivityRanking from '@/components/games/ActivityRanking';
import Link from 'next/link';

export default function RankingsClient() {
    const { language, t } = useLanguage();
    const [selectedTab, setSelectedTab] = useState<'time' | 'score'>('time');

    const activityCategories = [
        {
            name: language === 'es' ? 'Geografía de Europa' : 'Geography of Europe',
            activities: [
                {
                    id: 'capitales-europa',
                    title: language === 'es' ? 'Capitales de Europa' : 'Europe Capitals',
                    icon: MapPin,
                    color: 'blue'
                },
                {
                    id: 'rios-europa',
                    title: language === 'es' ? 'Ríos de Europa' : 'Rivers of Europe',
                    icon: Waves,
                    color: 'cyan'
                },
                {
                    id: 'capitales-ue',
                    title: language === 'es' ? 'Capitales de la UE' : 'EU Capitals',
                    icon: Globe,
                    color: 'indigo'
                }
            ]
        },
        {
            name: language === 'es' ? 'Geografía de España' : 'Geography of Spain',
            activities: [
                {
                    id: 'mapa-provincias',
                    title: language === 'es' ? 'Provincias de España' : 'Spanish Provinces',
                    icon: MapPin,
                    color: 'emerald'
                },
                {
                    id: 'mapa-comunidades',
                    title: language === 'es' ? 'Comunidades Autónomas' : 'Regions of Spain',
                    icon: Globe,
                    color: 'teal'
                },
                {
                    id: 'mapa-rios',
                    title: language === 'es' ? 'Ríos de España' : 'Rivers of Spain',
                    icon: Waves,
                    color: 'blue'
                }
            ]
        },
        {
            name: language === 'es' ? 'Ciencias Naturales' : 'Natural Sciences',
            activities: [
                {
                    id: 'esqueleto',
                    title: language === 'es' ? 'El Esqueleto Humano' : 'Human Skeleton',
                    icon: Brain,
                    color: 'slate'
                },
                {
                    id: 'musculos',
                    title: language === 'es' ? 'Los Músculos' : 'Human Muscles',
                    icon: Dna,
                    color: 'red'
                },
                {
                    id: 'celula-animal',
                    title: language === 'es' ? 'Célula Animal' : 'Animal Cell',
                    icon: Microscope,
                    color: 'orange'
                },
                {
                    id: 'celula-vegetal',
                    title: language === 'es' ? 'Célula Vegetal' : 'Plant Cell',
                    icon: Microscope,
                    color: 'green'
                },
                {
                    id: 'sistema-reproductor-femenino',
                    title: language === 'es' ? 'Aparato Reproductor Femenino' : 'Female Reproductive System',
                    icon: Dna,
                    color: 'pink'
                },
                {
                    id: 'sistema-reproductor-masculino',
                    title: language === 'es' ? 'Aparato Reproductor Masculino' : 'Male Reproductive System',
                    icon: Dna,
                    color: 'blue'
                }
            ]
        },
        {
            name: language === 'es' ? 'Matemáticas y Otros' : 'Mathematics & Others',
            activities: [
                {
                    id: 'divisiones',
                    title: language === 'es' ? 'División de Pizzas' : 'Pizza Division',
                    icon: Calculator,
                    color: 'orange'
                },
                {
                    id: 'multiplicaciones',
                    title: language === 'es' ? 'Multiplicación Espacial' : 'Space Multiplication',
                    icon: Trophy,
                    color: 'purple'
                },
                {
                    id: 'verbos-irregulares',
                    title: language === 'es' ? 'Verbos Irregulares' : 'Irregular Verbs',
                    icon: BookOpen,
                    color: 'blue'
                },
                {
                    id: 'culture-quiz',
                    title: language === 'es' ? 'Quiz de Cultura' : 'Culture Quiz',
                    icon: Landmark,
                    color: 'violet'
                }
            ]
        },
        {
            name: language === 'es' ? 'Geografía del Mundo' : 'World Geography',
            activities: [
                {
                    id: 'mapa-africa',
                    title: language === 'es' ? 'Países de África' : 'Africa Countries',
                    icon: Globe,
                    color: 'emerald'
                },
                {
                    id: 'mapa-america',
                    title: language === 'es' ? 'Países de América' : 'America Countries',
                    icon: Globe,
                    color: 'blue'
                },
                {
                    id: 'mapa-asia',
                    title: language === 'es' ? 'Países de Asia' : 'Asia Countries',
                    icon: Globe,
                    color: 'orange'
                },
                {
                    id: 'mapa-oceania',
                    title: language === 'es' ? 'Países de Oceanía' : 'Oceania Countries',
                    icon: Globe,
                    color: 'teal'
                },
                {
                    id: 'mapa-norteamerica',
                    title: language === 'es' ? 'Países de Norteamérica' : 'North America Countries',
                    icon: Globe,
                    color: 'emerald'
                },
                {
                    id: 'mapa-sudamerica',
                    title: language === 'es' ? 'Países de Sudamérica' : 'South America Countries',
                    icon: Globe,
                    color: 'blue'
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-[#0f172a] text-white">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mb-6"
                    >
                        <Trophy className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wider">
                            {language === 'es' ? 'Salón de la Fama' : 'Hall of Fame'}
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-500">
                        {language === 'es' ? 'Récords de Actividades' : 'Activity Records'}
                    </h1>

                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {language === 'es'
                            ? 'Compite por los mejores tiempos en los desafíos de geografía y ciencia.'
                            : 'Compete for the best times in geography and science challenges.'}
                    </p>
                </header>

                <div className="flex justify-center mb-12">
                    <div className="bg-slate-800/50 p-1.5 rounded-2xl border border-white/5 flex gap-2">
                        <button
                            onClick={() => setSelectedTab('time')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${selectedTab === 'time'
                                ? 'bg-emerald-500 text-slate-900 shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Clock className="w-5 h-5" />
                            {language === 'es' ? 'Mejores Tiempos' : 'Best Times'}
                        </button>
                        <button
                            onClick={() => setSelectedTab('score')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${selectedTab === 'score'
                                ? 'bg-yellow-500 text-slate-900 shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Trophy className="w-5 h-5" />
                            {language === 'es' ? 'Mayores Puntuaciones' : 'High Scores'}
                        </button>
                    </div>
                </div>

                <div className="space-y-16">
                    {activityCategories.map((category, catIndex) => (
                        <div key={category.name} className="space-y-8">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: catIndex * 0.1 }}
                                className="text-2xl md:text-3xl font-black text-white/90 flex items-center gap-4 px-2"
                            >
                                <div className="h-8 w-1.5 bg-emerald-500 rounded-full" />
                                {category.name}
                            </motion.h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {category.activities.map((activity, index) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (catIndex * 0.2) + (index * 0.1) }}
                                        className="bg-slate-900/40 rounded-[2.5rem] border border-white/5 p-8 backdrop-blur-sm flex flex-col h-full"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className={`p-4 rounded-2xl bg-${activity.color}-500/10 text-${activity.color}-400 ring-1 ring-${activity.color}-500/20`}>
                                                <activity.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-white">{activity.title}</h2>
                                                <Link
                                                    href={`/actividades/${activity.id === 'verbos-irregulares' ? 'verbos-irregulares' : activity.id}`}
                                                    className="text-xs text-slate-500 hover:text-emerald-400 font-bold uppercase tracking-tighter transition-colors flex items-center gap-1 mt-1"
                                                >
                                                    {language === 'es' ? 'Ir al juego' : 'Go to game'}
                                                    <GraduationCap className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/50 rounded-3xl border border-white/5 p-4 flex-grow overflow-hidden">
                                            <ActivityRanking
                                                activityId={activity.id}
                                                sortBy={selectedTab}
                                                limit={5}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
