import { ListItem, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDistance, convertDistance } from 'geolib';
import { getKey, saveKey } from '../store/Store';

export default function Beach(props) {
    const { t } = useTranslation();
    const [distance, setDistance] = useState();
    const [loading, setLoading] = useState(true);
    const [tempData, setTempData] = useState();

    useEffect(() => {
      setLoading(true);
      const load = async () => {
        const showDist = await getKey('settings.showDistance');
        const showTemp = await getKey('settings.showTemp');
        if (showDist === 'on') {
          await getDist().catch(e => console.log(e));
        }      
        if(showTemp === 'on' && props.item.tmpin){
          await getTemperature().then(setLoading(false));
        }else{
          setLoading(false);
        }
    }
    load();
  },[props.temp, props.dist, props.userLocation])
    
      const getDist = async () => {
        let distance = getDistance(
          {latitude : props.userLocation.coords.latitude , longitude : props.userLocation.coords.longitude},
          {latitude : props.item.lat, longitude : props.item.lon}
        );
        if(distance > 1000){
          distance = convertDistance(distance, 'km').toFixed(2);
          setDistance(distance + ' km');
        }else{
          distance = distance + ' m'
          setDistance(distance);
        }
    }

      const getTemperature = async () => {
        // Cache - Get data only once every 15mins
        const cacheInMinutes = 1000 * 60 * 155;
        const fetchTime =  await getKey(`cache.${props.item.id}`);
        const lastFetchTime = fetchTime ? new Date(fetchTime) : null;
        // if(1 == 1) { // Testing-purposes
        if (lastFetchTime == null || Date.now() > lastFetchTime.getTime() + cacheInMinutes) {
          await fetch(props.item.url)
          .then(res => res.json())
          .then((data) => {
            if (!data || data.length == 0) throw new Error
            let newestTemps = data.data[data.data.length-1];
            saveKey(`cache.${props.item.id}`, new Date().toString());
            saveKey(`data.${props.item.id}`, JSON.stringify(newestTemps));
            setTempData(newestTemps);
            console.log(props.item.id + ': tempdata fetched from online')
          })
          .catch(error => console.log(error))
        }else {
          const data = JSON.parse(await getKey(`data.${props.item.id}`));
          setTempData(data);
          console.log(props.item.id + ' tempdata fetched from cache')
        }
      }

    return ( loading ? <></> :
        <ListItem
            bottomDivider
            topDivider
            onPress={() => props.navigation.navigate('Map', props.item)} 
          >
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 18, color: 'red'}}>{props.item.name}</ListItem.Title>
                {tempData && props.temp == 'on' && props.item.tmpin &&  tempData.temp_air != 'undefined' && tempData.temp_water != 'undefined' && (
                  <>
                    <ListItem.Subtitle style={{color: 'green', fontSize: 15}}>{t('beach.air')}: {tempData.temp_air} °C</ListItem.Subtitle>
                    <ListItem.Subtitle style={{color: 'blue', fontSize: 15}}>{t('beach.water')}: {tempData.temp_water} °C</ListItem.Subtitle>
                  </>)
                }
              </ListItem.Content>
              { distance && props.dist == 'on' && <Text style={{fontSize: 16}}> {distance} </Text> }
              <ListItem.Chevron />

        </ListItem>
    )
}
