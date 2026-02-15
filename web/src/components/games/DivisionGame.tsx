'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Trophy } from '@phosphor-icons/react';
import { Pizza, Smile, CheckCircle, XCircle, ArrowRight, RefreshCw, Timer, Hand } from 'lucide-react';

type GameState = 'start' | 'playing' | 'feedback' | 'finished';

interface DivisionProblem {
    dividend: number; // Total items
    divisor: number;  // Number of groups/people
    quotient: number; // Items per group
    remainder: number; // Leftovers
}

export default function DivisionGame() {
    const { t } = useLanguage();
    const [level, setLevel] = useState(1);
    const [problem, setProblem] = useState<DivisionProblem>({ dividend: 6, divisor: 2, quotient: 3, remainder: 0 });
    const [distributedCounts, setDistributedCounts] = useState<number[]>([]); // Items per person currently
    const [itemsLeft, setItemsLeft] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [userRemainder, setUserRemainder] = useState('');
    const [streak, setStreak] = useState(0);
    const [dragActive, setDragActive] = useState(false);

    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode });

    // Refs for drop zones
    const friendRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Generate new problem
    const generateProblem = (targetState: 'playing' | 'feedback' | 'start' = 'playing') => {
        let maxDividend = 12;
        let maxDivisor = 3;

        // Level scaling
        if (level === 1) { maxDividend = 10; maxDivisor = 2; } // Very simple
        else if (level === 2) { maxDividend = 15; maxDivisor = 3; }
        else if (level > 2) { maxDividend = 25; maxDivisor = 5; }
        else if (level > 5) { maxDividend = 50; maxDivisor = 8; }

        // Ensure clean divisions for lower levels
        let divisor = Math.floor(Math.random() * (maxDivisor - 1)) + 2; // Min 2

        // For level 1, force even numbers and no remainder
        if (level === 1) {
            divisor = 2;
        }

        let quotient = Math.floor(Math.random() * 5) + 1;

        // Sometimes odd numbers in higher levels
        let remainder = 0;
        if (level > 3 && Math.random() > 0.5) {
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
        if (targetState !== 'start') setGameState(targetState);
        setUserAnswer('');
        setUserRemainder('');
    };

    useEffect(() => {
        generateProblem('start');
    }, []);



    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setStreak(0);
        setLevel(1);
        generateProblem('playing');
    };

    // Distribute one item to all (animation helper)
    const distributeOneRound = () => {
        if (itemsLeft >= problem.divisor) {
            const newCounts = distributedCounts.map(c => c + 1);
            setDistributedCounts(newCounts);
            setItemsLeft(itemsLeft - problem.divisor);
        }
    };

    // Distribute ALL automatically
    const autoDistribute = () => {
        const q = Math.floor(problem.dividend / problem.divisor);
        const r = problem.dividend % problem.divisor;
        setDistributedCounts(new Array(problem.divisor).fill(q));
        setItemsLeft(r);
    };

    // DRAG AND DROP HANDLER
    const handleDragEnd = (event: any, info: any) => {
        setDragActive(false);
        const point = { x: info.point.x, y: info.point.y };

        // Check if dropped on any friend
        // We use document.elementFromPoint for simplicity with pointer events
        const elem = document.elementFromPoint(point.x, point.y);
        const friendIdx = elem?.closest('[data-friend-index]')?.getAttribute('data-friend-index');

        if (friendIdx !== undefined && friendIdx !== null) {
            const idx = parseInt(friendIdx);
            if (!isNaN(idx) && itemsLeft > 0) {
                // Determine how many to drop? Just 1 for manual drag
                setDistributedCounts(prev => {
                    const newCounts = [...prev];
                    newCounts[idx]++;
                    return newCounts;
                });
                setItemsLeft(prev => prev - 1);
            }
        }
    };

    const checkAnswer = () => {
        const isQuotientCorrect = parseInt(userAnswer) === problem.quotient;
        const isRemainderCorrect = problem.remainder === 0
            ? true // If no remainder, ignore field or check empty or 0
            : parseInt(userRemainder || '0') === problem.remainder;

        if (isQuotientCorrect && isRemainderCorrect) {
            setGameState('feedback');
            addScore(10 + (streak * 2));
            setStreak(s => s + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                setLevel(l => l + 1);
                generateProblem();
            }, 4000); // Longer wait to read feedback
        } else {
            setStreak(0);
            addError();
            // Shake effect
            const btn = document.getElementById('submit-btn');
            btn?.classList.add('animate-shake');
            setTimeout(() => btn?.classList.remove('animate-shake'), 500);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 relative select-none">

            {/* START OVERLAY - Unified with Map style */}
            {gameState === 'start' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl h-full min-h-[500px]">
                    <div className="bg-orange-500/10 p-6 rounded-full mb-6 ring-1 ring-orange-500/30">
                        <Pizza className="w-16 h-16 text-orange-500" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{t.gamesPage.divisionGame.title}</h2>
                    <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                        {t.gamesPage.divisionGame.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => startGame('challenge')}
                            className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                        >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    {t.gamesPage.divisionGame.startBtn}
                                    <Trophy className="w-5 h-5 opacity-50" />
                                </div>
                                <span className="text-xs opacity-70 font-bold tracking-wider">MODO RETO</span>
                            </span>
                        </button>

                        <button
                            onClick={() => startGame('practice')}
                            className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                        >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    PRÁCTICA
                                    <RefreshCw className="w-5 h-5 opacity-50" />
                                </div>
                                <span className="text-xs opacity-50 font-bold tracking-wider">SIN LÍMITE</span>
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {/* HUD */}
            <GameHUD
                title={t.gamesPage.divisionGame.title}
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={10} // Division level targets
                remainingTargets={10 - (level % 10)}
                targetName=""
                onReset={() => setGameState('start')}
                colorTheme="orange"
                message={message}
                icon={<Pizza className="w-8 h-8 text-orange-400" />}
            />

            {/* Game Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* VISUAL INTERACTION AREA */}
                <div className="bg-transparent border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl">
                    <h3 className="text-white text-center mb-2 font-bold text-lg">
                        {t.gamesPage.divisionGame.task
                            .replace('{dividend}', problem.dividend.toString())
                            .replace('{divisor}', problem.divisor.toString())}
                    </h3>
                    <p className="text-white/40 text-center text-xs mb-6 flex items-center justify-center gap-2">
                        <Hand className="w-4 h-4" /> {t.gamesPage.divisionGame.dragHint}
                    </p>

                    {/* PIZZA SOURCE (DRAGGABLE) */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8 min-h-[100px] p-4 bg-transparent rounded-xl border border-dashed border-white/20 relative z-20">
                        <AnimatePresence>
                            {Array.from({ length: itemsLeft }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    layoutId={`pizza-source-${i}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    drag
                                    dragSnapToOrigin
                                    onDragStart={() => setDragActive(true)}
                                    whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
                                    onDragEnd={handleDragEnd}
                                    className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                                >
                                    <Pizza className="w-10 h-10 text-orange-500 fill-orange-500/20 drop-shadow-lg" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {itemsLeft === 0 && <span className="text-gray-500 text-sm self-center">{t.gamesPage.divisionGame.emptyBox}</span>}
                    </div>

                    {/* DROP TARGETS (FRIENDS) */}
                    <div className="flex flex-wrap justify-center gap-4 mt-auto">
                        {distributedCounts.map((count, idx) => (
                            <div
                                key={idx}
                                data-friend-index={idx} // Used for hit detection
                                className={`flex flex-col items-center gap-2 transition-all p-2 rounded-2xl ${dragActive ? 'bg-blue-500/20 ring-2 ring-blue-400 border-transparent scale-105' : 'bg-transparent border border-transparent'}`}
                            >
                                <div className="relative">
                                    <Smile className={`w-14 h-14 ${dragActive ? 'text-blue-200 animate-bounce' : 'text-yellow-400'}`} />
                                    <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-slate-900 shadow-lg">
                                        {count}
                                    </div>
                                </div>
                                <div className="bg-slate-800/50 p-2 rounded-xl w-24 h-24 flex flex-wrap content-start gap-1 justify-center overflow-auto border border-white/10 shadow-inner">
                                    {Array.from({ length: count }).map((_, pi) => (
                                        <motion.div
                                            key={`p-${idx}-${pi}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="relative"
                                        >
                                            <Pizza className="w-5 h-5 text-orange-400" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reset/Auto Helpers */}
                    <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-white/5">
                        <button onClick={distributeOneRound} disabled={itemsLeft < problem.divisor} className="text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition">
                            {t.gamesPage.divisionGame.distributeOne}
                        </button>
                        <button onClick={autoDistribute} disabled={itemsLeft < problem.divisor} className="text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition">
                            {t.gamesPage.divisionGame.distributeAll}
                        </button>
                        <button onClick={() => { setItemsLeft(problem.dividend); setDistributedCounts(new Array(problem.divisor).fill(0)); }} className="text-xs bg-white/5 hover:bg-white/10 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg transition">
                            <RefreshCw className="w-3 h-3 inline mr-1" /> {t.gamesPage.divisionGame.reset}
                        </button>
                    </div>
                </div>

                {/* MATH CONTROLS AREA */}
                <div className="flex flex-col gap-6">
                    <div className="bg-transparent border border-white/20 p-8 rounded-3xl text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-8">{t.gamesPage.divisionGame.writeDivision}</h2>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-3xl md:text-5xl font-black text-white mb-12 font-mono">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-inner min-w-[3ch] text-center">
                                {problem.dividend}
                            </div>
                            <span className="text-teal-400">÷</span>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-inner min-w-[3ch] text-center">
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
                            />
                        </div>

                        {/* Remainder Input */}
                        <AnimatePresence>
                            {(itemsLeft > 0 || level > 3) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/30 inline-block mx-auto"
                                >
                                    <label className="text-orange-300 text-sm font-bold block mb-2 uppercase tracking-wider">
                                        {t.gamesPage.divisionGame.remainderQuestion}
                                    </label>
                                    <input
                                        type="number"
                                        value={userRemainder}
                                        onChange={(e) => setUserRemainder(e.target.value)}
                                        className="w-24 bg-slate-900 text-orange-400 p-2 rounded-lg border-2 border-orange-500/50 outline-none text-center text-2xl font-bold"
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
                            {t.gamesPage.divisionGame.checkAnswer} <CheckCircle className="w-6 h-6" />
                        </button>
                    </div>

                    {/* EDUCATIONAL FEEDBACK */}
                    <AnimatePresence>
                        {gameState === 'feedback' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-3xl text-center shadow-2xl border border-white/20"
                            >
                                <h3 className="text-2xl font-black mb-4">{t.gamesPage.divisionGame.greatJob}</h3>
                                <div className="bg-black/20 rounded-xl p-4 mb-4">
                                    <p className="text-lg mb-2 text-indigo-200 uppercase tracking-widest text-xs font-bold">{t.gamesPage.divisionGame.keyConcept}</p>
                                    <p className="font-mono text-xl md:text-2xl font-bold">
                                        <span className="text-teal-300">{problem.quotient}</span> <span className="text-white/50">x</span> <span className="text-orange-300">{problem.divisor}</span>
                                        {problem.remainder > 0 && <span className="text-yellow-300"> + {problem.remainder}</span>}
                                        <span className="text-white/50"> = </span> <span className="text-white">{problem.dividend}</span>
                                    </p>
                                </div>
                                <p className="text-indigo-100 text-sm">
                                    {t.gamesPage.divisionGame.explanation
                                        .replace('{dividend}', problem.dividend.toString())
                                        .replace('{divisor}', problem.divisor.toString())
                                        .replace('{quotient}', problem.quotient.toString())}
                                    {problem.remainder > 0 && t.gamesPage.divisionGame.remainder.replace('{remainder}', problem.remainder.toString())}
                                    .
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        </div >
    );
}
