
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
    colorTheme?: "teal" | "emerald" | "blue" | "purple" | "orange" | "cyan";
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
    colorTheme = "teal"
}: PhysicalMapGameProps) {
    const { language, t } = useLanguage();
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 120, penaltyTime: 10 });

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

    const startGame = () => {
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
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
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
                setMessage(`${t.common.incorrect} (${newAttempts}/3) ❌`);
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
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <Globe className="w-16 h-16 text-teal-400 mb-6" />
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
                                <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">{description}</p>
                                <button onClick={startGame} className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-lg hover:-translate-y-1">
                                    <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <Trophy className="w-16 h-16 text-yellow-400 mb-6 animate-bounce" />
                                <h2 className="text-4xl font-bold text-white mb-2">{t.common.completed}</h2>
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

                            {/* Mountain Peak Marker */}
                            <marker
                                id="mountain-peak"
                                viewBox="0 0 20 20"
                                refX="10"
                                refY="20"
                                markerWidth="8"
                                markerHeight="8"
                                orient="auto-start-reverse"
                            >
                                <path d="M0 20 L10 0 L20 20 Z" fill="currentColor" />
                            </marker>
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
                                        {/* Hit Area */}
                                        <path d={d} fill={itemType === 'polygon' ? "transparent" : "none"} stroke="transparent" strokeWidth="20" />

                                        {/* Visual Path */}
                                        <motion.path
                                            d={d}
                                            stroke={color}
                                            strokeWidth={itemType === 'line' ? (isHovered ? 6 : 3) : 1}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            markerMid={itemType === 'line' ? "url(#mountain-peak)" : undefined}
                                            markerStart={itemType === 'line' ? "url(#mountain-peak)" : undefined}
                                            markerEnd={itemType === 'line' ? "url(#mountain-peak)" : undefined}
                                            fill={itemType === 'polygon' ? color : "none"}
                                            fillOpacity={itemType === 'polygon' ? 0.3 : 0}
                                            className="transition-all duration-300"
                                            style={{
                                                filter: isHovered || isCompleted ? 'url(#physical-glow)' : 'none',
                                                color: color // Pass color to marker via currentColor
                                            }}
                                            animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                                        />
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
