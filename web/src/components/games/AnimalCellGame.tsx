'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    Timer,
    RefreshCw,
    X,
    Info
} from 'lucide-react';
import { Dna } from '@phosphor-icons/react';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';

type CellPart = {
    id: string;
    nameKey: string;
    x: number;
    y: number;
    color: string;
};

export default function AnimalCellGame() {
    const { t } = useLanguage();
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');
    const [matches, setMatches] = useState<string[]>([]);
    const [errors, setErrors] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [activeDragId, setActiveDragId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Crucial: This ref will be the coordinate origin for everything
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const [boxCoords, setBoxCoords] = useState<Record<string, { x: number, y: number }>>({});

    // Calibrated coordinates for the new 3D Cell Model
    const CELL_PARTS: CellPart[] = [
        { id: 'nucleus', nameKey: 'nucleus', x: 520, y: 280, color: '#9f1239' }, // Large purple/red nucleus
        { id: 'nucleolus', nameKey: 'nucleolus', x: 520, y: 280, color: '#4c0519' }, // Center of nucleus
        { id: 'mitochondria', nameKey: 'mitochondria', x: 230, y: 240, color: '#ea580c' }, // Orange structure left
        { id: 'golgi', nameKey: 'golgi', x: 650, y: 400, color: '#eab308' }, // Yellow folded structure right-bottom
        { id: 'reticulum', nameKey: 'reticulum', x: 420, y: 180, color: '#3b82f6' }, // Blue structure top/around
        { id: 'cytoplasm', nameKey: 'cytoplasm', x: 200, y: 450, color: '#60a5fa' }, // General fluid area
        { id: 'membrane', nameKey: 'membrane', x: 120, y: 300, color: '#2dd4bf' }, // Outer edge
        { id: 'lysosome', nameKey: 'lysosome', x: 680, y: 250, color: '#a855f7' }, // Small purple spheres
        { id: 'ribosome', nameKey: 'ribosome', x: 340, y: 140, color: '#f472b6' }, // Small dots
        { id: 'centrioles', nameKey: 'centrioles', x: 550, y: 120, color: '#fb7185' }, // Near top
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing' && startTime) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, startTime]);

    // Recalculate all coordinates relative to gameAreaRef
    const updateMeasurements = () => {
        if (!gameAreaRef.current) return;
        const areaRect = gameAreaRef.current.getBoundingClientRect();
        const newBoxCoords: Record<string, { x: number, y: number }> = {};

        CELL_PARTS.forEach(part => {
            const el = document.getElementById(`box-${part.id}`);
            if (el) {
                const rect = el.getBoundingClientRect();
                // We want the right-center point of the box
                newBoxCoords[part.id] = {
                    x: rect.right - areaRect.left,
                    y: (rect.top + rect.bottom) / 2 - areaRect.top
                };
            }
        });
        setBoxCoords(newBoxCoords);
    };

    useLayoutEffect(() => {
        updateMeasurements();
        window.addEventListener('resize', updateMeasurements);
        window.addEventListener('scroll', updateMeasurements);
        return () => {
            window.removeEventListener('resize', updateMeasurements);
            window.removeEventListener('scroll', updateMeasurements);
        };
    }, [gameState, matches]);

    const startGame = () => {
        setGameState('playing');
        setStartTime(Date.now());
        setMatches([]);
        setErrors(0);
        setElapsedTime(0);
        // Small delay to ensure DOM is ready for measurement
        setTimeout(updateMeasurements, 50);
    };

    const handleStartDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
        if (gameState !== 'playing' || matches.includes(id)) return;
        setActiveDragId(id);
        updateMousePos(e);
    };

    const updateMousePos = (e: React.MouseEvent | React.TouchEvent) => {
        if (!gameAreaRef.current) return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        setMousePos({
            x: clientX - rect.left,
            y: clientY - rect.top
        });
    };

    const handleEndDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!activeDragId || !svgRef.current) return;

        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as React.MouseEvent).clientY;

        const svgRect = svgRef.current.getBoundingClientRect();
        const relX = clientX - svgRect.left;
        const relY = clientY - svgRect.top;

        // Convert screen pixels to SVG viewBox units (800x600)
        const vx = (relX / svgRect.width) * 800;
        const vy = (relY / svgRect.height) * 600;

        const target = CELL_PARTS.find(p => p.id === activeDragId);
        if (target) {
            const dist = Math.sqrt(Math.pow(vx - target.x, 2) + Math.pow(vy - target.y, 2));
            if (dist < 50) { // Tolerance circle
                const newMatches = [...matches, activeDragId];
                setMatches(newMatches);
                if (newMatches.length === CELL_PARTS.length) {
                    setGameState('won');
                }
            } else {
                setErrors(prev => prev + 1);
            }
        }
        setActiveDragId(null);
    };

    // Calculate the target point in screen-relative coordinates (within gameArea)
    const getTargetPoint = (part: CellPart) => {
        if (!svgRef.current || !gameAreaRef.current) return { x: 0, y: 0 };
        const areaRect = gameAreaRef.current.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();

        return {
            x: (svgRect.left - areaRect.left) + (part.x / 800) * svgRect.width,
            y: (svgRect.top - areaRect.top) + (part.y / 600) * svgRect.height
        };
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 md:pb-8 pt-0 min-h-screen select-none">
            {/* Header */}
            <GameHUD
                title={t.gamesPage.gameTitles.animalCell}
                score={matches.length * 100}
                errors={errors}
                timeLeft={elapsedTime}
                totalTargets={CELL_PARTS.length}
                remainingTargets={CELL_PARTS.length - matches.length}
                targetName=""
                onReset={startGame}
                colorTheme="blue"
                message={gameState === 'won' ? t.common.victoryMessage : undefined}
                icon={<Dna className="w-8 h-8 text-blue-400" weight="duotone" />}
            />

            {/* Main Game Area */}
            <div
                ref={gameAreaRef}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative touch-none min-h-[700px]"
                onMouseMove={updateMousePos}
                onTouchMove={updateMousePos}
                onMouseUp={handleEndDrag}
                onTouchEnd={handleEndDrag}
            >
                {/* Connection Lines Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 pointer-events-none overflow-visible">
                    {/* Active Drag Line */}
                    {activeDragId && boxCoords[activeDragId] && (
                        <line
                            x1={boxCoords[activeDragId].x}
                            y1={boxCoords[activeDragId].y}
                            x2={mousePos.x}
                            y2={mousePos.y}
                            stroke="#fff"
                            strokeWidth="3"
                            strokeDasharray="8 6"
                            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                        />
                    )}

                    {/* Matched Lines */}
                    {matches.map(id => {
                        const part = CELL_PARTS.find(p => p.id === id);
                        const start = boxCoords[id];
                        if (!part || !start) return null;
                        const end = getTargetPoint(part);

                        return (
                            <motion.line
                                key={`fixed-line-${id}`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke={part.color}
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>

                {/* Sidebar Boxes */}
                <div className="lg:col-span-3 space-y-3 z-40 bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                        <Info className="w-4 h-4 text-emerald-400" /> Arrastra a la célula
                    </h3>
                    <div className="flex flex-col gap-2.5">
                        {CELL_PARTS.map((part) => (
                            <div
                                key={part.id}
                                id={`box-${part.id}`}
                                onMouseDown={(e) => handleStartDrag(part.id, e)}
                                onTouchStart={(e) => handleStartDrag(part.id, e)}
                                className={`
                                    p-4 rounded-2xl font-bold flex items-center justify-between transition-all duration-300 relative
                                    ${matches.includes(part.id)
                                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 opacity-50 grayscale-[0.5]'
                                        : activeDragId === part.id
                                            ? 'bg-white text-slate-900 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] z-50 ring-2 ring-emerald-400'
                                            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-grab active:cursor-grabbing hover:border-emerald-500/30'
                                    }
                                `}
                            >
                                <span className="text-[15px]">{(t.gamesPage.cellParts as any)[part.nameKey]}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${matches.includes(part.id) ? 'bg-emerald-400 border-white' : 'bg-transparent border-white/20'}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diagram Area */}
                <div className="lg:col-span-9 bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[500px] shadow-2xl">

                    <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                            <img
                                src="/images/games/animal-cell-hq.png"
                                alt="3D Animal Cell Anatomy"
                                className="object-contain max-h-[550px]"
                            />
                        </div>

                        <svg ref={svgRef} viewBox="0 0 800 600" className="w-full h-full absolute inset-0 z-20 overflow-visible">
                            {/* Connection Nodes over the image */}
                            {CELL_PARTS.map((part) => (
                                <g key={`node-${part.id}`}>
                                    <circle
                                        cx={part.x}
                                        cy={part.y}
                                        r={matches.includes(part.id) ? 12 : 18}
                                        fill={matches.includes(part.id) ? part.color : "rgba(255,255,255,0.08)"}
                                        stroke={activeDragId === part.id ? "#fff" : "rgba(255,255,255,0.2)"}
                                        strokeWidth={activeDragId === part.id ? 4 : 2}
                                        className="transition-all duration-300 backdrop-blur-sm"
                                    />
                                    <circle cx={part.x} cy={part.y} r="6" fill="#fff" opacity="0.5" />
                                    {activeDragId === part.id && (
                                        <circle cx={part.x} cy={part.y} r="30" fill="none" stroke="#fff" opacity="0.4" className="animate-ping" />
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* START OVERLAY - Unified with Map style */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[3rem]">
                        <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                            <Dna className="w-12 h-12 text-blue-400" weight="duotone" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">La Célula Animal</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            Un reto de precisión. Conecta cada orgánulo con su nombre trazando una línea.
                        </p>
                        <button
                            onClick={startGame}
                            className="group relative px-8 py-4 bg-blue-500 hover:bg-blue-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Check className="w-5 h-5 opacity-50" /></span>
                        </button>
                    </div>
                )}

                {/* WON OVERLAY - Unified with Map style */}
                <AnimatePresence>
                    {gameState === 'won' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[3rem]"
                        >
                            <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <Check className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>

                            <div className="flex gap-12 mb-8 mt-4">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Tiempo</span>
                                    <span className="text-4xl font-black text-white">{formatTime(elapsedTime)}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Errores</span>
                                    <span className="text-4xl font-black text-red-500">{errors}</span>
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
