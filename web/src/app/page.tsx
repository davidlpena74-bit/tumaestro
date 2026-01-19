'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import CarouselAutoScroll from '@/components/CarouselAutoScroll';

export default function Home() {
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
          Tu futuro empieza aquí <span className="text-lg block font-mono font-normal opacity-70 mt-2 text-teal-300">(v0.4.1 Test)</span>
        </h1>
        <p className="text-xl text-gray-100 mb-12 text-center max-w-2xl font-light drop-shadow-md">
          Elige cómo quieres aprender hoy
        </p>

        {/* TARJETAS DE SELECCIÓN (GLASSMORPHISM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

          {/* OPCIÓN A: PROFESORES */}
          <div
            onClick={() => scrollTo('profesores')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl cursor-pointer hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="text-white/60 mb-6 transition duration-500 group-hover:scale-110 group-hover:text-teal-200">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
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
            onClick={() => scrollTo('material')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl cursor-pointer hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl relative overflow-hidden"
          >
            {/* Icono Watermark Background */}
            <div className="text-white/60 mb-6 transition duration-500 group-hover:scale-110 group-hover:text-orange-200">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md z-10">Material Didáctico</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm z-10">
              Descarga apuntes, exámenes resueltos y ejercicios de refuerzo.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-orange-500 hover:text-white transition z-10">
              Explorar Recursos
            </button>
          </div>

        </div>

        {/* Flecha */}
        <div className="absolute bottom-8 animate-bounce text-white/50 cursor-pointer" onClick={() => scrollTo('profesores')}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* 4. CONTENIDO (Ultra Glassmorphism) */}
      <div className="relative z-20 bg-white/20 backdrop-blur-3xl min-h-screen rounded-t-[3rem] px-6 py-20 -mt-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] border-t border-white/20">

        <div className="max-w-7xl mx-auto">

          {/* SECCIÓN PROFESORES */}
          <div id="profesores" className="scroll-mt-32 mb-24">
            <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">Profesores Destacados</h2>
                <p className="text-gray-100 mt-1 font-medium drop-shadow-sm">Clases particulares a tu medida</p>
              </div>
              <button className="text-white font-bold hover:underline drop-shadow-sm">Ver todos →</button>
            </div>

            <CarouselAutoScroll />
          </div>

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
                      <svg className="w-10 h-10 text-orange-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      <span className="text-xs font-bold text-white">Lengua</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      <span className="text-xs font-bold text-white">Mates</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <span className="text-2xl">🎓</span>
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
                      <svg className="w-10 h-10 text-teal-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-xs font-bold text-white">Mapa</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl mt-8">
                      <svg className="w-10 h-10 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      <span className="text-xs font-bold text-white">Quiz</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl -mt-8">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center aspect-square shadow-xl">
                      <span className="text-2xl">⚡</span>
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
