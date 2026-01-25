'use client';

import AnimalCellGame from '@/components/games/AnimalCellGame';

export default function AnimalCellPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col pt-24">
            <main className="flex-1 px-4 py-8">
                <AnimalCellGame />
            </main>
        </div>
    );
}
