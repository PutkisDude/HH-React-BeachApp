import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

import {useTranslation} from 'react-i18next';

import BeachScreen from './BeachScreen';
import SettingScreen from './SettingScreen';
import MapScreen from './MapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen() {
    const { t } = useTranslation();

    return(
        <Tab.Navigator>
          <Tab.Screen name="Home" component={BeachScreen} options={{title: t('menu.home')}} />
          <Tab.Screen name="Settings" component={SettingScreen} options={{ title: t('menu.settings' )} } />
        </Tab.Navigator>
    )
  }


export default function Navigation() {

    return(
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Beaches" 
            component={TabScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}