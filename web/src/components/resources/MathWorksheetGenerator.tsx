'use client';

import { useState, useRef } from 'react';
import { Download, RefreshCw, Printer, Settings } from 'lucide-react';

interface MathProblem {
    num1: number;
    num2: number;
    operator: string;
    answer: number;
}

export default function MathWorksheetGenerator() {
    const [operation, setOperation] = useState<string>('addition');
    const [difficulty, setDifficulty] = useState<number>(1);
    const [count, setCount] = useState<number>(20);
    const [problems, setProblems] = useState<MathProblem[]>([]);

    // Config
    const getSymbol = (op: string) => {
        switch (op) {
            case 'addition': return '+';
            case 'subtraction': return '-';
            case 'multiplication': return '×';
            case 'division': return '÷';
            default: return '+';
        }
    };

    const generate = () => {
        const newProblems: MathProblem[] = [];

        for (let i = 0; i < count; i++) {
            let num1 = 0, num2 = 0;
            const op = operation;

            // Difficulty Logic
            if (op === 'addition') {
                if (difficulty === 1) { num1 = r(10); num2 = r(10); }
                else if (difficulty === 2) { num1 = r(50); num2 = r(50); }
                else { num1 = r(100); num2 = r(100); }
            } else if (op === 'subtraction') {
                if (difficulty === 1) { num1 = r(10); num2 = r(num1); } // No negatives
                else { num1 = r(50); num2 = r(num1); }
            } else if (op === 'multiplication') {
                if (difficulty === 1) { num1 = r(5) + 1; num2 = r(5) + 1; }
                else { num1 = r(10) + 1; num2 = r(10) + 1; }
            } else if (op === 'division') {
                // Ensure clean division
                const divisor = r(9) + 2;
                const quotient = r(9) + 1;
                num1 = divisor * quotient;
                num2 = divisor;
            }

            let answer = 0;
            if (op === 'addition') answer = num1 + num2;
            if (op === 'subtraction') answer = num1 - num2;
            if (op === 'multiplication') answer = num1 * num2;
            if (op === 'division') answer = num1 / num2;

            newProblems.push({ num1, num2, operator: getSymbol(op), answer });
        }
        setProblems(newProblems);
    };

    const r = (max: number) => Math.floor(Math.random() * max) + 1;

    // Initial generate
    if (problems.length === 0) generate();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full">
            {/* Controls - Hide on Print */}
            <div className="print:hidden bg-slate-800 p-6 rounded-2xl mb-8 border border-white/10 shadow-xl">
                <div className="flex items-center gap-2 mb-6 text-blue-400">
                    <Settings className="w-5 h-5" />
                    <h2 className="font-bold uppercase tracking-wider text-sm">Configurar Generador</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Operación</label>
                        <select
                            value={operation}
                            onChange={(e) => { setOperation(e.target.value); setTimeout(generate, 0); }}
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="addition">Suma</option>
                            <option value="subtraction">Resta</option>
                            <option value="multiplication">Multiplicación</option>
                            <option value="division">División</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Dificultad</label>
                        <select
                            value={difficulty}
                            onChange={(e) => { setDifficulty(Number(e.target.value)); setTimeout(generate, 0); }}
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value={1}>Nivel 1 (Básico)</option>
                            <option value={2}>Nivel 2 (Intermedio)</option>
                            <option value={3}>Nivel 3 (Avanzado)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Cantidad</label>
                        <select
                            value={count}
                            onChange={(e) => { setCount(Number(e.target.value)); setTimeout(generate, 0); }}
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value={10}>10 Ejercicios</option>
                            <option value={20}>20 Ejercicios</option>
                            <option value={50}>50 Ejercicios (Hoja completa)</option>
                        </select>
                    </div>

                    <div className="flex items-end gap-2">
                        <button
                            onClick={generate}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            <RefreshCw className="w-5 h-5" /> Regenerar
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-white text-slate-900 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            <Printer className="w-5 h-5" /> Imprimir
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Sheet */}
            <div className="bg-white text-black p-8 md:p-12 min-h-[800px] shadow-2xl mx-auto max-w-[210mm] relative print:shadow-none print:w-full print:max-w-none print:p-0">
                <div className="flex justify-between items-end border-b-2 border-black pb-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">Ficha de Matemáticas</h1>
                        <p className="text-gray-500">TuMaestro.es • {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">Nombre:</p>
                        <div className="w-64 border-b border-gray-300 mt-6"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-16">
                    {problems.map((p, i) => (
                        <div key={i} className="flex items-center text-3xl font-mono">
                            <span className="w-8 text-sm text-gray-400 font-sans mr-4">{i + 1}.</span>
                            <span className="w-16 text-right">{p.num1}</span>
                            <span className="mx-4 font-bold text-gray-600">{p.operator}</span>
                            <span className="w-16 text-right">{p.num2}</span>
                            <span className="mx-4">=</span>
                            <span className="flex-1 border-b-2 border-gray-300 min-w-[100px] h-8"></span>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-4 right-8 text-xs text-gray-300 print:text-gray-400">
                    Generado automáticamente por TuMaestro.es
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print\\:block, .print\\:block * {
                        visibility: visible;
                    }
                    main {
                        padding: 0;
                        background: white;
                    }
                    /* Hide everything else */
                    nav, footer, .bg-slate-950 {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
