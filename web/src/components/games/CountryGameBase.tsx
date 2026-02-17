'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer, RefreshCw, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';
import { calculatePathCentroid } from '@/lib/svg-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CountryGameProps {
    title: string;
    regionName: string;
    pathData: Record<string, string>;
    nameMapping: Record<string, string>;
    initialTime?: number;
    colorTheme?: "emerald" | "blue" | "purple" | "orange" | "teal" | "yellow";
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    elevationHeight?: number;
    taskId?: string | null;
}

export default function CountryGameBase({
    title,
    regionName,
    pathData,
    nameMapping,
    initialTime = 180,
    colorTheme = "emerald",
    initialZoom = 1,
    initialPan = { x: 0, y: 0 },
    elevationHeight = 8,
    taskId = null
}: CountryGameProps) {
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
    } = useGameLogic({ initialTime, penaltyTime: 5, gameMode, taskId });

    const [targetCountry, setTargetCountry] = useState('');
    const [remainingCountries, setRemainingCountries] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [failedCountries, setFailedCountries] = useState<string[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Zoom state initialized with props
    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const available = Object.keys(pathData)
            .map(engName => nameMapping[engName])
            .filter(Boolean);
        setRemainingCountries(available);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, [pathData, nameMapping]);

    const startGame = (mode?: 'challenge' | 'practice') => {
        if (mode) setGameMode(mode);
        // Small timeout to allow state update if needed, though hook uses current render value
        // but hookStartGame resets things.
        hookStartGame();
        setAttempts(0);
        setFailedCountries([]);
        setTargetCountry('');

        const available = Object.keys(pathData)
            .map(engName => nameMapping[engName])
            .filter(Boolean);
        setRemainingCountries(available);
        nextTurn(available);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            handleFinish();
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetCountry(next);
        setAttempts(0);
        speak(`${t.common.find} ${next}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;

        const localizedName = nameMapping[engName];
        if (!localizedName) return;

        const isCompleted = localizedName && !remainingCountries.includes(localizedName);
        if (isCompleted) return;

        if (localizedName === targetCountry) {
            addScore(100);
            setMessage(`${t.common.correct} 🎉`);
            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            addError();
            addScore(gameMode === 'challenge' ? -20 : -5); // Less penalty in practice
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(language === 'es'
                    ? `¡Fallaste! Era ${targetCountry}. ❌`
                    : `Failed! It was ${targetCountry}. ❌`);
                setFailedCountries(prev => [...prev, targetCountry]);
                const newRemaining = remainingCountries.filter(c => c !== targetCountry);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                if (gameMode === 'practice') {
                    setMessage(language === 'es'
                        ? `¡No! Eso es ${localizedName} (${newAttempts}/3) ❌`
                        : `No! That is ${localizedName} (${newAttempts}/3) ❌`);
                } else {
                    setMessage(language === 'es' ? `¡Incorrecto! (${newAttempts}/3) ❌` : `Incorrect! (${newAttempts}/3) ❌`);
                }
            }
        }
    };

    const resetGame = () => {
        setGameState('start'); // Go back to start screen to choose mode
        setZoom(initialZoom);
        setPan(initialPan);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        isClick.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning logic here if enabled
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setTimeout(() => isClick.current = true, 50);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div ref={gameContainerRef} className={cn("w-full flex flex-col items-center select-none transition-all duration-300", isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : "")}>
            <div className={cn("w-full max-w-6xl mx-auto p-4", isFullscreen ? "p-6 min-h-screen justify-center flex flex-col" : "")}>
                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(nameMapping).length}
                    remainingTargets={remainingCountries.length}
                    targetName={targetCountry}
                    region={regionName}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme}
                    icon={<Globe className={cn("w-8 h-8", colorTheme === 'emerald' ? "text-emerald-400" : "text-blue-400")} />}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-slate-800/20 rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* overlays */}
                    <AnimatePresence>
                        {gameState === 'start' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]"
                            >
                                <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-1 ring-emerald-500/30">
                                    <Globe className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
                                <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed text-center">
                                    {language === 'es'
                                        ? `Pon a prueba tus conocimientos de geografía en ${regionName}.`
                                        : `Test your geography knowledge in ${regionName}.`}
                                </p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => startGame('challenge')}
                                        className="group relative px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-lg hover:-translate-y-1"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {language === 'es' ? 'MODO RETO' : 'CHALLENGE MODE'}
                                            <Timer className="w-5 h-5 opacity-50" />
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => startGame('practice')}
                                        className="group relative px-6 py-4 bg-blue-500 hover:bg-blue-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-lg hover:-translate-y-1"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {language === 'es' ? 'MODO PRÁCTICA' : 'PRACTICE MODE'}
                                            <RefreshCw className="w-5 h-5 opacity-50" />
                                        </span>
                                    </button>
                                </div>

                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]"
                            >
                                <div className="bg-yellow-500/10 p-4 rounded-full mb-6 ring-1 ring-yellow-500/30">
                                    <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">{t.common.completed}</h2>
                                <div className="flex flex-col items-center gap-1 mb-8 text-center text-white">
                                    <span className="text-gray-400 text-sm uppercase tracking-widest">{language === 'es' ? 'Puntuación Final' : 'Final Score'}</span>
                                    <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                        {score}
                                    </span>
                                </div>
                                <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                    <RefreshCw className="w-5 h-5" /> {t.common.playAgain}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Controls */}
                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <button onClick={() => { setZoom(initialZoom); setPan(initialPan); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer" title="Reset View">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* SVG MAP */}
                    <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy={elevationHeight} stdDeviation="5" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {/* Sorting: Larger first, Smaller last. Hovered always on very top. */}
                            {[...Object.entries(pathData)].sort(([idA, pA], [idB, pB]) => {
                                const nameA = nameMapping[idA];
                                const nameB = nameMapping[idB];

                                if (nameA === hoveredId) return 1;
                                if (nameB === hoveredId) return -1;

                                // Smaller area -> higher sort index -> rendered later/on top
                                const areaA = calculatePathCentroid(pA as string)?.area || 99999;
                                const areaB = calculatePathCentroid(pB as string)?.area || 99999;
                                return areaB - areaA;
                            }).map(([engName, pathD]) => {
                                const localizedName = nameMapping[engName];
                                const isCompleted = localizedName && !remainingCountries.includes(localizedName);
                                const isFailed = failedCountries.includes(localizedName);
                                const isHovered = hoveredId === localizedName;
                                const isPlayable = !!localizedName;

                                let fillClass = isPlayable ? "fill-white/90 hover:fill-slate-200" : "fill-slate-800/20";
                                let strokeClass = "stroke-slate-900/30 stroke-[0.5px]";

                                if (isCompleted) {
                                    fillClass = isFailed ? "fill-red-500" : "fill-green-500/80";
                                }

                                return (
                                    <g
                                        key={engName}
                                        onMouseEnter={() => isPlayable && gameState === 'playing' && setHoveredId(localizedName)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={(e) => {
                                            if (isClick.current) handleCountryClick(engName);
                                            e.stopPropagation();
                                        }}
                                        className="group"
                                        style={{ pointerEvents: gameState === 'playing' ? 'all' : 'none' }}
                                    >
                                        {/* Hit Area */}
                                        <path
                                            d={pathD}
                                            fill="transparent"
                                            stroke="transparent"
                                            strokeWidth="5"
                                            className={isPlayable ? "cursor-pointer" : ""}
                                        />

                                        {/* Visual Area */}
                                        <motion.path
                                            d={pathD}
                                            className={cn(
                                                strokeClass,
                                                fillClass,
                                                isHovered && gameState === 'playing' && !isCompleted && "fill-slate-200",
                                                isPlayable && "cursor-pointer"
                                            )}
                                            initial={false}
                                            animate={
                                                (isHovered && gameState === 'playing')
                                                    ? { y: -elevationHeight, scale: 1.05 }
                                                    : { scale: 1, y: 0 }
                                            }
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                            style={{
                                                transformOrigin: 'center',
                                                transformBox: 'fill-box',
                                                filter: (isHovered && gameState === 'playing' && !isCompleted) ? 'url(#elevation-shadow)' : 'none',
                                                zIndex: isHovered ? 50 : 1,
                                                pointerEvents: 'none'
                                            }}
                                        />

                                        {/* Small Country Helper Circle */}
                                        {(() => {
                                            const centroid = calculatePathCentroid(pathD);
                                            // 50 is a heuristic for "tiny" area in map coordinates
                                            if (centroid && centroid.area < 50) {
                                                return (
                                                    <g
                                                        className="cursor-pointer"
                                                        onMouseEnter={() => isPlayable && gameState === 'playing' && setHoveredId(localizedName)}
                                                        onMouseLeave={() => setHoveredId(null)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (isClick.current) handleCountryClick(engName);
                                                        }}
                                                    >
                                                        {/* Invisible larger hit area for the dot */}
                                                        <circle
                                                            cx={centroid.x}
                                                            cy={centroid.y}
                                                            r={12}
                                                            fill="transparent"
                                                        />
                                                        <motion.circle
                                                            cx={centroid.x}
                                                            cy={centroid.y}
                                                            r={isHovered ? 7 : 5}
                                                            fill={isCompleted ? "white" : "white"}
                                                            stroke={isCompleted ? (isFailed ? "#ef4444" : "#10b981") : "#1e293b"}
                                                            strokeWidth={1.5}
                                                            initial={false}
                                                            animate={
                                                                (isHovered && gameState === 'playing')
                                                                    ? { scale: 1.6, opacity: 1, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }
                                                                    : { scale: 1, opacity: 0.9, filter: 'none' }
                                                            }
                                                            className="pointer-events-none"
                                                        />
                                                    </g>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>

                <p className="text-gray-500 text-xs mt-4 flex items-center gap-2 justify-center">
                    <HelpCircle className="w-3 h-3" />
                    <span>{language === 'es'
                        ? 'Usa los controles o rueda del ratón para hacer zoom.'
                        : 'Use controls or mouse wheel to zoom.'}</span>
                </p>
            </div>
        </div >
    );
}
