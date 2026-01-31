'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Envelope, Lock, ArrowRight, WarningCircle, CircleNotch } from '@phosphor-icons/react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // Redirect to dashboard or home
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message || "Credenciales incorrectas.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 p-4"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative">
                    {/* Header Decoration */}
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                    <div className="p-8 md:p-10">
                        {/* Title Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Bienvenido</h1>
                            <p className="text-slate-500 font-medium">Inicia sesión en Tu Maestro</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                                <div className="relative group">
                                    <Envelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} weight="bold" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@correo.com"
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl py-3.5 pl-12 pr-4 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contraseña</label>
                                    <a href="#" className="text-xs font-bold text-blue-500 hover:text-blue-600">¿Olvidaste tu contraseña?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} weight="bold" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl py-3.5 pl-12 pr-4 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 text-red-500 text-sm font-bold px-4 py-3 rounded-xl flex items-center gap-2"
                                    >
                                        <WarningCircle size={18} weight="fill" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold rounded-2xl py-4 shadow-lg shadow-slate-900/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <CircleNotch size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        Entrar <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="text-center mt-6">
                                <p className="text-slate-400 font-medium text-sm">
                                    ¿No tienes cuenta?{' '}
                                    <Link href="/registro" className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors">
                                        Regístrate gratis
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
