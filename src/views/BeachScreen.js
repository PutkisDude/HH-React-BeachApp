import {View, FlatList, Text} from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { getKey, saveKey } from '../store/Store';
import { useIsFocused } from '@react-navigation/native';

import Beach from '../Components/Beach';
import helsinki from '../../beachdata/Helsinki.json'


export default function BeachScreen( { navigation } ) {
    const isFocused = useIsFocused();

    const [showDistance, setShowDistance] = useState();
    const [showTemp, setShowTemp] = useState();
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadUserLocation = async () => {
            const show = await getKey('settings.showDistance');
            if (show === 'on') {
                await getUserLocation();
            }
            setShowDistance(show);

            setLoading(false);
        }
        loadUserLocation();
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

    if(loading) return <></>

    return(
        <View style={{flex: 1}}>
            <FlatList
                data={helsinki}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item} ) =>
                <Beach item={item} navigation={navigation} temp={showTemp} dist={showDistance} userLocation={userLocation} />
                }
            
            />
        </View>
    )
}