'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import ResourceSectionView from '@/components/resources/ResourceSectionView';
import { useLanguage } from '@/context/LanguageContext';

export default function IntelligenceClient() {
    const { t } = useLanguage();

    const games = [
        {
            id: 'riddles',
            title: t.gamesPage.gameTitles.riddles,
            description: t.gamesPage.gameTitles.riddlesDesc,
            href: '/actividades/riddles',
            image: '/images/resources/game-riddles.png',
            theme: 'from-amber-400 to-orange-500'
        },
        {
            id: 'logic',
            title: t.gamesPage.gameTitles.logic,
            description: t.gamesPage.gameTitles.logicDesc,
            href: '/actividades/logic',
            image: '/images/resources/game-logic.png',
            theme: 'from-cyan-400 to-emerald-500'
        },
        {
            id: 'quiz',
            title: t.gamesPage.gameTitles.quiz,
            description: t.gamesPage.gameTitles.quizDesc,
            href: '/actividades/quiz-cultura',
            image: '/images/resources/game-quiz.png',
            theme: 'from-violet-500 to-indigo-600'
        }
    ];

    return (
        <ResourceSectionView
            title={t.resources.intelligenceTitle}
            subtitle={t.resources.intelligenceSubtitle}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {games.map((game, idx) => (
                    <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group"
                    >
                        <Link href={game.href}>
                            <div className="bg-white/40 backdrop-blur-md border border-slate-200/50 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all h-full flex flex-col">
                                <div className={`aspect-video relative overflow-hidden bg-gradient-to-br ${game.theme}`}>
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-slate-800 mb-2 truncate">
                                        {game.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium mb-6 line-clamp-2">
                                        {game.description}
                                    </p>
                                    <div className="mt-auto flex items-center text-slate-900 font-black text-sm uppercase tracking-wider group-hover:opacity-80 transition-opacity">
                                        JUGAR AHORA <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" weight="bold" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </ResourceSectionView>
    );
}
