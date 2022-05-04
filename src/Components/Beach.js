import { Button, ListItem, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDistance, convertDistance } from 'geolib';
import { getKey, saveKey } from '../store/Store';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Beach(props, {navigation}) {
    const { t } = useTranslation();

    const [distance, setDistance] = useState(0);
    const [showDistance, setShowDistance] = useState('off');
    const [showWaterTemp, setShowWaterTemp] = useState('off');
    const [location, setLocation] = useState(null);
    const [tempData, setTempData] = useState();

    useEffect(async () => {

      if (showWaterTemp === 'on' && props.item.tmpin) getTemp();
    }, [showWaterTemp])
    
    useEffect(async () => {
        const show = await getKey('settings.showDistance');
        setShowDistance(show);
        const water = await getKey('settings.showTemp');
        setShowWaterTemp(water);
    })

    useEffect(async () => {
        if(showDistance === 'on') {
            (async () => {             
                  let distance = await getDistance(
                    {latitude : props.userLocation.coords.latitude , longitude : props.userLocation.coords.longitude},
                    {latitude : props.item.lat, longitude : props.item.lon}
                );
                setDistance(convertDistance(distance, 'km'));
              })();

        }

      }, [showDistance]);

      const getTemp = async () => {

        // Cache - Get data only once every 15mins
        const cacheInMinutes = 1000 * 60 * 15;
        const fetchTime =  await getKey(`cache.${props.item.id}`);
        const lastFetchTime = fetchTime ? new Date(fetchTime) : null;

        if (lastFetchTime == null || Date.now() > lastFetchTime.getTime() + cacheInMinutes) {
          fetch(props.item.url)
          .then(res => res.json())
          .then((data) => {
            if (!data || data.length == 0) throw new Error
            console.log(data);
             saveKey(`cache.${props.item.id}`, new Date().toString());
             saveKey(`data.${props.item.id}`, JSON.stringify(data.data[data.data.length-1]));
            setTempData(data);
            console.log('im not here')
          })
          .catch(error => console.log(error))
        }else {
          const data = JSON.parse(await getKey(`data.${props.item.id}`));
          setTempData(data);
        }
      }

    return (
        <ListItem
            bottomDivider
            topDivider
            onPress={() => props.navigation.navigate('Map', props.item)} 
 
        >
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 18, color: 'red'}}>{props.item.name}</ListItem.Title>
              { showWaterTemp === 'on' && props.item.tmpin && tempData && <ListItem.Subtitle style={{color: 'green', fontSize: 15}}>{t('beach.air')}: {tempData.temp_air} °C</ListItem.Subtitle>  }
              { showWaterTemp === 'on' && props.item.tmpin && tempData && <ListItem.Subtitle style={{color: 'blue', fontSize: 15}}>{t('beach.water')}: {tempData.temp_water} °C</ListItem.Subtitle>  }

              </ListItem.Content>
              { showDistance === 'on' && props.userLocation  && <Text style={{fontSize: 16}}>{t('beach.distance')}: {distance.toFixed(2)}km </Text> }
              <ListItem.Chevron />

        </ListItem>
    )
}