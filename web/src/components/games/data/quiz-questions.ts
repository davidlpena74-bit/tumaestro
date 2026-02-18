export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number; // Index of correct option
    category: 'Historia' | 'Geografía' | 'Ciencia' | 'Arte' | 'Literatura' | 'Lógica' | 'Adivinanza';
}

export const QUESTIONS: Question[] = [
    // HISTORIA
    { id: 1, question: "¿En qué año descubrió Colón América?", options: ["1492", "1500", "1485", "1510"], correct: 0, category: 'Historia' },
    { id: 2, question: "¿Quién fue el primer presidente de Estados Unidos?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "Benjamin Franklin"], correct: 1, category: 'Historia' },
    { id: 3, question: "¿Qué imperio construyó el Coliseo de Roma?", options: ["Imperio Griego", "Imperio Otomano", "Imperio Romano", "Imperio Egipcio"], correct: 2, category: 'Historia' },
    { id: 4, question: "¿En qué año comenzó la Primera Guerra Mundial?", options: ["1914", "1939", "1918", "1945"], correct: 0, category: 'Historia' },
    { id: 5, question: "¿Quién pintó 'La última cena'?", options: ["Miguel Ángel", "Rafael", "Leonardo da Vinci", "Donatello"], correct: 2, category: 'Historia' }, // Art/History overlap
    { id: 6, question: "¿Qué civilización construyó Machu Picchu?", options: ["Aztecas", "Mayas", "Incas", "Olmecas"], correct: 2, category: 'Historia' },
    { id: 7, question: "¿Quién fue emperador de Francia en 1804?", options: ["Luis XIV", "Napoleón Bonaparte", "Carlomagno", "Luis XVI"], correct: 1, category: 'Historia' },
    { id: 8, question: "¿En qué año cayó el Muro de Berlín?", options: ["1989", "1991", "1985", "1990"], correct: 0, category: 'Historia' },
    { id: 9, question: "¿Quién escribió la declaración de independencia de los EEUU?", options: ["George Washington", "Thomas Jefferson", "John Adams", "Alexander Hamilton"], correct: 1, category: 'Historia' },
    { id: 10, question: "¿Qué faraón egipcio es famoso por su máscara de oro?", options: ["Ramsés II", "Keops", "Tutankamón", "Akhenatón"], correct: 2, category: 'Historia' },

    // GEOGRAFÍA
    { id: 11, question: "¿Cuál es el río más largo del mundo?", options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"], correct: 1, category: 'Geografía' },
    { id: 12, question: "¿Cuál es la capital de Australia?", options: ["Sídney", "Melbourne", "Canberra", "Perth"], correct: 2, category: 'Geografía' },
    { id: 13, question: "¿En qué continente está el desierto del Sahara?", options: ["Asia", "África", "América", "Oceanía"], correct: 1, category: 'Geografía' },
    { id: 14, question: "¿Cuál es la montaña más alta del mundo?", options: ["K2", "Everest", "Kilimanjaro", "Mont Blanc"], correct: 1, category: 'Geografía' },
    { id: 15, question: "¿Qué país tiene forma de bota?", options: ["España", "Grecia", "Italia", "Portugal"], correct: 2, category: 'Geografía' },
    { id: 16, question: "¿Cuál es el océano más grande?", options: ["Atlántico", "Índico", "Ártico", "Pacífico"], correct: 3, category: 'Geografía' },
    { id: 17, question: "¿En qué país se encuentra la Torre Eiffel?", options: ["Italia", "Francia", "Alemania", "Bélgica"], correct: 1, category: 'Geografía' },
    { id: 18, question: "¿Cuál es el país más grande del mundo?", options: ["China", "Estados Unidos", "Rusia", "Canadá"], correct: 2, category: 'Geografía' },
    { id: 19, question: "¿Cuál es la capital de Japón?", options: ["Kioto", "Osaka", "Tokio", "Seúl"], correct: 2, category: 'Geografía' },
    { id: 20, question: "¿Qué estrecho separa España de África?", options: ["Estrecho de Gibraltar", "Estrecho de Magallanes", "Estrecho de Bering", "Canal de Suez"], correct: 0, category: 'Geografía' },

    // CIENCIA
    { id: 21, question: "¿Cuál es el símbolo químico del agua?", options: ["HO", "H2O", "O2", "CO2"], correct: 1, category: 'Ciencia' },
    { id: 22, question: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Marte", "Mercurio", "Júpiter"], correct: 2, category: 'Ciencia' },
    { id: 23, question: "¿Qué gas respiramos principalmente?", options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"], correct: 1, category: 'Ciencia' }, // Trick question contextually, but keeping simple for school level: Air is mostly Nitrogen, but we "breathe in" for Oxygen. Let's make it unambiguous.
    // Correction: actually we breathe air (78% N, 21% O), but usually the question implies "what do we need".
    // Let's change the question slightly to be scientifically accurate.
    { id: 23, question: "¿Qué gas es vital para la respiración humana?", options: ["Nitrógeno", "Oxígeno", "Helio", "Metano"], correct: 1, category: 'Ciencia' },
    { id: 24, question: "¿Cuántos huesos tiene el cuerpo humano adulto?", options: ["206", "300", "150", "250"], correct: 0, category: 'Ciencia' },
    { id: 25, question: "¿Qué órgano bombea la sangre?", options: ["Hígado", "Pulmones", "Corazón", "Cerebro"], correct: 2, category: 'Ciencia' },
    { id: 26, question: "¿Quién propuso la teoría de la relatividad?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], correct: 1, category: 'Ciencia' },
    { id: 27, question: "¿Qué animal es un mamífero volador?", options: ["Águila", "Murciélago", "Pingüino", "Avestruz"], correct: 1, category: 'Ciencia' },
    { id: 28, question: "¿Cuál es el metal líquido a temperatura ambiente?", options: ["Hierro", "Mercurio", "Oro", "Plata"], correct: 1, category: 'Ciencia' },
    { id: 29, question: "¿Qué planeta es conocido como el Planeta Rojo?", options: ["Marte", "Júpiter", "Saturno", "Venus"], correct: 0, category: 'Ciencia' },
    { id: 30, question: "¿Cuál es la velocidad de la luz (aprox)?", options: ["300.000 km/s", "150.000 km/s", "1.000 km/s", "340 m/s"], correct: 0, category: 'Ciencia' },

    // ARTE Y LITERATURA
    { id: 31, question: "¿Quién escribió 'El Quijote'?", options: ["Lope de Vega", "Cervantes", "Góngora", "Quevedo"], correct: 1, category: 'Literatura' },
    { id: 32, question: "¿Quién pintó 'La noche estrellada'?", options: ["Picasso", "Van Gogh", "Dalí", "Monet"], correct: 1, category: 'Arte' },
    { id: 33, question: "¿Quién es el autor de 'Romeo y Julieta'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correct: 1, category: 'Literatura' },
    { id: 34, question: "¿Qué estilo artístico caracteriza a la catedral de Notre Dame?", options: ["Románico", "Gótico", "Barroco", "Renacentista"], correct: 1, category: 'Arte' },
    { id: 35, question: "¿Quién pintó el 'Guernica'?", options: ["Joan Miró", "Pablo Picasso", "Salvador Dalí", "Velázquez"], correct: 1, category: 'Arte' },
    { id: 36, question: "¿Quién escribió 'Cien años de soledad'?", options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar", "Jorge Luis Borges"], correct: 1, category: 'Literatura' },
    { id: 37, question: "¿Cuál es la obra más famosa de Velázquez?", options: ["Las Meninas", "El 3 de Mayo", "La Maja Desnuda", "El Jardín de las Delicias"], correct: 0, category: 'Arte' },
    { id: 38, question: "¿Quién compuso la 9ª Sinfonía?", options: ["Mozart", "Beethoven", "Bach", "Vivaldi"], correct: 1, category: 'Arte' },
    { id: 39, question: "¿Qué poeta granadino escribió 'Bodas de Sangre'?", options: ["Antonio Machado", "Federico García Lorca", "Rafael Alberti", "Juan Ramón Jiménez"], correct: 1, category: 'Literatura' },
    { id: 40, question: "¿Quién pintó la Capilla Sixtina?", options: ["Leonardo", "Donatello", "Miguel Ángel", "Rafael"], correct: 2, category: 'Arte' },

    // MIX / CULTURA GENERAL
    { id: 41, question: "¿Cuántos lados tiene un hexágono?", options: ["5", "6", "7", "8"], correct: 1, category: 'Ciencia' },
    { id: 42, question: "¿Cuál es el idioma más hablado del mundo (nativos)?", options: ["Inglés", "Español", "Chino Mandarín", "Hindi"], correct: 2, category: 'Geografía' },
    { id: 43, question: "¿En qué país se originó el sushi?", options: ["China", "Japón", "Corea", "Tailandia"], correct: 1, category: 'Geografía' },
    { id: 44, question: "¿Cuál es la moneda del Reino Unido?", options: ["Euro", "Dólar", "Libra esterlina", "Yen"], correct: 2, category: 'Geografía' },
    { id: 45, question: "¿Quién inventó el teléfono (atribución clásica)?", options: ["Edison", "Graham Bell", "Tesla", "Marconi"], correct: 1, category: 'Ciencia' },
    { id: 46, question: "¿Cuál es el animal terrestre más rápido?", options: ["León", "Guepardo", "Caballo", "Gacela"], correct: 1, category: 'Ciencia' },
    { id: 47, question: "¿Cuántas teclas tiene un piano estándar?", options: ["66", "88", "100", "72"], correct: 1, category: 'Arte' },
    { id: 48, question: "¿Qué colores forman la bandera de los JJOO?", options: ["Azul, Amarillo, Negro, Verde, Rojo", "Rojo, Azul, Blanco, Amarillo, Verde", "Rojo, Amarillo, Verde", "Azul, Rojo, Verde, Negro, Blanco"], correct: 0, category: 'Ciencia' },
    { id: 49, question: "¿Quién fue el primer hombre en pisar la Luna?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correct: 2, category: 'Historia' },
    { id: 50, question: "¿Cuál es el libro más vendido de la historia?", options: ["El Quijote", "La Biblia", "Harry Potter", "El Señor de los Anillos"], correct: 1, category: 'Literatura' },
];
