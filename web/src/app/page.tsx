'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4">
        <div className="text-white font-bold text-2xl tracking-tight flex items-center gap-2">
          TuMaestro
        </div>
        <div className="flex gap-4">
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold text-sm">
            Acceso Usuarios
          </button>
        </div>
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
            className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl cursor-pointer hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-500/40 transition">
              <span className="text-4xl">🎓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Busco Profesor</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm">
              Encuentra clases particulares presenciales u online con expertos verificados.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-teal-500 hover:text-white transition">
              Ver Profesores
            </button>
          </div>

          {/* OPCIÓN B: MATERIAL DIDÁCTICO */}
          <div
            onClick={() => scrollTo('material')}
            className="group bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl cursor-pointer hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 text-center flex flex-col items-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500/40 transition">
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Material Didáctico</h2>
            <p className="text-gray-200 text-sm mb-6 max-w-xs drop-shadow-sm">
              Descarga apuntes, exámenes resueltos y ejercicios de refuerzo.
            </p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm w-full max-w-[200px] hover:bg-orange-500 hover:text-white transition">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {courses.map(course => (
                <div key={course.id} className="bg-white/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition group overflow-hidden border border-white/30 hover:bg-white/60">
                  <div className="h-48 bg-white/30 flex items-center justify-center relative group-hover:bg-teal-900/10 transition duration-500">
                    {/* Avatar por Iniciales */}
                    <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg transform group-hover:scale-110 transition duration-500 border-4 border-white/30">
                      {course.teacher?.full_name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'TM'}
                    </div>

                    <div className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20 backdrop-blur-sm">
                      {course.subject?.name}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-0.5 drop-shadow-sm">{course.teacher?.full_name}</h3>
                    {/* Estrellas Mock */}
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400 text-sm drop-shadow-sm">★★★★★</span>
                      <span className="text-gray-800 text-xs font-bold">(NUEVO)</span>
                    </div>
                    <p className="text-gray-800 text-sm line-clamp-2 mb-4 font-medium">{course.title}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-900/10">
                      <span className="font-bold text-xl text-gray-900">{course.price_per_hour}€</span>
                      <button className="text-teal-900 font-bold text-sm bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white/80 transition border border-white/40 shadow-sm">Perfil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                // 1. Historia (PDF)
                {
                  title: "Resúmenes Historia",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                  color: "bg-red-100 text-red-600"
                },
                // 2. Mates (Calculadora/Regla)
                {
                  title: "Ejercicios Integrales",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                  color: "bg-blue-100 text-blue-600"
                },
                // 3. Inglés (Mundo/Globo)
                {
                  title: "Vocabulario Inglés B2",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  color: "bg-green-100 text-green-600"
                },
                // 4. Física (Examen/Clipboard)
                {
                  title: "Exámenes Física 2024",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
                  color: "bg-purple-100 text-purple-600"
                },
                // 5. Lengua (Libro/Teoría)
                {
                  title: "Sintaxis Lengua",
                  icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
                  color: "bg-yellow-100 text-yellow-600"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/30 hover:border-orange-300 hover:bg-white/60 hover:shadow-lg transition cursor-pointer flex flex-col items-center text-center gap-3 group">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${item.color} group-hover:scale-110 transition duration-300`}>
                    <div className="w-6 h-6">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm drop-shadow-sm">{item.title}</h4>
                  <span className="text-xs text-orange-800 font-bold bg-orange-100/50 px-2 py-0.5 rounded-full border border-orange-200/50">Descargar</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
