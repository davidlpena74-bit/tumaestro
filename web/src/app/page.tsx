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

      {/* 2. HEADER */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="relative flex items-center cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* LOGO TEXT with Hat */}
          <div className="relative text-white font-bold text-3xl tracking-tighter drop-shadow-2xl flex items-center group">
            {/* Hat Icon */}
            <div className="absolute -top-5 -left-4 text-teal-400 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 8l11 6 9-4.91V17h2V9L12 2zm0 2.18l7.27 3.96L12 12.13 4.73 8.16 12 4.18zM3.82 10.36l1.45.8v4.91c0 1.99 3.03 3.6 6.73 3.6s6.73-1.61 6.73-3.6v-4.91l1.45-.8V16c0 2.87-3.9 5-8.18 5s-8.18-2.13-8.18-5v-5.64z" /></svg>
            </div>
            TuMaestro<span className="text-teal-400">.es</span>
          </div>
        </div>
        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-teal-900 transition shadow-lg">
          Acceso Usuarios
        </button>
      </header>

      {/* 3. HERO: SPLIT GATEWAY */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] px-4">

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          Tu futuro empieza aquí
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
          <div id="material" className="scroll-mt-32">
            <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">Biblioteca de Recursos</h2>
                <p className="text-gray-100 mt-1 font-medium drop-shadow-sm">Material de estudio subido por profesores</p>
              </div>
              <button className="text-white font-bold hover:underline drop-shadow-sm">Ver biblioteca →</button>
            </div>

            {/* Grid de Materiales (Iconos Visuales) */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                {
                  title: "Historia",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  color: "text-white/30"
                },
                {
                  title: "Lengua",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  color: "text-white/30"
                },
                {
                  title: "Inglés",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>,
                  color: "text-white/30"
                },
                {
                  title: "Matemáticas",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                  color: "text-white/30"
                },
                {
                  title: "Física",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                  color: "text-white/30"
                },
                {
                  title: "Geografía",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  color: "text-white/30"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/40 hover:bg-white/20 transition cursor-pointer flex flex-col items-center text-center gap-4 group hover:-translate-y-1 duration-300">
                  <div className={`w-20 h-20 flex items-center justify-center transition duration-500 group-hover:scale-110 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-white text-sm drop-shadow-md group-hover:text-teal-200 transition">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>


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
