import {View, Text} from 'react-native';
import { Switch, CheckBox } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {saveKey, getKey} from '../store/Store';
import i18n from '../i18n/i18n';

export default function SettingScreen() {
    const { t } = useTranslation();

    const [check1, setCheck1] = useState(false);
    const [tempUnit, setTempUnit] = useState('c');
    const [language, setLanguage] = useState('en');
    const [checked, setChecked] = useState(false);
    const [distance, setDistance] = useState('off'); // Async-storage supports only strings, could parse with false

    useEffect( async () => {
        const lang = await getKey('settings.lang');
        setLanguage(lang);

        const dist = await getKey('settings.showDistance');
        setDistance(dist);
    }, []);


    const changeLanguage = (lang) => {
        setLanguage(lang);
        saveKey('settings.lang', lang);
        i18n.changeLanguage(lang);
    }

    const changeTempUnit = (temp) => {
        setTempUnit(temp);
        saveKey('settings.temp', temp);
    }

    const setShowDistance = (bool) => {
        setDistance(bool);
        saveKey('settings.showDistance', bool);
    }


    return(
        <View>

            <Switch
               value={checked}
               onValueChange={(value) => setChecked(value)}
             />

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

            <Text>{t('settings.tempUnit')}</Text>
            <Picker
                selectedValue={tempUnit}
                onValueChange={(itemValue) => changeTempUnit(itemValue)
            }>
                <Picker.Item label="Celcius" value="c" />
                <Picker.Item label="Fahrenheit" value="f" />
            </Picker>

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