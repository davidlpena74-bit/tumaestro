'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    CheckCircle,
    HandGrabbing,
    ArrowCounterClockwise,
    Plant
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';

type CellPart = {
    id: string;
    nameKey: string;
    x: number;
    y: number;
    lx: number; // Label X when matched
    ly: number; // Label Y when matched
};

// Initial coordinates for Plant Cell (Estimated, will needs calibration)
const CELL_PARTS: CellPart[] = [
    { id: 'cellWall', nameKey: 'cellWall', x: 236, y: 198, lx: 700, ly: 190 },
    { id: 'vacuole', nameKey: 'vacuole', x: 414, y: 457, lx: 700, ly: 457 },
    { id: 'chloroplast', nameKey: 'chloroplast', x: 509, y: 254, lx: 700, ly: 254 },
    { id: 'nucleus', nameKey: 'nucleus', x: 620, y: 468, lx: 700, ly: 468 },
    { id: 'mitochondria', nameKey: 'mitochondria', x: 237, y: 416, lx: 700, ly: 416 },
    { id: 'cytoplasm', nameKey: 'cytoplasm', x: 504, y: 651, lx: 700, ly: 651 },
    { id: 'golgi', nameKey: 'golgi', x: 580, y: 350, lx: 700, ly: 350 },
    { id: 'membrane', nameKey: 'membrane', x: 271, y: 736, lx: 700, ly: 736 },
];

export default function PlantCellGame() {
    const { t, language } = useLanguage();
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
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
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState(0);
    const [calibrationIndex, setCalibrationIndex] = useState(-1);
    const [calibratedResults, setCalibratedResults] = useState<any[]>([]);
    const diagramRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const calibrationSequence = CELL_PARTS.map(p => p.id);

    const startCalibration = () => {
        setCalibrationIndex(0);
        setCalibratedResults([]);
        setMatches({});
    };

    const handleDebugClick = (e: React.MouseEvent) => {
        if (calibrationIndex === -1) return;

        const { x, y } = getSVGCoordinates(e);
        const partId = calibrationSequence[calibrationIndex];
        const part = CELL_PARTS.find(p => p.id === partId);

        const newResult = {
            id: partId,
            nameKey: part?.nameKey,
            x: Math.round(x),
            y: Math.round(y),
            lx: 700,
            ly: Math.round(y)
        };

        const newResults = [...calibratedResults, newResult];
        setCalibratedResults(newResults);

        if (calibrationIndex < calibrationSequence.length - 1) {
            setCalibrationIndex(prev => prev + 1);
        } else {
            console.log("FINAL CALIBRATION:", JSON.stringify(newResults, null, 2));
            setCalibrationIndex(-1);
        }
    };

    const labelPositions = React.useMemo(() => {
        const sortedByY = [...CELL_PARTS].sort((a, b) => a.y - b.y);
        const unmatchedSorted = CELL_PARTS
            .filter(p => !matches[p.id])
            .sort((a, b) => {
                const nameA = (t.gamesPage.cellParts as any)[a.nameKey] || '';
                const nameB = (t.gamesPage.cellParts as any)[b.nameKey] || '';
                return nameA.localeCompare(nameB, language);
            });

        return CELL_PARTS.map((part) => {
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

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && !gameOver) {
            interval = setInterval(() => setTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameOver]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setMatches({});
        setErrors(0);
        setTime(0);
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

    const finishGame = () => {
        setGameOver(true);
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
        if (!gameStarted || gameOver) return;
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
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.6 },
                    colors: ['#34d399', '#ffffff']
                });
                if (Object.keys(newMatches).length === CELL_PARTS.length) {
                    finishGame();
                }
            } else {
                setErrors(prev => prev + 1);
            }
        }

        setDragState(prev => ({ ...prev, active: false, startId: null, startType: null }));
    };

    return (
        <div className="w-full px-4 md:px-8 pb-4 md:pb-8 pt-0 select-none">
            <GameHUD
                title={t.gamesPage.gameTitles.plantCell}
                score={Object.keys(matches).length * 100}
                errors={errors}
                timeLeft={time}
                totalTargets={CELL_PARTS.length}
                remainingTargets={CELL_PARTS.length - Object.keys(matches).length}
                targetName=""
                onReset={startGame}
                colorTheme="emerald"
                message={gameOver ? t.common.victoryMessage : undefined}
                icon={<Plant className="w-8 h-8 text-emerald-400" weight="duotone" />}
            />

            <div className="w-full text-white/50 text-[10px] mb-2 uppercase font-black tracking-widest text-center opacity-30">
                Modelo 3D Alta Fidelidad
            </div>

            <div className="w-full">
                <div
                    ref={diagramRef}
                    onClick={handleDebugClick}
                    className="w-full bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[850px] overflow-hidden cursor-crosshair select-none shadow-2xl"
                >
                    {/* Calibration Prompt */}
                    {calibrationIndex !== -1 && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce">
                            Haz clic en: {(t.gamesPage.cellParts as any)[calibrationSequence[calibrationIndex]]}
                        </div>
                    )}

                    {/* Calibration Results Dialog */}
                    {calibrationIndex === -1 && calibratedResults.length > 0 && (
                        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">Calibración Finalizada</h3>
                            <pre className="bg-slate-800 p-6 rounded-xl text-xs text-blue-300 overflow-auto max-h-[400px] w-full max-w-2xl select-all">
                                {JSON.stringify(calibratedResults, null, 2)}
                            </pre>
                            <button
                                onClick={() => setCalibratedResults([])}
                                className="mt-8 px-8 py-3 bg-white text-slate-900 font-bold rounded-xl"
                            >
                                Cerrar y Probar
                            </button>
                        </div>
                    )}

                    {!gameStarted && !gameOver && calibrationIndex === -1 && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-emerald-500/10 p-6 rounded-full mb-6 ring-1 ring-emerald-500/30">
                                <HandGrabbing className="w-16 h-16 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{t.gamesPage.gameTitles.plantCell}</h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed font-medium">
                                {t.gamesPage.gameTitles.plantCellDesc} Arrastra cada etiqueta para conectarla con su ubicación correspondiente.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={startGame}
                                    className="group relative px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-xl rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] hover:-translate-y-1"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        EMPEZAR RETO <ArrowCounterClockwise className="w-6 h-6 opacity-50" />
                                    </span>
                                </button>
                                <button
                                    onClick={startCalibration}
                                    className="px-6 py-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl transition-all border border-white/10"
                                >
                                    CALIBRAR PUNTOS
                                </button>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {gameOver && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]"
                            >
                                <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-1 ring-emerald-500/30">
                                    <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2 text-shadow-glow">¡Reto Completado!</h2>

                                <div className="flex gap-12 mb-8 mt-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-montserrat">Tiempo</span>
                                        <span className="text-4xl font-black text-white">{time}s</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-montserrat">Errores</span>
                                        <span className="text-4xl font-black text-red-500">{errors}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                                >
                                    <ArrowCounterClockwise className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-[700px] h-full overflow-hidden -translate-y-10"
                        >
                            <img
                                src="/images/games/plant-cell-3d.png"
                                alt="Plant Cell Anatomy"
                                className="object-contain w-full h-full p-4 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                            />
                        </motion.div>
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
                            const part = CELL_PARTS.find(p => p.id === partId);
                            const label = labelPositions.find(p => p.id === labelId);
                            if (!part || !label) return null;

                            return (
                                <motion.line
                                    key={`line-${labelId}-${partId}`}
                                    x1={label.labelX < 400 ? label.labelX + 200 : label.labelX}
                                    y1={label.labelY + 30}
                                    x2={part.x}
                                    y2={part.y}
                                    stroke="#34d399"
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
                                stroke="#10b981"
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
                                            : 'bg-slate-800/90 border-white/20 hover:border-emerald-500/50 hover:bg-slate-800 text-white'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold uppercase tracking-wide ${matches[item.id] ? 'text-slate-700' : 'text-white'}`}>
                                            {(t.gamesPage.cellParts as any)[item.nameKey]}
                                        </span>
                                    </div>
                                </div>
                                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 ${item.labelX < 400 ? '-right-1.5' : '-left-1.5'} ${matches[item.id] ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900'}`} />
                            </foreignObject>
                        ))}

                        {CELL_PARTS.map((part) => (
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
                                    r="18"
                                    className={`
                                         transition-all duration-300
                                         ${Object.values(matches).includes(part.id)
                                            ? 'fill-emerald-500 stroke-emerald-400'
                                            : 'fill-white/10 stroke-white/30 hover:fill-emerald-500/30 hover:stroke-emerald-400 hover:r-22'
                                        }
                                     `}
                                    strokeWidth="3"
                                />
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="7"
                                    fill={Object.values(matches).includes(part.id) ? '#ffffff' : '#34d399'}
                                />
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}

