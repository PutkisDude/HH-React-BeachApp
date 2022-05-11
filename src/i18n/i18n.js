import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import { languageDetectorPlugin } from "./languageDetectorPlugin";


i18n.use(initReactI18next)
    .use(languageDetectorPlugin).init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    supportedLngs: ["en", "fi"],
    react: {
        useSuspense: false, // crash without
        
    },
    interpolation: {
        escapeValue: false, // against xss - react doesn't need this
    },
    
    resources: {
        en : {
            translation : {
                'menu': {
                    'home' : 'Beach App',
                    'settings' : 'Settings',
                    'map' : 'Map'
                },
                'settings' : {
                    'show' : 'Show',
                    'hide' : 'Don\'t show',
                    'dontShow' : 'Hide',
                    'distance' : 'Show distance (Require permission)',
                    'language' : 'Language',
                    'finnish' : 'Finnish',
                    'english' : 'English',
                    'tempUnit' : 'Temperature unit',
                    'showWater' : 'Show beach temperatures (use network)',
                    'cities' : 'Cities to show'
                },
                'list' : {
                    'place' : 'Place',
                    'distance' : 'Distance'
                },
                'beach' : {
                    'noPermission' : 'Need permission to location. Distance setting turned off',
                    'water' : 'Water',
                    'air' : 'Air',
                }
            }
        },
        fi : {
            translation : {
                'menu' : {
                    'home' : 'Rantasovellus',
                    'settings' : 'Asetukset',
                    'map' : 'Kartta'
                },
                'settings' : {
                    'show' : 'Näytä',
                    'hide' : 'Älä näytä',
                    'distance' : 'Näytä etäisyydet (vaatii luvan sijainnille)',
                    'language' : 'Kieli',
                    'finnish' : 'Suomi',
                    'english' : 'Englanti',
                    'tempUnit' : 'Lämpötila-asteikko',
                    'showWater' : 'Näytä rannan lämpötilat (käyttää mobiilikaistaa)',
                    'cities' : 'Näytettävät kaupungit'
                },
                'list' : {
                    'place' : 'Paikka',
                    'distance' : 'Etäisyys'
                },
                'beach' : {
                    'noPermission' : 'Ei lupaa sijaintiin. Etäisyyttä ei voi näyttää.',
                    'water' : 'Vesi',
                    'air' : 'Ilma'
                }
            }
        }
},

})

export default i18n;