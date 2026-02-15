'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, RefreshCw, Timer, MapPin, Trophy } from 'lucide-react';
import { EUROPE_LIST, EUROPE_CAPITALS, EUROPE_LIST_EN, EUROPE_CAPITALS_EN } from './data/capitals-data';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { speak } from '@/lib/speech-utils';

type MatchItem = {
    country: string;
    capital: string;
    id: string;
};

export default function EuropeCapitalsGame() {
    const { language, t } = useLanguage();

    // We'll use useGameLogic score/errors/timer, but handle gameState locally if needed or map it
    // Drag & Drop usually is "until finished", timer counts up or down? Original code counted UP.
    // Let's stick to standard behavior: Count DOWN from a generous time? Or stick to UP?
    // User requested "MARCADOR", which usually implies the same look (Timer counting down).
    // Let's give it 5 minutes (300s).
    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 300, penaltyTime: 0, gameMode });

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
                setGameState('finished');
                confettiEffect();
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

        const pairs: MatchItem[] = list.map((country, idx) => ({
            country,
            capital: capitalsData[country] || 'Unknown',
            id: `pair-${idx}`
        }));

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
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 relative select-none">

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
                targetName=""
                message={message}
                onReset={resetGame}
                colorTheme="purple"
                icon={<MapPin className="w-8 h-8 text-purple-400" />}
            />

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
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <button
                            onClick={() => startGame('challenge')}
                            className="group relative px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                        >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    {content.startBtn}
                                    <Timer className="w-5 h-5 opacity-50" />
                                </div>
                                <span className="text-xs opacity-70 font-bold tracking-wider">MODO RETO</span>
                            </span>
                        </button>

                        <button
                            onClick={() => startGame('practice')}
                            className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                        >
                            <span className="relative z-10 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    PRÁCTICA
                                    <Globe className="w-5 h-5 opacity-50" />
                                </div>
                                <span className="text-xs opacity-50 font-bold tracking-wider">SIN LÍMITE</span>
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {/* FINISHED OVERLAY */}
            {gameState === 'finished' && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl h-full">
                    <div className="bg-purple-500/10 p-4 rounded-full mb-6 ring-1 ring-purple-500/30">
                        <Globe className="w-16 h-16 text-yellow-400 animate-bounce" />
                    </div>
                    <h3 className="text-5xl font-black text-white mb-6">
                        {timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Juego Completado!'}
                    </h3>
                    <p className="text-2xl text-purple-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                    <button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-purple-500/20 transition-transform active:scale-95"
                    >
                        Jugar Otra Vez
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
    );
}
