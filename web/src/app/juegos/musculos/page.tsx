'use client';

import HumanMusclesGame from '@/components/games/HumanMusclesGame';
import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import ContentWrapper from '@/components/ContentWrapper';

export default function MusculosPage() {
    return (
        <ContentWrapper transparent={true}>
            <Header />
            <PageBackground />
            <main className="pt-24 pb-12 relative z-10">
                <HumanMusclesGame />
            </main>
        </ContentWrapper>
    );
}
