import { Button, ListItem, Text } from '@rneui/base';
import { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';
import {getDistance, convertDistance} from 'geolib';

export default function Beach(props, {navigation}) {
    const { t } = useTranslation();

    const [distance, setDistance] = useState(0);

    useEffect(() => {
        let distance = getDistance(
            {latitude : 60.252260 , longitude : 24.931120},
            {latitude : props.item.lat, longitude : props.item.lon}
        );
        setDistance(convertDistance(distance, 'km'));

    })

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
              <Text>{t('beach.distance')}: {distance.toFixed(2)}km </Text>
              <ListItem.Chevron />

        </ListItem>
    )
}