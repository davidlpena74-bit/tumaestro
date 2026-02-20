
'use client';

import CapitalGame from '@/components/games/CapitalGame';
import { EUROPE_PATHS } from '@/components/games/data/europe-paths';
import { EUROPE_CAPITALS_COORDS } from '@/components/games/data/europe-capitals-coords';
import { EU_MEMBERS_LIST, EU_MEMBERS_LIST_EN } from '@/components/games/data/capitals-data';
import PhysicalGameLayout from '@/components/games/PhysicalGameLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import CapitalMatchingGame from '@/components/games/CapitalMatchingGame'; // Added this import based on the change

export default function CapitalesUeClient() {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId');

    return <CapitalMatchingGame activityId="capitales-ue" />;
}
