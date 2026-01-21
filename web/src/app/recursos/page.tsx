'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, ArrowRight, Library } from 'lucide-react';

const subjects = [
    {
        id: 'matematicas',
        title: 'Matemáticas',
        description: 'Álgebra, geometría, cálculo y problemas lógicos.',
        href: '/recursos/matematicas',
        iconSrc: '/icons/math.svg',
        color: 'from-blue-500 to-cyan-500',
        stat: '150+ Recursos'
    },
    {
        id: 'lengua',
        title: 'Lengua y Literatura',
        description: 'Gramática, sintaxis y análisis de textos clásicos.',
        href: '/recursos/lengua',
        iconSrc: '/icons/language.svg',
        color: 'from-orange-500 to-red-500',
        stat: '120+ Recursos'
    },
    {
        id: 'ingles',
        title: 'Inglés',
        description: 'Vocabulario, listening y ejercicios de speaking.',
        href: '/recursos/ingles',
        iconSrc: '/icons/english.svg',
        color: 'from-pink-500 to-rose-500',
        stat: '90+ Recursos'
    },
    {
        id: 'geografia',
        title: 'Historia y Geografía',
        description: 'Mapas interactivos, líneas de tiempo y documentos históricos.',
        href: '/recursos/geografia',
        iconSrc: '/icons/geography.svg',
        color: 'from-emerald-500 to-teal-500',
        stat: '85+ Recursos'
    },
    {
        id: 'fisica',
        title: 'Física y Química',
        description: 'Experimentos, fórmulas y tabla periódica.',
        href: '/recursos/fisica',
        icon: FlaskConical, // Fallback to Lucide component
        color: 'from-violet-500 to-purple-500',
        stat: 'Coming Soon'
    }
];

export default function ResourcesHubPage() {
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
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, idx) => (
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
                                            {subject.iconSrc ? (
                                                <img src={subject.iconSrc} alt={subject.title} className="w-full h-full object-contain" />
                                            ) : (
                                                // @ts-ignore
                                                <subject.icon className="w-8 h-8 text-white" />
                                            )}
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
                        <BookOpen className="w-10 h-10 mb-4 opacity-20 group-hover:opacity-40 transition-opacity" />
                        <h3 className="text-lg font-bold mb-1">Más Materias</h3>
                        <p className="text-xs">Pronto añadiremos Economía, Biología y más.</p>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
