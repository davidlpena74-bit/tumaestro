'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Envelope, Lock, ArrowRight, WarningCircle, CircleNotch, GoogleLogo } from '@phosphor-icons/react';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            setIsLoading(false);
            return;
        }

        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Ocurrió un error en el registro.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google') => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            setError('Error con ' + provider + ': ' + error.message);
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
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
                    {/* Header Decoration */}
                    <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                    <div className="p-8 md:p-10">
                        {/* Title Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Crear Cuenta</h1>
                            <p className="text-slate-500 font-medium">Únete a Tu Maestro v2.0</p>
                        </div>

                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    🎉
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">¡Registro completado!</h3>
                                <p className="text-slate-500 mb-6">Hemos enviado un enlace de confirmación a tu correo electrónico.</p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors w-full"
                                >
                                    Volver al Inicio
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="space-y-5">
                                {/* Social Login */}
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="flex items-center justify-center w-full px-4 py-3 border border-slate-200 rounded-2xl shadow-sm bg-white/80 hover:bg-white transition-all text-slate-700 font-bold gap-3 group"
                                >
                                    <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continuar con Google
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-300/50"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase tracking-wider font-bold">
                                        <span className="px-2 bg-transparent text-slate-400 backdrop-blur-sm rounded">O con email</span>
                                    </div>
                                </div>

                                <form onSubmit={handleRegister} className="space-y-5">
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
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contraseña</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} weight="bold" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                minLength={6}
                                                className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl py-3.5 pl-12 pr-4 font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirmar Contraseña</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" size={20} weight="bold" />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                className="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 rounded-2xl py-3.5 pl-12 pr-4 font-medium focus:outline-none focus:border-purple-500 focus:bg-white transition-all placeholder:text-slate-300"
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
                                                Registrarse <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center mt-6">
                                        <p className="text-slate-400 font-medium text-sm">
                                            ¿Ya tienes cuenta?{' '}
                                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors">
                                                Inicia sesión
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-400 text-xs font-semibold">
                    &copy; 2026 Tu Maestro v2.0
                </div>
            </motion.div>
        </div>
    );
}
