'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';


import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, Maximize, Minimize, Timer, RefreshCw, MapPin, HelpCircle, MessageSquareText, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PATH_TO_SPANISH_NAME, EUROPE_CAPITALS, PATH_TO_ENGLISH_NAME, EUROPE_CAPITALS_EN } from './data/capitals-data';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';
import { calculatePathCentroid } from '@/lib/svg-utils';
import { useMemo } from 'react';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CapitalGameProps {
    paths: Record<string, string>; // Map paths (English Key -> SVG Path)
    targetList?: string[]; // Optional list of Spanish country names to include in the game (e.g. only EU members)
    title: string;
    description?: string;
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    centroids?: Record<string, { x: number; y: number }>;
    icon?: React.ReactNode;
    colorTheme?: "emerald" | "blue" | "purple" | "orange" | "teal" | "yellow";
    taskId?: string | null;
    activityId?: string;
}

const DEFAULT_PAN = { x: 0, y: 0 };

export default function CapitalGame({
    paths,
    targetList,
    title,
    description,
    initialZoom = 1.5,
    initialPan = DEFAULT_PAN,
    centroids,
    icon,
    colorTheme = "emerald",
    taskId = null,
    activityId
}: CapitalGameProps) {
    const { language, t } = useLanguage();
    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const effectiveActivityId = activityId || "capital-game";

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
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode, taskId, activityId: effectiveActivityId });

    // Dynamic Data based on Language
    const nameMapping = useMemo(() => language === 'es' ? PATH_TO_SPANISH_NAME : PATH_TO_ENGLISH_NAME, [language]);
    const capitalsData = useMemo(() => language === 'es' ? EUROPE_CAPITALS : EUROPE_CAPITALS_EN, [language]);

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

    // Sync if props change or on remount
    useEffect(() => {
        setZoom(initialZoom);
        setPan(initialPan);
    }, [initialZoom, initialPan.x, initialPan.y]);

    // Hover state for points
    const [hoveredCapital, setHoveredCapital] = useState<string | null>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        // Filter available countries based on targetList if provided, otherwise use all from paths
        const pathCountries = Object.keys(paths).map(eng => nameMapping[eng]).filter(Boolean);

        let playable = pathCountries;
        if (targetList) {
            // Intersection of available paths and requested targets
            playable = pathCountries.filter(c => targetList.includes(c));
        }

        // Ensure we only have countries with defined capitals
        playable = playable.filter(c => capitalsData[c]);

        setRemainingCountries(playable);
        setLoading(false);

        // Reset game state on language change to avoid mismatches
        setGameState('start');
        setTargetCapital('');
        setCurrentCountryName('');
    }, [paths, targetList, language, nameMapping, capitalsData, setGameState]);

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setAttempts(0);
        setFailedCountries([]);
        setClickedId(null);
        setTargetCapital('');
        setCurrentCountryName('');

        // Re-calculate playable list to be safe
        const pathCountries = Object.keys(paths).map(eng => nameMapping[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => capitalsData[c]);
        setRemainingCountries(playable);

        nextTurn(playable);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            handleFinish();
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const nextCountry = currentRemaining[randomIndex];
        const rawCap = capitalsData[nextCountry];
        // @ts-ignore
        const nextCap = t.physical?.cities?.[rawCap] || rawCap;

        setCurrentCountryName(nextCountry);
        setTargetCapital(nextCap);
        setAttempts(0);
        setClickedId(null);
        speak(`${t.common.find} ${nextCap}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;


        setClickedId(engName); // Mark as clicked for visual feedback

        const clickedCountry = nameMapping[engName];
        if (!clickedCountry) return;

        // Is this the country for the target capital?
        if (clickedCountry === currentCountryName) {
            // Correct
            addScore(100);
            setMessage(`${t.common.correct} ${targetCapital} - ${clickedCountry}. 🎉`);

            const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            addError();
            if (gameMode === 'challenge') addScore(-5); // Penalty in challenge
            // No score penalty in practice, just error count

            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(language === 'es'
                    ? `¡Fallaste! Era ${currentCountryName}. ❌`
                    : `Failed! It was ${currentCountryName}. ❌`); // Reveal country
                setFailedCountries(prev => [...prev, currentCountryName]);
                // Mark this country as "completed" but failed, so it shows up in red or distinct style
                // In this logic, we remove it from "remaining" so nextTurn picks something else.
                // We need to visually indicate it was failed. Logic below handles `isFailed`.

                // Move to next
                const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 2000);
            } else {
                // Show what they clicked ONLY in practice mode
                if (gameMode === 'practice') {
                    const clickedCapital = capitalsData[clickedCountry] || 'Unknown';
                    setMessage(language === 'es'
                        ? `¡Incorrecto! Esa es ${clickedCapital} (${clickedCountry}). Intento ${newAttempts}/3. ❌`
                        : `Incorrect! That is ${clickedCapital} (${clickedCountry}). Attempt ${newAttempts}/3. ❌`);
                } else {
                    setMessage(language === 'es' ? `¡Incorrecto! Intento ${newAttempts}/3. ❌` : `Incorrect! Attempt ${newAttempts}/3. ❌`);
                }
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

        const pathCountries = Object.keys(paths).map(eng => nameMapping[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => capitalsData[c]);

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
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning blocked by user request
        /*
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
        */
    };

    const handleMouseUp = () => setIsDragging(false);

    const totalTargets = useMemo(() => {
        const pathCountries = Object.keys(paths).map(eng => nameMapping[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        return playable.filter(c => capitalsData[c]).length;
    }, [paths, targetList, nameMapping, capitalsData]);

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
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={totalTargets}
                    remainingTargets={remainingCountries.length}
                    targetName={targetCapital || '...'}
                    region={t.gamesPage.regions.europe}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme}
                    icon={icon || <Globe className={cn("w-8 h-8", colorTheme === 'emerald' ? "text-emerald-400" : "text-blue-400")} />}
                    activityId={effectiveActivityId || 'game'}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] bg-transparent rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl flex items-center justify-center group z-10 -mt-1",
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
                                            {icon || <Globe className="w-12 h-12" />}
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
                                        {description || (language === 'es' ? 'Busca la capital mostrada en el mapa.' : 'Find the capital shown on the map.')}
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
                                        {gameMode === 'challenge' && timeLeft === 0 ? (
                                            <TimerIconGame className="w-10 h-10 text-red-500 animate-pulse" />
                                        ) : (
                                            <TrophyIconGame className="w-10 h-10 text-yellow-400 animate-bounce" />
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">
                                        {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
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
                    <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* MAP */}
                    {(gameState === 'playing' || gameState === 'start') && (
                        <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none" style={{ background: 'transparent' }}>
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
                            {/* 1. LOWER SEA LAYER */}
                            <rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#sea-gradient)" />
                            <rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#sea-floor)" />
                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                                {/* Layer 1: Country Paths */}
                                {Object.entries(paths).map(([engName, pathD]) => {
                                    const spanishName = nameMapping[engName];
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isFailed = failedCountries.includes(spanishName || '');
                                    const isPlayable = !!spanishName && (targetList ? targetList.includes(spanishName) : true);
                                    const isInTargetList = isPlayable;

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
                                                fill: isInTargetList ? (hoveredCapital === engName ? '#e8e4d8' : '#f5edda') : undefined,
                                                opacity: isInTargetList ? 1 : 1
                                            }}
                                            transition={{ duration: 0.2 }}
                                            style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                                        />
                                    );
                                })}

                                {/* Layer 2: Capital Points (Always on top) */}
                                {Object.entries(paths).map(([engName, pathD]) => {
                                    const spanishName = nameMapping[engName];
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isFailed = failedCountries.includes(spanishName || '');
                                    const isPlayable = !!spanishName && (targetList ? targetList.includes(spanishName) : true);
                                    const isInTargetList = isPlayable;
                                    const centroid = (centroids && centroids[engName])
                                        ? centroids[engName]
                                        : calculatePathCentroid(pathD);
                                    const isClicked = clickedId === engName;

                                    if (!isInTargetList || !centroid) return null;

                                    // Special callouts for tiny countries
                                    const callouts: Record<string, { x: number, y: number }> = {
                                        "Vatican": { x: 371, y: 476 }
                                    };
                                    const connector = callouts[engName];

                                    return (
                                        <g key={`point-wrapper-${engName}`}>
                                            {connector && (
                                                <line
                                                    x1={centroid.x}
                                                    y1={centroid.y}
                                                    y2={connector.y}
                                                    x2={connector.x}
                                                    stroke="#64748b"
                                                    strokeWidth="0.5"
                                                    strokeDasharray="2,2"
                                                    className="opacity-60"
                                                />
                                            )}
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
                                                    r={hoveredCapital === engName ? 6 : 4}
                                                    className="pointer-events-none"
                                                    initial={false}
                                                    animate={{
                                                        fill: isCompleted
                                                            ? (isFailed ? '#ef4444' : '#10b981')
                                                            : (isClicked && !isCompleted ? '#ef4444' : (hoveredCapital === engName ? '#f59e0b' : '#0ea5e9')),
                                                        opacity: 1,
                                                        stroke: "white",
                                                        strokeWidth: hoveredCapital === engName ? 2 : 1,
                                                        scale: hoveredCapital === engName ? 1.2 : 1
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                />
                                            </g>
                                        </g>
                                    );
                                })}
                            </g>
                        </svg>
                    )}
                </div>
            </div>
        </div >
    );
}


