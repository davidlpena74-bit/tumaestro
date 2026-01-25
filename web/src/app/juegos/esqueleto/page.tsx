'use client';

import HumanSkeletonGame from '@/components/games/HumanSkeletonGame';
import Header from '@/components/Header';
import PageBackground from '@/components/PageBackground';
import ContentWrapper from '@/components/ContentWrapper';

export default function SkeletonGamePage() {
    return (
        <ContentWrapper transparent={true}>
            <Header />
            <PageBackground />
            <main className="pt-24 pb-12 relative z-10">
                <HumanSkeletonGame />
            </main>
        </ContentWrapper>
    );
}
