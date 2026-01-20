'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MessageCircle, Calendar, GraduationCap, ArrowRight, UserCheck } from 'lucide-react';
import CarouselAutoScroll from '@/components/CarouselAutoScroll';

const COMMON_SUBJECTS = [
    'Matemáticas', 'Inglés', 'Física', 'Química', 'Lengua', 'Historia', 'Francés', 'Alemán', 'Biología', 'Economía', 'Geografía', 'Programación'
];

// Mock Categories
const categories = [
    {
        id: 'ciencias',
        title: 'Ciencias y Matemáticas',
        description: 'Encuentra expertos en Cálculo, Física, Química y Biología.',
        iconSrc: '/icons/math.svg',
        color: 'from-blue-500 to-cyan-500',
        count: '45 Profesores'
    },
    {
        id: 'idiomas',
        title: 'Idiomas',
        description: 'Aprende Inglés, Francés, Alemán o Chino con nativos.',
        iconSrc: '/icons/english.svg', // Reusing english icon
        color: 'from-pink-500 to-rose-500',
        count: '32 Profesores'
    },
    {
        id: 'letras',
        title: 'Letras y Humanidades',
        description: 'Historia, Filosofía, Lengua y Literatura.',
        iconSrc: '/icons/language.svg', // Reusing language icon
        color: 'from-orange-500 to-red-500',
        count: '28 Profesores'
    },
    {
        id: 'primaria',
        title: 'Apoyo Primaria/ESO',
        description: 'Refuerzo general y técnicas de estudio para los más jóvenes.',
        iconSrc: '/icons/geography.svg', // Placeholder usage
        color: 'from-emerald-500 to-teal-500',
        count: '50 Profesores'
    }
];



export default function TeachersHubPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSubjects = COMMON_SUBJECTS.filter(subject =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">

            {/* Background Image with Blur & Overlay */}
            <div className="fixed inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="/fondo.jpg"
                    className="w-full h-full object-cover blur-sm scale-105"
                    alt="Fondo"
                />
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <header className="mb-16 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white pb-2"
                    >
                        Encuentra a tu Profe Ideal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mt-2"
                    >
                        Conecta con profesores expertos verificados. Elige la modalidad que prefieras: online o presencial.
                    </motion.p>

                    {/* Search Bar Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-10 max-w-md mx-auto"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />
                            <div className="relative flex items-center bg-white/20 backdrop-blur-xl border border-white/40 rounded-full px-6 py-4 shadow-2xl z-20">
                                <Search className="w-5 h-5 text-gray-400 mr-4" />
                                <input
                                    type="text"
                                    value={searchTerm || ''}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    placeholder="¿Qué quieres aprender hoy?"
                                    className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full text-lg"
                                />
                            </div>

                            {/* Autocomplete Dropdown */}
                            <AnimatePresence>
                                {showSuggestions && filteredSubjects.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden z-10"
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
                    </motion.div>
                </header>

                {/* Categories Grid */}
                {/* Categories Grid (Boxed) */}
                <div className="bg-white/30 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden mb-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-black mb-2">Explora por Categoría</h2>
                                <p className="text-gray-400">Encuentra la materia que necesitas reforzar.</p>
                            </div>
                            <button className="hidden md:flex items-center text-teal-400 font-bold hover:text-teal-300 transition mt-4 md:mt-0">
                                Ver todas las categorías <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((cat, idx) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx + 0.4 }}
                                >
                                    <Link href={`/profesores/${cat.id}`} className="block h-full group">
                                        <div className="bg-white/30 backdrop-blur-md border border-white/40 p-6 rounded-3xl h-full transition-all duration-300 group-hover:bg-white/40 group-hover:scale-105 group-hover:border-white/40 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">

                                            {/* Bg Glow (FDCE Style) */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} p-3 mb-4 shadow-lg group-hover:rotate-6 transition-transform`}>
                                                <img src={cat.iconSrc} alt={cat.title} className="w-full h-full object-contain" />
                                            </div>

                                            <h4 className="font-bold text-lg mb-2 text-white drop-shadow-md">{cat.title}</h4>
                                            <p className="text-white text-sm mb-4">{cat.description}</p>
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

                {/* Featured Teachers Preview */}
                <div className="bg-white/30 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative z-10">
                        <div>
                            <h2 className="text-3xl font-black mb-2">Profesores Mejor Valorados</h2>
                            <p className="text-gray-400">Basado en opiniones reales de alumnos.</p>
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
