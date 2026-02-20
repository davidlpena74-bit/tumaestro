'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChatCircleText, ArrowLeft, GameController, CalendarBlank, User, Trash, ArrowSquareOut } from '@phosphor-icons/react';
import Link from 'next/link';
import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import ContentWrapper from '@/components/ContentWrapper';
import { cn } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface UserRating {
    id: string;
    activity_id: string;
    rating: number;
    comment: string;
    created_at: string;
}

export default function MyRatingsClient() {
    const { t } = useLanguage();
    const { success, error: toastError } = useToast();
    const [ratings, setRatings] = useState<UserRating[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    window.location.href = '/';
                    return;
                }
                setUser(session.user);

                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setRatings(data);
            } catch (err: any) {
                console.error('Error fetching user ratings:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRatings();
    }, []);

    const handleDeleteRating = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta valoración?')) return;

        try {
            const { error } = await supabase
                .from('activity_ratings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setRatings(prev => prev.filter(r => r.id !== id));
            success('Valoración eliminada correctamente.');
        } catch (err: any) {
            toastError('Error al eliminar la valoración: ' + err.message);
        }
    };

    return (
        <main className="min-h-screen">
            <Header />
            <PageBackground />

            <ContentWrapper className="pt-28 pb-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="flex items-center gap-6 mb-12">
                        <Link
                            href="/perfil"
                            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all cursor-pointer"
                        >
                            <ArrowLeft size={24} weight="bold" />
                        </Link>

                        <div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                                Mis Valoraciones
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">
                                Gestiona todas las opiniones que has compartido sobre las actividades.
                            </p>
                        </div>
                    </div>

                    {/* Ratings List */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando tus valoraciones...</p>
                        </div>
                    ) : ratings.length > 0 ? (
                        <div className="grid gap-6">
                            <AnimatePresence mode="popLayout">
                                {ratings.map((rating, index) => (
                                    <motion.div
                                        key={rating.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                                                        <GameController size={24} weight="fill" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-slate-800 capitalize tracking-tight flex items-center gap-2">
                                                            {rating.activity_id.replace(/-/g, ' ')}
                                                            <Link
                                                                href={`/actividades/${rating.activity_id}`}
                                                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-emerald-500 transition-all"
                                                            >
                                                                <ArrowSquareOut size={18} />
                                                            </Link>
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                                            <CalendarBlank size={12} weight="bold" />
                                                            {new Date(rating.created_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-1 mb-4">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star
                                                            key={s}
                                                            size={20}
                                                            weight={s <= rating.rating ? "fill" : "bold"}
                                                            className={s <= rating.rating ? "text-yellow-400" : "text-slate-200"}
                                                        />
                                                    ))}
                                                </div>

                                                {rating.comment ? (
                                                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                                        "{rating.comment}"
                                                    </p>
                                                ) : (
                                                    <p className="text-slate-400 italic font-medium">
                                                        No incluiste ningún comentario.
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex md:flex-col items-center justify-center gap-3">
                                                <Link
                                                    href={`/actividades/${rating.activity_id}`}
                                                    className="w-full md:w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-500 transition-all border border-slate-100"
                                                    title="Editar valoración (ir a la actividad)"
                                                >
                                                    <GameController size={24} weight="bold" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteRating(rating.id)}
                                                    className="w-full md:w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                                                    title="Eliminar valoración"
                                                >
                                                    <Trash size={24} weight="bold" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ChatCircleText size={40} className="text-slate-300" weight="bold" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">No has valorado ninguna actividad</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">
                                ¡Tus opiniones ayudan a otros alumnos y a los maestros a mejorar el contenido!
                            </p>
                            <Link
                                href="/actividades"
                                className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95"
                            >
                                <GameController size={20} weight="bold" />
                                Explorar Actividades
                            </Link>
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </main>
    );
}
