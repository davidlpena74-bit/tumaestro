'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RIVERS_PATHS } from './data/rivers-paths';
import { SPANISH_COMMUNITIES_PATHS } from './spanish-communities-paths'; // For Background

export default function RiversGame() {
    const [targetRiver, setTargetRiver] = useState('');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'finished'>('start');
    const [message, setMessage] = useState('');
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

    // Initialize
    useEffect(() => {
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setErrors(0);
        setAttempts(0);
        setFailedRivers([]);
        setCompletedRivers([]);
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);
        nextTurn(rivers);
    };

    // Auto-clear message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [message]);

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
            setScore(s => s + 10);
            setMessage('¡Correcto! 🎉');
            setCompletedRivers(prev => [...prev, name]);

            const newRemaining = remainingRivers.filter(r => r !== targetRiver);
            setRemainingRivers(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            setErrors(e => e + 1);
            setScore(s => Math.max(0, s - 5));

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
        setScore(0);
        setErrors(0);
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
            {/* HUD */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                        <Globe className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white">{score} <span className="text-sm font-normal text-blue-200">pts</span></h2>
                        <div className="text-xs font-bold text-blue-300/70 mt-0">
                            {(() => {
                                const attempts = score + errors;
                                return attempts > 0 ? Math.round((score / attempts) * 100) : 100;
                            })()}% Acierto
                        </div>
                        <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                            <span>Restantes: {remainingRivers.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 text-center bg-slate-900/50 p-4 rounded-xl border border-white/10 w-full md:w-auto">
                    <div className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-bold">Encuentra el Río</div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={targetRiver}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-2xl md:text-3xl font-black text-cyan-400 drop-shadow-sm truncate"
                        >
                            {gameState === 'finished' ? '¡COMPLETADO!' : targetRiver || 'Cargando...'}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-red-400 font-bold text-lg">{errors}</span>
                        <span className="text-red-400/60 text-xs uppercase">Fallos</span>
                    </div>
                    <button onClick={resetGame} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-white border border-white/5 hover:border-white/20">
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

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
                {/* Fullscreen HUD */}
                {isFullscreen && (
                    <div className="absolute top-6 left-0 right-0 mx-auto w-[95%] max-w-6xl z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-4 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <Globe className="text-blue-400 w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs text-blue-300 font-bold uppercase block">Puntos</span>
                                <span className="text-2xl font-black text-white">{score}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center flex-1">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Encuentra</span>
                            <span className="text-3xl font-black text-cyan-400 drop-shadow-sm animate-pulse">
                                {targetRiver}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                            <div>
                                <span className="text-xs text-red-300 font-bold uppercase block">Fallos</span>
                                <span className="text-2xl font-black text-red-400">{errors}</span>
                            </div>
                        </div>
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

                {gameState === 'finished' ? (
                    <div className="text-center p-8 z-10" onMouseDown={e => e.stopPropagation()}>
                        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce drop-shadow-[0_0_50px_rgba(250,204,21,0.5)]" />
                        <h3 className="text-5xl font-black text-white mb-6">¡Ríos Completados!</h3>
                        <p className="text-2xl text-blue-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                        <button
                            onClick={resetGame}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-green-500/20 transition-transform active:scale-95"
                        >
                            Jugar Otra Vez
                        </button>
                    </div>
                ) : (
                    <svg
                        viewBox="0 0 800 600"
                        className="w-full h-full"
                        style={{ background: '#0f172a' }} // Dark background
                    >
                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {/* BACKGROUND: SPAIN MAP */}
                            <g className="opacity-10 pointer-events-none">
                                {Object.values(SPANISH_COMMUNITIES_PATHS).flat().map((d: any, i) => (
                                    <path
                                        key={i}
                                        d={d}
                                        fill="#ffffff"
                                        stroke="#cbd5e1"
                                        strokeWidth="1"
                                    />
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
