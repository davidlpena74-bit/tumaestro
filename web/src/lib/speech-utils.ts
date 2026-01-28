'use client';

export function speak(text: string, lang: string = 'es-ES') {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to find a voice that matches the language
        const voices = window.speechSynthesis.getVoices();

        // Prefer exact match, then startsWith match
        let selectedVoice = voices.find(v => v.lang === lang) ||
            voices.find(v => v.lang.startsWith(lang.split('-')[0]));

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.lang = lang;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        window.speechSynthesis.speak(utterance);
    }
}
