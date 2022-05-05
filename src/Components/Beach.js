import { ListItem, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDistance, convertDistance } from 'geolib';
import { getKey, saveKey } from '../store/Store';

export default function Beach(props) {
    const { t } = useTranslation();

    const [distance, setDistance] = useState();
    const [tempData, setTempData] = useState();
    const [tempLoaded, setTempLoaded] = useState(false);
    const [distLoaded, setDistLoaded] = useState(false);

    useEffect(() => {

      const load = async () => {
        const showDist = await getKey('settings.showDistance');
        if (showDist === 'on') {
          await getDist().catch(e => console.log(e));
        }
        setDistLoaded(true);
        const showTemp = await getKey('settings.showTemp');
        if(showTemp === 'on' && props.item.tmpin){
          await getTemp();
        }
        setTempLoaded(true);
    }
    load();
    },[])

      const getDist = async () => {
        let distance = getDistance(
          {latitude : props.userLocation.coords.latitude , longitude : props.userLocation.coords.longitude},
          {latitude : props.item.lat, longitude : props.item.lon}
        );
        setDistance(convertDistance(distance, 'km'));
    }

      const getTemp = async () => {

        // Cache - Get data only once every 15mins
        const cacheInMinutes = 1000 * 60 * 120;
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
          })
          .catch(error => console.log(error))
        }else {
          const data = JSON.parse(await getKey(`data.${props.item.id}`));
          setTempData(data);
        }
      }


    if(!distLoaded || !tempLoaded) return <></>

    return (
        <ListItem
            bottomDivider
            topDivider
            onPress={() => props.navigation.navigate('Map', props.item)} 
 
        >
              <ListItem.Content>
                <ListItem.Title style={{fontSize: 18, color: 'red'}}>{props.item.name}</ListItem.Title>
              { props.temp === 'on' && props.item.tmpin && tempData ? <ListItem.Subtitle style={{color: 'green', fontSize: 15}}>{t('beach.air')}: {tempData.temp_air} °C</ListItem.Subtitle> : null }
              { props.temp === 'on' && props.item.tmpin && tempData ? <ListItem.Subtitle style={{color: 'blue', fontSize: 15}}>{t('beach.water')}: {tempData.temp_water} °C</ListItem.Subtitle> : null }

              </ListItem.Content>
              { props.dist === 'on'  ? <Text style={{fontSize: 16}}>{t('beach.distance')}: {distance.toFixed(2)}km </Text> : null }
              <ListItem.Chevron />

        </ListItem>
    )
}