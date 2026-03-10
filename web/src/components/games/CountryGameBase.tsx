'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';


import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Timer, RefreshCw, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';
import { calculatePathCentroid } from '@/lib/svg-utils';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CountryGameProps {
    title: string;
    description?: string;
    regionName: string;
    pathData: Record<string, string>;
    nameMapping: Record<string, string>;
    initialTime?: number;
    colorTheme?: "emerald" | "blue" | "purple" | "orange" | "teal" | "yellow";
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    elevationHeight?: number;
    taskId?: string | null;
    activityId?: string;
    identifyMode?: 'countries' | 'capitals';
    backgroundLabels?: { id: string; name: string; x: number; y: number; className?: string; fontSize?: string }[];
    backgroundPaths?: Record<string, string>;
    backgroundColors?: Record<string, string>;
    customSvgElements?: React.ReactNode;
    viewBox?: string;
    backgroundClipPathId?: string;
}

const DEFAULT_PAN = { x: 0, y: 0 };

export default function CountryGameBase({
    title,
    description,
    regionName,
    pathData,
    nameMapping,
    initialTime = 180,
    colorTheme = "emerald",
    initialZoom = 1,
    initialPan = DEFAULT_PAN,
    elevationHeight = 8,
    taskId = null,
    activityId,
    identifyMode = 'countries',
    backgroundLabels = [],
    backgroundPaths = {},
    backgroundColors = {},
    customSvgElements = null,
    viewBox = "0 0 800 600",
    backgroundClipPathId
}: CountryGameProps) {
    const { language, t } = useLanguage();
    const [playMode, setPlayMode] = useState<'challenge' | 'practice'>('challenge');

    const effectiveActivityId = activityId || "country-map-game";

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
    } = useGameLogic({ initialTime, penaltyTime: 5, gameMode: playMode, taskId, activityId: effectiveActivityId });

    const [targetCountry, setTargetCountry] = useState('');
    const [remainingCountries, setRemainingCountries] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [failedCountries, setFailedCountries] = useState<string[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Zoom state initialized with props
    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    // Parse viewBox to get center coordinates for transforms
    const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
    const centerX = vbWidth / 2;
    const centerY = vbHeight / 2;

    // Sync if props change or on remount
    useEffect(() => {
        setZoom(initialZoom);
        setPan(initialPan);
    }, [initialZoom, initialPan.x, initialPan.y]);

    const gameContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const available = Object.keys(pathData)
            .map(engName => nameMapping[engName])
            .filter(Boolean);
        setRemainingCountries(available);

        // Safety: Ignore Supabase Auth AbortErrors that sometimes bubble up during fast unmounting/HMR
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const errStr = event.reason?.message || (typeof event.reason === 'string' ? event.reason : '');
            const isAbort =
                event.reason?.name === 'AbortError' ||
                errStr.includes('aborted') ||
                errStr.includes('signal is aborted') ||
                errStr.includes('aborted without reason');

            if (isAbort) {
                event.preventDefault();
                console.debug('Swallowed Supabase AbortError in CountryGameBase:', errStr);
            }
        };
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, [pathData, nameMapping]);

    const startGame = (mode?: 'challenge' | 'practice') => {
        if (mode) setPlayMode(mode);
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

        if (isCompleted) {
            setSelectedId(engName);
            return;
        }

        if (localizedName === targetCountry) {
            setSelectedId(engName);
            addScore(100);
            setMessage(`${t.common.correct} 🎉`);
            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            addError();
            addScore(playMode === 'challenge' ? -20 : -5); // Less penalty in practice
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
                if (playMode === 'practice') {
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



    return (
        <div ref={gameContainerRef} className="w-full flex flex-col items-center select-none transition-all duration-300">
            <div className="w-full flex flex-col items-center relative max-w-6xl mx-auto p-4">
                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={playMode}
                    totalTargets={Object.keys(nameMapping).length}
                    remainingTargets={remainingCountries.length}
                    targetName={targetCountry || '...'}
                    region={regionName}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme}
                    icon={<Globe className={cn("w-8 h-8", colorTheme === 'emerald' ? "text-emerald-400" : "text-blue-400")} />}
                    activityId={effectiveActivityId || 'game'}
                />

                <div
                    className="relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group z-10 -mt-1"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <AnimatePresence>
                        {/* START OVERLAY - Unified with Map style */}
                        {gameState === 'start' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar"
                                onMouseDown={e => e.stopPropagation()}
                            >
                                {/* Top Header */}
                                <div className="flex flex-col items-center mb-8 shrink-0 mt-4">
                                    <div className={cn(
                                        "p-4 rounded-full mb-4 ring-1",
                                        colorTheme === 'emerald' ? "bg-emerald-500/10 ring-emerald-500/30 text-emerald-400" : "bg-blue-500/10 ring-blue-500/30 text-blue-400"
                                    )}>
                                        <div className="w-12 h-12 flex items-center justify-center">
                                            <Globe className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight uppercase leading-tight max-w-2xl"
                                    >
                                        {title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-gray-400 max-w-xl text-lg leading-relaxed font-medium"
                                    >
                                        {description || (language === 'es' ? `Pon a prueba tus conocimientos de geografía en ${regionName}.` : `Test your geography knowledge in ${regionName}.`)}
                                    </motion.p>
                                </div>

                                {/* Rankings Section */}
                                <div className="w-full max-w-5xl flex flex-col gap-6 mb-10">
                                    {/* Rankings Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                            <div className="w-full text-left">
                                                <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="score" />
                                            </div>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                            <div className="w-full text-left">
                                                <ActivityRanking activityId={effectiveActivityId} limit={3} sortBy="time" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Start Buttons Row */}
                                    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto w-full">
                                        <button
                                            onClick={() => startGame('challenge')}
                                            className={cn(
                                                "group relative flex-1 px-8 py-6 font-black text-2xl rounded-3xl transition-all hover:scale-[1.02] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter shadow-xl",
                                                colorTheme === 'emerald'
                                                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-emerald-500/20"
                                                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                                            )}
                                        >
                                            MODO RETO <TrophyIconGame className="w-8 h-8 opacity-70" />
                                        </button>

                                        <button
                                            onClick={() => startGame('practice')}
                                            className="group relative flex-1 px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_70px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-widest"
                                        >
                                            PRÁCTICA <RefreshCwIconGame className="w-6 h-6 opacity-50" />
                                        </button>
                                    </div>

                                    <div className="text-center opacity-50 shrink-0">
                                        <p className="text-white text-xs font-black uppercase tracking-[0.3em]">
                                            {language === 'es' ? '¡Prepárate para el éxito!' : 'Get ready for success!'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* WON OVERLAY - Unified with Map style */}
                        {(gameState === 'finished' || gameState === 'won') && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar"
                            >
                                {/* Top Section: Score & Trophy (Pushing up) */}
                                <div className="flex flex-col items-center mb-8 shrink-0">
                                    <div className={cn(
                                        "p-3 rounded-full mb-3 ring-1",
                                        colorTheme === 'emerald' ? "bg-emerald-500/10 ring-emerald-500/30" : "bg-blue-500/10 ring-blue-500/30"
                                    )}>
                                        {playMode === 'challenge' && timeLeft === 0 ? (
                                            <TimerIconGame className="w-10 h-10 text-red-500 animate-pulse" />
                                        ) : (
                                            <TrophyIconGame className="w-10 h-10 text-yellow-400 animate-bounce" />
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">
                                        {playMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
                                    </h2>
                                    <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">
                                        {title}
                                    </p>
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
                                        <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                            <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                                <RatingSystem activityId={effectiveActivityId} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={resetGame}
                                            className={cn(
                                                "w-full md:w-[calc(50%-8px-8px)] flex-none h-[120px] flex items-center justify-center gap-4 px-6 py-2 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl uppercase tracking-wider",
                                                colorTheme === 'emerald'
                                                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20"
                                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20"
                                            )}
                                        >
                                            <RefreshCwIconGame className="w-8 h-8" /> {t?.common?.playAgain || 'Jugar de nuevo'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>



                    {/* HUD / Target Info / Drilldown Selector - MOVED OUTSIDE LOOP FOR SPEED & LOGIC */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-sm px-4">
                        <AnimatePresence mode="wait">
                            {/* EXPLORE BUTTON - Appears when a completed country is selected */}
                            {selectedId && !remainingCountries.includes(nameMapping[selectedId]) && (
                                <motion.div
                                    key={`explore-${selectedId}`}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="bg-slate-900/90 backdrop-blur-2xl border border-emerald-500/50 rounded-3xl p-5 shadow-2xl text-center pointer-events-auto mt-4"
                                >
                                    <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">✓ {nameMapping[selectedId]}</div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Navigation logic here:
                                            const countryParam = selectedId.toLowerCase().replace(/\s+/g, '-');
                                            window.location.href = `/actividades/mapa-continente/${regionName.toLowerCase().replace(/\s+/g, '-')}/${countryParam}`;
                                        }}
                                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-tighter"
                                    >
                                        Explorar en detalle <Globe className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="mt-3 text-white/40 hover:text-white/60 text-[10px] uppercase font-bold tracking-widest"
                                    >
                                        Cerrar
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* SVG MAP */}
                    <svg
                        viewBox={viewBox}
                        className="w-full h-full touch-none drop-shadow-2xl"
                        preserveAspectRatio="xMidYMid meet"
                        onMouseLeave={() => setHoveredId(null)}
                        style={{ background: 'linear-gradient(135deg, #9bbdc9 0%, #adc8d4 100%)' }}
                    >
                        <defs>
                            {/* SEA GRADIENTS */}
                            <linearGradient id="sea-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#9bbdc9" />
                                <stop offset="100%" stopColor="#adc8d4" />
                            </linearGradient>

                            {/* SEA FLOOR PATTERN */}
                            <pattern id="sea-floor" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill="#cbd5e1" opacity="0.3" />
                                <path d="M0,20 Q10,15 20,20 T40,20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.1" />
                            </pattern>


                            <filter id="elevation-hover" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                <feOffset in="blur" dx="0" dy="0.5" result="offsetBlur" />
                                <feComponentTransfer in="offsetBlur">
                                    <feFuncA type="linear" slope="0.2" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* 1. LOWER SEA LAYER — outside zoom group so always fills SVG viewport */}
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-gradient)" />
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-floor)" />

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>

                            {/* 0. Background Paths (Neighbors) */}
                            <g clipPath={backgroundClipPathId ? `url(#${backgroundClipPathId})` : undefined}>
                                {Object.entries(backgroundPaths).map(([name, pathD]) => {
                                    const colorClass = backgroundColors[name] || "fill-slate-800/30 stroke-slate-800/50";
                                    return (
                                        <path
                                            key={`bg-${name}`}
                                            d={pathD}
                                            className={cn("pointer-events-none", colorClass)}
                                            strokeWidth={0.2 / Math.sqrt(zoom)}
                                        />
                                    );
                                })}
                            </g>

                            {/* Background Labels (Seas/Oceans) */}
                            <g className="pointer-events-none">
                                {backgroundLabels.map((label) => (
                                    <text
                                        key={label.id}
                                        x={label.x}
                                        y={label.y}
                                        className={cn(
                                            "text-[6px] fill-slate-500/40",
                                            (label.id?.includes('mar') || label.id?.includes('ocean') || label.name?.toLowerCase().includes('mar') || label.name?.toLowerCase().includes('océan'))
                                                ? "uppercase tracking-[0.15em]"
                                                : "tracking-[0.05em] opacity-60",
                                            label.className
                                        )}
                                        style={{ fontSize: label.fontSize || '8px', pointerEvents: 'none' }}
                                        textAnchor="middle"
                                    >
                                        {label.name}
                                    </text>
                                ))}
                            </g>

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
                                const isSomethingHovered = hoveredId !== null && gameState === 'playing';
                                const isPlayable = !!localizedName;

                                // Base colors
                                const strokeClass = isPlayable ? "stroke-slate-900/30" : "stroke-slate-800/50";
                                const strokeWidth = isPlayable ? (0.4 / Math.sqrt(zoom)) : (0.2 / Math.sqrt(zoom));

                                // COLOR LOGIC
                                let fillColor = isPlayable ? "#f5edda" : "#1e293b4d"; // slate-800/30
                                if (isHovered && gameState === 'playing') {
                                    fillColor = "#00AA98";
                                } else if (isCompleted) {
                                    fillColor = isFailed ? "#ef4444" : "#22c55ecc"; // green-500/80
                                }

                                return (
                                    <g
                                        key={engName}
                                        onMouseEnter={() => isPlayable && gameState === 'playing' && setHoveredId(localizedName)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={(e) => {
                                            if (isClick.current && isPlayable) handleCountryClick(engName);
                                            e.stopPropagation();
                                        }}
                                        className="group"
                                        style={{ pointerEvents: (gameState === 'playing' && isPlayable) ? 'all' : 'none' }}
                                    >
                                        {/* Base shadow/down path when hovered */}
                                        {isHovered && gameState === 'playing' && (
                                            <path
                                                d={pathD}
                                                fill="#334155"
                                                stroke="none"
                                                className="pointer-events-none"
                                            />
                                        )}

                                        {/* Hit Area */}
                                        <path
                                            d={pathD}
                                            fill="transparent"
                                            stroke="transparent"
                                            strokeWidth="5"
                                            className={isPlayable ? "cursor-pointer" : "pointer-events-none"}
                                        />

                                        {/* Visual Area */}
                                        <motion.path
                                            d={pathD}
                                            strokeWidth={strokeWidth}
                                            className={cn(
                                                strokeClass,
                                                isPlayable && "cursor-pointer"
                                            )}
                                            style={{
                                                transformOrigin: 'center',
                                                transformBox: 'fill-box',
                                                zIndex: isHovered ? 50 : 1,
                                                pointerEvents: 'none'
                                            }}
                                            initial={false}
                                            animate={{
                                                fill: fillColor,
                                                scale: isHovered && gameState === 'playing' ? 1.01 : 1,
                                                y: isHovered && gameState === 'playing' ? -1 : 0,
                                                filter: isHovered && gameState === 'playing' ? 'url(#elevation-hover)' : 'none'
                                            }}
                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        />

                                    </g>
                                );
                            })}

                            {/* Layer 2: Capital Points (Always on top) */}
                            {identifyMode === 'capitals' && Object.entries(pathData).map(([engName, pathD]) => {
                                const localizedName = nameMapping[engName];
                                if (!localizedName) return null;

                                const centroid = calculatePathCentroid(pathD);
                                if (!centroid) return null;

                                const isCompleted = localizedName && !remainingCountries.includes(localizedName);
                                const isFailed = failedCountries.includes(localizedName);
                                const isHovered = hoveredId === localizedName;

                                return (
                                    <g
                                        key={`point-${engName}`}
                                        onMouseEnter={() => setHoveredId(localizedName)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={(e) => {
                                            if (isClick.current) handleCountryClick(engName);
                                            e.stopPropagation();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {/* Hit Area (Invisible but larger) */}
                                        <circle
                                            cx={centroid.x}
                                            cy={centroid.y}
                                            r={12 / zoom}
                                            fill="transparent"
                                        />
                                        {/* Visual Dot */}
                                        <motion.circle
                                            cx={centroid.x}
                                            cy={centroid.y}
                                            r={7 / Math.sqrt(zoom)}
                                            className="pointer-events-none shadow-lg"
                                            initial={false}
                                            animate={{
                                                fill: isCompleted
                                                    ? (isFailed ? '#ef4444' : '#10b981')
                                                    : (isHovered ? '#f59e0b' : '#0ea5e9'),
                                                stroke: "#ffffff",
                                                strokeWidth: 2 / Math.sqrt(zoom),
                                                scale: isHovered ? 1.3 : 1
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        />
                                    </g>
                                );
                            })}
                        </g>
                        {customSvgElements}
                    </svg>
                </div>

                <p className="text-gray-500 text-xs mt-4 flex items-center gap-2 justify-center">
                    <HelpCircle className="w-3 h-3" />
                    <span>{true
                        ? 'Usa los controles o rueda del ratón para hacer zoom.'
                        : 'Use controls or mouse wheel to zoom.'}</span>
                </p>
            </div>
        </div >
    );
}
