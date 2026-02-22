'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
    MapTrifold,
    Brain,
    Calculator,
    GlobeHemisphereWest,
    Student,
    PuzzlePiece,
    Translate,
    ArrowRight,
    Dna,
    Plant,
    CaretDown,
    Funnel,
    Plus,
    X,
    Pencil,
    UserSound,
    Star,
    ChatCircleText,
    Trophy
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/context/ToastContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Game = {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: any;
    color: string;
    grade: string;
    region?: string;
    gameType?: string;
    mode?: 'writing' | 'pronunciation';
};

type Subsection = {
    title?: string;
    games: Game[];
};

type Category = {
    id: string;
    title: string;
    icon: any;
    colorTheme: string; // The base color for the whole section
    subsections: Subsection[];
};

export default function ActividadesClient() {
    const { t, language } = useLanguage();
    const { success, error, warning, info } = useToast();
    const [selectedGrade, setSelectedGrade] = useState<string>('all');
    const [mounted, setMounted] = useState(false);
    const [ratings, setRatings] = useState<Record<string, { avg: number; count: number }>>({});

    useEffect(() => { setMounted(true); }, []);
    const [filterOpen, setFilterOpen] = useState(false);

    // Handle hash scroll
    useEffect(() => {
        if (!mounted) return;

        const handleHashScroll = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                // Short delay to ensure content is rendered
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        };

        handleHashScroll();
        window.addEventListener('hashchange', handleHashScroll);
        return () => window.removeEventListener('hashchange', handleHashScroll);
    }, [mounted]);

    // Auth & Assignment State
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [classes, setClasses] = useState<any[]>([]);
    const [isAssigning, setIsAssigning] = useState<Game | null>(null);
    const [selectedClassId, setSelectedClassId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);

    // Check user and fetch classes
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                if (session?.user) {
                    setUser(session.user);
                    const { data: p } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                    setProfile(p);

                    if (p?.role === 'teacher') {
                        const { data: cls } = await supabase.from('classes').select('*').eq('teacher_id', session.user.id);
                        if (cls) setClasses(cls);
                    }
                }
            } catch (err: any) {
                console.warn("Actividades auth session error:", err.message);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchRatings = async () => {
            try {
                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('activity_id, rating');

                if (!isMounted) return;

                if (error) {
                    // Silently ignore AbortError - happens on StrictMode double-mount
                    if (error.message?.includes('AbortError') || error.code === '') return;
                    console.error('Error fetching ratings from Supabase:', JSON.stringify(error, null, 2));
                    return;
                }

                if (!data) return;

                const counts: Record<string, { sum: number; count: number }> = {};
                data.forEach((r: any) => {
                    if (!counts[r.activity_id]) counts[r.activity_id] = { sum: 0, count: 0 };
                    counts[r.activity_id].sum += r.rating;
                    counts[r.activity_id].count += 1;
                });

                const processed: Record<string, { avg: number; count: number }> = {};
                Object.keys(counts).forEach(id => {
                    processed[id] = {
                        avg: Math.round((counts[id].sum / counts[id].count) * 10) / 10,
                        count: counts[id].count
                    };
                });

                if (isMounted) setRatings(processed);
            } catch (err: any) {
                // Silently ignore AbortError - it's expected on component unmount
                if (err?.name === 'AbortError' || err?.message?.includes('AbortError') || err?.message?.includes('signal is aborted')) return;
                if (isMounted) console.error('Error fetching ratings:', err);
            }
        };

        fetchRatings();

        return () => { isMounted = false; };
    }, []);


    const scrollToCategory = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Updating hash manually as well to ensure URL matches
            if (window.location.hash !== `#${id}`) {
                window.history.pushState(null, '', `#${id}`);
            }
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleAssign = async () => {
        if (!isAssigning || !selectedClassId || !user) return;
        setIsSubmitting(true);

        try {
            const { error: apiError } = await supabase.from('tasks').insert({
                class_id: selectedClassId,
                title: isAssigning.title,
                description: `Actividad interactiva: ${isAssigning.description}`,
                activity_slug: isAssigning.href.split('/').pop() // Extract slug from href
            });

            if (apiError) throw apiError;

            // Notify students of the class
            const { data: students } = await supabase
                .from('class_students')
                .select('student_id')
                .eq('class_id', selectedClassId)
                .eq('status', 'active');

            if (students && students.length > 0) {
                const notifications = students.map((s: any) => ({
                    user_id: s.student_id,
                    type: 'new_task',
                    title: 'Nueva Actividad Asignada',
                    message: `${profile?.full_name || 'Tu profesor'} ha asignado: "${isAssigning.title}".`,
                    data: { class_id: selectedClassId, activity_slug: isAssigning.href.split('/').pop() }
                }));
                await supabase.from('notifications').insert(notifications);
            }

            success(`Actividad "${isAssigning.title}" asignada correctamente.`);
            setIsAssigning(null);
            setSelectedClassId("");
            window.dispatchEvent(new Event('notification-updated'));
        } catch (err: any) {
            error("Error al asignar actividad: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Global click-outside listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterOpen && filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [filterOpen]);

    const categories: Category[] = [
        {
            id: 'geography',
            title: t.gamesPage.categories.geography,
            icon: MapTrifold,
            colorTheme: 'from-emerald-600 to-teal-800',
            subsections: [
                {
                    title: t.gamesPage.regions.spain,
                    games: [
                        {
                            id: 'mapa-comunidades',
                            title: t.gamesPage.gameTitles.region,
                            description: t.gamesPage.gameTitles.regionDesc,
                            href: '/actividades/mapa-comunidades',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-provincias',
                            title: t.gamesPage.gameTitles.provinces,
                            description: t.gamesPage.gameTitles.provincesDesc,
                            href: '/actividades/mapa-provincias',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-rios',
                            title: t.gamesPage.gameTitles.riversSpain,
                            description: t.gamesPage.gameTitles.riversSpainDesc,
                            href: '/actividades/mapa-rios',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-espana',
                            title: t.gamesPage.gameTitles.mountainsSpain,
                            description: t.gamesPage.gameTitles.mountainsSpainDesc,
                            href: '/actividades/montanas-espana',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.spain,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.europe,
                    games: [
                        {
                            id: 'mapa-europa',
                            title: t.gamesPage.gameTitles.europeMap,
                            description: t.gamesPage.gameTitles.europeMapDesc,
                            href: '/actividades/mapa-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'capitales-ue',
                            title: t.gamesPage.gameTitles.euCapitalsMap,
                            description: t.gamesPage.gameTitles.euCapitalsMapDesc,
                            href: '/actividades/capitales-ue',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'capitales-europa',
                            title: t.gamesPage.gameTitles.europeCapitalsMap,
                            description: t.gamesPage.gameTitles.europeCapitalsMapDesc,
                            href: '/actividades/capitales-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'rios-europa',
                            title: t.gamesPage.gameTitles.riversEurope,
                            description: t.gamesPage.gameTitles.riversEuropeDesc,
                            href: '/actividades/rios-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },

                        {
                            id: 'capitales-europa-match',
                            title: t.gamesPage.gameTitles.europeCapitalsPuzzle,
                            description: t.gamesPage.gameTitles.europeCapitalsPuzzleDesc,
                            href: '/actividades/capitales-europa-match',
                            icon: PuzzlePiece,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.puzzle
                        },
                        {
                            id: 'montanas-europa',
                            title: t.gamesPage.gameTitles.mountainsEurope,
                            description: t.gamesPage.gameTitles.mountainsEuropeDesc,
                            href: '/actividades/montanas-europa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-europa',
                            title: t.gamesPage.gameTitles.oceansEurope,
                            description: t.gamesPage.gameTitles.oceansEuropeDesc,
                            href: '/actividades/mares-europa',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.europe,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.america,
                    games: [
                        {
                            id: 'mapa-norteamerica',
                            title: t.gamesPage.gameTitles.northAmericaMap,
                            description: t.gamesPage.gameTitles.northAmericaMapDesc,
                            href: '/actividades/mapa-norteamerica',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-sudamerica',
                            title: t.gamesPage.gameTitles.southAmericaMap,
                            description: t.gamesPage.gameTitles.southAmericaMapDesc,
                            href: '/actividades/mapa-sudamerica',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-usa',
                            title: t.gamesPage.gameTitles.usaStatesMap,
                            description: t.gamesPage.gameTitles.usaStatesMapDesc,
                            href: '/actividades/mapa-usa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mapa-america',
                            title: t.gamesPage.gameTitles.americaMap,
                            description: t.gamesPage.gameTitles.americaMapDesc,
                            href: '/actividades/mapa-america',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-america',
                            title: t.gamesPage.gameTitles.mountainsAmerica,
                            description: t.gamesPage.gameTitles.mountainsAmericaDesc,
                            href: '/actividades/montanas-america',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-america',
                            title: t.gamesPage.gameTitles.oceansAmerica,
                            description: t.gamesPage.gameTitles.oceansAmericaDesc,
                            href: '/actividades/mares-america',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.america,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.africa,
                    games: [
                        {
                            id: 'mapa-africa',
                            title: t.gamesPage.gameTitles.africaMap,
                            description: t.gamesPage.gameTitles.africaMapDesc,
                            href: '/actividades/mapa-africa',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.africa,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.asia,
                    games: [
                        {
                            id: 'mapa-asia',
                            title: t.gamesPage.gameTitles.asiaMap,
                            description: t.gamesPage.gameTitles.asiaMapDesc,
                            href: '/actividades/mapa-asia',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-asia',
                            title: t.gamesPage.gameTitles.mountainsAsia,
                            description: t.gamesPage.gameTitles.mountainsAsiaDesc,
                            href: '/actividades/montanas-asia',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-asia',
                            title: t.gamesPage.gameTitles.oceansAsia,
                            description: t.gamesPage.gameTitles.oceansAsiaDesc,
                            href: '/actividades/mares-asia',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.asia,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                },
                {
                    title: t.gamesPage.regions.oceania,
                    games: [
                        {
                            id: 'mapa-oceania',
                            title: t.gamesPage.gameTitles.oceaniaMap,
                            description: t.gamesPage.gameTitles.oceaniaMapDesc,
                            href: '/actividades/mapa-oceania',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'montanas-oceania',
                            title: t.gamesPage.gameTitles.mountainsOceania,
                            description: t.gamesPage.gameTitles.mountainsOceaniaDesc,
                            href: '/actividades/montanas-oceania',
                            icon: MapTrifold,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'mares-oceania',
                            title: t.gamesPage.gameTitles.oceansOceania,
                            description: t.gamesPage.gameTitles.oceansOceaniaDesc,
                            href: '/actividades/mares-oceania',
                            icon: GlobeHemisphereWest,
                            color: 'from-emerald-500 to-teal-600',
                            grade: '5º Prim.',
                            region: t.gamesPage.regions.oceania,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                }
            ]
        },
        {
            id: 'biology',
            title: t.gamesPage.categories.biology,
            icon: Dna,
            colorTheme: 'from-blue-600 to-cyan-800',
            subsections: [
                {
                    games: [
                        {
                            id: 'celula-animal',
                            title: t.gamesPage.gameTitles.animalCell,
                            description: t.gamesPage.gameTitles.animalCellDesc,
                            href: '/actividades/celula-animal',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'celula-vegetal',
                            title: t.gamesPage.gameTitles.plantCell,
                            description: t.gamesPage.gameTitles.plantCellDesc,
                            href: '/actividades/celula-vegetal',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'sistema-reproductor-masculino',
                            title: t.gamesPage.gameTitles.maleReproductive,
                            description: t.gamesPage.gameTitles.maleReproductiveDesc,
                            href: '/actividades/sistema-reproductor-masculino',
                            icon: Dna,
                            color: 'from-blue-500 to-indigo-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'sistema-reproductor-femenino',
                            title: t.gamesPage.gameTitles.femaleReproductive,
                            description: t.gamesPage.gameTitles.femaleReproductiveDesc,
                            href: '/actividades/sistema-reproductor-femenino',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'musculos',
                            title: t.gamesPage.gameTitles.muscles,
                            description: t.gamesPage.gameTitles.musclesDesc,
                            href: '/actividades/musculos',
                            icon: Brain,
                            color: 'from-blue-500 to-cyan-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        },
                        {
                            id: 'esqueleto',
                            title: t.gamesPage.gameTitles.skeleton,
                            description: t.gamesPage.gameTitles.skeletonDesc,
                            href: '/actividades/esqueleto',
                            icon: Dna,
                            color: 'from-blue-500 to-cyan-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.map
                        }
                    ]
                }
            ]
        },
        {
            id: 'idiomas',
            title: t.gamesPage.regions.languages,
            icon: Translate,
            colorTheme: 'from-violet-600 to-purple-800',
            subsections: [
                {
                    games: [
                        {
                            id: 'verbos-irregulares-basico',
                            title: t.gamesPage.verbsLevels.basic.title,
                            description: t.gamesPage.verbsLevels.basic.desc,
                            href: '/actividades/verbos-irregulares-basico',
                            icon: Translate,
                            color: 'from-violet-500 to-purple-600',
                            grade: t.gamesPage.grades.prim4,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'writing'
                        },
                        {
                            id: 'verbos-irregulares',
                            title: t.gamesPage.verbsLevels.medium.title,
                            description: t.gamesPage.verbsLevels.medium.desc,
                            href: '/actividades/verbos-irregulares',
                            icon: Translate,
                            color: 'from-violet-500 to-purple-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'writing'
                        },
                        {
                            id: 'verbos-irregulares-pro',
                            title: t.gamesPage.verbsLevels.pro.title,
                            description: t.gamesPage.verbsLevels.pro.desc,
                            href: '/actividades/verbos-irregulares-pro',
                            icon: Translate,
                            color: 'from-violet-600 to-indigo-700',
                            grade: t.gamesPage.grades.prim6,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'writing'
                        },
                        {
                            id: 'verbos-irregulares-master',
                            title: t.gamesPage.verbsLevels.master.title,
                            description: t.gamesPage.verbsLevels.master.desc,
                            href: '/actividades/verbos-irregulares-master',
                            icon: Translate,
                            color: 'from-violet-600 to-indigo-700',
                            grade: t.gamesPage.grades.expert,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'writing'
                        },
                        {
                            id: 'verbos-irregulares-basico-pronunciacion',
                            title: t.gamesPage.verbsLevels.basic.title,
                            description: t.gamesPage.verbsLevels.basic.descP,
                            href: '/actividades/verbos-irregulares-basico-pronunciacion',
                            icon: Translate,
                            color: 'from-violet-500 to-purple-600',
                            grade: t.gamesPage.grades.prim4,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'pronunciation'
                        },
                        {
                            id: 'verbos-irregulares-pronunciacion',
                            title: t.gamesPage.verbsLevels.medium.title,
                            description: t.gamesPage.verbsLevels.medium.descP,
                            href: '/actividades/verbos-irregulares-pronunciacion',
                            icon: Translate,
                            color: 'from-violet-500 to-purple-600',
                            grade: t.gamesPage.grades.prim5,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'pronunciation'
                        },
                        {
                            id: 'verbos-irregulares-pro-pronunciacion',
                            title: t.gamesPage.verbsLevels.pro.title,
                            description: t.gamesPage.verbsLevels.pro.descP,
                            href: '/actividades/verbos-irregulares-pro-pronunciacion',
                            icon: Translate,
                            color: 'from-violet-600 to-indigo-700',
                            grade: t.gamesPage.grades.prim6,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'pronunciation'
                        },
                        {
                            id: 'verbos-irregulares-master-pronunciacion',
                            title: t.gamesPage.verbsLevels.master.title,
                            description: t.gamesPage.verbsLevels.master.descP,
                            href: '/actividades/verbos-irregulares-master-pronunciacion',
                            icon: Translate,
                            color: 'from-violet-600 to-indigo-700',
                            grade: t.gamesPage.grades.expert,
                            gameType: t.gamesPage.gameTypes.verbs,
                            mode: 'pronunciation'
                        }
                    ]
                }
            ]
        },
        {
            id: 'math',
            title: t.gamesPage.categories.math,
            icon: Calculator,
            colorTheme: 'from-orange-600 to-amber-800',
            subsections: [
                {
                    games: [
                        {
                            id: 'divisiones',
                            title: t.gamesPage.gameTitles.division,
                            description: t.gamesPage.gameTitles.divisionDesc,
                            href: '/actividades/divisiones',
                            icon: Calculator,
                            color: 'from-orange-500 to-amber-600',
                            grade: t.gamesPage.grades.prim3,
                            gameType: t.gamesPage.gameTypes.math
                        },
                        {
                            id: 'multiplicaciones',
                            title: t.gamesPage.gameTitles.multiplication,
                            description: t.gamesPage.gameTitles.multiplicationDesc,
                            href: '/actividades/multiplicaciones',
                            icon: Calculator,
                            color: 'from-orange-500 to-amber-600',
                            grade: t.gamesPage.grades.prim2,
                            gameType: t.gamesPage.gameTypes.math
                        }
                    ]
                }
            ]
        }
    ];

    // Get unique grades available in all games for the filter
    const availableGrades = useMemo(() => {
        const grades = new Set<string>();
        categories.forEach(cat => {
            cat.subsections.forEach(sub => {
                sub.games.forEach(game => grades.add(game.grade));
            });
        });
        return Array.from(grades).sort();
    }, [categories]);

    // Filter categories and subsections based on selected grade and selected subject
    const filteredCategories = useMemo(() => {
        let result = categories;

        // 1. Filter by Grade (Course)
        if (selectedGrade !== 'all') {
            result = result.map(cat => ({
                ...cat,
                subsections: cat.subsections.map(sub => ({
                    ...sub,
                    games: sub.games.filter(game => game.grade === selectedGrade || game.grade === 'Todo')
                })).filter(sub => sub.games.length > 0)
            })).filter(cat => cat.subsections.length > 0);
        }

        return result;
    }, [selectedGrade, categories]);

    // Categories available for the current grade (used for chips)
    const availableCategories = useMemo(() => {
        if (selectedGrade === 'all') return categories;
        return categories.filter(cat =>
            cat.subsections.some(sub =>
                sub.games.some(game => game.grade === selectedGrade || game.grade === 'Todo')
            )
        );
    }, [selectedGrade, categories]);

    return (
        <main className="min-h-screen text-white pt-28 pb-12 px-4 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-4 text-center relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black leading-tight text-slate-800"
                    >
                        {t.gamesPage.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-700 max-w-2xl mx-auto font-medium mb-10"
                    >
                        {t.gamesPage.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 mb-12 flex justify-center"
                    >
                        <Link
                            href="/actividades/rankings"
                            className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-yellow-500/20 flex items-center gap-3 active:scale-95 group"
                        >
                            <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            {language === 'es' ? 'VER RANKINGS Y RÉCORDS' : 'VIEW RANKINGS & RECORDS'}
                        </Link>
                    </motion.div>
                </header>

                {/* Subject Jump-Links (Chips) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 px-4 relative z-20 w-full"
                >
                    {availableCategories.map((category) => (
                        <motion.a
                            key={category.id}
                            href={`#${category.id}`}
                            onClick={(e) => {
                                e.preventDefault(); // Control scroll manually
                                scrollToCategory(category.id);
                            }}
                            whileHover={{
                                y: -8,
                                rotateX: 6,
                                rotateY: -3,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative block w-full perspective-1000"
                        >
                            <div className={cn(
                                "relative w-full px-4 py-6 rounded-2xl border transition-all duration-500",
                                "group-hover:border-white/50 shadow-lg overflow-hidden",
                                "flex flex-col items-center justify-center gap-3 preserve-3d",
                                "text-slate-700 font-black tracking-tight",
                                "backdrop-blur-md bg-white/20 border-white/20 hover:bg-white/40 shadow-lg",
                                // Highlight active chip
                                mounted && window.location.hash === `#${category.id}` && "bg-white/80 border-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] scale-105"
                            )}>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Theme Background Overlay (Subtle) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.colorTheme} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                                {/* Icon */}
                                <category.icon className={cn("w-6 h-6 mb-1 transition-transform duration-300 group-hover:scale-110",
                                    category.id === 'geography' && "text-emerald-600",
                                    category.id === 'biology' && "text-blue-600",
                                    category.id === 'math' && "text-orange-600",
                                    category.id === 'idiomas' && "text-violet-600",
                                    category.id === 'logic' && "text-amber-600"
                                )} weight="duotone" />

                                <span className="relative z-10 tracking-tight text-center whitespace-nowrap">{category.title}</span>

                                {/* Active Indicator Dash - 3D Bar */}
                                <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${category.colorTheme} shadow-[0_2px_10px_rgba(0,0,0,0.1)] opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:scale-x-110 mb-1`} />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* GRADE FILTER DROPDOWN */}
                <div className="mb-2 flex justify-center">
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 pl-5 pr-4 py-3 rounded-2xl text-sm font-bold text-slate-700 transition-all shadow-sm min-w-[200px]"
                        >
                            <Funnel className="w-4 h-4 text-slate-400" weight="bold" />
                            <span className="flex-grow text-left">
                                {selectedGrade === 'all' ? t.gamesPage.regions.allGrades : selectedGrade}
                            </span>
                            <CaretDown className={`w-4 h-4 text-slate-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} weight="bold" />
                        </button>

                        <AnimatePresence>
                            {filterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-1 z-50 text-slate-700"
                                >
                                    <button
                                        onClick={() => { setSelectedGrade('all'); setFilterOpen(false); }}
                                        className={cn(
                                            "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                            selectedGrade === 'all' && "bg-teal-50 text-teal-600"
                                        )}
                                    >
                                        {t.gamesPage.regions.allGrades}
                                    </button>
                                    {availableGrades.map((grade) => (
                                        <button
                                            key={grade}
                                            onClick={() => { setSelectedGrade(grade); setFilterOpen(false); }}
                                            className={cn(
                                                "w-full text-left px-5 py-3 text-sm font-medium hover:bg-slate-50 transition-colors",
                                                selectedGrade === grade && "bg-teal-50 text-teal-600"
                                            )}
                                        >
                                            {grade}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

                <div className="space-y-24">
                    {filteredCategories.map((category, catIdx) => (
                        <div key={category.id} id={category.id} className="scroll-mt-32">
                            {/* Main Category Title */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (catIdx * 0.1) }}
                                className="flex items-center gap-4 mb-1 pb-0"
                            >
                                <h2 className="text-4xl font-black text-slate-800 mb-1 pb-2">{category.title}</h2>
                            </motion.div>
                            <div className="w-full h-0.5 bg-slate-800/30 mt-0" />

                            <div className="space-y-12 mt-8">
                                {category.subsections.map((sub, subIdx) => (
                                    <div key={subIdx}>
                                        {/* Subsection Title */}
                                        {sub.title && (
                                            <motion.h3
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xl font-bold mb-6 flex items-center gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-slate-700/50" />
                                                <span className="text-slate-700">
                                                    {sub.title}
                                                </span>
                                            </motion.h3>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {sub.games.map((game, idx) => (
                                                <motion.div
                                                    key={game.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.4 + (idx * 0.05) }}
                                                    whileHover={{
                                                        y: -12,
                                                        rotateX: 4,
                                                        rotateY: -2,
                                                        transition: { duration: 0.3 }
                                                    }}
                                                    className="perspective-1000 h-full"
                                                >
                                                    <div className="group relative block h-full preserve-3d">
                                                        <Link href={game.href} className="absolute inset-0 z-20" />
                                                        {/* 3D Shadow/Glow Background */}
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[2rem] blur-3xl -z-10`} />

                                                        <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-2">
                                                            {/* Activity Info (Stars) - Always on top */}
                                                            <Link
                                                                href={`/actividades/valoraciones/${game.id}`}
                                                                className="group/stars"
                                                            >
                                                                <div className="flex items-center gap-1.5 bg-slate-900/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full shadow-lg h-6 group-hover/stars:scale-110 group-hover/stars:bg-slate-900/60 transition-all duration-300">
                                                                    {ratings[game.id] ? (
                                                                        <>
                                                                            <div className="flex items-center gap-0.5">
                                                                                <Star size={12} weight="fill" className="text-yellow-400" />
                                                                                <span className="text-[10px] font-black text-white">{ratings[game.id].avg}</span>
                                                                            </div>
                                                                            <div className="w-px h-2 bg-white/20" />
                                                                            <div className="flex items-center gap-1">
                                                                                <ChatCircleText size={12} weight="bold" className="text-slate-400" />
                                                                                <span className="text-[10px] font-bold text-slate-400">{ratings[game.id].count}</span>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <div className="flex items-center gap-0.5 opacity-40 group-hover/stars:opacity-100 transition-opacity">
                                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                                <Star key={s} size={10} weight="bold" className="text-white" />
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Tooltip */}
                                                                <div className="absolute top-full right-0 mt-2 opacity-0 group-hover/stars:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-slate-900/90 text-[10px] font-bold text-white px-2 py-1 rounded-md border border-white/10 shadow-xl backdrop-blur-md">
                                                                    Ver valoraciones
                                                                </div>
                                                            </Link>

                                                            {/* Mode Icon (Below Stars) */}
                                                            {game.mode && (
                                                                <div
                                                                    className="group/mode cursor-pointer"
                                                                    title={game.mode === 'writing' ? t.gamesPage.gameModes.writing : t.gamesPage.gameModes.pronunciation}
                                                                >
                                                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg shadow-lg group-hover:bg-white/20 transition-all">
                                                                        {game.mode === 'writing' ? (
                                                                            <Pencil size={16} className="text-white/80 group-hover:text-white" weight="bold" />
                                                                        ) : (
                                                                            <UserSound size={16} className="text-white/80 group-hover:text-white" weight="bold" />
                                                                        )}
                                                                    </div>

                                                                    {/* Custom Tooltip */}
                                                                    <div className="absolute top-full right-0 mt-2 opacity-0 group-hover/mode:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-slate-900/90 text-[10px] font-bold text-white px-2 py-1 rounded-md border border-white/10 shadow-xl backdrop-blur-md">
                                                                        {game.mode === 'writing' ? t.gamesPage.gameModes.writing : t.gamesPage.gameModes.pronunciation}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className={cn(
                                                            "h-full border border-white/10 py-5 px-5 rounded-3xl transition-all duration-500 transform-gpu relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:border-white/25",
                                                            "bg-slate-950/80 backdrop-blur-sm",
                                                            "relative z-10",
                                                            game.color.includes('emerald') && "bg-emerald-950/70",
                                                            game.color.includes('blue') && "bg-blue-950/70",
                                                            game.color.includes('orange') && "bg-orange-950/70",
                                                            game.color.includes('violet') && "bg-violet-950/70",
                                                            game.color.includes('pink') && "bg-pink-950/70",
                                                            game.color.includes('rose') && "bg-rose-950/70",
                                                            game.color.includes('amber') && "bg-amber-950/70",
                                                            game.color.includes('yellow') && "bg-yellow-950/70"
                                                        )}>
                                                            {/* 3D Top Glare Effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                                                            {/* Mode Icon (Top Right) */}

                                                            <div className="mb-3 flex items-start gap-3 pointer-events-none">
                                                                <div className={`w-12 h-12 flex-shrink-0 rounded-xl relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                                                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40 blur-md rounded-xl`} />
                                                                    <div className="relative w-full h-full bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
                                                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                        <game.icon className="w-6 h-6 text-white drop-shadow-md" weight="duotone" />
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col gap-1.5 pt-0.5">
                                                                    {game.gameType && (
                                                                        <div className={cn(
                                                                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-fit backdrop-blur-md whitespace-nowrap",
                                                                            "bg-white/40 text-slate-700 border-white/20"
                                                                        )}>
                                                                            {(() => {
                                                                                if (game.gameType === t.gamesPage.gameTypes.map) return <MapTrifold className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.puzzle) return <PuzzlePiece className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.quiz) return <Brain className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.math) return <Calculator className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.verbs) return <Translate className="w-3 h-3" weight="regular" />;
                                                                                if (game.gameType === t.gamesPage.gameTypes.logic) return <Brain className="w-3 h-3" weight="regular" />;
                                                                                return <MapTrifold className="w-3 h-3" weight="regular" />;
                                                                            })()}
                                                                            {game.gameType}
                                                                        </div>
                                                                    )}

                                                                    <div className="flex gap-1.5">
                                                                        <div className={cn(
                                                                            "px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 w-fit backdrop-blur-md whitespace-nowrap",
                                                                            "bg-white/40 text-slate-700 border-white/20"
                                                                        )}>
                                                                            <Student className="w-3 h-3" weight="regular" />
                                                                            {game.grade}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-100 transition-colors drop-shadow-md line-clamp-2 min-h-[2.4rem] pointer-events-none">
                                                                {game.title}
                                                            </h3>
                                                            <p className="text-gray-400 mb-4 leading-relaxed text-xs line-clamp-3 min-h-[2.8rem] pointer-events-none">
                                                                {game.description}
                                                            </p>

                                                            <div className="flex items-center justify-between mt-auto">
                                                                <div className="flex items-center text-xs font-bold text-white/50 group-hover:text-white transition-colors">
                                                                    {t.gamesPage.playBtn} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                                </div>

                                                                {profile?.role === 'teacher' && (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setIsAssigning(game);
                                                                        }}
                                                                        className="relative z-30 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg border border-blue-500/30 transition-all text-xs font-bold flex items-center gap-1.5"
                                                                        title="Asignar a una clase"
                                                                    >
                                                                        <Plus size={14} weight="bold" />
                                                                        Asignar
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <p className="text-slate-500 text-lg">{t.gamesPage.regions.noGames}</p>
                        <button
                            onClick={() => { setSelectedGrade('all'); }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            {t.gamesPage.regions.viewAll}
                        </button>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-10 border-t border-white/5 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-100 text-sm font-medium shadow-lg">
                        <Student className="w-4 h-4 text-emerald-400" />
                        <span>{t.gamesPage.comingSoon}</span>
                    </div>
                </motion.div>

                {mounted && createPortal(
                    <AnimatePresence>
                        {isAssigning && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsAssigning(null)}
                                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Asignar Actividad</h3>
                                            <p className="text-slate-500 font-medium">Selecciona la clase para enviar "{isAssigning.title}"</p>
                                        </div>
                                        <button
                                            onClick={() => setIsAssigning(null)}
                                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                        >
                                            <X size={24} className="text-slate-400" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${isAssigning.color} flex items-center justify-center shadow-lg`}>
                                                    <isAssigning.icon className="w-6 h-6 text-white" weight="duotone" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAssigning.grade}</div>
                                                    <div className="font-bold text-slate-700">{isAssigning.title}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">{t.common.yourClass}</label>
                                            <div className="relative">
                                                <select
                                                    value={selectedClassId}
                                                    onChange={(e) => setSelectedClassId(e.target.value)}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-700 font-bold focus:border-blue-500 outline-none appearance-none transition-all cursor-pointer"
                                                >
                                                    <option value="">{t.common.selectClass}</option>
                                                    {classes.map(cls => (
                                                        <option key={cls.id} value={cls.id}>
                                                            {cls.name} {cls.grade ? `(${cls.grade})` : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <CaretDown size={20} className="text-slate-400" weight="bold" />
                                                </div>
                                            </div>
                                            {classes.length === 0 && (
                                                <p className="text-[10px] text-red-400 font-bold mt-2 px-1">
                                                    {t.common.noClasses}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => setIsAssigning(null)}
                                                className="flex-1 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all"
                                            >
                                                {t.common.cancel}
                                            </button>
                                            <button
                                                disabled={!selectedClassId || isSubmitting}
                                                onClick={handleAssign}
                                                className={cn(
                                                    "flex-1 py-4 text-white font-black rounded-2xl transition-all shadow-xl",
                                                    !selectedClassId || isSubmitting
                                                        ? "bg-slate-300 shadow-none cursor-not-allowed"
                                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-200 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        {t.common.assigning}
                                                    </div>
                                                ) : t.common.confirmAssign}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

            </div>
        </main>
    );
}