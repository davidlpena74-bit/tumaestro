'use client';

export const FEMALE_STORY_VOICES = [
    'Microsoft Elsa Online (Natural)',
    'Microsoft Elvira Online (Natural)',
    'Microsoft Dalia Online (Natural)',
    'Microsoft Helena',
    'Microsoft Laura',
    'Microsoft Elena',
    'Google español',
    'Mónica',
    'Paulina',
    'Sabina',
    'Zira',
    'Samantha'
];

export const MALE_VOICE_NAMES = [
    'David', 'Pablo', 'Alvaro', 'Alfonso', 'Raul', 'Mateo', 'Daniel', 'Alva', 'Guy', 'Stefan'
];

export function getBestVoice(lang: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;

    const allVoices = window.speechSynthesis.getVoices();
    const voices = allVoices.filter(v => {
        const name = v.name.toLowerCase();
        return !MALE_VOICE_NAMES.some(maleName => name.includes(maleName.toLowerCase()));
    });

    // 1. Prioridad: Voces femeninas específicas y configuradas como naturales
    for (const name of FEMALE_STORY_VOICES) {
        let best = voices.find(v => v.name.includes(name) && v.lang === lang);
        if (!best) {
            best = voices.find(v => v.name.includes(name) && v.lang.startsWith(lang.split('-')[0]));
        }
        if (best) return best;
    }

    // 2. Voces 'Natural' (que no sean hombres)
    const natural = voices.find(v => v.name.includes('Natural') && v.lang.startsWith(lang.split('-')[0]));
    if (natural) return natural;

    // 3. Fallback de idioma de la lista filtrada
    const langMatch = voices.filter(v => v.lang.startsWith(lang.split('-')[0]));
    return langMatch[0] || allVoices[0] || null;
}

export function speak(text: string, lang: string = 'es-ES', isStory: boolean = false) {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voice = getBestVoice(lang);

        if (voice) {
            utterance.voice = voice;
        }

        utterance.lang = lang;

        // Parámetros de "Cuentacuentos Natural"
        if (isStory) {
            utterance.rate = 0.85; // Más pausado y melódico
            utterance.pitch = 1.05; // Ligeramente más cálido
        } else {
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
        }

        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}
