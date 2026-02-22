'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, RefreshCw, X, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface RatingSystemProps {
    activityId: string;
    onClose?: () => void;
}

export default function RatingSystem({ activityId, onClose }: RatingSystemProps) {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'submitting' | 'success' | 'error'>('idle');
    const [isEdit, setIsEdit] = useState(false);
    const [globalStats, setGlobalStats] = useState({ avg: 0, count: 0 });

    useEffect(() => {
        let isMounted = true;

        const fetchExistingRating = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session || !isMounted) return;

                if (isMounted) setStatus('loading');

                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('*')
                    .eq('activity_id', activityId)
                    .eq('user_id', session.user.id)
                    .maybeSingle();

                if (!isMounted) return;
                if (error) throw error;

                if (data) {
                    setRating(data.rating);
                    setComment(data.comment || '');
                    setIsEdit(true);
                }
            } catch (err: any) {
                if (err?.name === 'AbortError') return; // Expected in React StrictMode
                if (isMounted) console.error('Error fetching existing rating:', err);
            } finally {
                if (isMounted) setStatus('idle');
            }
        };

        const fetchGlobalStats = async () => {
            try {
                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('rating')
                    .eq('activity_id', activityId);

                if (!isMounted) return;
                if (error) throw error;

                if (data) {
                    const count = data.length;
                    const avg = count > 0 ? (data.reduce((acc, curr) => acc + curr.rating, 0) / count).toFixed(1) : 0;
                    if (isMounted) setGlobalStats({ avg: Number(avg), count });
                }
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
                if (isMounted) console.error('Error fetching global stats:', err);
            }
        };

        fetchExistingRating();
        fetchGlobalStats();

        return () => { isMounted = false; };
    }, [activityId]);

    const handleSubmit = async () => {
        if (rating === 0) return;
        setStatus('submitting');

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const { error: submitError } = await supabase.from('activity_ratings').upsert({
                activity_id: activityId,
                rating,
                comment,
                user_id: session.user.id,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,activity_id'
            });

            if (submitError) throw submitError;
            setStatus('success');
            if (onClose) setTimeout(onClose, 2000);
        } catch (err) {
            console.error('Error submitting rating:', err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 px-6"
            >
                <div className="bg-emerald-500/20 p-4 rounded-full mb-6">
                    <CheckCircle className="w-16 h-16 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{isEdit ? '¡Valoración actualizada!' : '¡Gracias por tu valoración!'}</h3>
                <p className="text-slate-400 text-center">Tu opinión nos ayuda a mejorar Antigravity.</p>
            </motion.div>
        );
    }

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6">
                <RefreshCw className="w-12 h-12 text-yellow-500 animate-spin mb-4" />
                <p className="text-slate-400">Cargando tu valoración...</p>
            </div>
        );
    }

    return (
        <div className="w-full relative px-2 py-8">
            {onClose && (
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
            )}

            <h3 className="text-4xl font-bold text-white mb-4 text-center mt-6 whitespace-nowrap tracking-tight">
                {isEdit ? 'Modifica tu experiencia' : '¿Cómo va tu experiencia?'}
            </h3>
            <p className="text-xl text-slate-400 text-center mb-6">
                {isEdit ? 'Puedes actualizar tu puntuación y comentario.' : 'Cuéntanos qué te parece esta actividad.'}
            </p>

            {globalStats.count > 0 && (
                <div className="flex justify-center gap-6 mb-8 text-center">
                    <div>
                        <div className="text-2xl font-black text-white leading-none">{globalStats.avg}</div>
                        <div className="flex items-center gap-0.5 mt-1 justify-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s} size={10}
                                    className={s <= Math.round(globalStats.avg) ? "fill-yellow-400 text-yellow-400" : "text-slate-600 fill-transparent"}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div>
                        <div className="text-2xl font-black text-white leading-none">{globalStats.count}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Opiniones</div>
                    </div>
                </div>
            )}

            <div className="flex justify-center gap-3 mb-10">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                    >
                        <Star className={`w-12 h-12 transition-all duration-200 ${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" : "text-slate-600 fill-transparent"}`} />
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {rating > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Déjanos un comentario o cuéntanos si has encontrado algún fallo..."
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 outline-none transition-all mb-6 min-h-[120px] resize-none"
                        />
                        <div className="flex gap-4 mb-6">
                            {onClose && <button onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-widest">CANCELAR</button>}
                            <button
                                onClick={handleSubmit} disabled={status === 'submitting'}
                                className="flex-[2] bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-extrabold py-4 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                            >
                                {status === 'submitting' ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>{isEdit ? 'ACTUALIZAR' : 'ENVIAR VALORACIÓN'} <Send className="w-4 h-4" /></>}
                            </button>
                        </div>

                        {globalStats.count > 0 && (
                            <Link
                                href={`/actividades/valoraciones/${activityId}`}
                                className="flex items-center justify-center gap-2 text-slate-500 hover:text-yellow-400 transition-all font-bold text-xs uppercase tracking-[0.2em] group"
                            >
                                <MessageSquare className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                Ver todas las opiniones
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
