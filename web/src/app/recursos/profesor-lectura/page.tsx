import { Metadata } from 'next';
import ReadingTeacherTool from '@/components/resources/ReadingTeacherTool';

export const metadata: Metadata = {
    title: 'Profesor de Lectura | Mejora tu Fluidez Lectora Online Gratis',
    description: 'Practica la lectura con nuestro asistente inteligente. Herramienta gratuita con resaltado de palabras en tiempo real, control de velocidad y modo enfoque para niños y estudiantes.',
    keywords: ['profesor de lectura', 'fluidez lectora', 'practicar lectura online', 'comprensión lectora gratis', 'herramientas educativas lectura', 'lectura asistida por voz']
};

export default function ReadingTeacherPage() {
    return (
        <div className="min-h-screen relative bg-slate-50/50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-20 pt-32 pb-12">
                <ReadingTeacherTool />
            </div>
        </div>
    );
}
