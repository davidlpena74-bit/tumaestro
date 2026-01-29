export interface BookPage {
    text: string;
    image?: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    content: BookPage[]; // Divided by chapters or pages
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
            { text: "Si vienes, por ejemplo, a las cuatro de la tarde, desde las tres empezaré a ser feliz. A medida que avance la hora, me sentiré más feliz. A las cuatro me sentiré agitado e inquieto; ¡descubriré el precio de la felicidad! Pero si vienes a cualquier hora, nunca sabré a qué hora preparar mi corazón..." },
            { text: "Lo esencial es invisible a los ojos. Fue el tiempo que pasaste con tu rosa lo que la hizo tan importante. Los hombres han olvidado esta verdad, pero tú no debes olvidarla. Te haces responsable para siempre de lo que has domesticado. Eres responsable de tu rosa." },
            { text: "Todas las personas mayores han sido primero niños. (Pero pocas lo recuerdan)." }
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
            { text: "Había una vez un trozo de madera. No era una madera de lujo, sino un simple trozo de leña, de esos que en invierno se echan en las estufas para encender el fuego y calentar las habitaciones." },
            { text: "Gepetto se puso inmediatamente a trabajar and empezó a fabricar el pelo, luego la frente, luego los ojos. Al terminar los ojos, imaginad su asombro al ver que aquellos ojos se movían y lo miraban fijamente." },
            { text: "¡Ay de aquellos niños que se rebelan contra sus padres y abandonan caprichosamente la casa paterna! No conseguirán nada bueno en este mundo, y tarde o temprano se arrepentirán amargamente." }
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
            { text: "Érase una vez una joven llamada Cenicienta. Tras la muerte de su padre, vivía con su madrastra y dos hermanastras, quienes la obligaban a hacer todas las tareas de la casa." },
            { text: "Un día, llegó una invitación real para un gran baile. Cenicienta lloraba porque no podía ir, hasta que de repente apareció su Hada Madrina con una varita mágica." },
            { text: "Con un toque de magia, una calabaza se convirtió en carruaje y sus harapos en un vestido de seda. Pero debía volver antes de la medianoche." },
            { text: "En el baile, el príncipe solo bailó con ella. Al sonar las doce campanadas, Cenicienta huyó perdiendo una zapatilla de cristal en la escalera." },
            { text: "El príncipe buscó por todo el reino a la dueña de la zapatilla. Cuando llegó a casa de Cenicienta, le calzó perfectamente y vivieron felices por siempre." }
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
            { text: "En un reino lejano vivía Blancanieves, cuya belleza despertaba los celos de la malvada Reina, quien cada día preguntaba a su espejo quién era la más bella." },
            { text: "El espejo respondió un día que Blancanieves era la más bella. La princesa huyó al bosque y encontró una casita donde vivían siete simpáticos enanitos." },
            { text: "La Reina, disfrazada de anciana, le entregó una manzana envenenada. Al morderla, Blancanieves cayó en un sueño profundo." },
            { text: "Los enanitos la cuidaron con amor hasta que llegó un príncipe. Con un beso de amor verdadero, Blancanieves despertó y regresó la alegría al reino." }
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
            { text: "Un molinero dejó como única herencia a su hijo menor un gato. Al principio el joven estaba triste, pero el gato le pidió un saco y un par de botas." },
            { text: "Con gran astucia, el gato empezó a llevar regalos al Rey en nombre del Marqués de Carabás. El Rey estaba cada vez más impresionado." },
            { text: "El gato engañó a un ogro para que se transformara en ratón y así poder comérselo, reclamando su castillo para su dueño." },
            { text: "Finalmente, el joven se casó con la hija del Rey y vivió rodeado de lujos, gracias a la inteligencia de su fiel amigo, el Gato con Botas." }
        ]
    },
    {
        id: 'principe-feliz',
        title: 'El Príncipe Feliz',
        author: 'Oscar Wilde',
        description: 'Una conmovedora historia sobre la generosidad y el sacrificio de una estatua dorada y una pequeña golondrina.',
        level: 'Medio',
        age: '8+',
        coverImage: 'https://images.unsplash.com/photo-1590013330462-08bc93532cc0?auto=format&fit=crop&q=80&w=800',
        genre: 'Cuento de hadas',
        content: [
            { text: "En la parte más alta de la ciudad, sobre una columnita, se alzaba la estatua del Príncipe Feliz. Estaba toda revestida de delgadas láminas de oro fino. Tenía, a guisa de ojos, dos centelleantes zafiros, y un gran rubí rojo ardía en el puño de su espada. Por todo lo cual era muy admirada." },
            { text: "Una noche llegó volando a la ciudad una pequeña golondrina. Sus compañeras habían partido para Egipto seis semanas antes, pero ella se había quedado atrás, porque estaba enamorada de un junco, el más hermoso de todos los juncos de la orilla del río." },
            { text: "La golondrina se posó justo entre los pies del Príncipe Feliz. Pero al ir a dormir, una gran gota de agua le cayó encima. 'Es curioso', pensó, 'no hay ni una nube en el cielo y sin embargo llueve'. Entonces miró hacia arriba y vio que los ojos del Príncipe estaban arrasados de lágrimas." },
            { text: "'¿Quién eres?', preguntó la golondrina. 'Soy el Príncipe Feliz'. '¿Entonces por qué lloras?', dijo ella. 'Cuando estaba vivo', respondió la estatua, 'tenía un corazón humano, pero no sabía lo que eran las lágrimas porque vivía en el Palacio de la Despreocupación'." },
            { text: "'Ahora que estoy aquí arriba, puedo ver toda la fealdad y la miseria de mi ciudad. Allá abajo, en una callejuela, hay una pobre casa con una ventana abierta. Veo a una mujer costurera, bordando flores en un vestido de seda para la más bella de las damas de la Reina. En un rincón, su hijito está enfermo con fiebre y pide naranjas'." },
            { text: "'Golondrina, Golondrinita, ¿no podrías llevarle el rubí de mi espada? Mis pies están sujetos a este pedestal y no puedo moverme'. La golondrina sintió piedad, arrancó el gran rubí y voló sobre los tejados de la ciudad hasta dejar la joya junto al dedal de la costurera." },
            { text: "Al día siguiente, el Príncipe le pidió otro favor: 'Veo a un joven en una buhardilla, está tratando de terminar una comedia para el Director del Teatro, pero tiene demasiado frío para escribir y el hambre le ha debilitado. Golondrina, arranca uno de mis ojos, que son zafiros raros, y llévaselo'." },
            { text: "La golondrina lloró, pero cumplió el deseo del Príncipe. Más tarde, el Príncipe le pidió entregar su otro ojo a una pobre niña que vendía cerillas y se le habían caído al arroyo. 'Ahora que estás ciego', dijo la golondrina, 'me quedaré contigo para siempre'." },
            { text: "Y así, la golondrina voló por la ciudad contándole al Príncipe todo lo que veía: el hambre de los niños y el frío de los pobres. El Príncipe le pidió que arrancara, hoja por hoja, el oro fino que lo cubría para darlo a los necesitados." },
            { text: "Llegó el invierno y la nieve. La pobre golondrinita tenía cada vez más frío, pero no quería abandonar al Príncipe. Un día, sintió que iba a morir. Voló hasta el hombro del Príncipe, le dio un beso y cayó muerta a sus pies. En ese momento, un extraño crujido sonó dentro de la estatua, como si algo se hubiera roto: era su corazón de plomo." },
            { text: "Al día siguiente, el Alcalde ordenó derribar la estatua porque ya no era hermosa. Fundieron el plomo, pero el corazón roto no se fundía. 'Traedme las dos cosas más preciosas de la ciudad', dijo Dios a uno de sus ángeles. Y el ángel le llevó el corazón de plomo y el pájaro muerto." }
        ]
    },
    {
        id: 'ruisenor-rosa',
        title: 'El Ruiseñor y la Rosa',
        author: 'Oscar Wilde',
        description: 'Una profunda historia sobre el amor, el arte y el sacrificio supremo de un ruiseñor.',
        level: 'Difícil',
        age: '10+',
        coverImage: 'https://images.unsplash.com/photo-1516233501034-751bd0175b2b?auto=format&fit=crop&q=80&w=800',
        genre: 'Fábula',
        content: [
            {
                text: "-Dijo que bailaría conmigo si le llevaba una rosa roja -se lamentaba el joven estudiante-, pero no hay una solo rosa roja en todo mi jardín. Desde su nido de la encina, oyóle el ruiseñor. -¡Ah, de qué cosa más insignificante depende la felicidad! He leído cuanto han escrito los sabios; poseo todos los secretos de la filosofía y encuentro mi vida destrozada por carecer de una rosa roja.",
                image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-He aquí, por fin, el verdadero enamorado -dijo el ruiseñor-. Le he cantado todas las noches, aún sin conocerlo; todas las noches les cuento su historia a las estrellas, y ahora lo veo. Su cabellera es oscura como la flor del jacinto y sus labios rojos como la rosa que desea; pero la pasión lo ha puesto pálido como el marfil y el dolor ha sellado su frente.",
                image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-El príncipe da un baile mañana -murmuraba el estudiante-, y mi amada asistirá. Si le llevo una rosa roja, bailará conmigo hasta el amanecer. La tendré en mis brazos, reclinará su cabeza sobre mi hombro y su mano estrechará la mía. Pero no hay rosas rojas en mi jardín. Por lo tanto, tendré que estar solo y no me hará ningún caso.",
                image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-¿Por qué llora? -preguntó la lagartija verde, correteando cerca de él. -Llora por una rosa roja. -¿Por una rosa roja? ¡Qué tontería! -exclamó la lagartija. Pero el ruiseñor, que comprendía el secreto de la pena del estudiante, permaneció silencioso, reflexionando sobre el misterio del amor. De pronto desplegó sus alas y emprendió el vuelo hacia el jardín.",
                image: "https://images.unsplash.com/photo-1501132845347-66bd350a41f6?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Fue primero a un rosal blanco: -Dame una rosa roja y te cantaré mis canciones más dulces. -Mis rosas son blancas como la espuma del mar -respondió. Fue luego a un rosal amarillo junto al reloj de sol: -Dame una rosa roja. -Mis rosas son amarillas como el cabello de las sirenas. Ve al rosal que crece bajo la ventana del estudiante.",
                image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "El ruiseñor voló al rosal bajo la ventana: -Dame una rosa roja. Pero el arbusto respondió: -Mis rosas son rojas como las patas de las palomas, pero el invierno ha helado mis venas y la escarcha ha marchitado mis botones. No tendré más rosas este año. ¿No hay ningún medio para conseguirla?, gritó el ruiseñor.",
                image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-Hay un medio -respondió el rosal-, pero es tan terrible que no me atrevo a decírtelo. Tienes que hacerla con notas de música al claro de luna y teñirla con sangre de tu propio corazón. Cantarás para mí con el pecho apoyado en mis espinas toda la noche. La sangre de tu vida correrá por mis venas y se convertirá en sangre mía.",
                image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-La muerte es un buen precio por una rosa roja -replicó el ruiseñor-, y todo el mundo ama la vida. Sin embargo, el amor es mejor que la vida. ¿Qué es el corazón de un pájaro comparado con el de un hombre? Sé feliz, le gritó al estudiante, tendrás tu rosa. Lo único que te pido es que seas un verdadero enamorado.",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "El estudiante no comprendió lo que decía el ruiseñor, pues sólo sabía las cosas de los libros. Pero la encina lo comprendió y se puso triste. -Cántame la última canción -murmuró. Y el ruiseñor cantó para la encina. El estudiante anotó en su cuaderno: 'Es un artista, pero ¿siente? No se sacrifica por los demás. Es egoísta'. Y se fue a dormir.",
                image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Cuando la luna brillaba, el ruiseñor voló al rosal y colocó su pecho contra las espinas. Toda la noche cantó, y las espinas penetraron cada vez más en su pecho. Primero cantó el nacimiento del amor en el corazón de un joven, y floreció una rosa pálida sobre la rama más alta. '¡Apriétate más!', gritó el rosal, 'o llegará el día antes de terminar'.",
                image: "https://images.unsplash.com/photo-1433333303202-1c0462b7eda1?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Entonces el ruiseñor se apretó más, y cantó el nacimiento de la pasión en el alma de un hombre. Un delicado rubor apareció en los pétalos. Pero el corazón de la rosa seguía blanco. '¡Apriétate más!', gritó el rosal. Y el ruiseñor se apretó con toda su fuerza hasta que una espina le atravesó el corazón y sintió un cruel tormento.",
                image: "https://images.unsplash.com/photo-1550147760-44c9966d6bc7?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Cantó entonces el amor sublimado por la muerte, el amor que no termina en la tumba. Y la rosa maravillosa enrojeció como la aurora. Pero la voz del ruiseñor desfalleció, sus alas empezaron a batir y una nube se extendió sobre sus ojos. La rosa roja estaba terminada. Pero el ruiseñor yacía muerto sobre las hierbas, con el corazón traspasado.",
                image: "https://images.unsplash.com/photo-1500462418834-7ea21395ffad?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Al mediodía, el estudiante abrió su ventana: -¡Qué extraña buena suerte! ¡He aquí una rosa roja! Inmediatamente se puso el sombrero y corrió a casa del profesor. -He aquí la rosa más roja del mundo. Pero la joven frunció las cejas: -Temo que no armonice con mi vestido. Además, me han enviado joyas de verdad.",
                image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "-¡Oh, qué ingrata eres! -dijo el estudiante. Tiró la rosa al arroyo y un carro la aplastó. -¡Qué tontería es el amor! No es ni la mitad de útil que la lógica. Voy a volver a la filosofía y al estudio de la metafísica. Y dicho esto, abrió un gran libro polvoriento y se puso a leer.",
                image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    {
        id: 'patito-feo',
        title: 'El Patito Feo',
        author: 'Hans Christian Andersen',
        description: 'El viaje de un pequeño cisne que nace por error en un corral de patos y descubre su verdadera belleza.',
        level: 'Fácil',
        age: '4+',
        coverImage: 'https://images.unsplash.com/photo-1550853024-fae8cd4af47f?auto=format&fit=crop&q=80&w=800',
        genre: 'Cuento de hadas',
        content: [
            {
                text: "¡Qué lindos eran los días de verano! El trigo estaba amarillo, la avena verde y el heno apilado en los prados. Cerca de un viejo castillo, rodeado por un foso profundo, crecían unas grandes hojas de bardana. En ese lugar tan tranquilo, una mamá pata estaba incubando sus huevos.",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Por fin, los huevos empezaron a romperse uno tras otro. '¡Pip, pip!', decían los patitos asomando sus cabecitas. Pero aún quedaba el huevo más grande por abrir. 'Parece un huevo de pava', dijo una pata vieja que pasaba por allí. 'Déjalo y enseña a nadar a los otros'. Pero la mamá decidió esperar un poco más.",
                image: "https://images.unsplash.com/photo-1555661530-68c8e98db4e6?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Finalmente, el huevo grande se rompió. ¡Pero era un patito horrorosamente grande y gris! 'No se parece a los otros', pensó la madre. Al día siguiente, los llevó a todos al foso. El patito gris saltó al agua y nadaba perfectamente. 'No es un pavo', suspiró aliviada, 'mira qué bien mueve las patas. En el fondo es guapo'.",
                image: "https://images.unsplash.com/photo-1549608276-578677af4cd5?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Pero cuando llegaron al corral, los otros animales empezaron a burlarse de él. Los patos le daban picotazos y los pavos le perseguían. 'Es demasiado grande y raro', decían todos. Incluso sus hermanos empezaron a tratarlo mal. El pobre patito se sentía tan solo y despreciado que decidió escapar de allí.",
                image: "https://images.unsplash.com/photo-1463123081488-729f1d1ee484?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Corrió hasta llegar a una gran ciénaga donde vivían patos silvestres. Pasó allí la noche, triste y cansado. Al día siguiente, unos cazadores aparecieron y el patito tuvo que esconderse muerto de miedo. Cuando todo pasó, siguió caminando hasta llegar a la cabaña de una anciana que vivía con un gato y una gallina.",
                image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "El gato y la gallina se creían los dueños del mundo y siempre le preguntaban: '¿Sabes poner huevos?' o '¿Sabes arquear el lomo y ronronear?'. Como el patito no sabía hacer nada de eso, le decían que era un inútil. El patito echaba de menos el agua y el sol, así que decidió irse otra vez a recorrer el mundo.",
                image: "https://images.unsplash.com/photo-1493631234241-11d29792e345?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Llegó el otoño y las hojas se volvieron amarillas. Un día, vio una bandada de hermosas aves blancas que volaban hacia el sur. Eran cisnes, pero él no lo sabía. Nunca había visto nada tan bello y sintió una extraña emoción. El invierno llegó con mucha nieve y el frío era tan intenso que el pobre patito casi muere congelado.",
                image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Un campesino lo encontró y lo salvó, pero el patito, asustado por los ruidos de la casa, volvió a huir al campo. Pasó el invierno escondido entre las cañas de un estanque. Fue un tiempo muy duro, con mucha hambre y soledad. Pero finalmente, el sol empezó a calentar de nuevo y la primavera llegó.",
                image: "https://images.unsplash.com/photo-1478358133973-503d7c315a43?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "El patito batió sus alas, que ahora eran mucho más fuertes, y voló hasta un hermoso jardín con un estanque de aguas cristalinas. Allí vio a tres magníficos cisnes blancos. '¡Me matarán por ser tan feo y acercarme!', pensó. Inclinó su cabeza hacia el agua esperando el ataque, pero entonces vio su reflejo.",
                image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "¡Ya no era un ave gris y torpe! Era un cisne blanco y elegante. Los otros cisnes nadaron hacia él y le acariciaron con el pico. Unos niños llegaron al estanque y gritaron: '¡Hay uno nuevo! ¡Es el más hermoso de todos!'. El que antes fuera el patito feo se sintió inmensamente feliz, pues ahora sabía quién era realmente.",
                image: "https://images.unsplash.com/photo-1549721341-35b8cae6a6a0?auto=format&fit=crop&q=80&w=800"
            }
        ]
    },
    {
        id: 'soldadito-plomo',
        title: 'El Soldadito de Plomo',
        author: 'Hans Christian Andersen',
        description: 'La heroica aventura de un soldado con una sola pierna y su amor por una bailarina de papel.',
        level: 'Medio',
        age: '6+',
        coverImage: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&q=80&w=800',
        genre: 'Aventuras',
        content: [
            {
                text: "Érase una vez veinticinco soldaditos de plomo, hermanos todos, ya que los habían fundido en la misma vieja cuchara. Fusil al hombro y la mirada al frente, lucían espléndidas guerreras rojas y pantalones azules. Uno de ellos tenía una sola pierna, pues el plomo no alcanzó para terminarlo.",
                image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "En la mesa había un castillo de papel con una damisela a la puerta. Era una bailarina, vestida de muselina con una cinta azul y una lentejuela brillante. Tenía los brazos en alto y una pierna tan levantada que el soldadito creyó que, como él, ella sólo tenía una.",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Al sonar las doce, un duendecillo negro saltó de una tabaquera. '¡Soldado, no mires lo que no es para ti!', gritó. Al día siguiente, el soldadito cayó por la ventana desde un tercer piso. Fue una caída terrible, quedando su gorro encajado entre los adoquines.",
                image: "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Empezó a llover con fuerza. Dos niños lo encontraron y lo pusieron en un barquito de papel. La corriente lo arrastró por la alcantarilla hacia un canal oscuro. '¿A dónde iré a parar?', pensaba el soldadito, manteniendo firme su fusil a pesar del miedo.",
                image: "https://images.unsplash.com/photo-1492644027734-c4df4794e912?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "De repente, un enorme pez se lo tragó. ¡Qué oscuridad había allí dentro! Era mucho peor que la alcantarilla. Pero el soldadito permaneció inmóvil, cuan largo era, apoyado sobre su fusil, soñando con su amada bailarina.",
                image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "El pez fue pescado y llevado a una cocina. ¡Qué sorpresa se llevó la cocinera al encontrar al soldadito! Lo llevó al salón y, maravilla de las maravillas, estaba de vuelta en la misma casa, frente al mismo castillo y la misma hermosa bailarina.",
                image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
            },
            {
                text: "Pero de pronto, sin motivo alguno, un niño lo arrojó a la estufa. El calor era insoportable. Entonces se abrió la puerta, una ráfaga de viento levantó a la bailarina y la hizo volar hasta el fuego, justo al lado de su soldado. Se consumieron juntos, dejando solo un pequeño corazón de plomo.",
                image: "https://images.unsplash.com/photo-1542906418-450f38b292c6?auto=format&fit=crop&q=80&w=800"
            }
        ]
    }
];
