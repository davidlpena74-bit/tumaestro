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
                text: "En una aldea rodeada por un bosque tan espeso que la luz del sol apenas lograba besar el suelo, vivía una niña cuya bondad era conocida por todos los habitantes de la comarca. Su posesión más preciada era una capa de terciopelo de un rojo tan intenso como las amapolas en verano, un regalo de su abuela que la pequeña lucía con orgullo en cada estación. Por esta razón, el nombre con el que se le conocía en los valles y senderos no era otro que Caperucita Roja."
            },
            {
                text: "Una mañana, cuando el rocío aún brillaba sobre las telas de araña en los matorrales, su madre terminó de preparar una cesta de mimbre. El aroma del pan recién horneado y la miel fresca inundaba la pequeña cocina. Con gesto preocupado, la madre llamó a la niña y, mientras ajustaba el lazo de su capa, le dio instrucciones precisas. Su abuela, que vivía en una pequeña cabaña al otro lado del bosque, se encontraba postrada en cama por una fuerte fiebre, y aquellas provisiones eran vitales para su recuperación. 'No te apartes del sendero principal', le advirtió con voz firme, 'pues el bosque tiene ojos y las sombras pueden ser engañosas'."
            },
            {
                text: "Caperucita, con la cesta colgada del brazo y el corazón lleno de buenas intenciones, se adentró en la espesura. El camino estaba flanqueado por pinos centenarios cuyas copas parecían susurrar secretos al viento. A medida que avanzaba, el silencio del bosque se volvía más denso, interrumpido solo por el crujir de las ramas bajo sus pies. Fue entonces cuando, de entre los troncos de los robles, emergió una figura imponente. Era un lobo de dimensiones extraordinarias, con un pelaje grisáceo salpicado de negro y unos ojos que destellaban con una mezcla de hambre y astucia."
            },
            {
                text: "El animal no la atacó de inmediato; en su lugar, se acercó con una elegancia hipnótica, casi caballeresca. '¿A dónde se dirige tan temprano una joven tan encantadora?', preguntó el lobo, suavizando su ronca voz para no asustarla. Caperucita, cuya inocencia no le permitía ver la maldad tras los colmillos, omitió el consejo de su madre y explicó que se dirigía a la casa de su abuela, bajo los tres grandes robles. El lobo le sugirió: '¿No oyes el canto de los pájaros? Un ramo de esas flores curaría el alma de tu abuela incluso antes que el pan que llevas'."
            },
            {
                text: "Seducida por la idea, la niña se desvió del camino. Mientras tanto, el lobo corrió hacia la cabaña de la anciana. Al llegar, llamó a la puerta con tres golpes secos. 'Soy yo, tu nieta Caperucita', mintió, agudizando la voz. La anciana le indicó cómo abrir y, en un instante, el lobo irrumpió y devoró a la mujer. Acto seguido, se vistió con su camisón, se colocó la cofia y se metió en la cama, cubriéndose hasta la nariz para ocultar su hocico."
            },
            {
                text: "Cuando Caperucita llegó finalmente a la cabaña, cargada de flores, encontró la puerta abierta de par en par. Un presentimiento extraño le oprimió el pecho, pero entró llamando a su abuela. La luz que se filtraba por las cortinas apenas iluminaba el rostro de la figura que yacía en el lecho. Al acercarse, notó que algo no encajaba; la fisonomía de su abuela parecía haber mutado bajo la fiebre."
            },
            {
                text: "—'¡Oh, abuelita, qué orejas tan grandes tienes!', exclamó la niña con un susurro tembloroso. —'Son para oírte mejor, mi niña', respondió el lobo. —'¡Abuelita, qué ojos tan grandes tienes!'. —'Son para verte mejor en la penumbra'. —'¡Y qué manos tan grandes tienes!'. —'Son para abrazarte con más fuerza'. —'Pero abuelita... ¡qué boca tan terriblemente grande tienes!'. —'¡Es para comerte mejor!'."
            },
            {
                text: "El lobo saltó de la cama con una ferocidad salvaje y, antes de que Caperucita pudiera gritar, la engulló por completo. Saciado y exhausto por su propio festín, el animal volvió a la cama y cayó en un sueño profundo, roncando con tal fuerza que las paredes de la cabaña parecían temblar."
            },
            {
                text: "Poco después, un cazador que patrullaba la zona escuchó aquellos ruidos antinaturales. Entró en la casa y se encontró con el lobo durmiendo plácidamente con la barriga hinchada. Comprendiendo la situación, tomó un par de tijeras de costura y, con cuidado, abrió el vientre de la bestia. De la oscuridad del estómago surgieron primero la capa roja y luego Caperucita, seguida de la abuela, ambas ilesas pero aterrorizadas por la asfixiante experiencia."
            },
            {
                text: "La niña recogió grandes piedras del río, con las que rellenaron el cuerpo del lobo. Cuando el animal despertó e intentó huir, su peso era tal que cayó al suelo sin vida. La cabaña recuperó su paz, y mientras la abuela comía el pastel, Caperucita prometió que jamás volvería a abandonar el sendero seguro, pues había comprendido que la belleza de las flores no compensaba el peligro que acecha en las sombras de lo desconocido."
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
        coverImage: '/images/storyteller/pulgarcito-clasico.png',
        chipImage: '/images/storyteller/pulgarcito-clasico.png',
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
    },
    {
        id: 'hansel-y-gretel',
        title: 'Hansel y Gretel',
        author: 'Hermanos Grimm',
        description: 'Dos hermanos perdidos en el bosque descubren una casa hecha de dulces, pero pronto se enfrentan a un peligro mayor del que jamás imaginaron.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/hansel-gretel-bruja.jpg',
        chipImage: '/images/storyteller/hansel-gretel-bruja.jpg',
        genre: 'Cuento de hadas',
        themeColor: 'from-amber-600 to-brown-700',
        content: [
            {
                text: "En los márgenes de un bosque vasto y sombrío, donde los árboles parecen entrelazar sus ramas para ocultar el cielo, vivía un humilde leñador con su esposa y sus dos hijos: Hansel, un niño de mirada despierta, y Gretel, su hermana de corazón valiente. La pobreza se había asentado en su hogar como un polvo denso que no se podía sacudir. El hambre era una presencia constante que hacía rugir sus estómagos y nublaba el juicio de los adultos. Una noche, mientras la escasez apretaba más que nunca, la madrastra, con el corazón endurecido por la desesperación, susurró al oído del leñador un plan atroz: llevarían a los niños a lo más profundo de la maleza y los abandonarían allí."
            },
            {
                text: "Los niños, que el hambre mantenía despiertos, escucharon cada palabra tras la delgada pared de madera. Gretel lloró amargamente, pero Hansel la consoló con un plan astuto. Al amparo de la luna, el niño salió al patio y llenó sus bolsillos con pequeños guijarros blancos que brillaban en la oscuridad como monedas de plata. Al amanecer, mientras la familia se internaba en el corazón del bosque, Hansel se quedaba atrás a cada pocos pasos, dejando caer una piedra blanca sobre la tierra negra. Cuando el fuego que sus padres les habían encendido se extinguió y se vieron solos bajo la luz de la luna, los guijarros guiaron sus pasos de regreso a casa."
            },
            {
                text: "Sin embargo, la miseria no dio tregua. Semanas después, la historia se repitió, pero esta vez la puerta estaba cerrada bajo llave y Hansel no pudo recoger piedras. En su lugar, desmenuzó el último trozo de pan que tenían y fue dejando un rastro de migas por el sendero. Lo que el niño no previó fue que los pájaros del bosque, hambrientos como ellos, devorarían cada rastro de pan. Cuando la noche cayó y la luna se alzó, no encontraron nada más que tierra y sombra. Caminaron durante tres días y tres noches, perdidos en un laberinto de troncos retorcidos, hasta que un pájaro de plumaje blanco como la nieve los guio con su canto hacia un claro extraordinario."
            },
            {
                text: "Frente a ellos se alzaba una casita que parecía un sueño febril de un confitero: las paredes eran de pan de jengibre, el tejado de tarta de chocolate y las ventanas de azúcar transparente como el cristal. Los niños, empujados por un hambre voraz, comenzaron a arrancar trozos de la estructura. 'Roer, roer, ratoncito, ¿quién roe mi casita?', dijo una voz cascada desde el interior. De la puerta salió una mujer encorvada, apoyada en un bastón, que los invitó a entrar con una sonrisa que no llegaba a sus ojos pequeños y rojizos. Aunque parecía una anciana bondadosa, era en realidad una bruja malvada que construía casas de dulce para atraer y devorar a los niños."
            },
            {
                text: "A la mañana siguiente, la bruja encerró a Hansel en una jaula de hierro y ordenó a Gretel cocinar los mejores manjares para engordar a su hermano. Cada mañana, la mujer, cuya vista era muy pobre, pedía a Hansel que sacara un dedo para comprobar si ya estaba lo suficientemente tierno. El niño, astuto, extendía un hueso de pollo que había encontrado en el suelo. La bruja se asombraba de que el niño siguiera tan flaco, hasta que un día perdió la paciencia. Decidió que, gordo o flaca, se comería a Hansel ese mismo medio día."
            },
            {
                text: "La bruja ordenó a Gretel que se asomara al horno para ver si el fuego estaba listo para cocer el pan, con la intención de empujarla dentro y asarla a ella también. Pero la niña, que había adivinado sus negras intenciones, fingió torpeza. 'No sé cómo hacerlo, ¿por dónde debo entrar?', preguntó Gretel. La anciana, gruñendo de rabia por la ignorancia de la niña, se acercó al horno y metió la cabeza para mostrarle cómo hacerlo. En ese instante de descuido, Gretel reunió todas sus fuerzas, le dio un empujón soberbio y cerró la pesada puerta de hierro, dejando que la malvada mujer encontrara su propio final entre las llamas."
            },
            {
                text: "Gretel corrió a liberar a Hansel, y ambos se abrazaron llorando de alegría. Antes de marcharse, exploraron la casa y encontraron cofres repletos de perlas y piedras preciosas que la bruja había acumulado de sus víctimas. Llenaron sus bolsillos y emprendieron el regreso. Tras mucho caminar, llegaron a un gran río que no podían cruzar, pero un pato blanco, conmovido por su historia, los llevó uno a uno sobre su lomo hasta la otra orilla. Al final del sendero, divisaron su antigua casa. Su madrastra había muerto y su padre, consumido por el remordimiento, los recibió con lágrimas de perdón. Con las joyas de la bruja, la pobreza abandonó su hogar para siempre."
            }
        ]
    }
];
