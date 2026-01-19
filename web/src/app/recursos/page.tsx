'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Globe, Languages, FlaskConical, PenTool, ArrowRight, Library } from 'lucide-react';

const subjects = [
    {
        id: 'matematicas',
        title: 'Matemáticas',
        description: 'Álgebra, geometría, cálculo y problemas lógicos.',
        href: '/recursos/matematicas',
        icon: Calculator,
        color: 'from-blue-500 to-cyan-500',
        stat: '150+ Recursos'
    },
    {
        id: 'lengua',
        title: 'Lengua y Literatura',
        description: 'Gramática, sintaxis y análisis de textos clásicos.',
        href: '/recursos/lengua',
        icon: PenTool,
        color: 'from-orange-500 to-red-500',
        stat: '120+ Recursos'
    },
    {
        id: 'ingles',
        title: 'Inglés',
        description: 'Vocabulario, listening y ejercicios de speaking.',
        href: '/recursos/ingles',
        icon: Languages,
        color: 'from-pink-500 to-rose-500',
        stat: '90+ Recursos'
    },
    {
        id: 'geografia',
        title: 'Historia y Geografía',
        description: 'Mapas interactivos, líneas de tiempo y documentos históricos.',
        href: '/recursos/geografia',
        icon: Globe,
        color: 'from-emerald-500 to-teal-500',
        stat: '85+ Recursos'
    },
    {
        id: 'fisica',
        title: 'Física y Química',
        description: 'Experimentos, fórmulas y tabla periódica.',
        href: '/recursos/fisica',
        icon: FlaskConical,
        color: 'from-violet-500 to-purple-500',
        stat: 'Coming Soon'
    }
];

export default function ResourcesHubPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Library className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-gray-300">Biblioteca Digital</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2"
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
                                <div className={`h-full bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl transition-all duration-300 group-hover:border-white/20 group-hover:translate-y-[-5px] overflow-hidden relative flex flex-col`}>

                                    {/* Hover Glow */}
                                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${subject.color} opacity-[0.05] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                            <subject.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-gray-400 border border-white/5 uppercase tracking-wide">
                                            {subject.stat}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                        {subject.title}
                                    </h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed text-sm flex-grow">
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
                        className="relative h-full min-h-[250px] flex flex-col items-center justify-center bg-white/5 border border-white/5 border-dashed rounded-3xl p-8 text-center text-gray-500 group cursor-default"
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
