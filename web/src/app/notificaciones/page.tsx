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
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/');
                return;
            }
            setUser(session.user);
            fetchNotifications(session.user.id);
        };
        checkUser();
    }, [router]);

    const fetchNotifications = async (userId: string) => {
        setLoading(true);
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

    const markAsRead = async (id: string) => {
        const { error } = await supabase.rpc('mark_notification_read', { notif_id: id });
        if (error) {
            await supabase.from('notifications').update({ read: true }).eq('id', id);
        }
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
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

    const deleteNotification = async (id: string) => {
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
        <main className="min-h-screen pt-32 pb-12 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4">
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm mb-4 transition-colors group">
                            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" weight="bold" />
                            Volver al Panel
                        </Link>
                        <h1 className="text-4xl font-black text-slate-800">Centro de Notificaciones</h1>
                        <p className="text-slate-500 mt-1">Gestiona tus avisos y solicitudes de conexión.</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Check size={16} weight="bold" />
                            Marcar todo como leído
                        </button>
                        <button
                            onClick={clearAllRead}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            <Trash size={16} weight="bold" />
                            Limpiar leídos
                        </button>
                    </div>
                </header>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="border-b border-slate-100 p-6 flex gap-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            Todas ({notifications.length})
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === 'unread' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                        >
                            No leídas ({notifications.filter(n => !n.read).length})
                        </button>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {filteredNotifications.length === 0 ? (
                            <div className="py-20 text-center">
                                <Bell size={64} weight="duotone" className="mx-auto text-slate-100 mb-4" />
                                <p className="text-slate-400 font-medium">No hay notificaciones para mostrar.</p>
                            </div>
                        ) : (
                            filteredNotifications.map((n) => (
                                <motion.div
                                    layout
                                    key={n.id}
                                    className={`p-6 flex items-start gap-4 transition-colors ${!n.read ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}
                                >
                                    <div className={`p-3 rounded-2xl ${n.type === 'connection_request' ? 'bg-blue-100' :
                                            n.type === 'connection_accepted' ? 'bg-teal-100' : 'bg-slate-100'
                                        }`}>
                                        {getIcon(n.type)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold transition-colors ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                                {n.title}
                                            </h3>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {new Date(n.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${!n.read ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                            {n.message}
                                        </p>

                                        <div className="mt-4 flex gap-3">
                                            {!n.read && (
                                                <button
                                                    onClick={() => markAsRead(n.id)}
                                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-700 transition-colors"
                                                >
                                                    <Check size={14} weight="bold" />
                                                    Marcar como leída
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(n.id)}
                                                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash size={14} weight="bold" />
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                    {!n.read && (
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 shadow-sm shadow-blue-500/50" />
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
