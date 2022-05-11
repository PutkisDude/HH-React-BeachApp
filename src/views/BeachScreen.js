import {View, FlatList, Text} from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getKey, saveKey } from '../store/Store';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Beach from '../Components/Beach';
import helsinki from '../../beachdata/Helsinki.json'
import { ListItem } from '@rneui/base';


export default function BeachScreen( { navigation } ) {
    const { t } = useTranslation();

    const isFocused = useIsFocused();

    const [showDistance, setShowDistance] = useState();
    const [showTemp, setShowTemp] = useState();
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserLocation = async () => {
            const showDist = await getKey('settings.showDistance');
            const showTemp = await getKey('settings.showTemp');
            if (showDist === 'on') {
                await getUserLocation();
            }
            setShowDistance(showDist);
            setShowTemp(showTemp);
            setLoading(false);
        }
        loadUserLocation();
    }, [])


    useEffect(() => {
        if (isFocused){
            console.log('hello')
        const loadKeys = async () => {
            let distanceSetting = await getKey('settings.showDistance');
            setShowDistance(distanceSetting);
            if (distanceSetting == 'on') getUserLocation();

            setShowTemp(await getKey('settings.showTemp'));
            
        }
        loadKeys();
    }
    }, [isFocused])

    const getUserLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                saveKey('settings.showDistance', 'off');
                setShowDistance('off');
                Alert.alert('Permission', t('beach.noPermission'))
                return;
            }
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
            setUserLocation(location);
    }


    return( loading ? <></> :
        <View style={{flex: 1}}>
            <ListItem>
                <ListItem.Content>
                    <Text style={{fontSize: 18}}>{t('list.place')}</Text>
                </ListItem.Content>
                {showDistance == 'on' && <Text style={{fontSize: 18, paddingRight: 15}}>{t('list.distance')}</Text>}
            </ListItem>
            <FlatList
                data={helsinki}
                keyExtractor={(item) => item.id}
                renderItem={({item} ) =>
                <Beach item={item} navigation={navigation} temp={showTemp} dist={showDistance} userLocation={userLocation} />
                }
            
            />
        </View>
    )
}