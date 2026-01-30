'use client';

export const FEMALE_STORY_VOICES = [
    'Microsoft Elsa Online (Natural)',
    'Microsoft Dalia Online (Natural)',
    'Microsoft Elvira Online (Natural)',
    'Microsoft Helena',
    'Microsoft Laura',
    'Google español',
    'Mónica',
    'Paulina'
];

export const MALE_VOICE_NAMES = [
    'David', 'Pablo', 'Alvaro', 'Alfonso', 'Raul', 'Mateo', 'Daniel', 'Alva', 'Guy', 'Stefan'
];

export function getBestVoice(lang: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;

    const allVoices = window.speechSynthesis.getVoices();

    // Filtrar voces que coincidan con el idioma
    const langVoices = allVoices.filter(v => v.lang.startsWith(lang.split('-')[0]));

    // 1. Buscar específicamente las voces "Natural" de Microsoft que suelen ser las mejores
    for (const name of FEMALE_STORY_VOICES) {
        const found = langVoices.find(v => v.name.includes(name));
        if (found) return found;
    }

    // 2. Buscar cualquier voz que contenga "Natural"
    const natural = langVoices.find(v => v.name.includes('Natural'));
    if (natural) return natural;

    // 3. Buscar cualquier voz que NO sea masculina (por nombre)
    const femaleVoices = langVoices.filter(v => {
        const name = v.name.toLowerCase();
        return !MALE_VOICE_NAMES.some(maleName => name.includes(maleName.toLowerCase()));
    });

    return femaleVoices[0] || langVoices[0] || allVoices[0] || null;
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

        // Parámetros refinados para "Cuentacuentos Fantástico"
        if (isStory) {
            utterance.rate = 0.88; // Un poco más lento para enfatizar palabras
            utterance.pitch = 1.05; // Un tono ligeramente más alto y cálido
        } else {
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
        }

        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}
