'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User, Envelope, Lock, FloppyDisk, SignOut, CircleNotch } from '@phosphor-icons/react';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Form States
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI States
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/');
                return;
            }
            setUser(session.user);
            setFullName(session.user.user_metadata?.full_name || '');
            setEmail(session.user.email || '');
            setLoading(false);
        };
        getUser();
    }, [router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setUpdating(false);
        }
    };

    const handleChangeEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({ email: newEmail });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Se ha enviado un enlace de confirmación a tu nuevo correo.' });
            setNewEmail('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setUpdating(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            return;
        }

        setUpdating(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.updateUser({ password: password });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Contraseña actualizada correctamente.' });
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <CircleNotch size={48} className="animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                        {fullName ? fullName[0].toUpperCase() : email[0].toUpperCase()}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-slate-800">{fullName || 'Usuario'}</h1>
                        <p className="text-slate-500">{email}</p>
                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                            Cuenta verificada
                        </div>
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* General Info Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <User size={24} className="text-teal-500" />
                            Información Personal
                        </h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={updating}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <FloppyDisk size={18} />
                                Guardar Cambios
                            </button>
                        </form>
                    </div>

                    {/* Change Password Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Lock size={24} className="text-teal-500" />
                            Seguridad
                        </h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={updating || !password}
                                className="w-full py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <Lock size={18} />
                                Actualizar Contraseña
                            </button>
                        </form>
                    </div>

                    {/* Change Email Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Envelope size={24} className="text-teal-500" />
                            Cambio de Correo
                        </h2>
                        <form onSubmit={handleChangeEmail} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nuevo Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    placeholder="nuevo@correo.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={updating || !newEmail}
                                className="w-full md:w-auto px-6 py-2 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 rounded-lg font-medium transition-colors"
                            >
                                Enviar Confirmación
                            </button>
                        </form>
                        <p className="mt-3 text-sm text-slate-400">
                            Recibirás un correo en tu nueva dirección para confirmar el cambio. Tu sesión actual no se cerrará.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
