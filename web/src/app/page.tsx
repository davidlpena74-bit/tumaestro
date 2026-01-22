'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CarouselAutoScroll from '@/components/CarouselAutoScroll';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
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
          Tu futuro empieza aquí
        </h1>
        <p className="text-xl text-gray-100 mb-12 text-center max-w-2xl font-light drop-shadow-md">
          Elige cómo quieres aprender hoy
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
              <img src="/icons/mortarboard.svg" className="w-32 h-32 object-contain" alt="Profesores" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md z-10">Busco Profesor</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm z-10">
              Encuentra clases particulares presenciales u online con expertos verificados.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-teal-500 hover:text-white transition z-10">
              Ver Profesores
            </button>
          </div>

          {/* OPCIÓN B: MATERIAL DIDÁCTICO */}
          <div
            onClick={() => router.push('/recursos')}
            className="group bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="mb-6 transition duration-500 group-hover:scale-110 drop-shadow-2xl">
              <img src="/icons/library.svg" className="w-32 h-32 object-contain" alt="Recursos" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md z-10">Material Didáctico</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm z-10">
              Descarga apuntes, exámenes resueltos y ejercicios de refuerzo.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-orange-500 hover:text-white transition z-10">
              Explorar Recursos
            </button>
          </div>

          {/* OPCIÓN C: JUEGOS (NUEVA) */}
          <div
            onClick={() => router.push('/juegos')}
            className="group bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl cursor-pointer hover:bg-white/40 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="mb-6 transition duration-500 group-hover:scale-110 drop-shadow-2xl">
              <img src="/icons/game-controller.svg" className="w-32 h-32 object-contain" alt="Juegos" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md z-10">Aprende Jugando</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm z-10">
              Diviértete mientras aprendes geografía, matemáticas y cultura general.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-purple-500 hover:text-white transition z-10">
              Jugar Ahora
            </button>
          </div>

        </div>



        {/* Flecha */}
        <div className="absolute bottom-8 animate-bounce text-white/50 cursor-pointer" onClick={() => scrollTo('profesores')}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
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
                  <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md mb-4">Profesores Destacados</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">Clases particulares a tu medida</p>
                </div>
                <a href="/profesores" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all group">
                  Ver todos
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
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
                    ACTUALIZADO
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Biblioteca de Recursos
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Accede a una colección curada de apuntes, exámenes resueltos y guías de estudio. Todo organizado por materia y nivel educativo para maximizar tu rendimiento.
                  </p>
                  <a
                    href="/recursos"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-l from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    Explorar Biblioteca
                  </a>
                </div>

                {/* Visual Decoration */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-400 to-orange-500 rounded-full dark:opacity-20 opacity-30 blur-3xl animate-pulse" />
                  <div className="relative z-10 grid grid-cols-2 gap-4 -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <img src="/icons/language.svg" className="w-16 h-16 mb-2" alt="Lengua" />
                      <span className="text-xs font-bold text-white">Lengua</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <img src="/icons/math.svg" className="w-16 h-16 mb-2" alt="Mates" />
                      <span className="text-xs font-bold text-white">Mates</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <img src="/icons/english.svg" className="w-16 h-16 mb-2" alt="Inglés" />
                      <span className="text-xs font-bold text-white">Inglés</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <img src="/icons/geography.svg" className="w-16 h-16 mb-2" alt="Geografía" />
                      <span className="text-xs font-bold text-white">Geografía</span>
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
                    NUEVO
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Aprende Jugando
                  </h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Descubre nuestra nueva zona de juegos interactivos. Pon a prueba tus conocimientos de geografía y cultura general con retos diseñados para aprender divirtiéndote.
                  </p>
                  <a
                    href="/juegos"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all group"
                  >
                    Explorar Juegos
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                </div>

                {/* Visual Decoration */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full dark:opacity-20 opacity-30 blur-3xl animate-pulse" />
                  <div className="relative z-10 grid grid-cols-2 gap-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <img src="/icons/game-map.svg" className="w-16 h-16 mb-2" alt="Mapa" />
                      <span className="text-xs font-bold text-white">Mapa</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <img src="/icons/game-quiz.svg" className="w-16 h-16 mb-2" alt="Quiz" />
                      <span className="text-xs font-bold text-white">Quiz</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <img src="/icons/game-trophy.svg" className="w-16 h-16 mb-2" alt="Ranking" />
                      <span className="text-xs font-bold text-white">Ranking</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <img src="/icons/game-controller.svg" className="w-16 h-16 mb-2" alt="Jugar" />
                      <span className="text-xs font-bold text-white">Jugar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* FOOTER */}
          <footer className="w-full mt-24 py-8 border-t border-white/10 text-center relative z-10">
            <p className="text-white/60 text-sm mb-2">
              © 2026 TuMaestro.es. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-6 text-sm font-medium">
              <a href="/terminos" className="text-white/40 hover:text-white transition">Términos y Condiciones</a>
              <a href="/privacidad" className="text-white/40 hover:text-white transition">Política de Privacidad</a>
            </div>
          </footer>

        </div>
      </div>

    </main>
  );
}
