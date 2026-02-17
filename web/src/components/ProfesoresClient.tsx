'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BookOpen, GraduationCap, Sparkle, ChalkboardTeacher, MonitorPlay, ChartLineUp } from '@phosphor-icons/react';

export default function ProfesoresClient() {
    const [role, setRole] = useState<'teacher' | 'student' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                setRole(profile?.role as 'teacher' | 'student' || 'student');
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    // Content Definitions based on Role
    const content = {
        teacher: {
            mainTitle: "Para Profesores",
            mainDesc: "Potencia tu enseñanza con herramientas digitales diseñadas para ahorrar tiempo y mejorar el aprendizaje de tus alumnos.",
            s1: {
                badge: "Gestión Eficiente",
                title: "Clases y Alumnos",
                desc: "Crea tus propias clases y gestiona los alumnos y tareas dentro de ellas de forma sencilla y centralizada.",
                cta: "GESTIONAR MIS CLASES",
                link: "/dashboard"
            },
            s2: {
                badge: "Personalización Total",
                title: "Actividades Propias",
                desc: "Crea tus propias actividades, súbelas y asígnalas a tus alumnos con un solo clic. Mantén todo organizado.",
                cta: "CREAR ACTIVIDADES",
                link: "/dashboard"
            },
            s3: {
                badge: "Análisis Inteligente",
                title: "Reportes de Progreso",
                desc: "Visualiza el resultado y utiliza nuestros reportes automáticos para identificar áreas de refuerzo y mejorar el rendimiento.",
                cta: "VER REPORTES",
                link: "/dashboard"
            },
            s4: {
                badge: "Biblioteca Premium",
                title: "Recursos Didácticos",
                desc: "Usa todos nuestros recursos didácticos, contenidos temáticos, cuentos y juegos para enriquecer tus clases sin esfuerzo extra.",
                cta: "EXPLORAR RECURSOS",
                link: "/material"
            }
        },
        student: {
            mainTitle: "Para Alumnos",
            mainDesc: "Domina tus estudios con herramientas diseñadas para organizarte, practicar y mejorar tus notas día a día.",
            s1: {
                badge: "Tu Espacio",
                title: "Mis Clases",
                desc: "Accede a tus asignaturas, consulta horarios y conecta con tus profesores y compañeros de clase.",
                cta: "IR A MI CLASE",
                link: "/dashboard"
            },
            s2: {
                badge: "Tareas Pendientes",
                title: "Actividades y Deberes",
                desc: "Revisa las actividades asignadas por tus profesores, complétalas y envíalas directamente desde la plataforma.",
                cta: "VER MIS TAREAS",
                link: "/dashboard"
            },
            s3: {
                badge: "Mi Evolución",
                title: "Mi Progreso",
                desc: "Consulta tus calificaciones, revisa tu historial de actividades y celebra tus logros académicos.",
                cta: "VER MI PROGRESO",
                link: "/dashboard"
            },
            s4: {
                badge: "Apoyo Escolar",
                title: "Material de Estudio",
                desc: "Accede a una biblioteca de recursos, juegos y cuentos para reforzar lo aprendido en clase de forma divertida.",
                cta: "BUSCAR MATERIAL",
                link: "/material"
            }
        },
        guest: {
            mainTitle: "Para Profesores",
            mainDesc: "Potencia tu enseñanza con herramientas digitales diseñadas para ahorrar tiempo y mejorar el aprendizaje de tus alumnos.",
            s1: {
                badge: "Gestión Eficiente",
                title: "Clases y Alumnos",
                desc: "Crea tus propias clases y gestiona los alumnos y tareas dentro de ellas de forma sencilla y centralizada.",
                cta: "EMPEZAR AHORA",
                link: "/registro"
            },
            s2: {
                badge: "Personalización Total",
                title: "Actividades Propias",
                desc: "Crea tus propias actividades, súbelas y asígnalas a tus alumnos con un solo clic. Mantén todo organizado.",
                cta: "CREAR CUENTA",
                link: "/registro"
            },
            s3: {
                badge: "Análisis Inteligente",
                title: "Reportes de Progreso",
                desc: "Visualiza el resultado y utiliza nuestros reportes automáticos para identificar áreas de refuerzo y mejorar el rendimiento.",
                cta: "VER DEMOSTRACIÓN",
                link: "/registro"
            },
            s4: {
                badge: "Biblioteca Premium",
                title: "Recursos Didácticos",
                desc: "Usa todos nuestros recursos didácticos, contenidos temáticos, cuentos y juegos para enriquecer tus clases sin esfuerzo extra.",
                cta: "EXPLORAR RECURSOS",
                link: "/material"
            }
        }
    };

    const t = role ? content[role] : content.guest;

    if (loading) return (
        <div className="min-h-screen pt-32 flex justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
        </div>
    );

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
                        {t.mainTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        {t.mainDesc}
                    </motion.p>
                </header>

                <div className="flex flex-col gap-24">
                    {/* SECCIÓN GESTIÓN DE CLASES */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] group-hover:bg-teal-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(20,184,166,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(20,184,166,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-teal-500/20 rounded-3xl blur-2xl group-hover/img:bg-teal-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <ChalkboardTeacher className="w-32 h-32 text-white/90" weight="duotone" />
                                            {/* Floating Particles/Icons */}
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute -top-4 -right-4 p-3 bg-white rounded-2xl shadow-xl text-teal-600"
                                            >
                                                <GraduationCap className="w-8 h-8" weight="fill" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-600 text-xs font-black mb-6 border border-teal-500/20 uppercase tracking-widest">
                                        {t.s1.badge}
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        {t.s1.title}
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        {t.s1.desc}
                                    </p>

                                    <Link
                                        href={t.s1.link}
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        {t.s1.cta}
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN ACTIVIDADES Y TAREAS */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/10 to-blue-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(99,102,241,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl blur-2xl group-hover/img:bg-indigo-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <MonitorPlay className="w-32 h-32 text-white/90" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-black mb-6 border border-indigo-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        {t.s2.badge}
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            {t.s2.title}
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            {t.s2.desc}
                                        </p>

                                        <Link
                                            href={t.s2.link}
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            {t.s2.cta}
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN REPORTES Y SEGUIMIENTO */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] group-hover:bg-rose-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(244,63,94,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(244,63,94,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-rose-500/20 rounded-3xl blur-2xl group-hover/img:bg-rose-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <ChartLineUp className="w-32 h-32 text-white/90" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-black mb-6 border border-rose-500/20 uppercase tracking-widest">
                                        {t.s3.badge}
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                        {t.s3.title}
                                    </h2>
                                    <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                        {t.s3.desc}
                                    </p>

                                    <Link
                                        href={t.s3.link}
                                        className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                    >
                                        {t.s3.cta}
                                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN RECURSOS DIDÁCTICOS */}
                    <section className="w-full max-w-6xl mx-auto relative z-10 scroll-mt-32">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl blur-3xl -z-10" />

                        <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Decorative Glow */}
                            <div className="absolute -right-24 -top-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] group-hover:bg-amber-500/20 transition-all duration-700" />

                            <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative z-10">
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <motion.div
                                        initial={{ filter: 'drop-shadow(0 0 0px rgba(245,158,11,0))', scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ filter: 'drop-shadow(0 0 40px rgba(245,158,11,0.4))', scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative group/img"
                                    >
                                        <div className="absolute inset-0 bg-amber-500/20 rounded-3xl blur-2xl group-hover/img:bg-amber-500/30 transition-all -z-10" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-3xl border-4 border-white/50 shadow-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500 relative">
                                            <Sparkle className="w-32 h-32 text-white/90" weight="duotone" />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full md:w-2/3 text-center md:text-right">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-black mb-6 border border-amber-500/20 uppercase tracking-widest md:flex-row-reverse">
                                        {t.s4.badge}
                                    </div>

                                    <div className="flex flex-col md:items-end w-full">
                                        <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
                                            {t.s4.title}
                                        </h2>
                                        <p className="text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-2xl">
                                            {t.s4.desc}
                                        </p>

                                        <Link
                                            href={t.s4.link}
                                            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all group active:scale-95"
                                        >
                                            {t.s4.cta}
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
