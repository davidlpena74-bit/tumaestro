// ------------------------------------------------------------------
// SPANISH DATA
// ------------------------------------------------------------------

// Mapping from Natural Earth / generic English names (keys in paths JSON) to Spanish display names
export const PATH_TO_SPANISH_NAME: Record<string, string> = {
    'Albania': 'Albania',
    'Andorra': 'Andorra',
    'Armenia': 'Armenia',
    'Austria': 'Austria',
    'Azerbaijan': 'Azerbaiyán',
    'Belarus': 'Bielorrusia',
    'Belgium': 'Bélgica',
    'Bosnia and Herz.': 'Bosnia y Herzegovina',
    'Bulgaria': 'Bulgaria',
    'Croatia': 'Croacia',
    'Cyprus': 'Chipre',
    'Czechia': 'República Checa',
    'Denmark': 'Dinamarca',
    'Estonia': 'Estonia',
    'Finland': 'Finlandia',
    'France': 'Francia',
    'Georgia': 'Georgia',
    'Germany': 'Alemania',
    'Greece': 'Grecia',
    'Hungary': 'Hungría',
    'Iceland': 'Islandia',
    'Ireland': 'Irlanda',
    'Italy': 'Italia',
    'Kazakhstan': 'Kazajistán',
    'Kosovo': 'Kosovo',
    'Latvia': 'Letonia',
    'Liechtenstein': 'Liechtenstein',
    'Lithuania': 'Lituania',
    'Luxembourg': 'Luxemburgo',
    'Malta': 'Malta',
    'Moldova': 'Moldavia',
    'Monaco': 'Mónaco',
    'Montenegro': 'Montenegro',
    'Netherlands': 'Países Bajos',
    'North Macedonia': 'Macedonia del Norte',
    'Norway': 'Noruega',
    'Poland': 'Polonia',
    'Portugal': 'Portugal',
    'Romania': 'Rumanía',
    'Russia': 'Rusia',
    'San Marino': 'San Marino',
    'Serbia': 'Serbia',
    'Slovakia': 'Eslovaquia',
    'Slovenia': 'Eslovenia',
    'Spain': 'España',
    'Sweden': 'Suecia',
    'Switzerland': 'Suiza',
    'Turkey': 'Turquía',
    'Ukraine': 'Ucrania',
    'United Kingdom': 'Reino Unido',
    'Vatican': 'Vaticano'
};

export const EUROPE_CAPITALS: Record<string, string> = {
    'Albania': 'Tirana',
    'Andorra': 'Andorra la Vella',
    'Armenia': 'Ereván',
    'Austria': 'Viena',
    'Azerbaiyán': 'Bakú',
    'Bielorrusia': 'Minsk',
    'Bélgica': 'Bruselas',
    'Bosnia y Herzegovina': 'Sarajevo',
    'Bulgaria': 'Sofía',
    'Croacia': 'Zagreb',
    'Chipre': 'Nicosia',
    'República Checa': 'Praga',
    'Dinamarca': 'Copenhague',
    'Estonia': 'Tallin',
    'Finlandia': 'Helsinki',
    'Francia': 'París',
    'Georgia': 'Tiflis',
    'Alemania': 'Berlín',
    'Grecia': 'Atenas',
    'Hungría': 'Budapest',
    'Islandia': 'Reikiavik',
    'Irlanda': 'Dublín',
    'Italia': 'Roma',
    'Kazajistán': 'Astaná',
    'Kosovo': 'Pristina',
    'Letonia': 'Riga',
    'Liechtenstein': 'Vaduz',
    'Lituania': 'Vilna',
    'Luxemburgo': 'Luxemburgo',
    'Malta': 'La Valeta',
    'Moldavia': 'Chisináu',
    'Mónaco': 'Mónaco',
    'Montenegro': 'Podgorica',
    'Países Bajos': 'Ámsterdam',
    'Macedonia del Norte': 'Skopie',
    'Noruega': 'Oslo',
    'Polonia': 'Varsovia',
    'Portugal': 'Lisboa',
    'Rumanía': 'Bucarest',
    'Rusia': 'Moscú',
    'San Marino': 'San Marino',
    'Serbia': 'Belgrado',
    'Eslovaquia': 'Bratislava',
    'Eslovenia': 'Liubliana',
    'España': 'Madrid',
    'Suecia': 'Estocolmo',
    'Suiza': 'Berna',
    'Turquía': 'Ankara',
    'Ucrania': 'Kiev',
    'Reino Unido': 'Londres',
    'Vaticano': 'Ciudad del Vaticano'
};

export const EU_MEMBERS_LIST = [
    'Alemania', 'Austria', 'Bélgica', 'Bulgaria', 'Chipre', 'Croacia', 'Dinamarca',
    'Eslovaquia', 'Eslovenia', 'España', 'Estonia', 'Finlandia', 'Francia', 'Grecia',
    'Hungría', 'Irlanda', 'Italia', 'Letonia', 'Lituania', 'Luxemburgo', 'Malta',
    'Países Bajos', 'Polonia', 'Portugal', 'República Checa', 'Rumanía', 'Suecia'
];

export const EUROPE_LIST = Object.keys(EUROPE_CAPITALS);


// ------------------------------------------------------------------
// ENGLISH DATA
// ------------------------------------------------------------------

export const PATH_TO_ENGLISH_NAME: Record<string, string> = {
    // Identity mapping (mostly) but explicit for safety
    ...Object.fromEntries(Object.keys(PATH_TO_SPANISH_NAME).map(k => [k, k])),
    // Manual adjustments if keys in topojson differ from common English names, 
    // but usually they match Natural Earth English names.
    'Czechia': 'Czech Republic', // Sometimes preferred
    'Bosnia and Herz.': 'Bosnia and Herzegovina',
    'North Macedonia': 'North Macedonia'
};

export const EUROPE_CAPITALS_EN: Record<string, string> = {
    'Albania': 'Tirana',
    'Andorra': 'Andorra la Vella',
    'Armenia': 'Yerevan',
    'Austria': 'Vienna',
    'Azerbaijan': 'Baku',
    'Belarus': 'Minsk',
    'Belgium': 'Brussels',
    'Bosnia and Herzegovina': 'Sarajevo',
    'Bulgaria': 'Sofia',
    'Croatia': 'Zagreb',
    'Cyprus': 'Nicosia',
    'Czech Republic': 'Prague',
    'Denmark': 'Copenhagen',
    'Estonia': 'Tallinn',
    'Finland': 'Helsinki',
    'France': 'Paris',
    'Georgia': 'Tbilisi',
    'Germany': 'Berlin',
    'Greece': 'Athens',
    'Hungary': 'Budapest',
    'Iceland': 'Reykjavik',
    'Ireland': 'Dublin',
    'Italy': 'Rome',
    'Kazakhstan': 'Astana',
    'Kosovo': 'Pristina',
    'Latvia': 'Riga',
    'Liechtenstein': 'Vaduz',
    'Lithuania': 'Vilnius',
    'Luxembourg': 'Luxembourg',
    'Malta': 'Valletta',
    'Moldova': 'Chisinau',
    'Monaco': 'Monaco',
    'Montenegro': 'Podgorica',
    'Netherlands': 'Amsterdam',
    'North Macedonia': 'Skopje',
    'Norway': 'Oslo',
    'Poland': 'Warsaw',
    'Portugal': 'Lisbon',
    'Romania': 'Bucharest',
    'Russia': 'Moscow',
    'San Marino': 'San Marino',
    'Serbia': 'Belgrade',
    'Slovakia': 'Bratislava',
    'Slovenia': 'Ljubljana',
    'Spain': 'Madrid',
    'Sweden': 'Stockholm',
    'Switzerland': 'Bern',
    'Turkey': 'Ankara',
    'Ukraine': 'Kyiv',
    'United Kingdom': 'London',
    'Vatican': 'Vatican City'
};

export const EU_MEMBERS_LIST_EN = [
    'Germany', 'Austria', 'Belgium', 'Bulgaria', 'Cyprus', 'Croatia', 'Denmark',
    'Slovakia', 'Slovenia', 'Spain', 'Estonia', 'Finland', 'France', 'Greece',
    'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
    'Netherlands', 'Poland', 'Portugal', 'Czech Republic', 'Romania', 'Sweden'
];

export const EUROPE_LIST_EN = Object.keys(EUROPE_CAPITALS_EN);
