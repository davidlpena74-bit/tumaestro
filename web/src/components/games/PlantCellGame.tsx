'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    CheckCircle,
    HandGrabbing,
    ArrowCounterClockwise,
    Dna
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';
import { useGameLogic } from '@/hooks/useGameLogic';

type CellPart = {
    id: string;
    nameKey: string;
    x: number;
    y: number;
    lx: number; // Label X when matched
    ly: number; // Label Y when matched
};

// Initial calibrated coordinates for Plant Cell
const PLANT_CELL_PARTS: CellPart[] = [
    {
        "id": "nucleus",
        "nameKey": "nucleus",
        "x": 440,
        "y": 409,
        "lx": 750,
        "ly": 468
    },
    {
        "id": "nucleolus",
        "nameKey": "nucleolus",
        "x": 475,
        "y": 431,
        "lx": 750,
        "ly": 300
    },
    {
        "id": "mitochondria",
        "nameKey": "mitochondria",
        "x": 324,
        "y": 248,
        "lx": 750,
        "ly": 700
    },
    {
        "id": "golgi",
        "nameKey": "golgi",
        "x": 457,
        "y": 561,
        "lx": 750,
        "ly": 645
    },
    {
        "id": "reticulum",
        "nameKey": "reticulum",
        "x": 553,
        "y": 501,
        "lx": 750,
        "ly": 555
    },
    {
        "id": "chloroplast",
        "nameKey": "chloroplast",
        "x": 192,
        "y": 468,
        "lx": 750,
        "ly": 310
    },
    {
        "id": "vacuole",
        "nameKey": "vacuole",
        "x": 325,
        "y": 392,
        "lx": 750,
        "ly": 435
    },
    {
        "id": "cellWall",
        "nameKey": "cellWall",
        "x": 261,
        "y": 206,
        "lx": 750,
        "ly": 840
    },
    {
        "id": "membrane",
        "nameKey": "membrane",
        "x": 180,
        "y": 369,
        "lx": 750,
        "ly": 795
    },
    {
        "id": "cytoplasm",
        "nameKey": "cytoplasm",
        "x": 216,
        "y": 396,
        "lx": 750,
        "ly": 565
    }
];

export default function PlantCellGame({ taskId = null, activityId }: { taskId?: string | null, activityId?: string }) {
    const { t, language } = useLanguage();
    const [matches, setMatches] = useState<Record<string, string>>({}); // labelId -> partId
    const [dragState, setDragState] = useState<{
        active: boolean;
        startId: string | null;
        startType: 'label' | 'point' | null;
        startX: number;
        startY: number;
        currX: number;
        currY: number;
    }>({
        active: false,
        startId: null,
        startType: null,
        startX: 0,
        startY: 0,
        currX: 0,
        currY: 0
    });

    const diagramRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const effectiveActivityId = activityId || "celula-vegetal";

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

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setMatches({});
        setDragState({
            active: false,
            startId: null,
            startType: null,
            startX: 0,
            startY: 0,
            currX: 0,
            currY: 0
        });
    };

    const labelPositions = React.useMemo(() => {
        const sortedByY = [...PLANT_CELL_PARTS].sort((a, b) => a.y - b.y);
        const unmatchedSorted = PLANT_CELL_PARTS
            .filter(p => !matches[p.id])
            .sort((a, b) => {
                const nameA = (t.gamesPage.cellParts as any)[a.nameKey] || '';
                const nameB = (t.gamesPage.cellParts as any)[b.nameKey] || '';
                return nameA.localeCompare(nameB, language);
            });

        return PLANT_CELL_PARTS.map((part) => {
            const isMatched = !!matches[part.id];
            const yOrderIndex = sortedByY.findIndex(p => p.id === part.id);
            const unmatchedIndex = unmatchedSorted.findIndex(p => p.id === part.id);

            return {
                ...part,
                labelX: isMatched ? 750 : -150,
                labelY: 100 + ((isMatched ? yOrderIndex : unmatchedIndex) * 75)
            };
        });
    }, [matches, t, language]);

    const finishGame = () => {
        setGameState('finished');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4ade80', '#3b82f6', '#ffffff']
        });
    };

    const getSVGCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const CTM = svgRef.current.getScreenCTM();
        if (!CTM) return { x: 0, y: 0 };

        let clientX, clientY;
        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = (event as React.MouseEvent).clientX;
            clientY = (event as React.MouseEvent).clientY;
        }

        return {
            x: (clientX - CTM.e) / CTM.a,
            y: (clientY - CTM.f) / CTM.d
        };
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string, type: 'label' | 'point', x: number, y: number) => {
        if (gameState !== 'playing') return;
        if (type === 'label' && matches[id]) return;
        if (type === 'point' && Object.values(matches).includes(id)) return;

        e.stopPropagation();
        const { x: svgX, y: svgY } = getSVGCoordinates(e);

        setDragState({
            active: true,
            startId: id,
            startType: type,
            startX: type === 'point' ? x : (x < 400 ? x + 200 : x),
            startY: type === 'point' ? y : (y + 30),
            currX: svgX,
            currY: svgY
        });
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!dragState.active) return;
        const { x, y } = getSVGCoordinates(e);
        setDragState(prev => ({ ...prev, currX: x, currY: y }));
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent, droppedId?: string, droppedType?: 'label' | 'point') => {
        if (!dragState.active) return;

        if (droppedId && droppedType && droppedType !== dragState.startType) {
            const labelId = dragState.startType === 'label' ? dragState.startId : droppedId;
            const partId = dragState.startType === 'point' ? dragState.startId : droppedId;

            if (labelId === partId) {
                const newMatches = { ...matches, [labelId!]: partId! };
                setMatches(newMatches);
                addScore(100);
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.6 },
                    colors: ['#34d399', '#ffffff']
                });
                if (Object.keys(newMatches).length === PLANT_CELL_PARTS.length) {
                    handleFinish();
                }
            } else {
                addError();
                addScore(gameMode === 'challenge' ? -20 : -5);
            }
        }

        setDragState(prev => ({ ...prev, active: false, startId: null, startType: null }));
    };

    return (
        <div className="w-full px-4 md:px-8 pb-4 md:pb-8 pt-0 select-none">
            <GameHUD
                title={t.gamesPage.gameTitles.plantCell}
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={PLANT_CELL_PARTS.length}
                remainingTargets={PLANT_CELL_PARTS.length - Object.keys(matches).length}
                targetName=""
                onReset={() => setGameState('start')}
                colorTheme="blue"
                message={message}
                icon={<Dna className="w-8 h-8 text-blue-400" weight="duotone" />}
                activityId={effectiveActivityId}
            />

            <div className="w-full">
                <div
                    ref={diagramRef}
                    className="w-full bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[850px] overflow-hidden cursor-crosshair select-none shadow-2xl"
                >
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <HandGrabbing className="w-16 h-16 text-blue-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">La Célula Vegetal</h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed font-medium">
                                {t.gamesPage.gameTitles.plantCellDesc}. Arrastra cada etiqueta para conectarla con su ubicación correspondiente en el modelo interactivo.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button
                                    onClick={() => startGame('challenge')}
                                    className="group relative px-4 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1 flex-1 max-w-[180px]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                                        MODO RETO <Trophy className="w-5 h-5 opacity-50" />
                                    </span>
                                </button>

                                <button
                                    onClick={() => startGame('practice')}
                                    className="group relative px-4 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] hover:-translate-y-1 flex-1 max-w-[180px]"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                                        PRÁCTICA <ArrowCounterClockwise className="w-5 h-5 opacity-50" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {gameState === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]"
                            >
                                <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Trophy className="w-16 h-16 text-red-500 animate-pulse" />
                                    ) : (
                                        <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Reto Completado!'}
                                </h2>

                                <div className="flex gap-12 mb-8 mt-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Tiempo</span>
                                        <span className="text-4xl font-black text-white">{elapsedTime}s</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Errores</span>
                                        <span className="text-4xl font-black text-red-500">{errors}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
                                    <div className="space-y-4">
                                        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 p-1">
                                            <RatingSystem activityId={effectiveActivityId} />
                                        </div>
                                        <button
                                            onClick={() => setGameState('start')}
                                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20"
                                        >
                                            <ArrowCounterClockwise className="w-5 h-5" /> Jugar de nuevo
                                        </button>
                                    </div>

                                    <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 p-6 overflow-hidden">
                                        <ActivityRanking activityId={effectiveActivityId} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* IMAGE CONTAINER (Template consistency) */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <div className="relative w-[675px] h-full overflow-hidden -translate-y-10">
                            <img
                                src="/images/games/plant-cell-hq.png"
                                alt="Plant Cell Anatomy"
                                className="object-contain w-full h-full p-12"
                            />
                        </div>
                    </div>

                    <svg
                        ref={svgRef}
                        viewBox="-200 0 1200 1000"
                        className="absolute inset-0 w-full h-full z-20"
                        onMouseMove={handleDragMove}
                        onTouchMove={handleDragMove}
                        onMouseUp={(e) => handleDragEnd(e)}
                        onTouchEnd={(e) => handleDragEnd(e)}
                        onMouseLeave={(e) => handleDragEnd(e)}
                    >
                        {Object.entries(matches).map(([labelId, partId]) => {
                            const part = PLANT_CELL_PARTS.find(p => p.id === partId);
                            const label = labelPositions.find(p => p.id === labelId);
                            if (!part || !label) return null;

                            return (
                                <motion.line
                                    key={`line-${labelId}-${partId}`}
                                    x1={label.labelX < 400 ? label.labelX + 200 : label.labelX}
                                    y1={label.labelY + 30}
                                    x2={part.x}
                                    y2={part.y}
                                    stroke="#10b981"
                                    strokeWidth="4"
                                    className="pointer-events-none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}

                        {dragState.active && (
                            <line
                                x1={dragState.startX}
                                y1={dragState.startY}
                                x2={dragState.currX}
                                y2={dragState.currY}
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeDasharray="8 4"
                                className="animate-pulse pointer-events-none"
                            />
                        )}

                        {labelPositions.map((item) => (
                            <foreignObject
                                key={`label-${item.id}`}
                                x={item.labelX}
                                y={item.labelY}
                                width="200"
                                height="60"
                                className="overflow-visible"
                            >
                                <div
                                    onMouseDown={(e) => handleDragStart(e, item.id, 'label', item.labelX, item.labelY)}
                                    onTouchStart={(e) => handleDragStart(e, item.id, 'label', item.labelX, item.labelY)}
                                    onMouseUp={(e) => handleDragEnd(e, item.id, 'label')}
                                    onTouchEnd={(e) => handleDragEnd(e, item.id, 'label')}
                                    className={`
                                        w-full h-full rounded-xl flex items-center justify-center px-4 text-center cursor-grab active:cursor-grabbing transition-all duration-300 shadow-xl border
                                        ${matches[item.id]
                                            ? 'bg-transparent border-emerald-500/50 text-slate-700 pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                            : 'bg-slate-800/90 border-white/20 hover:border-blue-500/50 hover:bg-slate-800 text-white'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold uppercase tracking-wide ${matches[item.id] ? 'text-slate-900' : 'text-white'}`}>
                                            {(t.gamesPage.cellParts as any)[item.nameKey]}
                                        </span>
                                    </div>
                                </div>
                                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 ${item.labelX < 400 ? '-right-1.5' : '-left-1.5'} ${matches[item.id] ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900'}`} />
                            </foreignObject>
                        ))}

                        {PLANT_CELL_PARTS.map((part) => (
                            <g
                                key={`point-${part.id}`}
                                onMouseDown={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onTouchStart={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onMouseUp={(e) => handleDragEnd(e, part.id, 'point')}
                                onTouchEnd={(e) => handleDragEnd(e, part.id, 'point')}
                                className="cursor-pointer"
                            >
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="16"
                                    className={`
                                         transition-all duration-300
                                         ${Object.values(matches).includes(part.id)
                                            ? 'fill-emerald-500 stroke-emerald-400'
                                            : 'fill-white/10 stroke-white/30 hover:fill-blue-500/30 hover:stroke-blue-400 hover:r-20'
                                        }
                                     `}
                                    strokeWidth="3"
                                />
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="6"
                                    fill={Object.values(matches).includes(part.id) ? '#ffffff' : '#3b82f6'}
                                />
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}
