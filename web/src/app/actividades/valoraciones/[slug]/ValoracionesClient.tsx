'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, ChatCircleText, ArrowLeft, User, CalendarBlank, GameController } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import ContentWrapper from '@/components/ContentWrapper';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Rating {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    user_id: string;
    profiles?: {
        full_name: string;
        avatar_url: string;
    }
}

export default function ValoracionesClient({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ avg: 0, count: 0 });

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select(`
                        id,
                        rating,
                        comment,
                        created_at,
                        user_id,
                        profiles (
                            full_name,
                            avatar_url
                        )
                    `)
                    .eq('activity_id', slug)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Supabase error context:', JSON.stringify({
                        code: error.code,
                        message: error.message,
                        details: error.details,
                        hint: error.hint,
                        slug
                    }, null, 2));
                    throw error;
                }

                if (data) {
                    const formattedRatings = data.map((r: any) => ({
                        ...r,
                        profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles
                    }));
                    setRatings(formattedRatings);
                    const count = data.length;
                    const avg = count > 0 ? (data.reduce((acc: number, curr: any) => acc + curr.rating, 0) / count).toFixed(1) : 0;
                    setStats({ avg: Number(avg), count });
                }
            } catch (err: any) {
                console.error('Error fetching ratings in ValoracionesClient:', err.message || err);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [slug]);

    return (
        <main className="min-h-screen">
            <Header />
            <PageBackground />

            <ContentWrapper className="pt-28 pb-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/actividades"
                                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all cursor-pointer"
                            >
                                <ArrowLeft size={24} weight="bold" />
                            </Link>

                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                                    Valoraciones
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <GameController weight="bold" />
                                        {slug}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {stats.count > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-slate-800">{stats.avg}</div>
                                    <div className="flex items-center gap-0.5 mt-1 justify-center">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={14}
                                                weight={s <= Math.round(stats.avg) ? "fill" : "bold"}
                                                className={s <= Math.round(stats.avg) ? "text-yellow-400" : "text-slate-200"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div>
                                    <div className="text-2xl font-black text-slate-800">{stats.count}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Opiniones</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ratings List */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando comentarios...</p>
                        </div>
                    ) : ratings.length > 0 ? (
                        <div className="grid gap-6">
                            {ratings.map((rating, index) => (
                                <motion.div
                                    key={rating.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 overflow-hidden shadow-inner">
                                                {rating.profiles?.avatar_url ? (
                                                    <img src={rating.profiles.avatar_url} alt={rating.profiles.full_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={24} weight="bold" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-800">{rating.profiles?.full_name || 'Usuario de TuMaestro'}</div>
                                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                                    <CalendarBlank size={12} weight="bold" />
                                                    {new Date(rating.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 w-fit h-fit">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    size={18}
                                                    weight={s <= rating.rating ? "fill" : "bold"}
                                                    className={s <= rating.rating ? "text-yellow-400" : "text-slate-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {rating.comment ? (
                                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                            "{rating.comment}"
                                        </p>
                                    ) : (
                                        <p className="text-slate-400 italic font-medium">
                                            El usuario no dejó ningún comentario.
                                        </p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ChatCircleText size={40} className="text-slate-300" weight="bold" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Aún no hay valoraciones</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">
                                ¡Sé el primero en jugar esta actividad y dejarnos tu opinión!
                            </p>
                            <Link
                                href={`/actividades/${slug}`}
                                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95"
                            >
                                <GameController size={20} weight="bold" />
                                Jugar Ahora
                            </Link>
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </main>
    );
}
