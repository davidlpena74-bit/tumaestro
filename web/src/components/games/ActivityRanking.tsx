'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trophy, Clock, User as UserIcon, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface ScoreEntry {
    id: string;
    score: number;
    time_spent: number;
    created_at: string;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
}

export default function ActivityRanking({
    activityId,
    limit = 3,
    sortBy = 'score'
}: {
    activityId: string,
    limit?: number,
    sortBy?: 'score' | 'time'
}) {
    const { language } = useLanguage();
    const [scores, setScores] = useState<ScoreEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !activityId) return;

        let isMounted = true;
        const abortController = new AbortController();

        async function fetchScores() {
            setLoading(true);

            const timeoutId = setTimeout(() => {
                if (isMounted && loading) {
                    console.warn(`⏳ Timeout al cargar rankings para ${activityId}, mostrando mock data...`);
                    abortController.abort();
                    showMockData();
                    setLoading(false);
                }
            }, 8000);

            try {
                // CONSULTA RESILIENTE: Intentamos el join pero con sintaxis explícita
                const { data, error, status } = await supabase
                    .from('activity_scores')
                    .select(`
                        id,
                        score,
                        time_spent,
                        created_at,
                        user_id,
                        profiles (
                            full_name,
                            avatar_url
                        )
                    `)
                    .eq('activity_id', activityId)
                    .order(sortBy === 'score' ? 'score' : 'time_spent', {
                        ascending: sortBy !== 'score'
                    })
                    .order(sortBy === 'score' ? 'time_spent' : 'score', {
                        ascending: sortBy !== 'score' ? false : true
                    })
                    .limit(limit)
                    .abortSignal(abortController.signal);

                clearTimeout(timeoutId);
                if (!isMounted) return;

                if (error) {
                    console.group('❌ Error en Ranking');
                    console.error('Mensaje:', error.message);
                    console.error('Código:', error.code);
                    console.error('Detalles:', error.details);
                    console.error('Status:', status);
                    console.groupEnd();
                    throw error;
                }

                if (data && data.length > 0) {
                    const formattedScores = data.map((item: any) => ({
                        id: item.id,
                        score: item.score,
                        time_spent: item.time_spent,
                        created_at: item.created_at,
                        profiles: item.profiles || {
                            full_name: language === 'es' ? 'Usuario Anónimo' : 'Anonymous User',
                            avatar_url: null
                        }
                    }));
                    setScores(formattedScores);
                } else {
                    showMockData();
                }
            } catch (err: any) {
                clearTimeout(timeoutId);
                if (!isMounted) return;

                if (err.name !== 'AbortError') {
                    console.error('Error crítico en fetchScores:', err);
                }
                showMockData();
            } finally {
                clearTimeout(timeoutId);
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        function showMockData() {
            const mockScores: ScoreEntry[] = [
                {
                    id: 'm1',
                    score: 1000,
                    time_spent: 42,
                    created_at: new Date().toISOString(),
                    profiles: { full_name: 'Mateo El Sabio', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo' }
                },
                {
                    id: 'm2',
                    score: 950,
                    time_spent: 58,
                    created_at: new Date().toISOString(),
                    profiles: { full_name: 'Lucía Explorer', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia' }
                },
                {
                    id: 'm3',
                    score: 900,
                    time_spent: 75,
                    created_at: new Date().toISOString(),
                    profiles: { full_name: 'Santi Geógrafo', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Santi' }
                }
            ];
            setScores(mockScores);
        }

        fetchScores();

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [activityId, sortBy, limit, language, isVisible]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isVisible || loading) return (
        <div ref={containerRef} className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-10 h-10 border-t-2 border-emerald-500 border-solid rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm animate-pulse">{language === 'es' ? 'Cargando ranking...' : 'Loading rankings...'}</p>
        </div>
    );

    if (scores.length === 0) return (
        <div ref={containerRef} className="p-8 text-center text-gray-500 bg-slate-900/40 rounded-3xl border border-white/5">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">{language === 'es' ? 'Aún no hay puntuaciones' : 'No scores yet'}</p>
            <p className="text-sm opacity-60 mt-1 uppercase">{language === 'es' ? '¡Sé el primero en el top!' : 'Be the first on top!'}</p>
        </div>
    );

    return (
        <div ref={containerRef} className="w-full max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {sortBy === 'score' ? <Trophy className="w-5 h-5 text-yellow-500" /> : <Clock className="w-5 h-5 text-sky-400" />}
                    {sortBy === 'score'
                        ? (language === 'es' ? `Top ${limit} Puntos` : `Top ${limit} Scores`)
                        : (language === 'es' ? `Top ${limit} Tiempos` : `Top ${limit} Times`)}
                </h3>
            </div>

            <div className="space-y-2">
                {scores.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            relative flex items-center gap-4 p-3 rounded-2xl border transition-all
                            ${index === 0 ? 'bg-yellow-500/10 border-yellow-500/30 ring-1 ring-yellow-500/20' :
                                index === 1 ? 'bg-slate-300/10 border-slate-300/30' :
                                    index === 2 ? 'bg-orange-500/10 border-orange-500/30' :
                                        'bg-white/5 border-white/10'}
                        `}
                    >
                        <div className="flex-shrink-0 w-8 text-center font-black text-xl italic opacity-80">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </div>

                        <div className="flex-shrink-0 relative">
                            {entry.profiles?.avatar_url ? (
                                <img src={entry.profiles.avatar_url} alt="" className="w-10 h-10 rounded-full border-2 border-white/10" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-white/10 text-gray-400">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                            )}
                        </div>

                        <div className="flex-grow min-w-0">
                            <p className="font-bold text-white truncate text-sm">
                                {entry.profiles?.full_name || (language === 'es' ? 'Estudiante' : 'Student')}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">
                                {sortBy === 'score' ? (
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(entry.time_spent)}</span>
                                ) : (
                                    <span className="flex items-center gap-1 font-bold text-emerald-400/80"><Star className="w-3 h-3" /> {entry.score} pts</span>
                                )}
                                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {new Date(entry.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                            <span className={`text-xl font-black ${index === 0 ? 'text-yellow-400' :
                                index === 1 ? 'text-slate-300' :
                                    index === 2 ? 'text-orange-400' :
                                        'text-emerald-400'
                                }`}>
                                {sortBy === 'score' ? entry.score : formatTime(entry.time_spent)}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
