'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';


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
}

export default function CountryGameBase({
    title,
    description,
    regionName,
    pathData,
    nameMapping,
    initialTime = 180,
    colorTheme = "emerald",
    initialZoom = 1,
    initialPan = { x: 0, y: 0 },
    elevationHeight = 8,
    taskId = null,
    activityId,
    identifyMode = 'countries',
    backgroundLabels = [],
    backgroundPaths = {}
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

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const available = Object.keys(pathData)
            .map(engName => nameMapping[engName])
            .filter(Boolean);
        setRemainingCountries(available);

        // Safety: Ignore Supabase Auth AbortErrors that sometimes bubble up during fast unmounting/HMR
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const errStr = event.reason?.message || (typeof event.reason === 'string' ? event.reason : '');
            if (event.reason?.name === 'AbortError' ||
                errStr.includes('aborted without reason') ||
                errStr.includes('signal is aborted')) {
                event.preventDefault();
                console.debug('Swallowed Supabase AbortError:', errStr);
            }
        };

        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            document.removeEventListener('fullscreenchange', handleFsChange);
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

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div ref={gameContainerRef} className={cn("w-full flex flex-col items-center select-none transition-all duration-300", isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : "")}>
            <div className={cn("w-full flex flex-col items-center relative", isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4")}>
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
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] p-0 overflow-hidden border border-white/5 shadow-2xl group z-10 -mt-1",
                        isFullscreen && "flex-1 min-h-[500px] mt-0"
                    )}
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

                    {/* Controls */}
                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <button onClick={() => { setZoom(initialZoom); setPan(initialPan); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer" title="Reset View">
                            <RefreshCwIconGame className="w-5 h-5" />
                        </button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10 cursor-pointer">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* HUD / Target Info / Drilldown Selector - MOVED OUTSIDE LOOP FOR SPEED & LOGIC */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full max-w-sm px-4">
                        <AnimatePresence mode="wait">
                            {targetCountry && gameState === 'playing' && (
                                <motion.div
                                    key={targetCountry}
                                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                    className="bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl text-center"
                                >
                                    <div className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">
                                        {identifyMode === 'capitals'
                                            ? (language === 'es' ? 'Localiza la Capital de:' : 'Locate the Capital of:')
                                            : (language === 'es' ? 'Localiza el País:' : 'Locate the Country:')}
                                    </div>
                                    <div className="text-3xl font-black text-white drop-shadow-lg leading-tight uppercase">
                                        {targetCountry}
                                    </div>
                                </motion.div>
                            )}

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
                                        Explorar en detalle <Maximize className="w-4 h-4" />
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
                    <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl" style={{ background: 'linear-gradient(135deg, #9bbdc9 0%, #adc8d4 100%)' }}>
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


                        </defs>

                        {/* 1. LOWER SEA LAYER — outside zoom group so always fills SVG viewport */}
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-gradient)" />
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-floor)" />

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>

                            {/* 0. Background Paths (Neighbors) */}
                            {Object.entries(backgroundPaths).map(([name, pathD]) => (
                                <path
                                    key={`bg-${name}`}
                                    d={pathD}
                                    fill="#dcd8cc"
                                    stroke="#afa99a"
                                    strokeWidth="0.3"
                                    className="pointer-events-none"
                                />
                            ))}

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
                                const isPlayable = !!localizedName;

                                let fillClass = isPlayable ? "fill-[#f5edda] hover:fill-[#e8e4d8]" : "fill-[#e8e4d8]";
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
                                            if (isClick.current && isPlayable) handleCountryClick(engName);
                                            e.stopPropagation();
                                        }}
                                        className="group"
                                        style={{ pointerEvents: (gameState === 'playing' && isPlayable) ? 'all' : 'none' }}
                                    >
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
                                            className={cn(
                                                strokeClass,
                                                fillClass,
                                                isHovered && gameState === 'playing' && !isCompleted && "fill-slate-200",
                                                isPlayable && "cursor-pointer"
                                            )}
                                            initial={false}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                transformOrigin: 'center',
                                                transformBox: 'fill-box',
                                                filter: 'none',
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
                                                        className={isPlayable ? "cursor-pointer" : ""}
                                                        onMouseEnter={() => isPlayable && gameState === 'playing' && setHoveredId(localizedName)}
                                                        onMouseLeave={() => setHoveredId(null)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (isClick.current && isPlayable) handleCountryClick(engName);
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
                                                                    ? { scale: 1, opacity: 1, filter: 'drop-shadow(0 0 8px rgba(255,255,255,1))' }
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
                    <span>{true
                        ? 'Usa los controles o rueda del ratón para hacer zoom.'
                        : 'Use controls or mouse wheel to zoom.'}</span>
                </p>
            </div>
        </div >
    );
}
