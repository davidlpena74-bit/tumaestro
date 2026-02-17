import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabaseClient';
import { X, Envelope, Key, User, MagicWand, GraduationCap, ChalkboardTeacher, ArrowRight, Check } from '@phosphor-icons/react';
import { useToast } from '@/context/ToastContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'role_selection' | 'magic_link' | 'password' | 'confirmation'>('role_selection');
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const { success, error, warning, info } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [sent, setSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ type: 'google' | 'form', event?: React.FormEvent } | null>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            setView('role_selection');
            setMode('signin');
            setPendingAction(null);
        }
        return () => setMounted(false);
    }, [isOpen]);

    const handleMagicLinkLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error: err } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: window.location.origin },
        });
        if (err) error('Error: ' + err.message);
        else setSent(true);
        setLoading(false);
    };

    const handleSocialLogin = async () => {
        setLoading(true);
        const { error: err } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                queryParams: {
                    role: role // This will be available in user_metadata for new users
                }
            },
        });
        if (err) {
            error('Error con Google: ' + err.message);
            setLoading(false);
        }
    };

    const handlePasswordAuth = async () => {
        setLoading(true);

        if (mode === 'signup') {
            if (!fullName) {
                warning('Por favor, indica tu nombre completo.');
                setLoading(false);
                return;
            }

            const { data, error: err } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`
                    }
                }
            });

            if (err) {
                error('Error al registrarse: ' + err.message);
            } else {
                success('¡Usuario registrado! ' + (data.session ? 'Sesión iniciada.' : 'Por favor revisa tu correo para confirmar.'));
                if (data.session) onClose();
            }
        } else {
            const { error: err } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (err) {
                error('Error al entrar: ' + err.message);
            } else {
                onClose();
            }
        }
        setLoading(false);
    };

    const requestConfirmation = (type: 'google' | 'form', e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setPendingAction({ type });
        setView('confirmation');
    };

    const confirmAction = () => {
        if (!pendingAction) return;
        if (pendingAction.type === 'google') {
            handleSocialLogin();
        } else {
            handlePasswordAuth();
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            warning('Por favor, introduce tu correo electrónico primero.');
            return;
        }
        setLoading(true);
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/perfil`,
        });

        if (err) {
            error('Error: ' + err.message);
        } else {
            success('Enlace de restablecimiento enviado. Revisa tu correo.');
            onClose();
        }
        setLoading(false);
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                <div className="relative transform overflow-hidden bg-white w-full max-w-lg rounded-3xl shadow-2xl text-left transition-all border border-slate-100 my-8">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                                {view === 'role_selection' ? '¿Cómo quieres entrar?' :
                                    view === 'confirmation' ? 'Confirmación Final' :
                                        (mode === 'signin' ? 'Bienvenido de nuevo' : 'Únete a Tu Maestro')}
                            </h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-100 rounded-full">
                                <X size={24} weight="bold" />
                            </button>
                        </div>

                        {view === 'role_selection' ? (
                            <div className="space-y-4 py-4">
                                <p className="text-slate-500 text-center mb-8">Selecciona tu perfil para continuar</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => {
                                            setRole('student');
                                            setView('password');
                                        }}
                                        className="group relative flex flex-col items-center gap-4 p-6 px-4 bg-teal-50/50 hover:bg-teal-50 border-2 border-slate-100 hover:border-teal-500 rounded-[2.5rem] transition-all text-center h-full"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                                            <GraduationCap size={48} weight="duotone" />
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight whitespace-nowrap">Soy Alumno</h3>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Aprender</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setRole('teacher');
                                            setView('password');
                                        }}
                                        className="group relative flex flex-col items-center gap-4 p-6 px-4 bg-purple-50/50 hover:bg-purple-50 border-2 border-slate-100 hover:border-purple-500 rounded-[2.5rem] transition-all text-center h-full"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                            <ChalkboardTeacher size={48} weight="duotone" />
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight whitespace-nowrap">Soy Profesor</h3>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Gestionar</p>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <button
                                        onClick={() => {
                                            setMode('signin');
                                            setView('password');
                                        }}
                                        className="text-xs font-black text-slate-400 hover:text-teal-600 uppercase tracking-widest flex items-center gap-2 transition-colors"
                                    >
                                        YA ESTOY REGISTRADO • ENTRAR DIRECTO
                                    </button>

                                    <div className="pt-4 text-center text-[10px] text-slate-200 uppercase tracking-[0.3em] font-black">
                                        TU MAESTRO • PLATAFORMA EDUCATIVA
                                    </div>
                                </div>
                            </div>
                        ) : view === 'confirmation' ? (
                            <div className="py-6 text-center">
                                <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl ${role === 'student' ? 'bg-teal-500 text-white' : 'bg-purple-500 text-white'}`}>
                                    {role === 'student' ? <GraduationCap size={56} weight="duotone" /> : <ChalkboardTeacher size={56} weight="duotone" />}
                                </div>

                                <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                                    Confirmar Perfil
                                </h3>

                                <p className="text-slate-500 mb-8 max-w-[280px] mx-auto text-balance">
                                    {mode === 'signup' ? 'Te vas a registrar como ' : 'Vas a entrar con el perfil de '}
                                    <span className={`font-black uppercase ${role === 'student' ? 'text-teal-600' : 'text-purple-600'}`}>{role === 'student' ? 'Alumno' : 'Profesor'}</span>.
                                </p>

                                <div className="space-y-4">
                                    <button
                                        onClick={confirmAction}
                                        disabled={loading}
                                        className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${role === 'student' ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/20' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'}`}
                                    >
                                        {loading ? 'PROCESANDO...' : <>SÍ, CONFIRMO <Check size={24} weight="bold" /></>}
                                    </button>

                                    <button
                                        onClick={() => setView('role_selection')}
                                        disabled={loading}
                                        className="text-sm font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                                    >
                                        NO, QUIERO CAMBIARLO
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Social Login */}
                                <div className="flex flex-col gap-3 mb-6">
                                    <button
                                        onClick={() => requestConfirmation('google')}
                                        className="flex items-center justify-center w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition gap-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continuar con Google
                                    </button>
                                </div>

                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-3 bg-white text-slate-400 font-medium">O usa tu correo</span>
                                    </div>
                                </div>

                                <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setView('password')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${view === 'password' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'} `}
                                    >
                                        <Key size={16} weight="bold" />
                                        Contraseña
                                    </button>
                                    <button
                                        onClick={() => setView('magic_link')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${view === 'magic_link' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'} `}
                                    >
                                        <MagicWand size={16} weight="bold" />
                                        Link Mágico
                                    </button>
                                </div>

                                {view === 'magic_link' ? (
                                    sent ? (
                                        <div className="text-center p-6 bg-teal-50 rounded-2xl border border-teal-100">
                                            <Envelope size={48} className="mx-auto text-teal-500 mb-2" weight="duotone" />
                                            <h3 className="text-lg font-bold text-teal-900">¡Enlace enviado!</h3>
                                            <p className="mt-2 text-sm text-teal-600">Revisa tu bandeja de entrada en <span className="font-semibold">{email}</span></p>
                                            <button onClick={onClose} className="mt-6 text-sm font-bold text-teal-600 hover:text-teal-500 bg-white px-4 py-2 rounded-lg shadow-sm">Cerrar</button>
                                        </div>
                                    ) : (
                                        <form onSubmit={(e) => requestConfirmation('form', e)} className="space-y-4">
                                            <p className="text-slate-500 text-sm text-center">Te enviaremos un enlace seguro a tu correo. <br />Sin recordar contraseñas.</p>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider">Correo Electrónico</label>
                                                <div className="relative">
                                                    <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="email"
                                                        required
                                                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                        placeholder="ejemplo@correo.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" disabled={loading} className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 disabled:opacity-50 transition-all active:scale-[0.98]">
                                                {loading ? 'Enviando...' : 'Enviar Enlace Mágico ✨'}
                                            </button>
                                        </form>
                                    )
                                ) : (
                                    <form onSubmit={(e) => requestConfirmation('form', e)} className="space-y-4">
                                        {mode === 'signup' && (
                                            <>
                                                {/* Role Identification (Small badge since already selected) */}
                                                <div className="flex justify-center mb-4">
                                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2 ${role === 'student' ? 'bg-teal-50 text-teal-600 border-teal-200' : 'bg-purple-50 text-purple-600 border-purple-200'}`}>
                                                        {role === 'student' ? 'Perfil: Alumno' : 'Perfil: Profesor'}
                                                    </span>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider">Nombre Completo</label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                        <input
                                                            type="text"
                                                            required
                                                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                            placeholder="Juan Pérez"
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider">Correo Electrónico</label>
                                            <div className="relative">
                                                <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type="email"
                                                    required
                                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                    placeholder="ejemplo@correo.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Contraseña</label>
                                                {mode === 'signin' && (
                                                    <button
                                                        type="button"
                                                        onClick={handleResetPassword}
                                                        className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
                                                    >
                                                        ¿Olvidaste tu contraseña?
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" disabled={loading} className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-500/20 disabled:opacity-50 transition-all active:scale-[0.98]">
                                            {loading ? 'Procesando...' : (mode === 'signin' ? 'Iniciar Sesión' : 'Registrarse')}
                                        </button>

                                        <div className="text-center mt-4">
                                            <button
                                                type="button"
                                                className="text-xs text-slate-400 hover:text-teal-600 font-bold uppercase tracking-widest"
                                                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                                            >
                                                {mode === 'signin' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
                                            </button>
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setView('role_selection')}
                                                className="text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-tighter flex items-center gap-1"
                                            >
                                                ← Volver a elegir perfil
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="mt-8 text-center">
                                    <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Secure Auth by Supabase</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;
