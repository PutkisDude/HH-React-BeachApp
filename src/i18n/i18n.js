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
                    'showWater' : 'Show water temperature (use network)',
                    'cities' : 'Cities to show'
                },
                'beach' : {
                    'noPermission' : 'Need permission to location. Distance setting turned off',
                    'distance' : 'Distance'
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
                    'showWater' : 'Näytä veden lämpötilat (käyttää kaistaa)',
                    'cities' : 'Näytettävät kaupungit'


                },
                'beach' : {
                    'noPermission' : 'Ei lupaa sijaintiin. Etäisyyttä ei voi näyttää.',
                    'distance' : 'Etäisyys'
                }

            }
        }
},

})

export default i18n;