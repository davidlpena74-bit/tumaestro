export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    content: string[]; // Divided by chapters or pages
    level: 'Fácil' | 'Medio' | 'Difícil';
    age: string;
    coverImage: string;
    genre: string;
}

export const BOOKS: Book[] = [
    {
        id: 'principito',
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        description: 'Una aventura filosófica y poética a través de los planetas y el corazón humano.',
        level: 'Medio',
        age: '8+',
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
        genre: 'Fábula',
        content: [
            "Si vienes, por ejemplo, a las cuatro de la tarde, desde las tres empezaré a ser feliz. A medida que avance la hora, me sentiré más feliz. A las cuatro me sentiré agitado e inquieto; ¡descubriré el precio de la felicidad! Pero si vienes a cualquier hora, nunca sabré a qué hora preparar mi corazón...",
            "Lo esencial es invisible a los ojos. Fue el tiempo que pasaste con tu rosa lo que la hizo tan importante. Los hombres han olvidado esta verdad, pero tú no debes olvidarla. Te haces responsable para siempre de lo que has domesticado. Eres responsable de tu rosa.",
            "Todas las personas mayores han sido primero niños. (Pero pocas lo recuerdan)."
        ]
    },
    {
        id: 'pinocho',
        title: 'Pinocho',
        author: 'Carlo Collodi',
        description: 'La historia de una marioneta de madera que soñaba con ser un niño de verdad.',
        level: 'Fácil',
        age: '6+',
        coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
        genre: 'Cuento de hadas',
        content: [
            "Había una vez un trozo de madera. No era una madera de lujo, sino un simple trozo de leña, de esos que en invierno se echan en las estufas para encender el fuego y calentar las habitaciones.",
            "Gepetto se puso inmediatamente a trabajar y empezó a fabricar el pelo, luego la frente, luego los ojos. Al terminar los ojos, imaginad su asombro al ver que aquellos ojos se movían y lo miraban fijamente.",
            "¡Ay de aquellos niños que se rebelan contra sus padres y abandonan caprichosamente la casa paterna! No conseguirán nada bueno en este mundo, y tarde o temprano se arrepentirán amargamente."
        ]
    },
    {
        id: 'cenicienta',
        title: 'La Cenicienta',
        author: 'Charles Perrault',
        description: 'La joven que con ayuda de su hada madrina y una zapatilla de cristal encontró su destino.',
        level: 'Fácil',
        age: '5+',
        coverImage: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
        genre: 'Cuento de hadas',
        content: [
            "Érase una vez una joven llamada Cenicienta. Tras la muerte de su padre, vivía con su madrastra y dos hermanastras, quienes la obligaban a hacer todas las tareas de la casa.",
            "Un día, llegó una invitación real para un gran baile. Cenicienta lloraba porque no podía ir, hasta que de repente apareció su Hada Madrina con una varita mágica.",
            "Con un toque de magia, una calabaza se convirtió en carruaje y sus harapos en un vestido de seda. Pero debía volver antes de la medianoche.",
            "En el baile, el príncipe solo bailó con ella. Al sonar las doce campanadas, Cenicienta huyó perdiendo una zapatilla de cristal en la escalera.",
            "El príncipe buscó por todo el reino a la dueña de la zapatilla. Cuando llegó a casa de Cenicienta, le calzó perfectamente y vivieron felices por siempre."
        ]
    },
    {
        id: 'blancanieves',
        title: 'Blancanieves',
        author: 'Hermanos Grimm',
        description: 'La princesa de piel blanca como la nieve y su encuentro con los siete enanitos.',
        level: 'Fácil',
        age: '5+',
        coverImage: 'https://images.unsplash.com/photo-1618519764620-7403abdbcdc9?auto=format&fit=crop&q=80&w=800',
        genre: 'Cuento de hadas',
        content: [
            "En un reino lejano vivía Blancanieves, cuya belleza despertaba los celos de la malvada Reina, quien cada día preguntaba a su espejo quién era la más bella.",
            "El espejo respondió un día que Blancanieves era la más bella. La princesa huyó al bosque y encontró una casita donde vivían siete simpáticos enanitos.",
            "La Reina, disfrazada de anciana, le entregó una manzana envenenada. Al morderla, Blancanieves cayó en un sueño profundo.",
            "Los enanitos la cuidaron con amor hasta que llegó un príncipe. Con un beso de amor verdadero, Blancanieves despertó y regresó la alegría al reino."
        ]
    },
    {
        id: 'gato-botas',
        title: 'El Gato con Botas',
        author: 'Charles Perrault',
        description: 'El astuto gato que convirtió a su humilde dueño en el gran Marqués de Carabás.',
        level: 'Medio',
        age: '7+',
        coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
        genre: 'Fábula',
        content: [
            "Un molinero dejó como única herencia a su hijo menor un gato. Al principio el joven estaba triste, pero el gato le pidió un saco y un par de botas.",
            "Con gran astucia, el gato empezó a llevar regalos al Rey en nombre del Marqués de Carabás. El Rey estaba cada vez más impresionado.",
            "El gato engañó a un ogro para que se transformara en ratón y así poder comérselo, reclamando su castillo para su dueño.",
            "Finalmente, el joven se casó con la hija del Rey y vivió rodeado de lujos, gracias a la inteligencia de su fiel amigo, el Gato con Botas."
        ]
    }
];
