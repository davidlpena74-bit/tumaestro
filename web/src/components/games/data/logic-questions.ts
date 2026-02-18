import { Question } from './quiz-questions';

export const LOGIC_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "Si un tren eléctrico viaja al norte a 100 km/h y el viento sopla al sur a 10 km/h, ¿hacia dónde va el humo?",
        options: ["Al norte", "Al sur", "No hay humo", "Al este"],
        correct: 2,
        category: 'Lógica'
    },
    {
        id: 2,
        question: "Algunos meses tienen 31 días, otros tienen 30. ¿Cuántos tienen 28?",
        options: ["1", "6", "Todos", "12"],
        correct: 2,
        category: 'Lógica'
    },
    {
        id: 3,
        question: "Si me tienes, quieres compartirme. Si me compartes, ya no me tienes. ¿Qué soy?",
        options: ["Un secreto", "Un pastel", "Un chisme", "Un regalo"],
        correct: 0,
        category: 'Lógica'
    },
    {
        id: 4,
        question: "Un granjero tiene 17 ovejas y todas mueren menos 9. ¿Cuántas le quedan?",
        options: ["8", "17", "9", "0"],
        correct: 2,
        category: 'Lógica'
    },
    {
        id: 5,
        question: "Si el hermano de tu padre tiene una hermana que no es tu tía, ¿quién es ella?",
        options: ["Tu abuela", "Tu prima", "Tu madre", "Tu sobrina"],
        correct: 2,
        category: 'Lógica'
    },
    {
        id: 6,
        question: "¿Qué pesa más: un kilo de hierro o un kilo de plumas?",
        options: ["El hierro", "Las plumas", "Pesan lo mismo", "Depende del volumen"],
        correct: 2,
        category: 'Lógica'
    },
    {
        id: 7,
        question: "El padre de Juan tiene 4 hijos: Lucas, Carlos, Pedro y... ¿quién es el cuarto?",
        options: ["Mario", "Juan", "Jose", "Luis"],
        correct: 1,
        category: 'Lógica'
    },
    {
        id: 8,
        question: "¿Qué palabra se escribe incorrectamente en todos los diccionarios?",
        options: ["Erróneamente", "Incorrectamente", "Mal", "Ninguna"],
        correct: 1,
        category: 'Lógica'
    },
    {
        id: 9,
        question: "Si participas en una carrera y adelantas al que va segundo, ¿en qué posición estás?",
        options: ["Primero", "Segundo", "Tercero", "Último"],
        correct: 1,
        category: 'Lógica'
    },
    {
        id: 10,
        question: "¿Cuántos animales de cada especie llevó Moisés en el arca?",
        options: ["2", "1", "0 (fue Noé)", "7"],
        correct: 2,
        category: 'Lógica'
    }
];
