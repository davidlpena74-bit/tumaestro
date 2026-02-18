export type IrregularVerb = {
    id: string;
    infinitive: string;
    pastSimple: string;
    pastParticiple: string;
    translation: string;
};

export const IRREGULAR_VERBS_BASIC: IrregularVerb[] = [
    { id: 'be', infinitive: 'be', pastSimple: 'was/were', pastParticiple: 'been', translation: 'ser/estar' },
    { id: 'become', infinitive: 'become', pastSimple: 'became', pastParticiple: 'become', translation: 'convertirse' },
    { id: 'begin', infinitive: 'begin', pastSimple: 'began', pastParticiple: 'begun', translation: 'empezar' },
    { id: 'break', infinitive: 'break', pastSimple: 'broke', pastParticiple: 'broken', translation: 'romper' },
    { id: 'bring', infinitive: 'bring', pastSimple: 'brought', pastParticiple: 'brought', translation: 'traer' },
    { id: 'buy', infinitive: 'buy', pastSimple: 'bought', pastParticiple: 'bought', translation: 'comprar' },
    { id: 'choose', infinitive: 'choose', pastSimple: 'chose', pastParticiple: 'chosen', translation: 'elegir' },
    { id: 'come', infinitive: 'come', pastSimple: 'came', pastParticiple: 'come', translation: 'venir' },
    { id: 'do', infinitive: 'do', pastSimple: 'did', pastParticiple: 'done', translation: 'hacer' },
    { id: 'drink', infinitive: 'drink', pastSimple: 'drank', pastParticiple: 'drunk', translation: 'beber' },
    { id: 'drive', infinitive: 'drive', pastSimple: 'drove', pastParticiple: 'driven', translation: 'conducir' },
    { id: 'eat', infinitive: 'eat', pastSimple: 'ate', pastParticiple: 'eaten', translation: 'comer' },
    { id: 'feel', infinitive: 'feel', pastSimple: 'felt', pastParticiple: 'felt', translation: 'sentir' },
    { id: 'find', infinitive: 'find', pastSimple: 'found', pastParticiple: 'found', translation: 'encontrar' },
    { id: 'get', infinitive: 'get', pastSimple: 'got', pastParticiple: 'got', translation: 'obtener' },
    { id: 'give', infinitive: 'give', pastSimple: 'gave', pastParticiple: 'given', translation: 'dar' },
    { id: 'go', infinitive: 'go', pastSimple: 'went', pastParticiple: 'gone', translation: 'ir' },
    { id: 'have', infinitive: 'have', pastSimple: 'had', pastParticiple: 'had', translation: 'tener' },
    { id: 'hear', infinitive: 'hear', pastSimple: 'heard', pastParticiple: 'heard', translation: 'oír' },
    { id: 'keep', infinitive: 'keep', pastSimple: 'kept', pastParticiple: 'kept', translation: 'mantener' },
    { id: 'know', infinitive: 'know', pastSimple: 'knew', pastParticiple: 'known', translation: 'saber' },
    { id: 'make', infinitive: 'make', pastSimple: 'made', pastParticiple: 'made', translation: 'hacer' },
    { id: 'meet', infinitive: 'meet', pastSimple: 'met', pastParticiple: 'met', translation: 'conocer' },
    { id: 'say', infinitive: 'say', pastSimple: 'said', pastParticiple: 'said', translation: 'decir' },
    { id: 'see', infinitive: 'see', pastSimple: 'saw', pastParticiple: 'seen', translation: 'ver' },
];
