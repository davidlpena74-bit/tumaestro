'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash, ArrowLeft, Warning, Info, Megaphone, UserPlus, CheckCircle } from '@phosphor-icons/react';
import Link from 'next/link';

type Notification = {
    id: string;
    type: 'connection_request' | 'connection_accepted';
    title: string;
    message: string;
    data: any;
    read: boolean;
    created_at: string;
};

export default function NotificationsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    useEffect(() => {
        let subscription: any;
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/');
                return;
            }
            setUser(session.user);
            fetchNotifications(session.user.id, true);

            // Subscribe to realtime changes
            subscription = supabase
                .channel(`notifs-page-${session.user.id}`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'notifications',
                        filter: `user_id=eq.${session.user.id}`
                    },
                    () => {
                        // Re-fetch when anything changes
                        fetchNotifications(session.user.id);
                    }
                )
                .subscribe();
        };
        checkUser();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [router]);

    const fetchNotifications = async (userId: string, isInitial = false) => {
        if (isInitial) setLoading(true);
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (data) {
            setNotifications(data as Notification[]);
        }
        setLoading(false);
    };

    const markAsRead = async (id: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const { error } = await supabase.rpc('mark_notification_read', { notif_id: id });
        if (error) {
            await supabase.from('notifications').update({ read: true }).eq('id', id);
        }
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleAcceptRequest = async (notification: Notification, e: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!user) return;

        const teacher_id = notification.data?.teacher_id || notification.data?.sender_id;
        const class_id = notification.data?.class_id;

        if (!teacher_id) {
            console.error("No teacher_id found in notification data", notification);
            return;
        }

        // Use RPC to accept both connection and class invitation atomically
        const { error: acceptError } = await supabase.rpc('accept_class_invitation', {
            target_teacher_id: teacher_id,
            target_class_id: class_id || null
        });

        if (!acceptError) {
            // Mark notification as read so it stays in history
            const { error: readError } = await supabase.rpc('mark_notification_read', { notif_id: notification.id });
            if (readError) {
                await supabase.from('notifications').update({ read: true }).eq('id', notification.id);
            }

            // Update local state
            setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
            alert('¡Solicitud aceptada correctamente!');
        } else {
            console.error("Error accepting connection:", acceptError);
            alert('Error al aceptar la solicitud: ' + acceptError.message);
        }
    };

    const markAllAsRead = async () => {
        if (!user) return;
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length === 0) return;

        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', user.id)
            .eq('read', false);

        if (!error) {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }
    };

    const deleteNotification = async (id: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', id);

        if (!error) {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }
    };

    const clearAllRead = async () => {
        if (!user) return;
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('user_id', user.id)
            .eq('read', true);

        if (!error) {
            setNotifications(prev => prev.filter(n => !n.read));
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'connection_request': return <UserPlus size={24} weight="duotone" className="text-blue-500" />;
            case 'connection_accepted': return <CheckCircle size={24} weight="duotone" className="text-teal-500" />;
            default: return <Bell size={24} weight="duotone" className="text-slate-400" />;
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });

    if (loading && notifications.length === 0) {
        return (
            <div className="min-h-screen pt-32 flex justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-12 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm mb-6 transition-colors group cursor-pointer"
                        onClick={() => router.push('/dashboard')}
                    >
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" weight="bold" />
                        Volver al Panel
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight text-slate-800 pb-2"
                    >
                        Notificaciones
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 font-medium max-w-2xl mx-auto mt-2"
                    >
                        Gestiona tus avisos y solicitudes de conexión de forma centralizada.
                    </motion.p>
                </header>

                <div className="max-w-4xl mx-auto">
                    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white/50 text-slate-500 hover:bg-white/80 border border-slate-200/50'}`}
                            >
                                Todas ({notifications.length})
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === 'unread' ? 'bg-teal-500 text-white shadow-lg' : 'bg-white/50 text-slate-500 hover:bg-white/80 border border-slate-200/50'}`}
                            >
                                No leídas ({notifications.filter(n => !n.read).length})
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={markAllAsRead}
                                title="Marcar todo como leído"
                                className="p-2.5 bg-white/50 backdrop-blur-md border border-slate-200/50 rounded-xl text-slate-600 hover:bg-white hover:text-teal-600 transition-all shadow-sm"
                            >
                                <Check size={20} weight="bold" />
                            </button>
                            <button
                                onClick={clearAllRead}
                                title="Limpiar leídos"
                                className="p-2.5 bg-white/50 backdrop-blur-md border border-slate-200/50 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                            >
                                <Trash size={20} weight="bold" />
                            </button>
                        </div>
                    </header>

                    <div className="bg-white/10 backdrop-blur-md border border-slate-200/50 p-1 md:p-2 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="divide-y divide-slate-200/30">
                            {filteredNotifications.length === 0 ? (
                                <div className="py-24 text-center">
                                    <Bell size={64} weight="duotone" className="mx-auto text-slate-300 mb-4 opacity-50" />
                                    <p className="text-slate-500 font-bold text-lg">No hay notificaciones para mostrar.</p>
                                    <p className="text-slate-400 text-sm mt-1">¡Todo al día por aquí!</p>
                                </div>
                            ) : (
                                filteredNotifications.map((n) => (
                                    <motion.div
                                        layout
                                        key={n.id}
                                        className={`p-6 md:p-8 flex items-start gap-4 md:gap-6 transition-all ${!n.read ? 'bg-teal-500/5' : 'hover:bg-white/20'}`}
                                    >
                                        <div className={`p-4 rounded-2xl shadow-sm ${n.type === 'connection_request' ? 'bg-blue-100 text-blue-600' :
                                            n.type === 'connection_accepted' ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {getIcon(n.type)}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`text-lg font-black transition-colors ${!n.read ? 'text-slate-900 underline decoration-teal-500/30 decoration-4 underline-offset-4' : 'text-slate-600'}`}>
                                                    {n.title}
                                                </h3>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/50 px-2 py-1 rounded-md border border-slate-200/30">
                                                    {new Date(n.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                            <p className={`text-base leading-relaxed mb-6 ${!n.read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                                {n.message}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    {!n.read && n.type === 'connection_request' && (
                                                        <button
                                                            onClick={(e) => handleAcceptRequest(n, e)}
                                                            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white bg-teal-500 hover:bg-teal-600 transition-all px-4 py-2 rounded-lg shadow-md hover:shadow-lg active:scale-95"
                                                        >
                                                            <UserPlus size={14} weight="bold" />
                                                            Aceptar Solicitud
                                                        </button>
                                                    )}
                                                    {!n.read && (
                                                        <button
                                                            onClick={(e) => markAsRead(n.id, e)}
                                                            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-700 transition-colors bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100 shadow-sm"
                                                        >
                                                            <Check size={14} weight="bold" />
                                                            {n.type === 'connection_request' ? 'Ignorar' : 'Marcar como leída'}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => deleteNotification(n.id, e)}
                                                        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100"
                                                    >
                                                        <Trash size={14} weight="bold" />
                                                        Eliminar
                                                    </button>
                                                </div>
                                                {!n.read && (
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 text-[10px] font-black border border-teal-500/20">
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                                        </span>
                                                        NUEVA
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
