'use client';

import { useEffect, useRef, useState } from 'react';

export default function CarouselAutoScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const getSubjectIcon = (subjectName: string) => {
        switch (subjectName) {
            case 'Matemáticas':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
            case 'Inglés':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>;
            case 'Física':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
            case 'Programación':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
            case 'Química':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
            case 'Historia':
                return <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            default:
                return null;
        }
    };

    const courses = [
        { id: 1, teacher: { full_name: 'Ana García' }, subject: { name: 'Matemáticas' }, title: 'Clases de Cálculo y Álgebra para universitarios', price_per_hour: 25 },
        { id: 2, teacher: { full_name: 'Carlos Ruiz' }, subject: { name: 'Inglés' }, title: 'Preparación C1/C2 Cambridge y conversación', price_per_hour: 20 },
        { id: 3, teacher: { full_name: 'María López' }, subject: { name: 'Física' }, title: 'Física para Bachillerato y Selectividad', price_per_hour: 22 },
        { id: 4, teacher: { full_name: 'David Pena' }, subject: { name: 'Programación' }, title: 'Aprende React, Next.js y Tailwind desde cero', price_per_hour: 30 },
        { id: 5, teacher: { full_name: 'Laura B.' }, subject: { name: 'Química' }, title: 'Refuerzo de Química general y orgánica', price_per_hour: 18 },
        { id: 6, teacher: { full_name: 'Javier M.' }, subject: { name: 'Historia' }, title: 'Historia de España para EBAU', price_per_hour: 15 },
    ];

    // Duplicar array para loop infinito fluido
    const displayCourses = [...courses, ...courses, ...courses];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && container) {
                container.scrollLeft += 1; // Velocidad de scroll (0.5 o 1)

                // Resetear cuando llega a la mitad (punto de loop)
                // La lista es [A, B, C] repetida 3 veces. 
                // Si llegamos al final del set 2, volvemos al inicio del set 2 para que sea imperceptible.
                if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
                    container.scrollLeft = container.scrollWidth / 3;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden pb-8 whitespace-nowrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {displayCourses.map((course, index) => (
                <div key={`${course.id}-${index}`} className="min-w-[280px] w-[280px] inline-block bg-white/40 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition group overflow-hidden border border-white/30 hover:bg-white/60 whitespace-normal text-left">
                    <div className="h-48 bg-white/30 flex items-center justify-center relative group-hover:bg-teal-900/10 transition duration-500">
                        {/* Avatar por Iniciales */}
                        <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg transform group-hover:scale-110 transition duration-500 border-4 border-white/30">
                            {course.teacher?.full_name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'TM'}
                        </div>

                        <div className="absolute top-3 left-3 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20 backdrop-blur-sm">
                            {course.subject?.name}
                        </div>

                        {/* Icono de Materia Transparente */}
                        <div className="absolute top-3 right-3 text-white/20 transform scale-150 rotate-12">
                            {getSubjectIcon(course.subject?.name)}
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-0.5 drop-shadow-sm truncate">{course.teacher?.full_name}</h3>
                        {/* Estrellas Mock */}
                        <div className="flex items-center gap-1 mb-3">
                            <span className="text-yellow-400 text-sm drop-shadow-sm">★★★★★</span>
                            <span className="text-gray-800 text-xs font-bold">(NUEVO)</span>
                        </div>
                        <p className="text-gray-800 text-sm line-clamp-2 mb-4 font-medium h-10 leading-tight">{course.title}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-900/10">
                            <span className="font-bold text-xl text-gray-900">{course.price_per_hour}€</span>
                            <button className="text-teal-900 font-bold text-sm bg-white/50 px-3 py-1.5 rounded-lg hover:bg-white/80 transition border border-white/40 shadow-sm">Perfil</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
