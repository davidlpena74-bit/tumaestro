
export interface ReadingText {
    id: string;
    title: string;
    content: string;
    level: 'Fácil' | 'Medio' | 'Difícil';
    category: string;
    image?: string;
}

export const READING_TEXTS: ReadingText[] = [
    {
        id: 'el-sol',
        title: 'El Sol, nuestra estrella',
        content: 'El Sol es la estrella más cercana a la Tierra y el centro de nuestro sistema solar. Es una gigantesca bola de gas caliente que brilla y nos da luz y calor. Sin el Sol, no existiría la vida en nuestro planeta, ya que las plantas necesitan su luz para crecer y nosotros necesitamos su calor para no congelarnos. Aunque parece muy grande desde aquí, es solo una estrella de tamaño mediano entre los miles de millones que hay en el universo.',
        level: 'Fácil',
        category: 'Ciencias',
        image: 'https://images.unsplash.com/photo-1529788295308-1eace6f67388?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'los-delfines',
        title: 'Los inteligentes delfines',
        content: 'Los delfines son mamíferos marinos conocidos por su gran inteligencia y su comportamiento social. Viven en grupos llamados "vainas" y se comunican entre sí mediante silbidos y sonidos de clic únicos. Utilizan la ecolocalización para encontrar comida y navegar por el océano. Son famosos por su curiosidad hacia los humanos y por ayudar a otros miembros de su grupo cuando están heridos o enfermos.',
        level: 'Fácil',
        category: 'Naturaleza',
        image: 'https://images.unsplash.com/photo-1607335614551-3062386 local-81?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'ciclo-agua',
        title: 'El Ciclo del Agua',
        content: 'El agua de la Tierra está en constante movimiento en un proceso llamado el ciclo del agua. El calor del sol hace que el agua de los mares y ríos se evapore y suba al cielo en forma de vapor. Allí, el vapor se enfría y forma las nubes. Cuando las nubes están muy cargadas, el agua cae en forma de lluvia, nieve o granizo, regresando a la tierra y a los océanos para empezar el ciclo de nuevo.',
        level: 'Medio',
        category: 'Geografía',
        image: 'https://images.unsplash.com/photo-1534274988757-a28bf1f53d17?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'las-abejas',
        title: 'La importancia de las abejas',
        content: 'Las abejas son fundamentales para el equilibrio de la naturaleza. Al volar de flor en flor, transportan el polen, lo que permite que las plantas se reproduzcan y den frutos. Este proceso se llama polinización. Sin las abejas, muchos de los alimentos que consumimos, como las manzanas, las fresas o las almendras, podrían desaparecer. Por eso es vital protegerlas y cuidar su entorno natural.',
        level: 'Medio',
        category: 'Biología',
        image: 'https://images.unsplash.com/photo-1473973266408-ed4eaba9aba3?auto=format&fit=crop&q=80&w=800'
    }
];
