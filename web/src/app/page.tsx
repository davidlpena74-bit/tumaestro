'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CarouselAutoScroll from '@/components/CarouselAutoScroll';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Student,
  Books,
  GameController,
  Quotes,
  Calculator,
  Translate,
  GlobeHemisphereWest,
  MapTrifold,
  Brain,
  Trophy,
  ArrowRight,
  CaretDown
} from '@phosphor-icons/react';

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('courses').select(`*, teacher:profiles(*), subject:subjects(*)`).eq('is_active', true);
      if (data) setCourses(data);
    }
    fetch();
  }, []);

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

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          {t.home.heroTitle}
        </h1>
        <p className="text-xl text-gray-100 mb-12 text-center max-w-2xl font-light drop-shadow-md">
          {t.home.heroSubtitle}
        </p>

        {/* TARJETAS DE SELECCIÓN (GLASSMORPHISM) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

          {/* OPCIÓN A: PROFESORES */}
          <div
            onClick={() => window.location.href = '/profesores'}
            className="group bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="mb-6 transition duration-500 group-hover:scale-110 drop-shadow-2xl">
              <Student className="w-32 h-32 text-white group-hover:text-teal-300 transition-colors duration-300" weight="duotone" />
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-teal-300 mb-2 drop-shadow-md z-10 transition-colors duration-300">{t.home.findTeacher}</h2>
            <p className="text-gray-200 group-hover:text-teal-100 text-sm mb-6 max-w-xs drop-shadow-sm z-10 transition-colors duration-300">
              {t.home.findTeacherDesc}
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] group-hover:bg-teal-300 group-hover:text-slate-900 transition-all duration-300 z-10">
              {t.home.findTeacherBtn}
            </button>
          </div>

          {/* OPCIÓN B: MATERIAL DIDÁCTICO */}
          <div
            onClick={() => router.push('/recursos')}
            className="group bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="mb-6 transition duration-500 group-hover:scale-110 drop-shadow-2xl">
              <Books className="w-32 h-32 text-white group-hover:text-teal-300 transition-colors duration-300" weight="duotone" />
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-teal-300 mb-2 drop-shadow-md z-10 transition-colors duration-300">{t.home.resources}</h2>
            <p className="text-gray-200 group-hover:text-teal-100 text-sm mb-6 max-w-xs drop-shadow-sm z-10 transition-colors duration-300">
              {t.home.resourcesDesc}
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] group-hover:bg-teal-300 group-hover:text-slate-900 transition-all duration-300 z-10">
              {t.home.resourcesBtn}
            </button>
          </div>

          {/* OPCIÓN C: JUEGOS (NUEVA) */}
          <div
            onClick={() => router.push('/juegos')}
            className="group bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="mb-6 transition duration-500 group-hover:scale-110 drop-shadow-2xl">
              <GameController className="w-32 h-32 text-white group-hover:text-teal-300 transition-colors duration-300" weight="duotone" />
            </div>

            <h2 className="text-2xl font-bold text-white group-hover:text-teal-300 mb-2 drop-shadow-md z-10 transition-colors duration-300">{t.home.learnPlaying}</h2>
            <p className="text-gray-200 group-hover:text-teal-100 text-sm mb-6 max-w-xs drop-shadow-sm z-10 transition-colors duration-300">
              {t.home.learnPlayingDesc}
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] group-hover:bg-teal-300 group-hover:text-slate-900 transition-all duration-300 z-10">
              {t.home.learnPlayingBtn}
            </button>
          </div>

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
                  <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4">{t.home.featuredTeachers}</h2>
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
          {/* RECURSOS SECTION (PREMIUM) */}
          <section className="w-full max-w-6xl mx-auto mt-24 relative z-10 px-4 scroll-mt-32" id="material">
            <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 to-orange-500/10 rounded-3xl blur-3xl -z-10" />

            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden relative">
              <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
                <div className="text-left md:text-right max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-4 border border-blue-500/30 w-full md:w-auto md:justify-end">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    {t.home.updated}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {t.home.resourceLibrary}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {t.home.resourceLibraryDesc}
                  </p>
                  <a
                    href="/recursos"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-l from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all group"
                  >
                    <ArrowRight className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform rotate-180" weight="bold" />
                    {t.home.exploreLibrary}
                  </a>
                </div>

                {/* Visual Decoration */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-400 to-orange-500 rounded-full dark:opacity-20 opacity-30 blur-3xl animate-pulse" />
                  <div className="relative z-10 grid grid-cols-2 gap-4 -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <Quotes className="w-12 h-12 text-orange-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.featuredResources.language}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <Calculator className="w-12 h-12 text-blue-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.featuredResources.math}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <Translate className="w-12 h-12 text-pink-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.featuredResources.english}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <GlobeHemisphereWest className="w-12 h-12 text-emerald-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.featuredResources.geography}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* JUEGOS SECTION */}
          <section className="w-full max-w-6xl mx-auto mt-32 relative z-10 px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-3xl blur-3xl -z-10" />

            <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 overflow-hidden relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold mb-4 border border-teal-500/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                    </span>
                    {t.home.trending}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {t.home.gamesHeroTitle}
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {t.home.gamesHeroDesc}
                  </p>
                  <a
                    href="/juegos"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all group"
                  >
                    {t.home.exploreGames}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </a>
                </div>

                {/* Visual Decoration */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full dark:opacity-20 opacity-30 blur-3xl animate-pulse" />
                  <div className="relative z-10 grid grid-cols-2 gap-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <MapTrifold className="w-12 h-12 text-teal-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.gameVisuals.map}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <Brain className="w-12 h-12 text-purple-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.gameVisuals.quiz}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <Trophy className="w-12 h-12 text-yellow-400 mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.gameVisuals.ranking}</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <GameController className="w-12 h-12 text-white mb-2" weight="duotone" />
                      <span className="text-xs font-bold text-white">{t.home.gameVisuals.play}</span>
                    </div>
                  </div>
                </div>
              </div>
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
          </footer>

        </div>
      </div>

    </main>
  );
}
