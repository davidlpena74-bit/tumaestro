'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RIVERS_PATHS } from './data/rivers-paths';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from './spanish-communities-paths'; // For Background
import { calculatePathCentroid } from '@/lib/svg-utils';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function RiversGame() {
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 120, penaltyTime: 10 });

    const [targetRiver, setTargetRiver] = useState('');
    const [remainingRivers, setRemainingRivers] = useState<string[]>([]);

    // Attempt tracking
    const [attempts, setAttempts] = useState(0);
    const [failedRivers, setFailedRivers] = useState<string[]>([]);
    const [completedRivers, setCompletedRivers] = useState<string[]>([]);

    // Zoom state
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const clickStart = useRef({ x: 0, y: 0 });

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Memoize region labels
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            const primaryPath = paths[0];
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: REGION_DISPLAY_NAMES[id] || id,
                ...centroid
            };
        }).filter(l => l.x !== undefined);
    }, []);

    // Initialize
    useEffect(() => {
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const startGame = () => {
        hookStartGame();
        setAttempts(0);
        setFailedRivers([]);
        setCompletedRivers([]);
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);
        nextTurn(rivers);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetRiver(next);
        setAttempts(0);
    };

    const handleRiverClick = (name: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Stop pan
        if (gameState !== 'playing') return;

        // Check if it was a drag or a click
        if (Math.abs(e.clientX - clickStart.current.x) > 10 || Math.abs(e.clientY - clickStart.current.y) > 10) return;

        if (name === targetRiver) {
            // Correct
            addScore(10);
            setMessage('¡Correcto! 🎉');
            setCompletedRivers(prev => [...prev, name]);

            const newRemaining = remainingRivers.filter(r => r !== targetRiver);
            setRemainingRivers(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            addError(); // Handles score penalty and timer penalty
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste 3/3! ${targetRiver} marcado en rojo. ❌`);
                setFailedRivers(prev => [...prev, targetRiver]);
                setCompletedRivers(prev => [...prev, targetRiver]); // It's done, but failed

                const newRemaining = remainingRivers.filter(r => r !== targetRiver);
                setRemainingRivers(newRemaining);

                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                setMessage(`¡No! Eso es el ${name} (${newAttempts}/3) ❌`);
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setAttempts(0);
        setFailedRivers([]);
        setCompletedRivers([]);
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);
        setGameState('playing');
        nextTurn(rivers);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        clickStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 select-none">

            <GameHUD
                title="Ríos de España"
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                totalTargets={Object.keys(RIVERS_PATHS).length}
                remainingTargets={remainingRivers.length}
                targetName={targetRiver}
                message={message}
                onReset={resetGame}
                colorTheme="blue"
                icon={<Globe className="w-8 h-8 text-blue-400" />}
            />

            {/* MAP CONTAINER */}
            <div
                ref={gameContainerRef}
                className="relative bg-[#1e293b] rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                        <div className="bg-cyan-500/10 p-4 rounded-full mb-6 ring-1 ring-cyan-500/30">
                            <Globe className="w-12 h-12 text-cyan-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Ríos de España</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            ¿Conoces la hidrografía española? Encuentra los ríos principales en el mapa.
                        </p>
                        <button
                            onClick={startGame}
                            className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)] hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                        </button>
                    </div>
                )}

                {/* FINISHED OVERLAY */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce drop-shadow-[0_0_50px_rgba(250,204,21,0.5)]" />
                        <h3 className="text-5xl font-black text-white mb-6">
                            {timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Ríos Completados!'}
                        </h3>
                        <p className="text-2xl text-blue-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                        <button
                            onClick={resetGame}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-green-500/20 transition-transform active:scale-95"
                        >
                            Jugar Otra Vez
                        </button>
                    </div>
                )}

                {/* Controls */}
                <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 4))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>

                {/* MAP */}
                {(gameState === 'playing' || gameState === 'start') && (
                    <svg
                        viewBox="0 0 800 600"
                        className="w-full h-full"
                        style={{ background: '#ffffff' }} // White background
                    >
                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {/* BACKGROUND: SPAIN MAP */}
                            <g className="pointer-events-none">
                                {Object.values(SPANISH_COMMUNITIES_PATHS).flat().map((d: any, i) => (
                                    <path
                                        key={i}
                                        d={d}
                                        fill="#f8fafc" // Slate-50
                                        stroke="#94a3b8" // Slate-400
                                        strokeWidth="1"
                                    />
                                ))}
                            </g>

                            {/* REGION LABELS */}
                            <g className="pointer-events-none select-none">
                                {regionLabels.map((label, i) => label.x && (
                                    <text
                                        key={i}
                                        x={label.x}
                                        y={label.y}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-[10px] fill-slate-500 font-semibold tracking-wide uppercase opacity-90"
                                        style={{ fontSize: '9px' }} // Slightly larger
                                    >
                                        {label.name}
                                    </text>
                                ))}
                            </g>

                            {/* RIVERS LAYER */}
                            {Object.entries(RIVERS_PATHS).map(([name, d]) => {
                                const isTarget = name === targetRiver;
                                const isCompleted = completedRivers.includes(name);
                                const isFailed = failedRivers.includes(name);

                                // Stroke colors
                                let strokeColor = '#38bdf8'; // sky-400 default
                                if (isCompleted) strokeColor = '#22c55e'; // green-500
                                if (isFailed) strokeColor = '#ef4444'; // red-500

                                return (
                                    <g key={name} className="cursor-pointer group pointer-events-auto">
                                        {/* Invisible thick path for easier clicking */}
                                        <path
                                            onClick={(e) => handleRiverClick(name, e)}
                                            d={d}
                                            stroke="white"
                                            strokeWidth="30" // Generous hit area
                                            fill="none"
                                            opacity="0" // Visible for hits but invisible to eye
                                            className="transition-all"
                                        />

                                        {/* Visible River path */}
                                        <path
                                            onClick={(e) => handleRiverClick(name, e)}
                                            d={d}
                                            stroke={strokeColor}
                                            strokeWidth={isTarget || isCompleted ? 4 : 3}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            className={`transition-all duration-300 ${!isCompleted && !isFailed ? 'group-hover:stroke-purple-400 group-hover:stroke-[4px]' : ''} drop-shadow-md`}
                                        />
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
}
