import {View, Text, StyleSheet} from 'react-native';
import { CheckBox } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {saveKey, getKey} from '../store/Store';
import i18n from '../i18n/i18n';
import { useIsFocused } from '@react-navigation/native';

export default function SettingScreen() {
    const { t } = useTranslation();

    const [check1, setCheck1] = useState(false);
    const [language, setLanguage] = useState('en');
    const [distance, setDistance] = useState('off'); // Async-storage supports only strings, could parse with false
    const [showWater, setShowWater] = useState('off'); // Async-storage supports only strings, could parse with false

    const isFocused = useIsFocused();


    useEffect( async () => {
        const lang = await getKey('settings.lang');
        setLanguage(lang);

        const dist = await getKey('settings.showDistance');
        setDistance(dist);
    }, [isFocused]);


    const changeLanguage = (lang) => {
        setLanguage(lang);
        saveKey('settings.lang', lang);
        i18n.changeLanguage(lang);
    }

    const setShowDistance = (bool) => {
        setDistance(bool);
        saveKey('settings.showDistance', bool);
    }
    
    const setShowWaterTemp = (bool) => {
        setShowWater(bool);
        saveKey('settings.showWater', bool);
    }


    return(
        <View style={styles.container}>

            <Text>{t('settings.language')}</Text>
            <Picker
                selectedValue={language}
                onValueChange={(itemValue) => changeLanguage(itemValue)}
            >
                <Picker.Item label={t('settings.finnish')} value="fi" />
                <Picker.Item label={t('settings.english')} value="en" />
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
                selectedValue={showWater}
                onValueChange={(itemValue) => setShowWaterTemp(itemValue)}
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