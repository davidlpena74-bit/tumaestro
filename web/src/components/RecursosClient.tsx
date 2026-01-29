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
        id: 'dictados',
        title: 'Dictados Interactivos',
        description: 'Mejora tu ortografía escuchando y escribiendo.',
        href: '/recursos/dictados',
        icon: Student,
        color: 'from-fuchsia-100 to-purple-200',
        stat: 'Herramienta Online',
        grades: ['Primaria', '3º Prim.', '5º Prim.', 'ESO']
    },
    {
        id: 'cuentacuentos',
        title: 'El Cuenta Cuentos',
        description: 'Lectura inmersiva y narración mágica de libros clásicos.',
        href: '/recursos/cuentacuentos',
        icon: BookOpen,
        color: 'from-amber-100 to-orange-200',
        stat: 'Nueva Herramienta',
        grades: ['Infantil', 'Primaria', 'ESO']
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
        <main className="min-h-screen pt-32 pb-12 px-4 md:px-12 relative overflow-hidden">


            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-slate-800 pb-2"
                    >
                        Recursos por Materia
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        Accede a miles de apuntes, ejercicios resueltos y guías de estudio organizadas por nuestros mejores profesores.
                    </motion.p>

                    {/* GRADE FILTER DROPDOWN */}
                    <div className="mt-12 flex justify-center">
                        <div className="relative">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 pl-5 pr-4 py-3 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm min-w-[200px]"
                            >
                                <Funnel className="w-4 h-4 text-slate-400" weight="bold" />
                                <span className="flex-grow text-left">
                                    {selectedGrade === 'all' ? 'Todos los Cursos' : selectedGrade}
                                </span>
                                <CaretDown className={`w-4 h-4 text-slate-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} weight="bold" />
                            </button>

                            <AnimatePresence>
                                {filterOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-1 z-50 text-slate-700"
                                    >
                                        <button
                                            onClick={() => { setSelectedGrade('all'); setFilterOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                                selectedGrade === 'all' && "bg-teal-50 text-teal-600"
                                            )}
                                        >
                                            Todos los Cursos
                                        </button>
                                        {availableGrades.map((grade) => (
                                            <button
                                                key={grade}
                                                onClick={() => { setSelectedGrade(grade); setFilterOpen(false); }}
                                                className={cn(
                                                    "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                                    selectedGrade === grade && "bg-teal-50 text-teal-600"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSubjects.map((subject, idx) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                            className="h-full"
                        >
                            <Link href={subject.href} className="group relative block h-full">
                                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
                                <div className={`h-full bg-white/40 backdrop-blur-md border border-slate-200/50 py-4 px-5 rounded-3xl transition-all duration-300 group-hover:bg-white/60 group-hover:border-slate-300 shadow-lg hover:shadow-xl overflow-hidden relative flex flex-col`}>

                                    {/* Hover Glow */}
                                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${subject.color} opacity-[0.05] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />

                                    <div className="flex items-start gap-3 mb-2">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300 p-2 flex-shrink-0`}>
                                            <subject.icon className="w-5 h-5 text-white" weight="duotone" />
                                        </div>
                                        <div className="flex flex-col gap-1.5 pt-0.5">
                                            <div className="px-2.5 py-0.5 bg-slate-100/80 rounded-full text-[9px] font-bold text-slate-500 border border-slate-200/40 uppercase tracking-wide w-fit backdrop-blur-sm">
                                                {subject.stat}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 transition-colors line-clamp-1">
                                        {subject.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium mb-3 leading-relaxed text-xs line-clamp-3 min-h-[2.2rem]">
                                        {subject.description}
                                    </p>

                                    <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-800 transition-colors mt-auto">
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
                        className="relative h-full min-h-[250px] flex flex-col items-center justify-center bg-white/20 border border-slate-200/50 border-dashed rounded-3xl p-8 text-center text-slate-400 group cursor-default backdrop-blur-sm shadow-sm"
                    >
                        <BookOpen className="w-10 h-10 mb-4 opacity-30 group-hover:opacity-60 transition-opacity" weight="duotone" />
                        <h3 className="text-lg font-bold text-slate-700 mb-1">Más Materias</h3>
                        <p className="text-xs text-slate-500 font-medium">Pronto añadiremos Economía, Biología y más.</p>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
