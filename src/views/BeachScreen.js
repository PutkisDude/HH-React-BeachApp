import {View, FlatList, Text} from 'react-native';
import Beach from '../Components/Beach';
import {useEffect, useState} from 'react';
import { getKey, saveKey } from '../store/Store';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';

import helsinki from '../../beachdata/Helsinki.json'

export default function BeachScreen( { navigation } ) {

    const [userLocation, setUserLocation] = useState();
    const [showDistance, setShowDistance] = useState('off');
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();


    useEffect(async () => {
        const show = await getKey('settings.showDistance');
        setShowDistance(show);
    }, [isFocused]);

    useEffect(async () => {
        if(showDistance === 'on') {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    saveKey('settings.showDistance', 'off');
                    setShowDistance('off');
                    Alert.alert('Permission', t('beach.noPermission'))
                  return;
                }
                let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
                setUserLocation(location);
                setLoading(false);
              })();
        }else{
            setLoading(false);
        }
      }, [showDistance]);

      if(!loading){
        return(
            <View style={{flex: 1}}>
                <FlatList
                    data={helsinki}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item} ) =>
                    <Beach item={item} navigation={navigation} userLocation={userLocation} />
                    }
                />
            </View>
        )
      }else{
          return <><Text>Loading</Text></>
      }

}