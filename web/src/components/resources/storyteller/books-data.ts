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
        author: 'Charles Perrault',
        description: 'La asombrosa historia de un gato muy astuto que, con un par de botas y mucha inteligencia, logra convertir a su humilde amo en el gran Marqués de Carabás.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/puss-in-boots-cover.png',
        chipImage: '/images/storyteller/character-gato.png',
        genre: 'Aventura',
        themeColor: 'from-red-800 to-amber-700',
        content: [
            {
                text: "Había una vez un viejo molinero que, al morir, dejó a sus tres hijos todo lo que tenía: un molino, un asno y un gato. Los hijos mayores se quedaron con el molino y el asno, mientras que al más joven solo le quedó el gato. El pobre joven se lamentaba: '¿Qué haré con un simple gato?'. Pero el gato, que le escuchaba, le dijo: 'No os preocupéis, mi señor. Solo dadme un saco y un par de botas, y os demostraré que vuestra fortuna no es tan mala'."
            },
            {
                text: "El joven, aunque sorprendido, le consiguió lo que pedía. El gato se calzó sus nuevas botas, se echó el saco al hombro y se dirigió al bosque. Allí, usando su astucia, cazó un hermoso conejo y lo metió en el saco. Con paso firme y aire elegante, se dirigió al palacio del Rey. Al llegar, hizo una gran reverencia y dijo: 'Majestad, os traigo este regalo de parte de mi señor, el Marqués de Carabás', pues así decidió llamar a su amo."
            },
            {
                text: "Durante meses, el gato continuó llevando regalos al Rey en nombre del Marqués. Un día, supo que el Rey pasearía con su hija, la princesa más bella del mundo, por la orilla del río. Corrió hacia su amo y le dijo: '¡Rápido! Desnúdate y métete en el agua'. El joven obedeció sin entender. Cuando la carroza real pasaba por allí, el gato empezó a gritar: '¡Socorro! ¡Socorro! ¡El Marqués de Carabás se está ahogando! ¡Unos ladrones se han llevado su ropa!'"
            },
            {
                text: "El Rey, reconociendo al gato que tantos regalos le había llevado, ordenó detener la carroza. Sus guardias sacaron al joven del río y le trajeron los trajes más lujosos del palacio. Al vestirse con tales galas, el joven parecía realmente un noble, y la princesa quedó encantada al verlo. El Rey invitó al flamante Marqués a subir a la carroza. Mientras tanto, el astuto gato corrió por delante de ellos."
            },
            {
                text: "El gato llegó a unos grandes campos de trigo y dijo a los campesinos: 'Si el Rey os pregunta de quién son estas tierras, decid que pertenecen al Marqués de Carabás, u os pasará algo terrible'. Cuando el Rey pasó y preguntó, todos respondieron: 'Son del Marqués de Carabás, Majestad'. El Rey estaba asombrado por la enorme riqueza del joven. El gato seguía corriendo por delante, llegando finalmente a un majestuoso castillo."
            },
            {
                text: "Aquel castillo pertenecía a un temible ogro, el más rico del mundo, dueño de todas las tierras por las que habían pasado. El gato entró y, con mucha cortesía, dijo al ogro: 'Me han dicho que sois capaz de convertiros en cualquier animal'. El ogro, orgulloso, se transformó en un enorme león. El gato, fingiendo miedo, dijo: '¡Increíble! Pero... ¿podríais convertiros en algo muy pequeño? ¿Acaso en un ratón?'."
            },
            {
                text: "El ogro soltó una carcajada y, para demostrar su poder, se transformó de inmediato en un pequeño ratón que empezó a correr por el suelo. ¡Ese era el momento que el gato esperaba! De un solo salto, lo atrapó y se lo comió. En ese instante, la carroza del Rey llegaba a las puertas del castillo. El gato salió a recibirlos y dijo con orgullo: '¡Bienvenidos al castillo de mi señor, el Marqués de Carabás!'."
            },
            {
                text: "El Rey quedó maravillado por el castillo y las riquezas del joven marqués. Aquella misma tarde, se celebró un gran banquete y el Rey, viendo lo mucho que su hija y el joven se querían, ofreció al Marqués la mano de la princesa. El hijo del molinero aceptó encantado y se casaron ese mismo día. En cuanto al gato, se convirtió en un gran señor y ya nunca más tuvo que cazar ratones, excepto por pura diversión."
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
