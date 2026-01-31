export interface BookPage {
    text: string;
    image?: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    content: BookPage[];
    level: 'Fácil' | 'Medio' | 'Difícil';
    age: string;
    coverImage: string;
    chipImage?: string;
    genre: string;
    themeColor: string;
}

export const BOOKS: Book[] = [
    {
        id: 'patito-feo',
        title: 'El Patito Feo',
        author: 'Hans Christian Andersen',
        description: 'La conmovedora historia de un pequeño patito que sufre el rechazo por ser diferente, hasta que el tiempo revela su verdadera y majestuosa naturaleza.',
        level: 'Fácil',
        age: '4+',
        coverImage: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&q=80&w=800',
        chipImage: '/images/storyteller/character-patito.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-blue-400 to-cyan-300',
        content: [
            {
                text: "Era verano, y la región tenía su aspecto más amable del año. El trigo estaba dorado ya, la avena verde todavía. El heno había sido apilado en parvas sobre las fértiles praderas, por las que deambulaba la cigüeña con sus rojas patas, parloteando en egipcio, único idioma que su madre le había enseñado. En torno del campo y las praderas se veían grandes bosques, en cuyo centro había profundos lagos. Y en el lugar más desolado de la comarca se erguía una antigua mansión rodeada por un profundo foso."
            },
            {
                text: "Entre el foso y los muros crecían plantas de grandes hojas, algunas lo bastante amplias como para que un niño pudiera estar de pie bajo ella. Y allí entre las hojas, tan retirada y escondida como en lo profundo de una selva, estaba una pata empollando. Los patitos tenían que salir dentro de muy poco, pero la madre se sentía muy cansada, pues la tarea duraba ya demasiado tiempo."
            },
            {
                text: "Por último, uno tras otro, los huevos empezaron a crujir suavemente. 'Chuí, chuí' dijeron. Toda la cría acababa de venir al mundo y estaba asomando sus cabecitas. —Cuá, cuá —dijo la pata, y al oírla los patitos respondieron a coro con sus más fuertes voces. Su madre los dejaba hacer, pues el verde es bueno para la vista. —¡Qué grande es el mundo! —dijeron todos los pequeños."
            },
            {
                text: "La pata se levantó y miró alrededor. —No, por cierto que no están todos aún. Queda por abrir todavía el huevo más grande. ¿Cuánto tiempo tardará? —se preguntó, volviéndose a echar en el nido. Una vieja pata llegó de visita. —Déjame ver ese huevo que tarda en romperse —dijo—. Puedes estar segura que no es un huevo de nuestra especie, sino de pavo. Déjalo donde está."
            },
            {
                text: "Por último el huevo que tardaba en abrirse empezó a crujir. —Chip, chip —dijo el recién nacido, y salió del cascarón tambaleándose. ¡Qué grandote y qué feo era! La pata lo miró con disgusto. 'El pato es de un tamaño monstruoso —dijo—. ¿Será acaso un pichón de pavo? Bueno, no tardaremos mucho en saberlo. Al agua irá, aunque tenga yo misma que arrojarlo de un puntapié'."
            },
            {
                text: "El día siguiente amaneció espléndido. Mamá pata se fue a la orilla y se zampó en el agua. Uno tras otro los patitos se zambulleron detrás de ella. Hasta aquel grandote, gris y feo nadó también. —No es un pavo —reflexionó la pata—. Hay que ver qué bien se maneja con las patas y qué derecho se sostiene. Es mi propio pollo, después de todo, y no tan mal parecido si se lo mira bien."
            },
            {
                text: "Se fueron todos al corral. Pero allí, los otros patos los miraban diciendo: —¡Vean eso! Ahora tendremos que aguantar también a toda esa tribu. Y, ¡qué feo ese patito! No se lo puede mirar. Y un pato corrió hacia él y le dio un picotazo en el cuello. —¡Déjalo! —suplicó la madre—. No hace daño a nadie. —Pero es tan desmañado y raro que dan ganas de darle una paliza —dijeron los otros."
            },
            {
                text: "Así transcurrió el primer día; luego las cosas fueron poniéndose cada vez peor. Al pobre patito no había quién no lo corriera o le diera empujones. Hasta sus hermanos le decían: —¡Ojalá te agarrara el gato, antipático! Los patos y las gallinas lo picoteaban, y la muchacha que les traía la comida lo hacía a un lado. Hasta que por fin el patito huyó saltando por encima del cerco."
            },
            {
                text: "Llegó a un extenso pantano donde vivían patos silvestres. Estaba tan cansado y apenado que se quedó allí. Pasaron días difíciles, hubo disparos de cazadores y perros enormes que lo asustaron, pero ni siquiera quisieron morderlo por ser tan feo. Luego llegó a una casita miserable donde vivía una anciana con un gato y una gallina que se creían los dueños del mundo y lo trataban con desdén por no saber poner huevos ni ronronear."
            },
            {
                text: "El patito decidió marcharse otra vez por el mundo. Llegó el otoño, las hojas se pusieron pardas y el frío aumentó. Un día vio una bandada de hermosas aves blancas, cisnes, que volaban hacia el sur. Nunca había visto nada tan bello. Lanzó un grito extraño al verlas, sintiéndose atraído hacia ellas de una forma misteriosa. Pero el invierno llegó con crudeza y el patito casi muere congelado en el hielo."
            },
            {
                text: "Sobrevivió al duro invierno con muchas penurias. Cuando el sol empezó a calentar de nuevo, el patito estaba en un jardín y vio tres hermosos cisnes. 'Volaré hacia ellos —se dijo—, aunque me maten a picotazos por ser tan feo'. Se lanzó al agua y nadó hacia ellos. Inclinó la cabeza esperando la muerte, pero al mirar el agua vio su propio reflejo."
            },
            {
                text: "¡No era un ave gris y torpe! ¡Era un cisne! Los grandes cisnes nadaron a su alrededor y lo acariciaron con el pico. Unos niños que llegaron gritaron: '¡Hay uno nuevo! ¡Es el más bonito de todos!'. El patito se sintió lleno de júbilo, agitó sus alas y alzó su esbelto cuello diciendo: 'Nunca imaginé semejante felicidad cuando yo era el Patito Feo'."
            }
        ]
    },
    {
        id: 'caperucita-roja',
        title: 'Caperucita Roja',
        author: 'Charles Perrault',
        description: 'La clásica advertencia sobre los peligros de hablar con lobos astutos, en un viaje a casa de la abuelita.',
        level: 'Fácil',
        age: '3+',
        coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800', // Nueva imagen: Bosque misterioso con toque fantástico
        chipImage: '/images/storyteller/character-caperucita.png',
        genre: 'Fábula',
        themeColor: 'from-red-600 to-amber-700',
        content: [
            {
                text: "En tiempo del rey que rabió, vivía en una aldea una niña, la más linda de las aldeanas, tanto que loca de gozo estaba su madre y más aún su abuela, quien le había hecho una caperuza roja; y tan bien le estaba que por Caperucita Roja conocíanla todos. Un día su madre hizo tortas y le dijo: —Irás a casa de la abuela a informarte de su salud, pues me han dicho que está enferma. Llévale una torta y este tarrito lleno de manteca."
            },
            {
                text: "Caperucita Roja salió enseguida en dirección a la casa de su abuela, que vivía en otra aldea. Al pasar por un bosque encontró al compadre lobo que tuvo ganas de comérsela, pero a ello no se atrevió porque había algunos leñadores. Preguntola a dónde iba, y la pobre niña, que no sabía fuese peligroso detenerse para dar oídos al lobo, le dijo: —Voy a ver a mi abuela y a llevarle esta torta con un tarrito de manteca que le envía mi madre."
            },
            {
                text: "—¿Vive muy lejos? —preguntole el lobo. —Sí, —contestole Caperucita Roja— a la otra parte del molino que veis ahí; en la primera casa de la aldea. —Pues entonces —añadió el lobo—, yo también quiero visitarla. Iré a su casa por este camino y tú por aquel, a ver cuál de los dos llega antes."
            },
            {
                text: "El lobo echó a correr tanto como pudo, tomando el camino más corto, y la niña fuese por el más largo entreteniéndose en coger avellanas, en correr detrás de las mariposas y en hacer ramilletes con las florecillas que hallaba a su paso. Poco tardó el lobo en llegar a la casa de la abuela. Llamó: ¡pam! ¡pam! —¿Quién va? —Soy vuestra nieta, Caperucita Roja —dijo el lobo imitando la voz de la niña—. Os traigo una torta y un tarrito de manteca que mi madre os envía."
            },
            {
                text: "La buena de la abuela, que estaba en cama porque se sentía indispuesta, contestó gritando: —Tira del cordel y se abrirá el cancel. Así lo hizo el lobo y la puerta se abrió. Arrojose encima de la vieja y la devoró en un abrir y cerrar de ojos, pues hacía más de tres días que no había comido. Luego cerró la puerta y fue a acostarse en la cama de la abuela, esperando a Caperucita Roja."
            },
            {
                text: "Algún tiempo después llamó a la puerta: ¡pam! ¡pam! —¿Quién va? Caperucita Roja, que oyó la ronca voz del lobo, tuvo miedo al principio, pero creyendo que su abuela estaba constipada, contestó: —Soy yo, vuestra nieta, Caperucita Roja, que os trae una torta y un tarrito de manteca que os envía mi madre. El lobo gritó procurando endulzar la voz: —Tira del cordel y se abrirá el cancel."
            },
            {
                text: "Caperucita Roja tiró del cordel y la puerta se abrió. Al verla entrar, el lobo le dijo, ocultándose debajo de la manta: —Deja la torta y el tarrito de manteca encima de la artesa y vente a acostar conmigo. Caperucita Roja lo hizo. Grande fue su sorpresa al ver el aspecto de su abuela, y le dijo: —Abuelita, tenéis los brazos muy largos. —Así te abrazaré mejor, hija mía. —Abuelita, tenéis las piernas muy largas. —Así correré más, hija mía."
            },
            {
                text: "—Abuelita, tenéis las orejas muy grandes. —Así te oiré mejor, hija mía. —Abuelita, tenéis los ojos muy grandes. —Así te veré mejor, hija mía. —Abuelita, tenéis los dientes muy grandes. —Así te comeré mejor, hija mía. Y al decir estas palabras, el malvado lobo arrojose sobre Caperucita Roja y se la comió."
            },
            {
                text: "MORALEJA DEL CUENTO: La niña bonita, La que no lo sea, Que a todas alcanza Esta moraleja, Mucho miedo, mucho, Al lobo le tenga, Que a veces es joven De buena presencia, De palabras dulces, De grandes promesas, Tan pronto olvidadas Como fueron hechas."
            }
        ]
    }
];
