'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { Funnel, CaretDown, Student } from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
import CarouselAutoScroll from '@/components/CarouselAutoScroll';

const COMMON_SUBJECTS = [
    'Matemáticas', 'Inglés', 'Física', 'Química', 'Lengua', 'Historia', 'Francés', 'Alemán', 'Biología', 'Economía', 'Geografía', 'Programación'
];

const categories = [
    {
        id: 'natural-science',
        title: 'Natural Science',
        description: 'Expertos en Biología, Física, Química y Ciencias Naturales.',
        iconSrc: '/icons/math.svg',
        color: 'from-blue-500 to-cyan-600',
        count: '45 Profesores',
        grades: ['Primaria', 'ESO', '1º ESO', '3º ESO']
    },
    {
        id: 'languages',
        title: 'Languages',
        description: 'Aprende Inglés, Francés, Alemán o Lengua con nativos.',
        iconSrc: '/icons/english.svg',
        color: 'from-pink-500 to-rose-600',
        count: '32 Profesores',
        grades: ['Primaria', '5º Prim.', 'ESO', '1º ESO', '3º ESO']
    },
    {
        id: 'social-science',
        title: 'Social Science',
        description: 'Historia, Geografía, Filosofía y Humanidades.',
        iconSrc: '/icons/language.svg',
        color: 'from-emerald-500 to-teal-600',
        count: '28 Profesores',
        grades: ['Primaria', '5º Prim.', 'ESO']
    },
    {
        id: 'math',
        title: 'Matemáticas',
        description: 'Refuerzo de Matemáticas, Álgebra, Cálculo y ESO.',
        iconSrc: '/icons/geography.svg',
        color: 'from-orange-500 to-amber-600',
        count: '50 Profesores',
        grades: ['Primaria', '3º Prim.', '5º Prim.', 'ESO']
    }
];

export default function ProfesoresClient() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [filterOpen, setFilterOpen] = useState(false);

    const availableGrades = ['Primaria', '3º Prim.', '5º Prim.', 'ESO', '1º ESO', '3º ESO'].sort();

    const filteredCategories = selectedGrade === 'all'
        ? categories
        : categories.filter(c => c.grades.includes(selectedGrade));

    const filteredSubjects = COMMON_SUBJECTS.filter(subject =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        Encuentra a tu Profe Ideal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        Conecta con profesores expertos verificados. Elige la modalidad que prefieras: online o presencial.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 max-w-md mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />
                            <div className="relative flex items-center bg-white/40 backdrop-blur-xl border border-slate-200/50 rounded-full px-6 py-4 shadow-2xl z-20">
                                <Search className="w-5 h-5 text-slate-400 mr-4" />
                                <input
                                    type="text"
                                    value={searchTerm || ''}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    placeholder="¿Qué quieres aprender hoy?"
                                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-lg font-medium"
                                />
                            </div>

                            <AnimatePresence>
                                {showSuggestions && filteredSubjects.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden z-20"
                                    >
                                        <ul>
                                            {filteredSubjects.map((subject, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => {
                                                        setSearchTerm(subject);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="px-6 py-3 hover:bg-white/10 cursor-pointer text-gray-200 transition-colors flex items-center gap-2"
                                                >
                                                    <Search className="w-4 h-4 text-gray-500" />
                                                    {subject}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* GRADE FILTER DROPDOWN */}
                        <div className="mt-8 flex justify-center pb-2">
                            <div className="relative">
                                <button
                                    onClick={() => setFilterOpen(!filterOpen)}
                                    className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 pl-5 pr-4 py-3 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm min-w-[200px]"
                                >
                                    <Funnel className="w-4 h-4 text-slate-400" />
                                    <span className="flex-grow text-left">
                                        {selectedGrade === 'all' ? 'Todos los Cursos' : selectedGrade}
                                    </span>
                                    <CaretDown className={`w-4 h-4 text-slate-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
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
                    </motion.div>
                </header>

                <div className="bg-white/40 backdrop-blur-md border border-slate-200/50 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden mb-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-black mb-2 text-slate-800">Explora por Categoría</h2>
                                <p className="text-slate-600 font-medium">Encuentra la materia que necesitas reforzar.</p>
                            </div>
                            <button className="hidden md:flex items-center text-teal-400 font-bold hover:text-teal-300 transition mt-4 md:mt-0">
                                Ver todas las categorías <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredCategories.map((cat, idx) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx + 0.4 }}
                                    className="h-full"
                                >
                                    <Link href={`/profesores/${cat.id}`} className="block h-full group">
                                        <div className="bg-white/40 backdrop-blur-md border border-slate-200/60 py-4 px-5 rounded-3xl h-full transition-all duration-300 group-hover:bg-white/60 group-hover:scale-105 group-hover:border-slate-300 flex flex-col items-center text-center shadow-lg hover:shadow-2xl relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} p-2 mb-1.5 shadow-lg group-hover:rotate-6 transition-transform`}>
                                                <img src={cat.iconSrc} alt={cat.title} className="w-full h-full object-contain" />
                                            </div>
                                            <h4 className="font-bold text-sm mb-0.5 text-slate-800 drop-shadow-sm line-clamp-1">{cat.title}</h4>
                                            <p className="text-slate-600 text-[11px] mb-2 line-clamp-3 min-h-[2.2rem] font-medium">{cat.description}</p>
                                            <span className="mt-auto inline-block text-xs font-bold text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full border border-teal-400/20">
                                                {cat.count}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white/40 backdrop-blur-md border border-slate-200/50 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent pointer-events-none" />
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative z-10">
                        <div>
                            <h2 className="text-3xl font-black mb-2 text-slate-800">Profesores Mejor Valorados</h2>
                            <p className="text-slate-600 font-medium">Basado en opiniones reales de alumnos.</p>
                        </div>
                        <button className="hidden md:flex items-center text-teal-400 font-bold hover:text-teal-300 transition mt-4 md:mt-0">
                            Ver todos los profesores <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                    <div className="relative z-10 mt-8">
                        <CarouselAutoScroll />
                    </div>
                </div>
            </div>
        </main>
    );
}
