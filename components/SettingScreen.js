import {View, Text, Switch} from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function SettingScreen() {

    const [isEnabled, setEnabled] = useState(false);
    const [tempUnit, setTempUnit] = useState('c');
    const [language, setLanguage] = useState('fin');

    return(
        <View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "" : "#f4f3f4"}
                onValueChange={value => setEnabled(value)}
                value={isEnabled}
      />
            <Text>Language</Text>
            <Picker
                selectedValue={language}
                onValueChange={(itemValue, itemIndex) =>
                setLanguage(itemValue)
            }>
                <Picker.Item label="Finnish" value="fin" />
                <Picker.Item label="English" value="eng" />
            </Picker>

            <Text>Temp Unit</Text>
            <Picker
                selectedValue={tempUnit}
                onValueChange={(itemValue) =>
                setTempUnit(itemValue)
            }>
                <Picker.Item label="Celcius" value="c" />
                <Picker.Item label="Fahrenheit" value="f" />
            </Picker>
        </View>
    )
}