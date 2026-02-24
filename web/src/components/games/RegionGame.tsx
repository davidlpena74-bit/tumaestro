'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Map as MapIcon, RefreshCw, HelpCircle, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES } from './spanish-communities-paths';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';

/** Utility for tailwind class merging */
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAMES = REGION_DISPLAY_NAMES;

interface RegionGameProps {
    gameMode?: 'explore' | 'quiz' | 'sequence';
    activityId?: string;
    taskId?: string | null;
    theme?: 'dark' | 'light';
}

export default function RegionGame({ gameMode = 'quiz', activityId, taskId, theme = 'dark' }: RegionGameProps) {
    const { t, language } = useLanguage();

    // Core game state via hook
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        handleFinish
    } = useGameLogic({
        activityId: activityId || 'mapa-comunidades',
        taskId
    });

    const [targetId, setTargetId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [solvedIds, setSolvedIds] = useState<string[]>([]);

    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);

    const gameContainerRef = useRef<HTMLDivElement>(null);
    const isClick = useRef(false);
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const pickNextTarget = useCallback((currentSolved: string[]) => {
        const available = Object.keys(NAMES).filter(id => !currentSolved.includes(id));
        if (available.length === 0) {
            handleFinish();
            return;
        }
        const next = available[Math.floor(Math.random() * available.length)];
        setTargetId(next);
        setMessage('');
    }, [handleFinish, setMessage]);

    const startGame = () => {
        setSolvedIds([]);
        setClickedId(null);
        hookStartGame();
        pickNextTarget([]);
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || solvedIds.includes(id)) return;

        setClickedId(id);
        if (id === targetId) {
            const newSolved = [...solvedIds, id];
            setSolvedIds(newSolved);
            addScore(100);
            setMessage("¡Correcto!");

            setTimeout(() => {
                setClickedId(null);
                pickNextTarget(newSolved);
            }, 1000);
        } else {
            addError();
            setMessage(`No, eso es ${NAMES[id] || id}`);
            setTimeout(() => setClickedId(null), 1000);
        }
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

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning blocked by user request
        /*
        if (!isDragging.current) return;
        isClick.current = false;
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        */
    };

    const handleMouseUp = () => {
        isDragging.current = false;
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
                    title={t.gamesPage.gameTitles.region}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode as any}
                    totalTargets={Object.keys(NAMES).length}
                    remainingTargets={Object.keys(NAMES).length - solvedIds.length}
                    targetName={targetId ? (NAMES[targetId] || targetId) : '...'}
                    region={t.gamesPage.regions.spain}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={startGame}
                    colorTheme="emerald"
                    icon={<MapIcon className="w-8 h-8 text-emerald-400" />}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-slate-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={(e) => {
                        isClick.current = true;
                        handleMouseDown(e);
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={(e) => {
                        const delta = e.deltaY > 0 ? 0.9 : 1.1;
                        setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 5));
                    }}
                >
                    {/* START SCREEN OVERLAY */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/60 backdrop-blur-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="text-center p-12 bg-white/10 rounded-[3rem] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full mx-4"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-12">
                                    <MapIcon className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
                                    {t.gamesPage.gameTitles.region}
                                </h2>
                                <p className="text-emerald-100/70 mb-10 text-lg leading-relaxed font-medium">
                                    {t.gamesPage.gameTitles.regionDesc || 'Identifica las comunidades autónomas en el mapa.'}
                                </p>
                                <button
                                    onClick={startGame}
                                    className="w-full py-5 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-widest"
                                >
                                    {t.common.start}
                                </button>
                            </motion.div>
                        </div>
                    )}

                    {/* END SCREEN OVERLAY */}
                    {(gameState === 'finished' || gameState === 'won') && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 backdrop-blur-2xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center p-12 bg-white/10 rounded-[3rem] border border-white/20 shadow-2xl max-w-md w-full mx-4"
                            >
                                <div className="w-24 h-24 bg-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <Trophy className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-2">{t.common.congrats || t.common.completed}!</h2>
                                <p className="text-emerald-100/70 mb-8 text-xl font-medium">
                                    {t.common.score}: <span className="text-white font-black">{score}</span>
                                </p>
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={startGame}
                                        className="py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 uppercase tracking-wider flex items-center justify-center gap-3"
                                    >
                                        <RefreshCw className="w-6 h-6" /> {t.common.playAgain}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* CONTROLS */}
                    <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* SVG MAP */}
                    <svg
                        viewBox="-140 0 840 700"
                        className="w-full h-full cursor-grab active:cursor-grabbing"
                    >
                        <g
                            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                            style={{ transformOrigin: 'center', transition: isDragging.current ? 'none' : 'transform 0.1s ease-out' }}
                        >
                            {Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
                                const isTarget = targetId === id;
                                const isClicked = clickedId === id;
                                const isSolved = solvedIds.includes(id);
                                const isHovered = hoveredId === id;

                                let fill = theme === 'dark' ? "rgba(30, 41, 59, 0.5)" : "rgba(226, 232, 240, 0.5)";
                                let stroke = theme === 'dark' ? "rgba(71, 85, 105, 0.5)" : "rgba(148, 163, 184, 0.5)";

                                if (isSolved) {
                                    fill = "rgba(16, 185, 129, 0.6)";
                                    stroke = "rgba(16, 185, 129, 1)";
                                } else if (isClicked) {
                                    if (isTarget) fill = "rgba(16, 185, 129, 1)";
                                    else fill = "rgba(239, 68, 68, 1)";
                                    stroke = "white";
                                } else if (isHovered && gameState === 'playing') {
                                    fill = theme === 'dark' ? "rgba(51, 65, 85, 0.8)" : "rgba(203, 213, 225, 0.8)";
                                }

                                return (
                                    <g
                                        key={id}
                                        className="cursor-pointer"
                                        onMouseEnter={() => gameState === 'playing' && setHoveredId(id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={() => {
                                            if (isClick.current) handleRegionClick(id);
                                        }}
                                    >
                                        {paths.map((d, i) => (
                                            <motion.path
                                                key={i}
                                                d={d}
                                                fill={fill}
                                                stroke={stroke}
                                                strokeWidth="1"
                                                initial={false}
                                                animate={isHovered && gameState === 'playing' ? { scale: 1.01 } : { scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                    <span>{language === 'es' ? 'Haz clic en las comunidades para identificarlas.' : 'Click on regions to identify them.'}</span>
                </p>
            </div>
        </div>
    );
}
