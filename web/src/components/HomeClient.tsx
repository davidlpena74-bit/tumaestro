'use client';

import BookCarousel from '@/components/BookCarousel';
import GamesCarousel from '@/components/GamesCarousel';
import CarouselAutoScroll from '@/components/CarouselAutoScroll';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
    ArrowRight,
    CaretDown
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function HomeClient() {
    const router = useRouter();
    const { t } = useLanguage();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="relative min-h-screen font-sans text-gray-800">

            {/* 1. BACKGROUND VIDEO (Fixed) */}
            <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/background.mp4" type="video/mp4" />
                </video>
            </div>



            {/* 3. HERO: SPLIT GATEWAY */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] px-4">

                <div className="-mb-48 -mt-80 relative z-10">
                    <img
                        src="/images/icons/logo-text-brush.png"
                        alt="TuMaestro.es"
                        className="w-full max-w-[360px] md:max-w-[480px] h-auto object-contain drop-shadow-2xl mx-auto"
                    />
                </div>
                <h1 className="sr-only">
                    {t.home.heroTitle}
                </h1>
                <p className="text-xl text-gray-100 mb-12 text-center max-w-2xl font-light drop-shadow-md">
                    {t.home.heroSubtitle}
                </p>

                {/* TARJETAS DE SELECCIÓN (GLASSMORPHISM) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {/* OPCIÓN A: PROFESORES */}
                    <motion.div
                        onClick={() => window.location.href = '/profesores'}
                        initial="initial"
                        whileHover="hover"
                        variants={{
                            initial: { scale: 1, y: 0 },
                            hover: { scale: 1.05, y: -6 }
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="group bg-white/20 backdrop-blur-xl border border-white/30 py-4 px-5 rounded-[1.5rem] cursor-pointer text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mb-4 drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                            <img src="/images/icons/icon-teacher-3d.png" alt="Profesores" className="w-40 h-40 object-contain drop-shadow-2xl" />
                        </div>

                        <h2 className="relative z-10 text-lg font-black text-white group-hover:text-teal-300 mb-0.5 transition-colors duration-300">{t.home.findTeacher}</h2>
                        <p className="relative z-10 text-slate-200 text-xs mb-3 max-w-xs group-hover:text-white transition-colors duration-300">
                            {t.home.findTeacherDesc}
                        </p>
                        <button className="relative z-10 bg-white text-slate-950 px-8 py-3 rounded-2xl font-bold text-sm w-full max-w-[220px] group-hover:bg-teal-400 transition-all duration-300 shadow-xl">
                            {t.home.findTeacherBtn}
                        </button>
                    </motion.div>

                    {/* OPCIÓN B: MATERIAL DIDÁCTICO */}
                    <motion.div
                        onClick={() => router.push('/recursos')}
                        initial="initial"
                        whileHover="hover"
                        variants={{
                            initial: { scale: 1, y: 0 },
                            hover: { scale: 1.05, y: -6 }
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="group bg-white/20 backdrop-blur-xl border border-white/30 py-5 px-6 rounded-[1.5rem] cursor-pointer text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mb-4 drop-shadow-[0_0_30px_rgba(251,146,60,0.2)]">
                            <img src="/images/icons/icon-resources-3d.png" alt="Recursos" className="w-40 h-40 object-contain drop-shadow-2xl" />
                        </div>

                        <h2 className="relative z-10 text-lg font-black text-white group-hover:text-orange-300 mb-0.5 transition-colors duration-300">{t.home.resources}</h2>
                        <p className="relative z-10 text-slate-200 text-xs mb-3 max-w-xs group-hover:text-white transition-colors duration-300">
                            {t.home.resourcesDesc}
                        </p>
                        <button className="relative z-10 bg-white text-slate-950 px-8 py-3 rounded-2xl font-bold text-sm w-full max-w-[220px] group-hover:bg-orange-400 transition-all duration-300 shadow-xl">
                            {t.home.resourcesBtn}
                        </button>
                    </motion.div>

                    {/* OPCIÓN C: JUEGOS */}
                    <motion.div
                        onClick={() => router.push('/juegos')}
                        initial="initial"
                        whileHover="hover"
                        variants={{
                            initial: { scale: 1, y: 0 },
                            hover: { scale: 1.05, y: -6 }
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="group bg-white/20 backdrop-blur-xl border border-white/30 py-5 px-6 rounded-[1.5rem] cursor-pointer text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mb-3 drop-shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                            <img src="/images/icons/icon-games-3d.png" alt="Juegos" className="w-44 h-44 object-contain drop-shadow-2xl" />
                        </div>

                        <h2 className="relative z-10 text-lg font-black text-white group-hover:text-purple-300 mb-0.5 transition-colors duration-300">{t.home.learnPlaying}</h2>
                        <p className="relative z-10 text-slate-200 text-xs mb-3 max-w-xs group-hover:text-white transition-colors duration-300">
                            {t.home.learnPlayingDesc}
                        </p>
                        <button className="relative z-10 bg-white text-slate-950 px-8 py-3 rounded-2xl font-bold text-sm w-full max-w-[220px] group-hover:bg-purple-400 transition-all duration-300 shadow-xl">
                            {t.home.learnPlayingBtn}
                        </button>
                    </motion.div>
                </div>



                {/* Flecha */}
                <div className="absolute bottom-8 animate-bounce text-white/50 cursor-pointer" onClick={() => scrollTo('profesores')}>
                    <CaretDown className="w-8 h-8" weight="bold" />
                </div>
            </div>

            {/* 4. CONTENIDO (Ultra Glassmorphism) */}
            <div className="relative z-20 min-h-screen px-6 py-20">

                <div className="max-w-7xl mx-auto">

                    {/* SECCIÓN PROFESORES */}
                    <section className="w-full max-w-6xl mx-auto px-4 mb-24">
                        <div id="profesores" className="scroll-mt-32 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4 flex items-center gap-4">
                                        {t.home.featuredTeachers}
                                        <img src="/images/icons/icon-teacher-3d.png" alt="Profesores" className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg" />
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed">{t.home.featuredTeachersDesc}</p>
                                </div>
                                <a href="/profesores" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all group">
                                    {t.home.viewAll}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                                </a>
                            </div>

                            <CarouselAutoScroll />
                        </div>
                    </section>

                    {/* SECCIÓN MATERIAL DIDÁCTICO (NUEVA) */}
                    <section className="w-full max-w-6xl mx-auto mt-24 relative z-10 px-4 scroll-mt-32" id="material">
                        <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 to-orange-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-8 border-b border-white/20 pb-4 gap-4">
                                <div className="text-right">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold mb-4 border border-orange-500/30 justify-end">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                        {t.home.updated}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-2 flex items-center justify-end gap-4">
                                        <img src="/images/icons/icon-resources-3d.png" alt="Recursos" className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg" />
                                        {t.home.resourceLibrary}
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed">{t.home.resourceLibraryDesc}</p>
                                </div>
                                <a
                                    href="/recursos"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all group whitespace-nowrap"
                                >
                                    <ArrowRight className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform rotate-180" weight="bold" />
                                    {t.home.exploreLibrary}
                                </a>
                            </div>

                            {/* Carousel for all stories */}
                            <BookCarousel />
                        </div>
                    </section>


                    {/* JUEGOS SECTION */}
                    <section className="w-full max-w-6xl mx-auto mt-32 relative z-10 px-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4 gap-4">
                                <div className="text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-4 border border-purple-500/30">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                        </span>
                                        {t.home.trending}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-2 flex items-center gap-4">
                                        {t.home.gamesHeroTitle}
                                        <img src="/images/icons/icon-games-3d.png" alt="Juegos" className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-lg" />
                                    </h2>
                                    <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{t.home.gamesHeroDesc || t.home.learnPlayingDesc}</p>
                                </div>
                                <a
                                    href="/juegos"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 transition-all group whitespace-nowrap"
                                >
                                    {t.home.exploreGames || t.home.playNow}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                                </a>
                            </div>

                            <GamesCarousel />
                        </div>
                    </section>


                    {/* FOOTER */}
                    <footer className="w-full mt-24 py-8 border-t border-white/10 text-center relative z-10">
                        <p className="text-white/60 text-sm mb-2">
                            {t.home.footer.rights}
                        </p>
                        <div className="flex justify-center gap-6 text-sm font-medium">
                            <a href="/terminos" className="text-white/40 hover:text-white transition">{t.home.footer.terms}</a>
                            <a href="/privacidad" className="text-white/40 hover:text-white transition">{t.home.footer.privacy}</a>
                        </div>
                        <div className="mt-4 text-white/20 text-xs text-center font-mono">
                            v{process.env.NEXT_PUBLIC_APP_VERSION}
                        </div>
                    </footer>

                </div >
            </div >

        </main >
    );
}
