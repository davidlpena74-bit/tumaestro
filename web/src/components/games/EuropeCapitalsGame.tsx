'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, Timer, MapPin } from 'lucide-react';
import { EUROPE_LIST, EUROPE_CAPITALS, EUROPE_LIST_EN, EUROPE_CAPITALS_EN } from './data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';

type MatchItem = {
    country: string;
    capital: string;
    id: string;
};

export default function EuropeCapitalsGame() {
    const { language, t } = useLanguage();
    const [countries, setCountries] = useState<MatchItem[]>([]);
    const [capitals, setCapitals] = useState<MatchItem[]>([]);
    const [matches, setMatches] = useState<Record<string, string>>({}); // countryId -> capitalId
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');

    // Localized Texts
    const TEXTS = {
        es: {
            title: 'Todas las Capitales',
            desc: 'Desafío total: Arrastra las capitales de TODOS los países de Europa.',
            subHeader: 'Europa Completa: Países y Capitales',
            instruction: 'Encuentra la capital de cada país europeo.',
            dragHere: 'Arrastra aquí',
            startBtn: 'EMPEZAR RETO',
            allAssigned: '¡Todas las capitales asignadas!',
            playAgain: 'Jugar de nuevo',
            congrats: '¡Impresionante!',
            winMsg: 'Has completado el mapa político de toda Europa.',
            countriesTitle: 'Países',
            capitalsTitle: 'Capitales Dispersas'
        },
        en: {
            title: 'All Capitals',
            desc: 'Total Challenge: Drag the capitals of ALL European countries.',
            subHeader: 'Full Europe: Countries & Capitals',
            instruction: 'Find the capital of each European country.',
            dragHere: 'Drop here',
            startBtn: 'START CHALLENGE',
            allAssigned: 'All capitals assigned!',
            playAgain: 'Play Again',
            congrats: 'Awesome!',
            winMsg: 'You have completed the political map of Europe.',
            countriesTitle: 'Countries',
            capitalsTitle: 'Scattered Capitals'
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
        const list = language === 'es' ? EUROPE_LIST : EUROPE_LIST_EN;
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
            const newMatches = { ...matches, [targetCountryId]: capitalId };
            setMatches(newMatches);

            if (Object.keys(newMatches).length === countries.length) {
                setGameState('won');
            }
        } else {
            setErrors(e => e + 1);
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

            {/* START OVERLAY */}
            {gameState === 'start' && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl h-full min-h-[500px]">
                    <div className="bg-purple-500/10 p-4 rounded-full mb-6 ring-1 ring-purple-500/30">
                        <MapPin className="w-12 h-12 text-purple-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{content.title}</h2>
                    <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                        {content.desc}
                    </p>
                    <button
                        onClick={startGame}
                        className="group relative px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">{content.startBtn} <Timer className="w-5 h-5 opacity-50" /></span>
                    </button>
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

            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-4 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{content.subHeader}</h2>
                    <div className="flex gap-6 text-slate-400">
                        <div className="flex items-center gap-2">
                            <Timer className="w-5 h-5 text-purple-400" />
                            <span className="font-mono font-bold text-xl text-white">{formatTime(elapsedTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <X className="w-5 h-5 text-red-400" />
                            <span className="font-bold text-xl text-white">{errors}</span>
                            <span className="text-sm">{t.common.errors}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-purple-400">
                        {Object.keys(matches).length} <span className="text-xl text-slate-500">/ {countries.length}</span>
                    </div>
                    <div className="text-sm font-bold text-purple-300/70 mt-1">
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
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                />
            </div>

            {gameState === 'won' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-3xl p-12 text-center"
                >
                    <div className="inline-flex p-4 rounded-full bg-purple-500/20 text-purple-300 mb-6">
                        <Check className="w-12 h-12" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">{content.congrats}</h3>
                    <p className="text-xl text-slate-300 mb-8">{content.winMsg}</p>

                    <div className="flex justify-center gap-8 mb-8">
                        <div className="flex flex-col items-center">
                            <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">{t.common.time}</span>
                            <span className="text-3xl font-black text-white">{formatTime(elapsedTime)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-400 uppercase tracking-widest text-xs font-bold">{t.common.errors}</span>
                            <span className="text-3xl font-black text-red-400">{errors}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setupGame(true)}
                        className="px-8 py-3 bg-white text-purple-900 font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw className="w-5 h-5" />
                        {content.playAgain}
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Countries (Drop Targets) */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                        <h3 className="col-span-full text-xl font-bold text-white/50 mb-2 uppercase tracking-wider text-center">{content.countriesTitle}</h3>
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
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-white/50 mb-4 uppercase tracking-wider text-center sticky top-4 bg-[#0f172a] z-10 py-2">
                            {content.capitalsTitle}
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sticky top-16">
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
            )}
        </div>
    );
}
