'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WorldDrillDownGame from '@/components/games/WorldDrillDownGame';
import PageContainer from '@/components/layout/PageContainer';

export default function CountryDrillDownPage() {
    const params = useParams();
    const continent = params?.continent as string;
    const country = params?.country as string;

    const [data, setData] = useState<{
        regions?: Record<string, string>;
        rivers?: Record<string, string>;
        mountains?: Record<string, string>;
    } | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!country) return;

        const loadData = async () => {
            try {
                const countryKey = country.toLowerCase().replace(/\s+/g, '-');
                const countryVarPrefix = country.toUpperCase().replace(/\s+/g, '_');

                let regions = {};
                let rivers = {};
                let mountains = {};

                // Attempt to load regions
                try {
                    const regModule = await import(`@/components/games/data/countries/${countryKey}-paths`);
                    regions = regModule[`${countryVarPrefix}_PATHS`] || {};
                } catch (e) {
                    console.warn("Regions not found for", country);
                }

                // Attempt to load rivers
                try {
                    const rivModule = await import(`@/components/games/data/countries/${countryKey}-rivers`);
                    rivers = rivModule[`${countryVarPrefix}_RIVERS_PATHS`] || {};
                } catch (e) {
                    console.warn("Rivers not found for", country);
                }

                if (Object.keys(regions).length === 0) {
                    setError(`No se encontraron datos para ${country}.`);
                } else {
                    setData({ regions, rivers, mountains });
                }
            } catch (err) {
                setError("Ocurrió un error al cargar el mapa.");
            }
        };

        loadData();
    }, [country]);

    if (error) {
        return (
            <PageContainer>
                <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
                    <h2 className="text-2xl font-bold mb-4">{error}</h2>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 bg-emerald-500 rounded-full font-bold"
                    >
                        Volver
                    </button>
                </div>
            </PageContainer>
        );
    }

    if (!data) return null;

    // Display names
    const continentDisplayName = continent.charAt(0).toUpperCase() + continent.slice(1);
    const countryDisplayName = country.charAt(0).toUpperCase() + country.slice(1);

    return (
        <PageContainer>
            <WorldDrillDownGame
                countryName={countryDisplayName}
                continentName={continentDisplayName}
                regionsPaths={data.regions || {}}
                riversPaths={data.rivers}
                mountainsPaths={data.mountains}
            />
        </PageContainer>
    );
}
