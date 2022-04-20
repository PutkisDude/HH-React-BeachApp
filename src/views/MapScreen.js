
import MapView, {Marker} from "react-native-maps";
import {StyleSheet, View } from "react-native";

export default function MapScreen( {route} ) {

    return(
        <View style={StyleSheet.absoluteFillObject}>
        <MapView 
            style={StyleSheet.absoluteFillObject} 
            initialRegion={{
                    latitude: parseFloat(route.params.lat), 
                    longitude: parseFloat(route.params.lon), 
                    latitudeDelta: 0.04, 
                    longitudeDelta: 0.04
                    }
                }>
            <Marker coordinate={{ 
                latitude: parseFloat(route.params.lat), 
                longitude: parseFloat(route.params.lon) }} 
                title={route.params.name} />
        </MapView>
    </View>
    )
}