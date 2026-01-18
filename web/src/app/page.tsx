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

  return (
    <main className="relative min-h-screen font-sans">

      {/* 1. BACKGROUND VIDEO (Fixed & Parallax) */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay un poco más suave */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Video Local Subido por el Usuario */}
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. HEADER TRANSPARENTE */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300">
        <div className="text-white font-bold text-2xl tracking-tight">TuMaestro</div>
        <div className="flex gap-4">
          <button className="text-white font-medium hover:text-teal-300 transition">Dar clases</button>
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
            Entrar
          </button>
        </div>
      </header>

      {/* 3. HERO CONTENT (Scrollable but transparent initially) */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-center px-4 pb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
          Aprende sin límites.
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
          Conecta con los mejores profesores particulares y domina cualquier materia.
        </p>

        {/* BUSCADOR HERO */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 transform hover:scale-[1.01] transition duration-500">
          <div className="flex-1 px-6 flex items-center h-14 border-b md:border-b-0 md:border-r border-gray-200">
            <span className="text-xl mr-3">🔍</span>
            <input className="w-full h-full bg-transparent outline-none text-gray-800 placeholder-gray-500" placeholder="¿Qué quieres aprender?" />
          </div>
          <div className="flex-1 px-6 flex items-center h-14">
            <span className="text-xl mr-3">📍</span>
            <input className="w-full h-full bg-transparent outline-none text-gray-800 placeholder-gray-500" placeholder="¿Dónde? (Online o Ciudad)" />
          </div>
          <button className="bg-[#00AA98] hover:bg-[#008C7D] text-white px-10 py-3 rounded-full font-bold text-lg shadow-lg md:w-auto w-full transition">
            Buscar
          </button>
        </div>

        {/* Flecha indicadora */}
        <div className="absolute bottom-10 animate-bounce text-white/70">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* 4. CONTENIDO BLANCO (Sube y tapa el video) */}
      <div className="relative z-20 bg-white min-h-screen rounded-t-[3rem] -mt-10 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] px-6 py-20">

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Profesores verificados cerca de ti</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Explora entre miles de perfiles, lee opiniones reales y contacta sin compromiso.</p>
          </div>

          {/* LISTA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map(course => (
              <div key={course.id} className="group cursor-pointer">
                {/* Imagen Grande (Estilo Airbnb/Instagram) */}
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-gray-100">
                  <img
                    src={course.teacher?.avatar_url || `https://ui-avatars.com/api/?name=${course.teacher?.full_name}&background=random&size=500`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  {/* Badge Precio */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                    {course.price_per_hour}€<span className="text-xs font-normal text-gray-500">/h</span>
                  </div>
                  {/* Badge Materia */}
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {course.subject?.name}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#00AA98] transition">{course.teacher?.full_name}</h3>
                    <div className="flex items-center text-xs font-bold text-yellow-500">★ 5.0</div>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 mt-1">{course.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </main>
  );
}
