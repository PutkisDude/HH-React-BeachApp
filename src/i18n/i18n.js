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
                    'language' : 'Language',
                    'finnish' : 'Finnish',
                    'english' : 'English',
                    'tempUnit' : 'Temperature unit',
                },
                'beach' : {
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
                    'language' : 'Kieli',
                    'finnish' : 'Suomi',
                    'english' : 'Englanti',
                    'tempUnit' : 'Lämpötila-asteikko'
                },
                'beach' : {
                    'distance' : 'Etäisyys'
                }

            }
        }
},

})

export default i18n;