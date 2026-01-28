'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, Timer, MapPin, Trophy } from 'lucide-react';
import { EU_MEMBERS_LIST, EUROPE_CAPITALS, EU_MEMBERS_LIST_EN, EUROPE_CAPITALS_EN } from './data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech-utils';

type MatchItem = {
    country: string;
    capital: string;
    id: string;
};

export default function CapitalMatchingGame() {
    const { language, t } = useLanguage();
    const [countries, setCountries] = useState<MatchItem[]>([]);
    const [capitals, setCapitals] = useState<MatchItem[]>([]);
    const [matches, setMatches] = useState<Record<string, string>>({}); // countryId -> capitalId
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');

    // Localized Texts
    const TEXTS = {
        es: {
            title: 'Capitales de la UE',
            desc: 'Arrastra cada capital a su país correspondiente. ¿Podrás completarlo?',
            subHeader: 'Unión Europea: Países y Capitales',
            instruction: 'Arrastra la capital correcta a su país.',
            dragHere: 'Arrastra aquí',
            startBtn: 'EMPEZAR RETO',
            allAssigned: '¡Todas las capitales asignadas!',
            playAgain: 'Jugar de nuevo',
            congrats: '¡Impresionante!',
            winMsg: 'Has completado el mapa de la Unión Europea.',
            loading: 'Cargando...'
        },
        en: {
            title: 'EU Capitals',
            desc: 'Drag each capital to its corresponding country. Can you complete it?',
            subHeader: 'European Union: Countries & Capitals',
            instruction: 'Drag the correct capital to its country.',
            dragHere: 'Drop here',
            startBtn: 'START CHALLENGE',
            allAssigned: 'All capitals assigned!',
            playAgain: 'Play Again',
            congrats: 'Awesome!',
            winMsg: 'You have completed the European Union map.',
            loading: 'Loading...'
        }
    };
    const content = TEXTS[language];


    // Stats
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    // Custom Drag State
    const [draggedItem, setDraggedItem] = useState<MatchItem | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Initialize Game
    useEffect(() => {
        setupGame(false);
    }, [language]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing' && startTime) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, startTime]);

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


    const setupGame = (autoStart = false) => {
        const list = language === 'es' ? EU_MEMBERS_LIST : EU_MEMBERS_LIST_EN;
        const capitalsData = language === 'es' ? EUROPE_CAPITALS : EUROPE_CAPITALS_EN;

        const pairs: MatchItem[] = list.map((country, idx) => ({
            country,
            capital: capitalsData[country] || 'Unknown',
            id: `pair-${idx}`
        }));

        const sortedCountries = [...pairs].sort((a, b) => a.country.localeCompare(b.country));
        setCountries(sortedCountries);

        const sortedCapitals = [...pairs].sort((a, b) => a.capital.localeCompare(b.capital));
        setCapitals(sortedCapitals);

        setMatches({});
        setErrors(0);
        setElapsedTime(0);
        setStartTime(autoStart ? Date.now() : null);
        setGameState(autoStart ? 'playing' : 'start');
    };

    const startGame = () => {
        setStartTime(Date.now());
        setGameState('playing');
    };

    // Standard HTML5 Drag Start (still needed for drop targets to recognize connection)
    const handleDragStart = (e: React.DragEvent, item: MatchItem) => {
        if (gameState !== 'playing') return;
        // Create an invisible drag image to hide browser default ghost
        const emptyImg = new Image();
        emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(emptyImg, 0, 0);

        e.dataTransfer.setData('capitalId', item.id);
        e.dataTransfer.effectAllowed = 'move';

        // Activate our custom drag layer
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
        // Update position even during dragover to be smooth
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
            const newMatches = { ...matches, [targetCountryId]: capitalId };
            setMatches(newMatches);

            speak(language === 'es' ? '¡Correcto!' : 'Correct!', language === 'es' ? 'es-ES' : 'en-US');

            if (Object.keys(newMatches).length === countries.length) {
                setGameState('won');
            }
        } else {
            setErrors(e => e + 1);
            speak(language === 'es' ? '¡Incorrecto!' : 'Incorrect!', language === 'es' ? 'es-ES' : 'en-US');
        }
    };

    const sortedCountries = [...countries].sort((a, b) => {
        const isAMatched = !!matches[a.id];
        const isBMatched = !!matches[b.id];
        if (isAMatched === isBMatched) return a.country.localeCompare(b.country);
        return isAMatched ? 1 : -1;
    });

    const progress = (Object.keys(matches).length / countries.length) * 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 relative">

            {/* START OVERLAY - Unified with Map style */}
            {gameState === 'start' && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl h-full min-h-[500px]">
                    <div className="bg-indigo-500/10 p-4 rounded-full mb-6 ring-1 ring-indigo-500/30">
                        <MapPin className="w-12 h-12 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{content.title}</h2>
                    <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                        {content.desc}
                    </p>
                    <button
                        onClick={startGame}
                        className="group relative px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.6)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">{content.startBtn} <Timer className="w-5 h-5 opacity-50" /></span>
                    </button>
                </div>
            )}

            {/* Custom Drag Layer (The "Cajita") */}
            {isDragging && draggedItem && createPortal(
                <div
                    className="fixed pointer-events-none z-[9999] px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-2xl border-2 border-indigo-400 rotate-3"
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: 'translate(-50%, -50%)' // Center on cursor
                    }}
                >
                    {draggedItem.capital}
                </div>,
                document.body
            )}

            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-4 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{content.subHeader}</h2>
                    <div className="flex gap-6 text-slate-400">
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2">
                                <Timer className="w-5 h-5 text-indigo-400" />
                                <span className="font-mono font-bold text-xl text-white">{formatTime(elapsedTime)}</span>
                            </div>
                            {gameState === 'playing' && (
                                <span className="text-[10px] uppercase font-bold text-indigo-300/70 tracking-wider">
                                    {t.common.remaining}: {countries.length - Object.keys(matches).length}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-400" />
                            <span className="font-bold text-xl text-white">{errors}</span>
                            <span className="text-sm">{t.common.errors}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-teal-400">
                        {Object.keys(matches).length} <span className="text-xl text-slate-500">/ {countries.length}</span>
                    </div>
                    <div className="text-sm font-bold text-teal-300/70 mt-1">
                        {(() => {
                            const totalAttempts = Object.keys(matches).length + errors;
                            const accuracy = totalAttempts > 0 ? Math.round((Object.keys(matches).length / totalAttempts) * 100) : 100;
                            return `${accuracy}% ${language === 'es' ? 'Precisión' : 'Accuracy'}`;
                        })()}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-indigo-500"
                />
            </div>

            {gameState === 'won' ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl animate-in fade-in duration-500"
                >
                    <div className="bg-indigo-500/10 p-4 rounded-full mb-6 ring-1 ring-indigo-500/30">
                        <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>

                    <div className="flex gap-12 mb-8 mt-4">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-medium italic">Tiempo</span>
                            <span className="text-4xl font-black text-white">{formatTime(elapsedTime)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-medium italic">Errores</span>
                            <span className="text-4xl font-black text-red-500">{errors}</span>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-8 max-w-sm">{content.winMsg}</p>

                    <button
                        onClick={() => setupGame(true)}
                        className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                    >
                        <RefreshCw className="w-5 h-5" /> {content.playAgain}
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Column: Countries (Drop Targets) */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                        {sortedCountries.map((item) => {
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
                                            ? 'bg-indigo-500/10 border-indigo-500/50 order-last opacity-60'
                                            : 'bg-white/5 border-dashed border-white/10 hover:border-white/30'
                                        }
                                    `}
                                >
                                    <span className={`font-bold text-lg ${isMatched ? 'text-indigo-300' : 'text-white'}`}>
                                        {item.country}
                                    </span>

                                    <div className={`
                                        h-10 px-4 rounded-lg flex items-center justify-center min-w-[120px] text-sm transition-all duration-300
                                        ${isMatched
                                            ? 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20'
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
                                            cursor-move p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-center border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 shadow-xl transition-all select-none
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
            )}
        </div>
    );
}
