'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ChalkboardTeacher,
    Plus,
    Trash,
    UserPlus,
    Books,
    MagnifyingGlass,
    IdentificationBadge,
    CheckCircle,
    CircleNotch
} from '@phosphor-icons/react';

type Profile = {
    id: string;
    full_name: string;
    email: string;
    role: 'student' | 'teacher';
    avatar_url?: string;
};

type Class = {
    id: string;
    name: string;
    description: string;
    teacher_id: string;
    created_at: string;
};

export default function RoleBasedDashboard() {
    const [myProfile, setMyProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'connections' | 'classes'>('connections');

    // Data lists
    const [profiles, setProfiles] = useState<Profile[]>([]); // For searching
    const [myConnections, setMyConnections] = useState<Profile[]>([]);
    const [myClasses, setMyClasses] = useState<Class[]>([]);

    // UI states
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreatingClass, setIsCreatingClass] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newClassDesc, setNewClassDesc] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Get my profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        setMyProfile(profile);

        if (profile) {
            fetchConnections(profile.id, profile.role);
            if (profile.role === 'teacher') {
                fetchClasses(profile.id);
            }
        }
        setLoading(false);
    };

    const fetchConnections = async (userId: string, role: string) => {
        const table = 'student_teachers';
        const filterCol = role === 'student' ? 'student_id' : 'teacher_id';
        const selectCol = role === 'student' ? 'teacher_id' : 'student_id';

        const { data } = await supabase
            .from(table)
            .select(`profiles!${table}_${selectCol}_fkey(*)`)
            .eq(filterCol, userId);

        if (data) {
            setMyConnections(data.map((item: any) => item.profiles));
        }
    };

    const fetchClasses = async (teacherId: string) => {
        const { data } = await supabase
            .from('classes')
            .select('*')
            .eq('teacher_id', teacherId);
        if (data) setMyClasses(data);
    };

    const searchProfiles = async () => {
        if (!searchTerm) return;
        const targetRole = myProfile?.role === 'student' ? 'teacher' : 'student';

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', targetRole)
            .ilike('full_name', `%${searchTerm}%`)
            .limit(10);

        if (data) setProfiles(data);
    };

    const addConnection = async (targetId: string) => {
        if (!myProfile) return;
        const payload = myProfile.role === 'student'
            ? { student_id: myProfile.id, teacher_id: targetId }
            : { student_id: targetId, teacher_id: myProfile.id };

        const { error } = await supabase.from('student_teachers').insert(payload);
        if (!error) {
            fetchConnections(myProfile.id, myProfile.role);
            setProfiles(profiles.filter(p => p.id !== targetId));
        }
    };

    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [classStudents, setClassStudents] = useState<Profile[]>([]);

    const fetchClassStudents = async (classId: string) => {
        const { data } = await supabase
            .from('class_students')
            .select('profiles(*)')
            .eq('class_id', classId);
        if (data) setClassStudents(data.map((item: any) => item.profiles));
    };

    const addStudentToClass = async (classId: string, studentId: string) => {
        const { error } = await supabase
            .from('class_students')
            .insert({ class_id: classId, student_id: studentId });

        if (!error) {
            fetchClassStudents(classId);
        }
    };

    const removeStudentFromClass = async (classId: string, studentId: string) => {
        const { error } = await supabase
            .from('class_students')
            .delete()
            .eq('class_id', classId)
            .eq('student_id', studentId);

        if (!error) {
            fetchClassStudents(classId);
        }
    };

    const createClass = async () => {
        if (!myProfile || !newClassName) return;
        const { error } = await supabase.from('classes').insert({
            teacher_id: myProfile.id,
            name: newClassName,
            description: newClassDesc
        });

        if (!error) {
            fetchClasses(myProfile.id);
            setIsCreatingClass(false);
            setNewClassName('');
            setNewClassDesc('');
        }
    };

    if (loading) return <div className="p-8 text-center mt-20"><CircleNotch className="animate-spin mx-auto text-blue-500" size={48} /></div>;
    if (!myProfile) return <div className="p-8 text-center text-slate-500">Inicia sesión para ver tu panel.</div>;

    const isTeacher = myProfile.role === 'teacher';

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            {isTeacher ? <ChalkboardTeacher size={32} /> : <IdentificationBadge size={32} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{isTeacher ? 'Panel de Profesor' : 'Panel de Alumno'}</h3>
                            <p className="text-white/80 text-sm">{myProfile.full_name}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-black">{myConnections.length}</div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{isTeacher ? 'Alumnos vinculados' : 'Profesores seleccionados'}</p>
                </div>

                {isTeacher && (
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/20 rounded-2xl">
                                <Books size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Mis Clases</h3>
                                <p className="text-white/80 text-sm">Organiza tu enseñanza</p>
                            </div>
                        </div>
                        <div className="text-3xl font-black">{myClasses.length}</div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Clases activas</p>
                    </div>
                )}
            </div>

            {/* Main Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('connections')}
                    className={`pb-4 px-2 font-bold text-sm transition-all relative ${activeTab === 'connections' ? 'text-blue-600' : 'text-slate-400'}`}
                >
                    {isTeacher ? 'Mis Alumnos' : 'Mis Profesores'}
                    {activeTab === 'connections' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
                </button>
                {isTeacher && (
                    <button
                        onClick={() => setActiveTab('classes')}
                        className={`pb-4 px-2 font-bold text-sm transition-all relative ${activeTab === 'classes' ? 'text-purple-600' : 'text-slate-400'}`}
                    >
                        Gestión de Clases
                        {activeTab === 'classes' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 rounded-t-full" />}
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'connections' ? (
                    <motion.div
                        key="connections"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        {/* Search Section */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <MagnifyingGlass size={20} className="text-blue-500" />
                                {isTeacher ? 'Buscar nuevos alumnos' : 'Buscar mi próximo profesor'}
                            </h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Introduce un nombre..."
                                    className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3 text-slate-700 focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchProfiles()}
                                />
                                <button
                                    onClick={searchProfiles}
                                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                                >
                                    Buscar
                                </button>
                            </div>

                            {profiles.length > 0 && (
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {profiles.map(p => (
                                        <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {p.full_name?.[0] || '?'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{p.full_name}</p>
                                                    <p className="text-slate-400 text-xs">{p.email}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addConnection(p.id)}
                                                className="p-2 bg-white text-blue-600 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors"
                                            >
                                                <UserPlus size={20} weight="bold" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Connections List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myConnections.map(conn => (
                                <div key={conn.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 text-xl font-bold">
                                            {conn.full_name?.[0] || conn.email[0]}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800">{conn.full_name || 'Sin nombre'}</h4>
                                            <p className="text-slate-400 text-sm">{conn.email}</p>
                                        </div>
                                        <div className="text-green-500 bg-green-50 p-2 rounded-full">
                                            <CheckCircle size={20} weight="fill" />
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Eliminar vínculo
                                    </button>
                                </div>
                            ))}
                            {myConnections.length === 0 && (
                                <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <Users size={48} className="mx-auto text-slate-300 mb-3" />
                                    <p className="text-slate-400 font-medium tracking-tight">Todavía no tienes {isTeacher ? 'alumnos' : 'profesores'} vinculados.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="classes"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-black text-slate-800 text-2xl">Gestionar mis Clases</h3>
                            <button
                                onClick={() => setIsCreatingClass(true)}
                                className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                            >
                                <Plus size={20} weight="bold" />
                                Nueva Clase
                            </button>
                        </div>

                        {isCreatingClass && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-purple-50 p-6 rounded-3xl border border-purple-100 space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre de la clase (ej: Matemáticas 3º ESO)"
                                        className="bg-white border-2 border-purple-100 rounded-2xl px-5 py-3 text-slate-700 outline-none focus:border-purple-500"
                                        value={newClassName}
                                        onChange={(e) => setNewClassName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descripción breve..."
                                        className="bg-white border-2 border-purple-100 rounded-2xl px-5 py-3 text-slate-700 outline-none focus:border-purple-500"
                                        value={newClassDesc}
                                        onChange={(e) => setNewClassDesc(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsCreatingClass(false)}
                                        className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={createClass}
                                        className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200"
                                    >
                                        Crear ahora
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myClasses.map(cls => (
                                <div key={cls.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-xl">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-xl mb-1">{cls.name}</h4>
                                    <p className="text-slate-500 text-sm mb-6">{cls.description}</p>

                                    {selectedClassId === cls.id ? (
                                        <div className="space-y-4">
                                            <div className="bg-slate-50 p-4 rounded-2xl">
                                                <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Alumnos en esta clase</h5>
                                                <div className="space-y-2">
                                                    {classStudents.map(student => (
                                                        <div key={student.id} className="flex items-center justify-between text-sm bg-white p-2 rounded-xl border border-slate-100">
                                                            <span className="font-bold text-slate-700">{student.full_name}</span>
                                                            <button onClick={() => removeStudentFromClass(cls.id, student.id)} className="text-red-500 hover:text-red-700">
                                                                <Trash size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {classStudents.length === 0 && <p className="text-slate-400 text-xs text-center py-2 italic">Sin alumnos asignados</p>}
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 p-4 rounded-2xl">
                                                <h5 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3">Añadir de mis contactos</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {myConnections
                                                        .filter(conn => !classStudents.find(s => s.id === conn.id))
                                                        .map(conn => (
                                                            <button
                                                                key={conn.id}
                                                                onClick={() => addStudentToClass(cls.id, conn.id)}
                                                                className="px-3 py-1.5 bg-white text-blue-600 rounded-full text-xs font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"
                                                            >
                                                                + {conn.full_name}
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedClassId(null)}
                                                className="w-full py-2 text-slate-400 text-xs font-bold hover:text-slate-600"
                                            >
                                                Cerrar gestor
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {/* Placeholder for student avatars in class */}
                                                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                                                    {cls.name[0]}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedClassId(cls.id);
                                                    fetchClassStudents(cls.id);
                                                }}
                                                className="bg-purple-50 text-purple-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors"
                                            >
                                                Ver y gestionar alumnos
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
