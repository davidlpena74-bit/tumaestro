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
    contentEn?: BookPage[];
    contentFr?: BookPage[];
    contentDe?: BookPage[];
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
        ],
        contentEn: [
            {
                text: "In a village surrounded by a forest so thick that the sunlight barely touched the ground, lived a girl whose kindness was known to all the inhabitants of the region. Her most prized possession was a velvet cloak of a red as intense as poppies in summer, a gift from her grandmother that the little girl wore with pride in every season. For this reason, the name by which she was known in the valleys and paths was none other than Little Red Riding Hood."
            },
            {
                text: "One morning, while the dew still glistened on the spider webs in the bushes, her mother finished preparing a wicker basket. The aroma of freshly baked bread and fresh honey filled the small kitchen. With a worried expression, the mother called the girl and, while adjusting the bow of her cloak, gave her precise instructions. Her grandmother, who lived in a small cabin on the other side of the forest, was bedridden with a high fever, and those provisions were vital for her recovery. 'Do not stray from the main path,' she warned firmly, 'for the forest has eyes and the shadows can be deceptive.'"
            },
            {
                text: "Little Red Riding Hood, with the basket hanging from her arm and a heart full of good intentions, entered the thicket. The path was flanked by centuries-old pines whose tops seemed to whisper secrets to the wind. As she advanced, the silence of the forest became denser, interrupted only by the cracking of branches under her feet. It was then that, from among the trunks of the oaks, an imposing figure emerged. It was a wolf of extraordinary dimensions, with grayish fur speckled with black and eyes that flashed with a mixture of hunger and cunning."
            },
            {
                text: "The animal did not attack her immediately; instead, he approached with a hypnotic, almost chivalrous elegance. 'Where is such a charming young lady going so early?', asked the wolf, softening his hoarse voice so as not to frighten her. Little Red Riding Hood, whose innocence did not allow her to see the evil behind the fangs, omitted her mother's advice and explained that she was going to her grandmother's house, under the three large oaks. The wolf suggested: 'Don't you hear the birds singing? A bouquet of those flowers would heal your grandmother's soul even before the bread you carry.'"
            },
            {
                text: "Seduced by the idea, the girl strayed from the path. Meanwhile, the wolf ran towards the old woman's cabin. Upon arrival, he knocked on the door with three sharp blows. 'It's me, your granddaughter Little Red Riding Hood,' he lied, making his voice higher. The old woman told him how to open it and, in an instant, the wolf burst in and devoured the woman. Immediately afterwards, he put on her nightgown, put on her cap and got into bed, covering himself up to his nose to hide his snout."
            },
            {
                text: "When Little Red Riding Hood finally arrived at the cabin, loaded with flowers, she found the door wide open. A strange foreboding oppressed her chest, but she entered calling her grandmother. The light filtering through the curtains barely illuminated the face of the figure lying in the bed. As she approached, she noticed that something did not fit; her grandmother's features seemed to have mutated under the fever."
            },
            {
                text: "—'Oh, grandma, what big ears you have!', exclaimed the girl with a trembling whisper. —'All the better to hear you with, my child', replied the wolf. —'Grandma, what big eyes you have!'. —'All the better to see you with in the gloom'. —'And what big hands you have!'. —'All the better to hug you with stronger'. —'But grandma... what a terribly big mouth you have!'. —'All the better to eat you with!'"
            },
            {
                text: "The wolf leaped from the bed with savage ferocity and, before Little Red Riding Hood could scream, he swallowed her whole. Satiated and exhausted by his own feast, the animal returned to bed and fell into a deep sleep, snoring so loudly that the walls of the cabin seemed to shake."
            },
            {
                text: "Shortly after, a hunter patrolling the area heard those unnatural noises. He entered the house and found the wolf sleeping peacefully with a swollen belly. Understanding the situation, he took a pair of sewing scissors and, carefully, opened the beast's belly. From the darkness of the stomach emerged first the red cloak and then Little Red Riding Hood, followed by the grandmother, both unharmed but terrified by the suffocating experience."
            },
            {
                text: "The girl collected large stones from the river, with which they filled the wolf's body. When the animal woke up and tried to flee, its weight was such that it fell to the ground lifeless. The cabin recovered its peace, and while the grandmother ate the cake, Little Red Riding Hood promised that she would never again leave the safe path, for she had understood that the beauty of the flowers did not compensate for the danger lurking in the shadows of the unknown."
            }
        ],
        contentFr: [
            {
                text: "Dans un village entouré d'une forêt si épaisse que la lumière du soleil touchait à peine le sol, vivait une fille dont la bonté était connue de tous les habitants de la région. Son bien le plus précieux était une cape en velours d'un rouge aussi intense que les coquelicots en été, un cadeau de sa grand-mère que la petite fille portait avec fierté en toute saison. C'est pourquoi le nom sous lequel elle était connue dans les vallées et les sentiers n'était autre que le Petit Chaperon Rouge."
            },
            {
                text: "Un matin, alors que la rosée brillait encore sur les toiles d'araignée dans les buissons, sa mère termina de préparer un panier en osier. L'arôme du pain fraîchement cuit et du miel frais remplissait la petite cuisine. L'air inquiet, la mère appela la fille et, tout en ajustant le nœud de sa cape, lui donna des instructions précises. Sa grand-mère, qui vivait dans une petite cabane de l'autre côté de la forêt, était alitée avec une forte fièvre, et ces provisions étaient vitales pour son rétablissement. « Ne t'éloigne pas du chemin principal », avertit-elle fermement, « car la forêt a des yeux et les ombres peuvent être trompeuses »."
            },
            {
                text: "Le Petit Chaperon Rouge, le panier au bras et le cœur plein de bonnes intentions, s'enfonça dans le fourré. Le chemin était flanqué de pins centenaires dont les cimes semblaient chuchoter des secrets au vent. À mesure qu'elle avançait, le silence de la forêt devenait plus dense, interrompu seulement par le craquement des branches sous ses pieds. C'est alors que, d'entre les troncs des chênes, surgit une silhouette imposante. C'était un loup aux dimensions extraordinaires, au pelage grisâtre tacheté de noir et aux yeux qui brillaient d'un mélange de faim et de ruse."
            },
            {
                text: "L'animal ne l'attaqua pas immédiatement ; au lieu de cela, il s'approcha avec une élégance hypnotique, presque chevaleresque. « Où va une si charmante demoiselle si tôt ? », demanda le loup, adoucissant sa voix rauque pour ne pas l'effrayer. Le Petit Chaperon Rouge, dont l'innocence ne lui permettait pas de voir le mal derrière les crocs, omit le conseil de sa mère et expliqua qu'elle se rendait chez sa grand-mère, sous les trois grands chênes. Le loup suggéra : « N'entends-tu pas les oiseaux chanter ? Un bouquet de ces fleurs guérirait l'âme de ta grand-mère avant même le pain que tu apportes »."
            },
            {
                text: "Séduite par l'idée, la jeune fille s'écarta du chemin. Pendant ce temps, le loup courut vers la cabane de la vieille femme. En arrivant, il frappa à la porte trois coups secs. « C'est moi, ta petite-fille Chaperon Rouge », mentit-il en élevant la voix. La vieille femme lui indiqua comment ouvrir et, en un instant, le loup fit irruption et dévora la femme. Juste après, il enfila sa chemise de nuit, mit son bonnet et se glissa dans le lit, se couvrant jusqu'au nez pour cacher son museau."
            },
            {
                text: "Lorsque le Petit Chaperon Rouge arriva enfin à la cabane, chargée de fleurs, elle trouva la porte grande ouverte. Un étrange pressentiment lui oppressa la poitrine, mais elle entra en appelant sa grand-mère. La lumière qui filtrait à travers les rideaux éclairait à peine le visage de la silhouette allongée dans le lit. En s'approchant, elle remarqua que quelque chose ne collait pas ; les traits de sa grand-mère semblaient avoir changé sous l'effet de la fièvre."
            },
            {
                text: "— « Oh, grand-mère, comme tu as de grandes oreilles ! », s'exclama la fille dans un murmure tremblant. — « C'est pour mieux t'entendre, mon enfant », répondit le loup. — « Grand-mère, comme tu as de grands yeux ! ». — « C'est pour mieux te voir dans la pénombre ». — « Et comme tu as de grandes mains ! ». — « C'est pour mieux t'embrasser ». — « Mais grand-mère... quelle bouche terriblement grande tu as ! ». — « C'est pour mieux te manger ! »."
            },
            {
                text: "Le loup bondit du lit avec une férocité sauvage et, avant que le Petit Chaperon Rouge ne puisse crier, il l'avala tout entière. Rassasié et épuisé par son propre festin, l'animal retourna au lit et tomba dans un sommeil profond, ronflant si fort que les murs de la cabane semblaient trembler."
            },
            {
                text: "Peu après, un chasseur qui patrouillait dans la zone entendit ces bruits anormaux. Il entra dans la maison et trouva le loup dormant paisiblement avec un ventre gonflé. Comprenant la situation, il prit une paire de ciseaux de couture et ouvrit avec précaution le ventre de la bête. De l'obscurité de l'estomac surgirent d'abord la cape rouge puis le Petit Chaperon Rouge, suivie de la grand-mère, toutes deux indemnes mais terrifiées par l'expérience étouffante."
            },
            {
                text: "La petite fille ramassa de grosses pierres de la rivière, avec lesquelles ils remplirent le corps du loup. Lorsque l'animal se réveilla et essaya de fuir, son poids était tel qu'il tomba au sol sans vie. La cabane retrouva sa paix, et tandis que la grand-mère mangeait le gâteau, le Petit Chaperon Rouge promit qu'elle ne quitterait plus jamais le sentier sûr, car elle avait compris que la beauté des fleurs ne compensait pas le danger qui guette dans les ombres de l'inconnu."
            }
        ],
        contentDe: [
            {
                text: "In einem Dorf, umgeben von einem Wald, so dicht, dass das Sonnenlicht den Boden kaum berührte, lebte ein Mädchen, dessen Güte allen Bewohnern der Gegend bekannt war. Ihr kostbarster Besitz war ein Umhang aus Samt, so rot wie Mohnblumen im Sommer, ein Geschenk ihrer Großmutter, das das kleine Mädchen stolz zu jeder Jahreszeit trug. Aus diesem Grund war der Name, unter dem sie in den Tälern und auf den Pfaden bekannt war, kein anderer als Rotkäppchen."
            },
            {
                text: "Eines Morgens, als der Tau noch auf den Spinnweben in den Büschen glitzerte, beendete ihre Mutter das Packen eines Weidenkorbes. Der Duft von frisch gebackenem Brot und frischem Honig erfüllte die kleine Küche. Mit besorgtem Gesichtsausdruck rief die Mutter das Mädchen und gab ihm, während sie die Schleife seines Umhangs zurechtrückte, genaue Anweisungen. Ihre Großmutter, die in einer kleinen Hütte auf der anderen Seite des Waldes lebte, lag mit hohem Fieber im Bett, und diese Vorräte waren für ihre Genesung lebenswichtig. „Weiche nicht vom Hauptpfad ab“, warnte sie streng, „denn der Wald hat Augen und die Schatten können trügerisch sein.“"
            },
            {
                text: "Rotkäppchen, mit dem Korb am Arm und einem Herzen voller guter Absichten, betrat das Dickicht. Der Weg war flankiert von jahrhundertealten Kiefern, deren Wipfel dem Wind Geheimnisse zuzuflüstern schienen. Je weiter sie ging, desto dichter wurde die Stille des Waldes, nur unterbrochen vom Knacken der Zweige unter ihren Füßen. Da tauchte zwischen den Stämmen der Eichen eine imposante Gestalt auf. Es war ein Wolf von außergewöhnlichen Ausmaßen, mit gräulichem, schwarz gesprenkeltem Fell und Augen, die in einer Mischung aus Hunger und List blitzten."
            },
            {
                text: "Das Tier griff sie nicht sofort an; stattdessen näherte es sich mit hypnotischer, fast ritterlicher Eleganz. „Wohin geht ein so bezauberndes junges Fräulein so früh?“, fragte der Wolf und milderte seine raue Stimme, um sie nicht zu erschrecken. Rotkäppchen, dessen Unschuld es ihm nicht erlaubte, das Böse hinter den Reißzähnen zu sehen, vergaß den Rat ihrer Mutter und erklärte, dass sie zum Haus ihrer Großmutter unter den drei großen Eichen unterwegs sei. Der Wolf schlug vor: „Hörst du nicht die Vögel singen? Ein Strauß dieser Blumen würde die Seele deiner Großmutter noch vor dem Brot, das du bringst, heilen.“"
            },
            {
                text: "Verführt von der Idee, wich das Mädchen vom Weg ab. Währenddessen rannte der Wolf zur Hütte der alten Frau. Als er ankam, klopfte er mit drei kurzen Schlägen an die Tür. „Ich bin es, deine Enkelin Rotkäppchen“, log er und verstellte seine Stimme. Die alte Frau erklärte ihm, wie man öffnet, und im Nu stürmte der Wolf herein und verschlang die Frau. Sofort danach zog er ihr Nachthemd an, setzte ihre Haube auf und legte sich ins Bett, wobei er sich bis zur Nase zudeckte, um seine Schnauze zu verbergen."
            },
            {
                text: "Als Rotkäppchen endlich an der Hütte ankam, beladen mit Blumen, fand sie die Tür weit offen. Eine seltsame Vorahnung bedrückte ihre Brust, aber sie trat ein und rief nach ihrer Großmutter. Das Licht, das durch die Vorhänge fiel, beleuchtete kaum das Gesicht der Gestalt, die im Bett lag. Als sie näher kam, bemerkte sie, dass etwas nicht stimmte; die Züge ihrer Großmutter schienen sich im Fieber verändert zu haben."
            },
            {
                text: "– „Oh, Großmutter, was hast du für große Ohren!“, rief das Mädchen mit zitterndem Flüstern. – „Damit ich dich besser hören kann, mein Kind“, antwortete der Wolf. – „Großmutter, was hast du für große Augen!“. – „Damit ich dich im Halbdunkel besser sehen kann“. – „Und was hast du für große Hände!“. – „Damit ich dich fester umarmen kann“. – „Aber Großmutter... was hast du für einen schrecklich großen Mund!“. – „Damit ich dich besser fressen kann!“"
            },
            {
                text: "Der Wolf sprang mit wilder Grausamkeit aus dem Bett und verschlang Rotkäppchen ganz, bevor es schreien konnte. Gesättigt und erschöpft von seinem eigenen Festmahl, kehrte das Tier ins Bett zurück und fiel in einen tiefen Schlaf, wobei es so laut schnarchte, dass die Wände der Hütte zu beben schienen."
            },
            {
                text: "Kurz darauf hörte ein Jäger, der in der Gegend patrouillierte, diese unnatürlichen Geräusche. Er betrat das Haus und fand den Wolf friedlich mit geschwollenem Bauch schlafend vor. Er begriff die Situation, nahm eine Nähschere und öffnete vorsichtig den Bauch der Bestie. Aus der Dunkelheit des Magens kamen zuerst der rote Umhang und dann Rotkäppchen zum Vorschein, gefolgt von der Großmutter, beide unverletzt, aber verängstigt durch die erstickende Erfahrung."
            },
            {
                text: "Das Mädchen sammelte große Steine aus dem Fluss, mit denen sie den Körper des Wolfes füllten. Als das Tier aufwachte und zu fliehen versuchte, war sein Gewicht so groß, dass es leblos zu Boden fiel. In der Hütte kehrte Frieden ein, und während die Großmutter den Kuchen aß, versprach Rotkäppchen, dass sie nie wieder den sicheren Pfad verlassen würde, denn sie hatte begriffen, dass die Schönheit der Blumen nicht die Gefahr aufwiegt, die in den Schatten des Unbekannten lauert."
            }
        ],
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
    },
    {
        id: 'jack-y-las-habichuelas',
        title: 'Jack y las Habichuelas Mágicas',
        author: 'Tradicional',
        description: 'La aventura de un niño que, impulsado por unas semillas mágicas, escala hasta el cielo para cambiar su destino.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/jack-y-las-habichuelas-cover.png',
        chipImage: '/images/storyteller/character-jack.png',
        genre: 'Fábula',
        themeColor: 'from-green-700 to-emerald-900',
        content: [
            {
                text: "Esta es la historia de Jack y las Habichuelas Mágicas, una crónica sobre la ambición, el coraje y cómo un acto de aparente locura puede cambiar el destino de una familia sumida en la miseria. En los márgenes de una aldea donde la tierra era tan pobre que apenas daba para alimentar a los gorriones, vivía una viuda con su único hijo, Jack. Eran tan humildes que su posesión más valiosa no era oro ni tierras, sino una vaca vieja y escuálida llamada Blanca Lechera. Pero llegó un invierno tan crudo que la vaca dejó de dar leche, y el hambre empezó a roer las paredes del estómago de Jack y su madre. Con lágrimas en los ojos, la mujer le pidió a su hijo que llevara al animal al mercado para venderlo: \"Hijo, asegúrate de traer una buena bolsa de monedas, o no sobreviviremos al mes\"."
            },
            {
                text: "Jack se puso en camino, tirando de la soga de la vaca. No había avanzado mucho cuando se cruzó con un hombre de aspecto extraño, que vestía una capa hecha de retazos de colores y cuyos ojos brillaban con una luz inusual. El hombre se detuvo y, tras observar a la vaca, le hizo una oferta inaudita: —\"Muchacho, te daré estas cinco habichuelas por tu vaca. Pero no son semillas comunes; son habichuelas mágicas. Si las siembras esta noche, para mañana habrán llegado al cielo\". Jack, llevado por un impulso juvenil y la fascinación por lo sobrenatural, aceptó el trato. Al regresar a casa, su madre, al ver que traía semillas en lugar de oro, estalló en furia y llanto. Lanzó las habichuelas por la ventana hacia el jardín y mandó a Jack a la cama sin cenar."
            },
            {
                text: "A la mañana siguiente, la habitación de Jack estaba sumida en una penumbra verdosa. Al asomarse, se quedó sin aliento: donde antes había tierra seca, ahora se alzaba una planta colosal, un tallo de habichuela tan grueso como un tronco de encina que se retorcía hacia arriba, atravesando las nubes hasta perderse de vista. Sin dudarlo, Jack comenzó a trepar. Escaló durante horas, sintiendo cómo el aire se volvía más puro y el mundo de abajo se transformaba en un juguete diminuto."
            },
            {
                text: "Al llegar a la cima, se encontró en un país extraño, un desierto de nubes sólidas que conducía a un castillo de dimensiones ciclópeas. Jack, movido por el hambre, llamó a la puerta. Le abrió una mujer gigante que, al verlo tan pequeño, se apiadó de él y lo dejó entrar para darle un poco de pan y leche. \"Pero escóndete rápido\", le advirtió, \"que mi marido, el Ogro, está a punto de llegar, y nada le gusta más que el aroma de un niño asado\"."
            },
            {
                text: "De pronto, la tierra tembló bajo pasos que sonaban como truenos. El Ogro entró olfateando el aire con su nariz ganchuda. —\"¡Fi-fai-fo-fum! Huelo la sangre de un hombre común. Esté vivo o esté muerto, moleré sus huesos para hacer mi pan\". La mujer lo distrajo con un enorme jabalí asado. Después de comer, el Ogro sacó una bolsa de monedas de oro y se puso a contarlas hasta que el sueño lo venció. Jack, saliendo de su escondite, tomó la bolsa de oro, bajó a toda prisa por la planta y entregó la fortuna a su madre."
            },
            {
                text: "Durante un tiempo vivieron con holgura, pero la curiosidad y la audacia volvieron a llamar a la puerta de Jack. Trepó por segunda vez. En esta ocasión, vio al Ogro sacar una gallina mágica que, al ordenarle \"¡Pon!\", ponía un huevo de oro puro. Jack esperó a que el gigante roncara, robó la gallina y regresó a la tierra. Ahora eran ricos, pero el espíritu de aventura de Jack no descansaba."
            },
            {
                text: "Subió una tercera vez. En el castillo, vio el tesoro más asombroso del gigante: un arpa de oro que tocaba música celestial por sí sola. Cuando el Ogro se durmió, Jack la tomó, pero el arpa era mágica y tenía voz propia. \"¡Amo, amo, que me roban!\", gritó el instrumento. El Ogro despertó con un rugido de furia y persiguió a Jack hacia el tallo."
            },
            {
                text: "Jack descendía con la agilidad de un gato, mientras el gigante hacía crujir la planta con su peso monstruoso. Al tocar suelo, Jack gritó: \"¡Madre, el hacha, rápido!\". Con un golpe certero, cortó el tallo de la habichuela. El gigante cayó desde las alturas, abriendo un enorme foso en la tierra donde desapareció para siempre. Jack y su madre, ahora dueños de la gallina de los huevos de oro y del arpa maravillosa, vivieron en paz y abundancia, comprendiendo que, a veces, hay que trepar por encima de las nubes para encontrar lo que realmente necesitamos."
            }
        ]
    },
    {
        id: 'flautista-hamelin',
        title: 'El Flautista de Hamelín',
        author: 'Hermanos Grimm',
        description: 'La leyenda de una promesa rota y una melodía encantada que enseñó a una ciudad entera el valor de la honestidad.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/flautista-hamelin-cover.png',
        chipImage: '/images/storyteller/character-flautista.png',
        genre: 'Leyenda',
        themeColor: 'from-yellow-700 to-amber-900',
        content: [
            {
                text: "Esta es la historia de El Flautista de Hamelín, un relato que camina por la delgada línea entre la gratitud y la venganza, ambientado en una ciudad que aprendió por las malas el valor de una promesa cumplida. Hamelín era una ciudad próspera, de casas de madera tallada y mercados bulliciosos a orillas del río Weser."
            },
            {
                text: "Sin embargo, un verano especialmente caluroso trajo consigo una plaga que ningún gato ni veneno podía detener. Las ratas, miles de ellas, surgieron de las alcantarillas y los sótanos. Eran ratas audaces que robaban la comida de los platos de los niños, se escondían en los zapatos de los caballeros y hacían nidos en los sombreros de las damas. La ciudad vivía en un estado de histeria; el chillido de los roedores era el único sonido que se escuchaba por las noches."
            },
            {
                text: "El alcalde y los concejales, hombres gordos y pomposos, se reunieron en el ayuntamiento, pero sus mentes estaban tan vacías como sus soluciones. Fue entonces cuando apareció un extraño. Era un hombre alto y delgado, vestido con una chaqueta de tela de colores vivos y un sombrero con una pluma de faisán. Alrededor de su cuello colgaba una flauta de madera oscura y pulida. —\"Sé cómo librar a vuestra ciudad de esta plaga\", dijo el desconocido con una voz que sonaba como el viento entre los juncos. \"A cambio, pido mil monedas de oro\". Los concejales, desesperados, habrían prometido incluso el sol. \"¡Mil! ¡Te daremos cincuenta mil si nos libras de estos monstruos!\", exclamó el alcalde."
            },
            {
                text: "El flautista salió a la plaza principal, se llevó el instrumento a los labios y comenzó a tocar una melodía extraña, una secuencia de notas que parecía vibrar en los huesos. Al instante, el silencio cayó sobre la ciudad, seguido por un estruendo de millones de patas diminutas. Las ratas salieron de todas partes: de los graneros, de las iglesias, de las camas y de los armarios. Formaron un río de pelaje gris que seguía al flautista mientras este caminaba hacia el río Weser. Sin dejar de tocar, el hombre entró en el agua, y las ratas, hipnotizadas por la música, se lanzaron tras él y fueron arrastradas por la corriente hasta desaparecer."
            },
            {
                text: "La ciudad estalló en vítores. Se tocaron las campanas y se prepararon banquetes. Pero cuando el flautista regresó al ayuntamiento para reclamar su pago, la avaricia se había apoderado del corazón del alcalde. —\"¿Mil monedas por un rato de música?\", se mofó el alcalde. \"Toma estas cincuenta y date por satisfecho. Las ratas ya están muertas, no pueden volver\". El flautista no discutió. Sus ojos brillaron con una luz fría y peligrosa. \"Os arrepentiréis de romper vuestra palabra\", susurró antes de desaparecer entre las sombras de un callejón."
            },
            {
                text: "Llegó el día de San Juan y San Pablo. Mientras los adultos estaban en la iglesia, el flautista regresó. Esta vez, la melodía de su flauta era diferente: dulce, mágica, como el susurro de un bosque encantado o el aroma de los pasteles recién horneados. Esta vez no fueron las ratas. De todas las casas salieron los niños, corriendo con risas y saltos de alegría. Seguían al flautista como si fueran mariposas tras una flor. Los padres, atrapados en la iglesia, solo pudieron observar con horror a través de las ventanas cómo sus hijos se alejaban."
            },
            {
                text: "El flautista los guio fuera de la ciudad, hacia la montaña Koppelberg. Cuando llegaron a la ladera, una puerta de roca sólida se abrió mágicamente y todos, el flautista y los niños, entraron en el corazón de la montaña, que se cerró tras ellos para siempre. Solo tres niños quedaron atrás: uno que era cojo y no pudo correr lo suficiente, uno que era sordo y no pudo oír la música, y otro que era ciego y se perdió en el camino."
            },
            {
                text: "Ellos contaron cómo el flautista había prometido llevarlos a un lugar donde los árboles siempre tenían frutos, los pájaros hablaban y nadie lloraba jamás. Hamelín se convirtió en una ciudad de silencio y luto, un lugar donde, desde aquel día, está prohibido tocar música en la calle por la que se fueron los niños, para que nunca se olvide el precio de una promesa rota."
            }
        ]
    },
    {
        id: 'pinocho',
        title: 'Pinocho',
        author: 'Carlo Collodi',
        description: 'La inolvidable odisea de una marioneta traviesa que debe aprender sobre la verdad, la conciencia y el sacrificio para convertirse en un niño de verdad.',
        level: 'Difícil',
        age: '7+',
        coverImage: '/images/storyteller/pinocho-cover.png',
        chipImage: '/images/storyteller/character-pinocho.png',
        genre: 'Novela',
        themeColor: 'from-amber-700 to-orange-900',
        content: [
            {
                text: "Esta es la historia de Pinocho, una crónica sobre la formación del alma, la lucha contra las tentaciones y el arduo camino que separa a un trozo de madera de un corazón humano. En un pequeño pueblo italiano de calles empedradas y talleres angostos, vivía un viejo carpintero llamado Geppetto. Era un hombre de manos nudosas y corazón solitario que, para aliviar su melancolía, decidió tallar una marioneta de madera de pino. Sin embargo, apenas comenzó a esculpir, sucedió algo extraordinario: la madera empezó a reírse de sus cosquillas y a protestar por los golpes del mazo. Geppetto, asombrado, terminó la figura de un niño al que llamó Pinocho. Pero antes de que pudiera enseñarle a caminar, el muñeco cobró vida propia, le dio una patada y huyó corriendo hacia la calle."
            },
            {
                text: "Aquella marioneta era un torbellino de imprudencia. Geppetto, tratándolo como a un hijo, vendió su única chaqueta de abrigo, a pesar del crudo invierno, para comprarle un abecedario y enviarlo a la escuela. Pinocho, conmovido por un momento, prometió ser el mejor estudiante del mundo. Pero el camino a la escuela está lleno de distracciones para quien tiene la cabeza hecha de madera. Al oír el sonido de los platillos y los tambores, Pinocho olvidó su promesa y vendió su abecedario para comprar una entrada al Gran Teatro de Marionetas de Comefuego."
            },
            {
                text: "Allí, tras casi ser quemado para cocinar un carnero, el dueño del teatro se apiadó de él y le regaló cinco monedas de oro para su padre. Pinocho regresaba a casa orgulloso, pero en el trayecto se topó con el Zorro y el Gato, dos estafadores que se hacían pasar por cojo y ciego. Con palabras melosas, convencieron al muñeco de que, si enterraba sus monedas en el \"Campo de los Milagros\", crecería un árbol cargado de oro. Pinocho, cegado por la codicia, los siguió, ignorando las advertencias del Espíritu del Grillo Parlante, a quien terminó por silenciar de un manotazo. Por supuesto, los malandros lo emboscaron, lo colgaron de una encina y le robaron sus tesoros."
            },
            {
                text: "Fue entonces cuando apareció el Hada Azul, una criatura de cabellos color turquesa que vivía en una casa de cristal. Ella rescató a Pinocho y, al preguntarle dónde estaban las monedas, el muñeco mintió. En ese instante, su nariz comenzó a crecer y crecer, extendiéndose tanto que no podía moverse por la habitación. \"Las mentiras, Pinocho\", dijo el Hada con una sonrisa triste, \"tienen las piernas cortas o la nariz larga\". Solo tras muchas lágrimas y arrepentimiento, el Hada llamó a unos pájaros carpinteros para que le devolvieran la nariz a su tamaño original."
            },
            {
                text: "Pero la naturaleza de Pinocho seguía siendo voluble. De camino a casa, se encontró con su amigo \"Mecha\", quien lo invitó al País de los Juguetes, un lugar donde no había libros, ni maestros, ni leyes, y donde los niños jugaban de la mañana a la noche. Pinocho pasó cinco meses de diversión desenfrenada, hasta que una mañana despertó con una sensación extraña: sus orejas se habían vuelto largas y peludas, y le había crecido una cola. El País de los Juguetes era en realidad una trampa para convertir a los niños perezosos en asnos y venderlos en el mercado."
            },
            {
                text: "Convertido en burro, Pinocho fue maltratado y arrojado al mar, donde el hechizo se rompió y volvió a ser una marioneta. Pero su desgracia no terminó ahí, pues fue tragado por el Gran Tiburón, un monstruo marino de dimensiones colosales. En la oscuridad del vientre de la bestia, vio una luz lejana. Era Geppetto, que había salido a buscarlo al mar y había sido devorado tiempo atrás. El reencuentro fue puro llanto y alegría. Pinocho, demostrando por primera vez una valentía genuina, cargó a su padre sobre sus hombros de madera y aprovechó un bostezo del monstruo para escapar nadando hacia la orilla."
            },
            {
                text: "A partir de ese día, Pinocho cambió por completo. Trabajó duro en una granja, cuidó de su padre enfermo y ahorró cada céntimo para ayudar al Hada Azul cuando supo que ella también pasaba penurias. Una noche, mientras dormía, el Hada lo visitó en sueños. Al despertar, Pinocho ya no sintió el tacto frío y rígido de la madera. Al mirarse en el espejo, vio a un niño de carne y hueso, con ojos brillantes y una sonrisa llena de vida. A su lado, Geppetto sonreía, y en un rincón de la habitación, el viejo cuerpo de madera de la marioneta descansaba como el capullo vacío de una mariposa que finalmente ha aprendido que ser humano no es una cuestión de forma, sino de amor y sacrificio."
            }
        ]
    },
    {
        id: 'gigante-egoista',
        title: 'El Gigante Egoísta',
        author: 'Oscar Wilde',
        description: 'Un conmovedor relato sobre cómo la inocencia de los niños puede derretir incluso el corazón más helado.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/gigante-egoista-cover.png',
        chipImage: '/images/storyteller/character-gigante-egoista.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-sky-700 to-indigo-900',
        content: [
            {
                text: "Esta es la historia de El Gigante Egoísta, un relato sobre cómo el hielo de la soledad y la dureza del corazón solo pueden ser derretidos por la calidez de la generosidad y la inocencia de la niñez. Todas las tardes, a la salida de la escuela, los niños de la aldea solían ir a jugar al jardín del Gigante. Era un jardín amplio y hermoso, tapizado de un césped suave y verde como el terciopelo. Por todas partes surgían flores brillantes como estrellas, y había doce melocotoneros que, en primavera, se cubrían de una delicada floración de color rosa y perla, y en otoño daban frutos dulces y jugosos. Los pájaros se posaban en las ramas y cantaban con tal dulzura que los niños solían detener sus juegos para escucharlos. —\"¡Qué felices somos aquí!\", se decían unos a otros."
            },
            {
                text: "Pero un día, el Gigante regresó. Había estado fuera durante siete años visitando a su amigo, el ogro de Cornualles, y al volver, lo primero que vio fue a los niños jugando entre sus flores. —\"¿Qué hacéis aquí?\", gritó con una voz tan retumbante que los niños escaparon despavoridos. \"Mi jardín es mi jardín\", sentenció. \"No permitiré que nadie más que yo juegue en él\". Sin perder tiempo, construyó un muro altísimo alrededor de la propiedad y colgó un cartel que decía: PROHIBIDA LA ENTRADA. LOS TRANSGRESORES SERÁN CASTIGADOS. Era, en efecto, un Gigante muy egoísta."
            },
            {
                text: "Llegó la primavera y toda la comarca se llenó de brotes y pajarillos. Sin embargo, en el jardín del Gigante Egoísta seguía siendo invierno. Los pájaros no querían cantar allí porque no había niños, y los árboles se olvidaron de florecer. Una vez, una hermosa flor asomó su cabeza sobre el césped, pero al ver el cartel de prohibición, sintió tanta lástima por los niños que volvió a meterse bajo tierra y se quedó dormida. Los únicos que se sentían a gusto allí eran la Nieve y la Escarcha. \"La primavera se ha olvidado de este jardín\", exclamaban, \"así que viviremos aquí todo el año\"."
            },
            {
                text: "La Nieve cubrió el césped con su gran manto blanco y la Escarcha pintó de plata todos los árboles. Luego invitaron al Viento del Norte, quien llegó envuelto en pieles, rugiendo por el jardín y derribando las chimeneas. \"Este es un lugar delicioso\", dijo el Viento, \"deberíamos invitar también al Granizo\". Y así, el Granizo llegó, golpeando el tejado del castillo durante tres horas al día hasta romper casi todas las pizarras, corriendo luego alrededor del jardín tan rápido como podía."
            },
            {
                text: "—\"No entiendo por qué la primavera tarda tanto en llegar\", decía el Gigante Egoísta mientras se asomaba a la ventana y contemplaba su jardín blanco y frío. \"Espero que el tiempo cambie pronto\". Pero la primavera no llegó nunca, ni tampoco el verano. El otoño dio frutos dorados a todos los jardines, pero al jardín del Gigante no le dio ninguno. \"Es demasiado egoísta\", decía el otoño. Así, el Invierno se instaló allí permanentemente, y el Viento del Norte, el Granizo, la Escarcha y la Nieve bailaban entre los árboles."
            },
            {
                text: "Una mañana, el Gigante estaba acostado en su cama cuando escuchó una música deliciosa. Era tan dulce que pensó que debían ser los músicos del Rey que pasaban por allí. En realidad, era solo un jilguero que cantaba ante su ventana, pero hacía tanto tiempo que el Gigante no oía el canto de un pájaro que le pareció la melodía más bella del mundo. Entonces, el Granizo dejó de bailar sobre su cabeza, el Viento del Norte cesó sus rugidos y un perfume delicioso llegó hasta él a través de la ventana abierta. —\"¡Creo que la primavera ha llegado por fin!\", exclamó el Gigante, y saltó de la cama para mirar hacia afuera."
            },
            {
                text: "¿Y qué fue lo que vio? Vio algo maravilloso. Por una brecha en el muro, los niños se habían colado y estaban sentados en las ramas de los árboles. En cada árbol que alcanzaba a ver había un niño, y los árboles estaban tan felices de tenerlos de vuelta que se habían cubierto de flores y balanceaban sus ramas suavemente sobre las cabezas de los pequeños. Los pájaros revoloteaban gorjeando de alegría y las flores se asomaban entre el césped riendo."
            },
            {
                text: "Era un cuadro encantador, salvo en un rincón. En el rincón más apartado del jardín todavía era invierno. Allí se encontraba un niño muy pequeño, tan pequeño que no alcanzaba las ramas del árbol y daba vueltas a su alrededor llorando amargamente. El pobre árbol estaba todavía cubierto de escarcha y nieve, y el Viento del Norte soplaba y rugía sobre él. —\"¡Sube, pequeño!\", decía el árbol, y bajaba sus ramas todo lo que podía, pero el niño era demasiado menudo."
            },
            {
                text: "El corazón del Gigante se derritió al mirar hacia afuera. \"¡Qué egoísta he sido!\", pensó. \"Ahora sé por qué la primavera no quería venir aquí. Subiré a ese pobre niño al árbol y luego derribaré el muro, y mi jardín será para siempre el campo de juegos de los niños\". Estaba verdaderamente arrepentido."
            },
            {
                text: "Bajó las escaleras, abrió la puerta con sigilo y salió al jardín. Pero cuando los niños lo vieron, se asustaron tanto que todos huyeron y el invierno volvió al jardín. Solo el niño pequeño no escapó, porque sus ojos estaban tan llenos de lágrimas que no vio venir al Gigante. El Gigante se le acercó por detrás, lo tomó con delicadeza en su mano y lo subió al árbol. Al punto, el árbol floreció, los pájaros vinieron a cantar en él y el niño extendió sus brazos, rodeó el cuello del Gigante y lo besó."
            },
            {
                text: "Los otros niños, al ver que el Gigante ya no era malo, regresaron corriendo, y con ellos volvió la primavera. —\"Desde ahora, este es vuestro jardín, pequeñuelos\", dijo el Gigante, y tomando un hacha enorme, derribó el muro."
            },
            {
                text: "A las doce, cuando la gente iba al mercado, encontraron al Gigante jugando con los niños en el jardín más hermoso que se hubiera visto jamás. Jugaron durante todo el día, y al atardecer los niños fueron a despedirse del Gigante. —\"¿Pero dónde está vuestro pequeño compañero?\", preguntó él. \"El niño que subí al árbol\". El Gigante lo quería más que a los otros porque lo había besado. —\"No lo sabemos\", respondieron los niños, \"se ha ido\"."
            },
            {
                text: "Pasaron los años y el Gigante se volvió viejo y débil. Ya no podía jugar, así que se sentaba en un gran sillón a ver jugar a los niños y admiraba su jardín. \"Tengo muchas flores bellas\", decía, \"pero los niños son las flores más bellas de todas\". Una mañana de invierno, mientras se vestía, miró por la ventana. Ya no odiaba el invierno, pues sabía que no era sino la primavera dormida. De pronto, se frotó los ojos con asombro y miró de nuevo. En el rincón más apartado del jardín había un árbol cubierto de flores blancas. Sus ramas eran de oro y de ellas colgaban frutos de plata, y debajo del árbol estaba el niño a quien él tanto había querido."
            },
            {
                text: "El Gigante corrió hacia abajo con gran alegría. Pero al acercarse al niño, su rostro se puso rojo de cólera. —\"¿Quién se ha atrevido a herirte?\", gritó. Pues en las palmas de las manos del niño había señales de dos clavos, y las mismas señales estaban en sus pequeños pies. \"¿Quién se ha atrevido a herirte? ¡Dímelo para que tome mi espada y lo mate!\". —\"No\", respondió el niño con una voz de una dulzura celestial. \"Estas son las heridas del Amor\". El Gigante sintió un extraño temor y cayó de rodillas ante el pequeño. —\"¿Quién eres?\", le preguntó en un susurro. Y el niño sonrió al Gigante y le dijo: —\"Una vez me dejaste jugar en tu jardín; hoy vendrás conmigo a mi jardín, que es el Paraíso\". Cuando los niños llegaron esa tarde para jugar, encontraron al Gigante muerto bajo el árbol, todo cubierto de flores blancas."
            }
        ]
    },
    {
        id: 'aladino',
        title: 'Aladino y la Lámpara Maravillosa',
        author: 'Las Mil y Una Noches',
        description: 'La aventura mágica de un joven que, con la ayuda de un genio, descubre que su verdadero valor no reside en la riqueza, sino en su corazón.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/aladino-cover.png',
        chipImage: '/images/storyteller/character-aladino.png',
        genre: 'Cuento popular',
        themeColor: 'from-amber-600 to-purple-800',
        content: [
            {
                text: "En una de las ciudades más prósperas de la China ancestral, vivía un muchacho llamado Aladino. Era un joven desobediente y perezoso que prefería jugar en las plazas antes que aprender el oficio de su padre, un humilde sastre que había muerto de pena al ver la indolencia de su hijo. Aladino vivía solo con su madre, una mujer trabajadora que hilaba algodón día y noche para llevar un poco de pan a la mesa."
            },
            {
                text: "Un día, mientras Aladino jugaba con otros muchachos, se le acercó un extraño de aspecto imponente. El hombre, que en realidad era un poderoso mago africano, fingió ser el hermano de su difunto padre. Con promesas de convertir a Aladino en un rico mercader, se ganó la confianza de la familia. Sin embargo, el mago no buscaba el bienestar del joven; necesitaba a alguien de corazón puro y mente simple para recuperar un objeto que ningún poder mágico podía alcanzar por sí solo."
            },
            {
                text: "El mago condujo a Aladino a una montaña desértica y apartada. Tras encender una hoguera y pronunciar palabras arcanas en una lengua olvidada, la tierra se abrió, revelando una losa de mármol con una argolla de hierro. —\"Bajo esta losa hay un tesoro que solo tú puedes tocar\", dijo el mago. \"Entra en la cueva, atraviesa los salones llenos de oro y joyas, pero no toques nada. Al fondo, encontrarás una lámpara de aceite vieja y polvorienta. Tráemela de inmediato\". Antes de que el joven descendiera, el mago le entregó un anillo de oro con una piedra roja, asegurándole que lo protegería de todo mal."
            },
            {
                text: "Aladino bajó a las profundidades. Vio árboles cuyas frutas eran diamantes, esmeraldas y rubíes, pero fiel a su promesa, solo buscó la lámpara. Una vez la tuvo en su poder, regresó a la entrada, pero el mago, en un ataque de impaciencia y maldad, exigió que le entregara la lámpara antes de ayudarlo a salir. Aladino, sospechando de su \"tío\", se negó. Furioso, el mago pronunció un conjuro, la losa se cerró y el joven quedó sepultado vivo en la oscuridad total."
            },
            {
                text: "Pasaron dos días. Aladino, llorando de desesperación, juntó sus manos para rezar y, por accidente, frotó el anillo que el mago le había dado. De pronto, un genio colosal y de aspecto aterrador apareció ante él. —\"Soy el Genio del Anillo. ¿Qué deseas de mí?\". —\"¡Sácame de aquí!\", exclamó el muchacho. En un parpadeo, Aladino se encontró en la puerta de su casa. Le contó todo a su madre y, como tenían hambre, decidieron vender la vieja lámpara. La madre tomó un paño para limpiarla y, al frotarla, surgió un segundo genio, mucho más poderoso y grande que el anterior. —\"Soy el Genio de la Lámpara. Tus deseos son órdenes para mí\"."
            },
            {
                text: "Desde aquel día, la vida de Aladino cambió. El genio les proveía de los manjares más exquisitos y de riquezas incalculables. Con el tiempo, Aladino se convirtió en un hombre generoso y sabio. Un día, vio pasar a la hija del Sultán, la princesa Badrulbudur, y quedó prendado de su belleza. Con la ayuda del genio, Aladino envió a su madre al palacio con cofres llenos de gemas tan grandes como huevos de paloma, superando cualquier dote que el Sultán hubiera visto jamás."
            },
            {
                text: "Impresionado, el Sultán accedió al matrimonio, pero pidió una prueba final: un palacio magnífico construido en una sola noche. El Genio de la Lámpara cumplió la tarea, erigiendo una estructura de mármol y oro que dejaba en penumbra al propio palacio real. Aladino y la princesa se casaron y vivieron en una felicidad que parecía eterna."
            },
            {
                text: "Sin embargo, el mago africano, a través de sus artes oscuras, supo que Aladino no solo estaba vivo, sino que poseía la lámpara. Viajó a la ciudad disfrazado de mercader y recorrió las calles gritando: \"¡Cambio lámparas viejas por lámparas nuevas!\". Una de las criadas de la princesa, ignorando el valor del objeto, entregó la lámpara mágica al mago a cambio de una reluciente."
            },
            {
                text: "El mago frotó la lámpara y ordenó al genio trasladar el palacio de Aladino, con la princesa dentro, a lo más profundo de África. Cuando Aladino regresó y vio el desierto donde antes estaba su hogar, estuvo a punto de rendirse. Pero recordó el anillo que aún llevaba puesto. Frotó la piedra y el genio del anillo apareció. Aunque no tenía el poder de deshacer el hechizo del genio de la lámpara, pudo llevar a Aladino hasta donde se encontraba su esposa."
            },
            {
                text: "Con astucia, la princesa engañó al mago y puso un narcótico en su vino. Mientras el malvado dormía, Aladino recuperó la lámpara, invocó a su genio y ordenó que el palacio regresara a su lugar original y que el mago fuera desterrado a una isla desierta donde nunca más pudiera dañar a nadie."
            },
            {
                text: "Aladino y Badrulbudur regresaron triunfantes. Al morir el Sultán, Aladino ascendió al trono, gobernando con justicia y bondad. La lámpara fue guardada en un lugar secreto, no por avaricia, sino para recordar que la verdadera magia no reside en los objetos, sino en la valentía y el ingenio de quien sabe usarlos para el bien común."
            }
        ]
    },
    {
        id: 'bella-durmiente',
        title: 'La Bella Durmiente',
        author: 'Hermanos Grimm / Perrault',
        description: 'La leyenda de una princesa condenada a dormir cien años y del amor verdadero que desafía al tiempo y a las espinas.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/bella-durmiente-cover.png',
        chipImage: '/images/storyteller/character-bella-durmiente.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-pink-700 to-rose-900',
        content: [
            {
                text: "En un reino donde las montañas tocaban las nubes y los ríos cantaban melodías de cristal, vivían un Rey y una Reina que lo tenían todo, excepto lo que más deseaban: un hijo. Durante años, sus plegarias fueron en vano, hasta que un día, mientras la Reina descansaba a la orilla de un estanque, una rana saltó del agua y le profetizó que antes de que pasara un año, sus deseos se cumplirían. La profecía se hizo realidad y nació una niña tan hermosa que el Rey, loco de alegría, decidió celebrar el banquete más grandioso de la historia."
            },
            {
                text: "En aquel reino vivían trece hadas sabias. Sin embargo, el Rey solo poseía doce platos de oro para el banquete, por lo que decidió invitar solo a doce de ellas, dejando a la decimotercera fuera del festejo. Al terminar la cena, las hadas comenzaron a otorgar sus dones mágicos a la pequeña: una le dio la virtud, otra la belleza, la tercera la riqueza, y así hasta llegar a la undécima."
            },
            {
                text: "De pronto, la puerta del gran salón se abrió con un estruendo y apareció la decimotercera hada. Su rostro estaba encendido por la humillación y la ira. Sin saludar a nadie, gritó con voz de trueno: —\"¡A los quince años, la hija del Rey se pinchará con el huso de una rueca y caerá muerta!\". Dicho esto, desapareció en una ráfaga de humo negro. El horror se apoderó de los invitados, pero entonces dio un paso al frente la duodécima hada, que aún no había dado su don. Aunque no podía deshacer la maldición, podía mitigarla: —\"No será una muerte real\", sentenció, \"sino un sueño profundo que durará cien años\"."
            },
            {
                text: "El Rey, desesperado por proteger a su única hija, ordenó que todas las ruecas del reino fueran quemadas en una hoguera gigante. Los años pasaron y la princesa creció dotada de todos los dones que las hadas le habían dado: era tan graciosa, inteligente y bondadosa que nadie podía evitar amarla."
            },
            {
                text: "El día de su decimoquinto cumpleaños, mientras sus padres estaban fuera, la joven decidió explorar cada rincón del palacio. Subió por una antigua escalera de caracol que conducía a una torre olvidada. Al abrir la puerta, encontró a una anciana hilando lino con una rueca. La princesa, que nunca había visto una, se acercó fascinada. —\"¿Qué es esa cosa que salta tan alegremente?\", preguntó curiosa. Apenas extendió la mano para tocar el huso, la maldición se cumplió. La punta afilada pinchó su dedo y, en ese mismo instante, la joven cayó sobre una cama que allí había, sumida en un sueño profundo."
            },
            {
                text: "Pero el sueño no fue solo para ella. Una magia silenciosa se extendió por todo el castillo: el Rey y la Reina, que acababan de llegar, se quedaron dormidos en el salón; los caballos en el establo, los perros en el patio, las palomas en el tejado y hasta el fuego de la cocina se detuvo. El asado dejó de chisporrotear y el cocinero, que estaba a punto de reprender al ayudante, se quedó inmóvil con la mano levantada. Alrededor del palacio comenzó a crecer un seto de espinas que cada año se hacía más alto y espeso, hasta que el castillo quedó oculto a la vista del mundo."
            },
            {
                text: "Con el tiempo, la leyenda de la \"Bella Durmiente del Bosque\" se extendió por otros reinos. Muchos príncipes intentaron atravesar el muro de espinas, pero las ramas se cerraban como garras y los jóvenes quedaban atrapados, pereciendo en el intento."
            },
            {
                text: "Pasados los cien años, un nuevo príncipe llegó a la región. Un anciano le contó la historia de la torre y la hermosa princesa dormida. A pesar de las advertencias, el príncipe sintió un impulso irresistible. Ese día se cumplía el siglo exacto del hechizo; cuando el joven se acercó al seto, las espinas se convirtieron en flores hermosas que se abrían para dejarlo pasar."
            },
            {
                text: "El príncipe recorrió el castillo sumido en un silencio sagrado. Vio a los guardias durmiendo con sus lanzas y a los cortesanos inmóviles. Finalmente, subió a la torre y encontró a la princesa. Su belleza era tan radiante que no pudo evitar arrodillarse y besarla suavemente."
            },
            {
                text: "En ese momento, el hechizo se rompió. La princesa abrió los ojos y lo miró con dulzura. En todo el castillo, la vida despertó como si solo hubiera pasado un segundo: los caballos relincharon, los perros ladraron, el fuego volvió a arder y el cocinero terminó de darle el tirón de orejas al ayudante. El Rey y la Reina celebraron la boda de la princesa y el príncipe con una fiesta que duró días. El muro de espinas desapareció para siempre, y se dice que vivieron felices y en paz, recordando siempre que ni el tiempo más largo ni la magia más oscura pueden derrotar a un destino escrito con amor."
            }
        ]
    },
    {
        id: 'cenicienta',
        title: 'Cenicienta',
        author: 'Hermanos Grimm / Perrault',
        description: 'La clásica historia de bondad, magia y zapatos de cristal que demuestra que los sueños se hacen realidad.',
        level: 'Medio',
        age: '4+',
        coverImage: '/images/storyteller/cenicienta-cover.png',
        chipImage: '/images/storyteller/character-cenicienta.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-blue-600 to-indigo-800',
        content: [
            {
                text: "En una mansión rodeada de prados verdes y jardines cuidados, vivía un hombre rico con su joven hija. La niña era el retrato de su madre fallecida: dulce, paciente y poseedora de una belleza que parecía emanar de su interior. Sin embargo, buscando un nuevo hogar para su hija, el hombre se casó con una mujer que traía consigo a dos hijas de su primer matrimonio. Bajo sus rostros bien parecidos, las tres ocultaban corazones áridos y mentes crueles. Tras la repentina muerte del padre, la verdadera naturaleza de la madrastra floreció como una mala hierba. Despojaron a la joven de sus vestidos de seda, la obligaron a dormir en el desván sobre un jergón de paja y la condenaron a las tareas más duras de la casa. Limpiaba las cenizas de la chimenea de sol a sol, y como siempre estaba manchada de polvo y hollín, sus hermanastras empezaron a llamarla con desprecio Cenicienta."
            },
            {
                text: "A pesar de las burlas y el agotamiento, Cenicienta nunca perdió su dulzura. Encontraba consuelo hablando con los pájaros que anidaban en el alero y cuidando un avellano que había crecido junto a la tumba de su padre, regado con sus propias lágrimas."
            },
            {
                text: "Un día, el palacio anunció un baile real que duraría tres noches, destinado a que el príncipe heredero eligiera esposa. Las hermanastras pasaron semanas preparándose, gritando órdenes a Cenicienta para que planchara sus encajes y peinara sus cabellos. Cuando la joven suplicó que la dejaran ir, la madrastra, con una risa gélida, arrojó un plato de lentejas a las cenizas: —\"Si eres capaz de recogerlas todas en dos horas, podrás venir\". Cenicienta llamó a sus amigos los pájaros: \"Palomitas, tortolitas, venid a ayudarme\". En menos de una hora, la tarea estaba hecha. Pero la madrastra, rompiendo su promesa, le dijo que no tenía vestidos dignos y que solo avergonzaría a la familia. Se marcharon al baile, dejando a la joven sumida en el llanto bajo su avellano."
            },
            {
                text: "—\"¡Árbol pequeño, sacúdete y bate, de oro y plata vísteme!\", exclamó la joven. De entre las ramas apareció un espíritu protector, su hada madrina. Con un toque de su vara mágica, transformó una calabaza en un carruaje dorado, seis ratones en corceles de paso elegante y los harapos de Cenicienta en un vestido de tela de plata, adornado con joyas que brillaban como el rocío. Lo más asombroso eran sus zapatos, hechos del cristal más fino y resistente. —\"Recuerda una cosa\", advirtió el hada, \"la magia se desvanece al sonar la última campanada de la medianoche. Debes regresar antes\"."
            },
            {
                text: "Al entrar en el salón, el silencio fue absoluto. El príncipe, hechizado por aquella desconocida que irradiaba una luz especial, no bailó con ninguna otra mujer. Cenicienta era feliz, pero al oír el primer tañido de las doce, huyó del palacio con tal prisa que perdió uno de sus zapatos de cristal en la escalinata. El príncipe lo recogió y juró que solo se casaría con la mujer cuyo pie encajara perfectamente en aquel calzado."
            },
            {
                text: "Al día siguiente, los mensajeros reales recorrieron el reino. Llegaron a la mansión de la madrastra. La hermana mayor intentó calzarse el zapato, pero su pie era demasiado grande; la segunda lo intentó también, pero sus dedos no cabían. La madrastra, en su desesperación, incluso las instó a mutilarse los pies con tal de reinar, pero la sangre delató el engaño. —\"¿No hay nadie más aquí?\", preguntó el mensajero. —\"Solo una sucia fregona\", respondió la madrastra. Pero el mensajero insistió. Cenicienta salió de la cocina, se lavó la cara y las manos, y se sentó en el taburete. Deslizó su pie en el zapato de cristal y este encajó como si hubiera sido moldeado por los mismos ángeles. En ese momento, la joven sacó el otro zapato de su delantal."
            },
            {
                text: "El príncipe, que esperaba en el carruaje, la reconoció de inmediato. Cenicienta fue llevada al palacio, donde se celebró una boda de una magnificencia nunca vista. A pesar de todo el daño recibido, Cenicienta perdonó a sus hermanastras, demostrando que la verdadera nobleza no reside en el título, sino en la capacidad de amar incluso a quienes nos han hecho llorar."
            }
        ]
    },
    {
        id: 'musicos-bremen',
        title: 'Los Músicos de Bremen',
        author: 'Hermanos Grimm',
        description: 'La divertida aventura de cuatro animales que demuestran que nunca es tarde para encontrar un nuevo hogar.',
        level: 'Fácil',
        age: '4+',
        coverImage: '/images/storyteller/musicos-bremen-cover.png',
        chipImage: '/images/storyteller/character-musicos-bremen.png',
        genre: 'Fábula',
        themeColor: 'from-orange-600 to-amber-800',
        content: [
            {
                text: "Había una vez un burro que, durante largos años, había transportado incansablemente sacos de trigo al molino de su amo. Pero el tiempo no perdona, y sus fuerzas comenzaron a flaquear. Al darse cuenta de que su amo planeaba deshacerse de él para no tener que alimentarlo más, el burro decidió tomar las riendas de su propio destino. \"Iré a Bremen\", pensó con optimismo, \"allí mi voz todavía es fuerte y podré convertirme en músico municipal\"."
            },
            {
                text: "No había caminado mucho cuando encontró a un perro de caza tendido a la orilla del camino, jadeando como si hubiera corrido una maratón. —\"¿Por qué jadeas tanto, amigo?\", preguntó el burro. —\"¡Ay!\", respondió el perro con tristeza. \"Como ya soy viejo y no sirvo para la caza, mi amo quiso matarme. He huido, pero ¿cómo me ganaré la vida ahora?\". —\"Ven conmigo a Bremen\", propuso el burro. \"Yo tocaré el laúd y tú podrás tocar los timbales\". Al perro le pareció un plan excelente y ambos continuaron el viaje."
            },
            {
                text: "Poco después, se toparon con un gato que tenía una cara tan larga como tres días de lluvia. —\"¿Qué te pasa, viejo cazador de ratones?\", preguntó el burro. —\"¿Quién puede estar alegre cuando su vida corre peligro?\", maulló el gato. \"Mis dientes ya no están afilados y prefiero estar junto al fuego antes que perseguir ratones. Por eso, mi ama intentó ahogarme. He escapado, pero no sé a dónde ir\". —\"Tú sabes mucho de serenatas nocturnas\", dijo el burro. \"Acompáñanos a Bremen y hazte músico con nosotros\". El gato aceptó y los tres siguieron adelante."
            },
            {
                text: "Al pasar por una granja, vieron a un gallo posado sobre una verja, gritando con todas sus fuerzas. —\"Gritas como si te fuera la vida en ello\", observó el burro. —\"¡Es que me va!\", respondió el gallo. \"Mañana vienen invitados y la dueña le ha dicho a la cocinera que me quiere en la sopa. Estoy aprovechando mis últimos minutos de libertad\". —\"¡Qué tontería!\", exclamó el burro. \"Cualquier cosa es mejor que la muerte. Tienes una voz magnífica; ven con nosotros a Bremen\". El gallo se unió al grupo, y así, los cuatro nuevos amigos continuaron su marcha."
            },
            {
                text: "Sin embargo, Bremen estaba lejos y no podían llegar en un solo día. Al caer la noche, se adentraron en un bosque espeso para dormir. El gallo, que se había posado en la copa más alta de un árbol para vigilar, divisó una luz a lo lejos. —\"¡Amigos! Hay una casa cerca\", gritó. Hambrientos y cansados, decidieron acercarse. Al asomarse por la ventana, el burro, que era el más alto, vio a una banda de ladrones sentados ante una mesa rebosante de manjares: pavo asado, vino y pan tierno."
            },
            {
                text: "Necesitaban entrar, pero los ladrones eran peligrosos. Entonces, idearon un plan basado en su mayor talento: la música. El burro se apoyó con las patas delanteras en el alféizar de la ventana; el perro saltó sobre el lomo del burro; el gato trepó sobre el perro y, finalmente, el gallo voló hasta posarse sobre la cabeza del gato. A una señal dada, todos empezaron su \"concierto\": el burro rebuznó, el perro ladró, el gato maulló y el gallo cantó con tal estruendo que los cristales vibraron. Acto seguido, saltaron a través de la ventana rompiendo los vidrios con un estrépito aterrador."
            },
            {
                text: "Los ladrones, convencidos de que un monstruo o un fantasma del bosque los atacaba, huyeron despavoridos hacia la espesura, dejando atrás el banquete. Los cuatro amigos cenaron como reyes y, exhaustos, buscaron un lugar para dormir: el burro sobre el estiércol, el perro tras la puerta, el gato junto a las cenizas del hogar y el gallo en una viga del techo."
            },
            {
                text: "Más tarde, el jefe de los ladrones envió a uno de sus hombres a inspeccionar la casa. El ladrón entró en la oscuridad y, al ver los ojos brillantes del gato, pensó que eran brasas encendidas. Al acercar una cerilla, el gato le saltó a la cara bufando y arañando. Al intentar huir por la puerta, el perro le mordió la pierna; al pasar por el corral, el burro le propinó una coz monumental; y el gallo, despertado por el ruido, gritó desde arriba: \"¡Quiquiriquí!\"."
            },
            {
                text: "El ladrón regresó con sus compañeros pálido de terror: —\"¡Es horrible!\", exclamó. \"En la casa vive una bruja que me ha arañado la cara; en la puerta hay un hombre con un cuchillo que me ha herido la pierna; en el patio hay un monstruo negro que me ha golpeado con un mazo, y en el tejado hay un juez que gritaba: '¡Traedme al ladron-aquí!'\"."
            },
            {
                text: "Los ladrones nunca se atrevieron a volver, y los cuatro músicos de Bremen se sintieron tan a gusto en la casa que ya no quisieron marcharse de allí. Y se dice que todavía viven felices, ensayando sus canciones bajo la luz de la luna."
            }
        ]
    },
    {
        id: 'blancanieves',
        title: 'Blancanieves',
        author: 'Hermanos Grimm',
        description: 'La historia de una princesa de piel blanca como la nieve que, huyendo de una madrastra malvada, encuentra refugio y amistad en la casa de siete enanitos.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/blancanieves-cover.png',
        chipImage: '/images/storyteller/character-blancanieves.png?v=4',
        genre: 'Cuento de hadas',
        themeColor: 'from-red-600 to-indigo-900',
        content: [
            {
                text: "En el corazón de un invierno profundo, mientras los copos de nieve caían como plumas del cielo, una reina cosía junto a una ventana de marco de ébano. Al pincharse el dedo con la aguja, tres gotas de sangre cayeron sobre la nieve blanca. El contraste era tan hermoso que la reina pensó: \"¡Ojalá tuviera una hija con la piel blanca como la nieve, los labios rojos como la sangre y el cabello negro como el ébano!\". Poco después, su deseo se cumplió y dio a luz a una niña a la que llamaron Blancanieves. Sin embargo, la alegría fue breve, pues la reina murió al poco tiempo."
            },
            {
                text: "Un año más tarde, el rey contrajo nupcias con una mujer de una belleza asombrosa pero de un corazón altivo y cruel. Esta mujer poseía un objeto mágico: un espejo de cristal al que consultaba cada mañana. —\"Espejito, espejito mágico en la pared, ¿quién es la más hermosa de todo el reino?\", preguntaba. —\"Tú, mi reina, eres la más hermosa\", respondía siempre el espejo. Pero Blancanieves crecía en gracia y esplendor, y al cumplir los siete años, su belleza superaba a la de la propia reina. Cuando la madrastra volvió a interrogar a su espejo, este respondió con una voz que sonó como una sentencia: —\"Tú eres bella, majestad, es verdad; pero Blancanieves es mil veces más hermosa que tú\"."
            },
            {
                text: "La envidia, como una raíz venenosa, comenzó a crecer en el pecho de la reina. Llamó a un cazador y le ordenó llevar a la niña al bosque para darle muerte. Como prueba de su tarea, debía traerle sus pulmones y su hígado. El cazador guio a la niña a la espesura, pero al ver su rostro inocente y sus lágrimas, no tuvo valor para alzar el puñal. \"Corre, pobre criatura\", dijo. Para engañar a la reina, mató a un joven jabalí y le entregó las vísceras al palacio, las cuales la malvada mujer devoró con placer macabro."
            },
            {
                text: "Blancanieves vagó por el bosque, asustada por el crujir de las ramas y el aullido del viento. Al atardecer, divisó una pequeña casa. Al entrar, vio que todo era diminuto pero impecable: había una mesa con siete platitos, siete cucharitas y siete vasitos. Fatigada, comió un poco de cada plato, bebió un sorbo de cada vaso y se quedó dormida en la séptima camita."
            },
            {
                text: "Al caer la noche, regresaron los dueños de la casa: siete enanitos que trabajaban en las minas de las montañas buscando oro. Al ver a la niña durmiendo, quedaron maravillados por su hermosura. Al despertar, Blancanieves les contó su triste historia. Los enanitos, conmovidos, le propusieron: \"Si cuidas nuestra casa, cocinas y lavas, puedes quedarte con nosotros y nada te faltará\"."
            },
            {
                text: "Pero la paz duró poco. En el castillo, la reina volvió a consultar al espejo, quien le reveló que Blancanieves seguía viva en la casa de los siete enanitos. Furiosa, la reina se disfrazó de vieja mercadera y viajó a la montaña. Primero intentó matarla con una cinta para el talle que apretó tanto que la niña se desmayó; luego, con un peine envenenado. En ambas ocasiones, los enanitos regresaron a tiempo para salvarla."
            },
            {
                text: "Finalmente, la reina preparó una manzana de apariencia exquisita: una mitad era blanca y la otra de un rojo vibrante. Solo la mitad roja contenía el veneno más potente del mundo. Disfrazada de campesina, convenció a Blancanieves de probarla. Al primer mordisco, la niña cayó al suelo sin respiración. Los enanitos, al regresar, intentaron todo para despertarla, pero esta vez no pudieron. Al ver que su cuerpo no se corrompía y conservaba su belleza, la colocaron en un ataúd de cristal con su nombre escrito en letras de oro y lo vigilaron día y noche."
            },
            {
                text: "Pasó mucho tiempo, hasta que un príncipe que cabalgaba por el bosque vio el ataúd y se enamoró de la doncella que parecía dormir. Suplicó a los enanitos que le permitieran llevarse el ataúd a su castillo para honrarla por siempre. Mientras sus sirvientes cargaban con el pesado cristal, tropezaron con un matorral. El sacudón hizo que el trozo de manzana envenenada saltara de la garganta de Blancanieves. La joven abrió los ojos, se incorporó y preguntó: \"¿Dónde estoy?\"."
            },
            {
                text: "El príncipe, loco de alegría, le declaró su amor y la llevó a su palacio para casarse con ella. A la boda fue invitada la reina malvada. Cuando el espejo le dijo que la nueva reina era más hermosa que ella, acudió llena de curiosidad y rabia. Pero al reconocer a Blancanieves, el terror se apoderó de ella. Como castigo por sus crímenes, el destino le impuso bailar con unos zapatos de hierro que habían sido calentados al fuego, hasta que cayó muerta. Blancanieves y su príncipe gobernaron con sabiduría, y los siete enanitos siempre fueron invitados de honor en su mesa de mármol."
            }
        ]
    },
    {
        id: 'sastrecillo-valiente',
        title: 'El Sastrecillo Valiente',
        author: 'Hermanos Grimm',
        description: 'Un relato que celebra la astucia por encima de la fuerza bruta y nos recuerda que la confianza en uno mismo es la herramienta más poderosa.',
        level: 'Medio',
        age: '5+',
        coverImage: '/images/storyteller/sastrecillo-valiente-cover.png',
        chipImage: '/images/storyteller/character-sastrecillo-valiente.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-emerald-700 to-teal-900',
        content: [
            {
                text: "En una pequeña ciudad de casas con entramados de madera, vivía un joven sastre que trabajaba con gran dedicación en su taller. Un mediodía, mientras se preparaba una rebanada de pan con mermelada, unas moscas empezaron a revolotear sobre su comida. Molesto, el sastre tomó un trozo de tela y dio un golpe seco sobre la mesa. Al levantar el paño, contó con asombro que había matado a siete de un solo golpe."
            },
            {
                text: "—\"¡Qué valiente soy!\", exclamó para sí mismo. \"El mundo entero debe enterarse de mi hazaña\". Cortó una banda de seda y bordó en ella con letras grandes y doradas: \"SIETE DE UN GOLPE\". Se ciñó la banda a la cintura y, con un trozo de queso viejo en el bolsillo y un pájaro que se había enredado en un matorral, salió a recorrer el mundo."
            },
            {
                text: "Caminando por las montañas, se encontró con un Gigante colosal que bloqueaba el paso. El sastre, lejos de acobardarse, le mostró su banda. El gigante, pensando que se refería a siete hombres de un golpe, decidió poner a prueba su fuerza. Tomó una piedra y la apretó hasta que de ella brotaron gotas de agua. —\"¿Puedes hacer esto?\", rugió el gigante. —\"¡Eso no es nada!\", respondió el sastre. Sacó el queso viejo del bolsillo y lo apretó con tal fuerza que el suero salió disparado."
            },
            {
                text: "El gigante quedó impresionado, pero no convencido. Tomó otra piedra y la lanzó tan alto que casi se perdió de vista. —\"¡Buen tiro!\", dijo el sastre. \"Pero la piedra acabó cayendo. Yo lanzaré una que no regresará jamás\". Sacó al pájaro de su bolsillo y lo soltó al aire; el ave, feliz de ser libre, voló hasta desaparecer en las nubes."
            },
            {
                text: "El gigante, aunque furioso, invitó al sastre a pasar la noche en su cueva con otros de su especie. A medianoche, el gigante golpeó la cama del sastre con una barra de hierro, creyendo que lo mataría. Pero el joven, que había encontrado la cama demasiado grande y se había dormido en un rincón, salió ileso. Al verlo aparecer vivo por la mañana, los gigantes huyeron despavoridos, pensando que era un ser sobrenatural."
            },
            {
                text: "El sastre llegó finalmente al palacio de un gran Rey. Los soldados, al leer su banda, informaron al monarca que un guerrero invencible había llegado. El Rey, temeroso pero astuto, le ofreció la mano de su hija y la mitad de su reino si era capaz de realizar tres tareas imposibles."
            },
            {
                text: "La primera era derrotar a dos gigantes que aterrorizaban el bosque. El sastrecillo no los enfrentó con espada; esperó a que durmieran bajo un árbol y, trepado en las ramas, comenzó a lanzarles piedras pesadas. Los gigantes despertaron acusándose mutuamente de los golpes, hasta que se enzarzaron en una lucha tan feroz que ambos cayeron muertos."
            },
            {
                text: "La segunda tarea consistía en capturar a un unicornio que destrozaba las cosechas. El sastre se paró frente a un árbol y esperó a que la bestia cargara contra él. En el último segundo, el joven saltó a un lado y el cuerno del unicornio quedó clavado profundamente en el tronco."
            },
            {
                text: "La tercera prueba fue cazar a un jabalí salvaje. El sastre atrajo al animal hacia una pequeña capilla en el bosque; entró saltando por una ventana y, cuando el jabalí entró tras él, el joven volvió a saltar hacia afuera y cerró la puerta con llave."
            },
            {
                text: "El Rey, sin más excusas, tuvo que cumplir su promesa. El sastrecillo valiente, que solo armado con una aguja, un hilo y mucha inteligencia había derrotado a monstruos y reyes, se casó con la princesa. Y cuentan las crónicas que gobernó con justicia, pues sabía mejor que nadie que para vencer las dificultades de la vida, a veces un buen ingenio corta más que la espada más afilada."
            }
        ]
    },
    {
        id: 'rumpelstiltskin',
        title: 'Rumpelstiltskin',
        author: 'Hermanos Grimm',
        description: 'Un relato que advierte sobre los peligros de la vanidad y el extraño poder que reside en conocer el nombre verdadero de las cosas.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/rumpelstiltskin-cover.png',
        chipImage: '/images/storyteller/character-rumpelstiltskin.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-amber-600 to-yellow-900',
        content: [
            {
                text: "Hace mucho tiempo, vivía un molinero que era pobre en caudales pero rico en jactancia. Tenía una hija de una belleza extraordinaria y un ingenio agudo, y en un rapto de vanidad, el hombre le dijo al Rey: —\"Majestad, mi hija es tan habilidosa que es capaz de hilar la paja y convertirla en oro puro\"."
            },
            {
                text: "El Rey, que amaba el oro por encima de todas las cosas, ordenó que llevaran a la joven al palacio de inmediato. La encerró en una habitación llena de paja, le entregó una rueca y un carrete, y sentenció: —\"Si para mañana al amanecer no has convertido toda esta paja en oro, morirás\"."
            },
            {
                text: "La pobre muchacha, que no sabía nada de magia, rompió a llorar amargamente. De pronto, la puerta se abrió con un chasquido y apareció un hombrecillo de aspecto extravagante, con una nariz ganchuda y ropas de colores chillones. —\"¿Qué me darás si hilo la paja por ti?\", preguntó con una voz chillona. —\"Mi collar\", respondió la joven. El duende tomó el collar y, ñi-ñi-ñi, la rueca giró tres veces y el carrete se llenó de oro. Así siguió hasta que la habitación brillaba como el sol."
            },
            {
                text: "Al día siguiente, el Rey quedó maravillado, pero su codicia no tenía fin. La llevó a una habitación aún más grande. El duende apareció de nuevo y aceptó el trabajo a cambio del anillo de la joven. Pero a la tercera noche, el Rey la llevó a un salón colosal. —\"Si logras esto\", dijo el Rey, \"te convertiré en mi esposa\"."
            },
            {
                text: "Cuando el hombrecillo apareció, la joven ya no tenía nada que darle. —\"Prométeme que, si llegas a ser Reina, me entregarás a tu primer hijo\", exigió el duende. En su desesperación por sobrevivir, la joven aceptó. El duende hiló la paja, el Rey cumplió su palabra y la hija del molinero se convirtió en Reina."
            },
            {
                text: "Un año después, nació un hermoso príncipe. La Reina, sumida en su felicidad, había olvidado por completo la promesa, hasta que el hombrecillo apareció repentinamente en su alcoba. —\"He venido por lo que es mío\", reclamó. La Reina, horrorizada, le ofreció todas las riquezas del reino a cambio del niño, pero el duende se negó. Ante sus llantos, finalmente cedió un poco: —\"Te daré tres días. Si logras adivinar mi nombre, te quedarás con tu hijo\"."
            },
            {
                text: "La primera noche, la Reina enumeró todos los nombres comunes: \"Casper, Melchor, Baltasar\". El duende negaba con la cabeza. La segunda noche buscó nombres extraños: \"¿Pata de Palo?, ¿Barba de Chivo?, ¿Zanco Corto?\". Pero la respuesta siempre era: \"Ese no es mi nombre\"."
            },
            {
                text: "Desesperada, la Reina envió a un mensajero por todo el país. Al tercer día, el mensajero regresó con una noticia curiosa: —\"No he encontrado nombres nuevos, pero al pasar por una montaña boscosa, vi una casita pequeña. Frente a ella ardía una hoguera, y un hombrecillo ridículo saltaba sobre una pierna gritando: 'Hoy hiervo, mañana amaso, y el hijo de la Reina me llevo al paso. ¡Qué suerte que nadie sepa mi fin, que mi nombre es Rumpelstiltskin!'\"."
            },
            {
                text: "Cuando el duende apareció esa noche, la Reina fingió dudar. —\"¿Te llamas Juan?\". \"No\". \"¿Te llamas Pedro?\". \"No\". —\"Entonces... ¿no será tu nombre Rumpelstiltskin?\"."
            },
            {
                text: "El duende soltó un grito de rabia tan potente que la tierra tembló. —\"¡El diablo te lo ha dicho! ¡El diablo te lo ha dicho!\", chilló fuera de sí. Preso de la furia, pateó el suelo con tanta fuerza que su pierna derecha se hundió hasta la cintura. Luego, en su intento de salir, se agarró la pierna izquierda con ambas manos y se partió por la mitad. Nunca más se supo de él, y la Reina vivió feliz con su hijo, habiendo aprendido que el secreto más oscuro pierde su poder cuando se le llama por su nombre."
            }
        ],
        contentEn: [
            {
                text: "Long ago, there lived a miller who was poor in wealth but rich in boastfulness. He had a daughter of extraordinary beauty and sharp wit, and in a fit of vanity, the man told the King: \"Your Majesty, my daughter is so skillful that she can spin straw into pure gold.\""
            },
            {
                text: "The King, who loved gold above all things, ordered the young woman to be brought to the palace immediately. He locked her in a room full of straw, gave her a spinning wheel and a reel, and sentenced: \"If by tomorrow at dawn you have not spun all this straw into gold, you will die.\""
            },
            {
                text: "The poor girl, who knew nothing of magic, burst into bitter tears. Suddenly, the door opened with a click and an extravagant-looking little man appeared, with a hooked nose and gaudy clothes. \"What will you give me if I spin the straw for you?\" he asked in a shrill voice. \"My necklace,\" replied the girl. The goblin took the necklace and, whir-whir-whir, the spinning wheel turned three times and the reel was full of gold. So it went until the room shone like the sun."
            },
            {
                text: "The next day, the King was amazed, but his greed knew no bounds. He took her to an even larger room. The goblin appeared again and accepted the job in exchange for the girl's ring. But on the third night, the King took her to a colossal hall. \"If you accomplish this,\" said the King, \"I will make you my wife.\""
            },
            {
                text: "When the little man appeared, the girl had nothing left to give him. \"Promise me that, if you become Queen, you will give me your firstborn child,\" demanded the goblin. In her desperation to survive, the girl accepted. The goblin spun the straw, the King kept his word, and the miller's daughter became Queen."
            },
            {
                text: "A year later, a beautiful prince was born. The Queen, immersed in her happiness, had gathered completely the promise, until the little man suddenly appeared in her bedroom. \"I have come for what is mine,\" he claimed. The Queen, horrified, offered him all the riches of the kingdom in exchange for the child, but the goblin refused. Faced with her weeping, he finally yielded a little: \"I will give you three days. If you manage to guess my name, you will keep your child.\""
            },
            {
                text: "The first night, the Queen listed all the common names: \"Casper, Melchior, Balthasar.\" The goblin shook his head. The second night she looked for strange names: \"Pegleg? Goatbeard? Shortshanks?\" But the answer was always: \"That is not my name.\""
            },
            {
                text: "Desperate, the Queen sent a messenger throughout the country. On the third day, the messenger returned with curious news: \"I have not found new names, but passing through a wooded mountain, I saw a small house. In front of it burned a bonfire, and a ridiculous little man jumped on one leg shouting: 'Today I brew, tomorrow I bake, and the Queen's child I'll take. What luck that no one knows my aim, that Rumpelstiltskin is my name!'\""
            },
            {
                text: "When the goblin appeared that night, the Queen pretended to doubt. \"Is your name John?\" \"No.\" \"Is your name Peter?\" \"No.\" \"Then... could your name be Rumpelstiltskin?\""
            },
            {
                text: "The goblin let out a scream of rage so powerful that the earth trembled. \"The devil told you! The devil told you!\" he shrieked beside himself. Seized by fury, he stomped the ground so hard that his right leg sank up to his waist. Then, in his attempt to get out, he grabbed his left leg with both hands and tore himself in half. He was never heard of again, and the Queen lived happily with her son, having learned that the darkest secret loses its power when it is called by its name."
            }
        ],
        contentFr: [
            {
                text: "Il y a longtemps, vivait un meunier qui était pauvre en richesses mais riche en vantardise. Il avait une fille d'une beauté extraordinaire et à l'esprit vif, et dans un élan de vanité, l'homme dit au Roi : — \"Majesté, ma fille est si habile qu'elle est capable de filer la paille et de la transformer en or pur.\""
            },
            {
                text: "Le Roi, qui aimait l'or par-dessus tout, ordonna que la jeune femme soit amenée au palais immédiatement. Il l'enferma dans une pièce remplie de paille, lui donna un rouet et une bobine, et déclara : — \"Si demain à l'aube tu n'as pas transformé toute cette paille en or, tu mourras.\""
            },
            {
                text: "La pauvre fille, qui ne connaissait rien à la magie, éclata en sanglots amers. Soudain, la porte s'ouvrit avec un claquement et un petit homme à l'aspect extravagant apparut, avec un nez crochu et des vêtements aux couleurs criardes. — \"Que me donneras-tu si je file la paille pour toi ?\", demanda-t-il d'une voix perçante. — \"Mon collier\", répondit la jeune fille. Le lutin prit le collier et, ron-ron-ron, le rouet tourna trois fois et la bobine se remplit d'or. Cela continua ainsi jusqu'à ce que la pièce brille comme le soleil."
            },
            {
                text: "Le lendemain, le Roi fut émerveillé, mais son avidité n'avait pas de fin. Il l'emmena dans une pièce encore plus grande. Le lutin apparut de nouveau et accepta le travail en échange de la bague de la jeune fille. Mais la troisième nuit, le Roi la conduisit dans une salle colossale. — \"Si tu réussis cela\", dit le Roi, \"je ferai de toi mon épouse.\""
            },
            {
                text: "Lorsque le petit homme apparut, la jeune fille n'avait plus rien à lui donner. — \"Promets-moi que, si tu deviens Reine, tu me donneras ton premier enfant\", exigea le lutin. Dans son désespoir pour survivre, la jeune fille accepta. Le lutin fila la paille, le Roi tint sa parole et la fille du meunier devint Reine."
            },
            {
                text: "Un an plus tard, naquit un beau prince. La Reine, plongée dans son bonheur, avait complètement oublié la promesse, jusqu'à ce que le petit homme apparaisse soudainement dans sa chambre. — \"Je suis venu chercher ce qui est à moi\", réclama-t-il. La Reine, horrifiée, lui offrit toutes les richesses du royaume en échange de l'enfant, mais le lutin refusa. Face à ses pleurs, il finit par céder un peu : — \"Je te donnerai trois jours. Si tu parviens à deviner mon nom, tu garderas ton fils.\""
            },
            {
                text: "La première nuit, la Reine énuméra tous les noms communs : \"Gaspard, Melchior, Balthazar\". Le lutin secouait la tête. La deuxième nuit, elle chercha des noms étranges : \"Jambe-de-Bois ? Barbe-de-Bouc ? Courtes-Pattes ?\". Mais la réponse était toujours : \"Ce n'est pas mon nom.\""
            },
            {
                text: "Désespérée, la Reine envoya un messager à travers tout le pays. Le troisième jour, le messager revint avec une nouvelle curieuse : — \"Je n'ai pas trouvé de nouveaux noms, mais en passant par une montagne boisée, j'ai vu une petite maison. Devant elle brûlait un feu de joie, et un petit homme ridicule sautait sur une jambe en criant : 'Aujourd'hui je cuis, demain je brasse, et l'enfant de la Reine je prends à la passe. Quelle chance que personne ne sache ma fin, que mon nom est Rumpelstiltskin !'\""
            },
            {
                text: "Lorsque le lutin apparut cette nuit-là, la Reine fit semblant de douter. — \"T'appelles-tu Jean ?\". \"Non\". \"T'appelles-tu Pierre ?\". \"Non\". — \"Alors... ton nom ne serait-il pas Rumpelstiltskin ?\"."
            },
            {
                text: "Le lutin poussa un cri de rage si puissant que la terre trembla. — \"C'est le diable qui te l'a dit ! C'est le diable qui te l'a dit !\", hurla-t-il hors de lui. Pris de fureur, il frappa le sol avec tant de force que sa jambe droite s'enfonça jusqu'à la taille. Ensuite, en essayant de sortir, il saisit sa jambe gauche à deux mains et se déchira en deux. On n'entendit plus jamais parler de lui, et la Reine vécut heureuse avec son fils, ayant appris que le secret le plus sombre perd son pouvoir lorsqu'on l'appelle par son nom."
            }
        ],
        contentDe: [
            {
                text: "Vor langer Zeit lebte ein Müller, der arm an Geld, aber reich an Prahlerei war. Er hatte eine Tochter von außergewöhnlicher Schönheit und scharfem Verstand, und in einem Anfall von Eitelkeit sagte der Mann zum König: — \"Majestät, meine Tochter ist so geschickt, dass sie Stroh zu purem Gold spinnen kann.\""
            },
            {
                text: "Der König, der Gold über alles liebte, befahl, das junge Mädchen sofort in den Palast zu bringen. Er sperrte sie in einen Raum voller Stroh, gab ihr ein Spinnrad und eine Spule und urteilte: — \"Wenn du bis morgen früh nicht all dieses Stroh zu Gold gesponnen hast, musst du sterben.\""
            },
            {
                text: "Das arme Mädchen, das nichts von Magie wusste, brach in bittere Tränen aus. Plötzlich öffnete sich die Tür mit einem Klicken und ein extravagant aussehendes Männlein erschien, mit einer Hakennase und greller Kleidung. — \"Was gibst du mir, wenn ich das Stroh für dich spinne?\", fragte es mit schriller Stimme. — \"Mein Halsband\", antwortete das Mädchen. Der Kobold nahm das Halsband und, schnurr-schnurr-schnurr, drehte sich das Spinnrad dreimal und die Spule war voller Gold. So ging es weiter, bis der Raum wie die Sonne leuchtete."
            },
            {
                text: "Am nächsten Tag war der König erstaunt, aber seine Gier kannte keine Grenzen. Er brachte sie in einen noch größeren Raum. Der Kobold erschien wieder und nahm die Arbeit im Tausch gegen den Ring des Mädchens an. Aber in der dritten Nacht brachte der König sie in einen riesigen Saal. — \"Wenn du das schaffst\", sagte der König, \"werde ich dich zu meiner Frau machen.\""
            },
            {
                text: "Als das Männlein erschien, hatte das Mädchen nichts mehr, was es ihm geben konnte. — \"Versprich mir, dass du mir dein erstes Kind gibst, wenn du Königin wirst\", forderte der Kobold. In ihrer Verzweiflung, um zu überleben, willigte das Mädchen ein. Der Kobold spann das Stroh, der König hielt sein Wort und die Müllerstochter wurde Königin."
            },
            {
                text: "Ein Jahr später wurde ein wunderschöner Prinz geboren. Die Königin, versunken in ihr Glück, hatte das Versprechen völlig vergessen, bis das Männlein plötzlich in ihrem Gemach erschien. — \"Ich bin gekommen, um zu holen, was mir gehört\", forderte es. Die Königin, entsetzt, bot ihm alle Reichtümer des Königreichs im Tausch gegen das Kind an, aber der Kobold lehnte ab. Angesichts ihres Weinens gab er schließlich ein wenig nach: — \"Ich gebe dir drei Tage. Wenn du meinen Namen erraten kannst, darfst du dein Kind behalten.\""
            },
            {
                text: "In der ersten Nacht zählte die Königin alle gebräuchlichen Namen auf: \"Kaspar, Melchior, Balthasar\". Der Kobold schüttelte den Kopf. In der zweiten Nacht suchte sie nach seltsamen Namen: \"Rippenbiest? Hammelswade? Schnürbein?\" Aber die Antwort war immer: \"So heiße ich nicht.\""
            },
            {
                text: "Verzweifelt schickte die Königin einen Boten durch das ganze Land. Am dritten Tag kehrte der Bote mit einer seltsamen Nachricht zurück: — \"Ich habe keine neuen Namen gefunden, aber als ich durch einen bewaldeten Berg kam, sah ich ein kleines Haus. Davor brannte ein Feuer, und ein lächerliches Männlein sprang auf einem Bein und rief: 'Heute back ich, morgen brau ich, übermorgen hol ich der Königin ihr Kind. Ach, wie gut, dass niemand weiß, dass ich Rumpelstilzchen heiß!'\""
            },
            {
                text: "Als der Kobold in dieser Nacht erschien, tat die Königin so, als zweifle sie. — \"Heißt du Kunz?\". \"Nein\". \"Heißt du Heinz?\". \"Nein\". — \"Dann... heißt du vielleicht Rumpelstilzchen?\"."
            },
            {
                text: "Der Kobold stieß einen Schrei der Wut aus, der so gewaltig war, dass die Erde bebte. — \"Das hat dir der Teufel gesagt! Das hat dir der Teufel gesagt!\", kreischte er außer sich. Vor Wut stampfte er mit dem rechten Fuß so tief in die Erde, dass er bis zum Leib einsank. Dann packte er in seiner Wut den linken Fuß mit beiden Händen und riss sich selbst mitten entzwei. Nie wieder hörte man von ihm, und die Königin lebte glücklich mit ihrem Sohn und hatte gelernt, dass das dunkelste Geheimnis seine Macht verliert, wenn man es beim Namen nennt."
            }
        ]
    },
    {
        id: 'ali-baba',
        title: 'Alí Babá y los cuarenta ladrones',
        author: 'Las Mil y Una Noches',
        description: 'Una crónica de las mil y una noches sobre la fortuna, la envidia fratricida y la astucia de una mujer que salvó a toda una familia.',
        level: 'Difícil',
        age: '7+',
        coverImage: '/images/storyteller/alibaba-cover.png',
        chipImage: '/images/storyteller/character-alibaba.png',
        genre: 'Cuento popular',
        themeColor: 'from-orange-700 to-amber-900',
        content: [
            {
                text: "En una ciudad de Persia vivían dos hermanos: Cassim y Alí Babá. Cassim se había casado con una mujer rica y vivía en la opulencia, mientras que Alí Babá era un pobre leñador que apenas ganaba lo suficiente para alimentar a su esposa e hijos. Un día, mientras Alí Babá cortaba leña en un bosque espeso, vio una enorme nube de polvo que se acercaba. Temiendo que fueran bandidos, se ocultó entre las ramas de un árbol frondoso."
            },
            {
                text: "Desde su escondite, vio a cuarenta hombres armados hasta los dientes que se detenían frente a una roca colosal. El jefe de la banda se adelantó y, con voz potente, exclamó las palabras mágicas: —\"¡Sésamo, ábrete!\". Para asombro de Alí Babá, la roca se partió en dos, revelando una cueva profunda. Los ladrones entraron y, tras un tiempo, salieron cargando sacos vacíos. El jefe gritó: \"¡Sésamo, ciérrate!\", y la montaña volvió a ser una pared de piedra sólida."
            },
            {
                text: "Cuando los bandidos se alejaron, Alí Babá, movido por la curiosidad, se acercó a la roca y repitió las palabras. La cueva se abrió, revelando un tesoro capaz de cegar a cualquiera: montones de monedas de oro, lingotes de plata, sedas de China y perlas del tamaño de nueces. Alí Babá tomó solo lo que sus tres asnos podían cargar en sacos de monedas y regresó a casa."
            },
            {
                text: "Su esposa, asustada por tanta riqueza, quiso contar las monedas, pero eran demasiadas. Fue entonces a casa de su cuñada a pedir prestada una medida de grano para calcular el tesoro. La esposa de Cassim, sospechando de la repentina fortuna, puso un poco de grasa en el fondo de la medida. Cuando Alí Babá devolvió el recipiente, una moneda de oro se había quedado pegada."
            },
            {
                text: "Cassim, consumido por la envidia, obligó a su hermano a revelarle el secreto. A la mañana siguiente, Cassim partió con diez mulas hacia la cueva. Logró entrar gritando las palabras mágicas, pero una vez dentro, cegado por la codicia, olvidó la frase para salir. Probó con \"Cebada, ábrete\" y \"Trigo, ábrete\", pero la roca permaneció sellada. Cuando los ladrones regresaron, encontraron a Cassim y acabaron con su vida, dejando su cuerpo en la entrada como advertencia."
            },
            {
                text: "Alí Babá encontró el cuerpo de su hermano y lo llevó a casa. Para evitar que se supiera que habían descubierto el tesoro, su esclava, una joven llamada Morgana, ideó un plan brillante. Fue a buscar a un viejo zapatero, le vendó los ojos y lo llevó a la casa para que cosiera el cuerpo de Cassim de modo que pareciera que había muerto de causas naturales."
            },
            {
                text: "Sin embargo, los ladrones notaron que el cuerpo de su víctima había desaparecido y comprendieron que alguien más conocía el secreto. El jefe de los bandidos se disfrazó de mercader de aceite y llegó a casa de Alí Babá con treinta y ocho tinajas de cuero cargadas en mulas. En una tinaja había aceite, pero en las otras treinta y siete se escondían sus hombres, esperando la señal para salir y matar a todos."
            },
            {
                text: "Morgana, necesitando aceite para su lámpara, fue al patio. Al acercarse a una tinaja, escuchó un susurro: \"¿Ya es hora?\". Con una presencia de ánimo asombrosa, respondió en voz baja: \"Todavía no\". Comprendiendo el peligro, calentó el aceite de la única tinaja llena y lo vertió hirviendo en las demás, eliminando a los bandidos uno a uno."
            },
            {
                text: "Esa noche, durante la cena, el jefe de los ladrones intentó atacar a Alí Babá, pero Morgana, disfrazada de bailarina, realizó una danza con un puñal y, en un movimiento rápido, acabó con el criminal. Alí Babá, conmovido por la lealtad y el ingenio de la joven, le concedió la libertad y la casó con su hijo."
            },
            {
                text: "Desde entonces, el secreto de la cueva quedó en manos de la familia, quienes usaron la riqueza con sabiduría y generosidad, asegurando que el nombre de Alí Babá fuera recordado no por su suerte, sino por su bondad."
            }
        ],
        contentEn: [
            {
                text: "In a city of Persia lived two brothers: Cassim and Ali Baba. Cassim had married a rich woman and lived in opulence, while Ali Baba was a poor woodcutter who barely earned enough to feed his wife and children. One day, while Ali Baba was cutting wood in a thick forest, he saw a huge cloud of dust approaching. Fearing they were bandits, he hid among the branches of a leafy tree."
            },
            {
                text: "From his hiding place, he saw forty men armed to the teeth stopping in front of a colossal rock. The leader of the gang stepped forward and, with a powerful voice, exclaimed the magic words: \"Open sesame!\" To Ali Baba's amazement, the rock split in two, revealing a deep cave. The thieves entered and, after a while, came out carrying empty sacks. The leader shouted: \"Close sesame!\", and the mountain became a solid stone wall again."
            },
            {
                text: "When the bandits moved away, Ali Baba, moved by curiosity, approached the rock and repeated the words. The cave opened, revealing a treasure capable of blinding anyone: piles of gold coins, silver ingots, silks from China, and pearls the size of walnuts. Ali Baba took only what his three donkeys could carry in sacks of coins and returned home."
            },
            {
                text: "His wife, frightened by such wealth, wanted to count the coins, but there were too many. So she went to her sister-in-law's house to borrow a grain measure to calculate the treasure. Cassim's wife, suspecting the sudden fortune, put a little grease at the bottom of the measure. When Ali Baba returned the container, a gold coin had stuck to it."
            },
            {
                text: "Cassim, consumed by envy, forced his brother to reveal the secret. The next morning, Cassim set out with ten mules towards the cave. He managed to enter by shouting the magic words, but once inside, blinded by greed, he forgot the phrase to get out. He tried \"Open barley\" and \"Open wheat\", but the rock remained sealed. When the thieves returned, they found Cassim and ended his life, leaving his body at the entrance as a warning."
            },
            {
                text: "Ali Baba found his brother's body and took it home. To prevent it from being known that they had discovered the treasure, his slave, a young woman named Morgiana, devised a brilliant plan. She went to find an old cobbler, blindfolded him, and took him to the house to sew Cassim's body so that it would look like he had died of natural causes."
            },
            {
                text: "However, the thieves noticed that their victim's body had disappeared and understood that someone else knew the secret. The bandit leader disguised himself as an oil merchant and arrived at Ali Baba's house with thirty-eight leather jars loaded on mules. In one jar there was oil, but in the other thirty-seven his men were hiding, waiting for the signal to come out and kill everyone."
            },
            {
                text: "Morgiana, needing oil for her lamp, went to the courtyard. As she approached a jar, she heard a whisper: \"Is it time yet?\" With amazing presence of mind, she replied in a low voice: \"Not yet.\" Understanding the danger, she heated the oil from the only full jar and poured it boiling into the others, eliminating the bandits one by one."
            },
            {
                text: "That night, during dinner, the thief leader tried to attack Ali Baba, but Morgiana, disguised as a dancer, performed a dance with a dagger and, in a quick movement, ended the criminal. Ali Baba, moved by the young woman's loyalty and ingenuity, granted her freedom and married her to his son."
            },
            {
                text: "Since then, the secret of the cave remained in the hands of the family, who used the wealth with wisdom and generosity, ensuring that Ali Baba's name was remembered not for his luck, but for his kindness."
            }
        ],
        contentFr: [
            {
                text: "Dans une ville de Perse vivaient deux frères : Cassim et Ali Baba. Cassim avait épousé une femme riche et vivait dans l'opulence, tandis qu'Ali Baba était un pauvre bûcheron qui gagnait à peine de quoi nourrir sa femme et ses enfants. Un jour, alors qu'Ali Baba coupait du bois dans une forêt épaisse, il vit un énorme nuage de poussière s'approcher. Craignant que ce ne soient des bandits, il se cacha parmi les branches d'un arbre feuillu."
            },
            {
                text: "De sa cachette, il vit quarante hommes armés jusqu'aux dents s'arrêter devant un rocher colossal. Le chef de la bande s'avança et, d'une voix puissante, s'exclama les mots magiques : — \"Sésame, ouvre-toi !\" À la stupeur d'Ali Baba, le rocher se fendit en deux, révélant une grotte profonde. Les voleurs entrèrent et, après un moment, sortirent en portant des sacs vides. Le chef cria : \"Sésame, ferme-toi !\", et la montagne redevint un mur de pierre solide."
            },
            {
                text: "Lorsque les bandits s'éloignèrent, Ali Baba, poussé par la curiosité, s'approcha du rocher et répéta les mots. La grotte s'ouvrit, révélant un trésor capable d'aveugler n'importe qui : des tas de pièces d'or, des lingots d'argent, des soies de Chine et des perles de la taille de noix. Ali Baba ne prit que ce que ses trois ânes pouvaient porter dans des sacs de pièces et rentra chez lui."
            },
            {
                text: "Sa femme, effrayée par tant de richesse, voulut compter les pièces, mais il y en avait trop. Elle alla donc chez sa belle-sœur pour emprunter une mesure à grain afin de calculer le trésor. La femme de Cassim, soupçonnant la soudaine fortune, mit un peu de graisse au fond de la mesure. Lorsqu'Ali Baba rendit le récipient, une pièce d'or y était restée collée."
            },
            {
                text: "Cassim, rongé par l'envie, obligea son frère à lui révéler le secret. Le lendemain matin, Cassim partit avec dix mules vers la grotte. Il réussit à entrer en criant les mots magiques, mais une fois à l'intérieur, aveuglé par l'avidité, il oublia la phrase pour sortir. Il essaya \"Orge, ouvre-toi\" et \"Blé, ouvre-toi\", mais le rocher resta scellé. Lorsque les voleurs revinrent, ils trouvèrent Cassim et mirent fin à ses jours, laissant son corps à l'entrée comme avertissement."
            },
            {
                text: "Ali Baba trouva le corps de son frère et le ramena chez lui. Pour éviter que l'on sache qu'ils avaient découvert le trésor, son esclave, une jeune femme nommée Morgiane, conçut un plan brillant. Elle alla chercher un vieux cordonnier, lui banda les yeux et l'emmena à la maison pour qu'il recouse le corps de Cassim afin qu'il semble être mort de causes naturelles."
            },
            {
                text: "Cependant, les voleurs remarquèrent que le corps de leur victime avait disparu et comprirent que quelqu'un d'autre connaissait le secret. Le chef des bandits se déguisa en marchand d'huile et arriva chez Ali Baba avec trente-huit jarres en cuir chargées sur des mules. Dans une jarre il y avait de l'huile, mais dans les trente-sept autres se cachaient ses hommes, attendant le signal pour sortir et tuer tout le monde."
            },
            {
                text: "Morgiane, ayant besoin d'huile pour sa lampe, alla dans la cour. En s'approchant d'une jarre, elle entendit un chuchotement : \"Est-ce l'heure ?\" Avec une présence d'esprit étonnante, elle répondit à voix basse : \"Pas encore.\" Comprenant le danger, elle fit chauffer l'huile de la seule jarre pleine et la versa bouillante dans les autres, éliminant les bandits un par un."
            },
            {
                text: "Cette nuit-là, pendant le dîner, le chef des voleurs tenta d'attaquer Ali Baba, mais Morgiane, déguisée en danseuse, exécuta une danse avec un poignard et, dans un mouvement rapide, tua le criminel. Ali Baba, ému par la loyauté et l'ingéniosité de la jeune femme, lui accorda la liberté et la maria à son fils."
            },
            {
                text: "Depuis lors, le secret de la grotte resta entre les mains de la famille, qui utilisa la richesse avec sagesse et générosité, veillant à ce que le nom d'Ali Baba soit rappelé non pour sa chance, mais pour sa bonté."
            }
        ],
        contentDe: [
            {
                text: "In einer Stadt in Persien lebten zwei Brüder: Kasim und Ali Baba. Kasim hatte eine reiche Frau geheiratet und lebte in Opulenz, während Ali Baba ein armer Holzfäller war, der kaum genug verdiente, um seine Frau und Kinder zu ernähren. Eines Tages, als Ali Baba in einem dichten Wald Holz hackte, sah er eine riesige Staubwolke herankommen. Aus Angst, es könnten Banditen sein, versteckte er sich zwischen den Zweigen eines belaubten Baumes."
            },
            {
                text: "Von seinem Versteck aus sah er vierzig bis an die Zähne bewaffnete Männer, die vor einem riesigen Felsen anhielten. Der Anführer der Bande trat vor und rief mit gewaltiger Stimme die magischen Worte: — \"Sesam, öffne dich!\" Zum Erstaunen von Ali Baba spaltete sich der Felsen in zwei Teile und enthüllte eine tiefe Höhle. Die Diebe gingen hinein und kamen nach einer Weile mit leeren Säcken heraus. Der Anführer rief: \"Sesam, schließe dich!\", und der Berg wurde wieder zu einer festen Steinwand."
            },
            {
                text: "Als die Banditen wegzogen, näherte sich Ali Baba, getrieben von Neugier, dem Felsen und wiederholte die Worte. Die Höhle öffnete sich und enthüllte einen Schatz, der jeden blenden konnte: Haufen von Goldmünzen, Silberbarren, Seiden aus China und Perlen so groß wie Walnüsse. Ali Baba nahm nur das, was seine drei Esel in Münzsäcken tragen konnten, und kehrte nach Hause zurück."
            },
            {
                text: "Seine Frau, erschrocken über so viel Reichtum, wollte die Münzen zählen, aber es waren zu viele. Also ging sie zum Haus ihrer Schwägerin, um ein Getreidemaß zu leihen, um den Schatz zu berechnen. Kasims Frau, die das plötzliche Vermögen ahnte, tat ein wenig Fett auf den Boden des Maßes. Als Ali Baba den Behälter zurückgab, blieb eine Goldmünze daran kleben."
            },
            {
                text: "Kasim, verzehrt von Neid, zwang seinen Bruder, das Geheimnis zu verraten. Am nächsten Morgen machte sich Kasim mit zehn Maultieren auf den Weg zur Höhle. Es gelang ihm, durch Rufen der magischen Worte einzutreten, aber als er drinnen war, geblendet von Gier, vergaß er den Satz, um herauszukommen. Er versuchte \"Gerste, öffne dich\" und \"Weizen, öffne dich\", aber der Felsen blieb verschlossen. Als die Diebe zurückkehrten, fanden sie Kasim und beendeten sein Leben, indem sie seinen Körper als Warnung am Eingang zurückließen."
            },
            {
                text: "Ali Baba fand den Körper seines Bruders und brachte ihn nach Hause. Um zu verhindern, dass bekannt wurde, dass sie den Schatz entdeckt hatten, entwarf seine Sklavin, eine junge Frau namens Morgiana, einen brillanten Plan. Sie suchte einen alten Schuster, verband ihm die Augen und brachte ihn zum Haus, damit er Kasims Körper nähte, sodass es aussah, als wäre er eines natürlichen Todes gestorben."
            },
            {
                text: "Die Diebe bemerkten jedoch, dass der Körper ihres Opfers verschwunden war, und verstanden, dass jemand anderes das Geheimnis kannte. Der Banditenanführer verkleidete sich als Ölhändler und kam mit achtunddreißig auf Maultiere geladenen Lederkrügen zu Ali Babas Haus. In einem Krug war Öl, aber in den anderen siebenunddreißig versteckten sich seine Männer und warteten auf das Signal, herauszukommen und alle zu töten."
            },
            {
                text: "Morgiana, die Öl für ihre Lampe brauchte, ging in den Hof. Als sie sich einem Krug näherte, hörte sie ein Flüstern: \"Ist es schon Zeit?\" Mit erstaunlicher Geistesgegenwart antwortete sie mit leiser Stimme: \"Noch nicht.\" Sie erkannte die Gefahr, erhitzte das Öl aus dem einzigen vollen Krug und goss es kochend in die anderen, wodurch die Banditen einer nach dem anderen beseitigt wurden."
            },
            {
                text: "In dieser Nacht, während des Abendessens, versuchte der Räuberhauptmann, Ali Baba anzugreifen, aber Morgiana, als Tänzerin verkleidet, führte einen Tanz mit einem Dolch auf und beendete das Leben des Kriminellen mit einer schnellen Bewegung. Ali Baba, bewegt von der Loyalität und dem Einfallsreichtum der jungen Frau, schenkte ihr die Freiheit und verheiratete sie mit seinem Sohn."
            },
            {
                text: "Seitdem blieb das Geheimnis der Höhle in den Händen der Familie, die den Reichtum mit Weisheit und Großzügigkeit nutzte und dafür sorgte, dass Ali Babas Name nicht wegen seines Glücks, sondern wegen seiner Güte in Erinnerung blieb."
            }
        ]
    }
];
