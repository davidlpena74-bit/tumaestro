'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Calculator, Quotes, Translate, GlobeHemisphereWest, Atom, BookOpen, Funnel, CaretDown, Student } from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const subjects = [
    {
        id: 'matematicas',
        title: 'Matemáticas',
        description: 'Álgebra, geometría, cálculo y problemas lógicos.',
        href: '/recursos/matematicas',
        icon: Calculator,
        color: 'from-orange-500 to-amber-600',
        stat: '150+ Recursos',
        grades: ['Primaria', '3º Prim.', '5º Prim.', 'ESO']
    },
    {
        id: 'lengua',
        title: 'Lengua y Literatura',
        description: 'Gramática, sintaxis y análisis de textos clásicos.',
        href: '/recursos/lengua',
        icon: Quotes,
        color: 'from-violet-500 to-indigo-600',
        stat: '120+ Recursos',
        grades: ['Primaria', '5º Prim.', 'ESO']
    },
    {
        id: 'ingles',
        title: 'Languages (Inglés)',
        description: 'Vocabulario, listening y ejercicios de speaking.',
        href: '/recursos/ingles',
        icon: Translate,
        color: 'from-pink-500 to-rose-600',
        stat: '90+ Recursos',
        grades: ['Primaria', '5º Prim.', 'ESO', '1º ESO', '3º ESO']
    },
    {
        id: 'social-science',
        title: 'Social Science',
        description: 'Historia, Geografía y Mapas Interactivos del mundo.',
        href: '/recursos/geografia',
        icon: GlobeHemisphereWest,
        color: 'from-emerald-500 to-teal-600',
        stat: '85+ Recursos',
        grades: ['Primaria', '5º Prim.', 'ESO']
    },
    {
        id: 'natural-science',
        title: 'Natural Science',
        description: 'Biología, Geología, Física y Química.',
        href: '/recursos/fisica',
        icon: Atom,
        color: 'from-blue-500 to-cyan-600',
        stat: 'Nueva Sección',
        grades: ['ESO', '1º ESO', '3º ESO']
    }
];

export default function RecursosClient() {
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [filterOpen, setFilterOpen] = useState(false);

    // Get unique grades for filter
    const availableGrades = ['Primaria', '3º Prim.', '5º Prim.', 'ESO', '1º ESO', '3º ESO'].sort();

    const filteredSubjects = selectedGrade === 'all'
        ? subjects
        : subjects.filter(s => s.grades.includes(selectedGrade));

    return (
        <main className="min-h-screen text-white pt-32 pb-12 px-4 md:px-12 relative overflow-hidden">


            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white pb-2"
                    >
                        Recursos por Materia
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mt-2"
                    >
                        Accede a miles de apuntes, ejercicios resueltos y guías de estudio organizadas por nuestros mejores profesores.
                    </motion.p>

                    {/* GRADE FILTER DROPDOWN */}
                    <div className="mt-12 flex justify-center">
                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 pl-5 pr-4 py-3 rounded-2xl text-sm font-bold text-white transition-all shadow-sm min-w-[200px] backdrop-blur-md"
                            >
                                <Funnel className="w-4 h-4 text-teal-400" weight="bold" />
                                <span className="flex-grow text-left">
                                    {selectedGrade === 'all' ? 'Todos los Cursos' : selectedGrade}
                                </span>
                                <CaretDown className={`w-4 h-4 text-white transition-transform ${filterOpen ? 'rotate-180' : ''}`} weight="bold" />
                            </button>

                            <AnimatePresence>
                                {filterOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1 z-50 text-white backdrop-blur-xl"
                                    >
                                        <button
                                            onClick={() => { setSelectedGrade('all'); setFilterOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors",
                                                selectedGrade === 'all' && "bg-teal-500/20 text-teal-400"
                                            )}
                                        >
                                            Todos los Cursos
                                        </button>
                                        {availableGrades.map((grade) => (
                                            <button
                                                key={grade}
                                                onClick={() => { setSelectedGrade(grade); setFilterOpen(false); }}
                                                className={cn(
                                                    "w-full text-left px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors",
                                                    selectedGrade === grade && "bg-teal-500/20 text-teal-400"
                                                )}
                                            >
                                                {grade}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubjects.map((subject, idx) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                        >
                            <Link href={subject.href} className="group relative block h-full">
                                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
                                <div className={`h-full bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-3xl transition-all duration-300 group-hover:bg-white/30 group-hover:border-white/40 group-hover:translate-y-[-5px] overflow-hidden relative flex flex-col shadow-2xl`}>

                                    {/* Hover Glow */}
                                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${subject.color} opacity-[0.05] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300 p-3`}>
                                            <subject.icon className="w-10 h-10 text-white" weight="duotone" />
                                        </div>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 border border-white/5 uppercase tracking-wide">
                                            {subject.stat}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                        {subject.title}
                                    </h3>
                                    <p className="text-white mb-8 leading-relaxed text-sm flex-grow">
                                        {subject.description}
                                    </p>

                                    <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors mt-auto">
                                        VER RECURSOS <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}

                    {/* Coming Soon Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="relative h-full min-h-[250px] flex flex-col items-center justify-center bg-white/5 border border-white/5 border-dashed rounded-3xl p-8 text-center text-gray-500 group cursor-default backdrop-blur-sm"
                    >
                        <BookOpen className="w-10 h-10 mb-4 opacity-20 group-hover:opacity-40 transition-opacity" weight="duotone" />
                        <h3 className="text-lg font-bold mb-1">Más Materias</h3>
                        <p className="text-xs">Pronto añadiremos Economía, Biología y más.</p>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
