import {View, Text, StyleSheet} from 'react-native';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {saveKey, getKey} from '../store/Store';
import i18n from '../i18n/i18n';

export default function SettingScreen() {
    const { t } = useTranslation();

    const [check1, setCheck1] = useState();
    const [language, setLanguage] = useState(null);
    const [distance, setDistance] = useState(null); // Async-storage supports only strings, tho could parse to boolean
    const [showTemps, setShowTemps] = useState(null); // Async-storage supports only strings, tho could parse to boolean



    useEffect( async () => {
        const lang = await getKey('settings.lang');
        setLanguage(lang);

        const dist = await getKey('settings.showDistance');
        setDistance(dist);

        const shTemp = await getKey('settings.showTemp')
        setShowTemps(shTemp);

        const test = await getKey('settings.showTest')
        setCheck1(test)
    }, []);


    const changeLanguage = (lang) => {
        setLanguage(lang);
        saveKey('settings.lang', lang);
        i18n.changeLanguage(lang);
    }

    const setShowDistance = (bool) => {
        setDistance(bool);
        saveKey('settings.showDistance', bool);
    }
    
    const setShowTemp = (bool) => {
        setShowTemps(bool);
        saveKey('settings.showTemp', bool);
    }


    return(
        <View style={styles.container}>

            <Text>{t('settings.language')}</Text>
            <Picker
                selectedValue={language}
                onValueChange={(itemValue) => changeLanguage(itemValue)}
            >
                <Picker.Item label={t('settings.english')} value="en" />
                <Picker.Item label={t('settings.finnish')} value="fi" />
            </Picker>
            <Text>{t('settings.distance')}</Text>
            <Picker 
                selectedValue={distance}
                onValueChange={(itemValue) => setShowDistance(itemValue)}
            >
                <Picker.Item label={t('settings.show')} value="on" />
                <Picker.Item label={t('settings.hide')} value="off" />
            </Picker>
            <Text>{t('settings.showWater')}</Text>
            <Picker
                selectedValue={showTemps}
                onValueChange={(itemValue) => setShowTemp(itemValue)}
            >
                <Picker.Item label={t('settings.show')} value="on" />
                <Picker.Item label={t('settings.hide')} value="off" />
            </Picker>

            <Text>{t('settings.cities')}</Text>

            <CheckBox
              center
              title="Helsinki"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />
            <CheckBox
              center
              title="Espoo"
              checked={check1}
              onPress={() => setCheck1(!check1)}
            />    
            <CheckBox
              center
              title="Vantaa"
              checked={check1}
              onPress={() => setCheck1(!check1)}
          />

        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        padding: 10, 
        paddingTop: 50
    },

});