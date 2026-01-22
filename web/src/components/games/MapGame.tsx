'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, MapPin, RefreshCw, XCircle, CheckCircle, HelpCircle, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from './spanish-provinces';
import confetti from 'canvas-confetti';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function MapGame() {
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 90, penaltyTime: 5 });

    const [targetId, setTargetId] = useState<string | null>(null);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [solvedIds, setSolvedIds] = useState<string[]>([]);

    const [attempts, setAttempts] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    // Fullscreen
    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const startGame = () => {
        hookStartGame();
        setAttempts(0);
        setCorrectCount(0);
        setSolvedIds([]); // Reset solved list
        pickNewTarget();
    };

    const pickNewTarget = () => {
        const allKeys = Object.keys(PROVINCE_NAMES);
        const availableKeys = allKeys.filter(k => !solvedIds.includes(k));

        const keys = availableKeys.length > 0 ? availableKeys : allKeys;

        let randomKey = keys[Math.floor(Math.random() * keys.length)];

        // Prevent repeating the same target immediately if possible
        if (targetId && keys.length > 1) {
            while (randomKey === targetId) {
                randomKey = keys[Math.floor(Math.random() * keys.length)];
            }
        }

        setTargetId(randomKey);
        setClickedId(null);
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || !targetId) return;
        if (solvedIds.includes(id)) return; // Prevent clicking already solved

        setClickedId(id);
        setAttempts(prev => prev + 1);

        if (id === targetId) {
            // Correct
            addScore(10);
            setSolvedIds(prev => [...prev, id]); // Add to solved list
            setCorrectCount(prev => prev + 1);
            setMessage(`¡Bien! Es ${PROVINCE_NAMES[id]}`);
            setTimeout(pickNewTarget, 600);

            // Celebration
            if (score > 1000 && score % 1000 < 20) confetti({ particleCount: 50 });
        } else {
            // Incorrect
            addScore(-30);
            addError();
            setMessage('¡Ups! Esa no es.');
        }
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Helper to check if it was a click or drag
    const isClick = useRef(true);

    const resetGame = () => {
        hookResetGame();
        startGame();
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center select-none">

            <GameHUD
                title="Desafío Provincial"
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                totalTargets={Object.keys(PROVINCE_NAMES).length}
                remainingTargets={Object.keys(PROVINCE_NAMES).length - solvedIds.length}
                targetName={targetId ? PROVINCE_NAMES[targetId] : '...'}
                message={message}
                onReset={resetGame}
                colorTheme="teal"
                icon={<Trophy className="w-8 h-8 text-teal-400" />}
            />

            {/* MAP CONTAINER */}
            <div
                ref={gameContainerRef}
                className="relative w-full aspect-square md:aspect-[1.4] bg-[#1a2333] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-move"
                onMouseDown={(e) => {
                    isClick.current = true;
                    handleMouseDown(e);
                }}
                onMouseMove={(e) => {
                    if (isDragging) isClick.current = false;
                    handleMouseMove(e);
                }}
                onMouseUp={() => {
                    handleMouseUp();
                    setTimeout(() => isClick.current = true, 50);
                }}
                onMouseLeave={handleMouseUp}
            >

                {/* CONTROLS (Zoom/Full) */}
                <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                    <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10" title="Reset View">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                        <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                            <MapPin className="w-12 h-12 text-teal-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Desafío Provincial</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            Demuestra que conoces cada rincón del país. Tienes 90 segundos para ubicar todas las provincias posibles.
                        </p>
                        <button
                            onClick={startGame}
                            className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                        </button>
                    </div>
                )}

                {/* GAME OVER OVERLAY */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]">
                        <Trophy className="w-24 h-24 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        <h2 className="text-4xl font-bold text-white mb-2">¡Tiempo Agotado!</h2>
                        <div className="flex flex-col items-center gap-1 mb-8">
                            <span className="text-gray-400 text-sm uppercase tracking-widest">Puntuación Final</span>
                            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                {score}
                            </span>
                        </div>
                        <button onClick={startGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                            <RefreshCw className="w-5 h-5" /> Intentar de nuevo
                        </button>
                    </div>
                )}

                {/* SVG MAP */}
                <svg
                    viewBox="0 0 700 700"
                    className="w-full h-full drop-shadow-2xl"
                    style={{ background: '#1e293b' }}
                >
                    <defs>
                        <filter id="glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Transform Group */}
                    <g
                        transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                        style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                    >

                        {/* AFRICA COASTLINE (DECORATIVE CONTEXT) */}
                        <path
                            d="M0,580 L80,565 L140,550 L165,542 L180,540 L195,545 L220,555 L280,565 L315,575 L325,582 L340,585 L400,580 L700,550 V700 H0 Z"
                            className="fill-white/5 stroke-white/10 stroke-1 pointer-events-none"
                        />

                        {/* CANARY ISLANDS INSET FRAME */}
                        <rect
                            x="465" y="440" width="205" height="75"
                            className="fill-none stroke-white/10 stroke-1 pointer-events-none stroke-dasharray-2 2"
                            rx="4"
                        />

                        {/* Render Provinces */}
                        {Object.entries(SPANISH_PROVINCES_PATHS).map(([id, paths]) => {
                            const isTarget = targetId === id;
                            const isClicked = clickedId === id;
                            const isSolved = solvedIds.includes(id);

                            let fillClass = "fill-white/90";
                            let strokeClass = "stroke-slate-900/50 stroke-[0.5]";

                            if (gameState === 'playing') {
                                fillClass = "fill-white hover:fill-teal-200 cursor-pointer transition-all duration-150 hover:drop-shadow-[4px_6px_6px_rgba(0,0,0,0.5)] hover:scale-[1.02] vector-effect-non-scaling-stroke"; // 3D diagonal effect

                                if (isSolved) {
                                    fillClass = "fill-green-500/80"; // Persistent completed style
                                }

                                if (isClicked) {
                                    strokeClass = "stroke-slate-900 stroke-1";
                                    if (isTarget) fillClass = "fill-green-500 animate-pulse";
                                    else fillClass = "fill-red-500";
                                }
                            }

                            return (
                                <g
                                    key={id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Only trigger if we weren't just dragging
                                        if (isClick.current) handleRegionClick(id);
                                    }}
                                    className="pointer-events-auto"
                                >
                                    {paths.map((d, i) => (
                                        <path
                                            key={i}
                                            d={d}
                                            className={cn(strokeClass, fillClass)}
                                            style={{ transformOrigin: 'center' }}
                                        />
                                    ))}
                                </g>
                            );
                        })}
                    </g>
                </svg>

            </div>

            <p className="text-gray-500 text-xs mt-4 flex items-center gap-2">
                <HelpCircle className="w-3 h-3" />
                <span>Usa los controles o rueda del ratón para hacer zoom. Arrastra para mover el mapa.</span>
            </p>
        </div>
    );
}
