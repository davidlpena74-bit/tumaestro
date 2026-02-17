'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { Hash, CheckCircle, RefreshCw, Trophy, Timer, MousePointer2 } from 'lucide-react';

type GameState = 'start' | 'playing' | 'feedback' | 'finished';

export default function MultiplicationGame({ taskId = null }: { taskId?: string | null }) {
    const { t } = useLanguage();
    const [level, setLevel] = useState(1);
    const [numA, setNumA] = useState(2);
    const [numB, setNumB] = useState(3);
    const [userAnswer, setUserAnswer] = useState('');
    const [streak, setStreak] = useState(0);
    const [activeIntersections, setActiveIntersections] = useState<Set<string>>(new Set());

    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame,
        handleFinish
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode, taskId });

    const generateProblem = (targetState: 'playing' | 'feedback' | 'start' = 'playing') => {
        let max = 4;
        if (level > 2) max = 6;
        if (level > 5) max = 9;

        const a = Math.floor(Math.random() * (max - 1)) + 2;
        const b = Math.floor(Math.random() * (max - 1)) + 2;

        setNumA(a);
        setNumB(b);
        setUserAnswer('');
        setActiveIntersections(new Set());
        if (targetState !== 'start') setGameState(targetState);
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

    const checkAnswer = () => {
        if (parseInt(userAnswer) === numA * numB) {
            setGameState('feedback');
            addScore(10 + (streak * 2));
            setStreak(s => s + 1);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#3B82F6', '#10B981', '#F59E0B']
            });
            setTimeout(() => {
                if (level >= 10) {
                    handleFinish();
                    return;
                }
                setLevel(l => l + 1);
                generateProblem();
            }, 4000);
        } else {
            setStreak(0);
            addError();
            const btn = document.getElementById('submit-btn');
            btn?.classList.add('animate-shake');
            setTimeout(() => btn?.classList.remove('animate-shake'), 500);
        }
    };

    const toggleIntersection = (row: number, col: number) => {
        const key = `${row}-${col}`;
        const newSet = new Set(activeIntersections);
        if (newSet.has(key)) {
            newSet.delete(key);
        } else {
            newSet.add(key);
        }
        setActiveIntersections(newSet);
    };

    // Calculate line positions
    // We'll use a viewBox of 400x400
    const padding = 60;
    const size = 340;

    const getHorizontalLineY = (index: number, total: number) => {
        if (total === 1) return 200;
        const spacing = size / (total - 1);
        return padding + (index * spacing);
    };

    const getVerticalLineX = (index: number, total: number) => {
        if (total === 1) return 200;
        const spacing = size / (total - 1);
        return padding + (index * spacing);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 relative select-none">
            {/* START OVERLAY */}
            {gameState === 'start' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl h-full min-h-[500px]">
                    <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/30">
                        <Hash className="w-16 h-16 text-blue-500" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{t.gamesPage.multiplicationGame.title}</h2>
                    <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                        {t.gamesPage.multiplicationGame.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => startGame('challenge')}
                            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                        >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    {t.gamesPage.multiplicationGame.startBtn}
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
                title={t.gamesPage.multiplicationGame.title}
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={10}
                remainingTargets={10 - (level % 10)}
                targetName=""
                onReset={() => setGameState('start')}
                colorTheme="blue"
                message={message}
                icon={<Hash className="w-8 h-8 text-blue-400" />}
            />

            {/* Game Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* VISUAL AREA */}
                <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 min-h-[500px] flex flex-col relative overflow-hidden shadow-2xl">
                    <h3 className="text-white text-center mb-2 font-bold text-lg">
                        {t.gamesPage.multiplicationGame.task
                            .replace('{a}', numA.toString())
                            .replace('{b}', numB.toString())}
                    </h3>
                    <p className="text-white/40 text-center text-xs mb-6 flex items-center justify-center gap-2">
                        <MousePointer2 className="w-4 h-4" /> {t.gamesPage.multiplicationGame.countIntersections}
                    </p>

                    <div className="flex-1 flex items-center justify-center p-4">
                        <svg viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            {/* Horizontal Lines (A) */}
                            {Array.from({ length: numA }).map((_, i) => (
                                <motion.line
                                    key={`h-${i}`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    x1="20"
                                    y1={getHorizontalLineY(i, numA)}
                                    x2="380"
                                    y2={getHorizontalLineY(i, numA)}
                                    stroke="#3B82F6"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            ))}

                            {/* Vertical Lines (B) */}
                            {Array.from({ length: numB }).map((_, i) => (
                                <motion.line
                                    key={`v-${i}`}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: (numA * 0.1) + (i * 0.1) }}
                                    x1={getVerticalLineX(i, numB)}
                                    y1="20"
                                    x2={getVerticalLineX(i, numB)}
                                    y2="380"
                                    stroke="#ec4899"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            ))}

                            {/* Intersections */}
                            {Array.from({ length: numA }).map((_, row) =>
                                Array.from({ length: numB }).map((_, col) => {
                                    const isActive = activeIntersections.has(`${row}-${col}`);
                                    return (
                                        <motion.circle
                                            key={`int-${row}-${col}`}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            whileHover={{ scale: 1.5 }}
                                            transition={{ delay: (numA + numB) * 0.1 + (row * numB + col) * 0.05 }}
                                            cx={getVerticalLineX(col, numB)}
                                            cy={getHorizontalLineY(row, numA)}
                                            r={isActive ? "10" : "6"}
                                            fill={isActive ? "#10B981" : "#ffffff"}
                                            className="cursor-pointer"
                                            onClick={() => toggleIntersection(row, col)}
                                            style={{
                                                filter: isActive ? 'drop-shadow(0 0 8px #10B981)' : 'none'
                                            }}
                                        />
                                    );
                                })
                            )}
                        </svg>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm">
                        <span className="text-blue-400 font-bold flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            {t.gamesPage.multiplicationGame.linesA.replace('{a}', numA.toString())}
                        </span>
                        <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-emerald-400 font-mono text-xl font-black">
                            {activeIntersections.size}
                        </div>
                        <span className="text-pink-400 font-bold flex items-center gap-2">
                            <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                            {t.gamesPage.multiplicationGame.linesB.replace('{b}', numB.toString())}
                        </span>
                    </div>
                </div>

                {/* CONTROLS AREA */}
                <div className="flex flex-col gap-6">
                    <div className="bg-slate-900/50 border border-white/20 p-8 rounded-3xl text-center shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-8">{t.gamesPage.divisionGame.checkAnswer}</h2>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-4xl md:text-6xl font-black text-white mb-12 font-mono">
                            <div className="text-blue-500 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/30">
                                {numA}
                            </div>
                            <span className="text-white/40">×</span>
                            <div className="text-pink-500 bg-pink-500/10 p-4 rounded-2xl border border-pink-500/30">
                                {numB}
                            </div>
                            <span className="text-white/40">=</span>

                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                                className="w-32 bg-white text-slate-900 p-4 rounded-2xl border-4 border-emerald-500 focus:border-emerald-400 outline-none text-center shadow-[0_0_30px_rgba(16,185,129,0.3)] placeholder-gray-300"
                                placeholder="?"
                                autoFocus
                            />
                        </div>

                        <button
                            id="submit-btn"
                            onClick={checkAnswer}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xl font-black py-4 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
                        >
                            {t.gamesPage.divisionGame.checkAnswer} <CheckCircle className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => generateProblem()}
                            className="mt-4 flex items-center gap-2 text-white/40 hover:text-white/70 mx-auto transition-colors text-sm uppercase font-bold tracking-widest"
                        >
                            <RefreshCw className="w-4 h-4" /> {t.gamesPage.divisionGame.reset}
                        </button>
                    </div>

                    {/* FEEDBACK */}
                    <AnimatePresence>
                        {gameState === 'feedback' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-3xl text-center shadow-2xl border border-white/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-pulse"></div>
                                <h3 className="text-3xl font-black mb-4">{t.gamesPage.multiplicationGame.greatJob}</h3>
                                <div className="bg-black/20 rounded-2xl p-6 mb-4">
                                    <p className="text-blue-200 uppercase tracking-widest text-xs font-bold mb-2">{t.gamesPage.divisionGame.keyConcept}</p>
                                    <p className="font-mono text-3xl md:text-4xl font-bold">
                                        <span className="text-blue-300">{numA}</span>
                                        <span className="text-white/30 mx-3">×</span>
                                        <span className="text-pink-300">{numB}</span>
                                        <span className="text-white/30 mx-3">=</span>
                                        <span className="text-emerald-400">{numA * numB}</span>
                                    </p>
                                </div>
                                <p className="text-blue-100/80 text-lg italic">
                                    {t.gamesPage.multiplicationGame.explanation
                                        .replace('{a}', numA.toString())
                                        .replace('{b}', numB.toString())
                                        .replace('{result}', (numA * numB).toString())}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
