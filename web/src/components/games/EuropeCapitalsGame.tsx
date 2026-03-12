'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';


import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, RefreshCw, Timer, MapPin, Trophy } from 'lucide-react';
import { EUROPE_LIST, EUROPE_CAPITALS, EUROPE_LIST_EN, EUROPE_CAPITALS_EN } from './data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import ActivityRanking from './ActivityRanking';
import RatingSystem from './RatingSystem';
import { speak } from '@/lib/speech-utils';

type MatchItem = {
    country: string;
    capital: string;
    id: string;
};

export default function EuropeCapitalsGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { language, t } = useLanguage();

    // We'll use useGameLogic score/errors/timer, but handle gameState locally if needed or map it
    // Drag & Drop usually is "until finished", timer counts up or down? Original code counted UP.
    // Let's stick to standard behavior: Count DOWN from a generous time? Or stick to UP?
    // User requested "MARCADOR", which usually implies the same look (Timer counting down).
    // Let's give it 5 minutes (300s).
    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const effectiveActivityId = activityId || "capitales-europa";

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
    } = useGameLogic({ initialTime: 300, penaltyTime: 0, gameMode, taskId, activityId: effectiveActivityId });

    const [countries, setCountries] = useState<MatchItem[]>([]);
    const [capitals, setCapitals] = useState<MatchItem[]>([]);
    const [matches, setMatches] = useState<Record<string, string>>({}); // countryId -> capitalId

    // Custom Drag State
    const [draggedItem, setDraggedItem] = useState<MatchItem | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Initialize Game
    useEffect(() => {
        setupGameData();
    }, [language]);

    // Check win condition
    useEffect(() => {
        if (gameState === 'playing' && countries.length > 0) {
            if (Object.keys(matches).length === countries.length) {
                handleFinish();
            }
        }
    }, [matches, countries, gameState, setGameState]);

    const confettiEffect = async () => {
        const confetti = (await import('canvas-confetti')).default;
        confetti({ particleCount: 200, spread: 100 });
    };

    const setupGameData = () => {
        const list = language === 'es' ? EUROPE_LIST : EUROPE_LIST_EN;
        const capitalsData = language === 'es' ? EUROPE_CAPITALS : EUROPE_CAPITALS_EN;

        const pairs: MatchItem[] = list.map((country, idx) => {
            const rawCap = capitalsData[country] || 'Unknown';
            // @ts-ignore
            const translatedCap = t.physical?.cities?.[rawCap] || rawCap;
            return {
                country,
                capital: translatedCap,
                id: `pair-${idx}`
            };
        });

        const sortedCountries = [...pairs].sort((a, b) => a.country.localeCompare(b.country));
        setCountries(sortedCountries);

        const sortedCapitals = [...pairs].sort((a, b) => a.capital.localeCompare(b.capital));
        setCapitals(sortedCapitals);
    };

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setMatches({});
        setupGameData();
    };

    const resetGame = () => {
        hookResetGame();
        setMatches({});
        setupGameData();
        // Removed immediate startGame() to allow mode selection
    };

    // Standard HTML5 Drag Start
    const handleDragStart = (e: React.DragEvent, item: MatchItem) => {
        if (gameState !== 'playing') return;
        const emptyImg = new Image();
        emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(emptyImg, 0, 0);

        e.dataTransfer.setData('capitalId', item.id);
        e.dataTransfer.effectAllowed = 'move';

        setDraggedItem(item);
        setIsDragging(true);
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedItem(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleDrop = (e: React.DragEvent, targetCountryId: string) => {
        if (gameState !== 'playing') return;
        e.preventDefault();
        const capitalId = e.dataTransfer.getData('capitalId');

        setIsDragging(false);
        setDraggedItem(null);

        if (!capitalId) return;

        const countryObj = countries.find(c => c.id === targetCountryId);
        const capitalObj = capitals.find(c => c.id === capitalId);

        if (!countryObj || !capitalObj) return;

        if (countryObj.id === capitalObj.id) {
            // Match
            const newMatches = { ...matches, [targetCountryId]: capitalId };
            setMatches(newMatches);
            addScore(100);
            const msg = language === 'es' ? '¡Correcto!' : 'Correct!';
            setMessage(msg);
            speak(msg, language === 'es' ? 'es-ES' : 'en-US');
        } else {
            // Error
            addError();
            if (gameMode === 'challenge') addScore(-20);
            const msg = language === 'es' ? '¡Incorrecto!' : 'Incorrect!';
            setMessage(msg);
            speak(msg, language === 'es' ? 'es-ES' : 'en-US');
        }
    };

    // Sort countries: Matched at bottom? Or just alphabetically?
    // Original sorted by matched first?
    // "sortedCountries" variable name conflicts with state "countries" if not careful.
    // Let's compute display list.
    const displayCountries = [...countries].sort((a, b) => {
        const isAMatched = !!matches[a.id];
        const isBMatched = !!matches[b.id];
        if (isAMatched === isBMatched) return a.country.localeCompare(b.country);
        return isAMatched ? 1 : -1; // Matched go to bottom
    });

    const progress = Math.round((Object.keys(matches).length / countries.length) * 100) || 0;

    // Global drag listener to update cursor position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setCursorPos({ x: e.clientX, y: e.clientY });
            }
        };
        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                setDraggedItem(null);
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    const content = {
        title: language === 'es' ? 'Todas las Capitales' : 'All Capitals',
        desc: language === 'es' ? 'Desafío total: Arrastra las capitales de TODOS los países de Europa.' : 'Total Challenge: Drag the capitals of ALL European countries.',
        startBtn: language === 'es' ? 'EMPEZAR RETO' : 'START CHALLENGE',
        dragHere: language === 'es' ? 'Arrastra aquí' : 'Drop here',
        countriesTitle: language === 'es' ? 'Países' : 'Countries',
        capitalsTitle: language === 'es' ? 'Capitales Dispersas' : 'Scattered Capitals',
        allAssigned: language === 'es' ? '¡Todas las capitales asignadas!' : 'All capitals assigned!',
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-12 relative select-none -mt-1 rounded-[3rem] overflow-hidden">
            {/* SEA BACKGROUND (Unified with Map Activities) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="sea-gradient-match" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9bbdc9" />
                            <stop offset="100%" stopColor="#adc8d4" />
                        </linearGradient>

                        <pattern id="sea-floor-match" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" fill="#cbd5e1" opacity="0.3" />
                            <path d="M0,20 Q10,15 20,20 T40,20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#sea-gradient-match)" />
                    <rect width="100%" height="100%" fill="url(#sea-floor-match)" />
                </svg>
            </div>

            <div className="relative z-10">

                <GameHUD
                    title={content.title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    elapsedTime={elapsedTime}
                    gameMode={gameMode}
                    totalTargets={countries.length}
                    remainingTargets={countries.length - Object.keys(matches).length}
                    // HIDE TARGET BOX by passing undefined or handle inside component
                    // User said: "sin incluir el objetivo a buscar".
                    // If I pass undefined to targetName, what happens?
                    // The component renders "Loading..." or "..." if targetName is falsy.
                    // I might need to tweak GameHUD to hide the center box if targetName is strictly NULL/Undefined prop?
                    // Or I can pass a generic string like "Arrastra las capitales".
                    targetName={null}
                    message={message}
                    onReset={resetGame}
                    colorTheme="purple"
                    icon={<MapPin className="w-8 h-8 text-purple-400" />}
                    activityId={effectiveActivityId || 'game'}
                />

                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center rounded-[2rem] overflow-y-auto custom-scrollbar">
                        {/* Top Header */}
                        <div className="flex flex-col items-center mb-8 shrink-0 mt-4">
                            <div className="bg-purple-500/10 p-4 rounded-full mb-4 ring-1 ring-purple-500/30 text-purple-400">
                                <MapPin className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight uppercase leading-tight max-w-2xl">{content.title}</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                                {content.desc}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button
                                    onClick={() => startGame('challenge')}
                                    className="group relative flex-1 px-8 py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-2xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter"
                                >
                                    MODO RETO <TimerIconGame className="w-8 h-8 opacity-70" />
                                </button>

                                <button
                                    onClick={() => startGame('practice')}
                                    className="group relative flex-1 px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_70px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter"
                                >
                                    PRÁCTICA <Globe className="w-6 h-6 opacity-50" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* FINISHED OVERLAY */}
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
                                        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{language === 'es' ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                        <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                            {score}
                                        </span>
                                    </div>
                                    <div className="w-full text-left">
                                        <ActivityRanking activityId={effectiveActivityId || 'game'} limit={3} sortBy="score" />
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
                                        <ActivityRanking activityId={effectiveActivityId || 'game'} limit={3} sortBy="time" />
                                    </div>
                                </div>
                            </div>

                            {/* Actions Row - Reduced Height */}
                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                    <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                        <RatingSystem activityId={effectiveActivityId || 'game'} />
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

                {/* Custom Drag Layer */}
                {isDragging && draggedItem && createPortal(
                    <div
                        className="fixed pointer-events-none z-[9999] px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-2xl border-2 border-purple-400 rotate-3"
                        style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {draggedItem.capital}
                    </div>,
                    document.body
                )}

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/5 rounded-full mb-8 overflow-hidden mt-4 md:mt-0">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Countries (Drop Targets) */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                        <h3 className="col-span-full text-xl font-bold text-white/50 mb-2 uppercase tracking-wider text-center">{content.countriesTitle}</h3>
                        {displayCountries.map((item) => {
                            const isMatched = !!matches[item.id];
                            return (
                                <motion.div
                                    layout
                                    key={item.id}
                                    onDragOver={!isMatched ? handleDragOver : undefined}
                                    onDrop={!isMatched ? (e) => handleDrop(e, item.id) : undefined}
                                    className={`
                                    relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300
                                    ${isMatched
                                            ? 'bg-purple-500/10 border-purple-500/50 order-last opacity-60'
                                            : 'bg-white/5 border-dashed border-white/10 hover:border-white/30'
                                        }
                                `}
                                >
                                    <span className={`font-bold text-lg ${isMatched ? 'text-purple-300' : 'text-white'}`}>
                                        {item.country}
                                    </span>

                                    <div className={`
                                    h-10 px-4 rounded-lg flex items-center justify-center min-w-[120px] text-sm transition-all duration-300
                                    ${isMatched
                                            ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20'
                                            : 'bg-black/20 text-white/20'
                                        }
                                `}>
                                        {isMatched ? item.capital : content.dragHere}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column: Capitals (Draggables) */}
                    <div className="lg:col-span-2 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto pr-2">
                        <h3 className="text-xl font-bold text-white/50 mb-4 uppercase tracking-wider text-center sticky top-0 bg-slate-950/80 backdrop-blur-md z-10 py-2 rounded-lg">
                            {content.capitalsTitle}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 pb-8">
                            <AnimatePresence>
                                {capitals.filter(c => !Object.values(matches).includes(c.id)).map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e as any, item)}
                                        onDragEnd={handleDragEnd}
                                        className={`
                                        cursor-move p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-center border-b-4 border-purple-800 active:border-b-0 active:translate-y-1 shadow-xl transition-all select-none
                                        ${isDragging && draggedItem?.id === item.id ? 'opacity-0' : 'opacity-100'}
                                    `}
                                    >
                                        {item.capital}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {capitals.filter(c => !Object.values(matches).includes(c.id)).length === 0 && (
                                <div className="col-span-2 text-center text-slate-500 py-12">
                                    {content.allAssigned}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
