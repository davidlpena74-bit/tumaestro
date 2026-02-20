'use client';

import { useState, useEffect } from 'react';
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

export default function ActivityRanking({ activityId }: { activityId: string }) {
    const { language } = useLanguage();
    const [scores, setScores] = useState<ScoreEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchScores() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('activity_scores')
                    .select(`
                        id,
                        score,
                        time_spent,
                        created_at,
                        profiles!user_id (
                            full_name,
                            avatar_url
                        )
                    `)
                    .eq('activity_id', activityId)
                    .order('score', { ascending: false })
                    .order('time_spent', { ascending: true })
                    .limit(10);

                if (error) throw error;
                setScores((data as any) || []);
            } catch (err: any) {
                console.error('Error fetching rankings:', err);
            } finally {
                setLoading(false);
            }
        }

        if (activityId) fetchScores();
    }, [activityId]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-10 h-10 border-t-2 border-emerald-500 border-solid rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm animate-pulse">{language === 'es' ? 'Cargando ranking...' : 'Loading rankings...'}</p>
        </div>
    );

    if (scores.length === 0) return (
        <div className="p-8 text-center text-gray-500 bg-slate-900/40 rounded-3xl border border-white/5">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium">{language === 'es' ? 'Aún no hay puntuaciones' : 'No scores yet'}</p>
            <p className="text-sm opacity-60 mt-1 uppercase">{language === 'es' ? '¡Sé el primero en el top!' : 'Be the first on top!'}</p>
        </div>
    );

    return (
        <div className="w-full max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    {language === 'es' ? 'Top 10 Global' : 'Global Top 10'}
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
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(entry.time_spent)}</span>
                                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {new Date(entry.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                            <span className={`text-xl font-black ${index === 0 ? 'text-yellow-400' :
                                    index === 1 ? 'text-slate-300' :
                                        index === 2 ? 'text-orange-400' :
                                            'text-emerald-400'
                                }`}>
                                {entry.score}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
