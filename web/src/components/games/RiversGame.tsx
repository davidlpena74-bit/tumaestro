'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer, RefreshCw, MapPin, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RIVERS_PATHS } from './data/rivers-paths';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from './spanish-communities-paths';
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

export default function RiversGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
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

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const clickStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);


    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Memoize region labels
    const regionLabels = useMemo(() => {
        return Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
            // Hardcode Ceuta/Melilla due to path arc parameters breaking centroid calc
            if (id === 'ceuta') return { id, name: 'Ceuta', x: 232, y: 535 };
            if (id === 'melilla') return { id, name: 'Melilla', x: 281, y: 576 };

            const primaryPath = paths[0];
            const centroid = calculatePathCentroid(primaryPath);
            return {
                id,
                name: REGION_DISPLAY_NAMES[id] || id,
                ...centroid
            };
        }).filter(l => l.x !== undefined);
    }, []);

    // Initial load
    useEffect(() => {
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);

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

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
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
        if (gameState !== 'playing') return;
        if (!isClick.current) return;

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
        const rivers = Object.keys(RIVERS_PATHS);
        setRemainingRivers(rivers);
        startGame();
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        isClick.current = true;
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        clickStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning blocked by user request
        /*
        if (!isDragging) return;
        if (Math.abs(e.clientX - clickStart.current.x) > 5 || Math.abs(e.clientY - clickStart.current.y) > 5) {
            isClick.current = false;
        }
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
        */
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

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
                    title="Ríos de España"
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(RIVERS_PATHS).length}
                    remainingTargets={remainingRivers.length}
                    targetName={targetRiver}
                    region={t.gamesPage.regions.spain}
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
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >

                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-start justify-center p-12 text-left rounded-[2rem]" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <MapPin className="w-12 h-12 text-teal-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-tight max-w-2xl">Ríos de España</h2>
                            <p className="text-gray-300 mb-10 max-w-xl text-lg leading-relaxed font-medium">
                                ¿Sabes dónde nace y por dónde pasa cada río? Pon a prueba tu conocimiento de la hidrografía española.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-start">
                                <button
                                    onClick={() => startGame('challenge')}
                                    className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
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

                    {/* WON OVERLAY - Unified with Map style */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>

                            <div className="bg-transparent border border-white/20 p-8 rounded-3xl text-center shadow-2xl">
                                <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">Puntuación Final</span>
                                <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                                    {score}
                                </span>
                            </div>

                            <div className="w-full max-w-lg bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 mt-8 mb-4">
                                <RatingSystem activityId={activityId || "rivers-game"} />
                            </div>
                            <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                <RefreshCw className="w-5 h-5" /> {t.common.playAgain}
                            </button>
                        </div>
                    )}

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

                    {/* SVG MAP */}
                    <svg viewBox="-140 0 840 700" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
                            </filter>
                            <filter id="river-glow">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* CANARY ISLANDS INSET FRAME */}
                        <rect
                            x="-130" y="470" width="280" height="200"
                            className="fill-none stroke-white/20 stroke-1 pointer-events-none"
                            rx="8"
                            strokeDasharray="4 4"
                        />

                        <g
                            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                            style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                        >
                            {/* BACKGROUND: Static Regions (Graphics only) */}
                            {Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
                                const isInset = id === 'canarias';
                                const regionTransform = isInset ? "translate(-160, 0)" : undefined;

                                return (
                                    <g
                                        key={id}
                                        transform={regionTransform}
                                        className="pointer-events-none"
                                    >
                                        {paths.map((d, i) => (
                                            <path
                                                key={`vis-${i}`}
                                                d={d}
                                                className="stroke-slate-900/10 stroke-[0.5] fill-white/90"
                                                style={{ transformOrigin: 'center' }}
                                            />
                                        ))}
                                    </g>
                                );
                            })}

                            {/* REGION LABELS */}
                            <g className="pointer-events-none select-none">
                                {regionLabels.map((label, i) => label.x && (
                                    <text
                                        key={i}
                                        x={label.x - (label.id === 'canarias' ? 160 : 0)}
                                        y={label.y}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="text-[10px] fill-slate-400 font-bold tracking-tight uppercase opacity-50"
                                        style={{ fontSize: '8px' }}
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

                                let strokeColor = '#2563eb';
                                if (isCompleted) strokeColor = '#22c55e';
                                if (isFailed) strokeColor = '#ef4444';

                                return (
                                    <g key={name} className="cursor-pointer group pointer-events-auto">
                                        <path
                                            onClick={(e) => handleRiverClick(name, e)}
                                            onMouseDown={e => e.stopPropagation()}
                                            d={d}
                                            stroke="white"
                                            strokeWidth="30"
                                            fill="none"
                                            opacity="0"
                                        />
                                        <path
                                            d={d}
                                            stroke={strokeColor}
                                            strokeWidth={isTarget || isCompleted ? 6 : 4}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            className={`transition-all duration-300 ${!isCompleted && !isFailed ? 'group-hover:stroke-[10px]' : ''}`}
                                            style={{ filter: 'url(#river-glow)' }}
                                        />
                                        <path
                                            d={d}
                                            stroke="rgba(255,255,255,0.3)"
                                            strokeWidth={(isTarget || isCompleted ? 6 : 4) / 2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            className="pointer-events-none"
                                        />
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
                <p className="text-gray-500 text-xs mt-4 flex items-center gap-2">
                    <HelpCircle className="w-3 h-3" />
                    <span>Usa los controles o rueda del ratón para hacer zoom.</span>
                </p>
            </div>
        </div>
    );
}
