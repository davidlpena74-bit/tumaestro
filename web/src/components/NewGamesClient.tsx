'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlobeHemisphereWest, Calculator, Dna, Translate, GameController } from '@phosphor-icons/react';

export default function NewGamesClient() {
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
                        Juegos Educativos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        Aprende divirtiéndote con nuestra colección de juegos interactivos. Mapas, ciencias, matemáticas y mucho más.
                    </motion.p>
                </header>

                <div className="flex flex-col gap-24">
                    {/* SECCIÓN GEOGRAFÍA */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(16,185,129,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-2xl group-hover/img:bg-emerald-500/30 transition-all -z-10" />

                                        {/* Glass Container for Icon */}
                                        <div className="relative bg-white/10 backdrop-blur-md border border-white/40 p-10 rounded-[2.5rem] shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500 border-b-white/10 border-r-white/10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-[2.5rem] -z-10" />
                                            <GlobeHemisphereWest className="w-40 h-40 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black mb-6 border border-emerald-500/20 uppercase tracking-widest">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        Explora el Mundo
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Geografía Interactiva
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        Viaja por el mundo sin salir de casa. Aprende países, capitales, ríos y montañas con nuestros mapas interactivos.
                                    </p>

                                    <Link
                                        href="/actividades#geography"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        VER MAPAS
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN CIENCIAS */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(59,130,246,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl group-hover/img:bg-blue-500/30 transition-all -z-10" />

                                        {/* Glass Container for Image */}
                                        <div className="relative bg-white/10 backdrop-blur-md border border-white/40 p-8 rounded-[2.5rem] shadow-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500 border-b-white/10 border-l-white/10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-[2.5rem] -z-10" />
                                            <img
                                                src="/images/games/animal-cell-hq.png"
                                                alt="Ciencias Naturales"
                                                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-black mb-6 border border-blue-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        Descubre la Vida
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            Ciencias y Anatomía
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            Explora el cuerpo humano y las células en detalle. Modelos interactivos para entender cómo funcionamos por dentro.
                                        </p>

                                        <Link
                                            href="/actividades#biology"
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            EXPLORAR CIENCIAS
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN MATEMÁTICAS */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] group-hover:bg-orange-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(249,115,22,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(249,115,22,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-orange-500/20 rounded-3xl blur-2xl group-hover/img:bg-orange-500/30 transition-all -z-10" />

                                        {/* Glass Container for Icon */}
                                        <div className="relative bg-white/10 backdrop-blur-md border border-white/40 p-10 rounded-[2.5rem] shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500 border-b-white/10 border-r-white/10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-600/20 rounded-[2.5rem] -z-10" />
                                            <Calculator className="w-40 h-40 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-black mb-6 border border-orange-500/20 uppercase tracking-widest">
                                        Números Divertidos
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Matemáticas Visuales
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        Olvídate de las aburridas hojas de cálculo. Aprende a dividir repartiendo pizzas y a multiplicar dibujando líneas.
                                    </p>

                                    <Link
                                        href="/actividades#math"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        JUGAR CON NÚMEROS
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Coming Soon Section */}
                    <section className="w-full max-w-6xl mx-auto mb-12">
                        <div className="bg-white/5 backdrop-blur-sm border border-slate-200/20 rounded-[2.5rem] p-12 text-center relative overflow-hidden group border-dashed">
                            <GameController className="w-12 h-12 mx-auto mb-6 text-slate-400/50 group-hover:text-slate-400 transition-colors" weight="duotone" />
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Más Juegos Próximamente</h3>
                            <p className="text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                                Estamos desarrollando nuevos juegos de Historia, Física y Química. ¡Lanzamiento muy pronto!
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
