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
    subject?: string;
    grade?: string;
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

type Notification = {
    id: string;
    user_id: string;
    type: string;
    title: string;
    message: string;
    data: any;
    read: boolean;
    created_at: string;
};

export default function RoleBasedDashboard() {
    const [myProfile, setMyProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'connections' | 'classes' | 'tasks' | 'notifications'>('connections');

    // Data lists
    const [profiles, setProfiles] = useState<Profile[]>([]); // For searching
    const [myConnections, setMyConnections] = useState<Profile[]>([]);
    const [myClasses, setMyClasses] = useState<Class[]>([]);
    const [myTasks, setMyTasks] = useState<Task[]>([]);
    const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
    const [studentClasses, setStudentClasses] = useState<Record<string, Class[]>>({});
    const [enrolledStudentsByClass, setEnrolledStudentsByClass] = useState<Record<string, Profile[]>>({});
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // UI states
    const [searchTerm, setSearchTerm] = useState('');
    const [openedDropdownId, setOpenedDropdownId] = useState<string | null>(null);
    const [isCreatingClass, setIsCreatingClass] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newClassDesc, setNewClassDesc] = useState('');
    const [newClassSubject, setNewClassSubject] = useState('');
    const [newClassGrade, setNewClassGrade] = useState('');

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

        // Click outside to close dropdowns
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            // If it's not a dropdown button and not inside a dropdown, close them
            if (!target.closest('.dropdown-trigger') && !target.closest('.dropdown-content')) {
                setOpenedDropdownId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openedDropdownId]);

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
            fetchNotifications(profile.id);
        }
        setLoading(false);
    };



    const fetchConnections = async (userId: string, role: string) => {
        const table = 'student_teachers';
        const filterCol = role === 'student' ? 'student_id' : 'teacher_id';
        const selectCol = role === 'student' ? 'teacher_id' : 'student_id';

        // Fetch connections with status
        const { data } = await supabase
            .from(table)
            .select(`status, profiles!${table}_${selectCol}_fkey(*)`)
            .eq(filterCol, userId);

        if (data) {
            // Map to profile but include status attached to the profile object for UI logic
            const profilesWithStatus = data.map((item: any) => ({
                ...item.profiles,
                connection_status: item.status // 'pending' | 'accepted'
            }));
            setMyConnections(profilesWithStatus);

            // If teacher, fetch classes for these students (only accepted ones ideally, but let's fetch all for now)
            if (role === 'teacher' && profilesWithStatus.length > 0) {
                fetchStudentEnrollments(profilesWithStatus.map((p: any) => p.id));
            }
        }
    };

    const fetchNotifications = async (userId: string) => {
        const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (data) setNotifications(data);
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

    const fetchClassMembers = async (classIds: string[]) => {
        if (classIds.length === 0) return;

        const { data } = await supabase
            .from('class_students')
            .select('class_id, profiles:student_id(*)') // Updated to use correct relation name if possible, or assume profiles joined on student_id
            .in('class_id', classIds);

        if (data) {
            const map: Record<string, Profile[]> = {};
            data.forEach((item: any) => {
                if (!map[item.class_id]) map[item.class_id] = [];
                if (item.profiles) map[item.class_id].push(item.profiles);
            });
            setEnrolledStudentsByClass(map);
        }
    };

    const fetchClassesAsTeacher = async (teacherId: string) => {
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .eq('teacher_id', teacherId);

        if (error) console.error("Error fetching classes:", error);
        if (data) {
            setMyClasses(data);
            // Also refresh student enrollments if connections exist
            if (myConnections.length > 0) {
                fetchStudentEnrollments(myConnections.map(c => c.id));
            }
            const classIds = data.map((c: any) => c.id);
            if (classIds.length > 0) {
                fetchTasks(classIds);
                fetchClassMembers(classIds);
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

        // 1. Create connection request (pending)
        const payload = myProfile.role === 'student'
            ? { student_id: myProfile.id, teacher_id: targetId, status: 'pending' }
            : { student_id: targetId, teacher_id: myProfile.id, status: 'pending' };

        const { error: connError, data: connData } = await supabase
            .from('student_teachers')
            .insert(payload)
            .select();

        if (!connError) {
            // 2. Send Notification
            // If I am a teacher adding a student
            if (myProfile.role === 'teacher') {
                const { data: cls } = classId
                    ? await supabase.from('classes').select('name').eq('id', classId).single()
                    : { data: null };

                const className = cls ? cls.name : 'una clase';

                await supabase.from('notifications').insert({
                    user_id: targetId,
                    type: 'connection_request',
                    title: 'Solicitud de Profesor',
                    message: `${myProfile.full_name} quiere añadirte como alumno${classId ? ` a la clase "${className}"` : ''}.`,
                    data: {
                        teacher_id: myProfile.id,
                        class_id: classId,
                        teacher_name: myProfile.full_name
                    }
                });
                alert("Solicitud enviada al alumno. Debe aprobarla para que aparezca en la clase.");
            } else {
                // Student adding teacher - usually implies direct follow or request
                alert("Solicitud enviada.");
            }

            fetchConnections(myProfile.id, myProfile.role);
            setProfiles(profiles.filter(p => p.id !== targetId));
            setShowClassSelector(false);
            setPendingStudentId(null);
        } else {
            if (connError.code === '23505') {
                alert("Ya existe una vinculación con este usuario.");
            } else {
                alert("Error al vincular: " + connError.message);
            }
        }
    };

    const approveConnection = async (notification: Notification) => {
        if (!myProfile) return;
        const other_party_id = notification.data?.teacher_id || notification.data?.sender_id || notification.data?.student_id;
        const class_id = notification.data?.class_id;

        if (!other_party_id) {
            console.error("No target ID found in notification data", notification);
            return;
        }

        // Use RPC to accept both connection and class invitation atomically (bypasses student RLS)
        const { error: acceptError } = await supabase.rpc('accept_class_invitation', {
            target_user_id: other_party_id,
            target_class_id: class_id || null
        });

        if (!acceptError) {
            // Mark notification as read so it stays in "All" history
            const { error: readError } = await supabase.rpc('mark_notification_read', { notif_id: notification.id });
            if (readError) {
                await supabase.from('notifications')
                    .update({ read: true })
                    .eq('id', notification.id)
                    .eq('user_id', myProfile.id);
            }

            // Refresh data
            fetchNotifications(myProfile.id);
            fetchConnections(myProfile.id, myProfile.role);
            if (class_id) fetchClassesAsStudent(myProfile.id);

            alert("¡Solicitud aceptada!");
        } else {
            console.error("Error accepting connection:", acceptError);
            alert("Error al aceptar: " + (acceptError.message || 'Error desconocido'));
        }
    };

    const rejectConnection = async (notification: Notification) => {
        if (!myProfile) return;
        const teacher_id = notification.data?.teacher_id || notification.data?.sender_id;

        if (!teacher_id) {
            console.error("No teacher_id or sender_id found in notification data", notification);
            return;
        }

        // Delete the pending connection
        const { error: connError } = await supabase.from('student_teachers').delete()
            .eq('student_id', myProfile.id)
            .eq('teacher_id', teacher_id);

        if (connError) console.error("Error deleting connection:", connError);

        // Delete notification
        const { error: deleteError } = await supabase.from('notifications').delete().eq('id', notification.id);

        if (deleteError) {
            console.error("Error deleting notification:", deleteError);
            // Optimistic update
            setNotifications(prev => prev.filter(n => n.id !== notification.id));
        } else {
            fetchNotifications(myProfile.id);
        }

        alert("Solicitud rechazada.");
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
        if (!myProfile || !newClassName) {
            console.error("Missing profile or class name");
            return;
        }

        const payload = {
            teacher_id: myProfile.id,
            name: newClassName,
            description: newClassDesc,
            subject: newClassSubject,
            grade: newClassGrade
        };

        const { data, error } = await supabase.from('classes').insert(payload).select();

        if (error) {
            console.error('Error creating class:', error);
            alert('Error al crear la clase: ' + error.message);
        } else {
            alert("Clase creada correctamente");
            if (myProfile.id) await fetchClassesAsTeacher(myProfile.id);
            setIsCreatingClass(false);
            setNewClassName('');
            setNewClassDesc('');
            setNewClassSubject('');
            setNewClassGrade('');
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    onClick={() => setActiveTab('connections')}
                    className={`group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer transition-all duration-300 ${activeTab === 'connections' ? 'ring-4 ring-offset-4 ring-blue-500 scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:brightness-110 opacity-90 hover:opacity-100'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
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
                    className={`group bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer transition-all duration-300 ${activeTab === 'classes' ? 'ring-4 ring-offset-4 ring-purple-500 scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:brightness-110 opacity-90 hover:opacity-100'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
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

                <div
                    onClick={() => setActiveTab('tasks')}
                    className={`group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer transition-all duration-300 ${activeTab === 'tasks' ? 'ring-4 ring-offset-4 ring-emerald-500 scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl hover:-translate-y-1 hover:brightness-110 opacity-90 hover:opacity-100'}`}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                            <CheckSquare size={32} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Tareas</h3>
                            <p className="text-white/80 text-sm">{isTeacher ? 'Actividades asignadas' : 'Tus entregas'}</p>
                        </div>
                    </div>
                    <div className="text-3xl font-black">{isTeacher ? myTasks.length : myTasks.length}</div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{isTeacher ? 'Total Tareas' : 'Pendientes'}</p>
                </div>
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
                                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                {conn.full_name || 'Sin nombre'}
                                                {(conn as any).connection_status === 'pending' && (
                                                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Pendiente</span>
                                                )}
                                            </h4>
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
                                                    className="bg-blue-50 text-blue-600 p-1 rounded-md hover:bg-blue-100 transition-colors dropdown-trigger"
                                                    title="Añadir a otra clase"
                                                >
                                                    <Plus size={14} weight="bold" />
                                                </button>
                                            </div>

                                            {/* Add Class Dropdown */}
                                            {openedDropdownId === conn.id && (
                                                <div className="absolute top-8 right-0 bg-white border border-slate-100 shadow-xl rounded-xl z-20 w-48 overflow-hidden animate-in fade-in zoom-in duration-200 dropdown-content">
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
                                        placeholder="Nombre de la clase (ej: Ciencia y Futuro)"
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
                                    <select
                                        className="bg-white border-2 border-purple-100 rounded-2xl px-5 py-3 text-slate-700 outline-none focus:border-purple-500"
                                        value={newClassSubject}
                                        onChange={(e) => setNewClassSubject(e.target.value)}
                                    >
                                        <option value="">Seleccionar Materia...</option>
                                        <option value="Matemáticas">Matemáticas</option>
                                        <option value="Lengua">Lengua y Literatura</option>
                                        <option value="Inglés">Inglés</option>
                                        <option value="Ciencias Naturales">Ciencias Naturales</option>
                                        <option value="Ciencias Sociales">Ciencias Sociales</option>
                                        <option value="Biología">Biología</option>
                                        <option value="Química">Química</option>
                                        <option value="Física">Física</option>
                                        <option value="Geografía">Geografía</option>
                                        <option value="Historia">Historia</option>
                                        <option value="Economía">Economía</option>
                                        <option value="Música">Música</option>
                                        <option value="Arte">Arte</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    <select
                                        className="bg-white border-2 border-purple-100 rounded-2xl px-5 py-3 text-slate-700 outline-none focus:border-purple-500"
                                        value={newClassGrade}
                                        onChange={(e) => setNewClassGrade(e.target.value)}
                                    >
                                        <option value="">Seleccionar Nivel/Curso...</option>
                                        <option value="1º Primaria">1º Primaria</option>
                                        <option value="2º Primaria">2º Primaria</option>
                                        <option value="3º Primaria">3º Primaria</option>
                                        <option value="4º Primaria">4º Primaria</option>
                                        <option value="5º Primaria">5º Primaria</option>
                                        <option value="6º Primaria">6º Primaria</option>
                                        <option value="1º ESO">1º ESO</option>
                                        <option value="2º ESO">2º ESO</option>
                                        <option value="3º ESO">3º ESO</option>
                                        <option value="4º ESO">4º ESO</option>
                                        <option value="1º Bachillerato">1º Bachillerato</option>
                                        <option value="2º Bachillerato">2º Bachillerato</option>
                                        <option value="Universidad">Universidad</option>
                                        <option value="Otro">Otro</option>
                                    </select>
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
                                            <div className="flex gap-2 mb-2">
                                                {cls.subject && (
                                                    <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                                                        {cls.subject}
                                                    </span>
                                                )}
                                                {cls.grade && (
                                                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-200">
                                                        {cls.grade}
                                                    </span>
                                                )}
                                            </div>
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

                                    {/* SECTION 1: TASKS */}
                                    <div className="space-y-3 mb-4 flex-1">
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

                                        {/* SECTION 2: STUDENTS (Unified) */}
                                        {isTeacher && (
                                            <div className="mt-6 border-t border-slate-100 pt-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h5 className="font-bold text-slate-700 flex items-center gap-2">
                                                        <Users size={18} className="text-blue-500" />
                                                        Alumnos ({enrolledStudentsByClass[cls.id]?.length || 0})
                                                    </h5>
                                                    <button
                                                        onClick={() => {
                                                            if (selectedClassId === cls.id) {
                                                                setSelectedClassId(null);
                                                            } else {
                                                                setSelectedClassId(cls.id);
                                                                fetchClassStudents(cls.id);
                                                            }
                                                        }}
                                                        className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                                                    >
                                                        {selectedClassId === cls.id ? 'Cerrar Gestión' : 'Gestionar'}
                                                    </button>
                                                </div>

                                                {/* Student Grid (Always Visible) */}
                                                <div className="mb-4">
                                                    {(enrolledStudentsByClass[cls.id] || []).length > 0 ? (
                                                        <div className="flex flex-wrap gap-4">
                                                            {(enrolledStudentsByClass[cls.id] || []).map((student) => (
                                                                <div key={student.id} className="flex flex-col items-center group/student">
                                                                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-sm font-bold text-blue-600 mb-1 group-hover/student:scale-110 group-hover/student:border-blue-200 transition-all">
                                                                        {student.full_name?.[0] || '?'}
                                                                    </div>
                                                                    <span className="text-[10px] font-medium text-slate-500 max-w-[60px] truncate text-center leading-tight group-hover/student:text-blue-600">
                                                                        {student.full_name?.split(' ')[0]}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-slate-400 text-xs italic">No hay alumnos inscritos.</p>
                                                    )}
                                                </div>

                                                {/* Management Area (Expandable) */}
                                                {selectedClassId === cls.id && (
                                                    <div className="bg-slate-50 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                        <div className="bg-white p-4 rounded-xl border border-slate-100 mb-4">
                                                            <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Eliminar Alumnos</h6>
                                                            <div className="space-y-2">
                                                                {classStudents.map(student => (
                                                                    <div key={student.id} className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-slate-50">
                                                                        <span className="font-bold text-slate-700">{student.full_name}</span>
                                                                        <button onClick={() => removeStudentFromClass(cls.id, student.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-md">
                                                                            <Trash size={14} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                {classStudents.length === 0 && <p className="text-slate-400 text-xs italic">Lista vacía</p>}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h6 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Añadir Alumno Existente</h6>
                                                            <div className="flex flex-wrap gap-2">
                                                                {myConnections.filter(conn => !classStudents.find(s => s.id === conn.id)).length > 0 ? (
                                                                    myConnections
                                                                        .filter(conn => !classStudents.find(s => s.id === conn.id))
                                                                        .map(conn => (
                                                                            <button
                                                                                key={conn.id}
                                                                                onClick={() => addStudentToClass(cls.id, conn.id)}
                                                                                className="px-3 py-1.5 bg-white text-blue-600 rounded-full text-xs font-bold border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                                            >
                                                                                + {conn.full_name}
                                                                            </button>
                                                                        ))
                                                                ) : (
                                                                    <p className="text-slate-400 text-xs italic">No tienes alumnos disponibles para añadir.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
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

                {activeTab === 'tasks' && (
                    <motion.div
                        key="tasks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="bg-emerald-50 p-6 rounded-full mb-6">
                            <CheckSquare size={64} className="text-emerald-500" weight="duotone" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Gestión de Tareas</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Este panel está actualmente en desarrollo. Próximamente podrás gestionar todas las entregas y calificaciones desde aquí.
                        </p>
                    </motion.div>
                )}

                {activeTab === 'notifications' && (
                    <motion.div
                        key="notifications"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <h3 className="font-bold text-xl text-slate-800 mb-4">Tus Notificaciones</h3>
                        {notifications.length === 0 ? (
                            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center text-slate-400">
                                No tienes notificaciones nuevas.
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">{notif.title}</h4>
                                        <p className="text-slate-500">{notif.message}</p>
                                        <p className="text-slate-300 text-xs mt-2">{new Date(notif.created_at).toLocaleDateString()}</p>
                                    </div>
                                    {notif.type === 'connection_request' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => rejectConnection(notif)}
                                                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                            >
                                                Rechazar
                                            </button>
                                            <button
                                                onClick={() => approveConnection(notif)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                            >
                                                Aprobar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>


        </div >
    );
}
