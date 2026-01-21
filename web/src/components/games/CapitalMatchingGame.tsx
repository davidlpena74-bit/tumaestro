'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw } from 'lucide-react';
import { EU_MEMBERS_LIST, EUROPE_CAPITALS } from './data/capitals-data'; // Adjust path as needed

type MatchItem = {
    country: string;
    capital: string;
    id: string;
};

// Shuffle helper
const shuffle = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function CapitalMatchingGame() {
    const [countries, setCountries] = useState<MatchItem[]>([]);
    const [capitals, setCapitals] = useState<MatchItem[]>([]);
    const [matches, setMatches] = useState<Record<string, string>>({}); // countryId -> capitalId
    const [completed, setCompleted] = useState(false);
    const [draggedId, setDraggedId] = useState<string | null>(null);

    // Initialize Game
    useEffect(() => {
        setupGame();
    }, []);

    const setupGame = () => {
        // 1. Get EU pairs
        const pairs: MatchItem[] = EU_MEMBERS_LIST.map((country, idx) => ({
            country,
            capital: EUROPE_CAPITALS[country] || 'Unknown',
            id: `pair-${idx}`
        }));

        // 2. Set Countries (Alphabetical usually best for finding)
        const sortedCountries = [...pairs].sort((a, b) => a.country.localeCompare(b.country));
        setCountries(sortedCountries);

        // 3. Set Capitals (Shuffled)
        setCapitals(shuffle([...pairs]));

        setMatches({});
        setCompleted(false);
    };

    const handleDragStart = (e: React.DragEvent, capitalId: string) => {
        e.dataTransfer.setData('capitalId', capitalId);
        setDraggedId(capitalId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Essential to allow dropping
    };

    const handleDrop = (e: React.DragEvent, targetCountryId: string) => {
        e.preventDefault();
        const capitalId = e.dataTransfer.getData('capitalId');
        setDraggedId(null);

        if (!capitalId) return;

        // Check if match is correct
        // Find the objects
        const countryObj = countries.find(c => c.id === targetCountryId);
        const capitalObj = capitals.find(c => c.id === capitalId);

        if (!countryObj || !capitalObj) return;

        // Correct Match? (They share the same ID in our logic because pair.id is unique per country-capital pair)
        if (countryObj.id === capitalObj.id) {
            // Success!
            const newMatches = { ...matches, [targetCountryId]: capitalId };
            setMatches(newMatches);

            // Check completion
            if (Object.keys(newMatches).length === EU_MEMBERS_LIST.length) {
                setCompleted(true);
            }
        } else {
            // Optional: Error feedback shake
            // For now, simpler: just bounce back (default behavior if not dropped)
            // Or visual indicator
            alert('¡Incorrecto! Esa no es la capital.');
        }
    };

    // Calculate progress
    const progress = (Object.keys(matches).length / EU_MEMBERS_LIST.length) * 100;

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
            {/* Header / Stats */}
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Unión Europea: Países y Capitales</h2>
                    <p className="text-slate-400">Arrastra la capital correcta a su país.</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-teal-400">
                        {Object.keys(matches).length} <span className="text-xl text-slate-500">/ {EU_MEMBERS_LIST.length}</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                />
            </div>

            {completed ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-teal-900/50 to-emerald-900/50 border border-teal-500/30 rounded-3xl p-12 text-center"
                >
                    <div className="inline-flex p-4 rounded-full bg-teal-500/20 text-teal-300 mb-6">
                        <Check className="w-12 h-12" />
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-4">¡Excelente!</h3>
                    <p className="text-xl text-slate-300 mb-8">Has completado el mapa político de la Unión Europea.</p>
                    <button
                        onClick={setupGame}
                        className="px-8 py-3 bg-white text-teal-900 font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Jugar de nuevo
                    </button>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                    {/* Left Column: Countries (Drop Targets) */}
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white/50 mb-4 uppercase tracking-wider text-center">Países</h3>
                        {countries.map((item) => {
                            const isMatched = !!matches[item.id];
                            return (
                                <div
                                    key={item.id}
                                    onDragOver={!isMatched ? handleDragOver : undefined}
                                    onDrop={!isMatched ? (e) => handleDrop(e, item.id) : undefined}
                                    className={`
                                        relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300
                                        ${isMatched
                                            ? 'bg-emerald-500/10 border-emerald-500/50'
                                            : 'bg-white/5 border-dashed border-white/10 hover:border-white/30'
                                        }
                                    `}
                                >
                                    <span className={`font-bold text-lg ${isMatched ? 'text-emerald-300' : 'text-white'}`}>
                                        {item.country}
                                    </span>

                                    {/* Drop Zone Indicator / Matched Content */}
                                    <div className={`
                                        h-10 px-4 rounded-lg flex items-center justify-center min-w-[120px] text-sm
                                        ${isMatched
                                            ? 'bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20'
                                            : 'bg-black/20 text-white/20'
                                        }
                                    `}>
                                        {isMatched ? item.capital : 'Arrastra aquí'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Capitals (Draggables) */}
                    <div>
                        <h3 className="text-xl font-bold text-white/50 mb-4 uppercase tracking-wider text-center sticky top-4 bg-[#0f172a] z-10 py-2">
                            Capitales Dispersas
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
                                        onDragStart={(e) => {
                                            // React.DragEvent is a generic wrapper, we need to cast or use native properties
                                            // e.dataTransfer is available on React.DragEvent
                                            handleDragStart(e as any, item.id);
                                        }}
                                        className="cursor-move p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-center border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 shadow-xl transition-all select-none"
                                    >
                                        {item.capital}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {capitals.filter(c => !Object.values(matches).includes(c.id)).length === 0 && !completed && (
                                <div className="col-span-2 text-center text-slate-500 py-12">
                                    ¡Todas las capitales asignadas!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
