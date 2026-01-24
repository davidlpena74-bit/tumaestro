'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ZoomIn, ZoomOut, Maximize, Minimize, HelpCircle, RefreshCw } from 'lucide-react';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from './spanish-provinces';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Nombres bonitos para mostrar
// Use PROVINCE_NAMES from the imported file

export default function RegionGame() {
    // Note: RegionGame usually has 60s for Regions (fewer targets).
    // Rivers has 120s. Let's use 60s here.
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 60, penaltyTime: 5 });

    const [targetId, setTargetId] = useState<string | null>(null);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [solvedIds, setSolvedIds] = useState<string[]>([]);

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Fullscreen handlers
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
        pickNewTarget();
    };

    const pickNewTarget = () => {
        // Exclude already solved regions if we want to force completion without repeats?
        // Original logic was random. User just wants correct ones to stay marked.
        // Let's keep logic simple: if solved, it stays green. Can it be target again?
        // Typically in "locate all" games, solved ones are removed from pool.
        // Let's try to remove solved ones from pool if possible, OR just mark them.
        // User asked "que se quede marcada".
        // Let's persist the mark first.

        const allKeys = Object.keys(PROVINCE_NAMES);
        const availableKeys = allKeys.filter(k => !solvedIds.includes(k));

        // If all solved, maybe game over? hook typically handles time or we can check here.
        // If solvedIds.length === allKeys.length -> win?
        // Let's just pick from available if any, otherwise fallback to any (random practice).

        const keys = availableKeys.length > 0 ? availableKeys : allKeys;

        let randomKey = keys[Math.floor(Math.random() * keys.length)];
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
        if (solvedIds.includes(id)) return; // Prevent clicking already solved?

        setClickedId(id);

        if (id === targetId) {
            // Correct
            addScore(100);
            setSolvedIds(prev => [...prev, id]);
            setMessage(`¡Correcto! Es ${PROVINCE_NAMES[id] || id}`);
            setTimeout(pickNewTarget, 600);
        } else {
            // Incorrect
            addError();
            // Original reduced score by 20. hook uses hook logic?
            // hook has addScore but not removeScore easily exposed unless we add negative.
            // addScore accepts negative?
            // "addScore(points)" -> setScore(s => s + points).
            // So we can do addScore(-20).
            addScore(-20);
            setMessage('¡Esa no es! Intenta de nuevo.');
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

    const resetGame = () => {
        hookResetGame();
        setTargetId(null);
        setClickedId(null);
        setSolvedIds([]);

        // hookResetGame sets state to 'start' (or 'playing'? hook implementation usually resets to initial state).
        // Let's accept 'start' state and let user click 'Start' again.
        // Or if we want immediate restart:
        // startGame();
        // But GameHUD 'onReset' usually goes to start screen or restarts?
        // In RiversGame it did: setGameState('playing'); nextTurn();
        // Let's restart immediately.
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
                    title="Provincias"
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={Object.keys(SPANISH_PROVINCES_PATHS).length}
                    remainingTargets={Object.keys(SPANISH_PROVINCES_PATHS).length - solvedIds.length}
                    targetName={targetId ? (PROVINCE_NAMES[targetId] || targetId) : '...'}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal" // Using teal to match original styling
                    icon={<MapPin className="w-8 h-8 text-teal-400" />}
                />

                {/* MAP CONTAINER */}
                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-slate-800/20 rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group cursor-move",
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

                    {/* START OVERLAY */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <MapPin className="w-12 h-12 text-teal-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Provincias de España</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                                ¿Eres capaz de ubicar las 50 provincias y las 2 ciudades autónomas?
                            </p>
                            <button
                                onClick={startGame}
                                className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <MapPin className="w-5 h-5 opacity-50" /></span>
                            </button>
                        </div>
                    )}

                    {/* GAME OVER OVERLAY */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]">
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <MapPin className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>
                            <div className="flex flex-col items-center gap-1 mb-8">
                                <span className="text-gray-400 text-sm uppercase tracking-widest">Puntuación Final</span>
                                <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                    {score}
                                </span>
                            </div>
                            <button onClick={startGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                                <RefreshCw className="w-5 h-5" /> Jugar de nuevo
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
                    <svg viewBox="-140 0 840 700" className="w-full h-full drop-shadow-2xl" style={{ transform: 'translateY(1cm)' }}>
                        <defs>
                            <filter id="glow-hover-region" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* CANARY ISLANDS INSET FRAME (Custom Projection) */}
                        <rect
                            x="-102" y="522" width="224" height="128"
                            className="fill-none stroke-white/20 stroke-1 pointer-events-none"
                            rx="8"
                            strokeDasharray="4 4"
                        />

                        <g
                            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                            style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                        >
                            {/* Render Regions from New Map Source */}
                            {Object.entries(SPANISH_PROVINCES_PATHS).map(([id, paths]) => {
                                const isTarget = targetId === id;
                                const isClicked = clickedId === id;
                                const isSolved = solvedIds.includes(id);

                                // Dynamic class logic
                                let fillClass = "fill-white/90";
                                // Note: Using thicker stroke for regions vs provinces
                                let strokeClass = "stroke-slate-900 stroke-[1.5]";

                                if (gameState === 'playing') {
                                    fillClass = "fill-white hover:fill-teal-100 cursor-pointer transition-colors duration-150";

                                    if (isSolved) {
                                        fillClass = "fill-green-500/80"; // Persistent completed style
                                    }

                                    if (isClicked) {
                                        strokeClass = "stroke-slate-900 stroke-[2]";
                                        if (isTarget) fillClass = "fill-green-500 animate-pulse";
                                        else fillClass = "fill-red-500";
                                    }
                                }

                                // Special regions transform
                                const isCanaryIsland = id === 'santacruz' || id === 'laspalmas';
                                const isCeutaMelilla = id === 'ceuta' || id === 'melilla';

                                let regionTransform = undefined;
                                if (isCanaryIsland) {
                                    // Center Canarias in the inset box (x: -102, y: 522, w: 224, h: 128)
                                    regionTransform = "translate(10, 586) scale(1.5) translate(-565, -471)";
                                } else if (isCeutaMelilla) {
                                    regionTransform = id === 'ceuta'
                                        ? "translate(188, 541) scale(3) translate(-188, -541)"
                                        : "translate(322, 582) scale(3) translate(-322, -582)";
                                }

                                return (
                                    <g
                                        key={id}
                                        transform={regionTransform}
                                        onClick={() => {
                                            if (isClick.current) handleRegionClick(id);
                                        }}
                                        style={{ pointerEvents: gameState === 'playing' ? 'all' : 'none' }}
                                        className="group"
                                    >
                                        {paths.map((d, i) => (
                                            <motion.path
                                                key={i}
                                                d={d}
                                                className={cn(strokeClass, fillClass)}
                                                initial={false}
                                                animate={
                                                    (isClicked && isTarget) ? { scale: 1.02 } : {}
                                                }
                                                style={{ transformOrigin: 'center' }}
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
