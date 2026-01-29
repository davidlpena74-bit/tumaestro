export interface Dictation {
    id: string;
    title: string;
    text: string;
    level: 'Fácil' | 'Medio' | 'Difícil';
    category: 'Ortografía' | 'Cultura' | 'Literatura' | 'Cuentos';
    lang: 'es-ES' | 'en-US';
    image?: string;
}

export const DICTATIONS: Dictation[] = [
    {
        id: 'forest-magic',
        title: 'El Bosque Encantado',
        text: "Había una vez un bosque donde los árboles susurraban secretos antiguos. Las hadas bailaban entre las flores luminosas y los duendes cuidaban de los animales heridos. Un día, un niño llamado Leo encontró una puerta mágica oculta entre las raíces de un roble gigante.",
        level: 'Fácil',
        category: 'Cuentos',
        lang: 'es-ES',
        image: '/story_forest.png'
    },
    {
        id: 'space-adventure',
        title: 'Aventura Espacial',
        text: "La capitana Elena miró por la ventana de su nave. Las estrellas brillaban como diamantes en la oscuridad infinita. De repente, una luz azul parpadeó en el radar. ¡Era un planeta desconocido! Elena preparó los motores para el aterrizaje, lista para descubrir nuevos misterios.",
        level: 'Medio',
        category: 'Cuentos',
        lang: 'es-ES',
        image: '/story_space.png'
    },
    {
        id: 'cervantes',
        title: 'El Quijote - Inicio',
        text: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.",
        level: 'Medio',
        category: 'Literatura',
        lang: 'es-ES'
    },
    {
        id: 'b-v',
        title: 'Uso de B y V',
        text: "El barco de vela navegaba suavemente por la bahía. Las gaviotas volaban bajo, buscando peces en el agua verde y brava. El viejo marinero observaba el horizonte con su catalejo.",
        level: 'Fácil',
        category: 'Ortografía',
        lang: 'es-ES'
    },
    {
        id: 'nature-en',
        title: 'Nature Walk',
        text: "Yesterday I went for a walk in the forest. The trees were tall and green. I saw a small squirrel climbing up an oak tree. It was a beautiful sunny day.",
        level: 'Fácil',
        category: 'Cultura',
        lang: 'en-US'
    },
    {
        id: 'ciencias',
        title: 'El Ciclo del Agua',
        text: "El ciclo del agua describe la presencia y el movimiento del agua en la Tierra y sobre ella. El agua de la Tierra está siempre en movimiento y constantemente cambiando de estado, desde líquido, a vapor, a hielo y viceversa.",
        level: 'Difícil',
        category: 'Cultura',
        lang: 'es-ES'
    },
    {
        id: 'h-intercalada',
        title: 'Palabras con H',
        text: "El búho habita en el hueco del árbol. Ahí hace mucho frío en invierno. Zanahorias y cacahuetes son alimentos que le gustan a algunos animales, pero no al búho, que prefiere cazar.",
        level: 'Medio',
        category: 'Ortografía',
        lang: 'es-ES'
    }
];
