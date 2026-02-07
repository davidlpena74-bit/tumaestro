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
    rating?: number;
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
        rating: 4.5,
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
        ],
        contentEn: [
            { text: "It was summer, and the region looked its kindest of the year. The wheat was already golden, the oats still green. The hay had been stacked in ricks on the fertile meadows, where the stork wandered with its red legs, chattering in Egyptian, the only language its mother had taught it. Around the field and meadows were great forests, in the center of which were deep lakes. And in the most desolate place of the region stood an old mansion surrounded by a deep moat." },
            { text: "Between the moat and the walls grew plants with large leaves, some wide enough for a child to stand under. And there among the leaves, as retired and hidden as in the depths of a jungle, a duck was brooding. The ducklings had to hatch very soon, but the mother felt very tired, for the task had already lasted too long." },
            { text: "Finally, one after another, the eggs began to crackle softly. 'Cheep, cheep' they said. The whole brood had just come into the world and was poking out their little heads. —Quack, quack —said the duck, and hearing her, the ducklings answered in chorus with their strongest voices. Their mother let them do as they pleased, for green is good for the eyes. —How big the world is! —said all the little ones." },
            { text: "The duck got up and looked around. —No, certainly not all of them are here yet. The biggest egg still remains to open. How long will it take? —she wondered, sitting back on the nest. An old duck came to visit. —Let me see that egg that takes so long to break —she said—. You can be sure it is not an egg of our species, but a turkey's. Leave it where it is." },
            { text: "Finally the egg that was taking so long to open began to crackle. —Peep, peep —said the newborn, and stumbled out of the shell. How big and ugly he was! The duck looked at him with disgust. 'The duck is of a monstrous size —she said—. Is it perhaps a turkey chick? Well, we won't take long to find out. To the water he will go, even if I have to kick him in myself'." },
            { text: "The next day dawned splendidly. Mama Duck went to the shore and plunged into the water. One after another the ducklings dived after her. Even that big, gray, ugly one swam too. —He is not a turkey —reflected the duck—. Look how well he handles his legs and how straight he holds himself. He is my own chick, after all, and not so bad looking if you look at him closely." },
            { text: "They all went to the farmyard. But there, the other ducks looked at them saying: —Look at that! Now we will have to put up with that whole tribe too. And, how ugly that duckling is! One cannot look at him. And a duck ran towards him and pecked him on the neck. —Leave him alone! —begged the mother—. He does no harm to anyone. —But he is so clumsy and weird that one feels like beating him —said the others." },
            { text: "So passed the first day; then things got worse and worse. There was no one who did not chase or push the poor duckling. Even his brothers said to him: —I wish the cat would catch you, you nasty thing! The ducks and chickens pecked at him, and the girl who brought them food pushed him aside. Until finally the duckling fled jumping over the fence." },
            { text: "He arrived at a vast swamp where wild ducks lived. He was so tired and sad that he stayed there. Difficult days passed, there were shots from hunters and huge dogs that scared him, but they didn't even want to bite him because he was so ugly. Then he arrived at a miserable little house where an old woman lived with a cat and a hen who believed they owned the world and treated him with disdain for not knowing how to lay eggs or purr." },
            { text: "The duckling decided to leave for the world again. Autumn came, the leaves turned brown and the cold increased. One day he saw a flock of beautiful white birds, swans, flying south. He had never seen anything so beautiful. He let out a strange cry upon seeing them, feeling mysteriously attracted to them. But winter came harshly and the duckling almost froze to death in the ice." },
            { text: "He survived the hard winter with many hardships. When the sun began to warm up again, the duckling was in a garden and saw three beautiful swans. 'I will fly to them —he told himself—, even if they peck me to death for being so ugly'. He threw himself into the water and swam towards them. He bowed his head awaiting death, but looking at the water he saw his own reflection." },
            { text: "He was not a gray and clumsy bird! He was a swan! The great swans swam around him and caressed him with their beaks. Some children who arrived shouted: 'There's a new one! He's the prettiest of all!'. The duckling felt full of joy, flapped his wings and raised his slender neck saying: 'I never imagined such happiness when I was the Ugly Duckling'." }
        ],
        contentFr: [
            { text: "C'était l'été, et la région avait son aspect le plus aimable de l'année. Le blé était déjà doré, l'avoine encore verte. Le foin avait été empilé en meules sur les prairies fertiles, où la cigogne déambulait sur ses pattes rouges, bavardant en égyptien, seule langue que sa mère lui avait apprise. Autour des champs et des prairies, on voyait de grandes forêts, au centre desquelles se trouvaient des lacs profonds. Et dans l'endroit le plus désolé de la contrée se dressait un vieux manoir entouré d'un fossé profond." },
            { text: "Entre le fossé et les murs poussaient des plantes aux grandes feuilles, certaines assez larges pour qu'un enfant puisse se tenir dessous. Et là, parmi les feuilles, aussi retirée et cachée que dans les profondeurs d'une jungle, une cane couvait. Les canetons devaient éclore très bientôt, mais la mère se sentait très fatiguée, car la tâche durait déjà depuis trop longtemps." },
            { text: "Enfin, l'un après l'autre, les œufs commencèrent à craquer doucement. 'Pip, pip' dirent-ils. Toute la couvée venait de venir au monde et pointait ses petites têtes. —Coin, coin —dit la cane, et en l'entendant, les canetons répondirent en chœur de leurs voix les plus fortes. Leur mère les laissait faire, car le vert est bon pour les yeux. —Que le monde est grand ! —dirent tous les petits." },
            { text: "La cane se leva et regarda autour d'elle. —Non, ils ne sont certainement pas tous là encore. Le plus gros œuf reste encore à s'ouvrir. Combien de temps cela prendra-t-il ? —se demanda-t-elle en se rasseyant sur le nid. Une vieille cane vint en visite. —Laisse-moi voir cet œuf qui tarde à éclore —dit-elle—. Tu peux être sûre que ce n'est pas un œuf de notre espèce, mais celui d'une dinde. Laisse-le où il est." },
            { text: "Enfin, l'œuf qui tardait à s'ouvrir commença à craquer. —Pip, pip —dit le nouveau-né, et il sortit de la coquille en titubant. Comme il était grand et laid ! La cane le regarda avec dégoût. 'Le canard est d'une taille monstrueuse —dit-elle—. Serait-ce un dindonneau ? Eh bien, nous ne tarderons pas à le savoir. Il ira à l'eau, même si je dois l'y pousser moi-même'." },
            { text: "Le lendemain se leva splendide. Maman cane alla au bord de l'eau et plongea. L'un après l'autre, les canetons plongèrent derrière elle. Même ce grand gris et laid nagea aussi. —Ce n'est pas une dinde —réfléchit la cane—. Regardez comme il se sert bien de ses pattes et comme il se tient droit. C'est mon propre petit, après tout, et pas si mal fait si on le regarde bien." },
            { text: "Ils allèrent tous à la basse-cour. Mais là, les autres canards les regardaient en disant : —Regardez ça ! Maintenant, nous devrons supporter aussi toute cette tribu. Et qu'il est laid, ce caneton ! On ne peut pas le regarder. Et un canard courut vers lui et lui donna un coup de bec dans le cou. —Laisse-le tranquille ! —supplia la mère—. Il ne fait de mal à personne. —Mais il est si maladroit et bizarre qu'on a envie de le battre —dirent les autres." },
            { text: "Ainsi passa le premier jour ; ensuite, les choses allèrent de mal en pis. Il n'y avait personne qui ne poursuivait ou ne bousculait le pauvre caneton. Même ses frères lui disaient : —Je voudrais que le chat t'attrape, espèce d'antipathique ! Les canards et les poules le picoraient, et la fille qui leur apportait la nourriture le poussait de côté. Jusqu'à ce qu'enfin le caneton s'enfuie en sautant par-dessus la clôture." },
            { text: "Il arriva dans un vaste marais où vivaient des canards sauvages. Il était si fatigué et triste qu'il y resta. Des jours difficiles passèrent, il y eut des coups de feu de chasseurs et d'énormes chiens qui l'effrayèrent, mais ils ne voulurent même pas le mordre parce qu'il était si laid. Ensuite, il arriva dans une misérable petite maison où vivaient une vieille femme avec un chat et une poule qui croyaient posséder le monde et le traitaient avec dédain parce qu'il ne savait ni pondre des œufs ni ronronner." },
            { text: "Le caneton décida de repartir à travers le monde. L'automne arriva, les feuilles devinrent brunes et le froid augmenta. Un jour, il vit une volée de beaux oiseaux blancs, des cygnes, volant vers le sud. Il n'avait jamais rien vu d'aussi beau. Il poussa un cri étrange en les voyant, se sentant mystérieusement attiré vers eux. Mais l'hiver arriva avec rudesse et le caneton faillit mourir gelé dans la glace." },
            { text: "Il survécut au dur hiver avec beaucoup de peines. Lorsque le soleil commença à chauffer à nouveau, le caneton était dans un jardin et vit trois beaux cygnes. 'Je volerai vers eux —se dit-il—, même s'ils me tuent à coups de bec parce que je suis si laid'. Il se jeta à l'eau et nagea vers eux. Il inclina la tête attendant la mort, mais en regardant l'eau, il vit son propre reflet." },
            { text: "Ce n'était pas un oiseau gris et maladroit ! C'était un cygne ! Les grands cygnes nagèrent autour de lui et le caressèrent de leur bec. Des enfants qui arrivèrent crièrent : 'Il y en a un nouveau ! C'est le plus beau de tous !'. Le caneton se sentit plein de joie, battit des ailes et dressa son cou svelte en disant : 'Je n'ai jamais imaginé un tel bonheur quand j'étais le Vilain Petit Canard'." }
        ],
        contentDe: [
            { text: "Es war Sommer, und die Gegend zeigte sich von ihrer freundlichsten Seite. Der Weizen war schon golden, der Hafer noch grün. Das Heu war auf den fruchtbaren Wiesen zu Schobern aufgetürmt worden, wo der Storch auf seinen roten Beinen umherstolzierte und Ägyptisch plapperte, die einzige Sprache, die seine Mutter ihm beigebracht hatte. Um Felder und Wiesen herum gab es große Wälder, in deren Mitte tiefe Seen lagen. Und an dem einsamsten Ort der Gegend stand ein altes Herrenhaus, umgeben von einem tiefen Wassergraben." },
            { text: "Zwischen dem Graben und den Mauern wuchsen Pflanzen mit großen Blättern, einige breit genug, damit ein Kind darunter stehen konnte. Und dort zwischen den Blättern, so zurückgezogen und versteckt wie in den Tiefen eines Dschungels, brütete eine Ente. Die Entenküken mussten sehr bald schlüpfen, aber die Mutter fühlte sich sehr müde, denn die Aufgabe dauerte schon zu lange." },
            { text: "Schließlich, eines nach dem anderen, begannen die Eier leise zu knacken. 'Piep, piep', sagten sie. Die ganze Brut war gerade auf die Welt gekommen und streckte ihre kleinen Köpfchen heraus. —Quak, quak —sagte die Ente, und als sie sie hörten, antworteten die Entenküken im Chor mit ihren kräftigsten Stimmen. Ihre Mutter ließ sie gewähren, denn Grün ist gut für die Augen. —Wie groß die Welt ist! —sagten all die Kleinen." },
            { text: "Die Ente stand auf und sah sich um. —Nein, sicher sind noch nicht alle da. Das größte Ei muss sich noch öffnen. Wie lange wird das noch dauern? —fragte sie sich und setzte sich wieder auf das Nest. Eine alte Ente kam zu Besuch. —Lass mich das Ei sehen, das so lange braucht, um zu brechen —sagte sie—. Du kannst sicher sein, dass es kein Ei unserer Art ist, sondern das eines Truthahns. Lass es, wo es ist." },
            { text: "Schließlich begann das Ei, das so lange brauchte, um sich zu öffnen, zu knacken. —Piep, piep —sagte das Neugeborene und taumelte aus der Schale. Wie groß und hässlich es war! Die Ente sah es mit Abscheu an. 'Die Ente hat eine monströse Größe —sagte sie—. Ist es vielleicht ein Truthahnküken? Nun, wir werden nicht lange brauchen, um es herauszufinden. Ins Wasser wird es gehen, und wenn ich es selbst hineinkicken muss'." },
            { text: "Der nächste Tag begann prächtig. Mama Ente ging zum Ufer und stürzte sich ins Wasser. Eines nach dem anderen tauchten die Entenküken hinter ihr ein. Sogar das große, graue, hässliche schwamm auch. —Es ist kein Truthahn —dachte die Ente—. Schau, wie gut es seine Beine benutzt und wie gerade es sich hält. Es ist doch mein eigenes Küken, und gar nicht so übel aussehend, wenn man es genau betrachtet." },
            { text: "Sie gingen alle zum Bauernhof. Aber dort sahen die anderen Enten sie an und sagten: —Seht euch das an! Jetzt müssen wir auch noch diesen ganzen Stamm ertragen. Und wie hässlich dieses Entlein ist! Man kann es nicht ansehen. Und eine Ente rannte auf es zu und hackte es in den Nacken. —Lass es in Ruhe! —flehte die Mutter—. Es tut niemandem etwas zuleide. —Aber es ist so ungeschickt und seltsam, dass man Lust hat, es zu schlagen —sagten die anderen." },
            { text: "So verging der erste Tag; dann wurden die Dinge immer schlimmer. Es gab niemanden, der das arme Entlein nicht jagte oder schubste. Sogar seine Brüder sagten zu ihm: —Ich wünschte, die Katze würde dich fangen, du Ekelpaket! Die Enten und Hühner hackten auf es ein, und das Mädchen, das ihnen das Futter brachte, schob es zur Seite. Bis das Entlein schließlich floh, indem es über den Zaun sprang." },
            { text: "Es kam zu einem riesigen Sumpf, wo wilde Enten lebten. Es war so müde und traurig, dass es dort blieb. Es vergingen schwere Tage, es gab Schüsse von Jägern und riesige Hunde, die es erschreckten, aber sie wollten es nicht einmal beißen, weil es so hässlich war. Dann kam es zu einem armseligen kleinen Haus, wo eine alte Frau mit einer Katze und einem Huhn lebte, die glaubten, die Welt zu besitzen, und es mit Verachtung behandelten, weil es keine Eier legen oder schnurren konnte." },
            { text: "Das Entlein beschloss, wieder in die Welt hinauszuziehen. Der Herbst kam, die Blätter wurden braun und die Kälte nahm zu. Eines Tages sah es einen Schwarm wunderschöner weißer Vögel, Schwäne, nach Süden fliegen. Es hatte noch nie etwas so Schönes gesehen. Es stieß einen seltsamen Schrei aus, als es sie sah, und fühlte sich auf mysteriöse Weise zu ihnen hingezogen. Aber der Winter kam mit Härte und das Entlein erfror fast im Eis." },
            { text: "Es überlebte den harten Winter mit vielen Nöten. Als die Sonne wieder zu wärmen begann, war das Entlein in einem Garten und sah drei wunderschöne Schwäne. 'Ich werde zu ihnen fliegen —sagte es sich—, auch wenn sie mich zu Tode hacken, weil ich so hässlich bin'. Es warf sich ins Wasser und schwamm auf sie zu. Es senkte den Kopf und erwartete den Tod, aber als es ins Wasser blickte, sah es sein eigenes Spiegelbild." },
            { text: "Es war kein grauer und plumper Vogel! Es war ein Schwan! Die großen Schwäne schwammen um es herum und streichelten es mit ihren Schnäbeln. Einige Kinder, die ankamen, riefen: 'Da ist ein neuer! Er ist der schönste von allen!'. Das Entlein fühlte sich voller Freude, schlug mit den Flügeln und hob seinen schlanken Hals und sagte: 'Ich habe mir nie solches Glück vorgestellt, als ich das hässliche Entlein war'." }
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
        rating: 4.8,
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
        rating: 4.2,
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
        ],
        contentEn: [
            { text: "Once upon a time there was a miller who had three sons, his mill, a donkey and a cat. The sons had to grind, the donkey had to carry the grain and the cat had to catch mice. When the miller died, the sons divided the inheritance: the eldest took the mill, the second the donkey and the third got the cat. The young man became sad: 'What am I going to do with a cat? If I make some gloves with his skin, I will have nothing left'." },
            { text: "-Listen -said the cat, who had understood everything-, you must not kill me. Order a pair of boots made for me so that I can go out and people can see me, and you will soon get help. The young man was amazed that the cat spoke, but he called the shoemaker to measure him. When they were ready, the cat put them on, took a sack with grain and went out the door walking on two legs as if he were a person." },
            { text: "He arrived at the forest, scattered the grain in the sack and hid. Soon he caught several partridges, the King's favorite delicacy, which no one could catch. He went to the palace and said: 'My lord the count sends his respects to the king and sends him these partridges'. The King, delighted with the gift, ordered the cat's sack to be filled with all the gold he could carry. The cat returned and scattered the gold before his master: 'Here is something in exchange for the boots'." },
            { text: "The cat continued to bring gifts to the palace every day, and the King came to appreciate him very much. One day, he learned that the King and the Princess would go to the lake. He ran home and told his master: 'If you want to be rich, come to the lake and bathe'. While the young man was bathing, the cat hid his clothes. When the King passed, the cat shouted: 'Help! My lord the count has been robbed of his clothes!'. The King ordered his best finery to be brought to dress the young man." },
            { text: "Dressed in royal clothes, the young man looked like a nobleman and the Princess was charmed. The King invited him to the carriage. The cat went ahead and ordered all the peasants: 'If the King asks, say that these meadows and wheat fields belong to the count, or you will die!'. When the King passed and asked, everyone replied: 'They belong to the lord count!'. The King was amazed: 'Great and beautiful lands you have, count'." },
            { text: "The cat finally arrived at the palace of a great wizard capable of transforming himself into any animal. He entered boldly and told him: 'I have heard that you can transform yourself into an elephant or lion, but surely you cannot turn yourself into something as small as a mouse'. The wizard, wounded in his pride, immediately transformed into a mouse. It was what the cat was waiting for! With a leap he caught him and ate him in one bite." },
            { text: "When the royal carriage arrived at the castle, the cat came out to greet them: 'Welcome to the palace of my lord the count!'. The King marveled at the magnificent building, which was more beautiful than his own palace. That day, the King promised his daughter's hand to the young man. When the monarch died, the count became King and the puss in boots his Prime Minister, living happily ever after." }
        ],
        contentFr: [
            { text: "Il était une fois un meunier qui avait trois fils, son moulin, un âne et un chat. Les fils devaient moudre, l'âne devait porter le grain et le chat devait chasser les souris. Lorsque le meunier mourut, les fils se partagèrent l'héritage : l'aîné le moulin, le second l'âne et le troisième eut le chat. Le jeune homme s'attrista : 'Que vais-je faire avec un chat ? Si je me fais des gants avec sa peau, il ne me restera plus rien'." },
            { text: "-Écoute -dit le chat, qui avait tout compris-, tu ne dois pas me tuer. Commande qu'on me fasse une paire de bottes pour que je puisse sortir et que les gens me voient, et tu auras bientôt de l'aide. Le jeune homme fut étonné que le chat parle, mais il appela le cordonnier pour qu'il prenne ses mesures. Quand elles furent prêtes, le chat les chaussa, prit un sac avec du grain et sortit par la porte en marchant sur deux pattes comme s'il était une personne." },
            { text: "Il arriva dans la forêt, éparpilla le grain dans le sac et se cacha. Bientôt, il captura plusieurs perdrix, le mets favori du Roi, que personne ne pouvait attraper. Il alla au palais et dit : 'Monseigneur le comte présente ses respects au roi et lui envoie ces perdrix'. Le Roi, enchanté par le cadeau, fit remplir le sac du chat avec tout l'or qu'il pouvait porter. Le chat revint et éparpilla l'or devant son maître : 'Voici quelque chose en échange des bottes'." },
            { text: "Le chat continua d'apporter des cadeaux au palais chaque jour, et le Roi finit par l'apprécier beaucoup. Un jour, il apprit que le Roi et la Princesse iraient au lac. Il courut à la maison et dit à son maître : 'Si tu veux être riche, viens au lac et baigne-toi'. Pendant que le jeune homme se baignait, le chat cacha ses vêtements. Quand le Roi passa, le chat cria : 'Au secours ! On a volé les vêtements de monseigneur le comte !'. Le Roi ordonna d'apporter ses plus beaux atours pour habiller le jeune homme." },
            { text: "Vêtu d'habits royaux, le jeune homme ressemblait à un noble et la Princesse fut charmée. Le Roi l'invita dans le carrosse. Le chat prit les devants et ordonna à tous les paysans : 'Si le Roi demande, dites que ces prés et champs de blé appartiennent au comte, ou vous mourrez !'. Quand le Roi passa et demanda, tous répondirent : 'Ils sont à monseigneur le comte !'. Le Roi était étonné : 'Vous avez de grandes et belles terres, comte'." },
            { text: "Le chat arriva finalement au palais d'un grand magicien capable de se transformer en n'importe quel animal. Il entra avec audace et lui dit : 'J'ai entendu dire que tu peux te transformer en éléphant ou en lion, mais tu ne peux sûrement pas te changer en quelque chose d'aussi petit qu'une souris'. Le magicien, blessé dans son orgueil, se transforma immédiatement en souris. C'était ce que le chat attendait ! D'un bond, il l'attrapa et le mangea d'une bouchée." },
            { text: "Lorsque le carrosse royal arriva au château, le chat sortit pour les accueillir : 'Bienvenue au palais de monseigneur le comte !'. Le Roi s'émerveilla devant le magnifique bâtiment, qui était plus beau que son propre palais. Ce jour-là, le Roi promit la main de sa fille au jeune homme. Lorsque le monarque mourut, le comte devint Roi et le chat botté son Premier Ministre, vivant heureux pour toujours." }
        ],
        contentDe: [
            { text: "Es war einmal ein Müller, der drei Söhne, seine Mühle, einen Esel und einen Kater hatte. Die Söhne mussten mahlen, der Esel musste das Korn tragen und der Kater musste Mäuse fangen. Als der Müller starb, teilten die Söhne das Erbe auf: der Älteste die Mühle, der Zweite den Esel und dem Dritten blieb der Kater. Der junge Mann wurde traurig: 'Was soll ich mit einem Kater anfangen? Wenn ich mir aus seinem Fell Handschuhe mache, bleibt mir nichts übrig'." },
            { text: "-Hör zu -sagte der Kater, der alles verstanden hatte-, du darfst mich nicht töten. Lass mir ein Paar Stiefel machen, damit ich ausgehen kann und die Leute mich sehen, und du wirst bald Hilfe bekommen. Der junge Mann staunte, dass der Kater sprach, aber er rief den Schuster, damit er Maß nahm. Als sie fertig waren, zog der Kater sie an, nahm einen Sack mit Korn und ging zur Tür hinaus, auf zwei Beinen gehend, als wäre er ein Mensch." },
            { text: "Er kam in den Wald, streute das Korn in den Sack und versteckte sich. Bald fing er mehrere Rebhühner, die Lieblingsspeise des Königs, die niemand fangen konnte. Er ging zum Palast und sagte: 'Mein Herr, der Graf, entbietet dem König seine Grüße und schickt ihm diese Rebhühner'. Der König, erfreut über das Geschenk, ließ den Sack des Katers mit allem Gold füllen, das er tragen konnte. Der Kater kehrte zurück und streute das Gold vor seinem Herrn aus: 'Hier hast du etwas im Tausch für die Stiefel'." },
            { text: "Der Kater brachte weiterhin jeden Tag Geschenke zum Palast, und der König lernte ihn sehr schätzen. Eines Tages erfuhr er, dass der König und die Prinzessin zum See gehen würden. Er rannte nach Hause und sagte zu seinem Herrn: 'Wenn du reich werden willst, komm zum See und bade'. Während der junge Mann badete, versteckte der Kater seine Kleidung. Als der König vorbeikam, rief der Kater: 'Hilfe! Meinem Herrn Grafen wurden die Kleider gestohlen!'. Der König befahl, seine besten Gewänder zu bringen, um den jungen Mann zu kleiden." },
            { text: "In königliche Kleider gekleidet, sah der junge Mann wie ein Adliger aus und die Prinzessin war bezaubert. Der König lud ihn in die Kutsche ein. Der Kater lief voraus und befahl allen Bauern: 'Wenn der König fragt, sagt, dass diese Wiesen und Weizenfelder dem Grafen gehören, oder ihr werdet sterben!'. Als der König vorbeikam und fragte, antworteten alle: 'Sie gehören dem Herrn Grafen!'. Der König war erstaunt: 'Große und schöne Ländereien habt Ihr, Graf'." },
            { text: "Der Kater kam schließlich zum Palast eines großen Zauberers, der sich in jedes Tier verwandeln konnte. Er trat dreist ein und sagte zu ihm: 'Ich habe gehört, dass du dich in einen Elefanten oder Löwen verwandeln kannst, aber sicher kannst du dich nicht in etwas so Kleines wie eine Maus verwandeln'. Der Zauberer, in seinem Stolz verletzt, verwandelte sich sofort in eine Maus. Das war es, worauf der Kater gewartet hatte! Mit einem Sprung fing er sie und fraß sie mit einem Bissen." },
            { text: "Als die königliche Kutsche am Schloss ankam, kam der Kater heraus, um sie zu begrüßen: 'Willkommen im Palast meines Herrn Grafen!'. Der König staunte über das prächtige Gebäude, das schöner war als sein eigener Palast. An diesem Tag versprach der König dem jungen Mann die Hand seiner Tochter. Als der Monarch starb, wurde der Graf König und der gestiefelte Kater sein Premierminister und sie lebten glücklich bis ans Ende ihrer Tage." }
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
        rating: 4.0,
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
        ],
        contentEn: [
            { text: "Once upon a time there was a woodcutter and a woodcutter's wife who had seven sons. They were very poor and their children were a heavy burden. The youngest of them was very tiny and when he came into the world he was no fatter than a thumb, so they called him Tom Thumb. Although he spoke little, he was the sharpest of his brothers and listened a lot to everything that happened at home." },
            { text: "A year of famine came and the parents, desperate, decided to leave the children in the forest. Tom Thumb heard the plan hiding under his father's stool. Without saying anything, he got up at dawn and went to the stream to fill his pockets with white pebbles. When they took them to the forest and their parents fled, Tom Thumb guided his brothers back following the trail of stones." },
            { text: "The parents were happy to see them, but soon money was lacking again and they decided to lose them again, this time further away. Tom Thumb, who could not collect stones because the door was locked, used breadcrumbs to mark the path. But when trying to return, he discovered with horror that the birds had eaten all the crumbs. They were lost in the deepest and darkest part of the forest." },
            { text: "After walking a lot in the rain, Tom Thumb spotted a light from the top of a tree. They arrived at a house where a woman warned them: 'Flee! An ogre who eats children lives here'. Tom Thumb begged for shelter, for they feared the wolves of the forest more. The woman hid them under the bed, but when the ogre arrived, he shouted: 'I smell fresh meat!', and it didn't take long for him to discover them." },
            { text: "The ogress convinced the ogre to wait until morning to eat them. She sent them to sleep in the room where her seven daughters were, each with a gold crown. Tom Thumb, fearing a night attack, exchanged the girls' crowns for his brothers' caps. In the middle of the night, the ogre entered in the dark and, touching the caps, killed his own daughters by mistake. The children took the opportunity to flee." },
            { text: "Upon waking up and seeing what had happened, the ogre put on his seven-league boots to hunt them down. Tom Thumb saw the giant jump from mountain to mountain and hid his brothers in a hollow rock. The ogre, tired, sat down to rest on that same rock and fell into a deep sleep. Tom Thumb took the opportunity to take off the magic boots, which fit his feet perfectly as they were enchanted." },
            { text: "With the boots on, Tom Thumb returned to the ogre's house and tricked the woman into telling her that thieves were demanding all her gold to release her husband. The woman gave him all her riches. Tom Thumb returned home loaded with gold, saving his family from misery forever. He bought land for his parents and brothers, proving that size doesn't matter when you have a big heart and intelligence." }
        ],
        contentFr: [
            { text: "Il était une fois un bûcheron et une bûcheronne qui avaient sept garçons. Ils étaient très pauvres et leurs enfants étaient une lourde charge. Le plus jeune d'entre eux était très petit et quand il vint au monde, il n'était pas plus gros qu'un pouce, c'est pourquoi on l'appela le Petit Poucet. Bien qu'il parlât peu, il était le plus fin de ses frères et écoutait beaucoup tout ce qui se passait à la maison." },
            { text: "Une année de famine survint et les parents, désespérés, décidèrent de laisser les enfants dans la forêt. Le Petit Poucet entendit le plan caché sous le tabouret de son père. Sans rien dire, il se leva à l'aube et alla au ruisseau pour remplir ses poches de cailloux blancs. Lorsqu'ils les emmenèrent dans la forêt et que leurs parents s'enfuirent, le Petit Poucet guida ses frères au retour en suivant la trace des pierres." },
            { text: "Les parents furent heureux de les voir, mais bientôt l'argent manqua à nouveau et ils décidèrent de les perdre encore une fois, cette fois plus loin. Le Petit Poucet, qui ne put ramasser de pierres car la porte était fermée à clé, utilisa des miettes de pain pour marquer le chemin. Mais en essayant de revenir, il découvrit avec horreur que les oiseaux avaient mangé toutes les miettes. Ils étaient perdus au plus profond et au plus sombre de la forêt." },
            { text: "Après avoir beaucoup marché sous la pluie, le Petit Poucet aperçut une lumière du haut d'un arbre. Ils arrivèrent à une maison où une femme les avertit : 'Fuyez ! Un ogre qui mange les enfants vit ici'. Le Petit Poucet supplia qu'on les héberge, car ils craignaient plus les loups de la forêt. La femme les cacha sous le lit, mais quand l'ogre arriva, il cria : 'Je sens la chair fraîche !', et ne tarda pas à les découvrir." },
            { text: "L'ogresse convainquit l'ogre d'attendre le matin pour les manger. Elle les envoya dormir dans la chambre où se trouvaient ses sept filles, chacune avec une couronne d'or. Le Petit Poucet, craignant une attaque nocturne, échangea les couronnes des filles contre les bonnets de ses frères. Au milieu de la nuit, l'ogre entra dans l'obscurité et, touchant les bonnets, tua ses propres filles par erreur. Les enfants en profitèrent pour s'enfuir." },
            { text: "En se réveillant et en voyant ce qui s'était passé, l'ogre chaussa ses bottes de sept lieues pour les prendre en chasse. Le Petit Poucet vit le géant sauter de montagne en montagne et cacha ses frères dans un rocher creux. L'ogre, fatigué, s'assit pour se reposer sur ce même rocher et tomba dans un profond sommeil. Le Petit Poucet en profita pour lui enlever les bottes magiques, qui s'ajustèrent parfaitement à ses pieds car elles étaient enchantées." },
            { text: "Bottes aux pieds, le Petit Poucet retourna à la maison de l'ogre et trompa la femme en lui disant que des voleurs exigeaient tout son or pour libérer son mari. La femme lui donna toutes ses richesses. Le Petit Poucet rentra chez lui chargé d'or, sauvant sa famille de la misère pour toujours. Il acheta des terres pour ses parents et ses frères, prouvant que la taille ne compte pas quand on a un grand cœur et de l'intelligence." }
        ],

        contentDe: [
            { text: "Es war einmal ein Holzfäller und eine Holzfällerin, die sieben Söhne hatten. Sie waren sehr arm und ihre Kinder waren eine schwere Last. Der Jüngste von ihnen war sehr winzig und als er auf die Welt kam, war er nicht dicker als ein Daumen, weshalb sie ihn Däumling nannten. Obwohl er wenig sprach, war er der Klügste seiner Brüder und hörte viel von allem, was im Haus geschah." },
            { text: "Es kam ein Jahr der Hungersnot und die Eltern, verzweifelt, beschlossen, die Kinder im Wald zu lassen. Däumling hörte den Plan, als er unter dem Schemel seines Vaters versteckt war. Ohne etwas zu sagen, stand er im Morgengrauen auf und ging zum Bach, um seine Taschen mit weißen Kieselsteinen zu füllen. Als sie sie in den Wald brachten und ihre Eltern flohen, führte Däumling seine Brüder zurück, indem er der Spur der Steine folgte." },
            { text: "Die Eltern freuten sich, sie zu sehen, aber bald fehlte das Geld wieder und sie beschlossen, sie erneut zu verlieren, diesmal noch weiter weg. Däumling, der keine Steine sammeln konnte, weil die Tür verschlossen war, benutzte Brotkrumen, um den Weg zu markieren. Aber als er versuchte zurückzukehren, entdeckte er mit Entsetzen, dass die Vögel alle Krümel gefressen hatten. Sie waren im tiefsten und dunkelsten Teil des Waldes verloren." },
            { text: "Nachdem sie lange im Regen gelaufen waren, erblickte Däumling ein Licht von der Spitze eines Baumes. Sie kamen zu einem Haus, wo eine Frau sie warnte: 'Flieht! Hier wohnt ein Menschenfresser, der Kinder isst'. Däumling flehte um Unterschlupf, denn sie fürchteten die Wölfe des Waldes mehr. Die Frau versteckte sie unter dem Bett, aber als der Menschenfresser kam, rief er: 'Ich rieche frisches Fleisch!', und es dauerte nicht lange, bis er sie entdeckte." },
            { text: "Die Frau des Menschenfressers überzeugte ihn, bis zum Morgen zu warten, um sie zu essen. Sie schickte sie zum Schlafen in das Zimmer, wo ihre sieben Töchter waren, jede mit einer Goldkrone. Däumling, der einen nächtlichen Angriff fürchtete, tauschte die Kronen der Mädchen gegen die Mützen seiner Brüder aus. Mitten in der Nacht kam der Menschenfresser im Dunkeln herein und tötete, als er die Mützen berührte, versehentlich seine eigenen Töchter. Die Kinder nutzten die Gelegenheit zur Flucht." },
            { text: "Als der Menschenfresser aufwachte und sah, was geschehen war, zog er seine Siebenmeilenstiefel an, um sie zu jagen. Däumling sah den Riesen von Berg zu Berg springen und versteckte seine Brüder in einem hohlen Felsen. Der Riese, müde, setzte sich auf eben diesen Felsen, um sich auszuruhen, und fiel in einen tiefen Schlaf. Däumling nutzte die Gelegenheit, ihm die Zauberstiefel auszuziehen, die sich perfekt an seine Füße anpassten, da sie verzaubert waren." },
            { text: "Mit den Stiefeln an kehrte Däumling zum Haus des Menschenfressers zurück und täuschte die Frau, indem er ihr sagte, dass Diebe all ihr Gold forderten, um ihren Mann freizulassen. Die Frau gab ihm all ihre Reichtümer. Däumling kehrte beladen mit Gold nach Hause zurück und rettete seine Familie für immer vor dem Elend. Er kaufte Land für seine Eltern und Brüder und bewies, dass Größe keine Rolle spielt, wenn man ein großes Herz und Verstand hat." }
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
        rating: 4.7,
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
        ],
        contentEn: [
            { text: "On the edges of a vast and gloomy forest, where trees seem to intertwine their branches to hide the sky, lived a humble woodcutter with his wife and two children: Hansel, a boy with a bright look, and Gretel, his sister with a brave heart. Poverty had settled in their home like dense dust that could not be shaken off. Hunger was a constant presence that made their stomachs rumble and clouded the adults' judgment. One night, while scarcity squeezed more than ever, the stepmother, with a heart hardened by despair, whispered an atrocious plan into the woodcutter's ear: they would take the children to the deepest part of the undergrowth and abandon them there." },
            { text: "The children, kept awake by hunger, heard every word through the thin wooden wall. Gretel wept bitterly, but Hansel comforted her with a clever plan. Under the cover of the moon, the boy went out to the patio and filled his pockets with small white pebbles that shone in the dark like silver coins. At dawn, while the family went into the heart of the forest, Hansel stayed behind every few steps, dropping a white stone on the black earth. When the fire their parents had lit for them went out and they found themselves alone under the moonlight, the pebbles guided their steps back home." },
            { text: "However, misery did not give a truce. Weeks later, the story repeated itself, but this time the door was locked and Hansel could not collect stones. Instead, he crumbled the last piece of bread they had and left a trail of crumbs along the path. What the boy did not foresee was that the forest birds, hungry like them, would devour every trace of bread. When night fell and the moon rose, they found nothing but earth and shadow. They walked for three days and three nights, lost in a labyrinth of twisted trunks, until a bird with plumage white as snow guided them with its song to an extraordinary clearing." },
            { text: "In front of them stood a little house that looked like a confectioner's fever dream: the walls were made of gingerbread, the roof of chocolate cake and the windows of sugar transparent as crystal. The children, pushed by a ravenous hunger, began to tear off pieces of the structure. 'Nibble, nibble, little mouse, who is nibbling at my house?', said a cracked voice from inside. From the door came a hunched woman, leaning on a cane, who invited them in with a smile that did not reach her small, reddish eyes. Although she seemed like a kind old woman, she was actually an evil witch who built candy houses to attract and devour children." },
            { text: "The next morning, the witch locked Hansel in an iron cage and ordered Gretel to cook the best delicacies to fatten her brother. Every morning, the woman, whose eyesight was very poor, asked Hansel to stick out a finger to check if he was tender enough. The boy, cunning, extended a chicken bone he had found on the ground. The witch was amazed that the boy remained so thin, until one day she lost patience. She decided that, fat or thin, she would eat Hansel that very noon." },
            { text: "The witch ordered Gretel to kneel by the oven to see if the fire was ready to bake the bread, intending to push her in and roast her too. But the girl, who had guessed her dark intentions, feigned clumsiness. 'I don't know how to do it, where should I enter?', asked Gretel. The old woman, grumbling with rage at the girl's ignorance, approached the oven and stuck her head in to show her how. In that moment of carelessness, Gretel gathered all her strength, gave her a superb push and closed the heavy iron door, leaving the evil woman to meet her own end among the flames." },
            { text: "Gretel ran to free Hansel, and both embraced crying with joy. Before leaving, they explored the house and found chests full of pearls and precious stones that the witch had accumulated from her victims. They filled their pockets and began the return journey. After walking a lot, they reached a great river they could not cross, but a white duck, moved by their story, carried them one by one on its back to the other bank. At the end of the path, they spotted their old house. Their stepmother had died and their father, consumed by remorse, received them with tears of forgiveness. With the witch's jewels, poverty left their home forever." }
        ],
        contentFr: [
            { text: "À l'orée d'une forêt vaste et sombre, où les arbres semblent entrelacer leurs branches pour cacher le ciel, vivait un humble bûcheron avec sa femme et ses deux enfants : Hansel, un garçon au regard vif, et Gretel, sa sœur au cœur courageux. La pauvreté s'était installée dans leur foyer comme une poussière dense qu'on ne pouvait secouer. La faim était une présence constante qui faisait gargouiller leurs estomacs et troublait le jugement des adultes. Une nuit, alors que la disette se faisait plus pressante que jamais, la marâtre, le cœur endurci par le désespoir, chuchota à l'oreille du bûcheron un plan atroce : ils emmèneraient les enfants au plus profond des broussailles et les y abandonneraient." },
            { text: "Les enfants, tenus éveillés par la faim, entendirent chaque mot à travers la fine cloison de bois. Gretel pleura amèrement, mais Hansel la consola avec un plan astucieux. À la faveur de la lune, le garçon sortit dans la cour et remplit ses poches de petits cailloux blancs qui brillaient dans l'obscurité comme des pièces d'argent. À l'aube, alors que la famille s'enfonçait au cœur de la forêt, Hansel restait en arrière tous les quelques pas, laissant tomber une pierre blanche sur la terre noire. Lorsque le feu que leurs parents leur avaient allumé s'éteignit et qu'ils se retrouvèrent seuls sous la lumière de la lune, les cailloux guidèrent leurs pas vers la maison." },
            { text: "Cependant, la misère ne laissa aucun répit. Quelques semaines plus tard, l'histoire se répéta, mais cette fois la porte était fermée à clé et Hansel ne put ramasser de pierres. À la place, il émietta le dernier morceau de pain qu'ils avaient et laissa une trace de miettes sur le sentier. Ce que le garçon n'avait pas prévu, c'est que les oiseaux de la forêt, affamés comme eux, dévoreraient toute trace de pain. Lorsque la nuit tomba et que la lune se leva, ils ne trouvèrent rien d'autre que terre et ombre. Ils marchèrent pendant trois jours et trois nuits, perdus dans un labyrinthe de troncs tordus, jusqu'à ce qu'un oiseau au plumage blanc comme neige les guide par son chant vers une clairière extraordinaire." },
            { text: "Devant eux se dressait une petite maison qui ressemblait à un rêve fiévreux de confiseur : les murs étaient en pain d'épices, le toit en gâteau au chocolat et les fenêtres en sucre transparent comme du cristal. Les enfants, poussés par une faim vorace, commencèrent à arracher des morceaux de la structure. 'Grignote, grignote, petite souris, qui grignote ma maison ?', dit une voix cassée de l'intérieur. De la porte sortit une femme voûtée, appuyée sur une canne, qui les invita à entrer avec un sourire qui n'atteignait pas ses petits yeux rougeâtres. Bien qu'elle semblât être une vieille femme bienveillante, c'était en réalité une méchante sorcière qui construisait des maisons de bonbons pour attirer et dévorer les enfants." },
            { text: "Le lendemain matin, la sorcière enferma Hansel dans une cage en fer et ordonna à Gretel de cuisiner les meilleurs mets pour engraisser son frère. Chaque matin, la femme, dont la vue était très mauvaise, demandait à Hansel de sortir un doigt pour vérifier s'il était assez tendre. Le garçon, rusé, tendait un os de poulet qu'il avait trouvé par terre. La sorcière s'étonnait que l'enfant reste si maigre, jusqu'à ce qu'un jour elle perde patience. Elle décida que, gros ou maigre, elle mangerait Hansel ce midi même." },
            { text: "La sorcière ordonna à Gretel de se pencher vers le four pour voir si le feu était prêt pour cuire le pain, avec l'intention de la pousser dedans et de la rôtir elle aussi. Mais la fille, qui avait deviné ses noires intentions, feignit la maladresse. 'Je ne sais pas comment faire, par où dois-je entrer ?', demanda Gretel. La vieille femme, grognant de rage devant l'ignorance de la fille, s'approcha du four et y passa la tête pour lui montrer comment faire. Dans cet instant d'inattention, Gretel rassembla toutes ses forces, lui donna une poussée superbe et ferma la lourde porte en fer, laissant la méchante femme trouver sa propre fin parmi les flammes." },
            { text: "Gretel courut libérer Hansel, et tous deux s'embrassèrent en pleurant de joie. Avant de partir, ils explorèrent la maison et trouvèrent des coffres remplis de perles et de pierres précieuses que la sorcière avait accumulées de ses victimes. Ils remplirent leurs poches et entreprirent le voyage de retour. Après avoir beaucoup marché, ils arrivèrent à une grande rivière qu'ils ne pouvaient traverser, mais un canard blanc, ému par leur histoire, les porta un par un sur son dos jusqu'à l'autre rive. Au bout du sentier, ils aperçurent leur ancienne maison. Leur marâtre était morte et leur père, rongé par le remords, les reçut avec des larmes de pardon. Avec les bijoux de la sorcière, la pauvreté quitta leur foyer pour toujours." }
        ],
        contentDe: [
            { text: "Am Rande eines riesigen und düsteren Waldes, wo die Bäume ihre Äste zu verflechten scheinen, um den Himmel zu verbergen, lebte ein bescheidener Holzfäller mit seiner Frau und seinen zwei Kindern: Hänsel, einem Jungen mit aufgewecktem Blick, und Gretel, seiner Schwester mit einem mutigen Herzen. Die Armut hatte sich in ihrem Heim niedergelassen wie dichter Staub, den man nicht abschütteln konnte. Der Hunger war eine ständige Präsenz, die ihre Mägen knurren ließ und das Urteilsvermögen der Erwachsenen trübte. Eines Nachts, als die Not mehr denn je drückte, flüsterte die Stiefmutter, deren Herz durch Verzweiflung verhärtet war, dem Holzfäller einen grausamen Plan ins Ohr: Sie würden die Kinder in den tiefsten Teil des Unterholzes bringen und sie dort zurücklassen." },
            { text: "Die Kinder, die vor Hunger wach lagen, hörten jedes Wort durch die dünne Holzwand. Gretel weinte bitterlich, aber Hänsel tröstete sie mit einem schlauen Plan. Im Schutze des Mondes ging der Junge auf den Hof und füllte seine Taschen mit kleinen weißen Kieselsteinen, die im Dunkeln wie Silbermünzen glänzten. Im Morgengrauen, während die Familie in das Herz des Waldes vordrang, blieb Hänsel alle paar Schritte zurück und ließ einen weißen Stein auf die schwarze Erde fallen. Als das Feuer, das ihre Eltern für sie angezündet hatten, erlosch und sie sich allein im Mondlicht wiederfanden, führten die Kieselsteine ihre Schritte zurück nach Hause." },
            { text: "Das Elend ließ jedoch nicht nach. Wochen später wiederholte sich die Geschichte, aber diesmal war die Tür verschlossen und Hänsel konnte keine Steine sammeln. Stattdessen zerbröselte er das letzte Stück Brot, das sie hatten, und hinterließ eine Spur von Krümeln auf dem Weg. Was der Junge nicht vorausahnte, war, dass die Vögel des Waldes, hungrig wie sie, jede Spur von Brot verschlingen würden. Als die Nacht hereinbrach und der Mond aufging, fanden sie nichts als Erde und Schatten. Sie liefen drei Tage und drei Nächte lang, verloren in einem Labyrinth aus verdrehten Stämmen, bis ein Vogel mit schneeweißem Gefieder sie mit seinem Gesang zu einer außergewöhnlichen Lichtung führte." },
            { text: "Vor ihnen stand ein kleines Häuschen, das wie der Fiebertraum eines Konditors aussah: Die Wände waren aus Lebkuchen, das Dach aus Schokoladenkuchen und die Fenster aus Zucker, transparent wie Kristall. Die Kinder, getrieben von einem Heißhunger, begannen, Stücke von dem Bauwerk abzubrechen. 'Knusper, knusper, Knäuschen, wer knuspert an meinem Häuschen?', sagte eine brüchige Stimme von drinnen. Aus der Tür kam eine gebückte Frau, auf einen Stock gestützt, die sie mit einem Lächeln hereinbat, das ihre kleinen, rötlichen Augen nicht erreichte. Obwohl sie wie eine freundliche alte Frau wirkte, war sie in Wirklichkeit eine böse Hexe, die Süßigkeitenhäuser baute, um Kinder anzulocken und zu verschlingen." },
            { text: "Am nächsten Morgen sperrte die Hexe Hänsel in einen Eisenkäfig und befahl Gretel, die besten Leckereien zu kochen, um ihren Bruder zu mästen. Jeden Morgen bat die Frau, deren Augenlicht sehr schlecht war, Hänsel, einen Finger herauszustrecken, um zu prüfen, ob er zart genug sei. Der Junge, schlau, streckte einen Hühnerknochen heraus, den er auf dem Boden gefunden hatte. Die Hexe wunderte sich, dass der Junge so dünn blieb, bis sie eines Tages die Geduld verlor. Sie beschloss, dass sie Hänsel, ob fett oder mager, noch an diesem Mittag essen würde." },
            { text: "Die Hexe befahl Gretel, sich zum Ofen zu beugen, um zu sehen, ob das Feuer bereit sei, das Brot zu backen, in der Absicht, sie hineizustoßen und auch sie zu braten. Aber das Mädchen, das ihre dunklen Absichten erraten hatte, täuschte Ungeschicklichkeit vor. 'Ich weiß nicht, wie ich es machen soll, wo soll ich hinein?', fragte Gretel. Die alte Frau, die vor Wut über die Unwissenheit des Mädchens knurrte, näherte sich dem Ofen und steckte den Kopf hinein, um ihr zu zeigen, wie es geht. In diesem Moment der Unachtsamkeit sammelte Gretel all ihre Kräfte, gab ihr einen kräftigen Stoß und schloss die schwere Eisentür, sodass die böse Frau ihr eigenes Ende in den Flammen fand." },
            { text: "Gretel rannte, um Hänsel zu befreien, und beide umarmten sich und weinten vor Freude. Bevor sie gingen, erkundeten sie das Haus und fanden Truhen voller Perlen und Edelsteine, die die Hexe von ihren Opfern angesammelt hatte. Sie füllten ihre Taschen und traten den Rückweg an. Nach langem Gehen kamen sie an einen großen Fluss, den sie nicht überqueren konnten, aber eine weiße Ente, bewegt von ihrer Geschichte, trug sie einen nach dem anderen auf ihrem Rücken zum anderen Ufer. Am Ende des Pfades erblickten sie ihr altes Haus. Ihre Stiefmutter war gestorben und ihr Vater, verzehrt von Reue, empfing sie mit Tränen der Vergebung. Mit den Juwelen der Hexe verließ die Armut ihr Heim für immer." }
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
        rating: 5.0,
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
        ],
        contentEn: [
            { text: "In the deepest depths of the ocean, where the blue of the water is as pure as the finest crystal, stretched the kingdom of the sea people. Trees of crimson coral and plants waving in the currents grow there. At the deepest point stood the Sea King's castle: a coral structure with roofs of giant shells that open to let the currents through, and windows of transparent amber." },
            { text: "The King had six daughters, but the youngest was the most unique. While her sisters decorated their gardens with shipwrecks, she only wanted a marble statue of a handsome young man and red flowers that resembled the sun. Her skin was delicate as a rose petal and her eyes blue as the abyss, but like her sisters, she had no feet; her body ended in a fish tail covered with silver scales." },
            { text: "Tradition dictated that upon turning fifteen, each princess could rise to the surface. The little mermaid listened for years to her sisters' stories: ships passing like shadows and cities shining like stars. When her turn came, her grandmother placed eight white oysters on her tail to mark her rank and allowed her to ascend for the first time to the world of men." },
            { text: "Upon emerging, the sun was setting and a star twinkled above a large three-masted ship. Through a window, she saw a young prince with black eyes celebrating his birthday. But suddenly, the sky darkened and the waves turned into mountains. The ship sank into the bowels of the ocean. Remembering that humans cannot breathe underwater, the little mermaid sought the prince among the wreckage." },
            { text: "She found him unconscious and, holding his head above the waves, swam with him until she reached an unknown coast. She left him on the warm sand and hid behind some rocks. She saw a young woman find him and call for help. The prince woke up, but he never knew that a creature of the sea had saved his life; he thought his savior was the girl from that place." },
            { text: "The little mermaid returned to her palace, but her heart remained on the surface. Desperate to obtain an immortal soul (for sea beings turn into foam when they die, while human souls ascend to the stars), she decided to visit the Sea Witch. The path was terrifying, crossing roaring whirlpools and fields of hungry polyps that extended their tentacles like snakes." },
            { text: "The witch agreed to help her, but at a terrible price. —'I will prepare a potion for you', she said with a sibilant laugh. 'You will feel as if a sword were piercing your body when you transform. You will have the most beautiful legs, but every step will be like walking on sharp knives. And in exchange, you will give me your voice, the sweetest voice of the ocean'. The little mermaid accepted and the witch cut out her tongue, plunging her into silence." },
            { text: "In front of the prince's palace, the little mermaid drank the concoction and fainted from the pain. When she woke up, the prince was before her. He welcomed her, fascinated by that mute creature who danced with celestial grace despite the unbearable pain in her feet. She became his constant companion, loving him in silence while he treated her like a beloved child, but without thinking of marrying her." },
            { text: "One day, the King ordered the prince to marry the neighboring princess. To the little mermaid's horror, it turned out to be the same young woman who found him on the beach. The prince, believing she was his true savior, fell in love. A lavish wedding was held on a ship. The little mermaid, dressed in silk, had to hold the bride's train, knowing that when the sun rose she would die and turn into foam." },
            { text: "As she watched the horizon, her sisters emerged with their hair cut short. —'Sister!', they shouted. 'We have given our hair to the witch for this dagger. If you pierce the prince's heart before dawn and let his blood fall on your feet, you will become a mermaid again'. The little mermaid entered the bridal tent, but looking at the prince's serene face, she could not do it." },
            { text: "She threw the weapon into the waves and threw herself into the sea as the sun appeared. She felt her body dissolving, but she did not turn into nothing. Thousands of transparent creatures surrounded her. —'Who are you?', she asked with a spiritual voice. —'We are the daughters of the air', they replied. 'We have no soul, but we can earn one with good deeds. You have suffered and loved, and now you join us'." },
            { text: "And so, while the prince and his bride searched for the beautiful stranger among the sea foam, the little mermaid, invisible, kissed their foreheads and rose towards the pink clouds, ready to begin her long journey of three hundred years towards the stars, where she would finally obtain her longed-for immortal soul." }
        ],
        contentFr: [
            { text: "Dans les profondeurs les plus reculées de l'océan, où le bleu de l'eau est aussi pur que le cristal le plus fin, s'étendait le royaume des gens de la mer. Là poussent des arbres de corail cramoisi et des plantes qui ondulent au gré des courants. Au point le plus profond se dressait le château du Roi de la Mer : une structure de corail avec des toits de coquillages géants qui s'ouvrent pour laisser passer les courants, et des fenêtres d'ambre transparent." },
            { text: "Le Roi avait six filles, mais la plus jeune était la plus singulière. Tandis que ses sœurs décoraient leurs jardins avec des restes de naufrages, elle ne voulait qu'une statue de marbre d'un beau jeune homme et des fleurs rouges qui rappelaient le soleil. Sa peau était délicate comme un pétale de rose et ses yeux bleus comme l'abîme, mais comme ses sœurs, elle n'avait pas de pieds ; son corps se terminait par une queue de poisson couverte d'écailles argentées." },
            { text: "La tradition voulait qu'à ses quinze ans, chaque princesse puisse monter à la surface. La petite sirène écouta pendant des années les histoires de ses sœurs : des navires passant comme des ombres et des villes brillant comme des étoiles. Quand son tour vint, sa grand-mère plaça huit huîtres blanches sur sa queue pour marquer son rang et lui permit de monter pour la première fois vers le monde des hommes." },
            { text: "En émergeant, le soleil se couchait et une étoile scintillait au-dessus d'un grand navire à trois mâts. À travers une fenêtre, elle vit un jeune prince aux yeux noirs célébrant son anniversaire. Mais soudain, le ciel s'assombrit et les vagues se transformèrent en montagnes. Le navire sombra dans les entrailles de l'océan. Se souvenant que les humains ne peuvent respirer sous l'eau, la petite sirène chercha le prince parmi les débris du naufrage." },
            { text: "Elle le trouva inconscient et, maintenant sa tête hors des vagues, nagea avec lui jusqu'à atteindre une côte inconnue. Elle le déposa sur le sable tiède et se cacha derrière des rochers. Elle vit une jeune femme le trouver et appeler à l'aide. Le prince se réveilla, mais il ne sut jamais qu'une créature de la mer lui avait sauvé la vie ; il pensa que sa sauveuse était la jeune fille de cet endroit." },
            { text: "La petite sirène retourna à son palais, mais son cœur resta à la surface. Désespérée d'obtenir une âme immortelle (car les êtres de la mer se transforment en écume à leur mort, tandis que les âmes humaines montent vers les étoiles), elle décida de rendre visite à la Sorcière de la Mer. Le chemin était terrifiant, traversant des tourbillons rugissants et des champs de polypes affamés qui étendaient leurs tentacules comme des serpents." },
            { text: "La sorcière accepta de l'aider, mais à un prix terrible. —'Je te préparerai une potion', dit-elle avec un rire sifflant. 'Tu sentiras comme si une épée traversait ton corps lors de ta transformation. Tu auras les jambes les plus belles, mais chaque pas sera comme marcher sur des couteaux aiguisés. Et en échange, tu me donneras ta voix, la voix la plus douce de l'océan'. La petite sirène accepta et la sorcière lui coupa la langue, la plongeant dans le silence." },
            { text: "Devant le palais du prince, la petite sirène but le breuvage et s'évanouit de douleur. À son réveil, le prince était devant elle. Il l'accueillit fasciné par cette créature muette qui dansait avec une grâce céleste malgré la douleur insupportable de ses pieds. Elle devint sa compagne constante, l'aimant en silence tandis qu'il la traitait comme une enfant chérie, mais sans penser à l'épouser." },
            { text: "Un jour, le Roi ordonna que le prince épouse la princesse voisine. À l'horreur de la petite sirène, il s'avéra que c'était la même jeune femme qui l'avait trouvé sur la plage. Le prince, croyant qu'elle était sa véritable sauveuse, tomba amoureux. Un mariage fastueux fut célébré sur un navire. La petite sirène, vêtue de soie, dut tenir la traîne de la mariée, sachant qu'au lever du soleil elle mourrait et se transformerait en écume." },
            { text: "Tandis qu'elle observait l'horizon, ses sœurs émergèrent avec leurs cheveux coupés courts. —'Ma sœur !', crièrent-elles. 'Nous avons donné nos cheveux à la sorcière pour ce poignard. Si tu transperces le cœur du prince avant l'aube et laisses son sang tomber sur tes pieds, tu redeviendras une sirène'. La petite sirène entra dans la tente nuptiale, mais en regardant le visage serein du prince, elle ne put le faire." },
            { text: "Elle jeta l'arme dans les vagues et se jeta elle-même à la mer alors que le soleil apparaissait. Elle sentit son corps se dissoudre, mais elle ne se transforma pas en rien. Des milliers de créatures transparentes l'entouraient. —'Qui êtes-vous ?', demanda-t-elle d'une voix spirituelle. —'Nous sommes les filles de l'air', répondirent-elles. 'Nous n'avons pas d'âme, mais nous pouvons en gagner une par de bonnes actions. Tu as souffert et aimé, et maintenant tu te joins à nous'." },
            { text: "Et ainsi, tandis que le prince et sa mariée cherchaient la belle inconnue parmi l'écume de la mer, la petite sirène, invisible, embrassa leur front et s'éleva vers les nuages roses, prête à commencer son long voyage de trois cents ans vers les étoiles, où elle obtiendrait enfin son âme immortelle tant désirée." }
        ],
        contentDe: [
            { text: "In den tiefsten Tiefen des Ozeans, wo das Blau des Wassers so rein ist wie feinstes Kristall, erstreckte sich das Reich der Meeresbewohner. Dort wachsen Bäume aus purpurrotem Korall und Pflanzen, die sich in den Strömungen wiegen. Am tiefsten Punkt stand das Schloss des Meerkönigs: ein Bauwerk aus Korallen mit Dächern aus riesigen Muscheln, die sich öffnen, um die Strömungen hindurchzulassen, und Fenstern aus transparentem Bernstein." },
            { text: "Der König hatte sechs Töchter, aber die jüngste war die einzigartigste. Während ihre Schwestern ihre Gärten mit Schiffswracks schmückten, wollte sie nur eine Marmorstatue eines gutaussehenden jungen Mannes und rote Blumen, die der Sonne glichen. Ihre Haut war zart wie ein Rosenblatt und ihre Augen blau wie der Abgrund, aber wie ihre Schwestern hatte sie keine Füße; ihr Körper endete in einem Fischschwanz, bedeckt mit silbernen Schuppen." },
            { text: "Die Tradition verlangte, dass jede Prinzessin an ihrem fünfzehnten Geburtstag an die Oberfläche aufsteigen durfte. Die kleine Meerjungfrau hörte jahrelang den Geschichten ihrer Schwestern zu: Schiffe, die wie Schatten vorüberzogen, und Städte, die wie Sterne leuchteten. Als sie an der Reihe war, setzte ihre Großmutter acht weiße Austern auf ihren Schwanz, um ihren Rang zu kennzeichnen, und erlaubte ihr, zum ersten Mal in die Welt der Menschen aufzusteigen." },
            { text: "Als sie auftauchte, ging die Sonne unter und ein Stern funkelte über einem großen Dreimaster. Durch ein Fenster sah sie einen jungen Prinzen mit schwarzen Augen, der seinen Geburtstag feierte. Doch plötzlich verdunkelte sich der Himmel und die Wellen wurden zu Bergen. Das Schiff sank in die Eingeweide des Ozeans. Da sie sich erinnerte, dass Menschen unter Wasser nicht atmen können, suchte die kleine Meerjungfrau den Prinzen in den Trümmern." },
            { text: "Sie fand ihn bewusstlos und hielt seinen Kopf über die Wellen, während sie mit ihm schwamm, bis sie eine unbekannte Küste erreichte. Sie legte ihn auf den warmen Sand und versteckte sich hinter einigen Felsen. Sie sah, wie eine junge Frau ihn fand und um Hilfe rief. Der Prinz wachte auf, aber er erfuhr nie, dass ein Geschöpf des Meeres ihm das Leben gerettet hatte; er dachte, seine Retterin sei das Mädchen von diesem Ort." },
            { text: "Die kleine Meerjungfrau kehrte in ihren Palast zurück, aber ihr Herz blieb an der Oberfläche. In ihrer Verzweiflung, eine unsterbliche Seele zu erlangen (denn Meereswesen verwandeln sich beim Tod in Schaum, während menschliche Seelen zu den Sternen aufsteigen), beschloss sie, die Meerhexe zu besuchen. Der Weg war schrecklich, vorbei an tosenden Strudeln und Feldern hungriger Polypen, die ihre Tentakel wie Schlangen ausstreckten." },
            { text: "Die Hexe willigte ein, ihr zu helfen, aber zu einem schrecklichen Preis. —'Ich werde dir einen Trank brauen', sagte sie mit zischendem Lachen. 'Du wirst dich fühlen, als ob ein Schwert deinen Körper durchbohrt, wenn du dich verwandelst. Du wirst die schönsten Beine haben, aber jeder Schritt wird sein, als würdest du auf scharfen Messern gehen. Und im Gegenzug gibst du mir deine Stimme, die süßeste Stimme des Ozeans'. Die kleine Meerjungfrau willigte ein und die Hexe schnitt ihr die Zunge heraus und stürzte sie in Schweigen." },
            { text: "Vor dem Palast des Prinzen trank die kleine Meerjungfrau das Gebräu und fiel vor Schmerz in Ohnmacht. Als sie aufwachte, stand der Prinz vor ihr. Er nahm sie auf, fasziniert von diesem stummen Geschöpf, das trotz der unerträglichen Schmerzen in ihren Füßen mit himmlischer Anmut tanzte. Sie wurde seine ständige Begleiterin und liebte ihn schweigend, während er sie wie ein geliebtes Kind behandelte, aber ohne daran zu denken, sie zu heiraten." },
            { text: "Eines Tages befahl der König dem Prinzen, die benachbarte Prinzessin zu heiraten. Zum Entsetzen der kleinen Meerjungfrau stellte sich heraus, dass es dieselbe junge Frau war, die ihn am Strand gefunden hatte. Der Prinz, der glaubte, sie sei seine wahre Retterin, verliebte sich. Eine prunkvolle Hochzeit wurde auf einem Schiff gefeiert. Die kleine Meerjungfrau, in Seide gekleidet, musste die Schleppe der Braut halten, wohl wissend, dass sie bei Sonnenaufgang sterben und sich in Schaum verwandeln würde." },
            { text: "Als sie den Horizont beobachtete, tauchten ihre Schwestern mit kurzgeschnittenen Haaren auf. —'Schwester!', riefen sie. 'Wir haben unser Haar der Hexe für diesen Dolch gegeben. Wenn du das Herz des Prinzen vor Sonnenaufgang durchbohrst und sein Blut auf deine Füße tropfen lässt, wirst du wieder zur Meerjungfrau'. Die kleine Meerjungfrau betrat das Brautzelt, aber als sie das friedliche Gesicht des Prinzen sah, konnte sie es nicht tun." },
            { text: "Sie warf die Waffe in die Wellen und stürzte sich selbst ins Meer, als die Sonne aufging. Sie spürte, wie sich ihr Körper auflöste, aber sie verwandelte sich nicht in nichts. Tausende transparenter Kreaturen umgaben sie. —'Wer seid ihr?', fragte sie mit geistiger Stimme. —'Wir sind die Töchter der Luft', antworteten sie. 'Wir haben keine Seele, aber wir können uns eine durch gute Taten verdienen. Du hast gelitten und geliebt, und nun schließt du dich uns an'." },
            { text: "Und so, während der Prinz und seine Braut im Meeresschaum nach der schönen Unbekannten suchten, küsste die kleine Meerjungfrau unsichtbar ihre Stirn und stieg zu den rosa Wolken auf, bereit, ihre lange Reise von dreihundert Jahren zu den Sternen zu beginnen, wo sie endlich ihre ersehnte unsterbliche Seele erhalten würde." }
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
        rating: 4.3,
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
        ],
        contentEn: [
            { text: "In the threshold of a nursery, a miniature universe unfolded on a pine wood table. There stood twenty-five lead soldiers, shiny and proud. They had all been born from the same spoon of molten metal, and each wore an impeccable uniform: red coat, blue trousers and a silver rifle. They were all identical, except one, who by a whim of fate had been cast with only one leg. However, his spirit did not waver; he stood with the same determination as his brothers." },
            { text: "In the center of this small cosmos of toys, stood a paper castle, so high and detailed that it invited fantasy. Its windows were of shiny mica and an oval mirror simulated a serene lake. But what captured the lead soldier's attention was a paper ballerina, graceful and ethereal. She wore a pink tutu and a small silver sequin in her hair. For the lead soldier, who also stood on one leg, she was the reflection of his own uniqueness. 'That would be a wife for me!', he thought with emotion." },
            { text: "Night fell and the children went to sleep. The world of toys came to life. Laughter and whispers resonated on the table, but from an old snuff box emerged a dark figure: a wooden goblin with tiny eyes. He addressed the lead soldier with a jealous voice: 'Stop looking at the ballerina, soldier! She is not for you!'. The soldier, firm in his post, ignored him, keeping his gaze fixed on the paper figure who continued dancing under the moonlight." },
            { text: "The next day, the room window burst open. A sudden cold gust of wind swept the toy table. The lead soldier could not resist. He fell, tumbling, from the third floor of the house. It was a long and dizzying fall that ended on the street pavement. He landed headfirst, with his only leg pointing to the sky, stuck between two cold cobblestones." },
            { text: "It began to rain heavily. The drops crashed against his tin helmet. Two naughty children playing in the rain discovered him. 'Look, a soldier!', they exclaimed. Without thinking much, they took an old newspaper and skillfully folded a small boat. They placed the soldier inside and launched him into the impetuous current flowing through the gutter. The soldier's journey into the unknown had just begun." },
            { text: "The paper boat rushed down the dark canal. The water roared around the soldier, whispering threats in the gloom. Suddenly, a pair of red eyes appeared: a sewer rat, large and ferocious, swam to the boat. 'Halt! Do you have a toll to cross my domains?'. The soldier, with his rifle on his shoulder and stoic gaze, remained firm without uttering a word. The rat, frustrated by his silence, let him pass while the boat continued its uncertain path." },
            { text: "The current dragged him to an exit to a larger canal. The boat's paper, already weak from the water, ended up disintegrating. The soldier sank into the depths, plunging into a dark abyss. He fell and fell, until a gigantic shadow enveloped him. In an instant, he was swallowed by a huge fish swimming through the murky waters. Darkness became absolute, but the soldier remained impassive, his mind fixed on the image of his beloved ballerina." },
            { text: "But fate was not done with him yet. The fish was caught by a fisherman and taken to the market, where it was bought by the same cook of the house where the soldier had been born. In the kitchen, while opening the fish to prepare it, the cook found the little soldier. With surprise, she took him out and brought him back to the room with an exclamation. The miracle had happened: the soldier was back home!" },
            { text: "There it all was again! The toy table, the paper castle and, most amazingly, his beloved ballerina, who remained poised on her single leg with the same immaculate grace. The soldier felt a joy so intense that his lead heart almost melted seeing her. The adversities had dissipated and he was close to his only love again, although the goblin in the box continued watching from the shadows." },
            { text: "However, happiness was ephemeral. One of the children took the soldier and, for no reason, threw him directly into the burning fireplace. The heat was suffocating and the lead began to deform. In that instant, a gust of wind opened the window and the paper ballerina flew gracefully into the flames, falling next to her soldier. The fire devoured them both, uniting their destinies in an incandescent finale of light and heat." },
            { text: "The next morning, while cleaning the ashes from the fireplace, the maid found something extraordinary: a small lead heart perfectly cast. Inside, shone the tiny silver sequin that had adorned the ballerina's hair, blackened but still recognizable. The two lovers had disappeared, but in that small lead heart, their story of bravery would endure forever." }
        ],
        contentFr: [
            { text: "Au seuil d'une chambre d'enfant, un univers miniature se déployait sur une table en bois de pin. Là se tenaient vingt-cinq soldats de plomb, brillants et fiers. Ils étaient tous nés de la même cuillère de métal fondu, et chacun portait un uniforme impeccable : casaque rouge, pantalon bleu et un fusil argenté. Tous étaient identiques, sauf un, qui par un caprice du destin avait été fondu avec une seule jambe. Cependant, son esprit ne faiblissait pas ; il se tenait avec la même détermination que ses frères." },
            { text: "Au centre de ce petit cosmos de jouets, se dressait un château en papier, si haut et détaillé qu'il invitait à la fantaisie. Ses fenêtres étaient de mica brillant et un miroir ovale simulait un lac serein. Mais ce qui captura l'attention du soldat de plomb fut une ballerine en papier, gracieuse et éthérée. Elle portait un tutu rose et une petite paillette d'argent dans ses cheveux. Pour le soldat de plomb, qui s'appuyait aussi sur une seule jambe, elle était le reflet de sa propre singularité. 'Celle-là serait une épouse pour moi !', pensa-t-il avec émotion." },
            { text: "La nuit tomba et les enfants s'endormirent. Le monde des jouets prit vie. Les rires et les chuchotements résonnaient sur la table, mais d'une vieille boîte à tabac surgit une silhouette sombre : un lutin en bois aux yeux minuscules. Il s'adressa au soldat de plomb d'une voix jalouse : 'Arrête de regarder la ballerine, soldat ! Elle n'est pas pour toi !'. Le soldat, ferme à son poste, l'ignora, gardant son regard fixé sur la silhouette en papier qui continuait de danser sous la lumière de la lune." },
            { text: "Le lendemain, la fenêtre de la chambre s'ouvrit brusquement. Une rafale de vent froid et soudaine balaya la table de jouets. Le soldat de plomb ne put résister. Il tomba, faisant des culbutes, du troisième étage de la maison. Ce fut une chute longue et vertigineuse qui se termina sur le pavé de la rue. Il atterrit la tête la première, avec sa seule jambe pointant vers le ciel, coincé entre deux pavés froids." },
            { text: "Il commença à pleuvoir fort. Les gouttes s'écrasaient contre son casque de fer blanc. Deux enfants espiègles qui jouaient sous la pluie le découvrirent. 'Regarde, un petit soldat !', s'exclamèrent-ils. Sans trop réfléchir, ils prirent un vieux journal et plièrent habilement un petit bateau. Ils placèrent le soldat à l'intérieur et le lancèrent dans le courant impétueux qui coulait dans le caniveau. Le voyage du soldat vers l'inconnu venait de commencer." },
            { text: "Le bateau en papier se précipita dans le canal sombre. L'eau rugissait autour du soldat, chuchotant des menaces dans la pénombre. Soudain, une paire d'yeux rouges apparut : un rat d'égout, grand et féroce, nagea jusqu'au bateau. 'Halte ! As-tu un péage pour traverser mes domaines ?'. Le soldat, avec son fusil à l'épaule et le regard stoïque, resta ferme sans prononcer un mot. Le rat, frustré par son silence, le laissa passer tandis que le bateau poursuivait son chemin incertain." },
            { text: "Le courant l'entraîna jusqu'à une sortie vers un canal plus grand. Le papier du bateau, déjà affaibli par l'eau, finit par se désintégrer. Le soldat coula dans les profondeurs, plongeant dans un abîme obscur. Il tomba et tomba, jusqu'à ce qu'une ombre gigantesque l'enveloppe. En un instant, il fut englouti par un énorme poisson qui nageait dans les eaux troubles. L'obscurité devint absolue, mais le soldat resta impassible, son esprit fixé sur l'image de sa ballerine bien-aimée." },
            { text: "Mais le destin n'en avait pas encore fini avec lui. Le poisson fut capturé par un pêcheur et emmené au marché, où il fut acheté par la même cuisinière de la maison où le soldat était né. Dans la cuisine, en ouvrant le poisson pour le préparer, la cuisinière trouva le petit soldat. Avec surprise, elle le sortit et le ramena dans la chambre avec une exclamation. Le miracle s'était produit : le soldat était de retour chez lui !" },
            { text: "Tout était là de nouveau ! La table des jouets, le château en papier et, le plus étonnant, sa ballerine bien-aimée, qui restait posée sur sa seule jambe avec la même grâce immaculée. Le soldat ressentit une joie si intense que son cœur de plomb faillit fondre en la voyant. Les adversités s'étaient dissipées et il était de nouveau près de son seul amour, bien que le lutin de la boîte continuât d'observer depuis l'ombre." },
            { text: "Cependant, le bonheur fut éphémère. L'un des enfants prit le soldat et, sans aucune raison, le jeta directement dans la cheminée allumée. La chaleur était étouffante et le plomb commença à se déformer. À cet instant, une rafale de vent ouvrit la fenêtre et la ballerine en papier vola gracieusement vers les flammes, tombant près de son soldat. Le feu les dévora tous les deux, unissant leurs destins dans un final incandescent de lumière et de chaleur." },
            { text: "Le lendemain matin, en nettoyant les cendres de la cheminée, la servante trouva quelque chose d'extraordinaire : un petit cœur de plomb parfaitement fondu. À l'intérieur, brillait la minuscule paillette d'argent qui avait orné les cheveux de la ballerine, noircie mais encore reconnaissable. Les deux amants avaient disparu, mais dans ce petit cœur de plomb, leur histoire de bravoure perdurerait à jamais." }
        ],
        contentDe: [
            { text: "An der Schwelle eines Kinderzimmers entfaltete sich ein Miniaturuniversum auf einem Kiefernholztisch. Dort standen fünfundzwanzig Zinnsoldaten, glänzend und stolz. Sie waren alle aus demselben Löffel geschmolzenen Metalls geboren worden, und jeder trug eine tadellose Uniform: roter Rock, blaue Hose und ein silbernes Gewehr. Alle waren identisch, bis auf einen, der durch eine Laune des Schicksals mit nur einem Bein gegossen worden war. Doch sein Geist wankte nicht; er stand mit derselben Entschlossenheit wie seine Brüder." },
            { text: "In der Mitte dieses kleinen Spielzeugkosmos erhob sich ein Papierschloss, so hoch und detailliert, dass es zur Fantasie einlud. Seine Fenster waren aus glänzendem Glimmer und ein ovaler Spiegel simulierte einen ruhigen See. Aber was die Aufmerksamkeit des Zinnsoldaten fesselte, war eine Papierballerina, anmutig und ätherisch. Sie trug ein rosa Tutu und eine kleine silberne Paillette im Haar. Für den Zinnsoldaten, der sich ebenfalls auf ein Bein stützte, war sie das Spiegelbild seiner eigenen Einzigartigkeit. 'Das wäre eine Frau für mich!', dachte er bewegt." },
            { text: "Die Nacht brach herein und die Kinder gingen schlafen. Die Welt der Spielzeuge erwachte zum Leben. Lachen und Flüstern hallten auf dem Tisch wider, aber aus einer alten Tabaksdose tauchte eine dunkle Gestalt auf: ein Holzkobold mit winzigen Augen. Er wandte sich mit eifersüchtiger Stimme an den Zinnsoldaten: 'Hör auf, die Ballerina anzustarren, Soldat! Sie ist nichts für dich!'. Der Soldat, standhaft auf seinem Posten, ignorierte ihn und hielt seinen Blick auf die Papierfigur gerichtet, die im Mondlicht weitertanzte." },
            { text: "Am nächsten Tag flog das Zimmerfenster plötzlich auf. Ein kalter, plötzlicher Windstoß fegte über den Spielzeugtisch. Der Zinnsoldat konnte keinen Widerstand leisten. Er fiel, sich überschlagend, aus dem dritten Stock des Hauses. Es war ein langer und schwindelerregender Fall, der auf dem Pflaster der Straße endete. Er landete kopfüber, mit seinem einzigen Bein gen Himmel zeigend, eingeklemmt zwischen zwei kalten Pflastersteinen." },
            { text: "Es begann heftig zu regnen. Die Tropfen prasselten gegen seinen Zinnhelm. Zwei unartige Kinder, die im Regen spielten, entdeckten ihn. 'Schau, ein kleiner Soldat!', riefen sie. Ohne lange nachzudenken, nahmen sie eine alte Zeitung und falteten geschickt ein kleines Boot. Sie setzten den Soldaten hinein und ließen ihn in die ungestüme Strömung, die durch den Rinnstein floss. Die Reise des Soldaten ins Unbekannte hatte gerade erst begonnen." },
            { text: "Das Papierboot schoss den dunklen Kanal hinab. Das Wasser toste um den Soldaten und flüsterte Drohungen im Halbdunkel. Plötzlich erschien ein Paar roter Augen: eine Kanalratte, groß und wild, schwamm zum Boot. 'Halt! Hast du einen Zoll, um meine Gebiete zu durchqueren?'. Der Soldat, mit dem Gewehr auf der Schulter und stoischem Blick, blieb standhaft, ohne ein Wort zu sagen. Die Ratte, frustriert von seinem Schweigen, ließ ihn passieren, während das Boot seinen ungewissen Weg fortsetzte." },
            { text: "Die Strömung riss ihn zu einem Ausgang in einen größeren Kanal. Das Papier des Bootes, bereits vom Wasser geschwächt, löste sich schließlich auf. Der Soldat sank in die Tiefen und tauchte in einen dunklen Abgrund ein. Er fiel und fiel, bis ein riesiger Schatten ihn einhüllte. In einem Augenblick wurde er von einem riesigen Fisch verschluckt, der durch die trüben Gewässer schwamm. Die Dunkelheit wurde absolut, aber der Soldat blieb ungerührt, seine Gedanken auf das Bild seiner geliebten Ballerina gerichtet." },
            { text: "Aber das Schicksal war noch nicht fertig mit ihm. Der Fisch wurde von einem Fischer gefangen und zum Markt gebracht, wo er von derselben Köchin des Hauses gekauft wurde, in dem der Soldat geboren worden war. In der Küche, als sie den Fisch öffnete, um ihn zuzubereiten, fand die Köchin den kleinen Soldaten. Überrascht nahm sie ihn heraus und brachte ihn mit einem Ausruf zurück ins Zimmer. Das Wunder war geschehen: Der Soldat war wieder zu Hause!" },
            { text: "Da war alles wieder! Der Spielzeugtisch, das Papierschloss und, am erstaunlichsten, seine geliebte Ballerina, die mit derselben makellosen Anmut auf ihrem einzigen Bein verharrte. Der Soldat spürte eine so intensive Freude, dass sein Zinnherz fast schmolz, als er sie sah. Die Widrigkeiten hatten sich aufgelöst und er war wieder nah bei seiner einzigen Liebe, obwohl der Kobold in der Dose weiterhin aus dem Schatten beobachtete." },
            { text: "Das Glück war jedoch vergänglich. Eines der Kinder nahm den Soldaten und warf ihn ohne jeden Grund direkt in den brennenden Kamin. Die Hitze war erstickend und das Zinn begann sich zu verformen. In diesem Augenblick öffnete ein Windstoß das Fenster und die Papierballerina flog anmutig in die Flammen und fiel neben ihren Soldaten. Das Feuer verschlang sie beide und vereinte ihre Schicksale in einem glühenden Finale aus Licht und Wärme." },
            { text: "Am nächsten Morgen, beim Reinigen der Asche aus dem Kamin, fand das Dienstmädchen etwas Außergewöhnliches: ein kleines, perfekt gegossenes Zinnherz. Im Inneren glänzte die winzige silberne Paillette, die das Haar der Ballerina geschmückt hatte, geschwärzt, aber noch erkennbar. Die beiden Liebenden waren verschwunden, aber in diesem kleinen Zinnherz würde ihre Geschichte von Tapferkeit für immer fortbestehen." }
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
        rating: 4.9,
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
        ],
        contentEn: [
            {
                text: "In an era when merchants measured their fortune by the number of ships crossing the oceans, there lived an immensely rich man who had three daughters. The two eldest were vain and selfish, lovers of balls and fine silks. The youngest, however, was so kind and beautiful that everyone simply called her Beauty. Her beauty lay not only in the harmony of her features but in the peace she radiated while reading under the willows or tending her father's garden."
            },
            {
                text: "Fortune is, however, as fickle as the wind. A series of shipwrecks left the merchant in ruin, forcing the family to retire to a small, humble cottage in the countryside. While the elder sisters lamented and despised household chores, Beauty rose before dawn to clean, cook, and maintain her father's hope. One day, news arrived that one of the lost ships had reached port. Before leaving, the father asked his daughters what they wished him to bring. The elders asked for jewels and brocade dresses; Beauty, after much insistence from her father, asked only for a rose, for none grew in that arid land."
            },
            {
                text: "The trip was a failure: the ship had been seized, and the father returned poorer than before. Crossing a forest in a snowstorm, he got lost on an unknown path that led him to a palace of unreal opulence. The doors opened by themselves; tables full of steaming food awaited him, but there was not a soul in sight. After spending the night, as he left through the garden, he saw a rosebush with flowers as red as blood. Remembering Beauty's wish, he cut one. At that instant, a frightful roar shook the earth, and a terrifying creature, with boar tusks and thick fur, appeared before him."
            },
            {
                text: "—\"Ungrateful!\" thundered the Beast. \"I have given you food and shelter, and you repay me by stealing my flowers? You shall die for this, unless one of your daughters agrees to die in your place.\" The father returned home desolate. Beauty, upon hearing the story, would not allow her father to suffer for her sake. \"I will go,\" she said with a firmness that admitted no reply. Upon arriving at the palace, the Beast did not devour her. On the contrary, he installed her in the most luxurious room and gave her total freedom, with only one condition: to dine with him every night."
            },
            {
                text: "At first, Beauty felt a paralyzing terror every time she saw that deformed figure. But as the months passed, the dinners turned into long conversations. She discovered that behind that monstrous appearance hid a cultivated, sensitive, and deeply lonely soul. The Beast gave her an immense library and a magic mirror that allowed her to see her family. Despite the external ugliness, Beauty began to appreciate the nobility of her host's heart. However, every night, the Beast asked her the same question with a trembling voice: —\"Beauty, would you marry me?\" And she, honestly but sadly, always replied: \"No, Beast.\""
            },
            {
                text: "One day, the mirror showed her that her father was gravely ill. Beauty begged him to let her visit. The Beast, whose love for her was already greater than his own desire for company, agreed: \"Go, but if you do not return in eight days, I shall die of grief.\" He gave her a ring that, when turned, would transport her back."
            },
            {
                text: "Beauty cared for her father until he recovered his health, but her sisters, jealous of her life in the palace, tricked her into staying longer, hoping the Beast would be furious and punish her. On the tenth day, Beauty dreamed that the Beast lay dying in the rose garden. She woke with a cry of anguish and, turning the ring, returned to the palace."
            },
            {
                text: "She found the creature lying on the grass, breathing raggedly and eyes closed. Beauty threw herself upon him, weeping bitterly. \"Don't die, please! I have been ungrateful. It doesn't matter what you look like, I love you and I want to be your wife.\""
            },
            {
                text: "As soon as she pronounced these words, a burst of light enveloped the place. The Beast disappeared, and in his place stood a prince more handsome than any dream. The spell of an evil fairy, who had transformed him for being proud and cruel, had been broken because a woman had been able to love his inner self. The palace filled with light and music, and Beauty, who had found beauty where no one else knew to look, ruled alongside the prince in a kingdom where it was taught that only the heart has the power to see the truth."
            }
        ],
        contentFr: [
            {
                text: "À une époque où les marchands mesuraient leur fortune au nombre de navires traversant les océans, vivait un homme immensément riche qui avait trois filles. Les deux aînées étaient vaniteuses et égoïstes, amatrices de bals et de soieries fines. La plus jeune, cependant, était si bonne et si belle que tout le monde l'appelait simplement Belle. Sa beauté ne résidait pas seulement dans l'harmonie de ses traits, mais dans la paix qu'elle dégageait en lisant sous les saules ou en s'occupant du jardin de son père."
            },
            {
                text: "La fortune est, cependant, aussi volage que le vent. Une série de naufrages laissa le marchand ruiné, obligeant la famille à se retirer dans une petite chaumière humble à la campagne. Alors que les sœurs aînées se lamentaient et méprisaient les tâches ménagères, Belle se levait avant l'aube pour nettoyer, cuisiner et entretenir l'espoir de son père. Un jour, la nouvelle arriva que l'un des navires perdus était arrivé au port. Avant de partir, le père demanda à ses filles ce qu'elles désiraient qu'il leur rapporte. Les aînées demandèrent des bijoux et des robes de brocart ; Belle, après que son père eut beaucoup insisté, demanda seulement une rose, car il n'en poussait aucune dans cette terre aride."
            },
            {
                text: "Le voyage fut un échec : le navire avait été saisi et le père revint plus pauvre qu'avant. En traversant une forêt sous une tempête de neige, il se perdit sur un sentier inconnu qui le mena à un palais d'une opulence irréelle. Les portes s'ouvrirent seules ; des tables remplies de nourriture fumante l'attendaient, mais il n'y avait âme qui vive. Après avoir passé la nuit, en sortant par le jardin, il vit un rosier aux fleurs rouges comme le sang. Se souvenant du vœu de Belle, il en coupa une. À cet instant, un rugissement effroyable fit trembler la terre et une créature à l'aspect terrifiant, avec des défenses de sanglier et une fourrure épaisse, apparut devant lui."
            },
            {
                text: "— \"Ingrat !\", tonna la Bête. \"Je t'ai donné nourriture et toit, et tu me paies en volant mes fleurs ? Tu mourras pour cela, à moins que l'une de tes filles n'accepte de mourir à ta place\". Le père rentra chez lui désolé. Belle, en apprenant l'histoire, ne permit pas que son père souffrît par sa faute. \"J'irai\", dit-elle avec une fermeté qui n'admettait aucune réplique. En arrivant au palais, la Bête ne la dévora pas. Au contraire, il l'installa dans la chambre la plus luxueuse et lui donna une liberté totale, à une seule condition : dîner avec lui chaque soir."
            },
            {
                text: "Au début, Belle ressentait une terreur paralysante chaque fois qu'elle voyait cette silhouette difforme. Mais au fil des mois, les dîners se transformèrent en longues conversations. Elle découvrit que derrière cette apparence monstrueuse se cachait une âme cultivée, sensible et profondément solitaire. La Bête lui offrit une bibliothèque immense et un miroir magique qui lui permettait de voir sa famille. Malgré la laideur extérieure, Belle commença à apprécier la noblesse du cœur de son hôte. Cependant, chaque soir, la Bête lui posait la même question d'une voix tremblante : — \"Belle, voulez-vous m'épouser ?\". Et elle, avec honnêteté mais tristesse, répondait toujours : \"Non, Bête\"."
            },
            {
                text: "Un jour, le miroir lui montra que son père était gravement malade. Belle le supplia de lui permettre de le visiter. La Bête, dont l'amour pour elle était déjà supérieur à son propre désir de compagnie, accepta : \"Va, mais si tu ne reviens pas dans huit jours, je mourrai de chagrin\". Il lui donna une bague qui, en la tournant, la transporterait de retour."
            },
            {
                text: "Belle soigna son père jusqu'à ce qu'il retrouve la santé, mais ses sœurs, jalouses de sa vie au palais, la trompèrent pour qu'elle restât plus longtemps, espérant que la Bête entrerait en colère et la punirait. Le dixième jour, Belle rêva que la Bête gisait moribonde dans le jardin de roses. Elle se réveilla avec un cri d'angoisse et, tournant la bague, retourna au palais."
            },
            {
                text: "Elle trouva la créature étendue sur l'herbe, le souffle court et les yeux fermés. Belle se jeta sur lui, pleurant amèrement. \"Ne meurs pas, s'il te plaît ! J'ai été ingrate. Peu importe ton apparence, je t'aime et je veux être ton épouse\"."
            },
            {
                text: "À peine prononça-t-elle ces mots qu'un éclat de lumière enveloppa les lieux. La Bête disparut et, à sa place, se trouvait un prince plus beau que n'importe quel rêve. Le sortilège d'une méchante fée, qui l'avait transformé pour avoir été superbe et cruel, avait été rompu parce qu'une femme avait été capable d'aimer son intérieur. Le palais se remplit de lumière et de musique, et Belle, qui avait trouvé la beauté là où personne d'autre ne savait regarder, gouverna avec le prince dans un royaume où l'on enseignait que seul le cœur a le pouvoir de voir la vérité."
            }
        ],
        contentDe: [
            {
                text: "In einer Zeit, als Kaufleute ihren Reichtum an der Anzahl der Schiffe maßen, die die Ozeane überquerten, lebte ein immens reicher Mann, der drei Töchter hatte. Die beiden ältesten waren eitel und selbstsüchtig, liebten Bälle und feine Seiden. Die Jüngste jedoch war so gütig und schön, dass alle sie einfach Belle nannten. Ihre Schönheit lag nicht nur in der Harmonie ihrer Züge, sondern in dem Frieden, den sie ausstrahlte, wenn sie unter den Weiden las oder den Garten ihres Vaters pflegte."
            },
            {
                text: "Das Glück ist jedoch so wankelmütig wie der Wind. Eine Reihe von Schiffbrüchen ruinierte den Kaufmann und zwang die Familie, sich in eine kleine, bescheidene Hütte auf dem Land zurückzuziehen. Während die älteren Schwestern jammerten und die Hausarbeit verachteten, stand Belle vor Morgengrauen auf, um zu putzen, zu kochen und die Hoffnung ihres Vaters aufrechtzuerhalten. Eines Tages kam die Nachricht, dass eines der verlorenen Schiffe den Hafen erreicht hatte. Vor der Abreise fragte der Vater seine Töchter, was er ihnen mitbringen solle. Die Älteren baten um Juwelen und Brokatkleider; Belle, nachdem der Vater sehr darauf bestanden hatte, bat nur um eine Rose, denn in jenem trockenen Land wuchs keine."
            },
            {
                text: "Die Reise war ein Fehlschlag: Das Schiff war beschlagnahmt worden und der Vater kehrte ärmer zurück als zuvor. Als er in einem Schneesturm einen Wald durchquerte, verirrte er sich auf einen unbekannten Pfad, der ihn zu einem Palast von unwirklicher Opulenz führte. Die Türen öffneten sich von selbst; Tische voller dampfender Speisen erwarteten ihn, aber keine Menschenseele war zu sehen. Nachdem er die Nacht verbracht hatte und durch den Garten ging, sah er einen Rosenstrauch mit blutroten Blüten. Er erinnerte sich an Belles Wunsch und schnitt eine ab. In diesem Augenblick ließ ein schreckliches Brüllen die Erde beben, und eine furchterregende Kreatur mit Wildschweinzähnen und dichtem Fell erschien vor ihm."
            },
            {
                text: "— \"Undankbarer!\", donnerte das Biest. \"Ich habe dir Essen und Dach gegeben, und du bezahlst mich, indem du meine Blumen stiehlst? Du wirst dafür sterben, es sei denn, eine deiner Töchter willigt ein, an deiner Stelle zu sterben.\" Der Vater kehrte verzweifelt nach Hause zurück. Belle, als sie die Geschichte hörte, erlaubte nicht, dass ihr Vater ihrertwegen litt. \"Ich werde gehen\", sagte sie mit einer Festigkeit, die keine Widerrede duldete. Im Palast angekommen, verschlang das Biest sie nicht. Im Gegenteil, er brachte sie im luxuriösesten Zimmer unter und gab ihr völlige Freiheit, unter einer einzigen Bedingung: jeden Abend mit ihm zu speisen."
            },
            {
                text: "Anfangs empfand Belle eine lähmende Angst, jedes Mal wenn sie diese deformierte Gestalt sah. Aber im Laufe der Monate wurden die Abendessen zu langen Gesprächen. Sie entdeckte, dass sich hinter diesem monströsen Äußeren eine gebildete, sensible und zutiefst einsame Seele verbarg. Das Biest schenkte ihr eine riesige Bibliothek und einen magischen Spiegel, der es ihr erlaubte, ihre Familie zu sehen. Trotz der äußeren Hässlichkeit begann Belle, den Adel des Herzens ihres Gastgebers zu schätzen. Jedoch stellte das Biest ihr jeden Abend mit zitternder Stimme dieselbe Frage: — \"Belle, würdest du mich heiraten?\" Und sie antwortete ehrlich, aber traurig, immer: \"Nein, Biest.\""
            },
            {
                text: "Eines Tages zeigte ihr der Spiegel, dass ihr Vater schwer krank war. Belle flehte ihn an, sie ihn besuchen zu lassen. Das Biest, dessen Liebe zu ihr bereits größer war als sein eigener Wunsch nach Gesellschaft, willigte ein: \"Geh, aber wenn du in acht Tagen nicht zurückkehrst, werde ich vor Kummer sterben.\" Er gab ihr einen Ring, der sie, wenn man ihn drehte, zurückbringen würde."
            },
            {
                text: "Belle pflegte ihren Vater, bis er seine Gesundheit wiedererlangte, aber ihre Schwestern, neidisch auf ihr Leben im Palast, täuschten sie, damit sie länger blieb, in der Hoffnung, das Biest würde wütend werden und sie bestrafen. Am zehnten Tag träumte Belle, dass das Biest sterbend im Rosengarten lag. Sie erwachte mit einem Schrei der Angst, drehte den Ring und kehrte zum Palast zurück."
            },
            {
                text: "Sie fand die Kreatur im Gras liegend, mit rasselndem Atem und geschlossenen Augen. Belle warf sich über ihn und weinte bitterlich. \"Stirb nicht, bitte! Ich war undankbar. Es ist egal, wie du aussiehst, ich liebe dich und ich möchte deine Frau sein.\""
            },
            {
                text: "Kaum hatte sie diese Worte ausgesprochen, hüllte ein Lichtblitz den Ort ein. Das Biest verschwand und an seiner Stelle stand ein Prinz, schöner als jeder Traum. Der Zauber einer bösen Fee, die ihn verwandelt hatte, weil er hochmütig und grausam war, war gebrochen worden, weil eine Frau fähig gewesen war, sein Inneres zu lieben. Der Palast füllte sich mit Licht und Musik, und Belle, die die Schönheit dort gefunden hatte, wo niemand sonst hinzusehen wusste, regierte zusammen mit dem Prinzen in einem Königreich, in dem gelehrt wurde, dass nur das Herz die Macht hat, die Wahrheit zu sehen."
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
        rating: 4.6,
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
        ],
        contentEn: [
            {
                text: "Long ago, in a small house attached to a magic garden, lived a man and a woman. The garden, surrounded by a very high wall, belonged to a sorceress feared throughout the region, whom no one dared to defy. One day, the woman felt an irresistible craving, an uncontrollable desire for rampions, a kind of wild lettuce that grew in that enchanted garden. Her longing was so strong that she languished, threatening to die if she did not taste them. Her husband, desperate to save her, decided one night to climb the wall and steal some rampions."
            },
            {
                text: "The next day, the woman's craving returned, stronger than ever. The man, his heart shrinking with fear, returned to the garden. But this time, upon descending, he came face to face with the sorceress. Her eyes shot sparks of anger. —\"How dare you enter my garden like a thief!\" bellowed the sorceress, with a voice that froze the blood. \"You will pay dearly for your insolence!\" The man begged for mercy, explaining his wife's desperation. The sorceress, with a malevolent smile, agreed to let him go in exchange for a terrible promise: the child his wife was expecting would be given to her at birth. The man, terrified, accepted."
            },
            {
                text: "When the girl was born, she was the most beautiful creature ever seen. The sorceress appeared immediately, took her in her arms, and named her Rapunzel, in honor of the lettuce that had caused her fate. She took her to the depths of the forest and locked her in a towering tower, with no doors or stairs, with only a tiny window at the top. There, Rapunzel grew up isolated from the world, with the sorceress as her only company."
            },
            {
                text: "Rapunzel had a melodious voice and the longest and most beautiful hair ever seen: a golden cascade that fell to the ground. When the sorceress wanted to go up the tower, she stood at the foot and shouted: —\"Rapunzel, Rapunzel, let down your hair!\" And Rapunzel, with a sigh, unrolled her golden braids and let them fall out the window, forming a ladder that the sorceress climbed with ease."
            },
            {
                text: "Years passed. One day, a young prince, who was riding through the forest, heard a voice so beautiful that he stopped his horse. It was Rapunzel, singing to pass her long hours of solitude. Fascinated, the prince looked for the source of the voice and found the doorless tower. Intrigued, he hid among the bushes and watched the sorceress call Rapunzel and climb up her hair."
            },
            {
                text: "The next day, the prince returned and, imitating the sorceress's voice, shouted: —\"Rapunzel, Rapunzel, let down your hair!\" The golden braids fell, and the prince climbed to the top. At first, Rapunzel was terribly frightened to see a man, for she had never seen one. But the prince, with kind words and a soft voice, spoke to her of his admiration for her singing and her beauty. Little by little, Rapunzel felt comfortable in his company. They fell in love."
            },
            {
                text: "The prince visited her every afternoon, climbing up her hair. Together, they devised an escape plan: he would bring her a skein of silk every time he went, and she would weave a ladder with it. When the ladder was ready, she would descend and they would escape together."
            },
            {
                text: "One day, however, Rapunzel made a mistake. She asked the sorceress innocently: \"Tell me, godmother, why does my prince climb up your hair so quickly while it takes you so much effort?\" The sorceress, with a look of fury, understood the betrayal. With a pair of scissors, she cut Rapunzel's long golden hair, leaving her with short hair. Then, with a spell, she banished her to a distant desert, where she would live in misery."
            },
            {
                text: "That same night, the sorceress tied the cut braids to the window. When the prince arrived and shouted, the hair fell, but upon climbing up, he did not find his beloved Rapunzel, but the furious face of the sorceress. —\"You will never see her again!\" shouted the sorceress with a cruel laugh. \"The bird is gone, the nest is empty!\" Desperate, the prince threw himself from the tower. He survived the fall, but fell onto a bed of thorns that tore out his eyes. Blind and desolate, he wandered the forest for years, eating roots and berries, calling for Rapunzel in his suffering."
            },
            {
                text: "One day, the blind prince arrived at an arid and desolate desert. He heard a familiar song, a voice he would recognize among a thousand. It was Rapunzel, who lived there with two small twins, the fruit of their love. She recognized him immediately and threw herself into his arms, weeping with joy. Two of her tears fell on the prince's blind eyes. Miraculously, at that instant, his sight returned."
            },
            {
                text: "Together, the prince, Rapunzel, and their children returned to the prince's kingdom, where they were received with great joy. They lived happily ever after, and Rapunzel's love and perseverance became a legend, proving that even in the darkest of prisons, hope can weave a path to freedom."
            }
        ],
        contentFr: [
            {
                text: "Il y a longtemps, dans une petite maison adossée à un jardin magique, vivaient un homme et une femme. Le jardin, entouré d'un mur très haut, appartenait à une sorcière crainte dans toute la contrée, que personne n'osait défier. Un jour, la femme ressentit une envie irrépressible, un désir incontrôlable pour les raiponces, une espèce de laitue sauvage qui poussait dans ce jardin enchanté. Son désir était si fort qu'elle languissait, menaçant de mourir si elle n'en goûtait pas. Son mari, désespéré de la sauver, décida une nuit d'escalader le mur et de voler quelques raiponces."
            },
            {
                text: "Le lendemain, l'envie de la femme revint, plus forte que jamais. L'homme, le cœur serré de peur, retourna au jardin. Mais cette fois, en descendant, il se retrouva face à face avec la sorcière. Ses yeux lançaient des éclairs de colère. — \"Comment oses-tu entrer dans mon jardin comme un voleur !\", beugla la sorcière, d'une voix qui glaçait le sang. \"Tu paieras cher ton insolence !\" L'homme implora la clémence, expliquant le désespoir de sa femme. La sorcière, avec un sourire malveillant, accepta de le laisser partir en échange d'une promesse terrible : l'enfant que sa femme attendait lui serait remis à la naissance. L'homme, terrifié, accepta."
            },
            {
                text: "Quand la fille naquit, c'était la créature la plus belle qu'on eût jamais vue. La sorcière apparut immédiatement, la prit dans ses bras et l'appela Raiponce, en l'honneur des laitues qui avaient provoqué son destin. Elle l'emmena au plus profond de la forêt et l'enferma dans une tour très haute, sans portes ni escaliers, avec une seule fenêtre minuscule au sommet. Là, Raiponce grandit isolée du monde, avec la sorcière pour seule compagnie."
            },
            {
                text: "Raiponce avait une voix mélodieuse et les cheveux les plus longs et les plus beaux qu'on eût jamais vus : une cascade dorée qui tombait jusqu'au sol. Quand la sorcière voulait monter dans la tour, elle se tenait au pied et criait : — \"Raiponce, Raiponce, lance tes cheveux !\" Et Raiponce, avec un soupir, déroulait ses tresses dorées et les laissait tomber par la fenêtre, formant une échelle que la sorcière escaladait avec facilité."
            },
            {
                text: "Les années passèrent. Un jour, un jeune prince, qui chevauchait à travers la forêt, entendit une voix si belle qu'il arrêta son cheval. C'était Raiponce, qui chantait pour passer ses longues heures de solitude. Fasciné, le prince chercha l'origine de la voix et trouva la tour sans porte. Intrigué, il se cacha parmi les buissons et observa la sorcière appeler Raiponce et monter par ses cheveux."
            },
            {
                text: "Le lendemain, le prince revint et, imitant la voix de la sorcière, cria : — \"Raiponce, Raiponce, lance tes cheveux !\" Les tresses dorées tombèrent, et le prince grimpa jusqu'au sommet. Au début, Raiponce eut terriblement peur en voyyan un homme, car elle n'en avait jamais vu. Mais le prince, avec des mots aimables et une voix douce, lui parla de son admiration pour son chant et sa beauté. Peu à peu, Raiponce se sentit à l'aise en sa compagnie. Ils tombèrent amoureux."
            },
            {
                text: "Le prince lui rendait visite chaque après-midi, grimpant par ses cheveux. Ensemble, ils conçurent un plan d'évasion : il lui apporterait un écheveau de soie chaque fois qu'il viendrait, et elle tricoteraient une échelle avec. Quand l'échelle serait prête, elle descendrait et ils s'enfuiraient ensemble."
            },
            {
                text: "Un jour, cependant, Raiponce commit une erreur. Elle demanda ingénument à la sorcière : \"Dites-moi, marraine, pourquoi mon prince monte-t-il si vite par vos cheveux alors que vous avez tant de mal ?\" La sorcière, avec un regard de fureur, comprit la trahison. Avec une paire de ciseaux, elle coupa la longue chevelure dorée de Raiponce, la laissant avec les cheveux courts. Ensuite, par un sortilège, elle l'exila dans un désert lointain, où elle vivrait dans la misère."
            },
            {
                text: "Cette nuit-là, la sorcière attacha les tresses coupées à la fenêtre. Quand le prince arriva et cria, les cheveux tombèrent, mais en montant, il ne trouva pas sa bien-aimée Raiponce, mais le visage furieux de la sorcière. — \"Tu ne la reverras jamais !\", cria la sorcière avec un rire cruel. \"L'oiseau est parti, le nid est vide !\" Désespéré, le prince se jeta du haut de la tour. Il survécut à la chute, mais tomba sur un lit d'épines qui lui arrachèrent les yeux. Aveugle et désolé, il erra dans la forêt pendant des années, se nourrissant de racines et de baies, appelant Raiponce dans sa souffrance."
            },
            {
                text: "Un jour, le prince aveugle arriva dans un désert aride et désolé. Il entendit un chant familier, une voix qu'il reconnaîtrait entre mille. C'était Raiponce, qui vivait là avec deux petits jumeaux, fruits de leur amour. Elle le reconnut immédiatement et se jeta dans ses bras, pleurant de joie. Deux de ses larmes tombèrent sur les yeux aveugles du prince. Miraculeusement, à cet instant, sa vue revint."
            },
            {
                text: "Ensemble, le prince, Raiponce et leurs enfants retournèrent au royaume du prince, où ils furent accueillis avec une grande joie. Ils vécurent heureux pour toujours, et l'amour et la persévérance de Raiponce devinrent une légende, prouvant que même dans la plus sombre des prisons, l'espoir peut tisser un chemin vers la liberté."
            }
        ],
        contentDe: [
            {
                text: "Vor langer Zeit lebten in einem kleinen Haus, das an einen magischen Garten grenzte, ein Mann und eine Frau. Der Garten, umgeben von einer sehr hohen Mauer, gehörte einer in der ganzen Gegend gefürchteten Zauberin, die niemand herauszufordern wagte. Eines Tages verspürte die Frau ein unwiderstehliches Gelüst, ein unkontrollierbares Verlangen nach Rapunzeln, einer Art wildem Salat, der in jenem verzauberten Garten wuchs. Ihr Sehnsucht war so stark, dass sie dahinsiechte und zu sterben drohte, wenn sie sie nicht kostete. Ihr Mann, verzweifelt sie zu retten, beschloss eines Nachts, die Mauer zu erklimmen und einige Rapunzeln zu stehlen."
            },
            {
                text: "Am nächsten Tag kehrte das Gelüst der Frau stärker als je zuvor zurück. Der Mann kehrte mit angstvollem Herzen in den Garten zurück. Aber dieses Mal, als er hinabstieg, stand er der Zauberin gegenüber. Ihre Augen sprühten Funken vor Wut. — \"Wie wagst du es, meinen Garten wie ein Dieb zu betreten!\", brüllte die Zauberin mit einer Stimme, die das Blut gefrieren ließ. \"Du wirst teuer für deine Unverschämtheit bezahlen!\" Der Mann flehte um Gnade und erklärte die Verzweiflung seiner Frau. Die Zauberin willigte mit einem boshaften Lächeln ein, ihn gehen zu lassen, im Austausch für ein schreckliches Versprechen: Das Kind, das seine Frau erwartete, sollte ihr bei der Geburt übergeben werden. Der Mann, entsetzt, nahm an."
            },
            {
                text: "Als das Mädchen geboren wurde, war es das schönste Geschöpf, das man je gesehen hatte. Die Zauberin erschien sofort, nahm es in ihre Arme und nannte es Rapunzel, zu Ehren des Salats, der sein Schicksal verursacht hatte. Sie brachte es tief in den Wald und sperrte es in einen riesigen Turm, ohne Türen oder Treppen, mit nur einem winzigen Fenster an der Spitze. Dort wuchs Rapunzel isoliert von der Welt auf, mit der Zauberin als einziger Gesellschaft."
            },
            {
                text: "Rapunzel hatte eine melodiöse Stimme und das längste und schönste Haar, das man je gesehen hatte: eine goldene Kaskade, die bis zum Boden fiel. Wenn die Zauberin den Turm hinaufsteigen wollte, stellte sie sich an den Fuß und rief: — \"Rapunzel, Rapunzel, lass dein Haar herunter!\" Und Rapunzel rollte mit einem Seufzer ihre goldenen Zöpfe aus und ließ sie aus dem Fenster fallen, sodass sie eine Leiter bildeten, die die Zauberin mit Leichtigkeit erklomm."
            },
            {
                text: "Jahre vergingen. Eines Tages hörte ein junger Prinz, der durch den Wald ritt, eine so schöne Stimme, dass er sein Pferd anhielt. Es war Rapunzel, das sang, um sich die langen Stunden der Einsamkeit zu vertreiben. Fasziniert suchte der Prinz nach dem Ursprung der Stimme und fand den türlosen Turm. Neugierig versteckte er sich im Gebüsch und beobachtete, wie die Zauberin Rapunzel rief und an ihrem Haar hinaufstieg."
            },
            {
                text: "Am nächsten Tag kehrte der Prinz zurück und rief, die Stimme der Zauberin nachahmend: — \"Rapunzel, Rapunzel, lass dein Haar herunter!\" Die goldenen Zöpfe fielen, und der Prinz kletterte bis zur Spitze. Anfangs erschrak Rapunzel schrecklich, als sie einen Mann sah, denn sie hatte noch nie einen gesehen. Aber der Prinz sprach mit freundlichen Worten und sanfter Stimme zu ihr von seiner Bewunderung für ihren Gesang und ihre Schönheit. Nach und nach fühlte sich Rapunzel wohl in seiner Gesellschaft. Sie verliebten sich."
            },
            {
                text: "Der Prinz besuchte sie jeden Nachmittag und kletterte an ihrem Haar hinauf. Zusammen entwarfen sie einen Fluchtplan: Er würde ihr jedes Mal, wenn er kam, einen Strang Seide mitbringen, und sie würde daraus eine Leiter weben. Wenn die Leiter fertig wäre, würde sie hinabsteigen und sie würden zusammen fliehen."
            },
            {
                text: "Eines Tages jedoch beging Rapunzel einen Fehler. Sie fragte die Zauberin arglos: \"Sag mir, Frau Gothel, warum klettert mein Prinz so schnell an meinem Haar hinauf, während es dir so viel Mühe kostet?\" Die Zauberin verstand mit einem Blick voller Wut den Verrat. Mit einer Schere schnitt sie Rapunzels langes goldenes Haar ab und ließ sie mit kurzem Haar zurück. Dann verbannte sie sie mit einem Zauber in eine ferne Wüste, wo sie im Elend leben sollte."
            },
            {
                text: "Noch in derselben Nacht band die Zauberin die abgeschnittenen Zöpfe an das Fenster. Als der Prinz ankam und rief, fiel das Haar, aber als er hinaufkletterte, fand er nicht sein geliebtes Rapunzel, sondern das wütende Gesicht der Zauberin. — \"Du wirst sie nie wiedersehen!\", schrie die Zauberin mit einem grausamen Lachen. \"Der Vogel ist fort, das Nest ist leer!\" Verzweifelt stürzte sich der Prinz vom Turm. Er überlebte den Sturz, fiel aber in ein Dornengebüsch, das ihm die Augen ausstach. Blind und trostlos irrte er jahrelang durch den Wald, ernährte sich von Wurzeln und Beeren und rief in seinem Leid nach Rapunzel."
            },
            {
                text: "Eines Tages kam der blinde Prinz in eine dürre und trostlose Wüste. Er hörte einen vertrauten Gesang, eine Stimme, die er unter tausenden erkennen würde. Es war Rapunzel, das dort mit zwei kleinen Zwillingen lebte, Früchte ihrer Liebe. Sie erkannte ihn sofort und warf sich in seine Arme, vor Freude weinend. Zwei ihrer Tränen fielen auf die blinden Augen des Prinzen. Wie durch ein Wunder kehrte in diesem Augenblick sein Augenlicht zurück."
            },
            {
                text: "Zusammen kehrten der Prinz, Rapunzel und ihre Kinder in das Königreich des Prinzen zurück, wo sie mit großer Freude empfangen wurden. Sie lebten glücklich bis ans Ende ihrer Tage, und Rapunzels Liebe und Beharrlichkeit wurden zur Legende, die bewies, dass Hoffnung selbst im dunkelsten Gefängnis einen Weg in die Freiheit weben kann."
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
        rating: 4.1,
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
        ],
        contentEn: [
            {
                text: "This is the story of Jack and the Beanstalk, a chronicle about ambition, courage, and how an act of apparent madness can change the fate of a family plunged into misery. On the outskirts of a village where the land was so poor it barely fed the sparrows, lived a widow with her only son, Jack. They were so humble that their most valuable possession was not gold or land, but an old, scrawny cow named Milky White. But a winter so harsh arrived that the cow stopped giving milk, and hunger began to gnaw at the stomach walls of Jack and his mother. With tears in her eyes, the woman asked her son to take the animal to the market to sell it: \"Son, make sure to bring back a good bag of coins, or we won't survive the month.\""
            },
            {
                text: "Jack set off, pulling the cow's rope. He hadn't gone very far when he crossed paths with a strange-looking man, who wore a cloak made of colorful patches and whose eyes shone with an unusual light. The man stopped and, after observing the cow, made him an unheard-of offer: —\"Boy, I will give you these five beans for your cow. But they are not common seeds; they are magic beans. If you plant them tonight, by tomorrow they will have reached the sky.\" Jack, driven by a youthful impulse and fascination with the supernatural, accepted the deal. Upon returning home, his mother, seeing that he brought seeds instead of gold, exploded in fury and weeping. She threw the beans out the window into the garden and sent Jack to bed without supper."
            },
            {
                text: "The next morning, Jack's room was plunged into a greenish gloom. Upon leaning out, he was breathless: where there was once dry earth, now stood a colossal plant, a beanstalk as thick as an oak trunk twisting upwards, piercing through the clouds until it was lost from sight. Without hesitation, Jack began to climb. He climbed for hours, feeling the air becoming purer and the world below transforming into a tiny toy."
            },
            {
                text: "Upon reaching the top, he found himself in a strange land, a desert of solid clouds leading to a castle of cyclopean dimensions. Jack, moved by hunger, knocked on the door. A giant woman opened it, who, seeing him so small, took pity on him and let him in to give him some bread and milk. \"But hide quickly,\" she warned him, \"for my husband, the Ogre, is about to arrive, and nothing he likes more than the aroma of a roasted boy.\""
            },
            {
                text: "Suddenly, the earth shook under footsteps that sounded like thunder. The Ogre entered sniffing the air with his hooked nose. —\"Fee-fi-fo-fum! I smell the blood of an Englishman. Be he alive, or be he dead, I'll grind his bones to make my bread.\" The woman distracted him with a huge roasted boar. After eating, the Ogre took out a bag of gold coins and began to count them until sleep overcame him. Jack, coming out of his hiding place, took the bag of gold, went down the plant in a hurry, and gave the fortune to his mother."
            },
            {
                text: "For a time they lived comfortably, but curiosity and audacity called at Jack's door again. He climbed a second time. On this occasion, he saw the Ogre take out a magic hen that, upon ordering it \"Lay!\", laid an egg of pure gold. Jack waited for the giant to snore, stole the hen, and returned to the earth. Now they were rich, but Jack's spirit of adventure did not rest."
            },
            {
                text: "He went up a third time. In the castle, he saw the giant's most amazing treasure: a golden harp that played celestial music by itself. When the Ogre fell asleep, Jack took it, but the harp was magic and had a voice of its own. \"Master, master, they are stealing me!\" shouted the instrument. The Ogre woke up with a roar of fury and chased Jack towards the stalk."
            },
            {
                text: "Jack descended with the agility of a cat, while the giant made the plant creak with his monstrous weight. Upon touching the ground, Jack shouted: \"Mother, the axe, quick!\" With a precise blow, he cut the beanstalk. The giant fell from the heights, opening a huge pit in the earth where he disappeared forever. Jack and his mother, now owners of the hen that laid golden eggs and the wonderful harp, lived in peace and abundance, understanding that, sometimes, one must climb above the clouds to find what we really need."
            }
        ],
        contentFr: [
            {
                text: "C'est l'histoire de Jack et le Haricot Magique, une chronique sur l'ambition, le courage et comment un acte de folie apparente peut changer le destin d'une famille plongée dans la misère. En marge d'un village où la terre était si pauvre qu'elle nourrissait à peine les moineaux, vivait une veuve avec son fils unique, Jack. Ils étaient si humbles que leur possession la plus précieuse n'était ni or ni terres, mais une vieille vache décharnée nommée Blanche-Laitière. Mais un hiver si rude arriva que la vache cessa de donner du lait, et la faim commença à ronger les parois de l'estomac de Jack et de sa mère. Les larmes aux yeux, la femme demanda à son fils d'emmener l'animal au marché pour le vendre : \"Fils, assure-toi de rapporter une bonne bourse de pièces, ou nous ne survivrons pas au mois.\""
            },
            {
                text: "Jack se mit en route, tirant la corde de la vache. Il n'avait pas avancé beaucoup quand il croisa un homme à l'aspect étrange, vêtu d'une cape faite de lambeaux colorés et dont les yeux brillaient d'une lumière inhabituelle. L'homme s'arrêta et, après avoir observé la vache, lui fit une offre inouïe : — \"Mon garçon, je te donnerai ces cinq haricots pour ta vache. Mais ce ne sont pas des graines ordinaires ; ce sont des haricots magiques. Si tu les sèmes ce soir, demain ils auront atteint le ciel.\" Jack, poussé par une impulsion juvénile et la fascination pour le surnaturel, accepta le marché. En rentrant chez lui, sa mère, voyant qu'il apportait des graines au lieu d'or, explosa de colère et de pleurs. Elle jeta les haricots par la fenêtre dans le jardin et envoya Jack au lit sans dîner."
            },
            {
                text: "Le lendemain matin, la chambre de Jack était plongée dans une pénombre verdâtre. En se penchant, il eut le souffle coupé : là où il y avait avant de la terre sèche, se dressait maintenant une plante colossale, une tige de haricot aussi épaisse qu'un tronc de chêne qui se tordait vers le haut, traversant les nuages jusqu'à se perdre de vue. Sans hésiter, Jack commença à grimper. Il escalada pendant des heures, sentant l'air devenir plus pur et le monde d'en bas se transformer en un jouet minuscule."
            },
            {
                text: "En arrivant au sommet, il se retrouva dans un pays étrange, un désert de nuages solides menant à un château aux dimensions cyclopéennes. Jack, poussé par la faim, frappa à la porte. Une femme géante lui ouvrit, et voyant qu'il était si petit, eut pitié de lui et le laissa entrer pour lui donner un peu de pain et de lait. \"Mais cache-toi vite\", l'avertit-elle, \"car mon mari, l'Ogre, est sur le point d'arriver, et rien ne lui plaît plus que l'arôme d'un enfant rôti.\""
            },
            {
                text: "Soudain, la terre trembla sous des pas qui sonnaient comme le tonnerre. L'Ogre entra en reniflant l'air avec son nez crochu. — \"Fi-fai-fo-fum ! Je sens le sang d'un homme ordinaire. Qu'il soit vivant ou qu'il soit mort, je broierai ses os pour faire mon pain.\" La femme le distraya avec un énorme sanglier rôti. Après avoir mangé, l'Ogre sortit un sac de pièces d'or et se mit à les compter jusqu'à ce que le sommeil le vainque. Jack, sortant de sa cachette, prit le sac d'or, descendit en toute hâte par la plante et remit la fortune à sa mère."
            },
            {
                text: "Pendant un temps ils vécurent avec aisance, mais la curiosité et l'audace frappèrent de nouveau à la porte de Jack. Il grimpa une deuxième fois. Cette fois-ci, il vit l'Ogre sortir une poule magique qui, lorsqu'il lui ordonnait \"Ponds !\", pondait un œuf d'or pur. Jack attendit que le géant ronfle, vola la poule et retourna sur terre. Ils étaient maintenant riches, mais l'esprit d'aventure de Jack ne se reposait pas."
            },
            {
                text: "Il monta une troisième fois. Dans le château, il vit le trésor le plus étonnant du géant : une harpe d'or qui jouait de la musique céleste toute seule. Quand l'Ogre s'endormit, Jack la prit, mais la harpe était magique et avait sa propre voix. \"Maître, maître, on me vole !\", cria l'instrument. L'Ogre se réveilla avec un rugissement de fureur et poursuivit Jack vers la tige."
            },
            {
                text: "Jack descendit avec l'agilité d'un chat, tandis que le géant faisait craquer la plante de son poids monstrueux. En touchant le sol, Jack cria : \"Mère, la hache, vite !\" D'un coup précis, il coupa la tige du haricot. Le géant tomba des hauteurs, ouvrant un énorme fossé dans la terre où il disparut pour toujours. Jack et sa mère, désormais propriétaires de la poule aux œufs d'or et de la harpe merveilleuse, vécurent en paix et dans l'abondance, comprenant que, parfois, il faut grimper au-dessus des nuages pour trouver ce dont nous avons vraiment besoin."
            }
        ],
        contentDe: [
            {
                text: "Dies ist die Geschichte von Jack und der Bohnenstange, eine Chronik über Ehrgeiz, Mut und wie ein Akt scheinbaren Wahnsinns das Schicksal einer Familie, die im Elend versunken ist, verändern kann. Am Rande eines Dorfes, wo der Boden so arm war, dass er kaum die Spatzen ernährte, lebte eine Witwe mit ihrem einzigen Sohn, Jack. Sie waren so bescheiden, dass ihr wertvollster Besitz weder Gold noch Land war, sondern eine alte und dürre Kuh namens Milky White. Doch es kam ein Winter, der so streng war, dass die Kuh keine Milch mehr gab und der Hunger an den Magenwänden von Jack und seiner Mutter zu nagen begann. Mit Tränen in den Augen bat die Frau ihren Sohn, das Tier zum Markt zu bringen, um es zu verkaufen: \"Sohn, sieh zu, dass du einen guten Beutel Münzen mitbringst, sonst überleben wir den Monat nicht.\""
            },
            {
                text: "Jack machte sich auf den Weg und zog am Strick der Kuh. Er war noch nicht weit gekommen, als er einem merkwürdig aussehenden Mann begegnete, der einen Umhang aus bunten Flicken trug und dessen Augen in einem ungewöhnlichen Licht leuchteten. Der Mann hielt an und machte ihm, nachdem er die Kuh betrachtet hatte, ein unerhörtes Angebot: — \"Junge, ich gebe dir diese fünf Bohnen für deine Kuh. Aber es sind keine gewöhnlichen Samen; es sind Zauberbohnen. Wenn du sie heute Nacht säst, werden sie bis morgen den Himmel erreicht haben.\" Jack, getrieben von einem jugendlichen Impuls und der Faszination für das Übernatürliche, nahm den Handel an. Als er nach Hause kam, explodierte seine Mutter vor Wut und Weinen, als sie sah, dass er Samen statt Gold brachte. Sie warf die Bohnen aus dem Fenster in den Garten und schickte Jack ohne Abendessen ins Bett."
            },
            {
                text: "Am nächsten Morgen lag Jacks Zimmer in einem grünlichen Dämmerlicht. Als er sich hinauslehnte, blieb ihm die Luft weg: Wo vorher trockene Erde war, erhob sich jetzt eine kolossale Pflanze, eine Bohnenstange so dick wie ein Eichenstamm, die sich nach oben wand und durch die Wolken stieß, bis sie außer Sichtweite war. Ohne zu zögern, begann Jack zu klettern. Er kletterte stundenlang und spürte, wie die Luft reiner wurde und die Welt unten sich in ein winziges Spielzeug verwandelte."
            },
            {
                text: "Als er oben ankam, fand er sich in einem fremden Land wieder, einer Wüste aus festen Wolken, die zu einem Schloss von kyklopischen Ausmaßen führte. Jack, getrieben vom Hunger, klopfte an die Tür. Eine Riesin öffnete ihm, die, als sie ihn so klein sah, Mitleid mit ihm hatte und ihn hereinließ, um ihm etwas Brot und Milch zu geben. \"Aber versteck dich schnell\", warnte sie ihn, \"denn mein Mann, der Oger, kommt gleich, und nichts mag er lieber als den Duft eines gebratenen Jungen.\""
            },
            {
                text: "Plötzlich bebte die Erde unter Schritten, die wie Donner klangen. Der Oger trat ein und schnupperte mit seiner Hakennase in der Luft. — \"Fee-fi-fo-fum! Ich rieche das Blut eines Menschen. Sei er lebendig oder sei er tot, ich mahle seine Knochen zu meinem Brot.\" Die Frau lenkte ihn mit einem riesigen gebratenen Wildschwein ab. Nach dem Essen holte der Oger einen Beutel mit Goldmünzen heraus und begann sie zu zählen, bis der Schlaf ihn übermannte. Jack kam aus seinem Versteck, nahm den Goldbeutel, stieg in aller Eile die Pflanze hinab und übergab das Vermögen seiner Mutter."
            },
            {
                text: "Eine Zeit lang lebten sie komfortabel, aber die Neugier und der Wagemut klopften wieder an Jacks Tür. Er kletterte ein zweites Mal hinauf. Bei dieser Gelegenheit sah er, wie der Oger eine Zauberhenne hervorholte, die auf den Befehl \"Leg!\" ein Ei aus purem Gold legte. Jack wartete, bis der Riese schnarchte, stahl die Henne und kehrte zur Erde zurück. Jetzt waren sie reich, aber Jacks Abenteuergeist ruhte nicht."
            },
            {
                text: "Er stieg ein drittes Mal hinauf. Im Schloss sah er den erstaunlichsten Schatz des Riesen: eine goldene Harfe, die von selbst himmlische Musik spielte. Als der Oger einschlief, nahm Jack sie, aber die Harfe war magisch und hatte eine eigene Stimme. \"Meister, Meister, sie stehlen mich!\", schrie das Instrument. Der Oger erwachte mit einem Wutgebrüll und verfolgte Jack zur Bohnenstange."
            },
            {
                text: "Jack stieg mit der Gewandtheit einer Katze hinab, während der Riese die Pflanze mit seinem monströsen Gewicht ächzen ließ. Als er den Boden berührte, schrie Jack: \"Mutter, die Axt, schnell!\" Mit einem gezielten Schlag hieb er die Bohnenstange durch. Der Riese stürzte aus der Höhe herab und riss einen riesigen Graben in die Erde, in dem er für immer verschwand. Jack und seine Mutter, nun Besitzer der Henne, die goldene Eier legte, und der wunderbaren Harfe, lebten in Frieden und Überfluss und verstanden, dass man manchmal über die Wolken klettern muss, um das zu finden, was man wirklich braucht."
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
        rating: 3.8,
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
        ],
        contentEn: [
            {
                text: "This is the story of The Pied Piper of Hamelin, a tale that walks the fine line between gratitude and revenge, set in a town that learned the hard way the value of a kept promise. Hamelin was a prosperous town, with carved wooden houses and bustling markets on the banks of the river Weser."
            },
            {
                text: "However, an especially hot summer brought with it a plague that neither cat nor poison could stop. Rats, thousands of them, emerged from the sewers and basements. They were bold rats that stole food from children's plates, hid in gentlemen's shoes, and made nests in ladies' hats. The town lived in a state of hysteria; the squeaking of rodents was the only sound heard at night."
            },
            {
                text: "The mayor and the councilors, fat and pompous men, met in the town hall, but their minds were as empty as their solutions. It was then that a stranger appeared. He was a tall, thin man, dressed in a brightly colored cloth jacket and a hat with a pheasant feather. Around his neck hung a dark, polished wooden flute. —\"I know how to rid your town of this plague,\" said the stranger with a voice that sounded like the wind among the reeds. \"In exchange, I ask for a thousand gold coins.\" The councilors, desperate, would have promised even the sun. \"A thousand! We'll give you fifty thousand if you rid us of these monsters!\" exclaimed the mayor."
            },
            {
                text: "The piper went out into the main square, put the instrument to his lips, and began to play a strange melody, a sequence of notes that seemed to vibrate in the bones. Instantly, silence fell over the town, followed by the roar of millions of tiny feet. Rats came out from everywhere: from barns, churches, beds, and closets. They formed a river of gray fur that followed the piper as he walked toward the river Weser. Without stopping playing, the man entered the water, and the rats, hypnotized by the music, threw themselves after him and were swept away by the current until they disappeared."
            },
            {
                text: "The town erupted in cheers. Bells were rung and feasts were prepared. But when the piper returned to the town hall to claim his payment, greed had taken over the mayor's heart. —\"A thousand coins for a bit of music?\" scoffed the mayor. \"Take these fifty and be satisfied. The rats are already dead, they can't come back.\" The piper did not argue. His eyes shone with a cold, dangerous light. \"You will regret breaking your word,\" he whispered before disappearing into the shadows of an alley."
            },
            {
                text: "The day of Saint John and Saint Paul arrived. While the adults were in church, the piper returned. This time, the melody of his flute was different: sweet, magical, like the whisper of an enchanted forest or the smell of freshly baked cakes. This time it wasn't the rats. Children came out of all the houses, running with laughter and jumps of joy. They followed the piper as if they were butterflies chasing a flower. The parents, trapped in the church, could only watch with horror through the windows as their children walked away."
            },
            {
                text: "The piper led them out of the town, toward Koppelberg Mountain. When they reached the slope, a door of solid rock opened magically and everyone, the piper and the children, entered the heart of the mountain, which closed behind them forever. Only three children were left behind: one who was lame and couldn't run fast enough, one who was deaf and couldn't hear the music, and another who was blind and got lost on the way."
            },
            {
                text: "They told how the piper had promised to take them to a place where trees always had fruit, birds spoke, and no one ever cried. Hamelin became a town of silence and mourning, a place where, since that day, it is forbidden to play music on the street where the children left, so that the price of a broken promise is never forgotten."
            }
        ],
        contentFr: [
            {
                text: "C'est l'histoire du Joueur de Flûte de Hamelin, un récit qui marche sur la ligne ténue entre la gratitude et la vengeance, situé dans une ville qui a appris à la dure la valeur d'une promesse tenue. Hamelin était une ville prospère, avec des maisons en bois sculpté et des marchés animés sur les rives de la rivière Weser."
            },
            {
                text: "Cependant, un été particulièrement chaud apporta avec lui un fléau que ni chat ni poison ne pouvaient arrêter. Les rats, des milliers d'entre eux, surgirent des égouts et des sous-sols. C'étaient des rats audacieux qui volaient la nourriture dans les assiettes des enfants, se cachaient dans les chaussures des gentilshommes et faisaient des nids dans les chapeaux des dames. La ville vivait dans un état d'hystérie ; le cri des rongeurs était le seul bruit que l'on entendait la nuit."
            },
            {
                text: "Le maire et les conseillers, des hommes gras et pompeux, se réunirent à l'hôtel de ville, mais leurs esprits étaient aussi vides que leurs solutions. C'est alors qu'apparut un étranger. C'était un homme grand et mince, vêtu d'une veste en tissu aux couleurs vives et d'un chapeau avec une plume de faisan. Autour de son cou pendait une flûte en bois sombre et poli. — \"Je sais comment débarrasser votre ville de ce fléau\", dit l'inconnu d'une voix qui ressemblait au vent dans les roseaux. \"En échange, je demande mille pièces d'or\". Les conseillers, désespérés, auraient promis même le soleil. \"Mille ! Nous t'en donnerons cinquante mille si tu nous débarrasses de ces monstres !\", s'exclama le maire."
            },
            {
                text: "Le joueur de flûte sortit sur la place principale, porta l'instrument à ses lèvres et commença à jouer une mélodie étrange, une suite de notes qui semblait vibrer dans les os. Instantanément, le silence tomba sur la ville, suivi par le fracas de millions de pattes minuscules. Les rats sortirent de partout : des granges, des églises, des lits et des placards. Ils formèrent une rivière de fourrure grise qui suivait le joueur de flûte alors qu'il marchait vers la rivière Weser. Sans cesser de jouer, l'homme entra dans l'eau, et les rats, hypnotisés par la musique, se jetèrent après lui et furent emportés par le courant jusqu'à disparaître."
            },
            {
                text: "La ville éclata en acclamations. On sonna les cloches et on prépara des banquets. Mais quand le joueur de flûte retourna à l'hôtel de ville pour réclamer son paiement, l'avarice s'était emparée du cœur du maire. — \"Mille pièces pour un peu de musique ?\", se moqua le maire. \"Prends ces cinquante et estime-toi satisfait. Les rats sont déjà morts, ils ne peuvent pas revenir\". Le joueur de flûte ne discuta pas. Ses yeux brillèrent d'une lumière froide et dangereuse. \"Vous regretterez d'avoir rompu votre parole\", murmura-t-il avant de disparaître dans l'ombre d'une ruelle."
            },
            {
                text: "Le jour de la Saint-Jean et Saint-Paul arriva. Alors que les adultes étaient à l'église, le joueur de flûte revint. Cette fois, la mélodie de sa flûte était différente : douce, magique, comme le murmure d'une forêt enchantée ou l'odeur des gâteaux fraîchement sortis du four. Cette fois, ce ne furent pas les rats. De toutes les maisons sortirent les enfants, courant avec des rires et des sauts de joie. Ils suivaient le joueur de flûte comme s'ils étaient des papillons poursuivant une fleur. Les parents, piégés dans l'église, ne purent qu'observer avec horreur par les fenêtres leurs enfants s'éloigner."
            },
            {
                text: "Le joueur de flûte les guida hors de la ville, vers la montagne Koppelberg. Quand ils arrivèrent à la pente, une porte de roche solide s'ouvrit magiquement et tous, le joueur de flûte et les enfants, entrèrent dans le cœur de la montagne, qui se referma derrière eux pour toujours. Seuls trois enfants restèrent derrière : un qui était boiteux et ne pouvait pas courir assez vite, un qui était sourd et ne pouvait pas entendre la musique, et un autre qui était aveugle et se perdit en chemin."
            },
            {
                text: "Ils racontèrent comment le joueur de flûte avait promis de les emmener dans un endroit où les arbres avaient toujours des fruits, les oiseaux parlaient et personne ne pleurait jamais. Hamelin devint une ville de silence et de deuil, un endroit où, depuis ce jour, il est interdit de jouer de la musique dans la rue par laquelle les enfants sont partis, pour que jamais ne soit oublié le prix d'une promesse rompue."
            }
        ],
        contentDe: [
            {
                text: "Dies ist die Geschichte vom Rattenfänger von Hameln, eine Erzählung, die auf dem schmalen Grat zwischen Dankbarkeit und Rache wandert, angesiedelt in einer Stadt, die auf die harte Tour den Wert eines gehaltenen Versprechens lernte. Hameln war eine wohlhabende Stadt mit geschnitzten Holzhäusern und geschäftigen Märkten am Ufer der Weser."
            },
            {
                text: "Doch ein besonders heißer Sommer brachte eine Plage mit sich, die weder Katze noch Gift aufhalten konnten. Ratten, Tausende von ihnen, kamen aus den Kanälen und Kellern. Es waren dreiste Ratten, die das Essen von den Tellern der Kinder stahlen, sich in den Schuhen der Herren versteckten und Nester in den Hüten der Damen bauten. Die Stadt lebte in einem Zustand der Hysterie; das Quieken der Nagetiere war das einzige Geräusch, das man nachts hörte."
            },
            {
                text: "Der Bürgermeister und die Ratsherren, dicke und aufgeblasene Männer, trafen sich im Rathaus, aber ihre Köpfe waren so leer wie ihre Lösungen. Da erschien ein Fremder. Er war ein großer, dünner Mann, gekleidet in eine Jacke aus buntem Stoff und einen Hut mit einer Fasanenfeder. Um seinen Hals hing eine dunkle, polierte Holzflöte. — \"Ich weiß, wie ich eure Stadt von dieser Plage befreien kann\", sagte der Unbekannte mit einer Stimme, die wie der Wind im Schilf klang. \"Im Gegenzug verlange ich tausend Goldmünzen.\" Die verzweifelten Ratsherren hätten sogar die Sonne versprochen. \"Tausend! Wir geben dir fünfzigtausend, wenn du uns von diesen Monstern befreist!\", rief der Bürgermeister."
            },
            {
                text: "Der Rattenfänger ging auf den Hauptplatz, setzte das Instrument an die Lippen und begann eine seltsame Melodie zu spielen, eine Folge von Noten, die in den Knochen zu vibrieren schienen. Augenblicklich fiel Stille über die Stadt, gefolgt vom Getöse von Millionen winziger Füße. Ratten kamen von überall her: aus Scheunen, Kirchen, Betten und Schränken. Sie bildeten einen Fluss aus grauem Fell, der dem Rattenfänger folgte, während dieser auf den Fluss Weser zuging. Ohne aufzuhören zu spielen, stieg der Mann ins Wasser, und die von der Musik hypnotisierten Ratten stürzten sich hinter ihm her und wurden von der Strömung mitgerissen, bis sie verschwanden."
            },
            {
                text: "Die Stadt brach in Jubel aus. Glocken wurden geläutet und Festmahle vorbereitet. Aber als der Rattenfänger zum Rathaus zurückkehrte, um seinen Lohn einzufordern, hatte der Geiz das Herz des Bürgermeisters ergriffen. — \"Tausend Münzen für ein bisschen Musik?\", spottete der Bürgermeister. \"Nimm diese fünfzig und gib dich zufrieden. Die Ratten sind schon tot, sie können nicht zurückkommen.\" Der Rattenfänger diskutierte nicht. Seine Augen leuchteten in einem kalten, gefährlichen Licht. \"Ihr werdet es bereuen, euer Wort gebrochen zu haben\", flüsterte er, bevor er in den Schatten einer Gasse verschwand."
            },
            {
                text: "Der Tag von Johannes und Paul kam. Während die Erwachsenen in der Kirche waren, kehrte der Rattenfänger zurück. Diesmal war die Melodie seiner Flöte anders: süß, magisch, wie das Flüstern eines verzauberten Waldes oder der Duft von frisch gebackenen Kuchen. Diesmal waren es nicht die Ratten. Aus allen Häusern kamen die Kinder, rennend mit Lachen und Freudensprüngen. Sie folgten dem Rattenfänger, als wären sie Schmetterlinge, die einer Blume folgen. Die Eltern, gefangen in der Kirche, konnten nur mit Entsetzen durch die Fenster zusehen, wie ihre Kinder sich entfernten."
            },
            {
                text: "Der Rattenfänger führte sie aus der Stadt hinaus, zum Koppelberg. Als sie den Hang erreichten, öffnete sich magisch eine Tür aus festem Fels und alle, der Rattenfänger und die Kinder, betraten das Herz des Berges, der sich hinter ihnen für immer schloss. Nur drei Kinder blieben zurück: eines, das lahm war und nicht schnell genug laufen konnte, eines, das taub war und die Musik nicht hören konnte, und ein anderes, das blind war und sich auf dem Weg verirrte."
            },
            {
                text: "Sie erzählten, wie der Rattenfänger versprochen hatte, sie an einen Ort zu bringen, wo die Bäume immer Früchte trugen, die Vögel sprachen und niemand je weinte. Hameln wurde zu einer Stadt der Stille und Trauer, ein Ort, an dem es seit jenem Tag verboten ist, in der Straße, durch die die Kinder gingen, Musik zu spielen, damit der Preis eines gebrochenen Versprechens niemals vergessen wird."
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
        rating: 4.4,
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
        ],
        contentEn: [
            {
                text: "This is the story of Pinocchio, a chronicle about the formation of the soul, the struggle against temptations, and the arduous path that separates a piece of wood from a human heart. In a small Italian village with cobbled streets and narrow workshops, lived an old carpenter named Geppetto. He was a man with knobby hands and a lonely heart who, to alleviate his melancholy, decided to carve a puppet from pine wood. However, as soon as he began to sculpt, something extraordinary happened: the wood began to laugh at his tickling and protest the blows of the mallet. Geppetto, astonished, finished the figure of a boy whom he named Pinocchio. But before he could teach him to walk, the doll took on a life of its own, kicked him, and ran away into the street."
            },
            {
                text: "That puppet was a whirlwind of recklessness. Geppetto, treating him like a son, sold his only warm coat, despite the harsh winter, to buy him an alphabet book and send him to school. Pinocchio, moved for a moment, promised to be the best student in the world. But the road to school is full of distractions for someone with a head made of wood. Hearing the sound of cymbals and drums, Pinocchio forgot his promise and sold his alphabet book to buy a ticket to the Great Puppet Theater of Fire-Eater."
            },
            {
                text: "There, after almost being burned to cook a ram, the theater owner took pity on him and gave him five gold coins for his father. Pinocchio returned home proud, but on the way he ran into the Fox and the Cat, two swindlers posing as lame and blind. With honeyed words, they convinced the doll that if he buried his coins in the \"Field of Miracles,\" a tree loaded with gold would grow. Pinocchio, blinded by greed, followed them, ignoring the warnings of the Talking Cricket Spirit, whom he ended up silencing with a slap. Of course, the crooks ambushed him, hung him from an oak tree, and stole his treasures."
            },
            {
                text: "It was then that the Blue Fairy appeared, a creature with turquoise hair who lived in a crystal house. She rescued Pinocchio and, when asked where the coins were, the doll lied. In that instant, his nose began to grow and grow, extending so much that he could not move around the room. \"Lies, Pinocchio,\" said the Fairy with a sad smile, \"have short legs or long noses.\" Only after many tears and repentance did the Fairy call some woodpeckers to return his nose to its original size."
            },
            {
                text: "But Pinocchio's nature remained fickle. On the way home, he met his friend \"Lampwick,\" who invited him to the Land of Toys, a place where there were no books, no teachers, no laws, and where children played from morning to night. Pinocchio spent five months of unbridled fun, until one morning he woke up with a strange sensation: his ears had become long and hairy, and he had grown a tail. The Land of Toys was actually a trap to turn lazy children into donkeys and sell them in the market."
            },
            {
                text: "Turned into a donkey, Pinocchio was mistreated and thrown into the sea, where the spell broke and he became a puppet again. But his misfortune did not end there, as he was swallowed by the Great Shark, a sea monster of colossal dimensions. In the darkness of the beast's belly, he saw a distant light. It was Geppetto, who had gone out to look for him in the sea and had been devoured long ago. The reunion was pure crying and joy. Pinocchio, demonstrating genuine courage for the first time, carried his father on his wooden shoulders and took advantage of a yawn from the monster to escape swimming towards the shore."
            },
            {
                text: "From that day on, Pinocchio changed completely. He worked hard on a farm, took care of his sick father, and saved every penny to help the Blue Fairy when he learned that she was also suffering hardships. One night, while he slept, the Fairy visited him in dreams. Upon waking, Pinocchio no longer felt the cold and rigid touch of wood. Looking in the mirror, he saw a boy of flesh and blood, with bright eyes and a smile full of life. Beside him, Geppetto smiled, and in a corner of the room, the old wooden body of the puppet rested like the empty cocoon of a butterfly that has finally learned that being human is not a matter of form, but of love and sacrifice."
            }
        ],
        contentFr: [
            {
                text: "C'est l'histoire de Pinocchio, une chronique sur la formation de l'âme, la lutte contre les tentations et le chemin ardu qui sépare un morceau de bois d'un cœur humain. Dans un petit village italien aux rues pavées et aux ateliers étroits, vivait un vieux charpentier nommé Geppetto. C'était un homme aux mains noueuses et au cœur solitaire qui, pour soulager sa mélancolie, décida de sculpter une marionnette en bois de pin. Cependant, à peine commença-t-il à sculpter qu'il se passa quelque chose d'extraordinaire : le bois commença à rire de ses chatouilles et à protester contre les coups de maillet. Geppetto, étonné, termina la figure d'un garçon qu'il appela Pinocchio. Mais avant qu'il ne puisse lui apprendre à marcher, la poupée prit vie, lui donna un coup de pied et s'enfuit en courant vers la rue."
            },
            {
                text: "Cette marionnette était un tourbillon d'imprudence. Geppetto, le traitant comme un fils, vendit son unique manteau chaud, malgré l'hiver rigoureux, pour lui acheter un abécédaire et l'envoyer à l'école. Pinocchio, ému un instant, promit d'être le meilleur élève du monde. Mais le chemin de l'école est plein de distractions pour qui a la tête faite de bois. En entendant le son des cymbales et des tambours, Pinocchio oublia sa promesse et vendit son abécédaire pour acheter un billet pour le Grand Théâtre de Marionnettes de Mangefeu."
            },
            {
                text: "Là, après avoir failli être brûlé pour cuire un bélier, le propriétaire du théâtre eut pitié de lui et lui offrit cinq pièces d'or pour son père. Pinocchio rentrait chez lui fier, mais en chemin, il tomba sur le Renard et le Chat, deux escrocs qui se faisaient passer pour boiteux et aveugle. Avec des paroles mielleuses, ils convainquirent la poupée que, s'il enterrait ses pièces dans le \"Champ des Miracles\", un arbre chargé d'or pousserait. Pinocchio, aveuglé par l'avidité, les suivit, ignorant les avertissements de l'Esprit du Grillon Parlant, qu'il finit par faire taire d'une tape. Bien sûr, les malfrats lui tendirent une embuscade, le pendirent à un chêne et volèrent ses trésors."
            },
            {
                text: "C'est alors qu'apparut la Fée Bleue, une créature aux cheveux turquoise qui vivait dans une maison de cristal. Elle sauva Pinocchio et, lorsqu'elle lui demanda où étaient les pièces, la poupée mentit. À cet instant, son nez commença à grandir et grandir, s'étendant tellement qu'il ne pouvait plus bouger dans la pièce. \"Les mensonges, Pinocchio\", dit la Fée avec un sourire triste, \"ont les jambes courtes ou le nez long\". Ce n'est qu'après beaucoup de larmes et de repentir que la Fée appela des pics-verts pour rendre à son nez sa taille originale."
            },
            {
                text: "Mais la nature de Pinocchio restait volage. Sur le chemin du retour, il rencontra son ami \"Lumignon\", qui l'invita au Pays des Jouets, un endroit où il n'y avait ni livres, ni maîtres, ni lois, et où les enfants jouaient du matin au soir. Pinocchio passa cinq mois de plaisir effréné, jusqu'à ce qu'un matin il se réveille avec une sensation étrange : ses oreilles étaient devenues longues et velues, et une queue lui avait poussé. Le Pays des Jouets était en réalité un piège pour transformer les enfants paresseux en ânes et les vendre au marché."
            },
            {
                text: "Transformé en âne, Pinocchio fut maltraité et jeté à la mer, où le sortilège se rompit et il redevint une marionnette. Mais son malheur ne s'arrêta pas là, car il fut avalé par le Grand Requin, un monstre marin aux dimensions colossales. Dans l'obscurité du ventre de la bête, il vit une lumière lointaine. C'était Geppetto, qui était parti le chercher en mer et avait été dévoré depuis longtemps. Les retrouvailles furent pur pleurs et joie. Pinocchio, faisant preuve pour la première fois d'un courage authentique, chargea son père sur ses épaules de bois et profita d'un bâillement du monstre pour s'échapper en nageant vers le rivage."
            },
            {
                text: "À partir de ce jour, Pinocchio changea complètement. Il travailla dur dans une ferme, prit soin de son père malade et économisa chaque centime pour aider la Fée Bleue quand il apprit qu'elle traversait aussi des difficultés. Une nuit, pendant qu'il dormait, la Fée lui rendit visite en rêve. Au réveil, Pinocchio ne sentit plus le contact froid et rigide du bois. En se regardant dans le miroir, il vit un garçon de chair et d'os, aux yeux brillants et au sourire plein de vie. À ses côtés, Geppetto souriait, et dans un coin de la chambre, le vieux corps en bois de la marionnette reposait comme le cocon vide d'un papillon qui a finalement appris qu'être humain n'est pas une question de forme, mais d'amour et de sacrifice."
            }
        ],
        contentDe: [
            {
                text: "Dies ist die Geschichte von Pinocchio, eine Chronik über die Bildung der Seele, den Kampf gegen Versuchungen und den mühsamen Weg, der ein Stück Holz von einem menschlichen Herzen trennt. In einem kleinen italienischen Dorf mit gepflasterten Straßen und engen Werkstätten lebte ein alter Tischler namens Geppetto. Er war ein Mann mit knorrigen Händen und einem einsamen Herzen, der beschloss, eine Marionette aus Kiefernholz zu schnitzen, um seine Melancholie zu lindern. Doch kaum begann er zu schnitzen, geschah etwas Außergewöhnliches: Das Holz begann über sein Kitzeln zu lachen und gegen die Schläge des Hammers zu protestieren. Geppetto, erstaunt, vollendete die Figur eines Jungen, den er Pinocchio nannte. Aber bevor er ihm das Laufen beibringen konnte, erwachte die Puppe zum eigenen Leben, trat ihn und rannte auf die Straße."
            },
            {
                text: "Jene Marionette war ein Wirbelwind der Unbesonnenheit. Geppetto, der ihn wie einen Sohn behandelte, verkaufte trotz des strengen Winters seinen einzigen warmen Mantel, um ihm eine Fibel zu kaufen und ihn zur Schule zu schicken. Pinocchio, für einen Moment gerührt, versprach, der beste Schüler der Welt zu sein. Aber der Weg zur Schule ist voller Ablenkungen für jemanden, dessen Kopf aus Holz ist. Als er den Klang von Becken und Trommeln hörte, vergaß Pinocchio sein Versprechen und verkaufte seine Fibel, um eine Eintrittskarte für das Große Marionettentheater von Feuerfresser zu kaufen."
            },
            {
                text: "Dort, nachdem er fast verbrannt worden wäre, um einen Widder zu braten, hatte der Theaterbesitzer Mitleid mit ihm und schenkte ihm fünf Goldmünzen für seinen Vater. Pinocchio kehrte stolz nach Hause zurück, aber auf dem Weg traf er auf den Fuchs und die Katze, zwei Betrüger, die sich als lahm und blind ausgaben. Mit süßen Worten überzeugten sie die Puppe, dass, wenn er seine Münzen auf dem \"Feld der Wunder\" vergrabe, ein mit Gold beladener Baum wachsen würde. Pinocchio, geblendet von Gier, folgte ihnen und ignorierte die Warnungen des Geistes der sprechenden Grille, den er schließlich mit einem Schlag zum Schweigen brachte. Natürlich lauerten ihm die Gauner auf, hängten ihn an eine Eiche und stahlen seine Schätze."
            },
            {
                text: "Da erschien die Blaue Fee, ein Wesen mit türkisfarbenem Haar, das in einem gläsernen Haus lebte. Sie rettete Pinocchio, und als sie ihn fragte, wo die Münzen seien, log die Puppe. In diesem Augenblick begann seine Nase zu wachsen und zu wachsen, sie dehnte sich so sehr aus, dass er sich nicht mehr im Zimmer bewegen konnte. \"Lügen, Pinocchio\", sagte die Fee mit einem traurigen Lächeln, \"haben kurze Beine oder lange Nasen.\" Erst nach vielen Tränen und Reue rief die Fee einige Spechte, um seiner Nase ihre ursprüngliche Größe zurückzugeben."
            },
            {
                text: "Aber Pinocchios Natur blieb wankelmütig. Auf dem Heimweg traf er seinen Freund \"Kerzendocht\", der ihn ins Spielzeugland einlud, einen Ort, wo es keine Bücher, keine Lehrer, keine Gesetze gab und wo die Kinder von morgens bis abends spielten. Pinocchio verbrachte fünf Monate mit ungezügeltem Spaß, bis er eines Morgens mit einem seltsamen Gefühl aufwachte: Seine Ohren waren lang und haarig geworden, und ihm war ein Schwanz gewachsen. Das Spielzeugland war in Wirklichkeit eine Falle, um faule Kinder in Esel zu verwandeln und sie auf dem Markt zu verkaufen."
            },
            {
                text: "In einen Esel verwandelt, wurde Pinocchio misshandelt und ins Meer geworfen, wo der Zauber brach und er wieder eine Marionette wurde. Aber sein Unglück endete dort nicht, denn er wurde vom Großen Hai verschluckt, einem Seeungeheuer von kolossalen Ausmaßen. In der Dunkelheit des Bauches der Bestie sah er ein fernes Licht. Es war Geppetto, der ausgezogen war, um ihn im Meer zu suchen, und vor langer Zeit verschlungen worden war. Das Wiedersehen war reines Weinen und Freude. Pinocchio, der zum ersten Mal echten Mut bewies, lud seinen Vater auf seine hölzernen Schultern und nutzte ein Gähnen des Monsters, um schwimmend zum Ufer zu entkommen."
            },
            {
                text: "Von diesem Tag an änderte sich Pinocchio völlig. Er arbeitete hart auf einem Bauernhof, pflegte seinen kranken Vater und sparte jeden Cent, um der Blauen Fee zu helfen, als er erfuhr, dass auch sie Not litt. Eines Nachts, während er schlief, besuchte ihn die Fee im Traum. Als er aufwachte, spürte Pinocchio nicht mehr die kalte und starre Berührung von Holz. Als er in den Spiegel schaute, sah er einen Jungen aus Fleisch und Blut, mit strahlenden Augen und einem Lächeln voller Leben. Neben ihm lächelte Geppetto, und in einer Ecke des Zimmers ruhte der alte Holzkörper der Marionette wie der leere Kokon eines Schmetterlings, der endlich gelernt hat, dass Menschsein keine Frage der Form ist, sondern der Liebe und des Opfers."
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
        rating: 4.7,
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
        ],
        contentEn: [
            {
                text: "This is the story of The Selfish Giant, a tale about how the ice of loneliness and the hardness of the heart can only be melted by the warmth of generosity and the innocence of childhood. Every afternoon, as they were coming from school, the children used to go and play in the Giant's garden. It was a large and lovely garden, with soft green grass. Here and there over the grass stood beautiful flowers like stars, and there were twelve peach-trees that in the spring-time broke out into delicate blossoms of pink and pearl, and in the autumn bore rich fruit. The birds sat on the trees and sang so sweetly that the children used to stop their games in order to listen to them. \"How happy we are here!\" they cried to each other."
            },
            {
                text: "But one day the Giant came back. He had been away for seven years visiting his friend the Cornish Ogre, and on his return, the first thing he saw was the children playing among his flowers. \"What are you doing here?\" he cried in a very gruff voice that made the children run away in terror. \"My garden is my own garden,\" he said. \"I will allow nobody to play in it but myself.\" So he built a high wall all round it, and put up a notice-board: TRESPASSERS WILL BE PROSECUTED. He was a very selfish Giant."
            },
            {
                text: "Then the Spring came, and all over the country there were little blossoms and little birds. Only in the garden of the Selfish Giant it was still Winter. The birds did not care to sing in it as there were no children, and the trees forgot to blossom. Once a beautiful flower put its head out from the grass, but when it saw the notice-board it was so sorry for the children that it slipped back into the ground again, and went off to sleep. The only people who were pleased were the Snow and the Frost. \"Spring has forgotten this garden,\" they cried, \"so we will live here all the year round.\""
            },
            {
                text: "The Snow covered up the grass with her great white cloak, and the Frost painted all the trees silver. Then they invited the North Wind to stay with them, and he came. He was wrapped in furs, and he roared all day about the garden, and blew the chimney-pots down. \"This is a delightful spot,\" said the Wind, \"we must ask the Hail on a visit.\" So the Hail came. Every day for three hours he rattled on the roof of the castle till he broke most of the slates, and then he ran round and round the garden as fast as he could go."
            },
            {
                text: " \"I cannot understand why the Spring is so late in coming,\" said the Selfish Giant, as he sat at the window and looked out at his cold white garden. \"I hope there will be a change in the weather.\" But the Spring never came, nor the Summer. The Autumn gave golden fruit to every garden, but to the Giant's garden she gave none. \"He is too selfish,\" she said. So it was always Winter there, and the North Wind, and the Hail, and the Frost, and the Snow danced about through the trees."
            },
            {
                text: "One morning the Giant was lying awake in bed when he heard some lovely music. It sounded so sweet to his ears that he thought it must be the King's musicians passing by. It was really only a little linnet singing outside his window, but it was so long since he had heard a bird sing in his garden that it seemed to him to be the most beautiful music in the world. Then the Hail stopped dancing over his head, and the North Wind ceased roaring, and a delicious perfume came to him through the open casement. \"I believe the Spring has come at last,\" said the Giant; and he jumped out of bed and looked out."
            },
            {
                text: "What did he see? He saw a most wonderful sight. Through a little hole in the wall the children had crept in, and they were sitting in the branches of the trees. In every tree that he could see there was a little child. And the trees were so glad to have the children back again that they had covered themselves with blossoms, and were waving their arms gently above the children's heads. The birds were flying about and twittering with delight, and the flowers were looking up through the green grass and laughing."
            },
            {
                text: "It was a lovely scene, only in one corner it was still Winter. It was the farthest corner of the garden, and in it was standing a little boy. He was so small that he could not reach up to the branches of the tree, and he was wandering all round it, crying bitterly. The poor tree was still quite covered with frost and snow, and the North Wind was blowing and roaring above it. \"Climb up! little boy,\" said the Tree, and it bent its branches down as low as it could; but the boy was too tiny."
            },
            {
                text: "And the Giant's heart melted as he looked out. \"How selfish I have been!\" he said; \"now I know why the Spring would not come here. I will put that poor little boy on the top of the tree, and then I will knock down the wall, and my garden shall be the children's playground for ever and ever.\" He was really very sorry for what he had done."
            },
            {
                text: "So he crept downstairs and opened the front door quite softly, and went out into the garden. But when the children saw him they were so frightened that they all ran away, and the garden became Winter again. Only the little boy did not run, for his eyes were so full of tears that he did not see the Giant coming. And the Giant stole up behind him and took him gently in his hand, and put him up into the tree. And the tree broke at once into blossom, and the birds came and sang on it, and the little boy stretched out his two arms and flung them round the Giant's neck, and kissed him."
            },
            {
                text: "And the other children, when they saw that the Giant was not wicked any longer, came running back, and with them came the Spring. \"It is your garden now, little children,\" said the Giant, and he took a great axe and knocked down the wall."
            },
            {
                text: "When the people were going to market at twelve o'clock they found the Giant playing with the children in the most beautiful garden they had ever seen. All day long they played, and in the evening they came to the Giant to bid him good-bye. \"But where is your little companion?\" he said: \"the boy I put into the tree.\" The Giant loved him the best because he had kissed him. \"We don't know,\" answered the children, \"he has gone away.\""
            },
            {
                text: "Years passed, and the Giant grew very old and feeble. He could not play about any more, so he sat in a huge armchair, and watched the children at their games, and admired his garden. \"I have many beautiful flowers,\" he said; \"but the children are the most beautiful flowers of all.\" One winter morning he looked out of his window as he was dressing. He did not hate the Winter now, for he knew that it was merely the Spring asleep, and that the flowers were resting. Suddenly he rubbed his eyes in wonder, and looked and looked. It certainly was a marvelous sight. In the farthest corner of the garden was a tree quite covered with lovely white blossoms. Its branches were all golden, and silver fruit hung down from them, and underneath it stood the little boy he had loved."
            },
            {
                text: "Downstairs ran the Giant in great joy, and out into the garden. He hastened across the grass, and came near to the child. And when he came quite close his face grew red with anger, and he said, \"Who hath dared to wound thee?\" For on the palms of the child's hands were the prints of two nails, and the prints of two nails were on the little feet. \"Who hath dared to wound thee?\" cried the Giant; \"tell me, that I may take my big sword and slay him.\" \"Nay!\" answered the child; \"but these are the wounds of Love.\" \"Who art thou?\" said the Giant, and a strange awe fell on him, and he knelt before the little child. And the child smiled on the Giant, and said to him, \"You let me play once in your garden, today you shall come with me to my garden, which is Paradise.\" And when the children ran in that afternoon, they found the Giant lying dead under the tree, all covered with white blossoms."
            }
        ],
        contentFr: [
            {
                text: "C'est l'histoire du Géant Égoïste, un conte sur la façon dont la glace de la solitude et la dureté du cœur ne peuvent être fondues que par la chaleur de la générosité et l'innocence de l'enfance. Tous les après-midi, en sortant de l'école, les enfants avaient l'habitude d'aller jouer dans le jardin du Géant. C'était un grand et beau jardin, tapissé d'herbe douce et verte. Ici et là sur l'herbe se dressaient de belles fleurs comme des étoiles, et il y avait douze pêchers qui, au printemps, se couvraient de délicates fleurs roses et perlées, et en automne donnaient des fruits riches. Les oiseaux se posaient sur les arbres et chantaient si doucement que les enfants arrêtaient leurs jeux pour les écouter. \"Comme nous sommes heureux ici !\", s'écriaient-ils les uns aux autres."
            },
            {
                text: "Mais un jour, le Géant revint. Il était parti pendant sept ans rendre visite à son ami l'ogre de Cornouailles, et à son retour, la première chose qu'il vit fut les enfants jouant parmi ses fleurs. \"Que faites-vous ici ?\", cria-t-il d'une voix très bourrue qui fit fuir les enfants, terrifiés. \"Mon jardin est mon jardin\", dit-il. \"Je ne permettrai à personne d'autre que moi d'y jouer.\" Il construisit donc un haut mur tout autour et accrocha un panneau : DÉFENSE D'ENTRER SOUS PEINE DE POURSUITES. C'était un Géant très égoïste."
            },
            {
                text: "Puis le Printemps arriva, et dans tout le pays, il y avait de petites fleurs et de petits oiseaux. Seul dans le jardin du Géant Égoïste, c'était encore l'Hiver. Les oiseaux ne voulaient pas y chanter car il n'y avait pas d'enfants, et les arbres oublièrent de fleurir. Une fois, une belle fleur sortit sa tête de l'herbe, mais en voyant le panneau, elle eut si pitié des enfants qu'elle retourna sous terre et s'endormit. Les seuls à être contents étaient la Neige et le Givre. \"Le Printemps a oublié ce jardin\", s'écrièrent-ils, \"alors nous vivrons ici toute l'année.\""
            },
            {
                text: "La Neige recouvrit l'herbe de son grand manteau blanc, et le Givre peignit tous les arbres en argent. Puis ils invitèrent le Vent du Nord à rester avec eux, et il vint. Il était enveloppé de fourrures, et il rugissait toute la journée dans le jardin, et renversa les pots de cheminée. \"C'est un endroit délicieux\", dit le Vent, \"nous devons inviter la Grêle.\" La Grêle vint donc. Chaque jour pendant trois heures, elle tambourinait sur le toit du château jusqu'à casser la plupart des ardoises, puis elle courait autour du jardin aussi vite qu'elle le pouvait."
            },
            {
                text: "\"Je ne comprends pas pourquoi le Printemps tarde tant à venir\", disait le Géant Égoïste en s'asseyant à la fenêtre et en regardant son jardin blanc et froid. \"J'espère que le temps va changer.\" Mais le Printemps ne vint jamais, ni l'Été. L'Automne donna des fruits dorés à tous les jardins, mais au jardin du Géant, elle n'en donna aucun. \"Il est trop égoïste\", dit-elle. Ainsi, c'était toujours l'Hiver là-bas, et le Vent du Nord, la Grêle, le Givre et la Neige dansaient à travers les arbres."
            },
            {
                text: "Un matin, le Géant était couché dans son lit quand il entendit une musique ravissante. Elle sonnait si doucement à ses oreilles qu'il pensa que ce devaient être les musiciens du Roi qui passaient. Ce n'était en réalité qu'un petit chardonneret qui chantait devant sa fenêtre, mais cela faisait si longtemps qu'il n'avait pas entendu un oiseau chanter dans son jardin que cela lui sembla être la plus belle musique du monde. Alors la Grêle cessa de danser au-dessus de sa tête, et le Vent du Nord cessa de rugir, et un parfum délicieux lui parvint par la fenêtre ouverte. \"Je crois que le Printemps est enfin arrivé\", dit le Géant ; et il sauta du lit et regarda dehors."
            },
            {
                text: "Que vit-il ? Il vit un spectacle merveilleux. Par un petit trou dans le mur, les enfants s'étaient glissés, et ils étaient assis dans les branches des arbres. Sur chaque arbre qu'il pouvait voir, il y avait un petit enfant. Et les arbres étaient si heureux d'avoir les enfants de retour qu'ils s'étaient couverts de fleurs et agitaient doucement leurs bras au-dessus de la tête des enfants. Les oiseaux volaient et gazouillaient de joie, et les fleurs regardaient à travers l'herbe verte et riaient."
            },
            {
                text: "C'était une scène charmante, sauf dans un coin où c'était encore l'Hiver. C'était le coin le plus éloigné du jardin, et là se tenait un petit garçon. Il était si petit qu'il ne pouvait pas atteindre les branches de l'arbre, et il tournait autour en pleurant amèrement. Le pauvre arbre était encore tout couvert de givre et de neige, et le Vent du Nord soufflait et rugissait au-dessus de lui. \"Grimpe ! petit garçon\", disait l'Arbre, et il baissait ses branches aussi bas qu'il le pouvait ; mais le garçon était trop petit."
            },
            {
                text: "Et le cœur du Géant fondit en regardant dehors. \"Comme j'ai été égoïste !\", dit-il ; \"maintenant je sais pourquoi le Printemps ne voulait pas venir ici. Je vais mettre ce pauvre petit garçon au sommet de l'arbre, et ensuite j'abattrai le mur, et mon jardin sera le terrain de jeu des enfants pour toujours.\" Il regrettait vraiment beaucoup ce qu'il avait fait."
            },
            {
                text: "Il descendit donc les escaliers, ouvrit doucement la porte d'entrée et sortit dans le jardin. Mais quand les enfants le virent, ils furent si effrayés qu'ils s'enfuirent tous, et le jardin redevint Hiver. Seul le petit garçon ne courut pas, car ses yeux étaient si pleins de larmes qu'il ne vit pas venir le Géant. Le Géant s'approcha doucement de lui, le prit délicatement dans sa main et le mit sur l'arbre. Et l'arbre éclata aussitôt en fleurs, et les oiseaux vinrent y chanter, et le petit garçon étendit ses deux bras, les jeta autour du cou du Géant et l'embrassa."
            },
            {
                text: "Et les autres enfants, voyant que le Géant n'était plus méchant, revinrent en courant, et avec eux revint le Printemps. \"C'est votre jardin maintenant, petits enfants\", dit le Géant, et il prit une grande hache et abattit le mur."
            },
            {
                text: "Quand les gens allaient au marché à midi, ils trouvèrent le Géant jouant avec les enfants dans le plus beau jardin qu'ils aient jamais vu. Ils jouèrent toute la journée, et le soir, ils vinrent dire au revoir au Géant. \"Mais où est votre petit compagnon ?\", demanda-t-il : \"le garçon que j'ai mis sur l'arbre.\" Le Géant l'aimait le plus parce qu'il l'avait embrassé. \"Nous ne savons pas\", répondirent les enfants, \"il est parti.\""
            },
            {
                text: "Les années passèrent et le Géant devint très vieux et faible. Il ne pouvait plus jouer, alors il s'asseyait dans un immense fauteuil, regardait les enfants jouer et admirait son jardin. \"J'ai beaucoup de belles fleurs\", disait-il ; \"mais les enfants sont les plus belles fleurs de toutes.\" Un matin d'hiver, il regarda par la fenêtre en s'habillant. Il ne détestait plus l'Hiver maintenant, car il savait que ce n'était que le Printemps endormi, et que les fleurs se reposaient. Soudain, il se frotta les yeux d'étonnement et regarda encore et encore. C'était certainement un spectacle merveilleux. Dans le coin le plus éloigné du jardin, il y avait un arbre tout couvert de belles fleurs blanches. Ses branches étaient toutes dorées, et des fruits d'argent en pendaient, et en dessous se tenait le petit garçon qu'il avait aimé."
            },
            {
                text: "Le Géant descendit en courant avec une grande joie, et sortit dans le jardin. Il se hâta à travers l'herbe et s'approcha de l'enfant. Et quand il fut tout près, son visage devint rouge de colère, et il dit : \"Qui a osé te blesser ?\" Car sur les paumes des mains de l'enfant, il y avait les marques de deux clous, et les marques de deux clous étaient sur les petits pieds. \"Qui a osé te blesser ?\", cria le Géant ; \"dis-le-moi, que je prenne ma grande épée et que je le tue.\" \"Non !\", répondit l'enfant ; \"car ce sont les blessures de l'Amour.\" \"Qui es-tu ?\", demanda le Géant, et une étrange crainte s'empara de lui, et il s'agenouilla devant le petit enfant. Et l'enfant sourit au Géant et lui dit : \"Tu m'as laissé jouer une fois dans ton jardin, aujourd'hui tu viendras avec moi dans mon jardin, qui est le Paradis.\" Et quand les enfants arrivèrent cet après-midi-là pour jouer, ils trouvèrent le Géant mort sous l'arbre, tout couvert de fleurs blanches."
            }
        ],
        contentDe: [
            {
                text: "Dies ist die Geschichte vom selbstsüchtigen Riesen, ein Märchen darüber, wie das Eis der Einsamkeit und die Härte des Herzens nur durch die Wärme der Großzügigkeit und die Unschuld der Kindheit geschmolzen werden können. Jeden Nachmittag, wenn sie von der Schule kamen, gingen die Kinder in den Garten des Riesen, um dort zu spielen. Es war ein großer und schöner Garten, bedeckt mit weichem grünem Gras. Hier und da standen auf dem Gras wunderschöne Blumen wie Sterne, und es gab zwölf Pfirsichbäume, die im Frühling zarte rosa und perlenfarbene Blüten trugen und im Herbst reiche Früchte gaben. Die Vögel saßen auf den Bäumen und sangen so süß, dass die Kinder ihre Spiele unterbrachen, um ihnen zuzuhören. \"Wie glücklich wir hier sind!\", riefen sie einander zu."
            },
            {
                text: "Aber eines Tages kam der Riese zurück. Er war sieben Jahre lang fort gewesen, um seinen Freund, den Oger von Cornwall, zu besuchen, und bei seiner Rückkehr sah er als erstes die Kinder, die zwischen seinen Blumen spielten. \"Was macht ihr hier?\", rief er mit sehr barscher Stimme, sodass die Kinder vor Schreck davonliefen. \"Mein Garten ist mein eigener Garten\", sagte er. \"Ich werde niemandem außer mir erlauben, darin zu spielen.\" Also baute er eine hohe Mauer ringsherum und hängte ein Schild auf: BETRETEN VERBOTEN. ZUWIDERHANDLUNG WIRD BESTRAFT. Er war ein sehr selbstsüchtiger Riese."
            },
            {
                text: "Dann kam der Frühling, und im ganzen Land gab es kleine Blüten und kleine Vögel. Nur im Garten des selbstsüchtigen Riesen war es noch Winter. Die Vögel wollten dort nicht singen, da es keine Kinder gab, und die Bäume vergaßen zu blühen. Einmal streckte eine schöne Blume ihren Kopf aus dem Gras, aber als sie das Schild sah, hatte sie solches Mitleid mit den Kindern, dass sie wieder in den Boden schlüpfte und einschlief. Die einzigen, die sich freuten, waren der Schnee und der Frost. \"Der Frühling hat diesen Garten vergessen\", riefen sie, \"also werden wir das ganze Jahr hier leben.\""
            },
            {
                text: "Der Schnee bedeckte das Gras mit seinem großen weißen Mantel, und der Frost bemalte alle Bäume silbern. Dann luden sie den Nordwind ein, bei ihnen zu bleiben, und er kam. Er war in Pelze gehüllt und brüllte den ganzen Tag durch den Garten und blies die Schornsteine um. \"Das ist ein herrlicher Ort\", sagte der Wind, \"wir müssen den Hagel zu Besuch bitten.\" Also kam der Hagel. Jeden Tag trommelte er drei Stunden lang auf das Dach des Schlosses, bis er die meisten Schieferplatten zerbrochen hatte, und dann rannte er so schnell er konnte im Garten herum."
            },
            {
                text: "\"Ich kann nicht verstehen, warum der Frühling so lange auf sich warten lässt\", sagte der selbstsüchtige Riese, als er am Fenster saß und auf seinen kalten weißen Garten hinausschaute. \"Ich hoffe, das Wetter ändert sich bald.\" Aber der Frühling kam nie, noch der Sommer. Der Herbst gab jedem Garten goldene Früchte, aber dem Garten des Riesen gab er keine. \"Er ist zu selbstsüchtig\", sagte er. So war dort immer Winter, und der Nordwind und der Hagel und der Frost und der Schnee tanzten durch die Bäume."
            },
            {
                text: "Eines Morgens lag der Riese wach im Bett, als er eine liebliche Musik hörte. Sie klang so süß in seinen Ohren, dass er dachte, es müssten die Musiker des Königs sein, die vorbeizogen. In Wirklichkeit war es nur ein kleiner Hänfling, der vor seinem Fenster sang, aber es war so lange her, dass er einen Vogel in seinem Garten singen gehört hatte, dass es ihm wie die schönste Musik der Welt vorkam. Da hörte der Hagel auf, über seinem Kopf zu tanzen, und der Nordwind hörte auf zu brüllen, und ein köstlicher Duft kam durch das offene Fenster zu ihm. \"Ich glaube, der Frühling ist endlich gekommen\", sagte der Riese; und er sprang aus dem Bett und schaute hinaus."
            },
            {
                text: "Was sah er? Er sah einen wunderbaren Anblick. Durch ein kleines Loch in der Mauer waren die Kinder hereingekrochen und saßen in den Zweigen der Bäume. Auf jedem Baum, den er sehen konnte, saß ein kleines Kind. Und die Bäume waren so froh, die Kinder wiederzuhaben, dass sie sich mit Blüten bedeckt hatten und ihre Arme sanft über die Köpfe der Kinder wiegten. Die Vögel flogen umher und zwitscherten vor Freude, und die Blumen schauten durch das grüne Gras und lachten."
            },
            {
                text: "Es war eine bezaubernde Szene, nur in einer Ecke war noch Winter. Es war die entfernteste Ecke des Gartens, und dort stand ein kleiner Junge. Er war so klein, dass er nicht an die Zweige des Baumes reichen konnte, und er wanderte weinend um ihn herum. Der arme Baum war noch ganz mit Frost und Schnee bedeckt, und der Nordwind blies und brüllte über ihm. \"Klettere hoch! kleiner Junge\", sagte der Baum und beugte seine Zweige so tief er konnte; aber der Junge war zu winzig."
            },
            {
                text: "Und das Herz des Riesen schmolz, als er hinausblickte. \"Wie selbstsüchtig ich gewesen bin!\", sagte er; \"jetzt weiß ich, warum der Frühling nicht hierher kommen wollte. Ich werde diesen armen kleinen Jungen auf die Spitze des Baumes setzen, und dann werde ich die Mauer einreißen, und mein Garten soll für immer und ewig der Spielplatz der Kinder sein.\" Es tat ihm wirklich sehr leid, was er getan hatte."
            },
            {
                text: "Also schlich er nach unten, öffnete leise die Haustür und ging in den Garten hinaus. Aber als die Kinder ihn sahen, waren sie so verängstigt, dass sie alle davonliefen, und im Garten wurde es wieder Winter. Nur der kleine Junge lief nicht weg, denn seine Augen waren so voller Tränen, dass er den Riesen nicht kommen sah. Und der Riese schlich sich hinter ihn, nahm ihn behutsam in seine Hand und setzte ihn in den Baum. Und der Baum brach sofort in Blüten aus, und die Vögel kamen und sangen darauf, und der kleine Junge streckte seine beiden Arme aus, schlang sie um den Hals des Riesen und küsste ihn."
            },
            {
                text: "Und die anderen Kinder, als sie sahen, dass der Riese nicht mehr böse war, kamen zurückgelaufen, und mit ihnen kam der Frühling. \"Es ist jetzt euer Garten, kleine Kinder\", sagte der Riese, und er nahm eine große Axt und riss die Mauer ein."
            },
            {
                text: "Als die Leute um zwölf Uhr zum Markt gingen, fanden sie den Riesen, wie er mit den Kindern in dem schönsten Garten spielte, den sie je gesehen hatten. Den ganzen Tag spielten sie, und am Abend kamen sie zum Riesen, um sich zu verabschieden. \"Aber wo ist euer kleiner Gefährte?\", fragte er: \"der Junge, den ich in den Baum gesetzt habe.\" Der Riese liebte ihn am meisten, weil er ihn geküsst hatte. \"Wir wissen es nicht\", antworteten die Kinder, \"er ist fortgegangen.\""
            },
            {
                text: "Jahre vergingen, und der Riese wurde sehr alt und schwach. Er konnte nicht mehr herumtollen, also saß er in einem riesigen Lehnstuhl und beobachtete die Kinder bei ihren Spielen und bewunderte seinen Garten. \"Ich habe viele schöne Blumen\", sagte er; \"aber die Kinder sind die schönsten Blumen von allen.\" Eines Wintermorgens schaute er beim Ankleiden aus dem Fenster. Er hasste den Winter jetzt nicht mehr, denn er wusste, dass es nur der schlafende Frühling war und dass die Blumen sich ausruhten. Plötzlich rieb er sich verwundert die Augen und schaute und schaute. Es war gewiss ein wunderbarer Anblick. In der entferntesten Ecke des Gartens stand ein ganz mit herrlichen weißen Blüten bedeckter Baum. Seine Zweige waren ganz golden, und silberne Früchte hingen von ihnen herab, und darunter stand der kleine Junge, den er geliebt hatte."
            },
            {
                text: "Voller Freude rannte der Riese nach unten und hinaus in den Garten. Er eilte über das Gras und kam dem Kind nahe. Und als er ganz nah war, wurde sein Gesicht rot vor Zorn, und er sagte: \"Wer hat es gewagt, dich zu verwunden?\" Denn auf den Handflächen des Kindes waren die Abdrücke von zwei Nägeln, und die Abdrücke von zwei Nägeln waren auf den kleinen Füßen. \"Wer hat es gewagt, dich zu verwunden?\", rief der Riese; \"sag es mir, damit ich mein großes Schwert nehme und ihn erschlage.\" \"Nein!\", antwortete das Kind; \"denn dies sind die Wunden der Liebe.\" \"Wer bist du?\", sagte der Riese, und eine seltsame Ehrfurcht überkam ihn, und er kniete vor dem kleinen Kind nieder. Und das Kind lächelte den Riesen an und sagte zu ihm: \"Du hast mich einmal in deinem Garten spielen lassen, heute sollst du mit mir in meinen Garten kommen, der das Paradies ist.\" Und als die Kinder an diesem Nachmittag hereingelaufen kamen, fanden sie den Riesen tot unter dem Baum liegen, ganz bedeckt mit weißen Blüten."
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
        rating: 4.9,
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
        ],
        contentEn: [
            {
                text: "In one of the most prosperous cities of ancient China, lived a boy named Aladdin. He was a disobedient and lazy young man who preferred to play in the squares rather than learn the trade of his father, a humble tailor who had died of grief seeing his son's indolence. Aladdin lived alone with his mother, a hardworking woman who spun cotton day and night to bring a little bread to the table."
            },
            {
                text: "One day, while Aladdin was playing with other boys, a stranger of imposing appearance approached him. The man, who was actually a powerful African magician, pretended to be his late father's brother. With promises of turning Aladdin into a rich merchant, he gained the family's trust. However, the magician did not seek the young man's well-being; he needed someone of pure heart and simple mind to retrieve an object that no magical power could reach on its own."
            },
            {
                text: "The magician led Aladdin to a deserted and secluded mountain. After lighting a bonfire and pronouncing arcane words in a forgotten language, the earth opened, revealing a marble slab with an iron ring. \"Under this slab there is a treasure that only you can touch,\" said the magician. \"Enter the cave, cross the halls full of gold and jewels, but touch nothing. At the bottom, you will find an old and dusty oil lamp. Bring it to me immediately.\" Before the young man descended, the magician gave him a gold ring with a red stone, assuring him that it would protect him from all evil."
            },
            {
                text: "Aladdin went down to the depths. He saw trees whose fruits were diamonds, emeralds, and rubies, but true to his promise, he only looked for the lamp. Once he had it in his possession, he returned to the entrance, but the magician, in a fit of impatience and malice, demanded that he hand over the lamp before helping him out. Aladdin, suspecting his \"uncle,\" refused. Furious, the magician pronounced a spell, the slab closed, and the young man was buried alive in total darkness."
            },
            {
                text: "Two days passed. Aladdin, crying in despair, joined his hands to pray and, by accident, rubbed the ring the magician had given him. Suddenly, a colossal and terrifying-looking genie appeared before him. \"I am the Genie of the Ring. What do you wish of me?\" \"Get me out of here!\" exclaimed the boy. In a blink, Aladdin found himself at the door of his house. He told everything to his mother and, since they were hungry, they decided to sell the old lamp. The mother took a cloth to clean it and, upon rubbing it, a second genie emerged, much more powerful and larger than the previous one. \"I am the Genie of the Lamp. Your wishes are commands for me.\""
            },
            {
                text: "From that day on, Aladdin's life changed. The genie provided them with the most exquisite delicacies and incalculable riches. Over time, Aladdin became a generous and wise man. One day, he saw the Sultan's daughter, Princess Badrulbudur, pass by and was captivated by her beauty. With the help of the genie, Aladdin sent his mother to the palace with chests full of gems as big as pigeon eggs, surpassing any dowry the Sultan had ever seen."
            },
            {
                text: "Impressed, the Sultan agreed to the marriage, but asked for a final test: a magnificent palace built in a single night. The Genie of the Lamp fulfilled the task, erecting a structure of marble and gold that left the royal palace itself in shadow. Aladdin and the princess married and lived in a happiness that seemed eternal."
            },
            {
                text: "However, the African magician, through his dark arts, knew that Aladdin was not only alive, but possessed the lamp. He traveled to the city disguised as a merchant and walked the streets shouting: \"New lamps for old ones!\" One of the princess's maids, ignoring the value of the object, handed the magic lamp to the magician in exchange for a shiny one."
            },
            {
                text: "The magician rubbed the lamp and ordered the genie to move Aladdin's palace, with the princess inside, to the depths of Africa. When Aladdin returned and saw the desert where his home used to be, he was about to give up. But he remembered the ring he was still wearing. He rubbed the stone and the ring genie appeared. Although he did not have the power to undo the lamp genie's spell, he could take Aladdin to where his wife was."
            },
            {
                text: "With cunning, the princess tricked the magician and put a narcotic in his wine. While the villain slept, Aladdin recovered the lamp, summoned his genie, and ordered the palace to return to its original place and the magician to be banished to a desert island where he could never harm anyone again."
            },
            {
                text: "Aladdin and Badrulbudur returned triumphant. Upon the Sultan's death, Aladdin ascended the throne, ruling with justice and kindness. The lamp was kept in a secret place, not out of greed, but to remember that true magic does not reside in objects, but in the courage and ingenuity of those who know how to use them for the common good."
            }
        ],
        contentFr: [
            {
                text: "Dans l'une des villes les plus prospères de la Chine ancienne, vivait un garçon nommé Aladin. C'était un jeune homme désobéissant et paresseux qui préférait jouer sur les places plutôt que d'apprendre le métier de son père, un humble tailleur qui était mort de chagrin en voyant l'indolence de son fils. Aladin vivait seul avec sa mère, une femme travailleuse qui filait le coton jour et nuit pour apporter un peu de pain sur la table."
            },
            {
                text: "Un jour, alors qu'Aladin jouait avec d'autres garçons, un étranger à l'aspect imposant s'approcha de lui. L'homme, qui était en réalité un puissant magicien africain, fit semblant d'être le frère de son défunt père. Avec des promesses de faire d'Aladin un riche marchand, il gagna la confiance de la famille. Cependant, le magicien ne cherchait pas le bien-être du jeune homme ; il avait besoin de quelqu'un au cœur pur et à l'esprit simple pour récupérer un objet qu'aucun pouvoir magique ne pouvait atteindre seul."
            },
            {
                text: "Le magicien conduisit Aladin vers une montagne désertique et isolée. Après avoir allumé un feu et prononcé des mots arcanes dans une langue oubliée, la terre s'ouvrit, révélant une dalle de marbre avec un anneau de fer. \"Sous cette dalle, il y a un trésor que toi seul peux toucher\", dit le magicien. \"Entre dans la grotte, traverse les salles pleines d'or et de bijoux, mais ne touche à rien. Au fond, tu trouveras une vieille lampe à huile poussiéreuse. Apporte-la-moi immédiatement\". Avant que le jeune homme ne descende, le magicien lui remit un anneau d'or avec une pierre rouge, l'assurant qu'il le protégerait de tout mal."
            },
            {
                text: "Aladin descendit dans les profondeurs. Il vit des arbres dont les fruits étaient des diamants, des émeraudes et des rubis, mais fidèle à sa promesse, il ne chercha que la lampe. Une fois qu'il l'eut en sa possession, il retourna à l'entrée, mais le magicien, dans un accès d'impatience et de méchanceté, exigea qu'il lui remette la lampe avant de l'aider à sortir. Aladin, soupçonnant son \"oncle\", refusa. Furieux, le magicien prononça une incantation, la dalle se referma et le jeune homme resta enterré vivant dans l'obscurité totale."
            },
            {
                text: "Deux jours passèrent. Aladin, pleurant de désespoir, joignit les mains pour prier et, par accident, frotta l'anneau que le magicien lui avait donné. Soudain, un génie colossal et à l'aspect terrifiant apparut devant lui. \"Je suis le Génie de l'Anneau. Que désires-tu de moi ?\". \"Sors-moi d'ici !\", s'exclama le garçon. En un clin d'œil, Aladin se retrouva à la porte de sa maison. Il raconta tout à sa mère et, comme ils avaient faim, ils décidèrent de vendre la vieille lampe. La mère prit un chiffon pour la nettoyer et, en la frottant, un second génie surgit, beaucoup plus puissant et grand que le précédent. \"Je suis le Génie de la Lampe. Tes désirs sont des ordres pour moi\"."
            },
            {
                text: "À partir de ce jour, la vie d'Aladin changea. Le génie leur fournissait les mets les plus exquis et des richesses incalculables. Avec le temps, Aladin devint un homme généreux et sage. Un jour, il vit passer la fille du Sultan, la princesse Badroulboudour, et fut captivé par sa beauté. Avec l'aide du génie, Aladin envoya sa mère au palais avec des coffres remplis de pierres précieuses aussi grosses que des œufs de pigeon, surpassant toute dot que le Sultan ait jamais vue."
            },
            {
                text: "Impressionné, le Sultan accepta le mariage, mais demanda une épreuve finale : un palais magnifique construit en une seule nuit. Le Génie de la Lampe accomplit la tâche, érigeant une structure de marbre et d'or qui laissait dans la pénombre le palais royal lui-même. Aladin et la princesse se marièrent et vécurent dans un bonheur qui semblait éternel."
            },
            {
                text: "Cependant, le magicien africain, grâce à ses arts obscurs, sût qu'Aladin était non seulement vivant, mais qu'il possédait la lampe. Il voyagea jusqu'à la ville déguisé en marchand et parcourut les rues en criant : \"J'échange de vieilles lampes contre des neuves !\". L'une des servantes de la princesse, ignorant la valeur de l'objet, remit la lampe magique au magicien en échange d'une brillante,"
            },
            {
                text: "Le magicien frotta la lampe et ordonna au génie de transporter le palais d'Aladin, avec la princesse à l'intérieur, au plus profond de l'Afrique. Quand Aladin revint et vit le désert là où se trouvait autrefois sa maison, il fut sur le point d'abandonner. Mais il se souvint de l'anneau qu'il portait toujours. Il frotta la pierre et le génie de l'anneau apparut. Bien qu'il n'ait pas le pouvoir de défaire le sortilège du génie de la lampe, il put emmener Aladin jusqu'à l'endroit où se trouvait sa femme."
            },
            {
                text: "Avec ruse, la princesse trompa le magicien et mit un narcotique dans son vin. Alors que le méchant dormait, Aladin récupéra la lampe, invoqua son génie et ordonna que le palais retourne à sa place originale et que le magicien soit exilé sur une île déserte où il ne pourrait plus jamais faire de mal à personne."
            },
            {
                text: "Aladin et Badroulboudour revinrent triomphants. À la mort du Sultan, Aladin monta sur le trône, gouvernant avec justice et bonté. La lampe fut gardée dans un endroit secret, non par avarice, mais pour se souvenir que la vraie magie ne réside pas dans les objets, mais dans le courage et l'ingéniosité de ceux qui savent les utiliser pour le bien commun."
            }
        ],
        contentDe: [
            {
                text: "In einer der wohlhabendsten Städte des alten China lebte ein Junge namens Aladin. Er war ein ungehorsamer und fauler junger Mann, der lieber auf den Plätzen spielte, als das Handwerk seines Vaters zu lernen, eines bescheidenen Schneiders, der aus Kummer über die Trägheit seines Sohnes gestorben war. Aladin lebte allein mit seiner Mutter, einer fleißigen Frau, die Tag und Nacht Baumwolle spann, um ein wenig Brot auf den Tisch zu bringen."
            },
            {
                text: "Eines Tages, als Aladin mit anderen Jungen spielte, näherte sich ihm ein Fremder von imposantem Aussehen. Der Mann, der in Wirklichkeit ein mächtiger afrikanischer Zauberer war, gab vor, der Bruder seines verstorbenen Vaters zu sein. Mit Versprechungen, Aladin in einen reichen Kaufmann zu verwandeln, gewann er das Vertrauen der Familie. Der Zauberer suchte jedoch nicht das Wohl des jungen Mannes; er brauchte jemanden mit reinem Herzen und schlichtem Verstand, um einen Gegenstand zu bergen, den keine magische Kraft allein erreichen konnte."
            },
            {
                text: "Der Zauberer führte Aladin zu einem verlassenen und abgelegenen Berg. Nachdem er ein Feuer entzündet und arkane Worte in einer vergessenen Sprache gesprochen hatte, öffnete sich die Erde und enthüllte eine Marmorplatte mit einem Eisenring. \"Unter dieser Platte liegt ein Schatz, den nur du berühren kannst\", sagte der Zauberer. \"Geh in die Höhle, durchquere die Säle voller Gold und Juwelen, aber rühre nichts an. Ganz hinten findest du eine alte und verstaubte Öllampe. Bring sie mir sofort.\" Bevor der junge Mann hinabstieg, gab ihm der Zauberer einen Goldring mit einem roten Stein und versicherte ihm, dass er ihn vor allem Übel schützen würde."
            },
            {
                text: "Aladin stieg in die Tiefe hinab. Er sah Bäume, deren Früchte Diamanten, Smaragde und Rubine waren, aber getreu seinem Versprechen suchte er nur nach der Lampe. Sobald er sie in seinem Besitz hatte, kehrte er zum Eingang zurück, aber der Zauberer verlangte in einem Anfall von Ungeduld und Bosheit, dass er ihm die Lampe übergebe, bevor er ihm heraushelfe. Aladin, der seinen \"Onkel\" verdächtigte, weigerte sich. Wütend sprach der Zauberer einen Fluch, die Platte schloss sich und der junge Mann wurde lebendig in völliger Dunkelheit begraben."
            },
            {
                text: "Zwei Tage vergingen. Aladin, der vor Verzweiflung weinte, faltete die Hände zum Gebet und rieb dabei versehentlich den Ring, den der Zauberer ihm gegeben hatte. Plötzlich erschien ein kolossaler und furchterregend aussehender Dschinn vor ihm. \"Ich bin der Dschinn des Rings. Was wünschst du von mir?\". \"Hol mich hier raus!\", rief der Junge. Im Nu fand sich Aladin vor der Tür seines Hauses wieder. Er erzählte seiner Mutter alles, und da sie hungrig waren, beschlossen sie, die alte Lampe zu verkaufen. Die Mutter nahm ein Tuch, um sie zu reinigen, und als sie sie rieb, tauchte ein zweiter Dschinn auf, viel mächtiger und größer als der vorherige. \"Ich bin der Dschinn der Lampe. Deine Wünsche sind mir Befehl.\""
            },
            {
                text: "Von diesem Tag an änderte sich Aladins Leben. Der Dschinn versorgte sie mit den köstlichsten Speisen und unermesslichen Reichtümern. Mit der Zeit wurde Aladin ein großzügiger und weiser Mann. Eines Tages sah er die Tochter des Sultans, Prinzessin Badrulbudur, vorbeikommen und war von ihrer Schönheit gefesselt. Mit Hilfe des Dschinns schickte Aladin seine Mutter mit Truhen voller Edelsteine, so groß wie Taubeneier, zum Palast, die jede Mitgift übertrafen, die der Sultan je gesehen hatte."
            },
            {
                text: "Beeindruckt stimmte der Sultan der Heirat zu, verlangte aber eine letzte Prüfung: einen prächtigen Palast, der in einer einzigen Nacht erbaut wurde. Der Dschinn der Lampe erfüllte die Aufgabe und errichtete ein Bauwerk aus Marmor und Gold, das den königlichen Palast selbst in den Schatten stellte. Aladin und die Prinzessin heirateten und lebten in einem Glück, das ewig schien."
            },
            {
                text: "Der afrikanische Zauberer wusste jedoch durch seine dunklen Künste, dass Aladin nicht nur am Leben war, sondern auch die Lampe besaß. Er reiste als Kaufmann verkleidet in die Stadt und lief durch die Straßen und rief: \"Tausche alte Lampen gegen neue!\". Eine der Dienerinnen der Prinzessin, die den Wert des Gegenstands nicht kannte, übergab dem Zauberer die magische Lampe im Austausch gegen eine glänzende."
            },
            {
                text: "Der Zauberer rieb die Lampe und befahl dem Dschinn, Aladins Palast mit der Prinzessin darin tief nach Afrika zu versetzen. Als Aladin zurückkehrte und die Wüste sah, wo früher sein Heim stand, wollte er fast aufgeben. Aber er erinnerte sich an den Ring, den er noch trug. Er rieb den Stein und der Dschinn des Rings erschien. Obwohl er nicht die Macht hatte, den Zauber des Lampendschinns rückgängig zu machen, konnte er Aladin dorthin bringen, wo seine Frau war."
            },
            {
                text: "Mit List täuschte die Prinzessin den Zauberer und tat ein Schlafmittel in seinen Wein. Während der Bösewicht schlief, holte Aladin die Lampe zurück, rief seinen Dschinn und befahl, dass der Palast an seinen ursprünglichen Ort zurückkehrte und dass der Zauberer auf eine einsame Insel verbannt wurde, wo er nie wieder jemandem schaden konnte."
            },
            {
                text: "Aladin und Badrulbudur kehrten triumphierend zurück. Nach dem Tod des Sultans bestieg Aladin den Thron und regierte mit Gerechtigkeit und Güte. Die Lampe wurde an einem geheimen Ort aufbewahrt, nicht aus Gier, sondern um daran zu erinnern, dass die wahre Magie nicht in den Gegenständen liegt, sondern im Mut und im Einfallsreichtum derer, die wissen, wie man sie für das Gemeinwohl einsetzt."
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
        rating: 4.5,
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
        ],
        contentEn: [
            {
                text: "In a kingdom where mountains touched the clouds and rivers sang crystal melodies, there lived a King and a Queen who had everything except what they desired most: a child. For years, their prayers were in vain, until one day, while the Queen was resting by a pond, a frog jumped out of the water and prophesied that before a year had passed, her wishes would be fulfilled. The prophecy came true, and a girl was born so beautiful that the King, mad with joy, decided to celebrate the grandest banquet in history."
            },
            {
                text: "In that kingdom lived thirteen wise fairies. However, the King only had twelve golden plates for the banquet, so he decided to invite only twelve of them, leaving the thirteenth out of the celebration. When dinner ended, the fairies began to bestow their magical gifts upon the little one: one gave her virtue, another beauty, the third wealth, and so on until the eleventh."
            },
            {
                text: "Suddenly, the door of the great hall opened with a crash, and the thirteenth fairy appeared. Her face was burning with humiliation and rage. Without greeting anyone, she shouted in a thunderous voice: —\"At fifteen years of age, the King's daughter will prick herself with the spindle of a spinning wheel and fall dead!\". Having said this, she disappeared in a burst of black smoke. Horror seized the guests, but then the twelfth fairy, who had not yet given her gift, stepped forward. Although she could not undo the curse, she could mitigate it: —\"It will not be a real death,\" she sentenced, \"but a deep sleep that will last a hundred years.\""
            },
            {
                text: "The King, desperate to protect his only daughter, ordered all the spinning wheels in the kingdom to be burned in a giant bonfire. The years passed, and the princess grew up endowed with all the gifts the fairies had given her: she was so graceful, intelligent, and kind that no one could help but love her."
            },
            {
                text: "On the day of her fifteenth birthday, while her parents were away, the young woman decided to explore every corner of the palace. She climbed an old spiral staircase that led to a forgotten tower. Upon opening the door, she found an old woman spinning flax with a spinning wheel. The princess, who had never seen one, approached fascinated. —\"What is that thing that jumps so merrily?\" she asked curiously. As soon as she reached out to touch the spindle, the curse was fulfilled. The sharp point pricked her finger, and at that very moment, the young woman fell onto a bed that was there, plunged into a deep sleep."
            },
            {
                text: "But the sleep was not only for her. A silent magic spread throughout the castle: the King and Queen, who had just arrived, fell asleep in the hall; the horses in the stable, the dogs in the yard, the pigeons on the roof, and even the fire in the kitchen stopped. The roast stopped sizzling, and the cook, who was about to scold the helper, froze with his hand raised. Around the palace, a hedge of thorns began to grow, becoming taller and thicker every year, until the castle was hidden from the world's view."
            },
            {
                text: "Over time, the legend of the \"Sleeping Beauty of the Woods\" spread to other kingdoms. Many princes tried to cross the wall of thorns, but the branches closed like claws, and the young men got trapped, perishing in the attempt."
            },
            {
                text: "After a hundred years, a new prince arrived in the region. An old man told him the story of the tower and the beautiful sleeping princess. Despite the warnings, the prince felt an irresistible impulse. That day marked the exact century of the spell; when the young man approached the hedge, the thorns turned into beautiful flowers that opened to let him pass."
            },
            {
                text: "The prince walked through the castle plunged in a sacred silence. He saw the guards sleeping with their spears and the courtiers motionless. Finally, he climbed the tower and found the princess. Her beauty was so radiant that he could not help but kneel and kiss her gently."
            },
            {
                text: "At that moment, the spell broke. The princess opened her eyes and looked at him sweetly. In the whole castle, life woke up as if only a second had passed: the horses neighed, the dogs barked, the fire burned again, and the cook finished pulling the helper's ear. The King and Queen celebrated the wedding of the princess and the prince with a party that lasted for days. The wall of thorns disappeared forever, and it is said that they lived happily and in peace, always remembering that neither the longest time nor the darkest magic can defeat a destiny written with love."
            }
        ],
        contentFr: [
            {
                text: "Dans un royaume où les montagnes touchaient les nuages et les rivières chantaient des mélodies de cristal, vivaient un Roi et une Reine qui avaient tout, sauf ce qu'ils désiraient le plus : un enfant. Pendant des années, leurs prières furent vaines, jusqu'à ce qu'un jour, alors que la Reine se reposait au bord d'un étang, une grenouille sauta de l'eau et prophétisa qu'avant qu'un an ne soit passé, ses désirs seraient exaucés. La prophétie se réalisa et une fille naquit, si belle que le Roi, fou de joie, décida de célébrer le banquet le plus grandiose de l'histoire."
            },
            {
                text: "Dans ce royaume vivaient treize fées sages. Cependant, le Roi ne possédait que douze assiettes d'or pour le banquet, c'est pourquoi il décida de n'en inviter que douze, laissant la treizième hors de la fête. À la fin du dîner, les fées commencèrent à accorder leurs dons magiques à la petite : l'une lui donna la vertu, une autre la beauté, la troisième la richesse, et ainsi de suite jusqu'à la onzième."
            },
            {
                text: "Soudain, la porte de la grande salle s'ouvrit avec fracas et la treizième fée apparut. Son visage était enflammé par l'humiliation et la colère. Sans saluer personne, elle cria d'une voix de tonnerre : —\"À quinze ans, la fille du Roi se piquera avec le fuseau d'un rouet et tombera morte !\". Cela dit, elle disparut dans une rafale de fumée noire. L'horreur s'empara des invités, mais alors la douzième fée, qui n'avait pas encore donné son don, s'avança. Bien qu'elle ne pût défaire la malédiction, elle pouvait l'atténuer : —\"Ce ne sera pas une mort réelle\", décréta-t-elle, \"mais un sommeil profond qui durera cent ans\"."
            },
            {
                text: "Le Roi, désespéré de protéger sa fille unique, ordonna que tous les rouets du royaume soient brûlés dans un bûcher géant. Les années passèrent et la princesse grandit dotée de tous les dons que les fées lui avaient donnés : elle était si gracieuse, intelligente et bonne que personne ne pouvait s'empêcher de l'aimer."
            },
            {
                text: "Le jour de son quinzième anniversaire, alors que ses parents étaient absents, la jeune fille décida d'explorer chaque recoin du palais. Elle monta par un vieil escalier en colimaçon qui menait à une tour oubliée. En ouvrant la porte, elle trouva une vieille femme filant du lin avec un rouet. La princesse, qui n'en avait jamais vu, s'approcha fascinée. —\"Qu'est-ce que cette chose qui saute si joyeusement ?\", demanda-t-elle curieuse. À peine tendit-elle la main pour toucher le fuseau, que la malédiction s'accomplit. La pointe acérée piqua son doigt et, à ce moment même, la jeune fille tomba sur un lit qui était là, plongée dans un sommeil profond."
            },
            {
                text: "Mais le sommeil n'était pas seulement pour elle. Une magie silencieuse se répandit dans tout le château : le Roi et la Reine, qui venaient d'arriver, s'endormirent dans la salle ; les chevaux dans l'écurie, les chiens dans la cour, les pigeons sur le toit et même le feu de la cuisine s'arrêta. Le rôti cessa de grésiller et le cuisinier, qui était sur le point de gronder l'aide, resta immobile la main levée. Autour du palais commença à pousser une haie d'épines qui chaque année devenait plus haute et plus épaisse, jusqu'à ce que le château fût caché à la vue du monde."
            },
            {
                text: "Avec le temps, la légende de la \"Belle au Bois Dormant\" se répandit dans d'autres royaumes. De nombreux princes tentèrent de traverser le mur d'épines, mais les branches se refermaient comme des griffes et les jeunes gens restaient piégés, périssant dans la tentative."
            },
            {
                text: "Cent ans passés, un nouveau prince arriva dans la région. Un vieillard lui raconta l'histoire de la tour et de la belle princesse endormie. Malgré les avertissements, le prince ressentit une impulsion irrésistible. Ce jour-là marquait le siècle exact du sortilège ; quand le jeune homme s'approcha de la haie, les épines se transformèrent en belles fleurs qui s'ouvraient pour le laisser passer."
            },
            {
                text: "Le prince parcourut le château plongé dans un silence sacré. Il vit les gardes dormir avec leurs lances et les courtisans immobiles. Finalement, il monta à la tour et trouva la princesse. Sa beauté était si radieuse qu'il ne put s'empêcher de s'agenouiller et de l'embrasser doucement."
            },
            {
                text: "À ce moment, le sortilège se rompit. La princesse ouvrit les yeux et le regarda avec douceur. Dans tout le château, la vie s'éveilla comme s'il ne s'était passé qu'une seconde : les chevaux hennirent, les chiens aboyèrent, le feu brûla de nouveau et le cuisinier finit de tirer l'oreille de l'aide. Le Roi et la Reine célébrèrent le mariage de la princesse et du prince avec une fête qui dura des jours. Le mur d'épines disparut pour toujours, et on dit qu'ils vécurent heureux et en paix, se souvenant toujours que ni le temps le plus long ni la magie la plus sombre ne peuvent vaincre un destin écrit avec amour."
            }
        ],
        contentDe: [
            {
                text: "In einem Königreich, wo die Berge die Wolken berührten und die Flüsse kristallene Melodien sangen, lebten ein König und eine Königin, die alles hatten, außer dem, was sie sich am meisten wünschten: ein Kind. Jahrelang waren ihre Gebete vergeblich, bis eines Tages, als die Königin am Rande eines Teiches ruhte, ein Frosch aus dem Wasser sprang und ihr prophezeite, dass ihre Wünsche in Erfüllung gehen würden, ehe ein Jahr vergangen sei. Die Prophezeiung erfüllte sich, und ein Mädchen wurde geboren, das so schön war, dass der König vor Freude außer sich war und beschloss, das großartigste Fest der Geschichte zu feiern."
            },
            {
                text: "In jenem Königreich lebten dreizehn weise Feen. Der König besaß jedoch nur zwölf goldene Teller für das Festmahl, weshalb er beschloss, nur zwölf von ihnen einzuladen und die dreizehnte von der Feier auszuschließen. Als das Essen beendet war, begannen die Feen, dem kleinen Kind ihre magischen Gaben zu verleihen: eine schenkte ihr die Tugend, eine andere die Schönheit, die dritte den Reichtum, und so weiter bis zur elften."
            },
            {
                text: "Plötzlich öffnete sich die Tür des großen Saales mit einem Krachen, und die dreizehnte Fee erschien. Ihr Gesicht glühte vor Demütigung und Zorn. Ohne jemanden zu grüßen, rief sie mit Donnerstimme: —\"Mit fünfzehn Jahren wird sich die Königstochter an einer Spindel stechen und tot umfallen!\". Nachdem sie dies gesagt hatte, verschwand sie in einer Wolke aus schwarzem Rauch. Entsetzen ergrifft die Gäste, aber da trat die zwölfte Fee hervor, die ihre Gabe noch nicht gegeben hatte. Obwohl sie den Fluch nicht ungeschehen machen konnte, konnte sie ihn mildern: —\"Es soll kein wirklicher Tod sein\", verkündete sie, \"sondern ein tiefer Schlaf, der hundert Jahre dauern wird.\""
            },
            {
                text: "Der König, verzweifelt, seine einzige Tochter zu schützen, befahl, alle Spinnräder im Königreich auf einem riesigen Scheiterhaufen zu verbrennen. Die Jahre vergingen, und die Prinzessin wuchs heran, begabt mit allen Gaben, die die Feen ihr geschenkt hatten: sie war so anmutig, klug und gütig, dass niemand sie ansehen konnte, ohne sie zu lieben."
            },
            {
                text: "An ihrem fünfzehnten Geburtstag, als ihre Eltern fort waren, beschloss das junge Mädchen, jeden Winkel des Schlosses zu erkunden. Sie stieg eine alte Wendeltreppe hinauf, die zu einem vergessenen Turm führte. Als sie die Tür öffnete, fand sie eine alte Frau, die Flachs an einem Spinnrad spann. Die Prinzessin, die so etwas noch nie gesehen hatte, näherte sich fasziniert. —\"Was ist das für ein Ding, das so lustig hüpft?\", fragte sie neugierig. Kaum streckte sie die Hand aus, um die Spindel zu berühren, erfüllte sich der Fluch. Die spitze Nadel stach in ihren Finger, und im selben Augenblick fiel das junge Mädchen auf ein Bett, das dort stand, und versank in tiefen Schlaf."
            },
            {
                text: "Aber der Schlaf war nicht nur für sie. Ein stiller Zauber breitete sich über das ganze Schloss aus: der König und die Königin, die gerade heimgekommen waren, schliefen im Saal ein; die Pferde im Stall, die Hunde im Hof, die Tauben auf dem Dach und sogar das Feuer in der Küche hielt inne. Der Braten hörte auf zu brutzeln, und der Koch, der den Küchenjungen schelten wollte, erstarrte mit erhobener Hand. Rund um das Schloss begann eine Dornenhecke zu wachsen, die jedes Jahr höher und dichter wurde, bis das Schloss den Blicken der Welt verborgen war."
            },
            {
                text: "Mit der Zeit verbreitete sich die Legende von \"Dornröschen\" in anderen Königreichen. Viele Prinzen versuchten, die Dornenmauer zu durchdringen, aber die Zweige schlossen sich wie Klauen zusammen, und die jungen Männer blieben hängen und kamen bei dem Versuch ums Leben."
            },
            {
                text: "Nach hundert Jahren kam ein neuer Prinz in die Gegend. Ein alter Mann erzählte ihm die Geschichte vom Turm und der schönen schlafenden Prinzessin. Trotz der Warnungen spürte der Prinz einen unwiderstehlichen Drang. An diesem Tag war das Jahrhundert des Zaubers genau um; als der junge Mann sich der Hecke näherte, verwandelten sich die Dornen in wunderschöne Blumen, die sich öffneten, um ihn durchzulassen."
            },
            {
                text: "Der Prinz durchschritt das Schloss, das in heiligen Frieden getaucht war. Er sah die Wachen mit ihren Speeren schlafen und die Hofleute regungslos. Schließlich stieg er auf den Turm und fand die Prinzessin. Ihre Schönheit war so strahlend, dass er nicht anders konnte, als niederzuknien und sie sanft zu küssen."
            },
            {
                text: "In diesem Moment brach der Zauber. Die Prinzessin öffnete die Augen und sah ihn süß an. Im ganzen Schloss erwachte das Leben, als wäre nur eine Sekunde vergangen: die Pferde wieherten, die Hunde bellten, das Feuer brannte wieder, und der Koch beendete das Ohrfeigen des Helfers. Der König und die Königin feierten die Hochzeit der Prinzessin und des Prinzen mit einem Fest, das tagelang dauerte. Die Dornenmauer verschwand für immer, und man erzählt sich, dass sie glücklich und in Frieden lebten und sich immer daran erinnerten, dass weder die längste Zeit noch die dunkelste Magie ein Schicksal besiegen können, das mit Liebe geschrieben wurde."
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
        rating: 5.0,
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
        ],
        contentEn: [
            {
                text: "In a mansion surrounded by green meadows and manicured gardens, lived a rich man with his young daughter. The girl was the portrait of her late mother: sweet, patient, and possessing a beauty that seemed to emanate from within. However, seeking a new home for his daughter, the man married a woman who brought with her two daughters from her first marriage. Beneath their good-looking faces, the three hid arid hearts and cruel minds. After the father's sudden death, the stepmother's true nature flourished like a weed. They stripped the young girl of her silk dresses, forced her to sleep in the attic on a straw mattress, and condemned her to the hardest chores of the house. She cleaned the ashes from the chimney from sunrise to sunset, and since she was always stained with dust and soot, her stepsisters began to call her Cinderella with contempt."
            },
            {
                text: "Despite the mockery and exhaustion, Cinderella never lost her sweetness. She found comfort talking to the birds that nested in the eaves and caring for a hazel tree that had grown next to her father's grave, watered with her own tears."
            },
            {
                text: "One day, the palace announced a royal ball that would last three nights, intended for the crown prince to choose a wife. The stepsisters spent weeks preparing, shouting orders to Cinderella to iron their laces and comb their hair. When the young girl begged to be let go, the stepmother, with an icy laugh, threw a plate of lentils into the ashes: \"If you can pick them all up in two hours, you can come.\" Cinderella called her friends the birds: \"Little doves, little turtle doves, come help me.\" In less than an hour, the task was done. But the stepmother, breaking her promise, told her she had no worthy dresses and would only embarrass the family. They left for the ball, leaving the young girl weeping under her hazel tree."
            },
            {
                text: "\"Little tree, shake and quiver, clothe me in gold and silver!\" exclaimed the young girl. From among the branches appeared a protective spirit, her fairy godmother. With a touch of her magic wand, she transformed a pumpkin into a golden carriage, six mice into steeds of elegant gait, and Cinderella's rags into a dress of silver cloth, adorned with jewels that shone like dew. Most amazing were her shoes, made of the finest and most resistant crystal. \"Remember one thing,\" warned the fairy, \"the magic fades when the last stroke of midnight sounds. You must return before then.\""
            },
            {
                text: "Upon entering the hall, the silence was absolute. The prince, bewitched by that stranger who radiated a special light, did not dance with any other woman. Cinderella was happy, but upon hearing the first toll of twelve, she fled the palace with such haste that she lost one of her crystal shoes on the staircase. The prince picked it up and swore he would only marry the woman whose foot fitted perfectly in that footwear."
            },
            {
                text: "The next day, the royal messengers scoured the kingdom. They arrived at the stepmother's mansion. The eldest sister tried to put on the shoe, but her foot was too big; the second tried too, but her toes didn't fit. The stepmother, in her desperation, even urged them to mutilate their feet in order to reign, but the blood betrayed the deception. \"Is there no one else here?\" asking the messenger. \"Only a dirty kitchen maid,\" replied the stepmother. But the messenger insisted. Cinderella came out of the kitchen, washed her face and hands, and sat on the stool. She slipped her foot into the crystal shoe and it fitted as if it had been molded by the angels themselves. At that moment, the young girl took the other shoe out of her apron."
            },
            {
                text: "The prince, who was waiting in the carriage, recognized her immediately. Cinderella was taken to the palace, where a wedding of unseen magnificence was celebrated. Despite all the harm received, Cinderella forgave her stepsisters, demonstrating that true nobility does not lie in the title, but in the ability to love even those who have made us cry."
            }
        ],
        contentFr: [
            {
                text: "Dans un manoir entouré de prairies verdoyantes et de jardins soignés, vivait un homme riche avec sa jeune fille. La petite fille était le portrait de sa défunte mère : douce, patiente et possédant une beauté qui semblait émaner de l'intérieur. Cependant, cherchant un nouveau foyer pour sa fille, l'homme épousa une femme qui amenait avec elle deux filles de son premier mariage. Sous leurs visages avenants, les trois cachaient des cœurs arides et des esprits cruels. Après la mort soudaine du père, la vraie nature de la marâtre fleurit comme une mauvaise herbe. Elles dépouillèrent la jeune fille de ses robes de soie, l'obligèrent à dormir au grenier sur une paillasse et la condamnèrent aux tâches les plus dures de la maison. Elle nettoyait les cendres de la cheminée du lever au coucher du soleil, et comme elle était toujours tachée de poussière et de suie, ses demi-sœurs commencèrent à l'appeler avec mépris Cendrillon."
            },
            {
                text: "Malgré les moqueries et l'épuisement, Cendrillon ne perdit jamais sa douceur. Elle trouvait du réconfort en parlant aux oiseaux qui nichaient sous l'avant-toit et en prenant soin d'un noisetier qui avait poussé près de la tombe de son père, arrosé de ses propres larmes."
            },
            {
                text: "Un jour, le palais annonça un bal royal qui durerait trois nuits, destiné à ce que le prince héritier choisisse une épouse. Les demi-sœurs passèrent des semaines à se préparer, criant des ordres à Cendrillon pour qu'elle repasse leurs dentelles et coiffe leurs cheveux. Quand la jeune fille supplia qu'on la laisse aller, la marâtre, avec un rire glacial, jeta une assiette de lentilles dans les cendres : \"Si tu es capable de toutes les ramasser en deux heures, tu pourras venir\". Cendrillon appela ses amis les oiseaux : \"Petites colombes, petites tourterelles, venez m'aider\". En moins d'une heure, la tâche était faite. Mais la marâtre, rompant sa promesse, lui dit qu'elle n'avait pas de robes dignes et qu'elle ne ferait que faire honte à la famille. Elles partirent au bal, laissant la jeune fille en pleurs sous son noisetier."
            },
            {
                text: "\"Petit arbre, secoue-toi et agite-toi, d'or et d'argent habille-moi !\", s'exclama la jeune fille. D'entre les branches apparut un esprit protecteur, sa fée marraine. D'un coup de sa baguette magique, elle transforma une citrouille en un carrosse doré, six souris en coursiers à l'allure élégante et les haillons de Cendrillon en une robe de tissu d'argent, ornée de bijoux qui brillaient comme la rosée. Le plus étonnant était ses souliers, faits du cristal le plus fin et le plus résistant. \"Rappelle-toi une chose\", avertit la fée, \"la magie s'estompe au son du dernier coup de minuit. Tu dois revenir avant\"."
            },
            {
                text: "En entrant dans la salle, le silence fut absolu. Le prince, ensorcelé par cette inconnue qui irradiait une lumière spéciale, ne dansa avec aucune autre femme. Cendrillon était heureuse, mais en entendant le premier tintement de minuit, elle s'enfuit du palais avec une telle hâte qu'elle perdit l'un de ses souliers de cristal dans l'escalier. Le prince le ramassa et jura qu'il n'épouserait que la femme dont le pied s'adapterait parfaitement à cette chaussure."
            },
            {
                text: "Le lendemain, les messagers royaux parcoururent le royaume. Ils arrivèrent au manoir de la marâtre. La sœur aînée essaya de chausser le soulier, mais son pied était trop grand ; la seconde essaya aussi, mais ses orteils ne rentraient pas. La marâtre, dans son désespoir, les incita même à se mutiler les pieds pour régner, mais le sang trahit la supercherie. \"N'y a-t-il personne d'autre ici ?\", demanda le messager. \"Seulement une souillon sale\", répondit la marâtre. Mais le messager insista. Cendrillon sortit de la cuisine, se lava le visage et les mains, et s'assit sur le tabouret. Elle glissa son pied dans le soulier de cristal et celui-ci s'ajusta comme s'il avait été moulé par les anges eux-mêmes. À ce moment, la jeune fille sortit l'autre soulier de son tablier."
            },
            {
                text: "Le prince, qui attendait dans le carrosse, la reconnut immédiatement. Cendrillon fut emmenée au palais, où l'on célébra un mariage d'une magnificence jamais vue. Malgré tout le mal reçu, Cendrillon pardonna à ses demi-sœurs, démontrant que la vraie noblesse ne réside pas dans le titre, mais dans la capacité d'aimer même ceux qui nous ont fait pleurer."
            }
        ],
        contentDe: [
            {
                text: "In einem Herrenhaus, umgeben von grünen Wiesen und gepflegten Gärten, lebte ein reicher Mann mit seiner jungen Tochter. Das Mädchen war das Ebenbild ihrer verstorbenen Mutter: sanft, geduldig und von einer Schönheit, die von innen zu kommen schien. Doch auf der Suche nach einem neuen Heim für seine Tochter heiratete der Mann eine Frau, die zwei Töchter aus ihrer ersten Ehe mitbrachte. Unter ihren hübschen Gesichtern verbargen die drei dürre Herzen und grausame Gemüter. Nach dem plötzlichen Tod des Vaters blühte die wahre Natur der Stiefmutter auf wie Unkraut. Sie nahmen dem jungen Mädchen ihre Seidenkleider weg, zwangen sie, auf dem Dachboden auf einem Strohsack zu schlafen, und verurteilten sie zu den härtesten Arbeiten im Haus. Sie reinigte von Sonnenaufgang bis Sonnenuntergang die Asche aus dem Kamin, und da sie immer mit Staub und Ruß bedeckt war, begannen ihre Stiefschwestern, sie verächtlich Aschenputtel zu nennen."
            },
            {
                text: "Trotz des Spotts und der Erschöpfung verlor Aschenputtel nie ihre Sanftmut. Sie fand Trost darin, mit den Vögeln zu sprechen, die unter dem Dachvorsprung nisteten, und einen Haselnussbaum zu pflegen, der neben dem Grab ihres Vaters gewachsen war, bewässert mit ihren eigenen Tränen."
            },
            {
                text: "Eines Tages kündigte der Palast einen königlichen Ball an, der drei Nächte dauern sollte, damit der Kronprinz eine Frau wählen konnte. Die Stiefschwestern verbrachten Wochen mit den Vorbereitungen und brüllten Aschenputtel Befehle zu, ihre Spitzen zu bügeln und ihre Haare zu kämmen. Als das junge Mädchen flehte, mitgehen zu dürfen, warf die Stiefmutter mit einem eisigen Lachen einen Teller Linsen in die Asche: \"Wenn du sie alle in zwei Stunden auflesen kannst, darfst du mitkommen.\" Aschenputtel rief ihre Freunde, die Vögel: \"Täubchen, Turteltauben, kommt mir helfen.\" In weniger als einer Stunde war die Aufgabe erledigt. Aber die Stiefmutter brach ihr Versprechen und sagte ihr, sie habe keine würdigen Kleider und würde der Familie nur Schande bereiten. Sie führen zum Ball und ließen das junge Mädchen weinend unter ihrem Haselnussbaum zurück."
            },
            {
                text: "\"Bäumchen, rüttel dich und schüttel dich, wirf Gold und Silber über mich!\", rief das junge Mädchen. Zwischen den Zweigen erschien ein Schutzgeist, ihre gute Fee. Mit einer Berührung ihres Zauberstabs verwandelte sie einen Kürbis in eine goldene Kutsche, sechs Mäuse in Rösser mit elegantem Gang und Aschenputtels Lumpen in ein Kleid aus Silberstoff, geschmückt mit Juwelen, die wie Tau glänzten. Das Erstaunlichste waren ihre Schuhe, gemacht aus feinstem und widerstandsfähigstem Kristall. \"Denke an eine Sache\", warnte die Fee, \"der Zauber verfliegt mit dem letzten Schlag der Mitternacht. Du musst vorher zurückkehren.\""
            },
            {
                text: "Als sie den Saal betrat, herrschte absolute Stille. Der Prinz, verzaubert von jener Unbekannten, die ein besonderes Licht ausstrahlte, tanzte mit keiner anderen Frau. Aschenputtel war glücklich, aber als sie den ersten Glockenschlag von zwölf hörte, floh sie mit solcher Eile aus dem Palast, dass sie einen ihrer Kristallschuhe auf der Treppe verlor. Der Prinz hob ihn auf und schwor, nur die Frau zu heiraten, deren Fuß perfekt in jenes Schuhwerk passte."
            },
            {
                text: "Am nächsten Tag durchkämmten die königlichen Boten das Königreich. Sie kamen zum Herrenhaus der Stiefmutter. Die älteste Schwester versuchte, den Schuh anzuziehen, aber ihr Fuß war zu groß; die zweite versuchte es auch, aber ihre Zehen passten nicht hinein. Die Stiefmutter drängte sie in ihrer Verzweiflung sogar, sich die Füße zu verstümmeln, um zu herrschen, aber das Blut verriet den Betrug. \"Ist hier sonst niemand?\", fragte der Bote. \"Nur eine schmutzige Küchenmagd\", antwortete die Stiefmutter. Aber der Bote bestand darauf. Aschenputtel kam aus der Küche, wusch sich Gesicht und Hände und setzte sich auf den Schemel. Sie glitt mit ihrem Fuß in den Kristallschuh und dieser passte, als wäre er von den Engeln selbst geformt worden. In diesem Moment holte das junge Mädchen den anderen Schuh aus ihrer Schürze."
            },
            {
                text: "Der Prinz, der in der Kutsche wartete, erkannte sie sofort. Aschenputtel wurde zum Palast gebracht, wo eine Hochzeit von nie gesehene Pracht gefeiert wurde. Trotz allem erlittenen Unrecht verzieh Aschenputtel ihren Stiefschwestern und bewies, dass der wahre Adel nicht im Titel liegt, sondern in der Fähigkeit, auch jene zu lieben, die uns zum Weinen gebracht haben."
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
        rating: 4.3,
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
        ],
        contentEn: [
            {
                text: "Once upon a time there was a donkey who, for long years, had tirelessly carried sacks of wheat to the mill for his master. But time forgives no one, and his strength began to fade. Realizing that his master planned to get rid of him to avoid feeding him anymore, the donkey decided to take the reins of his own destiny. \"I will go to Bremen,\" he thought optimistically, \"there my voice is still strong and I can become a town musician.\""
            },
            {
                text: "He had not walked far when he found a hunting dog lying by the roadside, panting as if he had run a marathon. —\"Why are you panting so much, friend?\" asked the donkey. —\"Oh!\" replied the dog sadly. \"As I am old and no longer useful for hunting, my master wanted to kill me. I have fled, but how will I earn a living now?\". —\"Come with me to Bremen,\" proposed the donkey. \"I will play the lute and you can play the drums.\" The dog thought it was an excellent plan and both continued the journey."
            },
            {
                text: "Shortly after, they ran into a cat who had a face as long as three days of rain. —\"What's wrong, old mouse hunter?\" asked the donkey. —\"Who can be cheerful when their life is in danger?\" meowed the cat. \"My teeth are no longer sharp and I prefer to sit by the fire rather than chase mice. That's why my mistress tried to drown me. I have escaped, but I don't know where to go.\" —\"You know a lot about night serenades,\" said the donkey. \"Join us to Bremen and become a musician with us.\" The cat accepted and the three went on."
            },
            {
                text: "Passing by a farm, they saw a rooster perched on a gate, screaming with all his might. —\"You scream as if your life depended on it,\" observed the donkey. —\"It does!\" replied the rooster. \"Guests are coming tomorrow and the mistress has told the cook she wants me in the soup. I am taking advantage of my last minutes of freedom.\" —\"What nonsense!\" exclaimed the donkey. \"Anything is better than death. You have a magnificent voice; come with us to Bremen.\" The rooster joined the group, and so, the four new friends continued their march."
            },
            {
                text: "However, Bremen was far away and they could not reach it in a single day. At nightfall, they entered a thick forest to sleep. The rooster, who had perched on the highest top of a tree to keep watch, spotted a light in the distance. —\"Friends! There is a house nearby,\" he shouted. Hungry and tired, they decided to approach. Peering through the window, the donkey, who was the tallest, saw a band of robbers sitting before a table overflowing with delicacies: roast turkey, wine, and tender bread."
            },
            {
                text: "They needed to enter, but the robbers were dangerous. Then, they devised a plan based on their greatest talent: music. The donkey leaned with his front legs on the window sill; the dog jumped on the donkey's back; the cat climbed on the dog and, finally, the rooster flew to perch on the cat's head. At a given signal, they all started their \"concert\": the donkey brayed, the dog barked, the cat meowed and the rooster crowed with such a din that the windowpanes vibrated. Immediately after, they jumped through the window breaking the glass with a terrifying crash."
            },
            {
                text: "The robbers, convinced that a monster or a ghost of the forest was attacking them, fled in terror into the thicket, leaving the banquet behind. The four friends dined like kings and, exhausted, looked for a place to sleep: the donkey on the manure, the dog behind the door, the cat by the hearth ashes and the rooster on a roof beam."
            },
            {
                text: "Later, the chief of the robbers sent one of his men to inspect the house. The robber entered in the dark and, seeing the cat's glowing eyes, thought they were burning coals. When he brought a match close, the cat jumped at his face hissing and scratching. Trying to flee through the door, the dog bit his leg; passing through the yard, the donkey gave him a monumental kick; and the rooster, woken by the noise, screamed from above: \"Cock-a-doodle-doo!\"."
            },
            {
                text: "The robber returned to his companions pale with terror: —\"It's horrible!\" he exclaimed. \"In the house lives a witch who scratched my face; at the door there is a man with a knife who wounded my leg; in the yard there is a black monster who hit me with a club, and on the roof there is a judge who shouted: 'Bring me the thief-here!'\"."
            },
            {
                text: "The robbers never dared to return, and the four musicians of Bremen felt so comfortable in the house that they didn't want to leave it anymore. And it is said that they still live happily, rehearsing their songs under the moonlight."
            }
        ],
        contentFr: [
            {
                text: "Il était une fois un âne qui, pendant de longues années, avait inlassablement porté des sacs de blé au moulin de son maître. Mais le temps ne pardonne pas, et ses forces commencèrent à faiblir. Se rendant compte que son maître prévoyait de se débarrasser de lui pour ne plus avoir à le nourrir, l'âne décida de prendre les rênes de son propre destin. \"J'irai à Brême\", pensa-t-il avec optimisme, \"là-bas ma voix est encore forte et je pourrai devenir musicien municipal\"."
            },
            {
                text: "Il n'avait pas marché beaucoup quand il trouva un chien de chasse étendu au bord du chemin, haletant comme s'il avait couru un marathon. —\"Pourquoi halètes-tu autant, l'ami ?\", demanda l'âne. —\"Hélas !\", répondit le chien avec tristesse. \"Comme je suis vieux et que je ne sers plus pour la chasse, mon maître a voulu me tuer. J'ai fui, mais comment vais-je gagner ma vie maintenant ?\". —\"Viens avec moi à Brême\", proposa l'âne. \"Je jouerai du luth et tu pourras jouer des timbales\". Le chien trouva le plan excellent et tous deux poursuivirent le voyage."
            },
            {
                text: "Peu après, ils tombèrent sur un chat qui avait une mine aussi longue que trois jours de pluie. —\"Qu'est-ce qui t'arrive, vieux chasseur de souris ?\", demanda l'âne. —\"Qui peut être joyeux quand sa vie est en danger ?\", miaula le chat. \"Mes dents ne sont plus aiguisées et je préfère être près du feu plutôt que de chasser les souris. C'est pourquoi ma maîtresse a essayé de me noyer. J'ai échappé, mais je ne sais pas où aller\". —\"Tu t'y connais en sérénades nocturnes\", dit l'âne. \"Accompagne-nous à Brême et deviens musicien avec nous\". Le chat accepta et les trois continuèrent."
            },
            {
                text: "En passant par une ferme, ils virent un coq perché sur une barrière, criant de toutes ses forces. —\"Tu cries comme si ta vie en dépendait\", observa l'âne. —\"C'est qu'elle en dépend !\", répondit le coq. \"Demain des invités viennent et la maîtresse a dit à la cuisinière qu'elle me veut dans la soupe. Je profite de mes dernières minutes de liberté\". —\"Quelle bêtise !\", s'exclama l'âne. \"N'importe quoi vaut mieux que la mort. Tu as une voix magnifique ; viens avec nous à Brême\". Le coq rejoignit le groupe, et ainsi, les quatre nouveaux amis continuèrent leur marche."
            },
            {
                text: "Cependant, Brême était loin et ils ne pouvaient pas y arriver en un seul jour. À la tombée de la nuit, ils s'enfoncèrent dans une forêt épaisse pour dormir. Le coq, qui s'était posé sur la cime la plus haute d'un arbre pour surveiller, aperçut une lumière au loin. —\"Les amis ! Il y a une maison tout près\", cria-t-il. Affamés et fatigués, ils décidèrent de s'approcher. En regardant par la fenêtre, l'âne, qui était le plus grand, vit une bande de voleurs assis devant une table regorgeant de mets : dinde rôtie, vin et pain tendre."
            },
            {
                text: "Ils devaient entrer, mais les voleurs étaient dangereux. Alors, ils imaginèrent un plan basé sur leur plus grand talent : la musique. L'âne s'appuya avec les pattes avant sur le rebord de la fenêtre ; le chien sauta sur le dos de l'âne ; le chat grimpa sur le chien et, finalement, le coq vola pour se poser sur la tête du chat. À un signal donné, tous commencèrent leur \"concert\" : l'âne brait, le chien aboya, le chat miaula et le coq chanta avec un tel vacarme que les vitres vibrèrent. Tout de suite après, ils sautèrent à travers la fenêtre en brisant les verres avec un fracas terrifiant."
            },
            {
                text: "Les voleurs, convaincus qu'un monstre ou un fantôme de la forêt les attaquait, s'enfuirent terrifiés vers les fourrés, laissant derrière eux le banquet. Les quatre amis dînèrent comme des rois et, épuisés, cherchèrent un endroit pour dormir : l'âne sur le fumier, le chien derrière la porte, le chat près des cendres du foyer et le coq sur une poutre du toit."
            },
            {
                text: "Plus tard, le chef des voleurs envoya l'un de ses hommes inspecter la maison. Le voleur entra dans l'obscurité et, voyant les yeux brillants du chat, pensa que c'étaient des braises allumées. En approchant une allumette, le chat lui sauta au visage en crachant et en griffant. En essayant de fuir par la porte, le chien lui mordit la jambe ; en passant par le corral, l'âne lui donna une ruade monumentale ; et le coq, réveillé par le bruit, cria d'en haut : \"Cocorico !\"."
            },
            {
                text: "Le voleur revint vers ses compagnons pâle de terreur : —\"C'est horrible !\", s'exclama-t-il. \"Dans la maison vit une sorcière qui m'a griffé le visage ; à la porte il y a un homme avec un couteau qui m'a blessé la jambe ; dans la cour il y a un monstre noir qui m'a frappé avec une massue, et sur le toit il y a un juge qui criait : 'Amenez-moi le voleur ici !'\"."
            },
            {
                text: "Les voleurs n'osèrent jamais revenir, et les quatre musiciens de Brême se sentirent si bien dans la maison qu'ils ne voulurent plus en partir. Et on dit qu'ils vivent encore heureux, répétant leurs chansons sous la lumière de la lune."
            }
        ],
        contentDe: [
            {
                text: "Es war einmal ein Esel, der lange Jahre unermüdlich Säcke mit Weizen zur Mühle seines Herrn getragen hatte. Aber die Zeit verzeiht niemandem, und seine Kräfte begannen zu schwinden. Als er merkte, dass sein Herr plante, ihn loszuwerden, um ihn nicht mehr füttern zu müssen, beschloss der Esel, sein Schicksal selbst in die Hand zu nehmen. \"Ich gehe nach Bremen\", dachte er optimistisch, \"dort ist meine Stimme noch kräftig und ich kann Stadtmusikant werden.\""
            },
            {
                text: "Er war noch nicht weit gegangen, als er einen Jagdhund am Wegesrand liegen sah, der jappte, als hätte er einen Marathon gelaufen. —\"Warum jappst du so, Freund?\", fragte der Esel. —\"Ach!\", antwortete der Hund traurig. \"Da ich alt bin und nicht mehr für die Jagd tauge, wollte mein Herr mich töten. Ich bin geflohen, aber wie soll ich jetzt meinen Lebensunterhalt verdienen?\". —\"Komm mit mir nach Bremen\", schlug der Esel vor. \"Ich spiele die Laute und du kannst die Pauken schlagen.\" Der Hund fand den Plan ausgezeichnet und beide setzten die Reise fort."
            },
            {
                text: "Kurz darauf trafen sie auf eine Katze, die ein Gesicht machte wie drei Tage Regenwetter. —\"Was ist los mit dir, alter Mäusejäger?\", fragte der Esel. —\"Wer kann fröhlich sein, wenn sein Leben in Gefahr ist?\", miaute die Katze. \"Meine Zähne sind nicht mehr scharf und ich sitze lieber am Feuer als Mäuse zu jagen. Deshalb wollte mein Frauchen mich ertränken. Ich bin entkommen, aber ich weiß nicht, wohin.\" —\"Du verstehst dich auf nächtliche Serenaden\", sagte der Esel. \"Komm mit uns nach Bremen und werde Musikant bei uns.\" Die Katze willigte ein und die drei zogen weiter."
            },
            {
                text: "Als sie an einem Bauernhof vorbeikamen, sahen sie einen Hahn auf einem Tor sitzen, der aus voller Kehle schrie. —\"Du schreist, als ginge es um dein Leben\", bemerkte der Esel. —\"Das tut es auch!\", antwortete der Hahn. \"Morgen kommen Gäste und die Hausherrin hat der Köchin gesagt, sie will mich in der Suppe haben. Ich nutze meine letzten Minuten in Freiheit.\" —\"Was für ein Unsinn!\", rief der Esel. \"Etwas Besseres als den Tod findest du überall. Du hast eine großartige Stimme; komm mit uns nach Bremen.\" Der Hahn schloss sich der Gruppe an, und so setzten die vier neuen Freunde ihren Marsch fort."
            },
            {
                text: "Bremen war jedoch weit entfernt und sie konnten es nicht an einem einzigen Tag erreichen. Bei Einbruch der Dunkelheit gingen sie in einen dichten Wald, um zu schlafen. Der Hahn, der auf die höchste Spitze eines Baumes geflogen war, um Wache zu halten, erspähte ein Licht in der Ferne. —\"Freunde! Da ist ein Haus ganz in der Nähe\", rief er. Hungrig und müde beschlossen sie, sich zu nähern. Als er durch das Fenster spähte, sah der Esel, der der Größte war, eine Räuberbande, die vor einem Tisch saß, der vor Köstlichkeiten überquoll: Gänsebraten, Wein und weiches Brot."
            },
            {
                text: "Sie mussten hinein, aber die Räuber waren gefährlich. Da ersannen sie einen Plan, der auf ihrem größten Talent basierte: der Musik. Der Esel stellte sich mit den Vorderhufen auf das Fensterbrett; der Hund sprang auf den Rücken des Esels; die Katze kletterte auf den Hund und schließlich flog der Hahn hoch, um sich auf den Kopf der Katze zu setzen. Auf ein gegebenes Zeichen begannen alle ihr \"Konzert\": der Esel iahte, der Hund bellte, die Katze miaute und der Hahn krähte mit solchem Lärm, dass die Fensterscheiben vibrierten. Unmittelbar danach sprangen sie durch das Fenster und zerbrachen das Glas mit einem schrecklichen Krachen."
            },
            {
                text: "Die Räuber, überzeugt, dass ein Monster oder ein Geist des Waldes sie angriff, flohen entsetzt ins Dickicht und ließen das Festmahl zurück. Die vier Freunde speisten wie Könige und suchten sich erschöpft einen Schlafplatz: der Esel auf dem Mist, der Hund hinter der Tür, die Katze bei der Herdassche und der Hahn auf einem Dachbalken."
            },
            {
                text: "Später schickte der Räuberhauptmann einen seiner Männer, das Haus zu inspizieren. Der Räuber ging im Dunkeln hinein und als er die leuchtenden Augen der Katze sah, dachte er, es seien glühende Kohlen. Als er ein Streichholz näherte, sprang ihm die Katze ins Gesicht, fauchte und kratzte. Als er versuchte, durch die Tür zu fliehen, biss ihn der Hund ins Bein; als er über den Hof lief, gab ihm der Esel einen gewaltigen Tritt; und der Hahn, vom Lärm geweckt, schrie von oben: \"Kikeriki!\"."
            },
            {
                text: "Der Räuber kehrte bleich vor Schreck zu seinen Kumpanen zurück: —\"Es ist schrecklich!\", rief er. \"Im Haus wohnt eine Hexe, die mir das Gesicht zerkratzt hat; an der Tür steht ein Mann mit einem Messer, der mich am Bein verletzt hat; im Hof ist ein schwarzes Monster, das mich mit einer Keule geschlagen hat, und auf dem Dach sitzt ein Richter, der rief: 'Bringt mir den Dieb her!'\"."
            },
            {
                text: "Die Räuber wagten es nie wieder, zurückzukehren, und die vier Bremer Stadtmusikanten fühlten sich in dem Haus so wohl, dass sie es nicht mehr verlassen wollten. Und man sagt, dass sie dort immer noch glücklich leben und ihre Lieder im Mondschein proben."
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
        coverImage: '/images/storyteller/blancanieves-full-v7.png',
        chipImage: '/images/storyteller/character-blancanieves-v5.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-red-600 to-indigo-900',
        rating: 4.8,
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
        ],
        contentEn: [
            {
                text: "In the heart of a deep winter, while snowflakes fell like feathers from the sky, a queen was sewing by an ebony-framed window. Pricking her finger with the needle, three drops of blood fell on the white snow. The contrast was so beautiful that the queen thought: \"I wish I had a daughter with skin as white as snow, lips as red as blood, and hair as black as ebony!\" Shortly after, her wish was granted and she gave birth to a girl named Snow White. However, the joy was brief, as the queen died shortly after."
            },
            {
                text: "A year later, the king married a woman of amazing beauty but of a haughty and cruel heart. This woman possessed a magical object: a crystal mirror that she consulted every morning. \"Mirror, magic mirror on the wall, who is the fairest of all the kingdom?\" she asked. \"You, my queen, are the fairest,\" the mirror always replied. But Snow White grew in grace and splendor, and upon turning seven, her beauty surpassed that of the queen herself. When the stepmother questioned her mirror again, it replied with a voice that sounded like a sentence: \"You are beautiful, majesty, it is true; but Snow White is a thousand times more beautiful than you.\""
            },
            {
                text: "Envy, like a poisonous root, began to grow in the queen's chest. She called a huntsman and ordered him to take the girl into the forest to kill her. As proof of his task, he was to bring her lungs and liver. The huntsman guided the girl into the thicket, but seeing her innocent face and her tears, he did not have the courage to raise the dagger. \"Run, poor creature,\" he said. To deceive the queen, he killed a young boar and delivered the entrails to the palace, which the wicked woman devoured with macabre pleasure."
            },
            {
                text: "Snow White wandered through the forest, frightened by the creaking of branches and the howling of the wind. At dusk, she spotted a small house. Upon entering, she saw that everything was tiny but immaculate: there was a table with seven little plates, seven little spoons, and seven little cups. Fatigued, she ate a little from each plate, drank a sip from each cup, and fell asleep on the seventh little bed."
            },
            {
                text: "At nightfall, the owners of the house returned: seven dwarfs who worked in the mines of the mountains looking for gold. Seeing the girl sleeping, they were amazed by her beauty. Upon waking up, Snow White told them her sad story. The dwarfs, moved, proposed to her: \"If you take care of our house, cook and wash, you can stay with us and you will lack nothing.\""
            },
            {
                text: "But peace was short-lived. In the castle, the queen consulted the mirror again, who revealed that Snow White was still alive in the house of the seven dwarfs. Furious, the queen disguised herself as an old peddler and traveled to the mountain. First she tried to kill her with a lace for the waist that she tightened so much that the girl fainted; then, with a poisoned comb. On both occasions, the dwarfs returned in time to save her."
            },
            {
                text: "Finally, the queen prepared an apple of exquisite appearance: one half was white and the other a vibrant red. Only the red half contained the most potent poison in the world. Disguised as a peasant woman, she convinced Snow White to taste it. At the first bite, the girl fell to the ground without breathing. The dwarfs, upon returning, tried everything to wake her up, but this time they could not. Seeing that her body did not corrupt and retained its beauty, they placed her in a glass coffin with her name written in gold letters and watched over her day and night."
            },
            {
                text: "A long time passed, until a prince who was riding through the forest saw the coffin and fell in love with the maiden who seemed to sleep. He begged the dwarfs to let him take the coffin to his castle to honor her forever. While his servants carried the heavy crystal, they stumbled upon a bush. The jolt caused the piece of poisoned apple to jump from Snow White's throat. The young woman opened her eyes, sat up, and asked: \"Where am I?\""
            },
            {
                text: "The prince, mad with joy, declared his love and took her to his palace to marry her. The evil queen was invited to the wedding. When the mirror told her that the new queen was more beautiful than her, she went full of curiosity and rage. But upon recognizing Snow White, terror seized her. As punishment for her crimes, fate imposed on her to dance with iron shoes that had been heated in the fire, until she fell down dead. Snow White and her prince ruled with wisdom, and the seven dwarfs were always guests of honor at their marble table."
            }
        ],
        contentFr: [
            {
                text: "Au cœur d'un hiver profond, alors que les flocons de neige tombaient comme des plumes du ciel, une reine cousait près d'une fenêtre au cadre d'ébène. En se piquant le doigt avec l'aiguille, trois gouttes de sang tombèrent sur la neige blanche. Le contraste était si beau que la reine pensa : \"Si seulement j'avais une fille à la peau blanche comme la neige, aux lèvres rouges comme le sang et aux cheveux noirs comme l'ébène ! \". Peu après, son vœu fut exaucé et elle donna naissance à une fille qu'on appela Blanche-Neige. Cependant, la joie fut brève, car la reine mourut peu de temps après."
            },
            {
                text: "Un an plus tard, le roi épousa une femme d'une beauté étonnante mais au cœur hautain et cruel. Cette femme possédait un objet magique : un miroir de cristal qu'elle consultait chaque matin. \"Miroir, mon beau miroir au mur, qui est la plus belle de tout le royaume ?\", demandait-elle. \"Toi, ma reine, tu es la plus belle\", répondait toujours le miroir. Mais Blanche-Neige grandissait en grâce et en splendeur, et à ses sept ans, sa beauté surpassait celle de la reine elle-même. Quand la marâtre interrogea de nouveau son miroir, il répondit d'une voix qui sonna comme une sentence : \"Tu es belle, majesté, c'est vrai ; mais Blanche-Neige est mille fois plus belle que toi\"."
            },
            {
                text: "L'envie, comme une racine vénéneuse, commença à pousser dans la poitrine de la reine. Elle appela un chasseur et lui ordonna d'emmener la fille dans la forêt pour la tuer. Comme preuve de sa tâche, il devait lui rapporter ses poumons et son foie. Le chasseur guida la fille dans le fourré, mais en voyant son visage innocent et ses larmes, il n'eut pas le courage de lever le poignard. \"Cours, pauvre créature\", dit-il. Pour tromper la reine, il tua un jeune sanglier et remit les entrailles au palais, que la méchante femme dévora avec un plaisir macabre."
            },
            {
                text: "Blanche-Neige erra dans la forêt, effrayée par le craquement des branches et le hurlement du vent. Au crépuscule, elle aperçut une petite maison. En entrant, elle vit que tout était minuscule mais impeccable : il y avait une table avec sept petites assiettes, sept petites cuillères et sept petits verres. Fatiguée, elle mangea un peu de chaque assiette, but une gorgée de chaque verre et s'endormit dans le septième petit lit."
            },
            {
                text: "À la tombée de la nuit, les propriétaires de la maison revinrent : sept nains qui travaillaient dans les mines des montagnes à la recherche d'or. En voyant la fille dormir, ils furent émerveillés par sa beauté. À son réveil, Blanche-Neige leur raconta sa triste histoire. Les nains, émus, lui proposèrent : \"Si tu t'occupes de notre maison, que tu cuisines et laves, tu peux rester avec nous et tu ne manqueras de rien\"."
            },
            {
                text: "Mais la paix fut de courte durée. Au château, la reine consulta de nouveau le miroir, qui lui révéla que Blanche-Neige était toujours vivante dans la maison des sept nains. Furieuse, la reine se déguisa en vieille colporteuse et voyagea jusqu'à la montagne. D'abord, elle essaya de la tuer avec un lacet pour la taille qu'elle serra tellement que la fille s'évanouit ; ensuite, avec un peigne empoisonné. Dans les deux occasions, les nains revinrent à temps pour la sauver."
            },
            {
                text: "Finalement, la reine prépara une pomme d'apparence exquise : une moitié était blanche et l'autre d'un rouge vibrant. Seule la moitié rouge contenait le poison le plus puissant du monde. Déguisée en paysanne, elle convainquit Blanche-Neige d'y goûter. À la première bouchée, la fille tomba au sol sans respirer. Les nains, à leur retour, essayèrent tout pour la réveiller, mais cette fois ils ne purent pas. Voyant que son corps ne se corrompait pas et conservait sa beauté, ils la placèrent dans un cercueil de verre avec son nom écrit en lettres d'or et la veillèrent jour et nuit."
            },
            {
                text: "Beaucoup de temps passa, jusqu'à ce qu'un prince chevauchant à travers la forêt vît le cercueil et tombât amoureux de la demoiselle qui semblait dormir. Il supplia les nains de lui permettre d'emmener le cercueil dans son château pour l'honorer pour toujours. Alors que ses serviteurs portaient le lourd cristal, ils trébuchèrent sur un buisson. La secousse fit sauter le morceau de pomme empoisonnée de la gorge de Blanche-Neige. La jeune femme ouvrit les yeux, s'assit et demanda : \"Où suis-je ?\"."
            },
            {
                text: "Le prince, fou de joie, lui déclara son amour et l'emmena dans son palais pour l'épouser. La méchante reine fut invitée au mariage. Quand le miroir lui dit que la nouvelle reine était plus belle qu'elle, elle y alla pleine de curiosité et de rage. Mais en reconnaissant Blanche-Neige, la terreur s'empara d'elle. En punition de ses crimes, le destin lui imposa de danser avec des chaussures de fer qui avaient été chauffées au feu, jusqu'à ce qu'elle tombe morte. Blanche-Neige et son prince gouvernèrent avec sagesse, et les sept nains furent toujours des invités d'honneur à leur table de marbre."
            }
        ],
        contentDe: [
            {
                text: "Im Herzen eines tiefen Winters, während Schneeflocken wie Federn vom Himmel fielen, saß eine Königin und nähte an einem Fenster mit Ebenholzrahmen. Als sie sich mit der Nadel in den Finger stach, fielen drei Tropfen Blut in den weißen Schnee. Der Kontrast war so schön, dass die Königin dachte: \"Hätte ich doch ein Kind, so weiß wie Schnee, so rot wie Blut und so schwarz wie Ebenholz!\" Kurz darauf erfüllte sich ihr Wunsch und sie brachte ein Mädchen zur Welt, das Schneewittchen genannt wurde. Die Freude war jedoch nur kurz, denn die Königin starb bald darauf."
            },
            {
                text: "Ein Jahr später heiratete der König eine Frau von erstaunlicher Schönheit, aber mit einem hochmütigen und grausamen Herzen. Diese Frau besaß einen magischen Gegenstand: einen Kristallspiegel, den sie jeden Morgen befragte. \"Spieglein, Spieglein an der Wand, wer ist die Schönste im ganzen Land?\", fragte sie. \"Ihr, Frau Königin, seid die Schönste\", antwortete der Spiegel immer. Aber Schneewittchen wuchs an Anmut und Glanz, und als sie sieben Jahre alt wurde, übertraf ihre Schönheit die der Königin selbst. Als die Stiefmutter ihren Spiegel erneut befragte, antwortete dieser mit einer Stimme, die wie ein Urteil klang: \"Frau Königin, Ihr seid die Schönste hier, aber Schneewittchen ist tausendmal schöner als Ihr.\""
            },
            {
                text: "Neid, wie eine giftige Wurzel, begann in der Brust der Königin zu wachsen. Sie rief einen Jäger und befahl ihm, das Mädchen in den Wald zu bringen, um es zu töten. Als Beweis für seine Tat sollte er ihr Lunge und Leber bringen. Der Jäger führte das Mädchen ins Dickicht, aber als er ihr unschuldiges Gesicht und ihre Tränen sah, hatte er nicht den Mut, den Dolch zu erheben. \"Lauf, armes Kind\", sagte er. Um die Königin zu täuschen, tötete er einen jungen Eber und lieferte die Eingeweide im Palast ab, die die böse Frau mit makabrem Vergnügen verschlang."
            },
            {
                text: "Schneewittchen irrte durch den Wald, erschreckt vom Knacken der Zweige und dem Heulen des Windes. In der Abenddämmerung erblickte sie ein kleines Haus. Als sie eintrat, sah sie, dass alles winzig, aber makellos war: Es gab einen Tisch mit sieben kleinen Tellern, sieben kleinen Löffeln und sieben kleinen Bechern. Erschöpft aß sie ein wenig von jedem Teller, trank einen Schluck aus jedem Becher und schlief im siebten Bettchen ein."
            },
            {
                text: "Bei Einbruch der Dunkelheit kehrten die Besitzer des Hauses zurück: sieben Zwerge, die in den Minen der Berge nach Gold suchten. Als sie das schlafende Mädchen sahen, waren sie von ihrer Schönheit überwältigt. Als sie aufwachte, erzählte Schneewittchen ihnen ihre traurige Geschichte. Die Zwerge, gerührt, schlugen ihr vor: \"Wenn du unseren Haushalt versorgst, kochst und wäschst, kannst du bei uns bleiben und es wird dir an nichts fehlen.\""
            },
            {
                text: "Aber der Frieden war nur von kurzer Dauer. Im Schloss befragte die Königin erneut den Spiegel, der ihr enthüllte, dass Schneewittchen im Haus der sieben Zwerge noch am Leben war. Wütend verkleidete sich die Königin als alte Hausiererin und reiste zum Berg. Zuerst versuchte sie, sie mit einem Schnürriemen zu töten, den sie so fest zog, dass das Mädchen in Ohnmacht fiel; dann mit einem vergifteten Kamm. In beiden Fällen kamen die Zwerge rechtzeitig zurück, um sie zu retten."
            },
            {
                text: "Schließlich bereitete die Königin einen Apfel von exquisitem Aussehen vor: eine Hälfte war weiß und die andere leuchtend rot. Nur die rote Hälfte enthielt das stärkste Gift der Welt. Als Bäuerin verkleidet, überredete sie Schneewittchen, davon zu kosten. Beim ersten Bissen fiel das Mädchen atemlos zu Boden. Die Zwerge versuchten bei ihrer Rückkehr alles, um sie zu wecken, aber diesmal konnten sie es nicht. Da sie sahen, dass ihr Körper nicht verweste und seine Schönheit behielt, legten sie sie in einen gläsernen Sarg mit ihrem Namen in goldenen Buchstaben darauf und wachten Tag und Nacht bei ihr."
            },
            {
                text: "Viel Zeit verging, bis ein Prinz, der durch den Wald ritt, den Sarg sah und sich in das Mädchen verliebte, das zu schlafen schien. Er flehte die Zwerge an, ihm zu erlauben, den Sarg in sein Schloss zu bringen, um sie für immer zu ehren. Während seine Diener das schwere Kristall trugen, stolperten sie über einen Strauch. Der Ruck ließ das Stück vergifteten Apfel aus Schneewittchens Hals springen. Die junge Frau öffnete die Augen, setzte sich auf und fragte: \"Wo bin ich?\""
            },
            {
                text: "Der Prinz, verrückt vor Freude, erklärte ihr seine Liebe und brachte sie in seinen Palast, um sie zu heiraten. Die böse Königin wurde zur Hochzeit eingeladen. Als der Spiegel ihr sagte, dass die neue Königin schöner sei als sie, ging sie voller Neugier und Wut hin. Aber als sie Schneewittchen erkannte, ergriff sie das Entsetzen. Als Strafe für ihre Verbrechen legte das Schicksal ihr auf, in eisernen Schuhen zu tanzen, die im Feuer erhitzt worden waren, bis sie tot umfiel. Schneewittchen und ihr Prinz regierten mit Weisheit, und die sieben Zwerge waren immer Ehrengäste an ihrem Marmortisch."
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
        rating: 4.5,
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
        ],
        contentEn: [
            {
                text: "In a small town of half-timbered houses, lived a young tailor who worked with great dedication in his workshop. One noon, while preparing a slice of bread with jam, some flies began to hover over his food. Annoyed, the tailor took a piece of cloth and struck a sharp blow on the table. Upon lifting the cloth, he counted with astonishment that he had killed seven with a single blow."
            },
            {
                text: "\"How brave I am!\" he exclaimed to himself. \"The whole world must know about my feat.\" He cut a strip of silk and embroidered on it in large, golden letters: \"SEVEN WITH ONE BLOW.\" He girded the sash to his waist and, with a piece of old cheese in his pocket and a bird that had become entangled in a thicket, he set out to travel the world."
            },
            {
                text: "Walking through the mountains, he met a colossal Giant blocking the way. The tailor, far from being cowed, showed him his sash. The giant, thinking he referred to seven men with one blow, decided to test his strength. He took a stone and squeezed it until drops of water gushed from it. \"Can you do this?\" roared the giant. \"That is nothing!\" replied the tailor. He took the old cheese from his pocket and squeezed it with such force that the whey shot out."
            },
            {
                text: "The giant was impressed, but not convinced. He took another stone and threw it so high that it was almost lost from sight. \"Good throw!\" said the tailor. \"But the stone ended up falling. I will throw one that will never return.\" He took the bird out of his pocket and released it into the air; the bird, happy to be free, flew until it disappeared into the clouds."
            },
            {
                text: "The giant, although furious, invited the tailor to spend the night in his cave with others of his kind. At midnight, the giant struck the tailor's bed with an iron bar, believing he would kill him. But the young man, who had found the bed too large and had slept in a corner, emerged unharmed. Seeing him appear alive in the morning, the giants fled in terror, thinking he was a supernatural being."
            },
            {
                text: "The tailor finally arrived at the palace of a great King. The soldiers, reading his sash, informed the monarch that an invincible warrior had arrived. The King, fearful but cunning, offered him his daughter's hand and half of his kingdom if he could perform three impossible tasks."
            },
            {
                text: "The first was to defeat two giants that terrorized the forest. The little tailor did not face them with a sword; he waited for them to sleep under a tree and, climbing into the branches, began to throw heavy stones at them. The giants woke up accusing each other of the blows, until they engaged in a fight so fierce that both fell dead."
            },
            {
                text: "The second task consisted of capturing a unicorn that destroyed the crops. The tailor stood in front of a tree and waited for the beast to charge at him. At the last second, the young man jumped aside and the unicorn's horn remained deeply stuck in the trunk."
            },
            {
                text: "The third test was to hunt a wild boar. The tailor attracted the animal towards a small chapel in the forest; he entered jumping through a window and, when the boar entered after him, the young man jumped out again and locked the door."
            },
            {
                text: "The King, with no more excuses, had to keep his promise. The brave little tailor, who armed only with a needle, a thread, and much intelligence had defeated monsters and kings, married the princess. And the chronicles say that he ruled with justice, for he knew better than anyone that to overcome life's difficulties, sometimes a good wit cuts more than the sharpest sword."
            }
        ],
        contentFr: [
            {
                text: "Dans une petite ville aux maisons à colombages, vivait un jeune tailleur qui travaillait avec un grand dévouement dans son atelier. Un midi, alors qu'il se préparait une tartine de confiture, des mouches commencèrent à voltiger au-dessus de sa nourriture. Agacé, le tailleur prit un morceau de tissu et donna un coup sec sur la table. En soulevant le tissu, il compta avec étonnement qu'il en avait tué sept d'un seul coup."
            },
            {
                text: "\"Que je suis courageux !\", s'exclama-t-il pour lui-même. \"Le monde entier doit connaître mon exploit\". Il coupa une bande de soie et y broda en grandes lettres dorées : \"SEPT D'UN COUP\". Il ceignit son écharpe à sa taille et, avec un morceau de vieux fromage dans sa poche et un oiseau qui s'était emmêlé dans un buisson, il partit parcourir le monde."
            },
            {
                text: "En marchant à travers les montagnes, il rencontra un Géant colossal qui bloquait le passage. Le tailleur, loin de se laisser intimider, lui montra son écharpe. Le géant, pensant qu'il faisait référence à sept hommes d'un coup, décida de tester sa force. Il prit une pierre et la pressa jusqu'à ce que des gouttes d'eau en jaillissent. \"Peux-tu faire cela ?\", rugit le géant. \"Ce n'est rien !\", répondit le tailleur. Il sortit le vieux fromage de sa poche et le pressa avec une telle force que le petit-lait en gicla."
            },
            {
                text: "Le géant fut impressionné, mais pas convaincu. Il prit une autre pierre et la lança si haut qu'on la perdit presque de vue. \"Joli tir !\", dit le tailleur. \"Mais la pierre a fini par retomber. Je vais en lancer une qui ne reviendra jamais\". Il sortit l'oiseau de sa poche et le lâcha dans les airs ; l'oiseau, heureux d'être libre, vola jusqu'à disparaître dans les nuages."
            },
            {
                text: "Le géant, bien que furieux, invita le tailleur à passer la nuit dans sa grotte avec d'autres de son espèce. À minuit, le géant frappa le lit du tailleur avec une barre de fer, croyant qu'il le tuerait. Mais le jeune homme, qui avait trouvé le lit trop grand et s'était endormi dans un coin, en sortit indemne. En le voyant apparaître vivant le matin, les géants s'enfuirent terrifiés, pensant qu'il était un être surnaturel."
            },
            {
                text: "Le tailleur arriva finalement au palais d'un grand Roi. Les soldats, en lisant son écharpe, informèrent le monarque qu'un guerrier invincible était arrivé. Le Roi, craintif mais rusé, lui offrit la main de sa fille et la moitié de son royaume s'il était capable d'accomplir trois tâches impossibles."
            },
            {
                text: "La première était de vaincre deux géants qui terrorisaient la forêt. Le petit tailleur ne les affronta pas avec une épée ; il attendit qu'ils dorment sous un arbre et, grimpé dans les branches, commença à leur lancer de lourdes pierres. Les géants se réveillèrent en s'accusant mutuellement des coups, jusqu'à ce qu'ils s'engagent dans une lutte si féroce que tous deux tombèrent morts."
            },
            {
                text: "La seconde tâche consistait à capturer une licorne qui détruisait les récoltes. Le tailleur se tint devant un arbre et attendit que la bête charge sur lui. À la dernière seconde, le jeune homme sauta de côté et la corne de la licorne resta profondément plantée dans le tronc."
            },
            {
                text: "La troisième épreuve fut de chasser un sanglier sauvage. Le tailleur attira l'animal vers une petite chapelle dans la forêt ; il entra en sautant par une fenêtre et, quand le sanglier entra après lui, le jeune homme sauta de nouveau dehors et ferma la porte à clé."
            },
            {
                text: "Le Roi, sans plus d'excuses, dut tenir sa promesse. Le vaillant petit tailleur, qui armé seulement d'une aiguille, d'un fil et de beaucoup d'intelligence avait vaincu des monstres et des rois, épousa la princesse. Et les chroniques racontent qu'il gouverna avec justice, car il savait mieux que quiconque que pour vaincre les difficultés de la vie, parfois un bon esprit coupe mieux que l'épée la plus tranchante."
            }
        ],
        contentDe: [
            {
                text: "In einer kleinen Stadt mit Fachwerkhäusern lebte ein junger Schneider, der mit großer Hingabe in seiner Werkstatt arbeitete. Eines Mittags, als er sich eine Scheibe Brot mit Marmelade zubereitete, begannen einige Fliegen über seinem Essen zu schwirren. Verärgert nahm der Schneider ein Stück Stoff und schlug fest auf den Tisch. Als er das Tuch hob, zählte er mit Erstaunen, dass er sieben auf einen Streich getötet hatte."
            },
            {
                text: "\"Wie tapfer ich bin!\", rief er zu sich selbst. \"Die ganze Welt muss von meiner Tat erfahren.\" Er schnitt ein Band aus Seide und stickte in großen goldenen Buchstaben darauf: \"SIEBEN AUF EINEN STREICH\". Er band sich die Schärpe um die Taille und zog mit einem Stück altem Käse in der Tasche und einem Vogel, der sich in einem Gebüsch verfangen hatte, hinaus in die Welt."
            },
            {
                text: "Als er durch die Berge wanderte, traf er einen riesigen Riesen, der den Weg versperrte. Der Schneider, keineswegs eingeschüchtert, zeigte ihm seine Schärpe. Der Riese, der dachte, er meine sieben Männer auf einen Streich, beschloss, seine Kraft zu prüfen. Er nahm einen Stein und drückte ihn, bis Wassertropfen daraus hervorquollen. \"Kannst du das auch?\", brüllte der Riese. \"Das ist gar nichts!\", antwortete der Schneider. Er nahm den alten Käse aus seiner Tasche und drückte ihn so fest, dass die Molke herausspritzte."
            },
            {
                text: "Der Riese war beeindruckt, aber nicht überzeugt. Er nahm einen anderen Stein und warf ihn so hoch, dass er fast außer Sichtweite geriet. \"Guter Wurf!\", sagte der Schneider. \"Aber der Stein fiel schließlich herunter. Ich werde einen werfen, der niemals zurückkehren wird.\" Er nahm den Vogel aus seiner Tasche und ließ ihn in die Luft; der Vogel, glücklich über seine Freiheit, flog davon, bis er in den Wolken verschwand."
            },
            {
                text: "Der Riese, obwohl wütend, lud den Schneider ein, die Nacht in seiner Höhle mit anderen seiner Art zu verbringen. Um Mitternacht schlug der Riese mit einer Eisenstange auf das Bett des Schneiders, im Glauben, er würde ihn töten. Aber der junge Mann, der das Bett zu groß gefunden und in einer Ecke geschlafen hatte, kam unverletzt davon. Als sie ihn am Morgen lebendig erscheinen sahen, flohen die Riesen entsetzt, da sie dachten, er sei ein übernatürliches Wesen."
            },
            {
                text: "Der Schneider kam schließlich zum Palast eines großen Königs. Die Soldaten, die seine Schärpe lasen, informierten den Monarchen, dass ein unbesiegbarer Krieger angekommen sei. Der König, ängstlich aber listig, bot ihm die Hand seiner Tochter und die Hälfte seines Königreichs an, wenn er drei unmögliche Aufgaben erfüllen könne."
            },
            {
                text: "Die erste war, zwei Riesen zu besiegen, die den Wald terrorisierten. Das tapfere Schneiderlein stellte sich ihnen nicht mit dem Schwert; er wartete, bis sie unter einem Baum schliefen, und begann, von den Ästen aus schwere Steine auf sie zu werfen. Die Riesen wachten auf und beschuldigten sich gegenseitig der Schläge, bis sie in einen so heftigen Kampf gerieten, dass beide tot umfielen."
            },
            {
                text: "Die zweite Aufgabe bestand darin, ein Einhorn zu fangen, das die Ernten zerstörte. Der Schneider stellte sich vor einen Baum und wartete, bis das Tier auf ihn zustürmte. In der letzten Sekunde sprang der junge Mann zur Seite und das Horn des Einhorns blieb tief im Stamm stecken."
            },
            {
                text: "Die dritte Prüfung war, einen Wildschwein zu jagen. Der Schneider lockte das Tier zu einer kleinen Kapelle im Wald; er sprang durch ein Fenster hinein, und als das Wildschwein ihm folgte, sprang der junge Mann wieder hinaus und schloss die Tür ab."
            },
            {
                text: "Der König musste ohne weitere Ausreden sein Versprechen halten. Das tapfere Schneiderlein, das nur mit einer Nadel, einem Faden und viel Intelligenz Monster und Könige besiegt hatte, heiratete die Prinzessin. Und die Chroniken erzählen, dass er mit Gerechtigkeit regierte, denn er wusste besser als jeder andere, dass ein guter Verstand manchmal schärfer schneidet als das schärfste Schwert, um die Schwierigkeiten des Lebens zu überwinden."
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
        rating: 4.6,
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
        rating: 4.9,
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
    },
    {
        id: 'tres-cerditos',
        title: 'Los Tres Cerditos',
        author: 'Joseph Jacobs',
        description: 'La historia de tres hermanos que aprenden que el esfuerzo y la previsión son la mejor defensa contra las dificultades de la vida.',
        level: 'Fácil',
        age: '3+',
        coverImage: '/images/storyteller/tres-cerditos-cover.png',
        chipImage: '/images/storyteller/character-tres-cerditos.png',
        genre: 'Fábula',
        themeColor: 'from-pink-400 to-rose-600',
        rating: 4.7,
        content: [
            { text: "Había una vez tres cerditos que eran hermanos. Vivían una vida alegre, pero siempre estaban alerta por si aparecía el lobo feroz. Un buen día, decidieron que cada uno construiría su propia casa para protegerse del peligro. El más pequeño, que era muy perezoso, pensó que lo mejor sería terminar pronto para irse a jugar. 'Construiré mi casa de paja', dijo. 'Es muy fácil y terminaré en un abrir y cerrar de ojos'." },
            { text: "El segundo cerdito, que era un poco menos perezoso que su hermano, decidió que la madera sería un material adecuado. 'Mi casa será de palitos', exclamó. 'Es más resistente que la paja, pero no me llevará tanto tiempo construirla como si usara ladrillos'. En un par de días, la casa estuvo lista y el cerdito se fue silbando a buscar a sus hermanos para jugar al escondite." },
            { text: "El tercer cerdito, el mayor de todos, era el más trabajador y previsor. 'Yo construiré mi casa con ladrillos y cemento', pensó con seriedad. 'Aunque sea difícil y me tome mucho tiempo, estaré seguro y no tendré miedo de ningún lobo, por muy fuerte que sople'. Mientras sus hermanos jugaban y se divertían, él seguía poniendo ladrillo tras ladrillo, trabajando de sol a sol hasta que terminó su sólida fortaleza." },
            { text: "No pasó mucho tiempo antes de que el lobo feroz apareciera en el bosque. Tenía mucha hambre y sus ojos brillaban al ver a los cerditos. Primero llegó a la casa de paja del hermano menor. '¡Cerdito, cerdito, déjame entrar!', rugió el lobo. '¡Ni hablar!', respondió el pequeño temblando. '¡Pues soplaré y soplaré y tu casa derribaré!', exclamó el lobo. Tomó aire y, con un soplo aterrador, la paja voló por los aires." },
            { text: "El cerdito menor corrió con todas sus fuerzas hacia la casa de madera de su hermano. '¡Ábreme, ábreme!', gritó desesperado. Apenas cerraron la puerta, el lobo llegó y volvió a gritar: '¡Cerditos, cerditos, dejadme entrar!'. '¡Jamás!', gritaron los dos a coro. '¡Pues soplaré y soplaré y vuestra casa derribaré!'. El lobo sopló con todavía más fuerza que antes, y los palitos crujieron y salieron volando, dejando a los cerditos sin refugio." },
            { text: "Aterrorizados, los dos hermanos corrieron hacia la casa de ladrillos del cerdito mayor. '¡Rápido, entrad!', gritó el hermano mayor mientras aseguraba la puerta con un cerrojo de hierro. El lobo llegó, furioso por haber fallado dos veces. '¡Cerditos, cerditos, dejadme entrar!'. '¡Nunca, vete de aquí!', respondieron desde dentro. El lobo, riendo con malicia, se preparó para su mayor esfuerzo." },
            { text: "El lobo sopló y sopló hasta que se puso rojo como un tomate. Volvió a soplar con todas sus energías, pero la casa de ladrillos ni siquiera vibró. Los ladrillos estaban tan bien puestos que eran imposibles de mover. Agotado y hambriento, el lobo miró hacia arriba y vio la chimenea. '¡Ajá!', exclamó. 'Si no puedo entrar por la puerta, entraré por el tejado'. Con gran agilidad, comenzó a trepar por las paredes." },
            { text: "Pero los cerditos eran muy astutos. El hermano mayor, al oír las garras del lobo en el tejado, puso una gran olla llena de agua a calentar en la chimenea. Cuando el lobo se deslizó por el conducto, cayó directamente en el agua hirviendo. '¡Ay, ay, ay!', gritó el lobo con un salto que lo llevó de vuelta por la chimenea y fuera de la casa. Corriendo y aullando de dolor, el lobo desapareció en el bosque y nunca más se atrevió a molestar a los tres cerditos." },
            { text: "Los dos hermanos perezosos aprendieron una gran lección aquel día. Comprendieron que el trabajo duro y el esfuerzo tienen su recompensa y que no se debe escatimar en seguridad cuando se trata de proteger a la familia. Con la ayuda de su hermano mayor, reconstruyeron sus casas con ladrillos y vivieron los tres felices y seguros por el resto de sus días, siempre recordando que la unión y la previsión son mejores que cualquier soplido." }
        ],
        contentEn: [
            { text: "Once upon a time there were three little pigs who were brothers. They lived a happy life, but they were always alert in case the big bad wolf appeared. One fine day, they decided that each would build his own house to protect himself from danger. The youngest, who was very lazy, thought it would be best to finish quickly so he could go play. 'I'll build my house of straw,' he said. 'It's very easy and I'll finish in the blink of an eye'." },
            { text: "The second little pig, who was a little less lazy than his brother, decided that wood would be a suitable material. 'My house will be made of sticks,' he exclaimed. 'It's more resistant than straw, but it won't take me as long to build it as if I used bricks'. In a couple of days, the house was ready and the little pig went off whistling to find his brothers to play hide and seek." },
            { text: "The third little pig, the eldest of all, was the most hardworking and far-sighted. 'I will build my house with bricks and cement,' he thought seriously. 'Even if it's difficult and takes me a long time, I'll be safe and I won't be afraid of any wolf, no matter how hard he blows'. While his brothers played and had fun, he continued to lay brick after brick, working from sunrise to sunset until he finished his solid fortress." },
            { text: "It didn't take long before the big bad wolf appeared in the forest. He was very hungry and his eyes sparkled when he saw the little pigs. First he arrived at the youngest brother's straw house. 'Little pig, little pig, let me in!', roared the wolf. 'No way!', replied the little one trembling. 'Then I'll huff and I'll puff and I'll blow your house down!', exclaimed the wolf. He took a breath and, with a terrifying puff, the straw flew through the air." },
            { text: "The youngest little pig ran with all his might towards his brother's wooden house. 'Open up, open up!', he shouted desperately. As soon as they closed the door, the wolf arrived and shouted again: 'Little pigs, little pigs, let me in!'. 'Never!', they both shouted in chorus. 'Then I'll huff and I'll puff and I'll blow your house down!'. The wolf puffed even harder than before, and the sticks creaked and flew away, leaving the little pigs without shelter." },
            { text: "Terrified, the two brothers ran towards the eldest little pig's brick house. 'Quick, come in!', the elder brother shouted as he secured the door with an iron bolt. The wolf arrived, furious at having failed twice. 'Little pigs, little pigs, let me in!'. 'Never, go away!', they replied from inside. The wolf, laughing maliciously, prepared for his greatest effort." },
            { text: "The wolf huffed and puffed until he turned as red as a tomato. He puffed again with all his energy, but the brick house didn't even vibrate. The bricks were so well laid that they were impossible to move. Exhausted and hungry, the wolf looked up and saw the chimney. 'Aha!', he exclaimed. 'If I can't enter through the door, I'll enter through the roof'. With great agility, he began to climb the walls." },
            { text: "But the little pigs were very cunning. The older brother, hearing the wolf's claws on the roof, put a large pot full of water to heat in the fireplace. When the wolf slid down the flue, he fell directly into the boiling water. 'Ow, ow, ow!', the wolf shouted with a jump that took him back up the chimney and out of the house. Running and howling in pain, the wolf disappeared into the forest and never dared to bother the three little pigs again." },
            { text: "The two lazy brothers learned a great lesson that day. They understood that hard work and effort have their reward and that one should not skimp on safety when it comes to protecting the family. With the help of their older brother, they rebuilt their houses with bricks and the three lived fortunately and safely for the rest of their days, always remembering that unity and foresight are better than any puff." }
        ],
        contentFr: [
            { text: "Il était une fois trois petits cochons qui étaient frères. Ils menaient une vie joyeuse, mais ils restaient toujours vigilants au cas où le grand méchant loup apparaîtrait. Un beau jour, ils décidèrent que chacun construirait sa propre maison pour se protéger du danger. Le plus jeune, qui était très paresseux, pensa que le mieux serait de finir vite pour aller jouer. 'Je construirai ma maison en paille', dit-il. 'C'est très facile et je finirai en un clin d'œil'." },
            { text: "Le deuxième petit cochon, qui était un peu moins paresseux que son frère, décida que le bois serait un matériau approprié. 'Ma maison sera faite de bâtons', s'exclama-t-il. 'C'est plus résistant que la paille, mais cela ne me prendra pas aussi longtemps à construire que si j'utilisais des briques'. En quelques jours, la maison fut prête et le petit cochon s'en alla en sifflant chercher ses frères pour jouer à cache-cache." },
            { text: "Le troisième petit cochon, l'aîné de tous, était le plus travailleur et prévoyant. 'Je construirai ma maison avec des briques et du ciment', pensa-t-il sérieusement. 'Même si c'est difficile et que cela me prend beaucoup de temps, je serai en sécurité et je n'aurai peur d'aucun loup, peu importe la force de son souffle'. Pendant que ses frères jouaient et s'amusaient, il continuait à poser brique après brique, travaillant du matin au soir jusqu'à ce qu'il finisse sa solide forteresse." },
            { text: "Il ne fallut pas longtemps avant que le grand méchant loup n'apparaisse dans la forêt. Il avait très faim et ses yeux brillaient en voyant les petits cochons. Il arriva d'abord à la maison de paille du frère cadet. 'Petit cochon, petit cochon, laisse-moi entrer !', rugit le loup. 'Pas question !', répondit le petit en tremblant. 'Alors je soufflerai et je soufflerai et ta maison s'envolera !', s'exclama le loup. Il prit son souffle et, d'un souffle terrifiant, la paille s'envola dans les airs." },
            { text: "Le plus jeune petit cochon courut de toutes ses forces vers la maison en bois de son frère. 'Ouvre, ouvre !', cria-t-il désespérément. À peine eurent-ils fermé la porte que le loup arriva et cria de nouveau : 'Petits cochons, petits cochons, laissez-moi entrer !'. 'Jamais !', crièrent les deux en chœur. 'Alors je soufflerai et je soufflerai et votre maison s'envolera !'. Le loup souffla encore plus fort qu'avant, et les bâtons craquèrent et s'envolèrent, laissant les petits cochons sans abri." },
            { text: "Terrifiés, les deux frères coururent vers la maison en briques du frère aîné. 'Vite, entrez !', cria le frère aîné tout en assurant la porte avec un verrou en fer. Le loup arriva, furieux d'avoir échoué deux fois. 'Petits cochons, petits cochons, laissez-moi entrer !'. 'Jamais, va-t-en !', répondirent-ils de l'intérieur. Le loup, riant avec malice, se prépara pour son plus grand effort." },
            { text: "Le loup souffla et souffla jusqu'à ce qu'il devienne rouge comme une tomate. Il souffla de nouveau avec toute son énergie, mais la maison en briques ne vibra même pas. Les briques étaient si bien posées qu'elles étaient impossibles à déplacer. Épuisé et affamé, le loup regarda vers le haut et vit la cheminée. 'Aha !', s'exclama-t-il. 'Si je ne peux pas entrer par la porte, j'entrerai par le toit'. Avec une grande agilité, il commença à grimper sur les murs." },
            { text: "Mais les petits cochons étaient très rusés. Le frère aîné, entendant les griffes du loup sur le toit, mit une grande marmite pleine d'eau à chauffer dans la cheminée. Quand le loup glissa dans le conduit, il tomba directement dans l'eau bouillante. 'Aïe, aïe, aïe !', cria le loup avec un saut qui le ramena par la cheminée et hors de la maison. Courant et hurlant de douleur, le loup disparut dans la forêt et n'osa plus jamais déranger les trois petits cochons." },
            { text: "Les deux frères paresseux apprirent une grande leçon ce jour-là. Ils comprirent que le travail acharné et l'effort ont leur récompense et qu'il ne faut pas lésiner sur la sécurité lorsqu'il s'agit de protéger sa famille. Avec l'aide de leur frère aîné, ils reconstruirent leurs maisons en briques et vécurent tous les trois heureux et en sécurité pour le reste de leurs jours, se rappelant toujours que l'union et la prévoyance sont meilleures que n'importe quel souffle." }
        ],
        contentDe: [
            { text: "Es waren einmal drei kleine Schweinchen, die Brüder waren. Sie führten ein fröhliches Leben, aber sie waren immer wachsam, falls der böse Wolf auftauchen sollte. Eines schönen Tages beschlossen sie, dass jeder sein eigenes Haus bauen würde, um sich vor der Gefahr zu schützen. Das jüngste, das sehr faul war, dachte, es wäre am besten, schnell fertig zu werden, um spielen zu gehen. 'Ich baue mein Haus aus Stroh', sagte es. 'Es ist sehr einfach und ich werde im Handumdrehen fertig sein'." },
            { text: "Das zweite Schweinchen, das etwas weniger faul als sein Bruder war, entschied, dass Holz ein geeignetes Material wäre. 'Mein Haus wird aus Stöcken sein', rief es aus. 'Es ist widerstandsfähiger als Stroh, aber es wird mich nicht so viel Zeit kosten, es zu bauen, wie wenn ich Ziegel verwenden würde'. In ein paar Tagen war das Haus fertig und das Schweinchen ging pfeifend auf die Suche nach seinen Brüdern, um Verstecken zu spielen." },
            { text: "Das dritte Schweinchen, der älteste von allen, war der fleißigste und vorausschauendste. 'Ich werde mein Haus aus Ziegeln und Zement bauen', dachte es ernsthaft. 'Auch wenn es schwierig ist und mich viel Zeit kostet, werde ich sicher sein und keine Angst vor irgendeinem Wolf haben, egal wie stark er pustet'. Während seine Brüder spielten und Spaß hatten, legte er weiter Ziegel auf Ziegel und arbeitete von Sonnenaufgang bis Sonnenuntergang, bis er seine solide Festung fertiggestellt hatte." },
            { text: "Es dauerte nicht lange, bis der böse Wolf im Wald auftauchte. Er war sehr hungrig und seine Augen funkelten, als er die Schweinchen sah. Zuerst kam er zum Strohhaus des jüngsten Bruders. 'Schweinchen, Schweinchen, lass mich herein!', brüllte der Wolf. 'Kommt nicht in Frage!', antwortete das kleine zitternd. 'Dann werde ich pusten und ich werde prusten und dein Haus umwerfen!', rief der Wolf. Er holte tief Luft und mit einem schrecklichen Pusten flog das Stroh in die Luft." },
            { text: "Das jüngste Schweinchen rannte mit all seiner Kraft zum Holzhaus seines Bruders. 'Mach auf, mach auf!', schrie es verzweifelt. Kaum hatten sie die Tür geschlossen, kam der Wolf an und rief erneut: 'Schweinchen, Schweinchen, lasst mich herein!'. 'Niemals!', riefen beide im Chor. 'Dann werde ich pusten und ich werde prusten und euer Haus umwerfen!'. Der Wolf pustete noch stärker als zuvor, und die Stöcke krachten und flogen davon, sodass die Schweinchen ohne Schutz dastanden." },
            { text: "Erschrocken rannten die beiden Brüder zum Ziegelhaus des ältesten Schweinchens. 'Schnell, kommt herein!', schrie der ältere Bruder, während er die Tür mit einem Eisenriegel sicherte. Der Wolf kam an, wütend, weil er zweimal versagt hatte. 'Schweinchen, Schweinchen, lasst mich herein!'. 'Niemals, verschwinde von hier!', antworteten sie von innen. Der Wolf lachte boshaft und bereitete sich auf seine größte Anstrengung vor." },
            { text: "Der Wolf pustete und prustete, bis er rot wie eine Tomate wurde. Er pustete erneut mit all seiner Energie, aber das Ziegelhaus vibrierte nicht einmal. Die Ziegel waren so gut gesetzt, dass sie unmöglich zu bewegen waren. Erschöpft und hungrig blickte der Wolf nach oben und sah den Schornstein. 'Aha!', rief er aus. 'Wenn ich nicht durch die Tür hineinkomme, werde ich durch das Dach hineinkommen'. Mit großer Geschicklichkeit begann er, die Wände hochzuklettern." },
            { text: "Aber die Schweinchen waren sehr listig. Der ältere Bruder, der die Krallen des Wolfes auf dem Dach hörte, stellte einen großen Topf voll Wasser zum Erhitzen in den Kamin. Als der Wolf den Schornstein hinunterrutschte, fiel er direkt in das kochende Wasser. 'Au, au, au!', schrie der Wolf mit einem Sprung, der ihn zurück durch den Schornstein und aus dem Haus brachte. Schreiend und vor Schmerz heulend verschwand der Wolf im Wald und wagte es nie wieder, die drei Schweinchen zu belästigen." },
            { text: "Die beiden faulen Brüder lernten an jenem Tag eine große Lektion. Sie begriffen, dass harte Arbeit und Anstrengung ihre Belohnung haben und dass man nicht an der Sicherheit sparen sollte, wenn es darum geht, die Familie zu schützen. Mit der Hilfe ihres älteren Bruders bauten sie ihre Häuser mit Ziegeln wieder auf und die drei lebten glücklich und sicher für den Rest ihrer Tage, immer daran denkend, dass Einigkeit und Voraussicht besser sind als jedes Pusten." }
        ]
    },
    {
        id: 'lobo-cabritos',
        title: 'El Lobo y los Siete Cabritos',
        author: 'Hermanos Grimm',
        description: 'Un cuento clásico sobre la precaución, el engaño y el valor de una madre para proteger a sus hijos.',
        level: 'Medio',
        age: '4+',
        coverImage: '/images/storyteller/lobo-cabritos-cover.png',
        chipImage: '/images/storyteller/character-lobo-cabritos.png',
        genre: 'Cuento de hadas',
        themeColor: 'from-slate-500 to-gray-700',
        rating: 4.6,
        content: [
            { text: "Había una vez una vieja cabra que tenía siete cabritos, a los que amaba tanto como una madre puede amar a sus hijos. Un día decidió ir al bosque en busca de comida, así que llamó a sus pequeños y les dijo: 'Queridos hijos, voy al bosque. Tened mucho cuidado con el lobo; si entra en casa, os devorará a todos. Al malvado se le reconoce enseguida por su voz ronca y sus patas negras'." },
            { text: "Los cabritos respondieron: 'Querida madre, tendremos mucho cuidado, puedes irte tranquila'. Poco después, alguien llamó a la puerta y gritó: '¡Abrid, queridos hijos, vuestra madre ha vuelto y os trae algo a cada uno!'. Pero los cabritos, al oír una voz tan ronca, supieron que era el lobo. 'No te abriremos', exclamaron, 'tú no eres nuestra madre; ella tiene una voz dulce y fina, y la tuya es ronca. ¡Tú eres el lobo!'" },
            { text: "Entonces el lobo fue a una tienda, compró un gran trozo de tiza y se lo comió para suavizar su voz. Volvió de nuevo a la puerta y gritó con voz fina: '¡Abrid, queridos hijos, vuestra madre ha vuelto!'. Pero el lobo había puesto su pata negra sobre el alféizar de la ventana. Los cabritos la vieron y gritaron: 'No te abriremos, nuestra madre no tiene las patas negras como tú. ¡Tú eres el lobo!'" },
            { text: "El lobo corrió hacia un panadero y le pidió que le untara la pata con masa, y luego fue al molinero para que le echara harina blanca por encima. '¡Ahora sí que me creerán!', pensó el malvado. Por tercera vez llamó a la puerta: '¡Abrid, hijos míos, vuestra madre ha regresado!'. Los cabritos pidieron ver la pata antes de abrir. Cuando vieron que era blanca como la nieve y oyeron la voz fina, creyeron que de verdad era su madre y abrieron la puerta." },
            { text: "¡Pero quién entró fue el lobo! Los cabritos, aterrorizados, intentaron esconderse: uno debajo de la mesa, el segundo en la cama, el tercero en la estufa, el cuarto en la cocina, el quinto en el armario, el sexto bajo el lavabo y el séptimo en la caja del gran reloj de pared. Pero el lobo los encontró a todos y, uno tras otro, se los tragó sin masticar. Solo el más pequeño, que estaba en el reloj, logró escapar a su vista." },
            { text: "Cuando el lobo estuvo saciado, se fue al prado, se tumbó bajo un árbol y se quedó profundamente dormido. Poco después, la vieja cabra regresó del bosque. ¡Qué espectáculo tan triste encontró! La puerta estaba abierta de par en par, las sillas y mesas volcadas, y el lavabo roto. Buscó a sus hijos, pero no aparecían por ninguna parte. Desesperada, empezó a llamarlos por su nombre uno a uno, pero nadie respondía." },
            { text: "Finalmente, cuando nombró al más pequeño, una vocecita respondió: '¡Querida madre, estoy aquí, en la caja del reloj!'. La madre lo sacó y el cabrito le contó, entre sollozos, que el lobo había venido y se había comido a todos sus hermanos. La pobre cabra salió llorando de la casa con su hijo menor, y al llegar al prado, vio al lobo durmiendo tan profundamente que hasta las ramas del árbol vibraban con sus ronquidos." },
            { text: "Al observar al monstruo, la madre cabra notó que algo se movía y saltaba dentro de su panza. '¡Cielo santo!', pensó. '¿Será posible que mis hijos sigan vivos?'. Mandó al pequeño a casa por unas tijeras, aguja e hilo. Con mucho cuidado, abrió la barriga del lobo y, uno tras otro, los seis cabritos saltaron fuera, sanos y salvos, pues el glotón se los había tragado enteros en su prisa." },
            { text: "¡Qué alegría sintieron todos! Pero la madre cabra les dijo: 'Id rápido y buscad piedras grandes mientras este monstruo sigue durmiendo'. Entre todos llenaron la panza del lobo con pesadas piedras de río y la madre cosió la piel con tanta habilidad que el lobo ni siquiera se dio cuenta. Cuando el malvado despertó, tenía mucha sed por las piedras y decidió ir al pozo a beber agua." },
            { text: "Al empezar a caminar, las piedras chocaban entre sí en su interior. '¿Qué es lo que suena en mi barriga?', gruñó el lobo. 'Parecen seis cabritos, pero son piedras de gran fatiga'. Cuando llegó al borde del pozo y se inclinó para beber, el peso de las piedras lo arrastró hacia el fondo y se ahogó. Los siete cabritos y su madre, que lo estaban vigilando, corrieron hacia el pozo gritando con júbilo: '¡El lobo ha muerto, el lobo ha muerto!', y bailaron de alegría alrededor del pozo." }
        ],
        contentEn: [
            { text: "Once upon a time there was an old goat who had seven little kids, whom she loved as much as a mother can love her children. One day she decided to go to the forest in search of food, so she called her little ones and told them: 'Dear children, I am going to the forest. Be very careful with the wolf; if he enters the house, he will devour you all. The wicked one is immediately recognized by his hoarse voice and his black paws'." },
            { text: "The kids replied: 'Dear mother, we will be very careful, you can go in peace'. Shortly after, someone knocked on the door and shouted: 'Open up, dear children, your mother has returned and brings something for each of you!'. But the kids, hearing such a hoarse voice, knew it was the wolf. 'We won't open for you', they exclaimed, 'you are not our mother; she has a sweet and fine voice, and yours is hoarse. You are the wolf!'" },
            { text: "Then the wolf went to a store, bought a large piece of chalk and ate it to soften his voice. He went back to the door and shouted with a fine voice: 'Open up, dear children, your mother has returned!'. But the wolf had placed his black paw on the windowsill. The kids saw it and shouted: 'We won't open for you, our mother doesn't have black paws like you. You are the wolf!'" },
            { text: "The wolf ran to a baker and asked him to rub dough on his paw, and then he went to the miller to have white flour sprinkled over it. 'Now they will surely believe me!', the wicked one thought. For the third time he knocked on the door: 'Open up, my children, your mother has returned!'. The kids asked to see the paw before opening. When they saw it was white as snow and heard the fine voice, they believed it really was their mother and opened the door." },
            { text: "But who entered was the wolf! The kids, terrified, tried to hide: one under the table, the second in the bed, the third in the stove, the fourth in the kitchen, the fifth in the closet, the sixth under the sink and the seventh in the case of the large wall clock. But the wolf found them all and, one after another, swallowed them without chewing. Only the smallest one, who was in the clock, managed to escape his sight." },
            { text: "When the wolf was full, he went to the meadow, lay under a tree and fell into a deep sleep. Shortly after, the old goat returned from the forest. What a sad sight she found! The door was wide open, the chairs and tables overturned, and the sink broken. She looked for her children, but they appeared nowhere. Desperate, she began to call them by name one by one, but no one answered." },
            { text: "Finally, when she named the smallest one, a tiny voice answered: 'Dear mother, I am here, in the clock case!'. The mother took him out and the kid told her, between sobs, that the wolf had come and eaten all his brothers. The poor goat left the house crying with her youngest son, and when she reached the meadow, she saw the wolf sleeping so deeply that even the tree branches vibrated with his snoring." },
            { text: "Observing the monster, the mother goat noticed that something was moving and jumping inside his belly. 'Good heavens!', she thought. 'Could it be possible that my children are still alive?'. She sent the little one home for scissors, needle and thread. With great care, she opened the wolf's belly and, one after another, the six kids jumped out, safe and sound, for the glutton had swallowed them whole in his haste." },
            { text: "How much joy they all felt! But the mother goat told them: 'Go quickly and look for large stones while this monster keeps sleeping'. Together they filled the wolf's belly with heavy river stones and the mother sewed the skin with such skill that the wolf didn't even notice. When the villain woke up, he was very thirsty because of the stones and decided to go to the well to drink water." },
            { text: "As he began to walk, the stones hit each other inside him. 'What is that sounding in my belly?', the wolf growled. 'They look like six kids, but they are stones of great fatigue'. When he reached the edge of the well and leaned over to drink, the weight of the stones dragged him to the bottom and he drowned. The seven kids and their mother, who were watching him, ran towards the well shouting with joy: 'The wolf is dead, the wolf is dead!', and danced with joy around the well." }
        ],
        contentFr: [
            { text: "Il était une fois une vieille chèvre qui avait sept chevreaux, qu'elle aimait autant qu'une mère peut aimer ses enfants. Un jour, elle décida d'aller dans la forêt chercher de la nourriture, alors elle appela ses petits et leur dit : 'Mes chers enfants, je vais dans la forêt. Faites très attention au loup ; s'il entre dans la maison, il vous dévorera tous. On reconnaît tout de suite le méchant à sa voix rauque et à ses pattes noires'." },
            { text: "Les chevreaux répondirent : 'Chère mère, nous ferons très attention, tu peux partir tranquille'. Peu après, quelqu'un frappa à la porte et cria : 'Ouvrez, chers enfants, votre mère est de retour et vous apporte quelque chose à chacun !'. Mais les chevreaux, en entendant une voix si rauque, surent que c'était le loup. 'Nous ne t'ouvrirons pas', s'exclamèrent-ils, 'tu n'es pas notre mère ; elle a une voix douce et fine, et la tienne est rauque. Tu es le loup !'" },
            { text: "Alors le loup alla dans un magasin, acheta un gros morceau de craie et le mangea pour adoucir sa voix. Il revint à la porte et cria d'une voix fine : 'Ouvrez, chers enfants, votre mère est de retour !'. Mais le loup avait posé sa patte noire sur le rebord de la fenêtre. Les chevreaux la virent et crièrent : 'Nous ne t'ouvrirons pas, notre mère n'a pas les pattes noires comme toi. Tu es le loup !'" },
            { text: "Le loup courut chez un boulanger et lui demanda de lui frotter la patte avec de la pâte, puis il alla chez le meunier pour qu'il y répande de la farine blanche. 'Maintenant, ils me croiront sûrement !', pensa le méchant. Pour la troisième fois, il frappa à la porte : 'Ouvrez, mes enfants, votre mère est de retour !'. Les chevreaux demandèrent à voir la patte avant d'ouvrir. Quand ils virent qu'elle était blanche comme la neige et entendirent la voix fine, ils crurent que c'était vraiment leur mère et ouvrirent la porte." },
            { text: "Mais celui qui entra était le loup ! Les chevreaux, terrifiés, essayèrent de se cacher : l'un sous la table, le second dans le lit, le troisième dans le poêle, le quatrième dans la cuisine, le cinquième dans l'armoire, le sixième sous le lavabo et le septième dans la caisse de la grande horloge murale. Mais le loup les trouva tous et, l'un après l'autre, les engloutit sans mâcher. Seul le plus petit, qui était dans l'horloge, réussit à échapper à sa vue." },
            { text: "Quand le loup fut rassasié, il alla dans le pré, s'allongea sous un arbre et s'endormit profondément. Peu après, la vieille chèvre revint de la forêt. Quel triste spectacle elle trouva ! La porte était grande ouverte, les chaises et les tables renversées, et le lavabo cassé. Elle chercha ses enfants, mais ils n'apparaissaient nulle part. Désespérée, elle commença à les appeler par leur nom l'un après l'autre, mais personne ne répondait." },
            { text: "Enfin, quand elle nomma le plus petit, une petite voix répondit : 'Chère mère, je suis ici, dans la caisse de l'horloge !'. La mère le sortit et le chevreau lui raconta, entre deux sanglots, que le loup était venu et avait mangé tous ses frères. La pauvre chèvre sortit en pleurant de la maison avec son fils cadet, et en arrivant au pré, elle vit le loup dormant si profondément que même les branches de l'arbre vibraient de ses ronflements." },
            { text: "En observant le monstre, la mère chèvre remarqua que quelque chose bougeait et sautait dans son ventre. 'Grand Dieu !', pensa-t-elle. 'Serait-il possible que mes enfants soient encore en vie ?'. Elle envoya le petit à la maison chercher des ciseaux, une aiguille et du fil. Avec beaucoup de soin, elle ouvrit le ventre du loup et, l'un après l'autre, les six chevreaux sautèrent dehors, sains et saufs, car le glouton les avait engloutis tout entiers dans sa hâte." },
            { text: "Quelle joie ils ressentirent tous ! Mais la mère chèvre leur dit : 'Allez vite chercher de grosses pierres pendant que ce monstre continue de dormir'. Ensemble, ils remplirent le ventre du loup de lourdes pierres de rivière et la mère recousit la peau avec tant d'habileté que le loup ne s'en rendit même pas compte. Quand le méchant se réveilla, il avait très soif à cause des pierres et décida d'aller au puits pour boire de l'eau." },
            { text: "En commençant à marcher, les pierres s'entrechoquaient en lui. 'Qu'est-ce qui sonne dans mon ventre ?', grogna le loup. 'On dirait six chevreaux, mais ce sont des pierres de grande fatigue'. Quand il arriva au bord du puits et se pencha pour boire, le poids des pierres l'entraîna vers le fond et il se noya. Les sept chevreaux et leur mère, qui le surveillaient, coururent vers le puits en criant de joie : 'Le loup est mort, le loup est mort !', et dansèrent de joie autour du puits." }
        ],
        contentDe: [
            { text: "Es war einmal eine alte Ziege, die sieben Geißlein hatte, die sie so sehr liebte, wie eine Mutter ihre Kinder nur lieben kann. Eines Tages beschloss sie, in den Wald zu gehen, um Futter zu suchen, also rief sie ihre Kleinen und sagte zu ihnen: 'Liebe Kinder, ich gehe in den Wald. Seid sehr vorsichtig vor dem Wolf; wenn er ins Haus kommt, wird er euch alle fressen. Den Bösewicht erkennt man sofort an seiner rauen Stimme und seinen schwarzen Pfoten'." },
            { text: "Die Geißlein antworteten: 'Liebe Mutter, wir werden sehr vorsichtig sein, du kannst beruhigt gehen'. Kurz darauf klopfte jemand an die Tür und rief: 'Macht auf, liebe Kinder, eure Mutter ist zurück und bringt jedem von euch etwas mit!'. Aber die Geißlein merkten an der rauen Stimme, dass es der Wolf war. 'Wir machen dir nicht auf', riefen sie, 'du bist nicht unsere Mutter; sie hat eine süße und feine Stimme, und deine ist rau. Du bist der Wolf!'" },
            { text: "Da ging der Wolf zu einem Krämer, kaufte ein großes Stück Kreide und aß es, um seine Stimme fein zu machen. Er kam wieder an die Tür und rief mit feiner Stimme: 'Macht auf, liebe Kinder, eure Mutter ist zurück!'. Aber der Wolf hatte seine schwarze Pfote auf das Fensterbrett gelegt. Die Geißlein sahen sie und riefen: 'Wir machen dir nicht auf, unsere Mutter hat keine schwarzen Pfoten wie du. Du bist der Wolf!'" },
            { text: "Der Wolf lief zu einem Bäcker und bat ihn, ihm die Pfote mit Teig zu bestreichen, und dann ging er zum Müller, damit dieser weißes Mehl darüber streute. 'Jetzt werden sie mir sicher glauben!', dachte der Bösewicht. Zum dritten Mal klopfte er an die Tür: 'Macht auf, meine Kinder, eure Mutter ist zurückgekehrt!'. Die Geißlein baten darum, die Pfote zu sehen, bevor sie öffneten. Als sie sahen, dass sie weiß wie Schnee war, und die feine Stimme hörten, glaubten sie, es sei wirklich ihre Mutter, und öffneten die Tür." },
            { text: "Doch wer hereinkam, war der Wolf! Die Geißlein versuchten vor Schreck, sich zu verstecken: das erste unter den Tisch, das zweite ins Bett, das dritte in den Ofen, das vierte in die Küche, das füfente in den Schrank, das sechste unter die Waschschüssel und das siebte in den Kasten der großen Wanduhr. Aber der Wolf fand sie alle und schluckte eines nach dem anderen hinunter, ohne zu kauen. Nur das kleinste, das in der Uhr war, entging seinem Blick." },
            { text: "Als der Wolf satt war, ging er auf die Wiese, legte sich unter einen Baum und fiel in einen tiefen Schlaf. Kurz darauf kehrte die alte Ziege aus dem Wald zurück. Was für ein trauriger Anblick bot sich ihr! Die Tür stand sperrangelweit offen, Stühle und Tische waren umgeworfen, und die Waschschüssel war zerbrochen. Sie suchte ihre Kinder, aber sie waren nirgends zu finden. Verzweifelt begann sie, sie nacheinander beim Namen zu rufen, aber niemand antwortete." },
            { text: "Schließlich, als sie das kleinste rief, antwortete eine winzige Stimme: 'Liebe Mutter, ich bin hier, im Uhrkasten!'. Die Mutter holte es heraus, und das Geißlein erzählte ihr schluchzend, dass der Wolf gekommen war und alle seine Geschwister gefressen hatte. Die arme Ziege verließ weinend das Haus mit ihrem jüngsten Sohn, und als sie auf die Wiese kamen, sahen sie den Wolf so tief schlafen, dass sogar die Äste des Baumes von seinem Schnarchen vibrierten." },
            { text: "Als die Mutter Ziege das Ungeheuer betrachtete, bemerkte sie, dass sich in seinem Bauch etwas bewegte und zappelte. 'Gott im Himmel!', dachte sie. 'Sollte es möglich sein, dass meine Kinder noch am Leben sind?'. Sie schickte das Kleine nach Hause, um Schere, Nadel und Faden zu holen. Mit großer Vorsicht schnitt sie dem Wolf den Bauch auf, und nacheinander sprangen die sechs Geißlein heraus, gesund und munter, denn der Vielfraß hatte sie in seiner Eile ganz hinuntergeschluckt." },
            { text: "Was für eine Freude empfanden sie alle! Aber die Mutter Ziege sagte zu ihnen: 'Geht schnell und sucht große Steine, während dieses Ungeheuer weiter schläft'. Gemeinsam füllten sie den Bauch des Wolfes mit schweren Flusssteinen, und die Mutter nähte die Haut so geschickt zu, dass der Wolf nicht einmal etwas merkte. Als der Bösewicht aufwachte, hatte er wegen der Steine großen Durst und beschloss, zum Brunnen zu gehen, um Wasser zu trinken." },
            { text: "Als er anfing zu gehen, stießen die Steine in seinem Inneren aneinander. 'Was rumpelt und pumpelt in meinem Bauch?', knurrte der Wolf. 'Ich meinte, es wären sechs Geißlein, doch sind's lauter Wackersteine'. Als er an den Rand des Brunnens kam und sich zum Trinken bückte, zog ihn das Gewicht der Steine auf den Grund, und er ertrank. Die sieben Geißlein und ihre Mutter, die ihn beobachtet hatten, liefen zum Brunnen und riefen voller Jubel: 'Der Wolf ist tot, der Wolf ist tot!', und tanzten vor Freude um den Brunnen herum." }
        ]
    },
    {
        id: 'alicia-pais-maravillas',
        title: 'Alicia en el País de las Maravillas',
        author: 'Lewis Carroll',
        description: 'El viaje fantástico de Alicia a través de un mundo de absurdos, criaturas extrañas y acertijos sin sentido.',
        level: 'Difícil',
        age: '8+',
        coverImage: '/images/storyteller/alicia-cover.png',
        chipImage: '/images/storyteller/character-alicia.png',
        genre: 'Fantasía',
        themeColor: 'from-blue-400 to-indigo-600',
        rating: 4.9,
        content: [
            { text: "Todo comenzó una tarde calurosa de verano. Alicia estaba sentada en la orilla del río junto a su hermana, aburrida por un libro sin dibujos ni diálogos. De pronto, un Conejo Blanco con ojos rosados pasó corriendo a su lado. Lo que más llamó su atención no fue que el conejo hablara, sino que sacara un reloj de bolsillo de su chaleco y exclamara: '¡Cielo santo! ¡Llego tarde!'. Llena de curiosidad, Alicia lo siguió hasta una gran madriguera bajo el seto." },
            { text: "Sin pensarlo dos veces, Alicia saltó tras él. La madriguera parecía un túnel interminable que caía hacia el centro de la tierra. Mientras descendía lentamente, vio estanterías llenas de tarros de mermelada y mapas. Finalmente, aterrizó con un suave golpe sobre un montón de hojas secas. Frente a ella se abría un largo pasillo por donde el conejo desaparecía doblando una esquina, dejando tras de sí solo el eco de sus pasos." },
            { text: "Llegó a una sala con muchas puertas cerradas. En una mesa de cristal encontró una llave de oro que abría una puertecita de apenas treinta centímetros. Tras ella se veía el jardín más hermoso del mundo, pero Alicia era demasiado grande para entrar. Entonces vio una pequeña botella con una etiqueta que decía 'BÉBEME'. Al probarla, sintió que se encogía hasta medir solo veinticinco centímetros. ¡Ahora sí podría cruzar la puerta!" },
            { text: "Sin embargo, había olvidado la llave sobre la mesa. Alicia intentó trepar por las patas del mueble, pero resbalaba una y otra vez. Se sentó a llorar hasta que encontró una cajita con un pastel que decía 'CÓMEME'. Al darle un bocado, empezó a crecer de forma desmesurada hasta que su cabeza golpeó el techo. Estaba tan asustada que sus lágrimas formaron un enorme charco a su alrededor, donde pronto se encontró nadando junto a un ratón y otras aves." },
            { text: "Tras secarse y participar en una extraña Carrera en Comité, Alicia llegó a la casa del Conejo Blanco. Buscando sus guantes, bebió de otra botella y creció tanto que un brazo salió por la ventana y un pie por la chimenea. El conejo y sus amigos intentaron sacarla lanzando piedras que se convertían en pastelillos. Alicia comió uno, recuperó un tamaño manejable y huyó hacia el bosque, decidida a encontrar el camino al jardín." },
            { text: "En medio del bosque, Alicia se encontró con una enorme Oruga Azul sentada sobre una seta gigante, fumando tranquilamente una narguile. '¿Quién eres tú?', preguntó la oruga con voz lánguida. Tras una confusa conversación sobre cambios de tamaño y poemas, la oruga le dio un consejo antes de marcharse: 'Un lado de la seta te hará crecer, y el otro te hará menguar'. Alicia guardó trozos de ambos lados en sus bolsillos." },
            { text: "Más adelante, vio a un gato con una sonrisa de oreja a oreja subido a un árbol. Era el Gato de Cheshire. Alicia le preguntó qué camino debía tomar. 'Eso depende de a dónde quieras llegar', respondió el gato. Le explicó que en una dirección vivía un Sombrerero y en la otra una Liebre de Marzo, y que ambos estaban locos. El gato empezó a desaparecer lentamente, empezando por la cola y terminando por su sonrisa, que permaneció un rato flotando sola." },
            { text: "Alicia se dirigió a la casa de la Liebre de Marzo y encontró una mesa puesta bajo un árbol. Allí estaban la Liebre, el Sombrerero y un Lirón durmiendo entre ellos. Celebraban una eterna merienda porque el Tiempo, enfadado con el Sombrerero, se había detenido a las seis de la tarde. La conversación era un laberinto de acertijos sin respuesta y cambios de asiento constantes. Alicia, harta de tanta locura, se marchó buscando un lugar más sensato." },
            { text: "Finalmente, encontró una puerta en un árbol que la llevó al hermoso jardín. Allí vio tres naipes pintando de rojo las rosas blancas de un rosal. 'La Reina quería rosas rojas', explicaron temblando, 'y si se entera, nos cortará la cabeza'. De pronto, una procesión real llegó con la Reina de Corazones a la cabeza. '¡Que le corten la cabeza!', gritaba la Reina ante cualquier contratiempo, mientras Alicia era invitada a un partido de croquet muy peculiar." },
            { text: "El campo de croquet estaba lleno de lomas, los mazos eran flamencos vivos y las bolas eran erizos reales. Todo era un caos total, con la Reina mandando a ejecutar a todo el mundo. Alicia fue llevada al tribunal para testificar en el juicio contra la Sota de Corazones, acusada de robar unas tartas. A medida que el juicio se volvía más absurdo, Alicia empezó a crecer y crecer, perdiendo el miedo a los naipes que la rodeaban." },
            { text: "—'¡No sois más que una baraja de cartas!', gritó Alicia cuando la Reina ordenó su ejecución. En ese instante, todos los naipes se elevaron por los aires y cayeron sobre ella como una lluvia de papel. Alicia se defendió con las manos y despertó de pronto en el regazo de su hermana. Las hojas de los árboles caían sobre su rostro y comprendió que todo había sido un sueño maravilloso poblado de extrañas criaturas." }
        ],
        contentEn: [
            { text: "It all began on a hot summer afternoon. Alice was sitting on the riverbank with her sister, bored by a book with no pictures or conversations. Suddenly, a White Rabbit with pink eyes ran by her. What caught her attention most was not that the rabbit spoke, but that he took a pocket watch out of his waistcoat and exclaimed: 'Oh dear! I shall be too late!'. Full of curiosity, Alice followed him into a large rabbit-hole under the hedge." },
            { text: "Without a second thought, Alice jumped after him. The hole seemed like an endless tunnel falling towards the center of the earth. As she descended slowly, she saw shelves filled with jars of marmalade and maps. Finally, she landed with a soft thump on a heap of dry leaves. Ahead of her opened a long hallway where the rabbit disappeared around a corner, leaving behind only the echo of his footsteps." },
            { text: "She arrived at a hall with many closed doors. On a glass table she found a tiny golden key that opened a small door only fifteen inches high. Through it she saw the most beautiful garden in the world, but Alice was too big to get through. Then she saw a small bottle with a label that said 'DRINK ME'. Upon tasting it, she felt herself shrinking until she was only ten inches tall. Now she could cross the door!" },
            { text: "However, she had forgotten the key on the table. Alice tried to climb up the table legs, but she slipped again and again. She sat down to cry until she found a small box with a cake that said 'EAT ME'. Taking a bite, she began to grow enormously until her head hit the ceiling. She was so scared that her tears formed a huge pool around her, where she soon found herself swimming along with a mouse and other birds." },
            { text: "After drying off and participating in a strange Caucus-Race, Alice arrived at the White Rabbit's house. Looking for his gloves, she drank from another bottle and grew so much that one arm went out the window and one foot up the chimney. The rabbit and his friends tried to get her out by throwing stones that turned into cakes. Alice ate one, returned to a manageable size, and fled to the forest, decided to find the way to the garden." },
            { text: "In the middle of the forest, Alice met a large Blue Caterpillar sitting on a giant mushroom, quietly smoking a hookah. 'Who are you?', asked the caterpillar in a languid voice. After a confusing conversation about size changes and poems, the caterpillar gave her a piece of advice before leaving: 'One side will make you grow taller, and the other side will make you grow shorter'. Alice kept pieces of both sides in her pockets." },
            { text: "Further on, she saw a cat with a very wide grin sitting on a tree. It was the Cheshire Cat. Alice asked him which way she should go. 'That depends on where you want to get to', replied the cat. He explained that in one direction lived a Hatter and in the other a March Hare, and that both were mad. The cat began to disappear slowly, starting with the tail and ending with his grin, which remained floating alone for a while." },
            { text: "Alice went to the March Hare's house and found a table set under a tree. There were the Hare, the Hatter, and a Dormouse sleeping between them. They were celebrating an eternal tea party because Time, angry with the Hatter, had stopped at six o'clock. The conversation was a labyrinth of riddles with no answers and constant seat changes. Alice, fed up with so much madness, left looking for a more sensible place." },
            { text: "Finally, she found a door in a tree that led her to the beautiful garden. There she saw three playing cards painting white roses on a rose-tree red. 'The Queen wanted red roses', they explained trembling, 'and if she finds out, she will have our heads cut off'. Suddenly, a royal procession arrived with the Queen of Hearts at the lead. 'Off with her head!', the Queen shouted at any setback, while Alice was invited to a very peculiar croquet game." },
            { text: "The croquet ground was full of ridges, the mallets were live flamingos and the balls were real hedgehogs. Everything was total chaos, with the Queen ordering everyone to be executed. Alice was taken to the court to testify at the trial of the Knave of Hearts, accused of stealing some tarts. As the trial became more absurd, Alice began to grow and grow, losing her fear of the playing cards surrounding her." },
            { text: "—'You're nothing but a pack of cards!', Alice shouted when the Queen ordered her execution. At that instant, all the cards rose into the air and fell down upon her like a shower of paper. Alice defended herself with her hands and suddenly woke up in her sister's lap. The leaves from the trees were falling on her face, and she understood that it had all been a wonderful dream populated by strange creatures." }
        ],
        contentFr: [
            { text: "Tout commença par un après-midi d'été étouffant. Alice était assise sur la rive avec sa sœur, s'ennuyant devant un livre sans images ni conversations. Soudain, un Lapin Blanc aux yeux roses courut près d'elle. Ce qui attira le plus son attention ne fut pas le fait que le lapin parlait, mais qu'il tira une montre à gousset de son gilet en s'exclamant : 'Hélas ! Je vais être en retard !'. Pleine de curiosité, Alice le suivit jusque dans un grand terrier sous la haie." },
            { text: "Sans y réfléchir à deux fois, Alice sauta après lui. Le terrier semblait être un tunnel interminable tombant vers le centre de la terre. En descendant lentement, elle vit des étagères remplies de pots de confiture et de cartes. Finalement, elle atterrit avec un bruit sourd sur un tas de feuilles sèches. Devant elle s'ouvrait un long couloir où le lapin disparaissait au détour d'un coin, ne laissant derrière lui que l'écho de ses pas." },
            { text: "Elle arriva dans une salle avec de nombreuses portes fermées. Sur une table en verre, elle trouva une petite clé d'or qui ouvrait une porte de seulement trente centimètres. Derrière elle se voyait le plus beau jardin du monde, mais Alice était trop grande pour entrer. Elle vit alors une petite bouteille avec une étiquette disant 'BUVEZ-MOI'. En y goûtant, elle sentit qu'elle rétrécissait jusqu'à ne mesurer que vingt-cinq centimètres. Maintenant, elle pouvait traverser la porte !" },
            { text: "Pourtant, elle avait oublié la clé sur la table. Alice essaya de grimper le long des pieds du meuble, mais elle glissait sans cesse. Elle s'assit pour pleurer jusqu'à ce qu'elle trouve une petite boîte avec un gâteau disant 'MANGEZ-MOI'. En lui donnant un coup de dent, elle commença à grandir démesurément jusqu'à ce que sa tête heurte le plafond. Elle eut si peur que ses larmes formèrent une énorme mare autour d'elle, où elle se retrouva bientôt nageant avec une souris et d'autres oiseaux." },
            { text: "Après s'être séchée et avoir participé à une étrange Course au Comité, Alice arriva à la maison du Lapin Blanc. En cherchant ses gants, elle but d'une autre bouteille et grandit tellement qu'un bras sortit par la fenêtre et un pied par la cheminée. Le lapin et ses amis tentèrent de la faire sortir en jetant des pierres qui se transformaient en petits gâteaux. Alice en mangea un, retrouva une taille raisonnable et s'enfuit vers la forêt, décidée à trouver le chemin du jardin." },
            { text: "Au milieu de la forêt, Alice fit la connaissance d'une énorme Chenille Bleue assise sur un champignon géant, fumant tranquillement un narguilé. 'Qui es-tu ?', demanda la chenille d'une voix languissante. Après une conversation confuse sur les changements de taille et les poèmes, la chenille lui donna un conseil avant de partir : 'Un côté du champignon te fera grandir, et l'autre te fera rapetisser'. Alice garda des morceaux des deux côtés dans ses poches." },
            { text: "Plus loin, elle vit un chat avec un sourire fendu jusqu'aux oreilles perché sur un arbre. C'était le Chafouin. Alice lui demanda quel chemin elle devait prendre. 'Cela dépend de là où tu veux aller', répondit le chat. Il lui expliqua que dans une direction vivait un Chapelier et dans l'autre un Lièvre de Mars, et que tous deux étaient fous. Le chat commença à disparaître lentement, en commençant par la queue et en terminant par son sourire, qui resta un moment flottant seul." },
            { text: "Alice se dirigea vers la maison du Lièvre de Mars et trouva une table dressée sous un arbre. Là se trouvaient le Lièvre, le Chapelier et un Loir endormi entre eux. Ils célébraient un thé éternel car le Temps, fâché contre le Chapelier, s'était arrêté à six heures du soir. La conversation était un labyrinthe de devinettes sans réponse et de changements de place constants. Alice, lasse de tant de folie, s'en alla chercher un endroit plus sensé." },
            { text: "Finalement, elle trouva une porte dans un arbre qui la mena au magnifique jardin. Là, elle vit trois cartes à jouer peignant en rouge les roses blanches d'un rosier. 'La Reine voulait des roses rouges', expliquèrent-elles en tremblant, 'et si elle l'apprend, elle nous coupera la tête'. Soudain, une procession royale arriva avec la Reine de Cœur en tête. 'Qu'on lui coupe la tête !', criait la Reine au moindre contretemps, tandis qu'Alice était invitée à une partie de croquet très particulière." },
            { text: "Le terrain de croquet était plein de bosses, les maillets étaient des flamants roses vivants et les boules des hérissons réels. Tout était un chaos total, la Reine ordonnant d'exécuter tout le monde. Alice fut emmenée au tribunal pour témoigner lors du procès du Valet de Cœur, accusé d'avoir volé des tartes. À mesure que le procès devenait plus absurde, Alice commença à grandir et grandir, perdant sa peur des cartes qui l'entouraient." },
            { text: "— 'Vous n'êtes qu'un paquet de cartes !', cria Alice quand la Reine ordonna son exécution. À cet instant, toutes les cartes s'élevèrent dans les airs et retombèrent sur elle comme une pluie de papier. Alice se défendit des mains et se réveilla soudain sur les genoux de sa sœur. Les feuilles des arbres tombaient sur son visage et elle comprit que tout cela n'avait été qu'un rêve merveilleux peuplé de créatures étranges." }
        ],
        contentDe: [
            { text: "Alles begann an einem heißen Sommernachmittag. Alice saß mit ihrer Schwester am Flussufer und langweilte sich über einem Buch ohne Bilder oder Dialoge. Plötzlich rannte ein weißes Kaninchen mit rosa Augen an ihr vorbei. Was ihre Aufmerksamkeit am meisten erregte, war nicht, dass das Kaninchen sprach, sondern dass es eine Taschenuhr aus seiner Westentasche zog und ausrief: 'O weh! Ich komme zu spät!'. Voller Neugier folgte Alice ihm in einen großen Bau unter der Hecke." },
            { text: "Ohne lange nachzudenken, sprang Alice hinterher. Der Bau schien ein endloser Tunnel zu sein, der zum Mittelpunkt der Erde hinabführte. Während sie langsam hinabsank, sah sie Regale voller Marmeladengläser und Karten. Schließlich landete sie mit einem sanften Stoß auf einem Haufen trockener Blätter. Vor ihr öffnete sich ein langer Gang, in dem das Kaninchen um eine Ecke verschwand und nur das Echo seiner Schritte hinterließ." },
            { text: "Sie kam in einen Saal mit vielen geschlossenen Türen. Auf einem Glastisch fand sie einen goldenen Schlüssel, der eine winzige Tür von nur dreißig Zentimetern öffnete. Dahinter sah man den schönsten Garten der Welt, aber Alice war zu groß, um hineinzukommen. Da sah sie eine kleine Flasche mit einem Etikett, auf dem stand 'TRINK MICH'. Als sie davon kostete, fühlte sie, wie sie schrumpfte, bis sie nur noch fünfundzwanzig Zentimeter groß war. Jetzt konnte sie durch die Tür gehen!" },
            { text: "Doch sie hatte den Schlüssel auf dem Tisch vergessen. Alice versuchte, an den Tischbeinen hochzuklettern, aber sie rutschte immer wieder ab. Sie setzte sich hin und weinte, bis sie ein Kästchen mit einem Kuchen fand, auf dem stand 'ISS MICH'. Als sie davon abbiss, begann sie unermesslich zu wachsen, bis ihr Kopf an die Decke stieß. Sie hatte solche Angst, dass ihre Tränen eine riesige Pfütze um sie herum bildeten, in der sie bald zusammen mit einer Maus und anderen Vögeln schwamm." },
            { text: "Nachdem sie getrocknet war und an einem seltsamen Caucus-Rennen teilgenommen hatte, kam Alice zum Haus des Weißen Kaninchens. Auf der Suche nach seinen Handschuhen trank sie aus einer anderen Flasche und wuchs so sehr, dass ein Arm aus dem Fenster und ein Fuß aus dem Schornstein ragte. Das Kaninchen und seine Freunde versuchten sie herauszuholen, indem sie mit Steinen warfen, die sich in kleine Kuchen verwandelten. Alice aß einen, erlangte eine handliche Größe zurück und floh in den Wald, fest entschlossen, den Weg zum Garten zu finden." },
            { text: "Mitten im Wald traf Alice eine riesige blaue Raupe, die auf einem riesigen Pilz saß und seelenruhig eine Wasserpfeife rauchte. 'Wer bist du?', fragte die Raupe mit verschlafener Stimme. Nach einem verwirrenden Gespräch über Größenänderungen und Gedichte gab die Raupe ihr einen Rat, bevor sie ging: 'Die eine Seite des Pilzes wird dich wachsen machen, und die andere wird dich schrumpfen machen'. Alice steckte Stücke von beiden Seiten in ihre Taschen." },
            { text: "Weiter vorne sah sie eine Katze mit einem Grinsen von einem Ohr zum anderen auf einem Baum sitzen. Es war die Grinsekatze. Alice fragte sie, welchen Weg sie einschlagen sollte. 'Das hängt davon ab, wohin du kommen willst', antwortete die Katze. Sie erklärte ihr, dass in der einen Richtung ein Hutmacher und in der anderen ein Faselhase wohne und dass beide verrückt seien. Die Katze begann langsam zu verschwinden, angefangen beim Schwanz bis hin zu ihrem Grinsen, das eine Zeit lang allein in der Luft schwebte." },
            { text: "Alice ging zum Haus des Faselhasen und fand einen gedeckten Tisch unter einem Baum. Dort saßen der Hase, der Hutmacher und eine Haselmaus, die zwischen ihnen schlief. Sie feierten eine ewige Teegesellschaft, weil die Zeit, wütend auf den Hutmacher, um sechs Uhr abends stehen geblieben war. Das Gespräch war ein Labyrinth aus Rätseln ohne Antwort und ständigen Platzwechseln. Alice, die des ganzen Wahnsinns überdrüssig war, ging fort, um einen vernünftigeren Ort zu suchen." },
            { text: "Schließlich fand sie eine Tür in einem Baum, die sie in den wunderschönen Garten führte. Dort sah sie drei Spielkarten, die die weißen Rosen eines Rosenstocks rot anmalten. 'Die Königin wollte rote Rosen', erklärten sie zitternd, 'und wenn sie es erfährt, wird sie uns den Kopf abschlagen lassen'. Plötzlich kam eine königliche Prozession mit der Herzkönigin an der Spitze. 'Ab mit seinem Kopf!', schrie die Königin bei jeder Gelegenheit, während Alice zu einer sehr eigenartigen Partie Krocket eingeladen wurde." },
            { text: "Das Krocketfeld war voller Hügel, die Schläger waren lebendige Flamingos und die Bälle echten Igel. Alles war ein totales Chaos, und die Königin befahl ständig Hinrichtungen. Alice wurde vor Gericht gebracht, um im Prozess gegen den Herzbuben auszusagen, der beschuldigt wurde, Torten gestohlen zu haben. Je absurder der Prozess wurde, desto mehr wuchs Alice, bis sie die Angst vor den Spielkarten um sie herum verlor." },
            { text: "— 'Ihr seid doch nichts als ein Packen Karten!', schrie Alice, als die Königin ihre Hinrichtung befahl. In diesem Augenblick flogen alle Spielkarten in die Luft und fielen wie ein Regen aus Papier auf sie herab. Alice wehrte sich mit den Händen und erwachte plötzlich auf dem Schoß ihrer Schwester. Die Blätter der Bäume fielen auf ihr Gesicht, und sie begriff, dass alles nur ein wundervoller Traum war, bevölkert von seltsamen Wesen." }
        ]
    },
    {
        id: 'mago-oz',
        title: 'El Mago de Oz',
        author: 'L. Frank Baum',
        description: 'Dorothy y su perro Totó son arrastrados por un ciclón a la tierra de Oz, donde emprenderán un viaje fantástico para encontrar el camino a casa.',
        level: 'Medio',
        age: '6+',
        coverImage: '/images/storyteller/mago-oz-cover.png',
        chipImage: '/images/storyteller/character-mago-oz.png',
        genre: 'Fantasía',
        themeColor: 'from-emerald-500 to-green-700',
        rating: 4.8,
        content: [
            { text: "Dorothy es una niña huérfana que vive en Kansas con sus tíos y su perrito, Totó. Un día, un terrible ciclón arrastra su casa por los aires. Cuando la casa aterriza, Dorothy descubre que ya no está en Kansas, sino en una tierra mágica y colorida. Al salir, ve que su casa ha caído sobre la Bruja Malvada del Este, ¡librando a los Munchkins de su tiranía! La Bruja Buena del Norte aparece, le da unos zapatos mágicos y le explica que para volver a casa debe ir a la Ciudad Esmeralda y pedir ayuda al Mago de Oz." },
            { text: "Dorothy y Totó comienzan su viaje por el Camino de Ladrillos Amarillos. En el camino, se encuentran con un espantapájaros colgado en un poste. Él le cuenta a Dorothy que lo que más desea es tener un cerebro para poder pensar. Dorothy lo invita a unirse a ella para pedirle un cerebro al Mago de Oz. El Espantapájaros acepta encantado, esperando que el gran mago pueda cumplir su sueño." },
            { text: "Mientras continúan por el bosque, escuchan unos lamentos y descubren a un Leñador de Hojalata oxidado. Después de ayudarlo con un poco de aceite, el Leñador les confiesa que lo que más anhela es tener un corazón, pues siente que sin él no puede amar. Dorothy lo invita a acompañarlos, pensando que el Mago de Oz también podría concederle un corazón para volver a sentir alegría y amor." },
            { text: "De repente, un enorme león sale de la selva con un rugido temible. Sin embargo, Dorothy pronto nota que es un león muy cobarde. El León les confiesa que lo que más desea es tener valentía. Dorothy lo invita a unirse al grupo para pedirle al Mago de Oz que le dé coraje. El León, aunque temeroso, acepta la propuesta de buscar la valentía que cree le hace falta." },
            { text: "El viaje hacia la Ciudad Esmeralda está lleno de desafíos. Atraviesan campos de amapolas mágicas que causan un sueño profundo y se encuentran con peligrosos obstáculos. Sin embargo, gracias a su ingenio y la ayuda de nuevos amigos como la Reina de los Ratones, logran superar cada prueba. Estas aventuras demuestran que la amistad y el trabajo en equipo son sus mejores armas en este mundo extraño." },
            { text: "Finalmente, llegan a la deslumbrante Ciudad Esmeralda, donde todo es de un verde brillante. Un guardián los lleva ante el Mago de Oz, quien se presenta de forma misteriosa a cada uno: como una cabeza gigante, una hermosa dama, una bestia terrible y una bola de fuego. El Mago les impone una última condición: deben derrotar a la Bruja Malvada del Oeste antes de que él cumpla sus deseos." },
            { text: "El grupo viaja al tenebroso País del Oeste. La Bruja Malvada envía lobos, cuervos y abejas para detenerlos, pero los amigos logran vencerlos a todos. Finalmente, la bruja captura a todos excepto a Dorothy, a quien no puede dañar gracias a la protección de la Bruja Buena. Dorothy es obligada a trabajar en el castillo de la malvada bruja mientras busca una oportunidad para escapar." },
            { text: "Un día, la bruja intenta quitarle los zapatos mágicos a Dorothy por la fuerza. Enfurecida, Dorothy le arroja un cubo de agua y, para su sorpresa, ¡la Bruja Malvada se derrite por completo! Con la bruja derrotada, los habitantes del Oeste quedan libres por fin. Dorothy rescata a sus amigos y juntos regresan victoriosos a la Ciudad Esmeralda para reclamar sus recompensas." },
            { text: "De vuelta ante el Mago, descubren que no es el poderoso hechicero que creían. Es en realidad un anciano que llegó a Oz en un globo y usa trucos para parecer mágico. Aunque no tiene poderes reales, el Mago es astuto y les ayuda a ver que ya poseen lo que buscaban: el Espantapájaros ya era inteligente, el Leñador ya era bondadoso y el León ya era muy valiente." },
            { text: "El Mago construye un globo para llevar a Dorothy de vuelta a Kansas, pero el globo parte sin ella por accidente. Desesperada, Dorothy busca la ayuda de Glinda, la Bruja Buena del Sur. Glinda le revela que los zapatos mágicos siempre tuvieron el poder de llevarla a casa. Dorothy solo tiene que chocar los talones tres veces y desear con todas sus fuerzas estar de vuelta en su hogar." },
            { text: "Con lágrimas en los ojos, Dorothy se despide de sus queridos amigos: el Espantapájaros, que ahora gobierna Oz; el Leñador de Hojalata y el León Cobarde. Tras un último abrazo, Dorothy cierra los ojos, choca sus talones tres veces y exclama: '¡No hay lugar como el hogar!'. Siente que vuela por los aires mientras el mundo de Oz desaparece lentamente a su alrededor." },
            { text: "En un abrir y cerrar de ojos, Dorothy se encuentra de nuevo en los campos de Kansas. A lo lejos ve la nueva granja de sus tíos y a Totó saltando de alegría a su lado. Su tía Em corre a abrazarla, feliz de verla sana y salva. Dorothy sonríe, sabiendo que aunque Oz fue un lugar maravilloso lleno de magia y amigos, de verdad no hay ningún lugar en el mundo como el propio hogar." }
        ],
        contentEn: [
            { text: "Dorothy is an orphan girl living in Kansas with her Aunt Em, Uncle Henry, and her little dog, Toto. One day, a terrible cyclone sweeps their house into the air. When the house lands, Dorothy discovers she is no longer in Kansas, but in a magical and colorful land. Stepping out, she sees her house has fallen on the Wicked Witch of the East, freeing the Munchkins from her tyranny! The Good Witch of the North appears, gives Dorothy magical shoes, and explains that to get home, she must go to the Emerald City and ask for the powerful Wizard of Oz for help." },
            { text: "Dorothy and Toto begin their journey along the Yellow Brick Road. On their way, they meet a scarecrow hanging on a pole. He tells Dorothy that what he wants most in the world is to have a brain so he can think. Dorothy invites him to join her to ask the Wizard of Oz for a brain. The Scarecrow happily accepts, hoping the great wizard can fulfill his dream." },
            { text: "As they continue through the forest, they hear moans and discover a rusty Tin Woodman. After helping him with a little oil, the Woodman confesses that what he longs for most is to have a heart, because he feels that without it, he cannot love. Dorothy invites him to accompany them, thinking the Wizard of Oz could also grant him a heart so he can feel joy and love again." },
            { text: "Suddenly, a huge lion comes out of the jungle with a fearsome roar. However, Dorothy soon notices that he is a very cowardly lion. The Lion confesses that what he wants most is to have courage. Dorothy invites him to join the group to ask the Wizard of Oz to give him courage. The Lion, though fearful, accepts the proposal to seek the courage he believes he lacks." },
            { text: "The trip to the Emerald City is full of challenges. They cross fields of magical poppies that cause a deep sleep and encounter dangerous obstacles. However, thanks to their ingenuity and the help of new friends like the Queen of the Mice, they manage to overcome every test. These adventures prove that friendship and teamwork are their best weapons in this strange world." },
            { text: "Finally, they arrive at the dazzling Emerald City, where everything is a brilliant green. A guardian takes them before the Wizard of Oz, who presents himself in a mysterious way to each: as a giant head, a beautiful lady, a terrible beast, and a ball of fire. The Wizard imposes one last condition: they must defeat the Wicked Witch of the West before he fulfills their wishes." },
            { text: "The group travels to the dark Land of the West. The Wicked Witch sends wolves, crows, and bees to stop them, but the friends manage to defeat them all. Finally, the witch captures everyone except Dorothy, whom she cannot harm thanks to the protection of the Good Witch. Dorothy is forced to work in the wicked witch's castle while seeking an opportunity to escape." },
            { text: "One day, the witch tries to take Dorothy's magic shoes by force. Enraged, Dorothy throws a bucket of water at her and, to her surprise, the Wicked Witch completely melts away! With the witch defeated, the inhabitants of the West are finally free. Dorothy rescues her friends and together they return victorious to the Emerald City to claim their rewards." },
            { text: "Back before the Wizard, they discover he is not the powerful sorcerer they believed. He is actually an old man who arrived in Oz in a balloon and uses tricks to appear magical. Although he has no real powers, the Wizard is clever and helps them see that they already possess what they were looking for: the Scarecrow was already smart, the Woodman was already kind, and the Lion was already very brave." },
            { text: "The Wizard builds a balloon to take Dorothy back to Kansas, but the balloon leaves without her by accident. Desperate, Dorothy seeks the help of Glinda, the Good Witch of the South. Glinda reveals that the magic shoes always had the power to take her home. Dorothy only has to click her heels three times and wish with all her heart to be back in her home." },
            { text: "With tears in her eyes, Dorothy says goodbye to her dear friends: the Scarecrow, who now rules Oz; the Tin Woodman, and the Cowardly Lion. After one last hug, Dorothy closes her eyes, clicks her heels three times and exclaims: 'There's no place like home!'. She feels herself flying through the air as the world of Oz slowly disappears around her." },
            { text: "In the blink of an eye, Dorothy is back in the fields of Kansas. In the distance, she sees her aunt and uncle's new farm and Toto jumping with joy at her side. Her Aunt Em runs to hug her, happy to see her safe and sound. Dorothy smiles, knowing that although Oz was a wonderful place full of magic and friends, there truly is no place in the world like home." }
        ],
        contentFr: [
            { text: "Tout commença par un après-midi d'été étouffant. Dorothée était une petite orpheline qui vivait au Kansas avec son oncle Henry, sa tante Em et son petit chien, Toto. Un jour, un terrible cyclone emporta sa maison dans les airs. Quand la maison atterrit, Dorothée découvrit qu'elle n'était plus au Kansas, mais dans un pays magique et coloré. En sortant, elle vit que sa maison était tombée sur la Méchante Sorcière de l'Est, libérant les Munchkins de sa tyrannie ! La Gentille Sorcière du Nord apparut, lui donna des souliers d'argent magiques et lui expliqua que pour rentrer chez elle, elle devait se rendre à la Cité d'Émeraude et demander l'aide du puissant Magicien d'Oz." },
            { text: "Dorothée et Toto commencèrent leur voyage sur le Chemin de Briques Jaunes. En chemin, ils rencontrèrent un épouvantail accroché à un poteau. Il dit à Dorothée que ce qu'il désirait le plus au monde était d'avoir un cerveau pour pouvoir réfléchir. Dorothée l'invita à se joindre à elle pour demander un cerveau au Magicien d'Oz. L'Épouvantail accepta avec joie, espérant que le grand magicien pourrait réaliser son rêve." },
            { text: "Alors qu'ils continuaient à travers la forêt, ils entendirent des gémissements et découvrirent un Bûcheron en Fer-Blanc tout rouillé. Après l'avoir aidé avec un peu d'huile, le Bûcheron leur confia que ce qu'il désirait le plus était d'avoir un cœur, car il sentait que sans lui, il ne pouvait pas aimer. Dorothée l'invita à les accompagner, pensant que le Magicien d'Oz pourrait également lui accorder un cœur pour qu'il puisse à nouveau ressentir de la joie et de l'amour." },
            { text: "Soudain, un énorme lion sortit de la jungle avec un rugissement redoutable. Cependant, Dorothée remarqua vite que c'était un lion très poltron. Le Lion leur confia que ce qu'il désirait le plus était d'avoir du courage. Dorothée l'invita à rejoindre le groupe pour demander au Magicien d'Oz de lui donner du courage. Le Lion, bien qu'effrayé, accepta la proposition de chercher le courage qu'il croyait lui manquer." },
            { text: "Le voyage vers la Cité d'Émeraude était plein de défis. Ils traversèrent des champs de pavots magiques qui provoquaient un sommeil profond et rencontrèrent de dangereux obstacles. Cependant, grâce à leur ingéniosité et à l'aide de nouveaux amis comme la Reine des Rats, ils réussirent à surmonter chaque épreuve. Ces aventures prouvèrent que l'amitié et le travail d'équipe étaient leurs meilleures armes dans ce monde étrange." },
            { text: "Enfin, ils arrivèrent à l'éblouissante Cité d'Émeraude, où tout était d'un vert éclatant. Un gardien les mena devant le Magicien d'Oz, qui se présenta de manière mystérieuse à chacun : sous la forme d'une tête géante, d'une belle dame, d'une bête terrible et d'une boule de feu. Le Magicien leur imposa une dernière condition : ils devaient vaincre la Méchante Sorcière de l'Ouest avant qu'il ne réalise leurs souhaits." },
            { text: "Le groupe voyagea vers le sombre Pays de l'Ouest. La Méchante Sorcière envoya des loups, des corbeaux et des abeilles pour les arrêter, mais les amis réussirent à tous les vaincre. Finalement, la sorcière les captura tous sauf Dorothée, qu'elle ne pouvait pas blesser grâce à la protection de la Gentille Sorcière. Dorothée fut forcée de travailler dans le château de la méchante sorcière tout en cherchant une occasion de s'échapper." },
            { text: "Un jour, la sorcière tenta de prendre les souliers magiques de Dorothée par la force. Furieuse, Dorothée lui jeta un seau d'eau et, à sa grande surprise, la Méchante Sorcière fondit complètement ! La sorcière vaincue, les habitants de l'Ouest furent enfin libres. Dorothée sauva ses amis et ensemble ils retournèrent victorieux à la Cité d'Émeraude pour réclamer leurs récompenses." },
            { text: "De retour devant le Magicien, ils découvrirent qu'il n'était pas le puissant sorcier qu'ils croyaient. C'était en réalité un vieil homme arrivé à Oz en ballon et qui utilisait des tours pour paraître magique. Bien qu'il n'ait pas de vrais pouvoirs, le Magicien était rusé et les aida à voir qu'ils possédaient déjà ce qu'ils cherchaient : l'Épouvantail était déjà intelligent, le Bûcheron était déjà bon et le Lion était déjà très courageux." },
            { text: "Le Magicien construisit un ballon pour ramener Dorothée au Kansas, mais le ballon partit sans elle par accident. Désespérée, Dorothée chercha l'aide de Glinda, la Gentille Sorcière du Sud. Glinda lui révéla que les souliers magiques avaient toujours le pouvoir de la ramener chez elle. Dorothée n'avait qu'à claquer les talons trois fois et souhaiter de tout son cœur de revenir dans son foyer." },
            { text: "Les larmes aux yeux, Dorothée fit ses adieux à ses chers amis : l'Épouvantail, qui gouverne désormais Oz ; le Bûcheron en Fer-Blanc et le Lion Poltron. Après un dernier baiser, Dorothée ferma les yeux, claqua les talons trois fois et s'exclama : 'Il n'y a pas d'endroit comme chez soi !'. Elle se sentit voler dans les airs tandis que le monde d'Oz disparaissait lentement autour d'elle." },
            { text: "En un clin d'œil, Dorothée se retrouva dans les champs du Kansas. Au loin, elle vit la nouvelle ferme de son oncle et de sa tante et Toto sautant de joie à ses côtés. Sa tante Em courut l'embrasser, heureuse de la voir saine et sauve. Dorothée sourit, sachant que même si Oz était un endroit merveilleux plein de magie et d'amis, il n'y a vraiment aucun endroit au monde comme chez soi." }
        ],
        contentDe: [
            { text: "Dorothy ist ein Waisenmädchen, das mit Onkel Henry, Tante Em und ihrem kleinen Hund Toto in Kansas lebt. Eines Tages reißt un schrecklicher Wirbelsturm ihr Haus in die Luft. Als das Haus landet, stellt Dorothy fest, dass sie nicht mehr in Kansas ist, sondern in einem magischen und farbenfrohen Land. Als sie hinausgeht, sieht sie, dass ihr Haus auf die böse Osthexe gefallen ist und die Munchkins von ihrer Tyrannei befreit hat! Die gute Nordhexe erscheint, gibt Dorothy magische Schuhe und erklärt ihr, dass sie zur Smaragdstadt gehen und den mächtigen Zauberer von Oz um Hilfe bitten muss, um nach Hause zurückzukehren." },
            { text: "Dorothy und Toto beginnen ihre Reise auf dem gelben Backsteinweg. Unterwegs treffen sie eine Vogelscheuche, die an einem Pfosten hängt. Er erzählt Dorothy, dass sein größter Wunsch auf der Welt ein Gehirn ist, damit er denken kann. Dorothy lädt ihn ein, sie zu begleiten, um den Zauberer von Oz um ein Gehirn zu bitten. Die Vogelscheuche nimmt freudig an und hofft, dass der große Zauberer seinen Traum erfüllen kann." },
            { text: "Als sie ihren Weg durch den Wald fortsetzen, hören sie ein Wehklagen und entdecken einen verrosteten Blechmann. Nachdem sie ihm mit etwas Öl geholfen haben, gesteht der Blechmann, dass er sich am meisten nach einem Herzen sehnt, da er das Gefühl hat, ohne es nicht lieben zu können. Dorothy lädt ihn ein, sie zu begleiten, in der Hoffnung, dass der Zauberer von Oz ihm ebenfalls ein Herz schenken kann, damit er wieder Freude und Liebe empfinden kann." },
            { text: "Plötzlich stürzt ein riesiger Löwe mit einem furchterregenden Brüllen aus dem Dschungel. Doch Dorothy merkt schnell, dass er ein sehr feiger Löwe ist. Der Löwe gesteht, dass er sich am meisten Mut wünscht. Dorothy lädt ihn ein, sich der Gruppe anzuschließen, um den Zauberer von Oz um Mut zu bitten. Der Löwe nimmt den Vorschlag trotz seiner Angst an, um den Mut zu suchen, von dem er glaubt, dass er ihm fehlt." },
            { text: "Die Reise zur Smaragdstadt ist voller Herausforderungen. Sie durchqueren magische Mohnfelder, die einen tiefen Schlaf verursachen, und stoßen auf gefährliche Hindernisse. Doch dank ihres Scharfsinns und der Hilfe neuer Freunde wie der Mäusekönigin meistern sie jede Prüfung. Diese Abenteuer beweisen, dass Freundschaft und Teamarbeit ihre besten Waffen in dieser fremden Welt sind." },
            { text: "Schließlich erreichen sie die prachtvolle Smaragdstadt, in der alles in leuchtendem Grün erstrahlt. Ein Wächter führt sie vor den Zauberer von Oz, der jedem auf mysteriöse Weise erscheint: als riesiger Kopf, als wunderschöne Frau, als schreckliches Ungeheuer und als Feuerball. Der Zauberer stellt ihnen eine letzte Bedingung: Sie müssen die böse Westhexe besiegen, bevor er ihre Wünsche erfüllt." },
            { text: "Die Gruppe reist in das düstere Land des Westens. Die böse Hexe schickt Wölfe, Krähen und Bienen, um sie aufzuhalten, doch die Freunde besiegen sie alle. Schließlich nimmt die Hexe alle außer Dorothy gefangen, der sie dank des Schutzes der guten Hexe nichts anhaben kann. Dorothy wird gezwungen, im Schloss der bösen Hexe zu arbeiten, während sie nach einer Gelegenheit zur Flucht sucht." },
            { text: "Eines Tages versucht die Hexe, Dorothy ihre magischen Schuhe mit Gewalt wegzunehmen. Wütend wirft Dorothy einen Eimer Wasser über sie, und zu ihrer Überraschung schmilzt die böse Hexe vollständig dahin! Nachdem die Hexe besiegt ist, sind die Bewohner des Westens endlich frei. Dorothy rettet ihre Freunde und gemeinsam kehren sie siegreich in die Smaragdstadt zurück, um ihre Belohnung einzufordern." },
            { text: "Zurück beim Zauberer entdecken sie, dass er nicht der mächtige Magier ist, für den sie ihn hielten. Er ist in Wirklichkeit ein alter Mann, der mit einem Ballon nach Oz kam und Tricks benutzt, um magisch zu erscheinen. Obwohl er keine wirklichen Kräfte hat, ist der Zauberer schlau und hilft ihnen zu erkennen, dass sie bereits besitzen, wonach sie suchten: Die Vogelscheuche war bereits klug, der Blechmann bereits gütig und der Löwe bereits sehr tapfer." },
            { text: "Der Zauberer baut einen Ballon, um Dorothy zurück nach Kansas zu bringen, doch der Ballon hebt versehentlich ohne sie ab. Verzweifelt sucht Dorothy Hilfe bei Glinda, der guten Südhexe. Glinda verrät ihr, dass die magischen Schuhe schon immer die Macht hatten, sie nach Hause zu bringen. Dorothy muss nur dreimal die Fersen zusammenschlagen und sich von ganzem Herzen wünschen, wieder in ihrem Zuhause zu sein." },
            { text: "Mit Tränen in den Augen verabschiedet sich Dorothy von ihren lieben Freunden: der Vogelscheuche, die nun Oz regiert, dem Blechmann und dem feigen Löwen. Nach einer letzten Umarmung schließt Dorothy die Augen, schlägt dreimal die Fersen zusammen und ruft: 'Es gibt keinen Ort wie das Zuhause!'. Sie fühlt, wie sie durch die Luft fliegt, während die Welt von Oz langsam um sie herum verschwindet." },
            { text: "Im Handumdrehen befindet sich Dorothy wieder in den Feldern von Kansas. In der Ferne sieht sie die neue Farm ihrer Tante und ihres Onkels und Toto, der vor Freude an ihrer Seite springt. Tante Em rennt herbei, um sie zu umarmen, froh, sie gesund und munter wiederzusehen. Dorothy lächelt in dem Wissen, dass Oz zwar ein wunderbarer Ort voller Magie und Freunde war, es aber wirklich keinen Ort auf der Welt wie das eigene Zuhause gibt." }
        ]
    }
];

