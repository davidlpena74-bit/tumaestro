export type Language = 'es' | 'en';

export const TRANSLATIONS = {
    es: {
        common: {
            start: 'EMPEZAR',
            playAgain: 'Jugar de nuevo',
            score: 'Puntos',
            errors: 'Fallos',
            time: 'Tiempo',
            remaining: 'Restantes',
            correct: '¡Correcto!',
            completed: '¡COMPLETADO!',
            loading: 'Cargando...',
            congrats: '¡Impresionante!',
            victoryMessage: 'Has completado el desafío con éxito.',
            back: 'Volver',
            profile: 'Perfil',
            subjects: {
                math: 'Matemáticas',
                english: 'Inglés',
                physics: 'Física',
                programming: 'Programación',
                chemistry: 'Química',
                history: 'Historia'
            }
        },
        header: {
            games: 'Juegos',
            resources: 'Recursos',
            teachers: 'Profesores',
            login: 'Acceso Usuarios',
            teaching: 'Docencia',
            students: 'Alumnos'
        },
        home: {
            heroTitle: 'Tu futuro empieza aquí',
            heroSubtitle: 'Elige cómo quieres aprender hoy',
            findTeacher: 'Busco Profesor',
            findTeacherDesc: 'Encuentra clases particulares presenciales u online con expertos verificados.',
            findTeacherBtn: 'Ver Profesores',
            resources: 'Material Didáctico',
            resourcesDesc: 'Descarga apuntes, exámenes resueltos y ejercicios de refuerzo.',
            resourcesBtn: 'Explorar Recursos',
            learnPlaying: 'Aprende Jugando',
            learnPlayingDesc: 'Diviértete mientras aprendes geografía, matemáticas y cultura general.',
            learnPlayingBtn: 'Jugar Ahora',
            featuredTeachers: 'Profesores Destacados',
            featuredTeachersDesc: 'Clases particulares a tu medida',
            viewAll: 'Ver todos',
            resourceLibrary: 'Biblioteca de Recursos',
            resourceLibraryDesc: 'Accede a una colección curada de apuntes, exámenes resueltos y guías de estudio. Todo organizado por materia y nivel educativo para maximizar tu rendimiento.',
            exploreLibrary: 'Explorar Biblioteca',
            featuredResources: {
                language: 'Lengua',
                math: 'Mates',
                english: 'Inglés',
                geography: 'Geografía'
            },
            trending: 'NUEVO',
            updated: 'ACTUALIZADO',
            gamesHeroTitle: 'Aprende Jugando',
            gamesHeroDesc: 'Descubre nuestra nueva zona de juegos interactivos. Pon a prueba tus conocimientos de geografía y cultura general con retos diseñados para aprender divirtiéndote.',
            exploreGames: 'Explorar Juegos',
            gameVisuals: {
                map: 'Mapa',
                quiz: 'Quiz',
                ranking: 'Ranking',
                play: 'Jugar'
            },
            footer: {
                rights: '© 2026 TuMaestro.es. Todos los derechos reservados.',
                terms: 'Términos y Condiciones',
                privacy: 'Política de Privacidad'
            }
        },
        gamesPage: {
            title: 'Aprende Jugando',
            subtitle: 'Selecciona un desafío de nuestra colección educativa.',
            categories: {
                geography: 'Geografía',
                math: 'Matemáticas',
                culture: 'Cultura General'
            },
            gameTitles: {
                region: 'Comunidades Autónomas',
                regionDesc: 'Nivel básico. Ubica las 17 comunidades en el mapa.',
                provinces: 'Provincias de España',
                provincesDesc: 'Nivel difícil. ¿Puedes encontrar las 52 provincias?',
                europeMap: 'Mapa de Europa',
                europeMapDesc: 'Localiza los principales países del continente europeo.',
                euCapitalsMap: 'Capitales de la UE',
                euCapitalsMapDesc: 'Ubica en el mapa las 27 capitales de la UE.',
                europeCapitalsMap: 'Capitales de Europa',
                europeCapitalsMapDesc: 'Ubica en el mapa las 50 capitales del continente.',
                americaMap: 'Mapa de América',
                americaMapDesc: 'Ubica los países de Norteamérica, Centroamérica y Sudamérica.',
                northAmericaMap: 'Norteamérica',
                northAmericaMapDesc: 'Ubica los países de América del Norte y el Caribe.',
                southAmericaMap: 'Sudamérica',
                southAmericaMapDesc: 'Ubica las naciones del continente sudamericano.',
                usaStatesMap: 'Estados de EE.UU.',
                usaStatesMapDesc: '¿Conoces la ubicación de los 50 estados de la unión?',
                riversSpain: 'Ríos de España',
                riversSpainDesc: 'Identifica los principales ríos de la península.',
                riversEurope: 'Ríos de Europa',
                riversEuropeDesc: 'Encuentra los ríos más importantes del continente.',
                euCapitalsPuzzle: 'Capitales UE',
                euCapitalsPuzzleDesc: 'Juego de arrastrar. Empareja países y capitales.',
                europeCapitalsPuzzle: 'Toda Europa',
                europeCapitalsPuzzleDesc: 'Reto final de arrastrar. Las 50 capitales.',
                division: 'Aprende a Dividir',
                divisionDesc: 'Reparte pizzas entre amigos. Juego visual.',
                quiz: 'Quiz de Cultura',
                quizDesc: 'Preguntas de historia, ciencia y arte.',
            },
            playBtn: 'JUGAR AHORA',
            comingSoon: 'Pronto añadiremos más asignaturas como Historia y Lengua',
            regions: {
                spain: 'España',
                europe: 'Europa',
                america: 'América',
                northAmerica: 'Norteamérica',
                southAmerica: 'Sudamérica',
                usa: 'EE.UU.'
            },
            gameTypes: {
                map: 'Mapa',
                puzzle: 'Puzzle',
                quiz: 'Quiz',
                math: 'Cálculo',
                verbs: 'Verbos'
            }
        }
    },
    en: {
        common: {
            start: 'START',
            playAgain: 'Play Again',
            score: 'Score',
            errors: 'Mistakes',
            time: 'Time',
            remaining: 'Remaining',
            correct: 'Correct!',
            completed: 'COMPLETED!',
            loading: 'Loading...',
            congrats: 'Awesome!',
            victoryMessage: 'You have successfully completed the challenge.',
            back: 'Back',
            profile: 'Profile',
            subjects: {
                math: 'Math',
                english: 'English',
                physics: 'Physics',
                programming: 'Programming',
                chemistry: 'Chemistry',
                history: 'History'
            }
        },
        header: {
            games: 'Games',
            resources: 'Resources',
            teachers: 'Teachers',
            login: 'User Login',
            teaching: 'Teaching',
            students: 'Students'
        },
        home: {
            heroTitle: 'Your future starts here',
            heroSubtitle: 'Choose how you want to learn today',
            findTeacher: 'Find a Teacher',
            findTeacherDesc: 'Find in-person or online private lessons with verified experts.',
            findTeacherBtn: 'View Teachers',
            resources: 'Educational Material',
            resourcesDesc: 'Download notes, solved exams, and reinforcement exercises.',
            resourcesBtn: 'Explore Resources',
            learnPlaying: 'Learn by Playing',
            learnPlayingDesc: 'Have fun while learning geography, math, and general culture.',
            learnPlayingBtn: 'Play Now',
            featuredTeachers: 'Featured Teachers',
            featuredTeachersDesc: 'Private lessons tailored to you',
            viewAll: 'View all',
            resourceLibrary: 'Resource Library',
            resourceLibraryDesc: 'Access a curated collection of notes, solved exams, and study guides. All organized by subject and educational level to maximize your performance.',
            exploreLibrary: 'Explore Library',
            featuredResources: {
                language: 'Language',
                math: 'Math',
                english: 'English',
                geography: 'Geography'
            },
            trending: 'NEW',
            updated: 'UPDATED',
            gamesHeroTitle: 'Learn by Playing',
            gamesHeroDesc: 'Discover our new area of interactive games. Test your knowledge of geography and general culture with challenges designed to learn while having fun.',
            exploreGames: 'Explore Games',
            gameVisuals: {
                map: 'Map',
                quiz: 'Quiz',
                ranking: 'Ranking',
                play: 'Play'
            },
            footer: {
                rights: '© 2026 TuMaestro.es. All rights reserved.',
                terms: 'Terms and Conditions',
                privacy: 'Privacy Policy'
            }
        },
        gamesPage: {
            title: 'Learn by Playing',
            subtitle: 'Select a challenge from our educational collection.',
            categories: {
                geography: 'Geography',
                math: 'Mathematics',
                culture: 'General Knowledge'
            },
            gameTitles: {
                region: 'Autonomous Communities',
                regionDesc: 'Basic level. Locate the 17 communities on the map.',
                provinces: 'Provinces of Spain',
                provincesDesc: 'Hard level. Can you find the 52 provinces?',
                europeMap: 'Map of Europe',
                europeMapDesc: 'Locate the main countries of the European continent.',
                euCapitalsMap: 'EU Capitals',
                euCapitalsMapDesc: 'Locate the 27 EU capitals on the map.',
                europeCapitalsMap: 'Europe Capitals',
                europeCapitalsMapDesc: 'Locate the 50 capitals of the continent on the map.',
                americaMap: 'Map of America',
                americaMapDesc: 'Locate countries in North, Central, and South America.',
                northAmericaMap: 'North America',
                northAmericaMapDesc: 'Locate countries in North America and the Caribbean.',
                southAmericaMap: 'South America',
                southAmericaMapDesc: 'Locate the nations of the South American continent.',
                usaStatesMap: 'US States',
                usaStatesMapDesc: 'Do you know the location of all 50 states?',
                riversSpain: 'Rivers of Spain',
                riversSpainDesc: 'Identify the main rivers of the peninsula.',
                riversEurope: 'Rivers of Europe',
                riversEuropeDesc: 'Find the most important rivers of the continent.',
                euCapitalsPuzzle: 'EU Capitals',
                euCapitalsPuzzleDesc: 'Drag and drop. Match countries and capitals.',
                europeCapitalsPuzzle: 'All Europe',
                europeCapitalsPuzzleDesc: 'Final drag challenge. All 50 capitals.',
                division: 'Learn to Divide',
                divisionDesc: 'Share pizzas among friends. Visual math game.',
                quiz: 'Culture Quiz',
                quizDesc: 'History, science, and art questions.',
            },
            playBtn: 'PLAY NOW',
            comingSoon: 'Soon we will add more subjects like History and Language',
            regions: {
                spain: 'Spain',
                europe: 'Europe',
                america: 'America',
                northAmerica: 'North America',
                southAmerica: 'South America',
                usa: 'USA'
            },
            gameTypes: {
                map: 'Map',
                puzzle: 'Puzzle',
                quiz: 'Quiz',
                math: 'Calculation',
                verbs: 'Verbs'
            }
        }
    }
};
