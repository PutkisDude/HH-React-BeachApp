import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import BeachScreen from './src/views/BeachScreen';
import SettingScreen from './src/views/SettingScreen';
import MapScreen from './src/views/MapScreen';

import i18n from './src/i18n/i18n';


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

export default function App(props) {
  return (
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

  );
}