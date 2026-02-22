
'use client';

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

interface PhysicalItem {
    id: string;
    d: string;
    type: 'line' | 'polygon';
}

interface PhysicalMapGameProps {
    title: string;
    description: string;
    items: Record<string, string>;
    itemType?: 'line' | 'polygon';
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
    gameType
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

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, [items]);

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
        setAttempts(0);
        setFailedItems([]);
        setCompletedItems([]);
        const itemKeys = Object.keys(items);
        setRemainingItems(itemKeys);
        nextTurn(itemKeys);
    };

    const getTranslatedName = (name: string) => {
        // @ts-ignore - dynamic access to translations
        return t.physical?.mountains?.[name] || t.physical?.seas?.[name] || name;
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
            addScore(10);
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
        if (!isDragging) return;
        if (Math.abs(e.clientX - clickStart.current.x) > 5 || Math.abs(e.clientY - clickStart.current.y) > 5) {
            isClick.current = false;
        }
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
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
                    activityId={activityId}
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
                                    <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight uppercase leading-tight max-w-2xl">{title}</h2>
                                    <p className="text-gray-400 max-w-xl text-lg leading-relaxed font-medium">
                                        {language === 'es'
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
                                            {language === 'es' ? '¡Prepárate para la aventura!' : 'Get ready for the adventure!'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'finished' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start py-8 px-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar">
                                {/* Top Section: Score & Trophy (Pushing up) */}
                                <div className="flex flex-col items-center mb-10 shrink-0">
                                    <div className="bg-yellow-500/10 p-3 rounded-full mb-3 ring-1 ring-yellow-500/30">
                                        {gameMode === 'challenge' && timeLeft === 0 ? (
                                            <Timer className="w-10 h-10 text-red-500 animate-pulse" />
                                        ) : (
                                            <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                                        {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : t.common.completed}
                                    </h2>

                                    <div className="flex items-baseline gap-3 bg-white/5 px-6 py-2 rounded-2xl border border-white/10">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-black">{language === 'es' ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-5xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                                                {score}
                                            </span>
                                            <span className="text-emerald-400 font-black text-xl">{elapsedTime}s</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content Area: Rankings & Actions */}
                                <div className="w-full max-w-6xl grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                                    {/* Left Side: Rankings (8 columns) */}
                                    <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                            <ActivityRanking activityId={activityId || "physical-map-game"} limit={3} sortBy="score" />
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-left shadow-2xl">
                                            <ActivityRanking activityId={activityId || "physical-map-game"} limit={3} sortBy="time" />
                                        </div>
                                    </div>

                                    {/* Right Side: Actions & Feedback (4 columns) */}
                                    <div className="xl:col-span-4 space-y-4">
                                        <div className="bg-slate-900/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-1 shadow-xl">
                                            <RatingSystem activityId={activityId || "physical-map-game"} />
                                        </div>

                                        <button
                                            onClick={resetGame}
                                            className="w-full flex items-center justify-center gap-4 px-8 py-6 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xl rounded-[2rem] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-emerald-500/30 uppercase tracking-widest"
                                        >
                                            <RefreshCw className="w-7 h-7" /> {t.common.playAgain}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={cn("absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300", isFullscreen ? 'top-32 md:top-28' : 'top-4')} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer"><ZoomOut className="w-5 h-5" /></button>
                        <button onClick={() => { setZoom(initialZoom); setPan(initialPan); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer" title="Reset View"><RefreshCw className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm border border-white/10 cursor-pointer">{isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}</button>
                    </div>

                    <svg viewBox={viewBox} className="w-full h-full drop-shadow-2xl">
                        <defs>
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
                        </defs>

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
                                    const regionTransform = backgroundTransforms[id];

                                    return (
                                        <g key={id} transform={regionTransform}>
                                            {Array.isArray(d) ? d.map((path, j) => (
                                                <path
                                                    key={`${id}-${j}`}
                                                    d={path}
                                                    className={cn(
                                                        "stroke-[0.5]",
                                                        theme === 'dark' ? "fill-slate-700 stroke-slate-600 opacity-40" : "fill-white/90 stroke-slate-900/10"
                                                    )}
                                                />
                                            )) : (
                                                <path
                                                    key={id}
                                                    d={d}
                                                    className={cn(
                                                        "stroke-[0.5]",
                                                        theme === 'dark' ? "fill-slate-700 stroke-slate-600 opacity-40" : "fill-white/90 stroke-slate-900/10"
                                                    )}
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </g>

                            {/* LABELS */}
                            {backgroundLabels.map((label, i) => {
                                const transformStr = backgroundTransforms[label.id];
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
                                            "font-bold uppercase pointer-events-none select-none tracking-tight",
                                            theme === 'dark' ? "fill-slate-500 opacity-100" : "fill-slate-400 opacity-50"
                                        )}
                                        textAnchor="middle"
                                        style={{ fontSize: theme === 'dark' ? '3px' : '8px' }}
                                    >
                                        {label.name}
                                    </text>
                                );
                            })}

                            {/* INTERACTIVE ITEMS */}
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
                                    >
                                        <path
                                            d={d}
                                            fill={itemType === 'polygon' ? "white" : "none"}
                                            stroke="white"
                                            strokeWidth="30"
                                            opacity="0"
                                            className="pointer-events-auto"
                                        />

                                        {itemType === 'line' ? (
                                            <g style={{ filter: (isHovered || isCompleted) ? 'url(#physical-glow)' : 'url(#mountain-shadow)' }}>
                                                {/* LAYER 1: Deep Shadow (Wide Stipple) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#166534" : isFailed ? "#7f1d1d" : (isHovered ? "#22d3ee" : "#1a130e")}
                                                    strokeWidth={isHovered ? 8 : 5}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-heavy)' }}
                                                    className="transition-all duration-500 opacity-60"
                                                />

                                                {/* LAYER 2: Base Rock (Textured) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#22c55e" : isFailed ? "#dc2626" : (isHovered ? "#0891b2" : "#4a3728")}
                                                    strokeWidth={isHovered ? 6 : 4}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-mid)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 3: Mid Elevation */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#4ade80" : isFailed ? "#f87171" : (isHovered ? "#22d3ee" : "#7d5c4d")}
                                                    strokeWidth={isHovered ? 4 : 2.5}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-mid)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 4: High Ridge (Slightly rough solid) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#86efac" : isFailed ? "#fca5a5" : (isHovered ? "#ecfeff" : "#737373")}
                                                    strokeWidth={0.6}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#mountain-roughness)' }}
                                                    className="transition-all duration-500"
                                                />

                                                {/* LAYER 5: Peak Particles (Snow/Fine) */}
                                                <motion.path
                                                    d={d}
                                                    stroke={isCompleted ? "#d1fae5" : isFailed ? "#fee2e2" : "#ffffff"}
                                                    strokeWidth={1.2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    style={{ filter: 'url(#stipple-fine)' }}
                                                    opacity={isHovered ? 1 : 0.8}
                                                    className="transition-all duration-500"
                                                />
                                            </g>
                                        ) : (
                                            /* Polygon Main Path */
                                            <motion.path
                                                d={d}
                                                stroke={color}
                                                strokeWidth={1}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                fill={color}
                                                fillOpacity={0.3}
                                                className="transition-all duration-300"
                                                style={{
                                                    filter: isHovered || isCompleted ? 'url(#physical-glow)' : 'none',
                                                }}
                                                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                                            />
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
