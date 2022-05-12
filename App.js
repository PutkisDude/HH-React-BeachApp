import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import BeachScreen from './src/views/BeachScreen';
import SettingScreen from './src/views/SettingScreen';
import MapScreen from './src/views/MapScreen';

import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import './src/i18n/i18n';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen() {
  const { t } = useTranslation();

  return(
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={BeachScreen} 
      options={{
        title: t('menu.home'), 
        tabBarIcon: () => (<FontAwesome5 name="umbrella-beach" size={20} color="black" />), 
        tabBarLabelStyle: {fontSize:18}
        }} 
      />
    <Tab.Screen 
      name="Settings" 
      component={SettingScreen} 
      options={{ 
        title: t('menu.settings' ), 
        tabBarIcon: () => (<Feather name="settings" size={20} color="black" />),
        tabBarLabelStyle: {fontSize: 18}
      }} 
      />
  </Tab.Navigator>
  )
}

export default function App(props) {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Beaches" 
          component={TabScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Map" component={MapScreen} options={{title: t('menu.map')}} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}