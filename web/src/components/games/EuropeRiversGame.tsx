'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EUROPE_RIVERS_PATHS } from './data/europe-rivers-paths';
import { EUROPE_PATHS } from './data/europe-paths'; // For Background
import { EUROPE_MAPPING } from './data/country-translations';
import { EUROPE_CAPITALS_COORDS } from './data/europe-capitals-coords';
import { calculatePathCentroid } from '@/lib/svg-utils';
import RatingSystem from './RatingSystem';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function EuropeRiversGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { language, t } = useLanguage();
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

    const [targetRiver, setTargetRiver] = useState('');
    const [remainingRivers, setRemainingRivers] = useState<string[]>([]);

    // Attempt tracking
    const [attempts, setAttempts] = useState(0);
    const [failedRivers, setFailedRivers] = useState<string[]>([]);
    const [completedRivers, setCompletedRivers] = useState<string[]>([]);

    // Zoom state
    const [zoom, setZoom] = useState(1.8);
    const [pan, setPan] = useState({ x: -160, y: -170 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const clickStart = useRef({ x: 0, y: 0 });

    const [hoveredRiver, setHoveredRiver] = useState<string | null>(null);

    // Sort rivers to ensure the hovered one is rendered last (on top)
    const sortedRivers = useMemo(() => {
        const entries = Object.entries(EUROPE_RIVERS_PATHS);
        if (!hoveredRiver) return entries;
        return [...entries].sort((a, b) => {
            if (a[0] === hoveredRiver) return 1;
            if (b[0] === hoveredRiver) return -1;
            return 0;
        });
    }, [hoveredRiver]);


    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Memoize country labels
    const countryLabels = useMemo(() => {
        return Object.entries(EUROPE_PATHS).map(([id, pathD]) => {
            // Priority 1: Use Capital Coordinate (fixes Portugal/Norway issues with islands)
            let coord = EUROPE_CAPITALS_COORDS[id];

            // Priority 2: Fallback to path centroid
            if (!coord) {
                const centroid = calculatePathCentroid(pathD);
                if (centroid) coord = centroid;
            }

            // Manual Overrides for cosmetic perfection
            if (id === 'Portugal') {
                // Keep visually pleasing
            }

            const spanishName = EUROPE_MAPPING[id];

            if (!spanishName || !coord) return null;

            return {
                id,
                name: spanishName,
                x: coord.x,
                y: coord.y
            };
        }).filter(Boolean) as { id: string; name: string; x: number; y: number }[];
    }, []);

    // Initialize
    useEffect(() => {
        const rivers = Object.keys(EUROPE_RIVERS_PATHS);
        setRemainingRivers(rivers);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setAttempts(0);
        setFailedRivers([]);
        setCompletedRivers([]);
        const rivers = Object.keys(EUROPE_RIVERS_PATHS);
        setRemainingRivers(rivers);
        nextTurn(rivers);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            handleFinish();
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetRiver(next);
        setAttempts(0);
        speak(`${t.common.find} ${next}`, language === 'es' ? 'es-ES' : 'en-US');
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
            addError();
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
                if (gameMode === 'practice') {
                    setMessage(language === 'es' ? `¡No! Eso es el ${name} (${newAttempts}/3) ❌` : `No! That is the ${name} (${newAttempts}/3) ❌`);
                } else {
                    setMessage(language === 'es' ? `¡Incorrecto! (${newAttempts}/3) ❌` : `Incorrect! (${newAttempts}/3) ❌`);
                }
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setAttempts(0);
        setFailedRivers([]);
        setCompletedRivers([]);
        const rivers = Object.keys(EUROPE_RIVERS_PATHS);
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
        // Panning blocked by user request
        /*
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
        */
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div
            ref={gameContainerRef}
            className={cn(
                "w-full flex flex-col items-center select-none transition-all duration-300",
                isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : ""
            )}
        >
            <div className={cn(
                "w-full flex flex-col items-center",
                isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4"
            )}>
                <GameHUD
                    title="Ríos de Europa"
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(EUROPE_RIVERS_PATHS).length}
                    remainingTargets={remainingRivers.length}
                    targetName={targetRiver}
                    region={t.gamesPage.regions.europe}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal"
                    icon={<Globe className="w-8 h-8 text-teal-400" />}
                    activityId={activityId}
                />

                {/* MAP CONTAINER */}
                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* START OVERLAY */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-start justify-center p-12 text-left rounded-[2rem]" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-1 ring-emerald-500/30">
                                <Globe className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-tight max-w-2xl">Ríos de Europa</h2>
                            <p className="text-gray-300 mb-10 max-w-xl text-lg leading-relaxed font-medium">
                                Viaja por el continente y encuentra los ríos más importantes. Demuestra tu dominio de la hidrografía continental.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-start">
                                <button
                                    onClick={() => startGame('challenge')}
                                    className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                                >
                                    <span className="relative z-10 flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-2">
                                            EMPEZAR RETO
                                            <Timer className="w-5 h-5 opacity-60" />
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
                                            <Globe className="w-5 h-5 opacity-50" />
                                        </div>
                                        <span className="text-xs opacity-50 font-bold tracking-wider">SIN LÍMITE</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* FINISHED OVERLAY */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-1 ring-emerald-500/30">
                                <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h3 className="text-5xl font-black text-white mb-6">
                                {timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Ríos Completados!'}
                            </h3>
                            <p className="text-2xl text-emerald-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                            <div className="w-full max-w-lg bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 mb-8 mt-4">
                                <RatingSystem activityId={activityId || "europe-rivers-game"} />
                            </div>
                            <button
                                onClick={resetGame}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-500/20 transition-transform active:scale-95"
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
                            style={{ background: 'transparent' }} // Transparent background
                        >
                            <defs>
                                <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
                                </filter>
                                <filter id="river-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                                {/* BACKGROUND: EUROPE MAP (Graphics only) */}
                                <g className="pointer-events-none">
                                    {Object.entries(EUROPE_PATHS).map(([id, d], i) => (
                                        <path
                                            key={i}
                                            d={d}
                                            fill="#f8fafc" // Slate-50
                                            stroke="#94a3b8" // Slate-400
                                            strokeWidth="0.5"
                                            style={{ transformOrigin: 'center' }}
                                        />
                                    ))}
                                </g>

                                {/* COUNTRY LABELS */}
                                <g className="pointer-events-none select-none">
                                    {countryLabels.map((label, i) => (
                                        <text
                                            key={i}
                                            x={label.x}
                                            y={label.y}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="text-[4px] fill-slate-400 font-medium tracking-wide uppercase opacity-70"
                                            style={{ fontSize: '4px' }} // Smaller font for Europe background
                                        >
                                            {label.name}
                                        </text>
                                    ))}
                                </g>

                                {/* RIVERS LAYER */}
                                {sortedRivers.map(([name, d]) => {
                                    const isTarget = name === targetRiver;
                                    const isCompleted = completedRivers.includes(name);
                                    const isFailed = failedRivers.includes(name);
                                    const isHovered = name === hoveredRiver;

                                    // Stroke Colors - MATCH RIVERS GAME
                                    let strokeColor = '#2563eb';
                                    if (isCompleted) strokeColor = '#22c55e';
                                    if (isFailed) strokeColor = '#ef4444';

                                    return (
                                        <g
                                            key={name}
                                            className="cursor-pointer group pointer-events-auto"
                                            onMouseEnter={() => setHoveredRiver(name)}
                                            onMouseLeave={() => setHoveredRiver(null)}
                                        >
                                            {/* Invisible thick path for click area */}
                                            <path
                                                onClick={(e) => handleRiverClick(name, e)}
                                                d={d}
                                                stroke="white"
                                                strokeWidth="30" // Generous hit area
                                                fill="none"
                                                opacity="0"
                                                className="transition-all"
                                            />

                                            {/* Visible River path */}
                                            <path
                                                onClick={(e) => handleRiverClick(name, e)}
                                                d={d}
                                                stroke={strokeColor}
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                className={`transition-all duration-300 ${!isCompleted && !isFailed && isHovered ? 'stroke-teal-400 stroke-[6px]' : ''}`}
                                                style={{ filter: 'url(#river-glow)' }}
                                            />
                                            <path
                                                d={d}
                                                stroke="rgba(255,255,255,0.3)"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill="none"
                                                className="pointer-events-none opacity-50"
                                            />
                                        </g>
                                    );
                                })}
                            </g>
                        </svg>
                    )}
                </div>

                <p className="text-center text-slate-300 mt-6 text-sm">
                    Encuentra el río correspondiente en el mapa de Europa.
                </p>
            </div>
        </div>
    );
}
