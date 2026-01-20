'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pizza, Smile, CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

type GameState = 'playing' | 'feedback' | 'finished';

interface DivisionProblem {
    dividend: number; // Total items
    divisor: number;  // Number of groups/people
    quotient: number; // Items per group
    remainder: number; // Leftovers
}

export default function DivisionGame() {
    const [level, setLevel] = useState(1);
    const [points, setPoints] = useState(0);
    const [gameState, setGameState] = useState<GameState>('playing');
    const [problem, setProblem] = useState<DivisionProblem>({ dividend: 6, divisor: 2, quotient: 3, remainder: 0 });
    const [distributedCounts, setDistributedCounts] = useState<number[]>([]); // Items per person currently
    const [itemsLeft, setItemsLeft] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [userRemainder, setUserRemainder] = useState('');
    const [streak, setStreak] = useState(0);

    // Generate new problem
    const generateProblem = () => {
        let maxDividend = 12;
        let maxDivisor = 3;

        if (level > 2) { maxDividend = 20; maxDivisor = 5; }
        if (level > 5) { maxDividend = 50; maxDivisor = 9; }

        // Ensure clean divisions for lower levels
        let divisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Min 2
        let quotient = Math.floor(Math.random() * 5) + 1;

        // Sometimes odd numbers in higher levels
        let remainder = 0;
        if (level > 4 && Math.random() > 0.5) {
            remainder = Math.floor(Math.random() * (divisor - 1)) + 1;
        }

        let dividend = (divisor * quotient) + remainder;

        // Cap dividend to avoid UI clutter
        if (dividend > 30) dividend = 30;

        // Recalculate true values based on capped dividend
        quotient = Math.floor(dividend / divisor);
        remainder = dividend % divisor;

        setProblem({ dividend, divisor, quotient, remainder });
        setItemsLeft(dividend);
        setDistributedCounts(new Array(divisor).fill(0));
        setGameState('playing');
        setUserAnswer('');
        setUserRemainder('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    // Distribute one item to all (animation helper)
    const distributeOneRound = () => {
        if (itemsLeft >= problem.divisor) {
            const newCounts = distributedCounts.map(c => c + 1);
            setDistributedCounts(newCounts);
            setItemsLeft(itemsLeft - problem.divisor);
        }
    };

    // Distribute ALL automatically (for impatient kids or higher levels)
    const autoDistribute = () => {
        const q = Math.floor(problem.dividend / problem.divisor);
        const r = problem.dividend % problem.divisor;
        setDistributedCounts(new Array(problem.divisor).fill(q));
        setItemsLeft(r);
    };

    const checkAnswer = () => {
        const isQuotientCorrect = parseInt(userAnswer) === problem.quotient;
        const isRemainderCorrect = problem.remainder === 0
            ? true // If no remainder, ignore field or check empty
            : parseInt(userRemainder || '0') === problem.remainder;

        if (isQuotientCorrect && isRemainderCorrect) {
            setGameState('feedback');
            setPoints(p => p + 10 + (streak * 2));
            setStreak(s => s + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                setLevel(l => l + 1);
                generateProblem();
            }, 2500);
        } else {
            setStreak(0);
            // Shake effect or error msg
            const btn = document.getElementById('submit-btn');
            btn?.classList.add('animate-shake');
            setTimeout(() => btn?.classList.remove('animate-shake'), 500);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">

            {/* HUD */}
            <div className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-400 w-6 h-6" />
                    <span className="text-2xl font-black text-white">{points}</span>
                </div>
                <div className="text-white font-bold">Nivel {level}</div>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-400">Racha</div>
                    <div className="font-black text-orange-400 text-xl">x{streak}</div>
                </div>
            </div>

            {/* Game Area */}
            <div className="grid md:grid-cols-2 gap-8 items-start">

                {/* Visual Area */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[400px] flex flex-col relative overflow-hidden">
                    <h3 className="text-white text-center mb-6 font-bold text-lg">
                        Reparte {problem.dividend} Pizzas entre {problem.divisor} Amigos
                    </h3>

                    {/* Source Container (Pizzas Left) */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8 min-h-[60px] p-4 bg-slate-900/50 rounded-xl border border-dashed border-white/20">
                        <AnimatePresence>
                            {Array.from({ length: itemsLeft }).map((_, i) => (
                                <motion.div
                                    key={`pizza-${i}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0, y: 50, opacity: 0 }}
                                    className="relative"
                                >
                                    <Pizza className="w-8 h-8 text-orange-500 fill-orange-500/20" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {itemsLeft === 0 && <span className="text-gray-500 text-sm self-center">¡Caja vacía!</span>}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={distributeOneRound}
                            disabled={itemsLeft < problem.divisor}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold text-sm transition shadow-lg shadow-blue-600/20"
                        >
                            Repartir 1 a todos
                        </button>
                        <button
                            onClick={autoDistribute}
                            disabled={itemsLeft < problem.divisor}
                            className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold text-sm transition shadow-lg shadow-teal-600/20"
                        >
                            Repartir Todo
                        </button>
                        <button
                            onClick={() => {
                                setItemsLeft(problem.dividend);
                                setDistributedCounts(new Array(problem.divisor).fill(0));
                            }}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition"
                            title="Reiniciar Reparto"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Targets (Friends) */}
                    <div className="flex flex-wrap justify-center gap-6 mt-auto">
                        {distributedCounts.map((count, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2">
                                <div className="relative">
                                    <Smile className="w-16 h-16 text-yellow-400" />
                                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-slate-900">
                                        {count}
                                    </div>
                                </div>
                                <div className="bg-white/10 p-2 rounded-lg w-20 h-20 flex flex-wrap content-start gap-1 justify-center overflow-auto border border-white/5">
                                    {Array.from({ length: count }).map((_, pi) => (
                                        <motion.div
                                            key={pi}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                        >
                                            <Pizza className="w-4 h-4 text-orange-400" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Math Area */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-8">Escribe la División</h2>

                        <div className="flex items-center justify-center gap-4 text-3xl md:text-5xl font-black text-white mb-12 font-mono">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-inner">
                                {problem.dividend}
                            </div>
                            <span className="text-teal-400">÷</span>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-inner">
                                {problem.divisor}
                            </div>
                            <span>=</span>

                            {/* Quotient Input */}
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="w-24 bg-white text-slate-900 p-4 rounded-xl border-4 border-blue-500 focus:border-blue-400 outline-none text-center shadow-[0_0_20px_rgba(59,130,246,0.5)] placeholder-gray-300"
                                placeholder="?"
                                autoFocus
                            />
                        </div>

                        {/* Remainder Input (if needed or advanced levels) */}
                        <AnimatePresence>
                            {(itemsLeft > 0 || level > 3) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/30"
                                >
                                    <label className="text-orange-300 text-sm font-bold block mb-2 uppercase tracking-wider">
                                        ¿Sobró algo? (Resto)
                                    </label>
                                    <input
                                        type="number"
                                        value={userRemainder}
                                        onChange={(e) => setUserRemainder(e.target.value)}
                                        className="w-20 bg-slate-900 text-orange-400 p-2 rounded-lg border-2 border-orange-500/50 outline-none text-center text-xl font-bold"
                                        placeholder="0"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            id="submit-btn"
                            onClick={checkAnswer}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-xl font-black py-4 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
                        >
                            Comprobar <CheckCircle className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Feedback Message */}
                    <AnimatePresence>
                        {gameState === 'feedback' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-green-500 text-white p-6 rounded-2xl text-center shadow-2xl border-2 border-green-400"
                            >
                                <h3 className="text-2xl font-black mb-1">¡Correcto! 🎉</h3>
                                <p className="font-medium text-green-50">
                                    {problem.dividend} dividido entre {problem.divisor} es igual a {problem.quotient}
                                    {problem.remainder > 0 && ` y sobran ${problem.remainder}`}.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="text-white/30 text-sm">
                    Arrastra las pizzas o usa los botones para repartir. Luego escribe el resultado.
                </p>
            </div>
        </div>
    );
}
