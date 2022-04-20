import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import { languageDetectorPlugin } from "./languageDetectorPlugin";


i18n.use(initReactI18next)
    .use(languageDetectorPlugin).init({
    fallbackLng: 'en',
    debug: true,
    compatibilityJSON: 'v3',
    supportedLngs: ["en", "fi"],
    react: {
        useSuspense: false
    },
    

    resources: {
        en : {
            translation : {
                'menu': {
                    'home' : 'Beach App',
                    'settings' : 'Settings',

                },
                'settings' : {
                    'language' : 'Language',
                    'finnish' : 'Finnish',
                    'english' : 'English',
                    'tempUnit' : 'Temperature unit',
                }

            }
        },
        fi : {
            translation : {
                'menu' : {
                    'home' : 'Rantasovellus',
                    'settings' : 'Asetukset',
                },
                'settings' : {
                    'language' : 'Kieli',
                    'finnish' : 'Suomi',
                    'english' : 'Englanti',
                    'tempUnit' : 'Lämpötila-asteikko'
                }

            }
        }
}

})

export default i18n;