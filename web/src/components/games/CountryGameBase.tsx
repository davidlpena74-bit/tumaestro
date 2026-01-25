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
    elevationHeight = 8
}: CountryGameProps) {
    const { t } = useLanguage();
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime, penaltyTime: 5 });

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

    const startGame = () => {
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
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetCountry(next);
        setAttempts(0);
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;

        const spanishName = nameMapping[engName];
        if (!spanishName) return;

        const isCompleted = spanishName && !remainingCountries.includes(spanishName);
        if (isCompleted) return;

        if (spanishName === targetCountry) {
            addScore(100);
            setMessage('¡Correcto! 🎉');
            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            addError();
            addScore(-20);
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste! Era ${targetCountry}. ❌`);
                setFailedCountries(prev => [...prev, targetCountry]);
                const newRemaining = remainingCountries.filter(c => c !== targetCountry);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                setMessage(`¡No! Eso es ${spanishName} (${newAttempts}/3) ❌`);
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setZoom(initialZoom);
        setPan(initialPan);
        startGame();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        isClick.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        isClick.current = false;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
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
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group cursor-move",
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
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{title}</h2>
                                <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed text-center">
                                    Pon a prueba tus conocimientos de geografía en {regionName}. ¿Ubicarlos todos a tiempo?
                                </p>
                                <button
                                    onClick={startGame}
                                    className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:-translate-y-1"
                                >
                                    <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                                </button>
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
                                <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>
                                <div className="flex flex-col items-center gap-1 mb-8 text-center text-white">
                                    <span className="text-gray-400 text-sm uppercase tracking-widest">Puntuación Final</span>
                                    <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                        {score}
                                    </span>
                                </div>
                                <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                    <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Controls */}
                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                        <button onClick={() => { setZoom(initialZoom); setPan(initialPan); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10" title="Reset View">
                            <RefreshCw className="w-5 h-5" />
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
                            {/* Sorting: Hovered last to render on top */}
                            {[...Object.entries(pathData)].sort(([idA], [idB]) => {
                                if (nameMapping[idA] === hoveredId) return 1;
                                if (nameMapping[idB] === hoveredId) return -1;
                                return 0;
                            }).map(([engName, pathD]) => {
                                const spanishName = nameMapping[engName];
                                const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                const isFailed = failedCountries.includes(spanishName);
                                const isHovered = hoveredId === spanishName;
                                const isPlayable = !!spanishName;

                                let fillClass = isPlayable ? "fill-white/90 hover:fill-teal-100" : "fill-slate-800/20";
                                let strokeClass = "stroke-slate-900/30 stroke-[0.5px]";

                                if (isCompleted) {
                                    fillClass = isFailed ? "fill-red-500" : "fill-green-500/80";
                                }

                                return (
                                    <g
                                        key={engName}
                                        onMouseEnter={() => isPlayable && gameState === 'playing' && setHoveredId(spanishName)}
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
                                                isHovered && gameState === 'playing' && !isCompleted && "fill-teal-100",
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
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>

                <p className="text-gray-500 text-xs mt-4 flex items-center gap-2 justify-center">
                    <HelpCircle className="w-3 h-3" />
                    <span>Usa los controles o rueda del ratón para hacer zoom. Arrastra para mover el mapa.</span>
                </p>
            </div>
        </div >
    );
}
