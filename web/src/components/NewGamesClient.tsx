'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GlobeHemisphereWest, GameController } from '@phosphor-icons/react';

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
                        Aprende divirtiéndote con nuestra colección de juegos interactivos. Mapas, ciencias y mucho más.
                    </motion.p>
                </header>

                <div className="flex flex-col gap-24">
                    {/* SECCIÓN LÓGICA */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] group-hover:bg-amber-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(245,158,11,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(245,158,11,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-amber-500/20 rounded-3xl blur-2xl group-hover/img:bg-amber-500/30 transition-all -z-10" />
                                        <img
                                            src="/images/resources/intelligence-main.png"
                                            alt="Lógica"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl border-4 border-white/50 shadow-2xl transform -rotate-3 group-hover/img:rotate-0 transition-all duration-500"
                                        />
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-black mb-6 border border-amber-500/20 uppercase tracking-widest">
                                        Retos Mentales
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Lógica y Astucia
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        Entrena tu cerebro con problemas matemáticos, lógica y razonamiento. ¡Demuestra tu inteligencia!
                                    </p>

                                    <Link
                                        href="/juegos/logic"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        JUGAR AHORA
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN ADIVINANZAS */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-l from-purple-500/10 to-indigo-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(139,92,246,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-2xl group-hover/img:bg-purple-500/30 transition-all -z-10" />
                                        <img
                                            src="/images/resources/game-riddles.png"
                                            alt="Adivinanzas"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl border-4 border-white/50 shadow-2xl transform rotate-3 group-hover/img:rotate-0 transition-all duration-500"
                                        />
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-black mb-6 border border-purple-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        ¿Lo Adivinarás?
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            Adivinanzas
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            Descubre acertijos clásicos y modernos. Pon a prueba tu ingenio para resolver los misterios más divertidos.
                                        </p>

                                        <Link
                                            href="/juegos/riddles"
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            RESOLVER
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN QUIZ */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(59,130,246,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl group-hover/img:bg-blue-500/30 transition-all -z-10" />
                                        <img
                                            src="/images/resources/game-quiz.png"
                                            alt="Quiz"
                                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl border-4 border-white/50 shadow-2xl transform -rotate-3 group-hover/img:rotate-0 transition-all duration-500"
                                        />
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-black mb-6 border border-blue-500/20 uppercase tracking-widest">
                                        Cultura General
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        Quiz de Sabiduría
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        ¿Cuánto sabes realmente? Participa en tests interactivos sobre diversos temas y conviértete en un experto.
                                    </p>

                                    <Link
                                        href="/juegos/quiz-cultura"
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        PONTE A PRUEBA
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
