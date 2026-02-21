'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BookOpen, GraduationCap, Sparkle } from '@phosphor-icons/react';

export default function RecursosClient() {
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
                        Material Didáctico
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        Accede a miles de apuntes, ejercicios resueltos y guías de estudio organizadas por nuestros mejores profesores.
                    </motion.p>
                </header>

                <div className="flex flex-col gap-24">
                    {/* SECCIÓN 1: CUENTOS CLÁSICOS (Anteriormente Cuenta Cuentos) */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(251,146,60,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(251,146,60,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-2xl group-hover/img:bg-orange-500/30 transition-all -z-10" />
                                        <img
                                            src="/images/storyteller/cuentacuentos-main.png"
                                            alt="Cuentos Clásicos"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl border-4 border-white/50 shadow-2xl transform -rotate-3 group-hover/img:rotate-0 transition-all duration-500"
                                        />
                                        {/* Floating Elements for "Multi-story" feel */}
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl border border-orange-100 flex items-center justify-center p-2 rotate-12"
                                        >
                                            <img src="/images/storyteller/character-gato.png" alt="Gato" className="w-full h-full object-contain" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ y: [0, 10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                            className="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-xl border border-orange-100 flex items-center justify-center p-2 -rotate-12"
                                        >
                                            <img src="/images/storyteller/character-caperucita.png" alt="Caperucita" className="w-full h-full object-contain" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute top-1/2 -right-10 w-14 h-14 bg-white rounded-2xl shadow-xl border border-orange-100 flex items-center justify-center p-2 rotate-6"
                                        >
                                            <img src="/images/storyteller/character-sirenita.png" alt="Sirenita" className="w-full h-full object-contain" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ x: [0, -8, 0], y: [0, 5, 0] }}
                                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            className="absolute top-1/4 -left-10 w-14 h-14 bg-white rounded-2xl shadow-xl border border-orange-100 flex items-center justify-center p-2 -rotate-6"
                                        >
                                            <img src="/images/storyteller/character-patito.png" alt="Patito Feo" className="w-full h-full object-contain" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black mb-6 border border-orange-500/20 uppercase tracking-widest">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                        Nueva Herramienta
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Cuentos Clásicos
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        Libros clásicos que cobran vida con narraciones mágicas y lectura inmersiva. Diseñado para fomentar el hábito de la lectura y mejorar la comprensión.
                                    </p>

                                    <Link
                                        href="/material/cuentos-clasicos"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        EXPLORAR BIBLIOTECA
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN 2: LECTURA JUVENIL (Nueva posición) */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-l from-rose-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] group-hover:bg-rose-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(244,63,94,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(244,63,94,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-rose-500/20 rounded-3xl blur-2xl group-hover/img:bg-rose-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <Sparkle className="w-32 h-32 text-white/90" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-black mb-6 border border-rose-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                        </span>
                                        Nueva Categoría
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            Lectura Juvenil
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            Historias vibrantes para chicos de 10 a 12 años. Aventuras, misterio y relatos que atrapan desde la primera página.
                                        </p>

                                        <Link
                                            href="/material/lectura-juvenil"
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            EXPLORAR COLECCIÓN
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN 3: PROFESOR DE LECTURA */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] group-hover:bg-sky-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(14,165,233,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-sky-500/20 rounded-3xl blur-2xl group-hover/img:bg-sky-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <BookOpen className="w-32 h-32 text-white/90" weight="duotone" />
                                            {/* Floating Particles/Icons */}
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute -top-4 -right-4 p-3 bg-white rounded-2xl shadow-xl text-sky-600"
                                            >
                                                <GraduationCap className="w-8 h-8" weight="fill" />
                                            </motion.div>
                                            <motion.div
                                                animate={{ y: [0, 10, 0] }}
                                                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                                className="absolute -bottom-4 -left-4 p-3 bg-white rounded-2xl shadow-xl text-indigo-600"
                                            >
                                                <Sparkle className="w-8 h-8" weight="fill" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-600 text-xs font-black mb-6 border border-sky-500/20 uppercase tracking-widest">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                        </span>
                                        Nueva Herramienta
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Profesor de Lectura
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        Entrena tu fluidez y comprensión automática con nuestro asistente inteligente. Lectura asistida con resaltado en tiempo real y modo enfoque.
                                    </p>

                                    <Link
                                        href="/material/profesor-lectura"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        EMPEZAR A ENTRENAR
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN 4: DICTADOS (Nueva posición) */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-fuchsia-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(168,85,247,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-2xl group-hover/img:bg-purple-500/30 transition-all -z-10" />
                                        <img
                                            src="/images/resources/dictados-main.png"
                                            alt="Dictados Interactivos"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl border-4 border-white/50 shadow-2xl transform rotate-3 group-hover/img:rotate-0 transition-all duration-500"
                                        />
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-black mb-6 border border-purple-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                        </span>
                                        Herramienta Online
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            Dictados Interactivos
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            Mejora la ortografía y la capacidad de escritura con nuestra herramienta de dictados audibles. Escucha, escribe y corrige en tiempo real.
                                        </p>

                                        <Link
                                            href="/material/dictados"
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            EMPEZAR A PRACTICAR
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Coming Soon Section */}
                    <section className="w-full max-w-6xl mx-auto mb-12">
                        <div className="bg-white/5 backdrop-blur-sm border border-slate-200/20 rounded-[2.5rem] p-12 text-center relative overflow-hidden group border-dashed">
                            <BookOpen className="w-12 h-12 mx-auto mb-6 text-slate-400/50 group-hover:text-slate-400 transition-colors" weight="duotone" />
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Más Material en Camino</h3>
                            <p className="text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                                Estamos trabajando para añadir miles de apuntes y ejercicios resueltos de Matemáticas, Lengua, Historia y Economía.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
