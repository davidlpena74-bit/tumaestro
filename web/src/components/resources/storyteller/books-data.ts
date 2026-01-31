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
    },
    {
        id: 'gato-con-botas',
        title: 'El Gato con Botas',
        author: 'Hermanos Grimm',
        description: 'La clásica versión de los Hermanos Grimm sobre el gato más astuto de la historia, capaz de convertir a un humilde molinero en todo un rey.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/puss-in-boots-cover.png',
        chipImage: '/images/storyteller/character-gato.png',
        genre: 'Fábula',
        themeColor: 'from-amber-500 to-orange-400',
        content: [
            {
                text: "Érase una vez un molinero que tenía tres hijos, su molino, un asno y un gato. Los hijos tenían que moler, el asno tenía que llevar el grano y el gato tenía que cazar ratones. Cuando el molinero murió, los hijos se repartieron la herencia: el mayor el molino, el segundo el asno y al tercero le tocó el gato. El joven se entristeció: '¿Qué voy a hacer yo con un gato? Si me hago unos guantes con su piel, no me quedará nada'."
            },
            {
                text: "-Escucha -dijo el gato, que lo había entendido todo-, no debes matarme. Encarga que me hagan un par de botas para que pueda salir y que la gente me vea, y pronto obtendrás ayuda. El joven se asombró de que el gato hablara, pero llamó al zapatero para que le tomara medidas. Cuando estuvieron listas, el gato se las calzó, tomó un saco con grano y salió por la puerta andando sobre dos patas como si fuera una persona."
            },
            {
                text: "Llegó al bosque, esparció el grano en el saco y se escondió. Pronto capturó varias perdices, el manjar favorito del Rey, que nadie podía atrapar. Se fue al palacio y dijo: 'Mi señor el conde presenta sus respetos al rey y le envía estas perdices'. El Rey, encantado con el regalo, mandó llenar el saco del gato con todo el oro que pudiera cargar. El gato regresó y esparció el oro ante su amo: 'Aquí tienes algo a cambio de las botas'."
            },
            {
                text: "El gato continuó llevando regalos al palacio cada día, y el Rey llegó a apreciarlo mucho. Un día, supo que el Rey y la Princesa irían al lago. Corrió a casa y dijo a su amo: 'Si quieres ser rico, vente al lago y báñate'. Mientras el joven se bañaba, el gato escondió su ropa. Cuando el Rey pasó, el gato gritó: '¡Socorro! ¡Al señor conde le han robado la ropa!'. El Rey ordenó traer sus mejores galas para vestir al joven."
            },
            {
                text: "Vestido con ropas reales, el joven parecía un noble y la Princesa quedó encantada. El Rey lo invitó a la carroza. El gato se adelantó y ordenó a todos los campesinos: 'Si el Rey pregunta, decid que estos prados y campos de trigo pertenecen al conde, ¡o moriréis!'. Al pasar el Rey y preguntar, todos respondieron: '¡Son del señor conde!'. El Rey estaba asombrado: 'Grandes y bonitas tierras tienes, conde'."
            },
            {
                text: "El gato llegó finalmente al palacio de un gran mago capaz de transformarse en cualquier animal. Entró con descaro y le dijo: 'He oído que puedes transformarte en elefante o león, pero seguro que no puedes convertirte en algo tan pequeño como un ratón'. El mago, herido en su orgullo, se transformó de inmediato en un ratón. ¡Era lo que el gato esperaba! De un salto lo atrapó y se lo comió de un bocado."
            },
            {
                text: "Cuando la carroza real llegó al castillo, el gato salió a recibirlos: '¡Bienvenidos al palacio de mi señor el conde!'. El Rey se maravilló del magnífico edificio, que era más hermoso que su propio palacio. Aquel día, el Rey prometió la mano de su hija al joven. Cuando el monarca murió, el conde se convirtió en Rey y el gato con botas en su Primer Ministro, viviendo felices para siempre."
            }
        ]
    },
    {
        id: 'pulgarcito',
        title: 'Pulgarcito',
        author: 'Charles Perrault',
        description: 'La valiente historia del pequeño Pulgarcito, quien con su ingenio y unas botas mágicas salva a sus siete hermanos de un temible ogro.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/pulgarcito-cover.png',
        chipImage: '/images/storyteller/character-pulgarcito.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-emerald-500 to-teal-400',
        content: [
            {
                text: "Érase una vez un leñador y una leñadora que tenían siete hijos varones. Eran muy pobres y sus hijos una pesada carga. El menor de ellos era muy pequeñito y cuando llegó al mundo no era más gordo que un pulgar, por lo cual lo llamaron Pulgarcito. Aunque hablaba poco, era el más agudo de sus hermanos y escuchaba mucho todo lo que ocurría en casa."
            },
            {
                text: "Sobrevino un año de hambruna y los padres, desesperados, decidieron dejar a los niños en el bosque. Pulgarcito oyó el plan escondido bajo el taburete de su padre. Sin decir nada, se levantó de madrugada y fue al riachuelo a llenarse los bolsillos de guijarros blancos. Cuando los llevaron al bosque y sus padres huyeron, Pulgarcito guió a sus hermanos de vuelta siguiendo el rastro de las piedras."
            },
            {
                text: "Los padres se alegraron de verlos, pero pronto el dinero volvió a faltar y decidieron perderlos de nuevo, esta vez más lejos. Pulgarcito, que no pudo recoger piedras por estar la puerta cerrada, usó migas de pan para marcar el camino. Pero al intentar regresar, descubrió con horror que los pájaros se habían comido todas las migas. Estaban perdidos en lo más profundo y oscuro del bosque."
            },
            {
                text: "Tras caminar mucho bajo la lluvia, Pulgarcito divisó una luz desde la cima de un árbol. Llegaron a una casa donde una mujer les advirtió: '¡Huid! Aquí vive un ogro que come niños'. Pulgarcito suplicó albergue, pues temían más a los lobos del bosque. La mujer los escondió bajo la cama, pero al llegar el ogro, este gritó: '¡Huelo a carne fresca!', y no tardó en descubrirlos."
            },
            {
                text: "La ogresa convenció al ogro de esperar a la mañana para comérselos. Los mandó a dormir al cuarto donde estaban sus siete hijas, cada una con una corona de oro. Pulgarcito, temiendo un ataque nocturno, cambió las coronas de las niñas por los gorros de sus hermanos. En mitad de la noche, el ogro entró a oscuras y, al tocar los gorros, acabó con sus propias hijas por error. Los niños aprovecharon para huir."
            },
            {
                text: "Al despertar y ver lo ocurrido, el ogro se puso sus botas de siete leguas para darles caza. Pulgarcito vio al gigante saltar de montaña en montaña y escondió a sus hermanos en una roca hueca. El ogro, cansado, se sentó a descansar sobre esa misma roca y se quedó profundamente dormido. Pulgarcito aprovechó para quitarle las botas mágicas, que se ajustaron perfectamente a sus pies al ser encantadas."
            },
            {
                text: "Con las botas puestas, Pulgarcito regresó a la casa del ogro y engañó a la mujer diciéndole que unos ladrones pedían todo su oro para liberar al marido. La mujer le dio todas sus riquezas. Pulgarcito volvió a casa cargado de oro, salvando a su familia de la miseria para siempre. Compró tierras para sus padres y hermanos, demostrando que el tamaño no importa cuando se tiene un gran corazón e inteligencia."
            }
        ]
    }
];
