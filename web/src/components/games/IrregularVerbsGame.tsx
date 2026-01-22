'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, XCircle, HelpCircle, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS, type IrregularVerb } from './data/irregular-verbs';

export default function IrregularVerbsGame() {
    const [verbs, setVerbs] = useState<IrregularVerb[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [inputs, setInputs] = useState({
        pastSimple: '',
        pastParticiple: ''
    });
    const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const shuffled = [...IRREGULAR_VERBS].sort(() => Math.random() - 0.5);
        setVerbs(shuffled.slice(0, 10)); // Play 10 random verbs
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setGameOver(false);
        setInputs({ pastSimple: '', pastParticiple: '' });
        setShowResult(null);
    };

    const currentVerb = verbs[currentIndex];

    const checkAnswer = () => {
        if (!currentVerb) return;

        const isPastSimpleCorrect = inputs.pastSimple.toLowerCase().trim() === currentVerb.pastSimple.toLowerCase();
        // Allow simple match or match with alternatives if any (but here data is simple string)
        // Check for 'was/were' case specially if needed, but simple string comparison works if user types exactly
        // For 'was/were', let's be lenient if they type either 'was' or 'were' or 'was/were'
        const checkPastSimple = (input: string, target: string) => {
            if (target.includes('/')) {
                const options = target.split('/');
                return options.includes(input.toLowerCase().trim()) || input.toLowerCase().trim() === target;
            }
            return input.toLowerCase().trim() === target;
        }

        const correctSimple = checkPastSimple(inputs.pastSimple, currentVerb.pastSimple);
        const correctParticiple = inputs.pastParticiple.toLowerCase().trim() === currentVerb.pastParticiple.toLowerCase();

        if (correctSimple && correctParticiple) {
            setShowResult('correct');
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setShowResult('incorrect');
            setStreak(0);
        }
    };

    const nextVerb = () => {
        if (currentIndex < verbs.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setInputs({ pastSimple: '', pastParticiple: '' });
            setShowResult(null);
        } else {
            setGameOver(true);
        }
    };

    if (!currentVerb) return null;

    if (gameOver) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center"
                >
                    <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-12 h-12 text-yellow-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">¡Juego Completado!</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Tu puntuación final: <span className="text-blue-400 font-bold">{score}</span> puntos
                    </p>
                    <button
                        onClick={startNewGame}
                        className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-8 bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold">{score} pts</span>
                </div>
                <div className="text-slate-400 text-sm font-medium">
                    Verbo {currentIndex + 1} de {verbs.length}
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                    <div className="text-xs uppercase font-bold tracking-wider">Racha</div>
                    <div className="font-black text-xl">{streak}</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Verb Card */}
                <motion.div
                    key={currentVerb.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-xl"
                >
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2 capitalize">{currentVerb.infinitive}</h2>
                    <p className="text-blue-100 text-lg">({currentVerb.translation})</p>
                </motion.div>

                {/* Input Area */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Past Simple</label>
                            <input
                                type="text"
                                value={inputs.pastSimple}
                                onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                disabled={showResult !== null}
                                placeholder="e.g. broke"
                                className={`w-full bg-slate-950 border-2 rounded-xl px-4 py-3 text-white outline-none transition-all
                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                        showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                            'border-white/10 focus:border-blue-500'}`}
                            />
                            {showResult === 'incorrect' && (
                                <p className="text-red-400 text-sm mt-1 ml-1">Correcto: {currentVerb.pastSimple}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Past Participle</label>
                            <input
                                type="text"
                                value={inputs.pastParticiple}
                                onChange={(e) => setInputs(prev => ({ ...prev, pastParticiple: e.target.value }))}
                                disabled={showResult !== null}
                                placeholder="e.g. broken"
                                className={`w-full bg-slate-950 border-2 rounded-xl px-4 py-3 text-white outline-none transition-all
                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                        showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                            'border-white/10 focus:border-blue-500'}`}
                            />
                            {showResult === 'incorrect' && (
                                <p className="text-red-400 text-sm mt-1 ml-1">Correcto: {currentVerb.pastParticiple}</p>
                            )}
                        </div>
                    </div>

                    {showResult === null ? (
                        <button
                            onClick={checkAnswer}
                            disabled={!inputs.pastSimple || !inputs.pastParticiple}
                            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            Comprobar
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl flex items-center justify-between ${showResult === 'correct' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}
                        >
                            <div className="flex items-center gap-3">
                                {showResult === 'correct' ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-400" />
                                )}
                                <span className={showResult === 'correct' ? 'text-green-100' : 'text-red-100'}>
                                    {showResult === 'correct' ? '¡Correcto! Sigue así.' : '¡Vaya! Intenta recordar para la próxima.'}
                                </span>
                            </div>
                            <button
                                onClick={nextVerb}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                            >
                                Siguiente <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
