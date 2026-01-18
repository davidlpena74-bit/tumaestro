'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, BrainCircuit, ArrowRight, Sparkles, Trophy } from 'lucide-react';

const games = [
    {
        id: 'mapa',
        title: 'Reto Geográfico',
        description: 'Ubica las provincias de España en el mapa interactivo. ¿Qué tan rápido eres?',
        href: '/juegos/mapa-provincias',
        icon: Map,
        color: 'from-teal-500 to-emerald-500',
        bg: 'bg-teal-950/30'
    },
    {
        id: 'quiz',
        title: 'Quiz de Cultura',
        description: 'Preguntas de historia, ciencia y arte. Pon a prueba tu mente.',
        href: '/juegos/quiz-cultura',
        icon: BrainCircuit,
        color: 'from-indigo-500 to-purple-500',
        bg: 'bg-indigo-950/30'
    }
];

export default function GamesHubPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-300">Zona de Juegos Interactivos</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
                    >
                        Aprende Jugando
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Selecciona un desafío y mejora tus habilidades mientras te diviertes. Compite contigo mismo para superar tus récords.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, idx) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
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
                                        JUGAR AHORA <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Coming Soon Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative h-full min-h-[300px] flex flex-col items-center justify-center bg-white/5 border border-white/5 border-dashed rounded-3xl p-8 text-center text-gray-500"
                    >
                        <Trophy className="w-12 h-12 mb-4 opacity-20" />
                        <h3 className="text-xl font-bold mb-2">Próximamente</h3>
                        <p className="text-sm">Estamos desarrollando más juegos educativos.</p>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
