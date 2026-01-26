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
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Merged data for the game: join Canarias into 1 target
const GAME_PROVINCE_PATHS = { ...SPANISH_PROVINCES_PATHS };
const GAME_PROVINCE_NAMES = { ...PROVINCE_NAMES };

GAME_PROVINCE_PATHS['canarias'] = [
    ...(SPANISH_PROVINCES_PATHS['santacruz'] || []),
    ...(SPANISH_PROVINCES_PATHS['laspalmas'] || [])
];
delete (GAME_PROVINCE_PATHS as any)['santacruz'];
delete (GAME_PROVINCE_PATHS as any)['laspalmas'];

GAME_PROVINCE_NAMES['canarias'] = "Canarias";
delete (GAME_PROVINCE_NAMES as any)['santacruz'];
delete (GAME_PROVINCE_NAMES as any)['laspalmas'];

export default function MapGame() {
    const { t } = useLanguage();
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
    const [hoveredId, setHoveredId] = useState<string | null>(null);

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
        const allKeys = Object.keys(GAME_PROVINCE_NAMES);
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
            setMessage(`¡Bien! Es ${GAME_PROVINCE_NAMES[id]}`);
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
                    title="Desafío Provincial"
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={Object.keys(GAME_PROVINCE_NAMES).length}
                    remainingTargets={Object.keys(GAME_PROVINCE_NAMES).length - solvedIds.length}
                    targetName={targetId ? GAME_PROVINCE_NAMES[targetId] : '...'}
                    region={t.gamesPage.regions.spain}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal"
                    icon={<Trophy className="w-8 h-8 text-teal-400" />}
                />

                {/* MAP CONTAINER - Made transparent */}
                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-move",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
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
                    {/* ... (existing map content omitted for brevity, but I will provide the full block in ReplacementContent) */}

                    {/* REST OF THE MAP LOGIC ... */}
                    {/* I need the full content between START and END of the SVG container to not break it. */}
                    {/* Actually, I can just Target the START of the return and the END. */}
                    {/* But replace_file_content needs precise match. */}

                    {/* Let's redefine Target and Replacement to be simpler. */}
                    {/* I'll target the whole return block. */}


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

                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <MapPin className="w-12 h-12 text-teal-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">Desafío Provincial</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
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

                    {/* WON OVERLAY - Unified with Map style */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]">
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

                            <button onClick={startGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                <RefreshCw className="w-5 h-5" /> Intentar de nuevo
                            </button>
                        </div>
                    )}

                    {/* SVG MAP */}
                    <svg
                        viewBox="-140 0 840 700"
                        className="w-full h-full drop-shadow-2xl"
                    >
                        <defs>
                            <filter id="glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        {/* Transform Group */}
                        <g
                            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                            style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                        >


                            {/* CANARY ISLANDS INSET FRAME (Custom Projection) */}
                            <rect
                                x="-102" y="522" width="224" height="128"
                                className="fill-none stroke-white/20 stroke-1 pointer-events-none"
                                rx="8"
                                strokeDasharray="4 4"
                            />

                            {/* Render Provinces */}
                            {[...Object.entries(GAME_PROVINCE_PATHS)].sort(([idA], [idB]) => {
                                if (idA === hoveredId) return 1;
                                if (idB === hoveredId) return -1;
                                return 0;
                            }).map(([id, paths]) => {
                                const isTarget = targetId === id;
                                const isClicked = clickedId === id;
                                const isSolved = solvedIds.includes(id);
                                const isHovered = hoveredId === id;

                                let fillClass = "fill-white/90";
                                let strokeClass = "stroke-slate-900/50 stroke-[0.5]";

                                if (gameState === 'playing') {
                                    fillClass = "fill-white hover:fill-slate-200 cursor-pointer transition-colors duration-150";

                                    if (isSolved) {
                                        fillClass = "fill-green-500/80"; // Persistent completed style
                                    }

                                    if (isClicked) {
                                        strokeClass = "stroke-slate-900 stroke-1";
                                        if (isTarget) fillClass = "fill-green-500 animate-pulse";
                                        else fillClass = "fill-red-500";
                                    }
                                }

                                // Transform logic for special regions
                                const isCanaryIsland = id === 'canarias';
                                const isCeutaMelilla = id === 'ceuta' || id === 'melilla';

                                // Canary Islands: move to bottom-left inset box
                                // Ceuta & Melilla: scale up for better clickability
                                let regionTransform = undefined;
                                if (isCanaryIsland) {
                                    // Center Canarias in the inset box (x: -102, y: 522, w: 224, h: 128)
                                    regionTransform = "translate(10, 586) scale(1.5) translate(-565, -471)";
                                } else if (isCeutaMelilla) {
                                    // Scale up Ceuta and Melilla by 3x from their center
                                    regionTransform = id === 'ceuta'
                                        ? "translate(188, 541) scale(3) translate(-188, -541)"
                                        : "translate(322, 582) scale(3) translate(-322, -582)";
                                }

                                return (
                                    <g
                                        key={id}
                                        transform={regionTransform}
                                        onMouseEnter={() => gameState === 'playing' && setHoveredId(id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Only trigger if we weren't just dragging
                                            if (isClick.current) handleRegionClick(id);
                                        }}
                                        className="pointer-events-auto"
                                    >
                                        {/* Hit Area: Stable invisible paths */}
                                        {paths.map((d, i) => (
                                            <path
                                                key={`hit-${i}`}
                                                d={d}
                                                fill="transparent"
                                                stroke="transparent"
                                                strokeWidth="5"
                                            />
                                        ))}

                                        {/* Visual Area: Elevated paths */}
                                        {paths.map((d, i) => (
                                            <motion.path
                                                key={`vis-${i}`}
                                                d={d}
                                                className={cn(
                                                    strokeClass,
                                                    fillClass,
                                                    isHovered && gameState === 'playing' && !isSolved && !isClicked && "fill-slate-200"
                                                )}
                                                animate={
                                                    isHovered && gameState === 'playing'
                                                        ? { y: -8, scale: 1.05 }
                                                        : {
                                                            scale: (isClicked && isTarget) ? 1.02 : 1,
                                                            y: 0
                                                        }
                                                }
                                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                                style={{
                                                    transformOrigin: 'center',
                                                    filter: isHovered && gameState === 'playing' ? 'url(#elevation-shadow)' : 'none',
                                                    zIndex: isHovered ? 50 : 1,
                                                    pointerEvents: 'none'
                                                }}
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
        </div>
    );
}
