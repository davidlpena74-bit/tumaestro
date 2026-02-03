'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ZoomIn, ZoomOut, Maximize, Minimize, HelpCircle, RefreshCw, Timer } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InsetBoxConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    regionId: string;
    transform: string;
}

interface MapGameTemplateProps {
    title: string;
    description: string;
    regionName: string;
    pathData: Record<string, string[]>;
    nameMapping: Record<string, string>;
    viewBox?: string;
    initialTime?: number;
    colorTheme?: "emerald" | "blue" | "purple" | "orange" | "teal" | "yellow" | "cyan";
    icon?: React.ReactNode;
    insetBox?: InsetBoxConfig;
    specialTransforms?: Record<string, string>;
    svgTransform?: string;
}

export default function MapGameTemplate({
    title,
    description,
    regionName,
    pathData,
    nameMapping,
    viewBox = "0 0 800 600",
    initialTime = 120,
    colorTheme = "teal",
    icon = <MapPin className="w-8 h-8" />,
    insetBox,
    specialTransforms = {},
    svgTransform
}: MapGameTemplateProps) {
    const { language, t } = useLanguage();
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime, penaltyTime: 5 });

    const [targetId, setTargetId] = useState<string | null>(null);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [solvedIds, setSolvedIds] = useState<string[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

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
        setClickedId(null);
        setSolvedIds([]);
        pickNewTarget([]);
    };

    const pickNewTarget = (currentSolved: string[]) => {
        const allKeys = Object.keys(nameMapping);
        const availableKeys = allKeys.filter(k => !currentSolved.includes(k));

        if (availableKeys.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }

        let randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
        setTargetId(randomKey);
        setClickedId(null);
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || !targetId) return;
        if (solvedIds.includes(id)) return;

        setClickedId(id);

        if (id === targetId) {
            addScore(100);
            const newSolved = [...solvedIds, id];
            setSolvedIds(newSolved);
            setMessage(`${t.common.correct} 🎉`);
            setTimeout(() => pickNewTarget(newSolved), 600);
        } else {
            addError();
            addScore(-20);
            setMessage(language === 'es' ? '¡Esa no es! Intenta de nuevo.' : 'Not that one! Try again.');
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning blocked by user request
        /*
        if (!isDragging) return;
        e.preventDefault();
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
        */
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const resetGame = () => {
        hookResetGame();
        setTargetId(null);
        setClickedId(null);
        setSolvedIds([]);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        startGame();
    };

    return (
        <div ref={gameContainerRef} className={cn("w-full flex flex-col items-center select-none transition-all duration-300", isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : "")}>
            <div className={cn("w-full flex flex-col items-center", isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4")}>
                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={Object.keys(nameMapping).length}
                    remainingTargets={Object.keys(nameMapping).length - solvedIds.length}
                    targetName={targetId ? (nameMapping[targetId] || targetId) : '...'}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme as any}
                    icon={icon}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-slate-800/20 rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={(e) => { isClick.current = true; handleMouseDown(e); }}
                    onMouseMove={(e) => { if (isDragging) isClick.current = false; handleMouseMove(e); }}
                    onMouseUp={() => { handleMouseUp(); setTimeout(() => isClick.current = true, 50); }}
                    onMouseLeave={handleMouseUp}
                >
                    <AnimatePresence>
                        {gameState === 'start' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <div className={cn("p-4 rounded-full mb-6 ring-1", colorTheme === 'teal' ? "bg-teal-500/10 ring-teal-500/30" : "bg-emerald-500/10 ring-emerald-500/30")}>
                                    <div className={cn("w-12 h-12", colorTheme === 'teal' ? "text-teal-400" : "text-emerald-400")}>{icon}</div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
                                <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">{description}</p>
                                <button onClick={startGame} className={cn("group relative px-8 py-4 font-black text-lg rounded-2xl transition-all shadow-lg hover:-translate-y-1", colorTheme === 'teal' ? "bg-teal-500 hover:bg-teal-400 text-slate-900 shadow-teal-500/20" : "bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-emerald-500/20")}>
                                    <span className="relative z-10 flex items-center gap-2">{t.common.start.toUpperCase()} <Timer className="w-5 h-5 opacity-50" /></span>
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                                <div className="bg-yellow-500/10 p-4 rounded-full mb-6 ring-1 ring-yellow-500/30">
                                    <RefreshCw className="w-16 h-16 text-yellow-400 animate-spin-slow" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">{t.common.completed}</h2>
                                <div className="flex flex-col items-center gap-1 mb-8">
                                    <span className="text-gray-400 text-sm uppercase tracking-widest">{language === 'es' ? 'Puntuación Final' : 'Final Score'}</span>
                                    <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">{score}</span>
                                </div>
                                <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                    <RefreshCw className="w-5 h-5" /> {t.common.playAgain}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer">{isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}</button>
                        <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer" title="Reset View"><RefreshCw className="w-5 h-5" /></button>
                    </div>

                    <svg viewBox={viewBox} className="w-full h-full drop-shadow-2xl" style={svgTransform ? { transform: svgTransform } : undefined}>
                        <defs>
                            <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        {insetBox && (
                            <rect x={insetBox.x} y={insetBox.y} width={insetBox.width} height={insetBox.height} className="fill-none stroke-white/20 stroke-1 pointer-events-none" rx="8" strokeDasharray="4 4" />
                        )}

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {[...Object.entries(pathData)].sort(([idA], [idB]) => {
                                if (idA === hoveredId) return 1;
                                if (idB === hoveredId) return -1;
                                return 0;
                            }).map(([id, paths]) => {
                                const isTarget = targetId === id;
                                const isClicked = clickedId === id;
                                const isSolved = solvedIds.includes(id);
                                const isHovered = hoveredId === id;

                                let fillClass = "fill-white/90";
                                let strokeClass = "stroke-slate-900 stroke-[0.8]";

                                if (gameState === 'playing') {
                                    fillClass = "fill-white hover:fill-slate-200 cursor-pointer";
                                    if (isSolved) fillClass = "fill-green-500/80";
                                    if (isClicked) {
                                        strokeClass = "stroke-slate-900 stroke-1";
                                        fillClass = isTarget ? "fill-green-500 animate-pulse" : "fill-red-500";
                                    }
                                }

                                const transform = (id === insetBox?.regionId) ? insetBox.transform : specialTransforms[id];

                                return (
                                    <g key={id} transform={transform} onMouseEnter={() => gameState === 'playing' && setHoveredId(id)} onMouseLeave={() => setHoveredId(null)} onClick={() => { if (isClick.current) handleRegionClick(id); }} style={{ pointerEvents: gameState === 'playing' ? 'all' : 'none', cursor: gameState === 'playing' ? 'pointer' : 'default' }}>
                                        {paths.map((d, i) => (
                                            <path key={`hit-${i}`} d={d} fill="transparent" stroke="transparent" strokeWidth="5" />
                                        ))}
                                        {paths.map((d, i) => (
                                            <motion.path
                                                key={`vis-${i}`}
                                                d={d}
                                                className={cn(strokeClass, fillClass, isHovered && gameState === 'playing' && !isSolved && !isClicked && "fill-slate-200")}
                                                initial={false}
                                                animate={isHovered && gameState === 'playing' ? { y: -8, scale: 1.05 } : (isClicked && isTarget) ? { scale: 1.02, y: 0 } : { scale: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                                style={{ transformOrigin: 'center', filter: isHovered && gameState === 'playing' ? 'url(#elevation-shadow)' : 'none', zIndex: isHovered ? 50 : 1, pointerEvents: 'none' }}
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
                    <span>{language === 'es' ? 'Usa los controles o rueda del ratón para hacer zoom.' : 'Use controls or mouse wheel to zoom.'}</span>
                </p>
            </div>
        </div>
    );
}
