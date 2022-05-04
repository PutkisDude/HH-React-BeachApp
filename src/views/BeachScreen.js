import {View, FlatList} from 'react-native';
import Beach from '../Components/Beach';
import {useEffect} from 'react';

import data from '../../beachdata/uiras2_v1.json';
import helsinki from '../../beachdata/Helsinki.json'

export default function BeachScreen( { navigation } ) {

    return(
        <View style={{flex: 1}}>
            <FlatList
                data={helsinki}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item} ) =>
                <Beach item={item} navigation={navigation} />
                }
            
            />
        </View>
    )
}