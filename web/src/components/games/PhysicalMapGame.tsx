
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer, RefreshCw, MapPin, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculatePathCentroid } from '@/lib/svg-utils';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PhysicalItem {
    id: string;
    d: string;
    type: 'line' | 'polygon';
}

interface PhysicalMapGameProps {
    title: string;
    description: string;
    items: Record<string, string>;
    itemType?: 'line' | 'polygon';
    backgroundPaths?: Record<string, string | string[]>;
    backgroundLabels?: { id: string; name: string; x: number; y: number }[];
    viewBox?: string;
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    elevationHeight?: number;
    colorTheme?: "teal" | "emerald" | "blue" | "purple" | "orange" | "cyan";
    taskId?: string | null;
}

export default function PhysicalMapGame({
    title,
    description,
    items,
    itemType = 'line',
    backgroundPaths = {},
    backgroundLabels = [],
    viewBox = "0 0 800 600",
    initialZoom = 1,
    initialPan = { x: 0, y: 0 },
    elevationHeight = 8,
    colorTheme = "teal",
    taskId = null
}: PhysicalMapGameProps) {
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

    const [targetItem, setTargetItem] = useState('');
    const [remainingItems, setRemainingItems] = useState<string[]>([]);
    const [failedItems, setFailedItems] = useState<string[]>([]);
    const [completedItems, setCompletedItems] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);

    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const clickStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, [items]);

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
        setFailedItems([]);
        setCompletedItems([]);
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);
        nextTurn(itemKeys);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            handleFinish();
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetItem(next);
        setAttempts(0);
        speak(`${t.common.find} ${next}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleItemClick = (name: string, e: React.MouseEvent) => {
        if (gameState !== 'playing') return;
        if (!isClick.current) return;
        e.stopPropagation();

        if (name === targetItem) {
            addScore(10);
            setMessage(`${t.common.correct} 🎉`);
            setCompletedItems(prev => [...prev, name]);
            const newRemaining = remainingItems.filter(r => r !== targetItem);
            setRemainingItems(newRemaining);
            nextTurn(newRemaining);
        } else {
            addError();
            // Penalty adjustment is handled inside addError hook based on mode
            if (gameMode === 'practice') {
                // In practice we might want less visual penalty or different message but useGameLogic handles score deduction
            }

            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(language === 'es' ? `¡Fallaste! Era ${targetItem}` : `Failed! It was ${targetItem}`);
                setFailedItems(prev => [...prev, targetItem]);
                setCompletedItems(prev => [...prev, targetItem]);
                const newRemaining = remainingItems.filter(r => r !== targetItem);
                setRemainingItems(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                if (gameMode === 'practice') {
                    setMessage(language === 'es' ? `¡Incorrecto! Esa es ${name}. Intento ${newAttempts}/3. ❌` : `Incorrect! That is ${name}. Attempt ${newAttempts}/3. ❌`);
                } else {
                    setMessage(`${language === 'es' ? 'Incorrecto' : 'Incorrect'} (${newAttempts}/3) ❌`);
                }
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setAttempts(0);
        setFailedItems([]);
        setCompletedItems([]);
        setZoom(initialZoom);
        setPan(initialPan);
        startGame();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        isClick.current = true;
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        clickStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        if (Math.abs(e.clientX - clickStart.current.x) > 5 || Math.abs(e.clientY - clickStart.current.y) > 5) {
            isClick.current = false;
        }
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const sortedItems = useMemo(() => {
        const entries = Object.entries(items);
        return entries.sort((a, b) => {
            if (a[0] === hoveredItem) return 1;
            if (b[0] === hoveredItem) return -1;
            return 0;
        });
    }, [items, hoveredItem]);

    return (
        <div ref={gameContainerRef} className={cn("w-full flex flex-col items-center select-none transition-all duration-300", isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : "")}>
            <div className={cn("w-full flex flex-col items-center", isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4")}>
                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(items).length}
                    remainingTargets={remainingItems.length}
                    targetName={targetItem}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme}
                    icon={<Globe className="w-8 h-8" />}
                />

                <div
                    className={cn("relative w-full aspect-square md:aspect-[1.4] bg-slate-900/40 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl", isFullscreen && "flex-1 min-h-[500px]")}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <AnimatePresence>
                        {gameState === 'start' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-start justify-center p-12 text-left rounded-[2rem]">
                                <Globe className="w-16 h-16 text-teal-400 mb-6" />
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-tight max-w-2xl">{title}</h2>
                                <p className="text-gray-300 mb-10 max-w-xl text-lg leading-relaxed font-medium">{description}</p>
                                <div className="flex gap-4">
                                    <button onClick={() => startGame('challenge')} className="group relative px-6 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:-translate-y-1">
                                        <span className="relative z-10 flex items-center gap-2">
                                            MODO RETO <Timer className="w-5 h-5 opacity-50" />
                                        </span>
                                    </button>
                                    <button onClick={() => startGame('practice')} className="group relative px-6 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1">
                                        <span className="relative z-10 flex items-center gap-2">
                                            MODO PRÁCTICA <RefreshCw className="w-5 h-5 opacity-50" />
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <div className="bg-yellow-500/10 p-4 rounded-full mb-6 ring-1 ring-yellow-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Trophy className="w-16 h-16 text-red-500 animate-pulse" />
                                    ) : (
                                        <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : t.common.completed}
                                </h2>
                                <div className="bg-transparent border border-white/20 p-8 rounded-3xl text-center shadow-2xl mb-8">
                                    <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Puntuación Final</span>
                                    <span className="block text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">{score}</span>
                                </div>
                                <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                    <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <button onClick={() => { setZoom(initialZoom); setPan(initialPan); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer" title="Reset View"><RefreshCw className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer">{isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}</button>
                    </div>

                    <svg viewBox={viewBox} className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <filter id="physical-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            <filter id="mountain-roughness" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="5" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                            </filter>

                            {/* STIPPLE FILTERS */}
                            <filter id="stipple-heavy" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="1" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 -4" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.2" />
                            </filter>

                            <filter id="stipple-mid" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 12 -5" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.2" />
                            </filter>

                            <filter id="stipple-fine" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="3" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 15 -7" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.1" />
                            </filter>

                            <filter id="mountain-shadow" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feOffset dx="0.5" dy="0.5" result="offsetBlur" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.5" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {/* BACKGROUND PATHS */}
                            <g className="pointer-events-none opacity-40">
                                {Object.entries(backgroundPaths).map(([id, d], i) => (
                                    Array.isArray(d) ? d.map((path, j) => (
                                        <path key={`${id}-${j}`} d={path} className="fill-slate-700 stroke-slate-600 stroke-[0.5]" />
                                    )) : (
                                        <path key={id} d={d} className="fill-slate-700 stroke-slate-600 stroke-[0.5]" />
                                    )
                                ))}
                            </g>

                            {/* LABELS */}
                            {backgroundLabels.map((label, i) => (
                                <text key={i} x={label.x} y={label.y} className="text-[3px] fill-slate-500 font-bold uppercase pointer-events-none select-none" textAnchor="middle" style={{ fontSize: '3px' }}>
                                    {label.name}
                                </text>
                            ))}

                            {/* INTERACTIVE ITEMS */}
                            {sortedItems.map(([name, d]) => {
                                const isTarget = name === targetItem;
                                const isCompleted = completedItems.includes(name);
                                const isFailed = failedItems.includes(name);
                                const isHovered = name === hoveredItem;

                                let color = "rgba(255,255,255,0.6)";
                                if (isCompleted) color = "#10b981";
                                if (isFailed) color = "#ef4444";
                                if (isHovered && gameState === 'playing' && !isCompleted) color = "#22d3ee";

                                return (
                                    <g
                                        key={name}
                                        className="cursor-pointer group"
                                        onMouseEnter={() => gameState === 'playing' && setHoveredItem(name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        onClick={(e) => handleItemClick(name, e)}
                                    >
                                        <path d={d} fill={itemType === 'polygon' ? "transparent" : "none"} stroke="transparent" strokeWidth="20" />

                                        {itemType === 'line' ? (
                                            <g style={{ filter: 'url(#mountain-shadow)' }}>
                                                {/* LAYER 1: Deep Shadow (Wide Stipple) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#064e3b" : isFailed ? "#7f1d1d" : "#1a130e"}
                                                    strokeWidth={isHovered ? 20 : 18}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-heavy)' }}
                                                    className="transition-all duration-500 opacity-60"
                                                />

                                                {/* LAYER 2: Base Rock (Textured) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#10b981" : isFailed ? "#dc2626" : (isHovered ? "#3d2b1f" : "#4a3728")}
                                                    strokeWidth={14}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-mid)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 3: Mid Elevation */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#34d399" : isFailed ? "#f87171" : (isHovered ? "#8b6d5c" : "#7d5c4d")}
                                                    strokeWidth={8}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-mid)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 4: High Ridge (Slightly rough solid) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#6ee7b7" : isFailed ? "#fca5a5" : (isHovered ? "#a3a3a3" : "#737373")}
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#mountain-roughness)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 5: Peak Particles (Snow/Fine) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#d1fae5" : isFailed ? "#fee2e2" : "#ffffff"}
                                                    strokeWidth={4}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-fine)' }}
                                                    opacity={isHovered ? 1 : 0.8}
                                                    className="transition-all duration-500"
                                                />
                                            </g>
                                        ) : (
                                            /* Polygon Main Path */
                                            <motion.path
                                                d={d}
                                                stroke={color}
                                                strokeWidth={1}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill={color}
                                                fillOpacity={0.3}
                                                className="transition-all duration-300"
                                                style={{
                                                    filter: isHovered || isCompleted ? 'url(#physical-glow)' : 'none',
                                                }}
                                                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
