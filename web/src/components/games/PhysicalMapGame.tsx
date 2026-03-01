'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer, RefreshCw, MapPin, HelpCircle, MessageSquareText, X, Star } from 'lucide-react';
import ActivityRanking from './ActivityRanking';
import confetti from 'canvas-confetti';

import { calculatePathCentroid } from '@/lib/svg-utils';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';
import RatingSystem from './RatingSystem';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const MountainPeak = ({ x, y, size = 1, status }: { x: number, y: number, size?: number, status: 'normal' | 'hovered' | 'completed' | 'failed' }) => {
    const baseColor = status === 'completed' ? "#22c55e" : status === 'failed' ? "#ef4444" : (status === 'hovered' ? "#38bdf8" : "#94a3b8");
    const shadowColor = status === 'completed' ? "#166534" : status === 'failed' ? "#991b1b" : (status === 'hovered' ? "#0284c7" : "#475569");
    const snowColor = status === 'completed' ? "#bbf7d0" : status === 'failed' ? "#fecaca" : "#f1f5f9";

    return (
        <g transform={`translate(${x}, ${y}) scale(${size})`} className="pointer-events-none">
            {/* Right side (shadow) */}
            <path d="M 0,-16 L 14,12 L 0,12 Z" fill={shadowColor} className="transition-colors duration-300" />
            {/* Left side (light) */}
            <path d="M 0,-16 L -14,12 L 0,12 Z" fill={baseColor} className="transition-colors duration-300" />
            {/* Snowcap on light side */}
            <path d="M 0,-16 L -7,-2 L -3,-5 L 0,-3 Z" fill={snowColor} className="transition-colors duration-300" />
            {/* Snowcap on shadow side */}
            <path d="M 0,-16 L 7,-2 L 4,-4 L 0,-3 Z" fill="white" opacity="0.8" className="transition-colors duration-300" />
            {/* Subtle contour */}
            <path d="M -14,12 L 0,-16 L 14,12" fill="none" stroke="#0f172a" strokeWidth="0.5" strokeOpacity="0.3" strokeLinejoin="round" />
        </g>
    );
};

interface PhysicalItem {
    id: string;
    d: string;
    type: 'line' | 'polygon';
}

interface PhysicalMapGameProps {
    title: string;
    description: string;
    items: Record<string, any>;
    itemType?: 'line' | 'polygon' | 'peaks' | 'region' | 'mountain';
    backgroundPaths?: Record<string, string | string[]>;
    backgroundLabels?: { id: string; name: string; x: number; y: number }[];
    viewBox?: string;
    initialZoom?: number;
    initialPan?: { x: number; y: number };
    elevationHeight?: number;
    colorTheme?: "teal" | "emerald" | "blue" | "purple" | "orange" | "cyan";
    taskId?: string | null;
    activityId?: string;
    theme?: 'dark' | 'light';
    insetFrame?: { x: number; y: number; width: number; height: number };
    backgroundTransforms?: Record<string, string>;
    region?: string;
    gameType?: string;
    nameMapping?: Record<string, string>;
    customColors?: Record<string, string>;
    backgroundColors?: Record<string, string>;
    baseLabelSize?: number;
    mountainBlur?: number;
}

export default function PhysicalMapGame({
    title,
    description,
    items,
    itemType = 'line',
    backgroundPaths = {},
    backgroundLabels = [],
    viewBox = "0 0 800 600",
    initialZoom = 1,
    initialPan = { x: 0, y: 0 },
    elevationHeight = 8,
    colorTheme = "teal",
    taskId = null,
    activityId,
    theme = 'dark',
    insetFrame,
    backgroundTransforms = {},
    region,
    gameType,
    nameMapping = {},
    customColors = {},
    backgroundColors = {},
    baseLabelSize = 5,
    mountainBlur = 1.2
}: PhysicalMapGameProps) {
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
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode, taskId, activityId });

    const [targetItem, setTargetItem] = useState('');
    const [remainingItems, setRemainingItems] = useState<string[]>([]);
    const [failedItems, setFailedItems] = useState<string[]>([]);
    const [completedItems, setCompletedItems] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);

    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const clickStart = useRef({ x: 0, y: 0 });
    const isClick = useRef(true);

    // Sync if props change or on remount
    useEffect(() => {
        setZoom(initialZoom);
        setPan(initialPan);
    }, [initialZoom, initialPan]);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);

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
    }, [items]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // Utility to get transform with support for multiple ids (e.g. santacruz + laspalmas = canarias)
    const getActiveTransform = (id: string) => {
        if (backgroundTransforms[id]) return backgroundTransforms[id];
        // If this is a part of a larger region (like provinces belong to a community in some maps)
        // or if we have composite keys, we check if the ID is a substring of any transform key or vice-versa
        // For Spain, specific hack for Canary Islands provinces if only 'canarias' transform is provided
        if ((id === 'santacruz' || id === 'laspalmas') && backgroundTransforms['canarias']) {
            return backgroundTransforms['canarias'];
        }
        return undefined;
    };



    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setAttempts(0);
        setFailedItems([]);
        setCompletedItems([]);
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);
        nextTurn(itemKeys);
    };

    const getTranslatedName = (name: string) => {
        if (nameMapping[name]) return nameMapping[name];
        // @ts-ignore - dynamic access to translations
        return t.physical?.regions?.[name] || t.physical?.mountains?.[name] || t.physical?.seas?.[name] || t.physical?.rivers?.[name] || name;
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            handleFinish();
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetItem(next);
        setAttempts(0);

        const localizedFind = t.common.find || (language === 'es' ? 'Encuentra' : 'Find');
        speak(`${localizedFind} ${getTranslatedName(next)}`, language === 'es' ? 'es-ES' : 'en-US');
    };

    const handleItemClick = (name: string, e: React.MouseEvent) => {
        if (gameState !== 'playing') return;
        if (!isClick.current) return;
        e.stopPropagation();

        const translatedTarget = getTranslatedName(targetItem);
        const translatedClicked = getTranslatedName(name);

        if (name === targetItem) {
            addScore(100);
            setMessage(`${t.common.correct} 🎉`);
            setCompletedItems(prev => [...prev, name]);
            const newRemaining = remainingItems.filter(r => r !== targetItem);
            setRemainingItems(newRemaining);
            nextTurn(newRemaining);
        } else {
            addError();
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                const failMsg = language === 'es' ? `¡Fallaste! Era ${translatedTarget}` :
                    language === 'en' ? `Failed! It was ${translatedTarget}` :
                        language === 'fr' ? `Échec ! C'était ${translatedTarget}` :
                            `Fehlgeschlagen! Es war ${translatedTarget}`;
                setMessage(failMsg);
                setFailedItems(prev => [...prev, targetItem]);
                setCompletedItems(prev => [...prev, targetItem]);
                const newRemaining = remainingItems.filter(r => r !== targetItem);
                setRemainingItems(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                if (gameMode === 'practice') {
                    const incorrectMsg = language === 'es' ? `¡Incorrecto! Esa es ${translatedClicked}. Intento ${newAttempts}/3. ❌` :
                        language === 'en' ? `Incorrect! That is ${translatedClicked}. Attempt ${newAttempts}/3. ❌` :
                            language === 'fr' ? `Incorrect ! C'est ${translatedClicked}. Essai ${newAttempts}/3. ❌` :
                                `Falsch! Das ist ${translatedClicked}. Versuch ${newAttempts}/3. ❌`;
                    setMessage(incorrectMsg);
                } else {
                    const shortIncorrect = language === 'es' ? 'Incorrecto' :
                        language === 'en' ? 'Incorrect' :
                            language === 'fr' ? 'Incorrect' : 'Falsch';
                    setMessage(`${shortIncorrect} (${newAttempts}/3) ❌`);
                }
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setAttempts(0);
        setFailedItems([]);
        setCompletedItems([]);
        setZoom(initialZoom);
        setPan(initialPan);
        startGame();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        isClick.current = true;
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        clickStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // Panning blocked by user request
        /*
        if (!isDragging) return;
        if (Math.abs(e.clientX - clickStart.current.x) > 5 || Math.abs(e.clientY - clickStart.current.y) > 5) {
            isClick.current = false;
        }
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
        */
    };

    const handleMouseUp = () => setIsDragging(false);

    const sortedItems = useMemo(() => {
        const entries = Object.entries(items);
        return entries.sort((a, b) => {
            if (a[0] === hoveredItem) return 1;
            if (b[0] === hoveredItem) return -1;
            return 0;
        });
    }, [items, hoveredItem]);

    const landPathString = useMemo(() => {
        return Object.entries(backgroundPaths).map(([id, d]) => {
            const paths = Array.isArray(d) ? d : [d];
            return paths.map(p => {
                const transform = getActiveTransform(id);
                if (!transform) return p;

                let tx = 0, ty = 0, s = 1;
                const scaleMatch = transform.match(/scale\(([-\d.]+)\)/);
                if (scaleMatch) s = parseFloat(scaleMatch[1]);

                const transMatch = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
                if (transMatch) {
                    tx = parseFloat(transMatch[1]);
                    ty = parseFloat(transMatch[2]);
                }

                if (s !== 1 || tx !== 0 || ty !== 0) {
                    return p.replace(/([MLml])\s*([-\d.]+),([-\d.]+)/g, (_, m, x, y) =>
                        `${m}${parseFloat(x) * s + tx},${parseFloat(y) * s + ty}`
                    );
                }
                return p;
            }).join(' ');
        }).join(' ');
    }, [backgroundPaths, backgroundTransforms]);

    return (
        <div ref={gameContainerRef} className={cn("w-full flex flex-col items-center select-none transition-all duration-300", isFullscreen ? (theme === 'dark' ? "bg-[#0f172a]" : "bg-slate-50") : "")}>
            <div className={cn("w-full flex flex-col items-center relative", isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4")}>

                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={Object.keys(items).length}
                    remainingTargets={remainingItems.length}
                    targetName={getTranslatedName(targetItem)}
                    message={message}
                    onReset={resetGame}
                    colorTheme={colorTheme}
                    icon={<Globe className="w-8 h-8" />}
                    activityId={activityId || 'game'}
                    region={region}
                    gameType={gameType}
                    gameState={gameState}
                />

                <div
                    className={cn(
                        "relative w-full aspect-square md:aspect-[1.4] rounded-[2rem] overflow-hidden transition-colors duration-500 -mt-1 bg-transparent",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <AnimatePresence>
                        {gameState === 'start' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar">
                                {/* Top Header */}
                                <div className="flex flex-col items-center mb-8 shrink-0 mt-4">
                                    <div className="bg-emerald-500/10 p-4 rounded-full mb-4 ring-1 ring-emerald-500/30">
                                        <Globe className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight uppercase leading-tight max-w-2xl">{title}</h2>
                                    <p className="text-gray-400 max-w-xl text-lg leading-relaxed font-medium">
                                        {true
                                            ? '¿Podrás entrar en el Salón de la Fama personal del maestro David?'
                                            : 'Will you be able to enter Master Davids personal Hall of Fame?'}
                                    </p>
                                </div>

                                {/* Rankings Section */}
                                <div className="w-full max-w-6xl flex flex-col gap-8 mb-10">

                                    {/* Rankings Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                            <ActivityRanking activityId={activityId || "physical-map-game"} limit={3} sortBy="score" />
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                            <ActivityRanking activityId={activityId || "physical-map-game"} limit={3} sortBy="time" />
                                        </div>
                                    </div>

                                    {/* Start Buttons Row (Now Below) */}
                                    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto w-full">
                                        <button
                                            onClick={() => startGame('challenge')}
                                            className="group relative flex-1 px-8 py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-2xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter"
                                        >
                                            MODO RETO <TimerIconGame className="w-8 h-8 opacity-70" />
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
                                            {true ? '¡Prepárate para la aventura!' : 'Get ready for the adventure!'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center animate-in fade-in duration-500 rounded-[2rem] overflow-y-auto custom-scrollbar">

                                {/* Top Section: Score & Trophy (Pushing up) */}
                                <div className="flex flex-col items-center mb-8 shrink-0">
                                    <div className="bg-emerald-500/10 p-3 rounded-full mb-3 ring-1 ring-emerald-500/30">
                                        {gameMode === 'challenge' && timeLeft === 0 ? (
                                            <TimerIconGame className="w-10 h-10 text-red-500 animate-pulse" />
                                        ) : (
                                            <TrophyIconGame className="w-10 h-10 text-yellow-400 animate-bounce" />
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                                        {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
                                    </h2>
                                </div>

                                {/* Main Content Area: Rankings & Actions */}
                                <div className="w-full max-w-5xl flex flex-col gap-6 mb-10">
                                    {/* Rankings Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left: Score Box */}
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                            <div className="flex flex-col items-center gap-1 mb-4">
                                                <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{true ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                                <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                                    {score}
                                                </span>
                                            </div>
                                            <div className="w-full text-left">
                                                <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="score" />
                                            </div>
                                        </div>

                                        {/* Right: Time Box */}
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                            <div className="flex flex-col items-center gap-1 mb-4">
                                                <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{true ? 'Tu Tiempo:' : 'Your Time:'}</span>
                                                <span className="text-4xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                                    {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="w-full text-left">
                                                <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="time" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Row - Reduced Height */}
                                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                        <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                            <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                                <RatingSystem activityId={activityId || 'game'} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={resetGame}
                                            className="w-full md:w-[calc(50%-8px-8px)] flex-none h-[120px] flex items-center justify-center gap-4 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-wider"
                                        >
                                            <RefreshCwIconGame className="w-8 h-8" /> {t?.common?.playAgain || 'Jugar de nuevo'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer">{isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}</button>
                    </div>

                    <svg viewBox={viewBox} className="w-full h-full drop-shadow-2xl" style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #060d17 0%, #081424 100%)' : 'linear-gradient(135deg, #9bbdc9 0%, #adc8d4 100%)' }}>
                        <defs>
                            {/* SEA GRADIENTS */}
                            <linearGradient id="sea-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={theme === 'dark' ? '#060d17' : '#9bbdc9'} />
                                <stop offset="100%" stopColor={theme === 'dark' ? '#081424' : '#adc8d4'} />
                            </linearGradient>

                            <linearGradient id="sea-glass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={theme === 'dark' ? 'rgba(12, 26, 46, 0.1)' : 'rgba(168, 213, 232, 0.1)'} />
                                <stop offset="100%" stopColor={theme === 'dark' ? 'rgba(15, 39, 68, 0.15)' : 'rgba(197, 232, 245, 0.15)'} />
                            </linearGradient>

                            {/* SEA FLOOR PATTERN */}
                            <pattern id="sea-floor" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="1.5" fill={theme === 'dark' ? '#1e293b' : '#cbd5e1'} opacity="0.3" />
                                <path d="M0,20 Q10,15 20,20 T40,20" fill="none" stroke={theme === 'dark' ? '#1e293b' : '#cbd5e1'} strokeWidth="0.5" opacity="0.1" />
                            </pattern>

                            {/* GLASS REFLECTION */}
                            <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="white" stopOpacity="0.12" />
                                <stop offset="45%" stopColor="white" stopOpacity="0" />
                                <stop offset="55%" stopColor="white" stopOpacity="0" />
                                <stop offset="100%" stopColor="white" stopOpacity="0.08" />
                            </linearGradient>

                            {/* NEW: Topographic Pattern for Land */}
                            <pattern id="land-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <rect width="100" height="100" fill="currentColor" />
                                <path d="M0,50 Q25,45 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" />
                                <path d="M0,25 Q25,20 50,25 T100,25" fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" />
                                <path d="M0,75 Q25,70 50,75 T100,75" fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" />
                            </pattern>

                            <filter id="physical-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            <filter id="mountain-roughness" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="5" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                            </filter>

                            {/* STIPPLE FILTERS */}
                            <filter id="stipple-heavy" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="1" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 10 -4" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.2" />
                            </filter>

                            <filter id="stipple-mid" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 12 -5" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.2" />
                            </filter>

                            <filter id="stipple-fine" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="3" result="noise" />
                                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 15 -7" result="stipple" />
                                <feComposite in="SourceGraphic" in2="stipple" operator="in" />
                                <feGaussianBlur stdDeviation="0.1" />
                            </filter>

                            <filter id="mountain-shadow" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feOffset dx="0.5" dy="0.5" result="offsetBlur" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.5" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="mountain-body-soft" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation={mountainBlur} />
                            </filter>

                            <filter id="ridge-glow" x="-100%" y="-100%" width="300%" height="300%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feFlood floodColor="white" floodOpacity="0.8" result="light" />
                                <feComposite in="light" in2="blur" operator="in" result="glow" />
                                <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="elevation-hover" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                                <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
                                <feComponentTransfer in="offsetBlur">
                                    <feFuncA type="linear" slope="0.3" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <filter id="magnifier-glass" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                                <feOffset in="blur" dx="0" dy="1" result="offsetBlur" />
                                <feComponentTransfer in="offsetBlur">
                                    <feFuncA type="linear" slope="0.4" />
                                </feComponentTransfer>
                                <feFlood floodColor="white" floodOpacity="0.3" result="flood" />
                                <feComposite in="flood" in2="SourceAlpha" operator="in" result="shine" />
                                <feMerge>
                                    <feMergeNode in="offsetBlur" />
                                    <feMergeNode in="shine" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            <clipPath id="land-mask">
                                {Object.entries(backgroundPaths).map(([id, d]) => {
                                    const transform = getActiveTransform(id);
                                    return (
                                        <g key={`clip-${id}`} transform={transform}>
                                            {Array.isArray(d) ? d.map((p, i) => (
                                                <path key={i} d={p} />
                                            )) : (
                                                <path d={d as string} />
                                            )}
                                        </g>
                                    );
                                })}
                            </clipPath>
                        </defs>

                        {/* 1. LOWER SEA LAYER — outside zoom group so it always fills the SVG viewport */}
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-gradient)" />
                        <rect x="-5000" y="-5000" width="15000" height="15000" fill="url(#sea-floor)" />

                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>


                            {/* INSET FRAME */}
                            {insetFrame && (
                                <rect
                                    x={insetFrame.x}
                                    y={insetFrame.y}
                                    width={insetFrame.width}
                                    height={insetFrame.height}
                                    className={cn(
                                        "fill-none stroke-1 pointer-events-none",
                                        theme === 'dark' ? "stroke-white/10" : "stroke-white shadow-sm"
                                    )}
                                    rx="8"
                                    strokeDasharray="4 4"
                                />
                            )}

                            {/* BACKGROUND PATHS */}
                            <g className="pointer-events-none">
                                {Object.entries(backgroundPaths).map(([id, d], i) => {
                                    const isHovered = id === hoveredItem;
                                    const regionTransform = getActiveTransform(id);

                                    // Neighbor country tints (only applies when those countries are in the bg)
                                    const getColorClass = () => {
                                        if (theme === 'dark') return 'fill-[#1e2d40] stroke-[#2d3f55]';
                                        if (backgroundColors && backgroundColors[id]) return backgroundColors[id];
                                        if (id === 'Andorra' || id === 'Gibraltar' || id === 'France' || id === 'Morocco' || id === 'Algeria' || id === 'Portugal' || id === 'portugal' || id === 'andorra' || id === 'france' || id === 'morocco' || id === 'algeria') {
                                            return 'fill-[#e5e7eb] stroke-[#d1d5db]'; // Gray-200 fill and Gray-300 stroke for context
                                        }
                                        return 'fill-[#f5edda] stroke-[#c8b89a]'; // Spain regions (default)
                                    };

                                    return (
                                        <g
                                            key={id}
                                            transform={regionTransform}
                                            style={{
                                                opacity: isHovered ? 0 : 1,
                                                transition: 'opacity 0.2s ease-in-out'
                                            }}
                                        >
                                            {Array.isArray(d) ? d.map((path, j) => (
                                                <path
                                                    key={`${id}-${j}`}
                                                    d={path}
                                                    className={cn("stroke-[0.5] transition-colors duration-300", getColorClass())}
                                                />
                                            )) : (
                                                <path
                                                    key={id}
                                                    d={d as string}
                                                    className={cn("stroke-[0.5] transition-colors duration-300", getColorClass())}
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </g>


                            {/* INTERACTIVE ITEMS */}
                            <g>
                                {sortedItems.map(([name, d]) => {
                                    const isTarget = name === targetItem;
                                    const isCompleted = completedItems.includes(name);
                                    const isFailed = failedItems.includes(name);
                                    const isHovered = name === hoveredItem;

                                    let color = "rgba(255,255,255,0.6)";
                                    if (isCompleted) color = "rgba(34, 197, 94, 0.8)"; // green-500 with 0.8 opacity (RegionGame style)
                                    if (isFailed) color = "rgba(239, 68, 68, 0.8)";
                                    if (isHovered && gameState === 'playing' && !isCompleted) color = "#22d3ee";

                                    return (
                                        <g
                                            key={name}
                                            className="cursor-pointer group"
                                            onMouseEnter={() => gameState === 'playing' && setHoveredItem(name)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            onClick={(e) => handleItemClick(name, e)}
                                            transform={getActiveTransform(name)}
                                        >
                                            <path
                                                d={itemType === 'peaks' ? d.path : (itemType === 'mountain' ? (typeof d === 'string' ? d : d.ridge) : (typeof d === 'string' ? d : d.path))}
                                                fill={(itemType === 'polygon' || itemType === 'region') ? "white" : "none"}
                                                stroke="white"
                                                strokeWidth={(itemType === 'polygon' || itemType === 'region') ? "4" : "30"}
                                                opacity="0"
                                                className="pointer-events-auto"
                                            />

                                            {itemType === 'mountain' ? (
                                                /* MOUNTAINS - Premium relief style */
                                                <g style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.8))' : 'drop-shadow(0px 8px 6px rgba(0,0,0,0.4))' }}>
                                                    {/* Outer base (Lightest brown / soft edge) */}
                                                    <motion.path
                                                        d={typeof d === 'string' ? d : d.ridge}
                                                        fill="none"
                                                        stroke={isCompleted ? 'rgba(34, 197, 94, 0.4)' : isFailed ? 'rgba(239, 68, 68, 0.4)' : (isHovered ? 'rgba(245, 158, 11, 0.5)' : 'rgba(180, 83, 9, 0.4)')}
                                                        strokeWidth={isHovered ? 16 : 12}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="transition-all duration-300 pointer-events-none"
                                                    />
                                                    {/* Middle layer (Medium brown) */}
                                                    <motion.path
                                                        d={typeof d === 'string' ? d : d.ridge}
                                                        fill="none"
                                                        stroke={isCompleted ? '#16a34a' : isFailed ? '#dc2626' : (isHovered ? '#d97706' : '#92400e')}
                                                        strokeWidth={isHovered ? 10 : 7}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="transition-all duration-300 pointer-events-none"
                                                    />
                                                    {/* Inner Core (Dark brown divisor line) */}
                                                    <motion.path
                                                        d={typeof d === 'string' ? d : d.ridge}
                                                        fill="none"
                                                        stroke={isCompleted ? '#14532d' : isFailed ? '#7f1d1d' : (isHovered ? '#78350f' : '#451a03')}
                                                        strokeWidth={isHovered ? 4 : 2.5}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="transition-all duration-300 pointer-events-none"
                                                    />
                                                    {/* Very thin Specular highlight for volume */}
                                                    <motion.path
                                                        d={typeof d === 'string' ? d : d.ridge}
                                                        fill="none"
                                                        stroke="rgba(255,255,255,0.15)"
                                                        strokeWidth={1}
                                                        strokeDasharray="2 4"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="pointer-events-none transition-all duration-300"
                                                    />
                                                </g>
                                            ) : itemType === 'peaks' ? (
                                                <g style={{ filter: (isHovered || isCompleted) ? 'url(#physical-glow)' : 'url(#mountain-shadow)' }}>
                                                    {d.peaks.map((p: any, idx: number) => {
                                                        const status = isCompleted ? 'completed' : isFailed ? 'failed' : (isHovered ? 'hovered' : 'normal');
                                                        return (
                                                            <MountainPeak key={idx} x={p.x} y={p.y} size={p.scale || 1} status={status} />
                                                        )
                                                    })}
                                                </g>
                                            ) : itemType === 'line' ? (
                                                /* RIVERS - Premium blue water style */
                                                <g>
                                                    {/* Glow halo */}
                                                    <motion.path
                                                        d={d}
                                                        stroke={isCompleted ? '#22c55e' : isFailed ? '#ef4444' : (isHovered ? '#7dd3fc' : '#93c5fd')}
                                                        strokeWidth={isHovered ? 10 : 6}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                        opacity={0.2}
                                                        className="transition-all duration-300"
                                                    />
                                                    {/* Main river body */}
                                                    <motion.path
                                                        d={d}
                                                        stroke={isCompleted ? '#22c55e' : isFailed ? '#ef4444' : (isHovered ? '#60a5fa' : '#2563eb')}
                                                        strokeWidth={isHovered ? 4 : 2.5}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                        className="transition-all duration-300"
                                                    />
                                                    {/* Specular shimmer */}
                                                    <motion.path
                                                        d={d}
                                                        stroke="rgba(255,255,255,0.5)"
                                                        strokeWidth={isHovered ? 1.5 : 0.8}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        fill="none"
                                                        className="pointer-events-none transition-all duration-300"
                                                    />
                                                </g>
                                            ) : (
                                                /* POLYGON — Sea if blue theme, Mountain if teal/emerald */
                                                colorTheme === 'blue' ? (
                                                    /* SEAS - Premium water style */
                                                    <g>
                                                        <motion.path
                                                            d={d}
                                                            stroke={isCompleted ? '#22c55e' : isFailed ? '#ef4444' : (isHovered ? '#60a5fa' : '#3b82f6')}
                                                            strokeWidth={isHovered ? 2 : 1}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            fill={isCompleted ? 'rgba(34,197,94,0.35)' : isFailed ? 'rgba(239,68,68,0.3)' : (isHovered ? 'rgba(96,165,250,0.35)' : 'rgba(59,130,246,0.20)')}
                                                            className="transition-all duration-300"
                                                            style={{ filter: isHovered ? 'url(#physical-glow)' : 'none' }}
                                                        />
                                                        {/* Water shimmer lines */}
                                                        <motion.path
                                                            d={d}
                                                            stroke="rgba(255,255,255,0.4)"
                                                            strokeWidth={0.5}
                                                            fill="none"
                                                            strokeDasharray="4 6"
                                                            strokeLinecap="round"
                                                            opacity={isHovered ? 0.9 : 0.4}
                                                            className="pointer-events-none transition-all duration-300"
                                                        />
                                                    </g>
                                                ) : itemType === 'region' ? (
                                                    <g>
                                                        <motion.path
                                                            d={d}
                                                            fill={isCompleted ? 'rgba(34, 197, 94, 0.6)' : isFailed ? 'rgba(239, 68, 68, 0.6)' : (isHovered ? 'rgba(34, 211, 238, 0.4)' : (customColors && customColors[name] ? customColors[name] : 'transparent'))}
                                                            stroke={isCompleted ? '#166534' : isFailed ? '#991b1b' : (isHovered ? '#0891b2' : (customColors && customColors[name] ? '#cbd5e1' : 'transparent'))}
                                                            strokeWidth={0.5}
                                                            animate={{
                                                                y: isHovered ? -2 : 0,
                                                                filter: isHovered ? 'url(#elevation-hover)' : 'none'
                                                            }}
                                                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                                            className="transition-colors duration-300 cursor-pointer"
                                                        />

                                                        {/* Indicator "bola" for small regions (Ceuta & Melilla) */}
                                                        {(name === 'ceuta' || name === 'melilla') && gameState !== 'start' && (
                                                            <g>
                                                                {(() => {
                                                                    const centroid = calculatePathCentroid(d);
                                                                    if (!centroid) return null;
                                                                    return (
                                                                        <motion.circle
                                                                            cx={centroid.x}
                                                                            cy={centroid.y}
                                                                            r={isHovered ? 8 : 6}
                                                                            fill="white"
                                                                            stroke={isCompleted ? (isFailed ? "#ef4444" : "#22c55e") : "#334155"}
                                                                            strokeWidth="2"
                                                                            initial={{ scale: 0, opacity: 0 }}
                                                                            animate={{
                                                                                scale: 1,
                                                                                opacity: 1,
                                                                                filter: isHovered ? 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' : 'none'
                                                                            }}
                                                                            className="pointer-events-none"
                                                                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                                                                        />
                                                                    );
                                                                })()}
                                                            </g>
                                                        )}



                                                    </g>
                                                ) : (
                                                    <g>
                                                        {(() => {
                                                            const pathD = typeof d === 'string' ? d : d.path;
                                                            const isClosed = pathD.trimEnd().endsWith('Z') || pathD.trimEnd().endsWith('z');

                                                            return (
                                                                <motion.path
                                                                    d={pathD}
                                                                    fill={isClosed ? (isCompleted ? 'rgba(34,197,94,0.45)' : isFailed ? 'rgba(239,68,68,0.4)' : (isHovered ? 'rgba(34,211,238,0.4)' : 'rgba(146,64,14,0.3)')) : "none"}
                                                                    stroke={isCompleted ? 'rgba(34,197,94,0.7)' : isFailed ? 'rgba(239,68,68,0.7)' : (isHovered ? 'rgba(245,158,11,0.8)' : 'rgba(146,64,14,0.5)')}
                                                                    strokeWidth={isClosed ? 1 : 2.5}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    filter="url(#mountain-body-soft)"
                                                                    className="transition-all duration-300"
                                                                />
                                                            );
                                                        })()}
                                                    </g>
                                                )
                                            )}
                                        </g>
                                    );
                                })}
                            </g>

                            {/* 4. SEA OVERLAY (Holes for Land) - Glassmorphism effect */}
                            <g className="pointer-events-none">
                                <path
                                    d={`M -2000,-2000 H 4000 V 4000 H -2000 Z ${landPathString}`}
                                    fillRule="evenodd"
                                    fill="url(#sea-glass-gradient)"
                                    style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
                                />
                                {/* Surface Specular Reflection */}
                                <path
                                    d={`M -2000,-2000 H 4000 V 4000 H -2000 Z ${landPathString}`}
                                    fillRule="evenodd"
                                    fill="url(#glass-shine)"
                                />
                            </g>

                            {/* 5. LAND STROKES (On top of sea overlay to keep borders clean) */}
                            <g className="pointer-events-none">
                                {Object.entries(backgroundPaths).map(([id, d]) => {
                                    const regionTransform = backgroundTransforms[id];
                                    const getStrokeColor = () => {
                                        if (theme === 'dark') return '#2d3f55';
                                        if (id === 'Andorra' || id === 'Gibraltar' || id === 'France' || id === 'Morocco' || id === 'Algeria' || id === 'Portugal' || id === 'portugal' || id === 'andorra' || id === 'france' || id === 'morocco' || id === 'algeria') {
                                            return '#d1d5db'; // Gray-300 stroke for context
                                        }
                                        return '#c8b89a';
                                    };

                                    return (
                                        <g key={`stroke-${id}`} transform={regionTransform}>
                                            {Array.isArray(d) ? d.map((path, j) => (
                                                <path key={j} d={path} fill="none" stroke={getStrokeColor()} strokeWidth="0.5" />
                                            )) : (
                                                <path d={d as string} fill="none" stroke={getStrokeColor()} strokeWidth="0.5" />
                                            )}
                                        </g>
                                    );
                                })}
                            </g>

                            {/* 6. BACKGROUND LABELS (Seas/Oceans) - Always on top of background features */}
                            <g className="pointer-events-none">
                                {backgroundLabels.map((label, i) => {
                                    const transformStr = (label.id && getActiveTransform(label.id)) || "";
                                    let labelX = label.x;
                                    let labelY = label.y;

                                    if (transformStr && transformStr.includes('translate')) {
                                        const matches = transformStr.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
                                        if (matches) {
                                            labelX += parseFloat(matches[1]);
                                            labelY += parseFloat(matches[2]);
                                        }
                                    }

                                    return (
                                        <text
                                            key={i}
                                            x={labelX}
                                            y={labelY}
                                            className={cn(
                                                "font-black uppercase pointer-events-none select-none tracking-[0.2em] italic",
                                                (label as any).className || (theme === 'dark' ? "fill-slate-400/30" : "fill-slate-500/40")
                                            )}
                                            textAnchor="middle"
                                            style={{ fontSize: (label as any).fontSize || `${baseLabelSize * 1.5}px` }}
                                        >
                                            {label.name}
                                        </text>
                                    );
                                })}
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
