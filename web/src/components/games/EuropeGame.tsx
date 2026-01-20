'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, Globe, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EUROPE_COUNTRIES } from './europe-paths';

export default function EuropeGame() {
    const [targetCountry, setTargetCountry] = useState('');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'finished'>('playing');
    const [message, setMessage] = useState('');
    const [remainingCountries, setRemainingCountries] = useState(Object.keys(EUROPE_COUNTRIES));

    useEffect(() => {
        nextTurn();
    }, []);

    const nextTurn = () => {
        if (remainingCountries.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * remainingCountries.length);
        const next = remainingCountries[randomIndex];
        setTargetCountry(next);
        setMessage(`Encuentra: ${formatName(next)}`);
    };

    const handleCountryClick = (countryKey: string) => {
        if (gameState !== 'playing') return;

        if (countryKey === targetCountry) {
            // Correct
            setScore(s => s + 10);
            setMessage('¡Correcto! 🎉');

            // Remove from pool
            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);

            setTimeout(() => {
                nextTurn();
            }, 1000);
        } else {
            // Incorrect
            setErrors(e => e + 1);
            setScore(s => Math.max(0, s - 5));
            setMessage('¡Ups! Inténtalo de nuevo ❌');
        }
    };

    const formatName = (key: string) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    const resetGame = () => {
        setScore(0);
        setErrors(0);
        setRemainingCountries(Object.keys(EUROPE_COUNTRIES));
        setGameState('playing');
        setTimeout(nextTurn, 100);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* HUD */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <Globe className="text-blue-400 w-8 h-8" />
                    <div>
                        <h2 className="text-2xl font-black text-white">{score} pts</h2>
                        <p className="text-blue-200 text-sm">Aciertos: {Object.keys(EUROPE_COUNTRIES).length - remainingCountries.length}</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Objetivo</div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={targetCountry}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-3xl font-black text-yellow-400 drop-shadow-md"
                        >
                            {gameState === 'finished' ? '¡COMPLETADO!' : formatName(targetCountry)}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="text-right">
                        <div className="text-red-400 font-bold">{errors} Fallos</div>
                        <div className="text-xs text-gray-500">Sigue intentándolo</div>
                    </div>
                    <button
                        onClick={resetGame}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-white"
                        title="Reiniciar"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="relative bg-blue-900/30 rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center">
                {gameState === 'finished' ? (
                    <div className="text-center p-8">
                        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 animate-bounce" />
                        <h3 className="text-4xl font-black text-white mb-4">¡Mapa Completado!</h3>
                        <p className="text-xl text-gray-300 mb-8">Puntuación final: {score}</p>
                        <button
                            onClick={resetGame}
                            className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-transform active:scale-95"
                        >
                            Jugar Otra Vez
                        </button>
                    </div>
                ) : (
                    <svg viewBox="0 0 800 800" className="w-full h-full drop-shadow-2xl">
                        {/* Sea/Background is handled by container color */}

                        {Object.entries(EUROPE_COUNTRIES).map(([key, d]) => {
                            const isRemaining = remainingCountries.includes(key);
                            return (
                                <motion.path
                                    key={key}
                                    d={d[0]} // Taking first path of array
                                    className={`
                                        cursor-pointer transition-all duration-300 stroke-2
                                        ${isRemaining
                                            ? 'fill-slate-700 stroke-slate-500 hover:fill-blue-500 hover:stroke-blue-300'
                                            : 'fill-green-500 stroke-green-300 pointer-events-none'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleCountryClick(key)}
                                />
                            );
                        })}
                    </svg>
                )}

                {/* Feedback Toast */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full border border-white/20 shadow-xl font-bold"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <p className="text-center text-gray-500 mt-6 text-sm">
                * Mapa simplificado con fines educativos. Haz clic en el país que se te pide.
            </p>
        </div>
    );
}
