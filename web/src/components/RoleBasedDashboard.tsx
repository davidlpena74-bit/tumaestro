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
    CircleNotch,
    CheckSquare,
    Square
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

type Task = {
    id: string;
    class_id: string;
    title: string;
    description: string;
    due_date?: string;
    created_at: string;
};

export default function RoleBasedDashboard() {
    const [myProfile, setMyProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'connections' | 'classes' | 'tasks'>('connections');

    // Data lists
    const [profiles, setProfiles] = useState<Profile[]>([]); // For searching
    const [myConnections, setMyConnections] = useState<Profile[]>([]);
    const [myClasses, setMyClasses] = useState<Class[]>([]);
    const [myTasks, setMyTasks] = useState<Task[]>([]);
    const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
    const [studentClasses, setStudentClasses] = useState<Record<string, Class[]>>({});

    // UI states
    const [searchTerm, setSearchTerm] = useState('');
    const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);
    const [isCreatingClass, setIsCreatingClass] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newClassDesc, setNewClassDesc] = useState('');

    // Teacher Task Creation UI
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [targetClassId, setTargetClassId] = useState<string | null>(null);
    // Class Selection Modal State
    const [showClassSelector, setShowClassSelector] = useState(false);
    const [pendingStudentId, setPendingStudentId] = useState<string | null>(null);




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
                fetchClassesAsTeacher(profile.id);
            } else {
                fetchClassesAsStudent(profile.id);
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
            const profiles = data.map((item: any) => item.profiles);
            setMyConnections(profiles);

            // If teacher, fetch classes for these students
            if (role === 'teacher' && profiles.length > 0) {
                fetchStudentEnrollments(profiles.map((p: any) => p.id));
            }
        }
    };

    const fetchStudentEnrollments = async (studentIds: string[]) => {
        // Get all class_students where class belongs to this teacher and student is in list
        // First get my classes keys
        if (myClasses.length === 0) return; // Wait for classes to load?
        // Actually, better to just query class_students and filter by my classes

        // We need to know which of *my* classes they are in. 
        // We already have myClasses.
        const myClassIds = myClasses.map(c => c.id);

        if (myClassIds.length === 0) return;

        const { data } = await supabase
            .from('class_students')
            .select('student_id, classes(*)')
            .in('class_id', myClassIds)
            .in('student_id', studentIds);

        if (data) {
            const map: Record<string, Class[]> = {};
            data.forEach((item: any) => {
                if (!map[item.student_id]) map[item.student_id] = [];
                map[item.student_id].push(item.classes);
            });
            setStudentClasses(map);
        }
    };

    const fetchClassesAsTeacher = async (teacherId: string) => {
        console.log("Fetching classes for teacher:", teacherId);
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .eq('teacher_id', teacherId);

        if (error) console.error("Error fetching classes:", error);
        if (data) {
            console.log("Classes fetched:", data);
            setMyClasses(data);
            // Also refresh student enrollments if connections exist
            if (myConnections.length > 0) {
                fetchStudentEnrollments(myConnections.map(c => c.id));
            }
            const classIds = data.map((c: any) => c.id);
            if (classIds.length > 0) {
                fetchTasks(classIds);
            }
        }
    };

    const fetchClassesAsStudent = async (studentId: string) => {
        const { data } = await supabase
            .from('class_students')
            .select('classes(*)')
            .eq('student_id', studentId);

        if (data) {
            const classes = data.map((item: any) => item.classes);
            setMyClasses(classes);
            if (classes.length > 0) {
                const classIds = classes.map((c: any) => c.id);
                fetchTasks(classIds);
                fetchCompletions(studentId);
            }
        }
    };

    const fetchTasks = async (classIds: string[]) => {
        const { data } = await supabase
            .from('tasks')
            .select('*')
            .in('class_id', classIds)
            .order('created_at', { ascending: false });

        if (data) setMyTasks(data);
    };

    const fetchCompletions = async (studentId: string) => {
        const { data } = await supabase
            .from('student_task_completions')
            .select('task_id')
            .eq('student_id', studentId);

        if (data) {
            const ids = new Set(data.map((item: any) => item.task_id));
            setCompletedTaskIds(ids);
        }
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

    const initiateAddStudent = (studentId: string) => {
        if (!myProfile) return;

        // If teacher, must select a class first
        if (myProfile.role === 'teacher') {
            if (myClasses.length === 0) {
                alert("Debes crear al menos una clase antes de añadir alumnos.");
                setActiveTab('classes');
                setIsCreatingClass(true);
                return;
            }
            setPendingStudentId(studentId);
            setShowClassSelector(true);
        } else {
            // Student adding a teacher - simple connection
            addConnection(studentId, null);
        }
    };

    const addConnection = async (targetId: string, classId: string | null) => {
        if (!myProfile) return;

        // 1. Create the connection (student_teachers)
        const payload = myProfile.role === 'student'
            ? { student_id: myProfile.id, teacher_id: targetId }
            : { student_id: targetId, teacher_id: myProfile.id };

        // Use send_connection_request function if available, or direct insert for now as per previous logic
        const { error: connError } = await supabase.from('student_teachers').insert(payload);

        if (!connError || connError.code === '23505') { // 23505 is unique violation (already connected), which is fine

            // 2. If teacher and class selected, add to class_students
            if (myProfile.role === 'teacher' && classId) {
                const { error: classError } = await supabase
                    .from('class_students')
                    .insert({ class_id: classId, student_id: targetId });

                if (classError) {
                    console.error("Error adding to class:", classError);
                    alert("Se creó la conexión pero hubo un error al añadir a la clase.");
                } else {
                    alert("Alumno añadido a la clase y vinculado correctamente.");
                }
            } else {
                if (!classId && myProfile.role === 'teacher') {
                    // Should not start here if logic is correct, but safe fallback
                } else {
                    alert("Solicitud de conexión enviada."); // Or just "Vinculado"
                }
            }

            fetchConnections(myProfile.id, myProfile.role);
            setProfiles(profiles.filter(p => p.id !== targetId));
            setShowClassSelector(false);
            setPendingStudentId(null);
        } else {
            alert("Error al vincular: " + connError.message);
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
        // Get class name for notification
        const { data: cls } = await supabase.from('classes').select('name').eq('id', classId).single();

        const { error } = await supabase
            .from('class_students')
            .delete()
            .eq('class_id', classId)
            .eq('student_id', studentId);

        if (!error) {
            // Notify student
            if (myProfile && cls) {
                await supabase.from('notifications').insert({
                    user_id: studentId,
                    type: 'class_removal',
                    title: 'Te han quitado de una clase',
                    message: `${myProfile.full_name} te ha eliminado de la clase "${cls.name}".`,
                    data: { teacher_id: myProfile.id, class_id: classId }
                });
            }
            fetchClassStudents(classId);
            // Also update global map
            fetchStudentEnrollments([studentId]);
        }
    };

    const removeConnection = async (targetId: string) => {
        if (!myProfile) return;
        const payload = myProfile.role === 'student'
            ? { student_id: myProfile.id, teacher_id: targetId }
            : { student_id: targetId, teacher_id: myProfile.id };

        // Also remove from all classes (if teacher removing student)
        if (myProfile.role === 'teacher') {
            const userClasses = studentClasses[targetId] || [];
            for (const cls of userClasses) {
                await removeStudentFromClass(cls.id, targetId);
            }
        }

        const { error } = await supabase
            .from('student_teachers')
            .delete()
            .match(payload);

        if (!error) {
            setMyConnections(myConnections.filter(c => c.id !== targetId));
            const newMap = { ...studentClasses };
            delete newMap[targetId];
            setStudentClasses(newMap);
        }
    };

    const createClass = async () => {
        console.log("Attempting to create class...", { myProfile, newClassName });
        if (!myProfile || !newClassName) {
            console.error("Missing profile or class name");
            return;
        }

        const payload = {
            teacher_id: myProfile.id,
            name: newClassName,
            description: newClassDesc
        };
        console.log("Payload:", payload);

        const { data, error } = await supabase.from('classes').insert(payload).select();

        if (error) {
            console.error('Error creating class:', error);
            alert('Error al crear la clase: ' + error.message);
        } else {
            console.log("Class created successfully:", data);
            alert("Clase creada correctamente (Revisa la consola si no aparece)");
            if (myProfile.id) await fetchClassesAsTeacher(myProfile.id);
            setIsCreatingClass(false);
            setNewClassName('');
            setNewClassDesc('');
        }
    };

    const deleteClass = async (classId: string) => {
        if (!confirm('¿Seguro que quieres eliminar esta clase? Se borrarán todas las tareas y el acceso de los alumnos.')) return;

        const { error } = await supabase.from('classes').delete().eq('id', classId);

        if (error) {
            console.error('Error deleting class:', error);
            alert('Error al eliminar la clase: ' + error.message);
        } else {
            setMyClasses(myClasses.filter(c => c.id !== classId));
            setMyTasks(myTasks.filter(t => t.class_id !== classId));
            if (selectedClassId === classId) {
                setSelectedClassId(null);
            }
        }
    };

    const createTask = async () => {
        if (!targetClassId || !newTaskTitle) return;

        const { error } = await supabase.from('tasks').insert({
            class_id: targetClassId,
            title: newTaskTitle,
            description: newTaskDesc
        });

        if (!error) {
            const currentClasses = myClasses.map(c => c.id);
            if (currentClasses.length > 0) fetchTasks(currentClasses);
            setIsCreatingTask(false);
            setNewTaskTitle('');
            setNewTaskDesc('');
        }
    };

    const toggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
        if (!myProfile) return;

        if (isCompleted) {
            const { error } = await supabase
                .from('student_task_completions')
                .delete()
                .eq('task_id', taskId)
                .eq('student_id', myProfile.id);

            if (!error) {
                const newSet = new Set(completedTaskIds);
                newSet.delete(taskId);
                setCompletedTaskIds(newSet);
            }
        } else {
            const { error } = await supabase
                .from('student_task_completions')
                .insert({
                    task_id: taskId,
                    student_id: myProfile.id
                });

            if (!error) {
                const newSet = new Set(completedTaskIds);
                newSet.add(taskId);
                setCompletedTaskIds(newSet);
            }
        }
    };

    if (loading) return <div className="p-8 text-center mt-20"><CircleNotch className="animate-spin mx-auto text-blue-500" size={48} /></div>;
    if (!myProfile) return <div className="p-8 text-center text-slate-500">Inicia sesión para ver tu panel.</div>;

    const isTeacher = myProfile.role === 'teacher';

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            <div className={`grid grid-cols-1 ${isTeacher ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                <div
                    onClick={() => setActiveTab('connections')}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            {isTeacher ? <ChalkboardTeacher size={32} /> : <IdentificationBadge size={32} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{isTeacher ? 'Alumnos' : 'Profesores'}</h3>
                            <p className="text-white/80 text-sm">{myProfile.full_name}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-black">{myConnections.length}</div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{isTeacher ? 'Vinculados' : 'Seleccionados'}</p>
                </div>

                <div
                    onClick={() => setActiveTab('classes')}
                    className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            <Books size={32} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Clases</h3>
                            <p className="text-white/80 text-sm">{isTeacher ? 'Organiza tu enseñanza' : 'Tus grupos'}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-black">{myClasses.length}</div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Activas</p>
                </div>

                {isTeacher && (
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/20 rounded-2xl">
                                <CheckSquare size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Tareas</h3>
                                <p className="text-white/80 text-sm">Actividades asignadas</p>
                            </div>
                        </div>
                        <div className="text-3xl font-black">{myTasks.length}</div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Total Tareas</p>
                    </div>
                )}
            </div>

            {/* Navigation Tabs Removed as per request, using Top Cards for navigation */}

            <AnimatePresence mode="wait">
                {activeTab === 'connections' ? (
                    <motion.div
                        key="connections"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
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
                                                onClick={() => initiateAddStudent(p.id)}
                                                className="p-2 bg-white text-blue-600 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors"
                                            >
                                                <UserPlus size={20} weight="bold" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Class Selection Modal */}
                            {showClassSelector && (
                                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                    <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
                                        <h3 className="font-bold text-lg text-slate-800 mb-4">Selecciona una clase</h3>
                                        <p className="text-slate-500 text-sm mb-4">Debes asignar al alumno a una de tus clases para vincularlo.</p>

                                        <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
                                            {myClasses.map(cls => (
                                                <button
                                                    key={cls.id}
                                                    onClick={() => pendingStudentId && addConnection(pendingStudentId, cls.id)}
                                                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all font-bold text-slate-700"
                                                >
                                                    {cls.name}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setShowClassSelector(false);
                                                setPendingStudentId(null);
                                            }}
                                            className="w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

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

                                    {/* Display Classes (Teacher View) */}
                                    {isTeacher && (
                                        <div className="mb-4 relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clases inscritas</p>
                                                <button
                                                    onClick={() => setOpenedDropdownId(openedDropdownId === conn.id ? null : conn.id)}
                                                    className="bg-blue-50 text-blue-600 p-1 rounded-md hover:bg-blue-100 transition-colors"
                                                    title="Añadir a otra clase"
                                                >
                                                    <Plus size={14} weight="bold" />
                                                </button>
                                            </div>

                                            {/* Add Class Dropdown */}
                                            {openedDropdownId === conn.id && (
                                                <div className="absolute top-8 right-0 bg-white border border-slate-100 shadow-xl rounded-xl z-20 w-48 overflow-hidden animate-in fade-in zoom-in duration-200">
                                                    <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                                                        Añadir a clase
                                                    </div>
                                                    <div className="max-h-40 overflow-y-auto">
                                                        {myClasses.filter(c => !(studentClasses[conn.id] || []).find(sc => sc.id === c.id)).length > 0 ? (
                                                            myClasses
                                                                .filter(c => !(studentClasses[conn.id] || []).find(sc => sc.id === c.id))
                                                                .map(c => (
                                                                    <button
                                                                        key={c.id}
                                                                        onClick={() => {
                                                                            addStudentToClass(c.id, conn.id);
                                                                            // Update local state optimsitically or wait for fetch
                                                                            // Helper to update local state avoiding full reload
                                                                            const currentClasses = studentClasses[conn.id] || [];
                                                                            setStudentClasses({
                                                                                ...studentClasses,
                                                                                [conn.id]: [...currentClasses, c]
                                                                            });
                                                                            setOpenedDropdownId(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                                    >
                                                                        {c.name}
                                                                    </button>
                                                                ))
                                                        ) : (
                                                            <p className="px-4 py-3 text-[10px] text-slate-400 italic text-center">
                                                                Ya está en todas tus clases
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-2">
                                                {(studentClasses[conn.id] || []).map(cls => (
                                                    <div key={cls.id} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-bold border border-purple-100">
                                                        <span className="max-w-[100px] truncate">{cls.name}</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (confirm(`¿Quitar a ${conn.full_name} de ${cls.name}?`)) {
                                                                    removeStudentFromClass(cls.id, conn.id)
                                                                }
                                                            }}
                                                            className="hover:bg-purple-200 rounded p-0.5 transition-colors"
                                                        >
                                                            <Trash size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!studentClasses[conn.id] || studentClasses[conn.id].length === 0) && (
                                                    <span className="text-xs text-slate-400 italic">Sin clases asignadas</span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (confirm('¿Seguro que quieres eliminar este vínculo? Se eliminará al usuario de todas tus clases.')) {
                                                removeConnection(conn.id);
                                            }
                                        }}
                                        className="w-full py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
                                    >
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
                            <h3 className="font-black text-slate-800 text-2xl">{isTeacher ? 'Gestionar mis Clases' : 'Mis Clases y Tareas'}</h3>
                            {isTeacher && (
                                <button
                                    onClick={() => setIsCreatingClass(true)}
                                    className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
                                >
                                    <Plus size={20} weight="bold" />
                                    Nueva Clase
                                </button>
                            )}
                        </div>

                        {isCreatingClass && isTeacher && (
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

                        <div className="grid grid-cols-1 gap-8">
                            {myClasses.map(cls => (
                                <div key={cls.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col group relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-2xl mb-1">{cls.name}</h4>
                                            <p className="text-slate-500 text-sm">{cls.description}</p>
                                        </div>
                                        {isTeacher && (
                                            <button
                                                onClick={() => deleteClass(cls.id)}
                                                className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-xl"
                                                title="Eliminar clase"
                                            >
                                                <Trash size={20} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-5 mb-4 border border-slate-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <h5 className="font-bold text-slate-700 flex items-center gap-2">
                                                <CheckSquare size={18} className="text-purple-500" />
                                                Tareas Activas
                                            </h5>
                                            {isTeacher && (
                                                <button
                                                    onClick={() => {
                                                        setTargetClassId(cls.id);
                                                        setIsCreatingTask(true);
                                                    }}
                                                    className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg hover:bg-purple-200"
                                                >
                                                    + Nueva Tarea
                                                </button>
                                            )}
                                        </div>

                                        {isCreatingTask && targetClassId === cls.id && (
                                            <div className="bg-white p-4 rounded-xl border border-purple-100 mb-4 shadow-sm animate-in fade-in zoom-in duration-200">
                                                <h6 className="text-xs font-bold text-purple-600 mb-2 uppercase">Crear Tarea</h6>
                                                <div className="space-y-3">
                                                    <input
                                                        className="w-full bg-slate-50 px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-purple-200"
                                                        placeholder="Título de la tarea..."
                                                        value={newTaskTitle}
                                                        onChange={e => setNewTaskTitle(e.target.value)}
                                                    />
                                                    <textarea
                                                        className="w-full bg-slate-50 px-3 py-2 rounded-lg text-sm border-none focus:ring-2 focus:ring-purple-200"
                                                        placeholder="Descripción..."
                                                        rows={2}
                                                        value={newTaskDesc}
                                                        onChange={e => setNewTaskDesc(e.target.value)}
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => setIsCreatingTask(false)} className="text-xs px-3 py-1 text-slate-400 font-bold">Cancelar</button>
                                                        <button onClick={createTask} className="text-xs px-4 py-1.5 bg-purple-600 text-white rounded-lg font-bold shadow-md shadow-purple-200">Guardar Tarea</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-3">
                                            {myTasks
                                                .filter(t => t.class_id === cls.id)
                                                .filter(t => isTeacher || !completedTaskIds.has(t.id))
                                                .map(task => (
                                                    <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
                                                        {!isTeacher && (
                                                            <button
                                                                onClick={() => toggleTaskCompletion(task.id, completedTaskIds.has(task.id))}
                                                                className="mt-1 text-slate-300 hover:text-green-500 transition-colors"
                                                                title="Marcar como completada"
                                                            >
                                                                {completedTaskIds.has(task.id) ? (
                                                                    <CheckCircle size={24} weight="fill" className="text-green-500" />
                                                                ) : (
                                                                    <Square size={24} />
                                                                )}
                                                            </button>
                                                        )}
                                                        <div className="flex-1">
                                                            <h6 className={`font-bold text-slate-800 ${completedTaskIds.has(task.id) ? 'line-through text-slate-400' : ''}`}>{task.title}</h6>
                                                            {task.description && <p className="text-xs text-slate-500 mt-1">{task.description}</p>}
                                                        </div>
                                                        {isTeacher && (
                                                            <div className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">
                                                                Docente
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            {myTasks.filter(t => t.class_id === cls.id).filter(t => isTeacher || !completedTaskIds.has(t.id)).length === 0 && (
                                                <p className="text-center text-xs text-slate-400 italic py-4">No hay tareas activas en este momento.</p>
                                            )}
                                        </div>

                                        {!isTeacher && completedTaskIds.size > 0 && (
                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                <p className="text-xs text-slate-400 text-center">
                                                    {myTasks.filter(t => t.class_id === cls.id && completedTaskIds.has(t.id)).length} tareas completadas ocultas.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {isTeacher && selectedClassId === cls.id ? (
                                        <div className="space-y-4 border-t border-slate-100 pt-4">
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
                                        isTeacher && (
                                            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex -space-x-2">
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
                                        )
                                    )}
                                </div>
                            ))}

                            {myClasses.length === 0 && (
                                <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold">No estás inscrito en ninguna clase todavía.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
}
