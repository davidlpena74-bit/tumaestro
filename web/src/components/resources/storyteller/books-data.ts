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
        coverImage: '/images/storyteller/hansel-gretel-bruja.jpg',
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
    },
    {
        id: 'hansel-y-gretel',
        title: 'Hansel y Gretel',
        author: 'Hermanos Grimm',
        description: 'Dos hermanos perdidos en el bosque descubren una casa hecha de dulces, pero pronto se enfrentan a un peligro mayor del que jamás imaginaron.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/hansel-gretel-bruja.jpg',
        chipImage: '/images/storyteller/character-hansel-gretel.png',
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
    },
    {
        id: 'sirenita',
        title: 'La Sirenita',
        author: 'Hans Christian Andersen',
        description: 'La historia original de Hans Christian Andersen sobre una pequeña sirena que entrega su voz por amor y la búsqueda de un alma inmortal.',
        level: 'Medio',
        age: '7+',
        coverImage: '/images/storyteller/sirenita-cover.png',
        chipImage: '/images/storyteller/character-sirenita.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-blue-600 to-teal-400',
        content: [
            {
                text: "En las profundidades más remotas del océano, donde el azul del agua es tan puro como el cristal más fino, se extendía el reino de los hombres del mar. Allí crecen árboles de un coral carmesí y plantas que se ondulan ante las corrientes. En el punto más profundo se alzaba el castillo del Rey del Mar: una estructura de coral con techos de conchas gigantes que se abren para dejar pasar las corrientes, y ventanas de ámbar transparente."
            },
            {
                text: "El Rey tenía seis hijas, pero la menor era la más singular. Mientras sus hermanas decoraban sus jardines con restos de naufragios, ella solo quería una estatua de mármol de un joven apuesto y unas flores rojas que recordaban al sol. Su skin era delicada como un pétalo de rosa y sus ojos azules como el abismo, pero al igual que sus hermanas, no tenía pies; su cuerpo terminaba en una cola de pez cubierta de escamas plateadas."
            },
            {
                text: "La tradición dictaba que, al cumplir quince años, cada princesa podía subir a la superficie. La sirenita escuchó durante años las historias de sus hermanas: barcos que pasaban como sombras y ciudades que brillaban como estrellas. Cuando llegó su turno, su abuela le colocó ocho ostras blancas en la cola para marcar su rango y le permitió ascender por primera vez al mundo de los hombres."
            },
            {
                text: "Al emerger, el sol se ponía y una estrella parpadeaba sobre un gran barco de tres mástiles. A través de una ventana, vio a un joven príncipe de ojos negros que celebraba su cumpleaños. Pero de pronto, el cielo se oscureció y las olas se convirtieron en montañas. El barco se hundió en las entrañas del océano. Recordando que los humanos no pueden respirar bajo el agua, la sirenita buscó al príncipe entre los restos del naufragio."
            },
            {
                text: "Lo encontró inconsciente y, sosteniendo su cabeza fuera de las olas, nadó con él hasta llegar a una costa desconocida. Lo dejó sobre la arena tibia y se escondió tras unas rocas. Vio cómo una joven lo encontraba y pedía ayuda. El príncipe despertó, pero nunca supo que una criatura del mar le había salvado la vida; pensó que su salvadora era la muchacha de aquel lugar."
            },
            {
                text: "La sirenita regresó a su palacio, pero su corazón se quedó en la superficie. Desesperada por obtener un alma inmortal (pues los seres del mar al morir se convierten en espuma, mientras que las almas humanas ascienden a las estrellas), decidió visitar a la Bruja del Mar. El camino era aterrador, cruzando remolinos rugientes y campos de pólipos hambrientos que extendían sus tentáculos como serpientes."
            },
            {
                text: "La bruja aceptó ayudarla, pero a un precio terrible. —'Te prepararé una pócima', dijo con risa sibilante. 'Sentirás como si una espada atravesara tu cuerpo al transformarte. Tendrás las piernas más bellas, pero cada paso será como caminar sobre cuchillos afilados. Y a cambio, me darás tu voz, la voz más dulce del océano'. La sirenita aceptó y la bruja le cortó la lengua, sumiéndola en el silencio."
            },
            {
                text: "Frente al palacio del príncipe, la sirenita bebió el brebaje y se desmayó por el dolor. Cuando despertó, el príncipe estaba ante ella. Él la acogió fascinado por aquella criatura muda que bailaba con gracia celestial a pesar del dolor insoportable de sus pies. Ella se convirtió en su compañera constante, amándolo en silencio mientras él la trataba como a una niña querida, pero sin pensar en casarse con ella."
            },
            {
                text: "Un día, el Rey ordenó que el príncipe se casara con la princesa vecina. Para horror de la sirenita, resultó ser la misma joven que lo encontró en la playa. El príncipe, creyendo que ella era su verdadera salvadora, se enamoró. Se celebró una boda fastuosa en un barco. La sirenita, vestida de seda, tuvo que sostener la cola de la novia, sabiendo que al salir el sol ella moriría y se convertiría en espuma."
            },
            {
                text: "Mientras observaba el horizonte, sus hermanas emergieron con sus cabellos cortados. —'¡Hermana!', gritaron. 'Hemos dado nuestro cabello a la bruja por este puñal. Si atraviesas el corazón del príncipe antes del amanecer y dejas que su sangre caiga sobre tus pies, volverás a ser una sirena'. La sirenita entró en la tienda nupcial, pero al mirar el rostro sereno del príncipe, no pudo hacerlo."
            },
            {
                text: "Lanzó el arma a las olas y se arrojó ella misma al mar al aparecer el sol. Sintió que su cuerpo se disolvía, pero no se convirtió en nada. Miles de criaturas transparentes la rodeaban. —'¿Quiénes sois?', preguntó con una voz espiritual. —'Somos las hijas del aire', respondieron. 'No tenemos alma, pero podemos ganarla con buenas acciones. Tú has sufrido y has amado, y ahora te unes a nosotras'."
            },
            {
                text: "Y así, mientras el príncipe y su novia buscaban a la hermosa desconocida entre la espuma del mar, la sirenita, invisible, les dio un beso en la frente y se elevó hacia las nubes rosadas, dispuesta a comenzar su largo camino de trescientos años hacia las estrellas, donde finalmente obtendría su anhelada alma inmortal."
            }
        ]
    },
    {
        id: 'soldadito-plomo',
        title: 'El Soldadito de Plomo',
        author: 'Hans Christian Andersen',
        description: 'La heroica y melancólica historia de un soldadito de una sola pierna que enfrenta tormentas, alcantarillas y abismos por el amor de una bailarina de papel.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/soldadito-cover.png',
        chipImage: '/images/storyteller/character-soldadito.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-blue-700 to-slate-800',
        content: [
            {
                text: "En el umbral de una habitación infantil, un universo en miniatura se desplegaba sobre una mesa de madera de pino. Allí destacaban veinticinco soldaditos de plomo, relucientes y orgullosos. Habían nacido todos de la misma cuchara de metal fundido, y cada uno vestía un uniforme impecable: casaca roja, pantalón azul y un fusil plateado. Todos eran idénticos, salvo uno, que por un capricho del destino había sido fundido con una sola pierna. Sin embargo, su espíritu no flaqueaba; se erguía con la misma determinación que sus hermanos."
            },
            {
                text: "En el centro de este pequeño cosmos de juguetes, se alzaba un castillo de papel, tan alto y detallado que invitaba a la fantasía. Sus ventanas eran de mica brillante y un espejo ovalado simulaba un lago sereno. Pero lo que capturó la atención del soldadito fue una bailarina de papel, grácil y etérea. Llevaba un tutú rosa y una pequeña lentejuela de plata en su cabello. Para el soldadito, que también se apoyaba sobre una sola pierna, ella era el reflejo de su propia singularidad. '¡Esa sería una esposa para mí!', pensó con emoción."
            },
            {
                text: "La noche cayó y los niños se durmieron. El mundo de los juguetes cobró vida. Las risas y los susurros resonaban en la mesa, pero de una vieja caja de tabaco emergió una figura oscura: un duende de madera con ojos diminutos. Se dirigió al soldadito con voz celosa: '¡Deja de mirar a la bailarina, soldadito! ¡No es para ti!'. El soldadito, firme en su puesto, lo ignoró, manteniendo su mirada fija en la figura de papel que seguía bailando bajo la luz de la luna."
            },
            {
                text: "Al día siguiente, la ventana de la habitación se abrió de golpe. Una ráfaga de viento fría y repentina barrió la mesa de juguetes. El soldadito de plomo no pudo oponer resistencia. Cayó, dando volteretas, desde el tercer piso de la casa. Fue una caída larga y vertiginosa que terminó en el empedrado de la calle. Quedó aterrizando de cabeza, con su única pierna apuntando al cielo, clavado entre dos adoquines fríos."
            },
            {
                text: "Comenzó a llover con fuerza. Las gotas se estrellaban contra su casco de hojalata. Dos niños traviesos que jugaban bajo la lluvia lo descubrieron. '¡Mira, un soldadito!', exclamaron. Sin pensarlo mucho, tomaron un viejo periódico y doblaron hábilmente un pequeño barco. Colocaron al soldadito en su interior y lo lanzaon a la corriente impetuosa que corría por la alcantarilla. El viaje del soldadito hacia lo desconocido acababa de comenzar."
            },
            {
                text: "El barco de papel se precipitó por el oscuro canal. El agua rugía alrededor del soldadito, susurrando amenazas en la penumbra. De repente, un par de ojos rojos aparecieron: una rata de alcantarilla, grande y feroz, nadó hasta el barco. '¡Alto! ¿Tienes un peaje para cruzar mis dominios?'. El soldadito, con su fusil al hombro y la mirada estoica, se mantuvo firme sin pronunciar palabra. La rata, frustrada por su silencio, lo dejó pasar mientras el barco seguía su incierto camino."
            },
            {
                text: "La corriente lo arrastró hasta una salida a un canal más grande. El papel del barco, ya débil por el agua, terminó por desintegrarse. El soldadito se hundió en las profundidades, sumergiéndose en un abismo oscuro. Cayó y cayó, hasta que una sombra gigantesca lo envolvió. En un instante, fue engullido por un enorme pez que nadaba por las aguas turbias. La oscuridad se hizo absoluta, pero el soldadito siguió impasible, su mente fija en la imagen de su amada bailarina."
            },
            {
                text: "Pero el destino aún no había terminado con él. El pez fue capturado por un pescador y llevado al mercado, donde fue comprado por la misma cocinera de la casa donde el soldadito había nacido. En la cocina, mientras abría el pescado para prepararlo, la cocinera encontró al pequeño soldado. Con sorpresa, lo sacó y lo llevó de vuelta a la habitación con una exclamación. ¡El milagro había ocurrido: el soldadito estaba de regreso en su hogar!"
            },
            {
                text: "¡Allí estaba todo de nuevo! La mesa de los juguetes, el castillo de papel y, lo más asombroso, su amada bailarina, que seguía posada sobre su única pierna con la misma gracia inmaculada. El soldadito sintió una alegría tan intensa que su corazón de plomo casi se derrite al verla. Las adversidades se habían disipado y volvía a estar cerca de su único amor, aunque el duende de la caja seguía observando desde las sombras."
            },
            {
                text: "Sin embargo, la felicidad fue efímera. Uno de los niños tomó al soldadito y, sin motivo alguno, lo arrojó directamente a la chimenea encendida. El calor era sofocante y el plomo comenzó a deformarse. En ese instante, una ráfaga de viento abrió la ventana y la bailarina de papel voló grácilmente hacia las llamas, cayendo junto a su soldadito. El fuego los devoró a los dos, uniendo sus destinos en un final incandescente de luz y calor."
            },
            {
                text: "A la mañana siguiente, al limpiar las cenizas de la chimenea, la sirvienta encontró algo extraordinario: un pequeño corazón de plomo perfectamente fundido. En su interior, brillaba la minúscula lentejuela de plata que había adornado el cabello de la bailarina, ennegrecida pero aún reconoceribe. Los dos amantes habían desaparecido, pero en ese pequeño corazón de plomo, su historia de valentía perduraría para siempre."
            }
        ]
    },
    {
        id: 'la-bella-y-la-bestia',
        title: 'La Bella y la Bestia',
        author: 'Tradicional',
        description: 'Un cuento eterno sobre la redención a través del amor, donde la verdadera belleza se encuentra en el interior del corazón.',
        level: 'Difícil',
        age: '7+',
        coverImage: '/images/storyteller/la-bella-y-la-bestia-cover.png',
        chipImage: '/images/storyteller/character-la-bella-y-la-bestia.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-rose-900 to-amber-900',
        content: [
            {
                text: "En una época en que los mercaderes medían su fortuna por el número de barcos que cruzaban los océanos, vivía un hombre inmensamente rico que tenía tres hijas. Las dos mayores eran vanidosas y egoístas, amantes de los bailes y las sedas finas. La menor, sin embargo, era tan bondadosa y hermosa que todos la llamaban simplemente Bella. Su belleza no residía solo en la armonía de sus rasgos, sino en la paz que transmitía al leer bajo los sauces o al cuidar el jardín de su padre."
            },
            {
                text: "La fortuna es, empero, tan voluble como el viento. Una serie de naufragios dejó al mercader en la ruina, obligando a la familia a retirarse a una pequeña y humilde cabaña en el campo. Mientras las hermanas mayores se lamentaban y despreciaban las tareas del hogar, Bella se levantaba antes del alba para limpiar, cocinar y mantener la esperanza de su padre. Un día, llegó la noticia de que uno de los barcos perdidos había llegado a puerto. Antes de partir, el padre preguntó a sus hijas qué deseaban que les trajera. Las mayores pidieron joyas y vestidos de brocado; Bella, tras mucho insistir el padre, solo pidió una rosa, pues en aquella tierra árida no crecía ninguna."
            },
            {
                text: "El viaje fue un fracaso: el barco había sido embargado y el padre regresaba más pobre que antes. Al cruzar un bosque bajo una tormenta de nieve, se perdió en un sendero desconocido que lo condujo a un palacio de una opulencia irreal. Las puertas se abrieron solas; mesas repletas de comida humeante lo esperaban, pero no había ni un alma a la vista. Tras pasar la noche, al salir por el jardín, vio un rosal de flores rojas como la sangre. Recordando el deseo de Bella, cortó una. En ese instante, un rugido espantoso hizo temblar la tierra y una criatura de aspecto aterrador, con colmillos de jabalí y pelaje espeso, apareció ante él."
            },
            {
                text: "—\"¡Inagradecido!\", tronó la Bestia. \"Te he dado comida y techo, ¿y me pagas robando mis flores? Morirás por esto, a menos que una de tus hijas acepte morir en tu lugar\". El padre regresó a casa desolado. Bella, al conocer la historia, no permitió que su padre sufriera por su culpa. \"Yo iré\", dijo con una firmeza que no admitía réplica. Al llegar al palacio, la Bestia no la devoró. Por el contrario, la instaló en la habitación más lujosa y le dio libertad total, con una sola condición: cenar con él cada noche."
            },
            {
                text: "Al principio, Bella sentía un terror paralizante cada vez que veía aquella figura deforme. Pero con el paso de los meses, las cenas se convirtieron en largas conversaciones. Descubrió que tras esa apariencia monstruosa se escondía un alma culta, sensible y profundamente solitaria. La Bestia le regaló una biblioteca inmensa y un espejo mágico que le permitía ver a su familia. A pesar de la fealdad externa, Bella empezó a apreciar la nobleza del corazón de su anfitrión. Sin embargo, cada noche, la Bestia le hacía la misma pregunta con voz trémula: —\"Bella, ¿te casarías conmigo?\". Y ella, con honestidad pero con tristeza, siempre respondía: \"No, Bestia\"."
            },
            {
                text: "Un día, el espejo le mostró que su padre estaba gravemente enfermo. Bella suplicó que le permitiera visitarlo. La Bestia, cuyo amor por ella era ya superior a su propio deseo de compañía, aceptó: \"Ve, pero si no regresas en ocho días, moriré de dolor\". Le entregó un anillo que, al girarlo, la transportaría de regreso."
            },
            {
                text: "Bella cuidó a su padre hasta que recuperó la salud, pero sus hermanas, celosas de su vida en el palacio, la engañaron para que se quedara más tiempo, esperando que la Bestia se enfureciera y la castigara. Al décimo día, Bella soñó que la Bestia yacía moribunda en el jardín de rosas. Despertó con un grito de angustia y, girando el anillo, regresó al palacio."
            },
            {
                text: "Encontró a la criatura tendida sobre la hierba, con la respiración entrecortada y los ojos cerrados. Bella se arrojó sobre él, llorando amargamente. \"¡No mueras, por favor! He sido una ingrata. No importa tu aspecto, te amo y quiero ser tu esposa\"."
            },
            {
                text: "Apenas pronunció estas palabras, un estallido de luz envolvió el lugar. La Bestia desapareció y, en su lugar, se hallaba un príncipe más apuesto que cualquier sueño. El hechizo de una malvada hada, que lo había transformado por ser soberbio y cruel, se había roto gracias a que una mujer había sido capaz de amar su interior. El palacio se llenó de luz y música, y Bella, que había encontrado la belleza donde nadie más sabía mirar, gobernó junto al príncipe en un reino donde se enseñaba que solo el corazón tiene el poder de ver la verdad."
            }
        ]
    },
    {
        id: 'rapunzel',
        title: 'Rapunzel',
        author: 'Hermanos Grimm',
        description: 'La historia de la joven de largos cabellos dorados encerrada en una torre, y cómo el amor vence incluso a la más poderosa hechicería.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/rapunzel-cover.png',
        chipImage: '/images/storyteller/character-rapunzel.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-purple-800 to-indigo-900',
        content: [
            {
                text: "Hace mucho tiempo, en una pequeña casa adosada a un jardín mágico, vivían un hombre y una mujer. El jardín, cercado por un muro altísimo, pertenecía a una hechicera temida en toda la comarca, a quien nadie se atrevía a desafiar. Un día, la mujer sintió un antojo irrefrenable, un deseo incontrolable por las rapunces, una especie de lechuga silvestre que crecía en aquel jardín encantado. Su anhelo era tan fuerte que languidecía, amenazando con morir si no las probaba. Su marido, desesperado por salvarla, decidió una noche escalar el muro y robar algunas rapunces."
            },
            {
                text: "Al día siguiente, el antojo de la mujer volvió, más fuerte que nunca. El hombre, con el corazón encogido de miedo, regresó al jardín. Pero esta vez, al descender, se encontró cara a cara con la hechicera. Sus ojos lanzaban chispas de ira. —\"¡Cómo te atreves a entrar en mi jardín como un ladrón!\", bramó la hechicera, con una voz que helaba la sangre. \"¡Pagarás caro tu insolencia!\". El hombre suplicó clemencia, explicando la desesperación de su esposa. La hechicera, con una sonrisa malévola, aceptó dejarlo ir a cambio de una promesa terrible: el hijo que su esposa esperaba le sería entregado al nacer. El hombre, aterrado, aceptó."
            },
            {
                text: "Cuando la niña nació, era la criatura más hermosa que se había visto. La hechicera apareció de inmediato, la tomó en brazos y la llamó Rapunzel, en honor a las lechugas que habían provocado su destino. Se la llevó a lo más profundo del bosque y la encerró en una torre altísima, sin puertas ni escaleras, con una sola ventana diminuta en la cima. Allí, Rapunzel creció aislada del mundo, con la hechicera como única compañía."
            },
            {
                text: "Rapunzel tenía una voz melodiosa y el cabello más largo y hermoso que jamás se haya visto: una cascada dorada que caía hasta el suelo. Cuando la hechicera quería subir a la torre, se paraba al pie y gritaba: —\"¡Rapunzel, Rapunzel, suelta tu cabello!\". Y Rapunzel, con un suspiro, desenrollaba sus trenzas doradas y las dejaba caer por la ventana, formando una escalera que la hechicera escalaba con facilidad."
            },
            {
                text: "Pasaron los años. Un día, un joven príncipe, que cabalgaba por el bosque, escuchó una voz tan hermosa que detuvo su caballo. Era Rapunzel, que cantaba para pasar sus largas horas de soledad. Fascinado, el príncipe buscó el origen de la voz y encontró la torre sin puertas. Intrigado, se escondió entre los arbustos y observó a la hechicera llamar a Rapunzel y subir por su cabello."
            },
            {
                text: "Al día siguiente, el príncipe regresó y, imitando la voz de la hechicera, gritó: —\"¡Rapunzel, Rapunzel, suelta tu cabello!\". Las trenzas doradas cayeron, y el príncipe escaló hasta la cima. Al principio, Rapunzel se asustó terriblemente al ver a un hombre, pues nunca había visto a ninguno. Pero el príncipe, con palabras amables y una voz suave, le habló de su admiración por su canto y su belleza. Poco a poco, Rapunzel se sintió cómoda en su compañía. Se enamoraron."
            },
            {
                text: "El príncipe la visitaba cada tarde, escalando por su cabello. Juntos, idearon un plan de escape: él le traería un ovillo de seda cada vez que fuera, y ella tejería una escalera con él. Cuando la escalera estuviera lista, ella descendería y escaparían juntos."
            },
            {
                text: "Un día, sin embargo, Rapunzel cometió un error. Le preguntó a la hechicera con ingenuidad: \"Dime, madrina, ¿por qué mi príncipe sube tan rápido por tu pelo mientras que a ti te cuesta tanto?\". La hechicera, con una mirada de furia, comprendió la traición. Con un par de tijeras, cortó la larga cabellera dorada de Rapunzel, dejándola con el cabello corto. Luego, con un hechizo, la desterró a un desierto lejano, donde viviría en la miseria."
            },
            {
                text: "Esa misma noche, la hechicera ató las trenzas cortadas a la ventana. Cuando el príncipe llegó y gritó, el cabello cayó, pero al subir, no encontró a su amada Rapunzel, sino el rostro furioso de la hechicera. —\"¡Jamás volverás a verla!\", gritó la hechicera con una risa cruel. \"¡El pájaro se ha ido, el nido está vacío!\". Desesperado, el príncipe se arrojó desde la torre. Sobrevivió a la caída, pero cayó sobre un lecho de espinas que le arrancaron los ojos. Ciego y desolado, vagó por el bosque durante años, alimentándose de raíces y bayas, llamando a Rapunzel en su sufrimiento."
            },
            {
                text: "Un día, el príncipe ciego llegó a un desierto árido y desolado. Escuchó un canto familiar, una voz que reconocería entre mil. Era Rapunzel, que vivía allí con dos pequeños gemelos, fruto de su amor. Ella lo reconoció de inmediato y se arrojó a sus brazos, llorando de alegría. Dos de sus lágrimas cayeron sobre los ojos ciegos del príncipe. Milagrosamente, en ese instante, su vista regresó."
            },
            {
                text: "Juntos, el príncipe, Rapunzel y sus hijos regresaron al reino del príncipe, donde fueron recibidos con gran alegría. Vivieron felices para siempre, y el amor y la perseverancia de Rapunzel se convirtieron en leyenda, demostrando que incluso en la más oscura de las prisiones, la esperanza puede tejer un camino hacia la libertad."
            }
        ]
    }
];
