import * as Localization from "expo-localization";
import {saveKey, getKey} from '../store/Store';
const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  detect: callback => { 
    try {
      getKey(STORE_LANGUAGE_KEY).then((language) => {
        if(language) {
          return callback(language)
        }else{
          return callback(Localization.locale.slice("-")[0]);
        }
      })
    }catch(e){console.error(e)}
  },
  cacheUserLanguage: () => {
    try {
      saveKey(STORE_LANGUAGE_KEY, language)
    }catch(e){

    }
  },
  init: () => {},

};

module.exports = { languageDetectorPlugin };
