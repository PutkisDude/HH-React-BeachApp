import { Button, ListItem, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDistance, convertDistance } from 'geolib';
import { getKey } from '../store/Store';
import * as Location from 'expo-location';


export default function Beach(props, {navigation}) {
    const { t } = useTranslation();

    const [distance, setDistance] = useState(0);
    const [showDistance, setShowDistance] = useState('off');
    const [location, setLocation] = useState(null);
    

    useEffect(async () => {

        const show = await getKey('settings.showDistance');
        setShowDistance(show);
        console.log(show);

        if(show === 'on') {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('no permission')
                  return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);


                  let distance = await getDistance(
                    {latitude : 60.252260 , longitude : 24.931120},
                    {latitude : props.item.lat, longitude : props.item.lon}
                );
                setDistance(convertDistance(distance, 'km'));

              })();


        }

      }, []);

/*
    useEffect(() => {
        let distance = getDistance(
            {latitude : 60.252260 , longitude : 24.931120},
            {latitude : props.item.lat, longitude : props.item.lon}
        );
        setDistance(convertDistance(distance, 'km'));

    })
    */

    return (
        <ListItem
            bottomDivider
            topDivider
            onPress={() => props.navigation.navigate('Map', props.item)} 
 
        >
              <ListItem.Content>
                <ListItem.Title>{props.item.name}</ListItem.Title>
                <ListItem.Subtitle>Water temp: ?</ListItem.Subtitle>
              </ListItem.Content>
              { showDistance === 'on' ? <Text>{t('beach.distance')}: {distance.toFixed(2)}km </Text> : null }
              <ListItem.Chevron />

        </ListItem>
    )
}