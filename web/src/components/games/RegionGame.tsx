'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, MapPin, Map as MapIcon, RefreshCw, XCircle, CheckCircle, HelpCircle, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SPANISH_COMMUNITIES_PATHS, REGION_DISPLAY_NAMES, REGION_DISPLAY_NAMES_EN } from './spanish-communities-paths';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech-utils';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function RegionGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { language, t } = useLanguage();

    // Localized names mapping
    const baseNames = language === 'es' ? REGION_DISPLAY_NAMES : REGION_DISPLAY_NAMES_EN;
    const NAMES = { ...baseNames };
    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    // Note: RegionGame usually has 60s for Regions (fewer targets).
    // Rivers has 120s. Let's use 60s here.
    const effectiveActivityId = activityId || "mapa-comunidades";

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
    } = useGameLogic({ initialTime: 2, penaltyTime: 5, gameMode, taskId, activityId: effectiveActivityId });

    const [targetId, setTargetId] = useState<string | null>(null);
    const [clickedId, setClickedId] = useState<string | null>(null);
    const [solvedIds, setSolvedIds] = useState<string[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Watch for win condition
    useEffect(() => {
        const allKeys = Object.keys(SPANISH_COMMUNITIES_PATHS);
        if (gameState === 'playing' && solvedIds.length === allKeys.length && allKeys.length > 0) {
            handleFinish();
        }
    }, [solvedIds, gameState, handleFinish]);

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

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setClickedId(null);
        setSolvedIds([]);
        pickNewTarget();
    };

    const pickNewTarget = (currentSolvedIds = solvedIds) => {
        const allKeys = Object.keys(SPANISH_COMMUNITIES_PATHS);
        const availableKeys = allKeys.filter(k => !currentSolvedIds.includes(k));

        if (availableKeys.length === 0) {
            handleFinish();
            return;
        }

        const keys = availableKeys.length > 0 ? availableKeys : allKeys;

        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (targetId && keys.length > 1) {
            while (randomKey === targetId) {
                randomKey = keys[Math.floor(Math.random() * keys.length)];
            }
        }

        setTargetId(randomKey);
        setClickedId(null);
        speak(`${t.common.find} ${NAMES[randomKey] || randomKey}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || !targetId) return;
        if (solvedIds.includes(id)) return; // Prevent clicking already solved?

        setClickedId(id);

        if (id === targetId) {
            // Correct
            addScore(100);
            const newSolved = [...solvedIds, id];
            setSolvedIds(newSolved);
            setMessage(`${t.common.correct} ${NAMES[id] || id}`);
            setTimeout(() => pickNewTarget(newSolved), 600);
        } else {
            // Incorrect
            addError();
            addScore(gameMode === 'challenge' ? -20 : -5);
            if (gameMode === 'practice') {
                const clickedName = NAMES[id] || id;
                setMessage(language === 'es' ? `¡Incorrecto! Esa es ${clickedName}. ❌` : `Incorrect! That is ${clickedName}. ❌`);
            } else {
                setMessage(language === 'es' ? '¡Esa no es! Intenta de nuevo.' : 'That is not the one! Try again.');
            }
        }
    };

    // Pan Handlers
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
                    title={t.gamesPage.gameTitles.region}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(NAMES).length}
                    remainingTargets={Object.keys(NAMES).length - solvedIds.length}
                    targetName={targetId ? (NAMES[targetId] || targetId) : '...'}
                    region={t.gamesPage.regions.spain}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="emerald"
                    icon={<MapIcon className="w-8 h-8 text-emerald-400" />}
                    activityId={effectiveActivityId}
                    gameState={gameState}
                />

                {/* MAP CONTAINER - Made transparent */}
                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group",
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

                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar">
                            {/* Top Header */}
                            <div className="flex flex-col items-center mb-8 shrink-0 mt-4">
                                <div className="bg-emerald-500/10 p-4 rounded-full mb-4 ring-1 ring-emerald-500/30">
                                    <MapPin className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight uppercase">{t.gamesPage.gameTitles.region}</h2>
                                <p className="text-gray-400 max-w-xl text-lg leading-relaxed font-medium">
                                    {language === 'es'
                                        ? 'Demuestra tus conocimientos y escala en el ranking global.'
                                        : 'Show your knowledge and climb the global ranking.'}
                                </p>
                            </div>

                            {/* Rankings Section */}
                            <div className="w-full max-w-5xl flex flex-col gap-8 mb-10">

                                {/* Rankings Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                        <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="score" />
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                        <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="time" />
                                    </div>
                                </div>

                                {/* Start Buttons Row (Now Below) */}
                                <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto w-full">
                                    <button
                                        onClick={() => startGame('challenge')}
                                        className="group relative flex-1 px-8 py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-2xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter"
                                    >
                                        MODO RETO <Timer className="w-8 h-8 opacity-70" />
                                    </button>

                                    <button
                                        onClick={() => startGame('practice')}
                                        className="group relative flex-1 px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_70px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-widest"
                                    >
                                        PRÁCTICA <RefreshCw className="w-6 h-6 opacity-50" />
                                    </button>
                                </div>

                                <div className="text-center opacity-50 shrink-0">
                                    <p className="text-white text-xs font-black uppercase tracking-[0.3em]">
                                        {language === 'es' ? '¡Prepárate para el éxito!' : 'Get ready for success!'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WON OVERLAY - Unified with Map style */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center animate-in fade-in duration-500 rounded-[2rem] overflow-y-auto custom-scrollbar">

                            {/* Top Section: Score & Trophy (Pushing up) */}
                            <div className="flex flex-col items-center mb-8 shrink-0">
                                <div className="bg-emerald-500/10 p-3 rounded-full mb-3 ring-1 ring-emerald-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Timer className="w-10 h-10 text-red-500 animate-pulse" />
                                    ) : (
                                        <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                                    {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : t.common.completed}
                                </h2>
                            </div>

                            {/* Main Content Area: Rankings & Actions */}
                            <div className="w-full max-w-5xl flex flex-col gap-6 mb-10">
                                {/* Rankings Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left: Score Box */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                        <div className="flex flex-col items-center gap-1 mb-4">
                                            <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{language === 'es' ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                            <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                                {score}
                                            </span>
                                        </div>
                                        <div className="w-full text-left">
                                            <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="score" />
                                        </div>
                                    </div>

                                    {/* Right: Time Box */}
                                    <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                        <div className="flex flex-col items-center gap-1 mb-4">
                                            <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{language === 'es' ? 'Tu Tiempo:' : 'Your Time:'}</span>
                                            <span className="text-4xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="w-full text-left">
                                            <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="time" />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Row - Reduced Height */}
                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                    <div className="flex-1 w-full bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                        <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                            <RatingSystem activityId={effectiveActivityId} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetGame}
                                        className="flex-1 w-full h-[120px] flex items-center justify-center gap-4 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-wider"
                                    >
                                        <RefreshCw className="w-8 h-8" /> {t.common.playAgain}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CONTROLS (Zoom/Full) */}
                    <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                        <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer" title="Reset View">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>

                    {/* SVG MAP */}
                    <svg viewBox="-140 0 840 700" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <filter id="glow-hover-region" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            {/* NEW: 3D Elevation Shadow */}
                            <filter id="elevation-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
                            </filter>
                        </defs>

                        {/* CANARY ISLANDS INSET FRAME (Custom Projection) */}
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
                            {/* Render Regions from New Map Source */}
                            {[...Object.entries(SPANISH_COMMUNITIES_PATHS)].sort(([idA], [idB]) => {
                                // Keep hovered item at the end to render on top
                                if (idA === hoveredId) return 1;
                                if (idB === hoveredId) return -1;
                                return 0;
                            }).map(([id, paths]) => {
                                const isTarget = targetId === id;
                                const isClicked = clickedId === id;
                                const isSolved = solvedIds.includes(id);
                                const isHovered = hoveredId === id;

                                // Dynamic class logic
                                let fillClass = "fill-white/90";
                                // Note: Using thicker stroke for regions vs provinces
                                let strokeClass = "stroke-slate-900 stroke-[0.8]";

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

                                // Shift Inset Regions (Canarias only) to match new box position
                                const isInset = id === 'canarias';
                                const regionTransform = isInset ? "translate(-160, 0)" : undefined;

                                return (
                                    <g
                                        key={id}
                                        transform={regionTransform}
                                        onMouseEnter={() => gameState === 'playing' && setHoveredId(id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={() => {
                                            if (isClick.current) handleRegionClick(id);
                                        }}
                                        style={{
                                            pointerEvents: gameState === 'playing' ? 'all' : 'none',
                                            cursor: gameState === 'playing' ? 'pointer' : 'default'
                                        }}
                                        className="group"
                                    >
                                        {/* Hit Area: Invisible paths that don't move to keep hover stable */}
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
                                                initial={false}
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
                                                    filter: (isHovered && gameState === 'playing') ? 'url(#elevation-shadow)' : 'none',
                                                    zIndex: isHovered ? 50 : 1,
                                                    pointerEvents: 'none' // Hover is managed by the invisible hit paths
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
                    <span>{language === 'es'
                        ? 'Usa los controles o rueda del ratón para hacer zoom.'
                        : 'Use controls or mouse wheel to zoom.'}</span>
                </p>
            </div>
        </div>
    );
}
