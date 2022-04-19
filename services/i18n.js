import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',

    resources: {
        en : {
            translation : {
                'Language' : 'Language',
                'Finnish' : 'Finnish',
                'English' : 'English',
                'Temperature unit' : 'Temperature unit',
            }
        },
        fi : {
            translation : {
                'Language' : 'Kieli',
                'Finnish' : 'Suomi',
                'English' : 'Englanti',
                'Temperature unit' : 'Lämpötila-asteikko'
            }
        }
}

})

export default i18n;