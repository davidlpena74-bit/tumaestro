'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ZoomIn, ZoomOut, Maximize, Minimize, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PATH_TO_SPANISH_NAME, EUROPE_CAPITALS } from './data/capitals-data';
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

interface CapitalGameProps {
    paths: Record<string, string>; // Map paths (English Key -> SVG Path)
    targetList?: string[]; // Optional list of Spanish country names to include in the game (e.g. only EU members)
    title: string;
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    centroids?: Record<string, { x: number; y: number }>;
}

export default function CapitalGame({
    paths,
    targetList,
    title,
    initialZoom = 1.5,
    initialPan = { x: 0, y: 0 },
    centroids
}: CapitalGameProps) {
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

    const [loading, setLoading] = useState(true);
    const [targetCapital, setTargetCapital] = useState('');
    const [currentCountryName, setCurrentCountryName] = useState(''); // The country associated with the target capital

    const [remainingCountries, setRemainingCountries] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [failedCountries, setFailedCountries] = useState<string[]>([]);

    const [clickedId, setClickedId] = useState<string | null>(null);

    // Zoom state
    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    // Hover state for points
    const [hoveredCapital, setHoveredCapital] = useState<string | null>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        // Filter available countries based on targetList if provided, otherwise use all from paths
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);

        let playable = pathCountries;
        if (targetList) {
            // Intersection of available paths and requested targets
            playable = pathCountries.filter(c => targetList.includes(c));
        }

        // Ensure we only have countries with defined capitals
        playable = playable.filter(c => EUROPE_CAPITALS[c]);

        setRemainingCountries(playable);
        setLoading(false);
    }, [paths, targetList]);

    const startGame = () => {
        hookStartGame();
        setAttempts(0);
        setFailedCountries([]);
        setClickedId(null);
        setTargetCapital('');
        setCurrentCountryName('');

        // Re-calculate playable list to be safe
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => EUROPE_CAPITALS[c]);
        setRemainingCountries(playable);

        nextTurn(playable);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const nextCountry = currentRemaining[randomIndex];
        const nextCap = EUROPE_CAPITALS[nextCountry];

        setCurrentCountryName(nextCountry);
        setTargetCapital(nextCap);
        setAttempts(0);
        setClickedId(null);
        speak(`${t.common.find} ${nextCap}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;
        if (Math.abs(pan.x - dragStart.current.x) > 5 || Math.abs(pan.y - dragStart.current.y) > 5) return;

        setClickedId(engName); // Mark as clicked for visual feedback

        const clickedCountry = PATH_TO_SPANISH_NAME[engName];
        if (!clickedCountry) return;

        // Is this the country for the target capital?
        if (clickedCountry === currentCountryName) {
            // Correct
            addScore(10);
            setMessage(`¡Correcto! ${targetCapital} es la capital de ${clickedCountry}. 🎉`);

            const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            addError();
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste! Era ${currentCountryName}. ❌`); // Reveal country
                setFailedCountries(prev => [...prev, currentCountryName]);
                // Mark this country as "completed" but failed, so it shows up in red or distinct style
                // In this logic, we remove it from "remaining" so nextTurn picks something else.
                // We need to visually indicate it was failed. Logic below handles `isFailed`.

                // Move to next
                const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 2000);
            } else {
                // Show what they clicked
                const clickedCapital = EUROPE_CAPITALS[clickedCountry] || 'Desconocida';
                setMessage(`¡Incorrecto! Esa es ${clickedCapital} (${clickedCountry}). Intento ${newAttempts}/3. ❌`);
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setZoom(initialZoom);
        setPan(initialPan);
        setAttempts(0);
        setFailedCountries([]);
        setClickedId(null);
        setTargetCapital('');
        setCurrentCountryName('');

        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => EUROPE_CAPITALS[c]);

        setRemainingCountries(playable);
        setGameState('playing');
        nextTurn(playable);
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

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const totalTargets = useMemo(() => {
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        return playable.filter(c => EUROPE_CAPITALS[c]).length;
    }, [paths, targetList]);

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
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={totalTargets}
                    remainingTargets={remainingCountries.length}
                    targetName={targetCapital}
                    region={t.gamesPage.regions.europe}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal"
                    icon={<Globe className="w-8 h-8 text-teal-400" />}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center group cursor-move",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <Globe className="w-12 h-12 text-teal-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                                Busca la capital mostrada en el mapa.
                            </p>
                            <button
                                onClick={startGame}
                                className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Globe className="w-5 h-5 opacity-50" /></span>
                            </button>
                        </div>
                    )}

                    {/* WON OVERLAY - Unified with Map style */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>

                            <div className="flex flex-col items-center gap-2 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10">
                                <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">Puntuación Final</span>
                                <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                                    {score}
                                </span>
                            </div>

                            <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                <RefreshCw className="w-5 h-5" /> Jugar de nuevo
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
                        <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none" style={{ background: 'transparent' }}>
                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                                {/* Layer 1: Country Paths */}
                                {Object.entries(paths).map(([engName, pathD]) => {
                                    const spanishName = PATH_TO_SPANISH_NAME[engName];
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isFailed = failedCountries.includes(spanishName || '');
                                    const isInTargetList = targetList ? (spanishName && targetList.includes(spanishName)) : true;

                                    return (
                                        <motion.path
                                            key={`path-${engName}`}
                                            d={pathD}
                                            className={`stroke-[0.5px] transition-colors duration-150 pointer-events-auto cursor-pointer ${isInTargetList ? 'stroke-slate-900/20' : 'fill-slate-800/30 stroke-slate-800/50'}`}
                                            initial={false}
                                            onMouseEnter={() => isInTargetList && setHoveredCapital(engName)}
                                            onMouseLeave={() => setHoveredCapital(null)}
                                            onClick={(e: any) => {
                                                e.stopPropagation();
                                                handleCountryClick(engName);
                                            }}
                                            animate={{
                                                fill: isCompleted
                                                    ? (isFailed ? '#ef4444' : '#10b981')
                                                    : (isInTargetList ? (hoveredCapital === engName ? '#334155' : '#ffffff') : '#1e293b'), // Slight darken on hover
                                                opacity: isInTargetList ? 1 : 0.4
                                            }}
                                            style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                                        />
                                    );
                                })}

                                {/* Layer 2: Capital Points (Always on top) */}
                                {Object.entries(paths).map(([engName, pathD]) => {
                                    const spanishName = PATH_TO_SPANISH_NAME[engName];
                                    const isTarget = spanishName === currentCountryName;
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isFailed = failedCountries.includes(spanishName || '');
                                    const isInTargetList = targetList ? (spanishName && targetList.includes(spanishName)) : true;
                                    const centroid = (centroids && centroids[engName])
                                        ? centroids[engName]
                                        : calculatePathCentroid(pathD);
                                    const isClicked = clickedId === engName;

                                    if (!isInTargetList || !centroid) return null;

                                    return (
                                        <g
                                            key={`point-${engName}`}
                                            className="cursor-pointer pointer-events-auto"
                                            onMouseEnter={() => setHoveredCapital(engName)}
                                            onMouseLeave={() => setHoveredCapital(null)}
                                            onClick={(e: any) => {
                                                e.stopPropagation();
                                                handleCountryClick(engName);
                                            }}
                                        >
                                            {/* Hit Area (Invisible but larger) */}
                                            <circle
                                                cx={centroid?.x || 0}
                                                cy={centroid?.y || 0}
                                                r={12} // Increased hit area
                                                fill="transparent"
                                            />
                                            {/* Visual Dot */}
                                            <motion.circle
                                                cx={centroid?.x || 0}
                                                cy={centroid?.y || 0}
                                                r={hoveredCapital === engName ? 6 : 4} // React to hover
                                                className="pointer-events-none"
                                                initial={false}
                                                animate={{
                                                    fill: isCompleted
                                                        ? (isFailed ? '#ef4444' : '#10b981') // Green if correct, Red if failed (after 3 tries)
                                                        : (isClicked && !isCompleted ? '#ef4444' : (hoveredCapital === engName ? '#f59e0b' : '#0ea5e9')), // Red on instant error click, Amber on Hover, Blue default
                                                    opacity: 1,
                                                    stroke: "white",
                                                    strokeWidth: hoveredCapital === engName ? 2 : 1, // Thicker stroke on hover
                                                    scale: hoveredCapital === engName ? 1.2 : 1
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        </g>
                                    );
                                })}
                            </g>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper to calculate initial target count outside if needed, or just memo inside.
import { useMemo } from 'react';
