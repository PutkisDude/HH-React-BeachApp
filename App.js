import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';

import BeachScreen from './components/BeachScreen';
import SettingScreen from './components/SettingScreen';
import MapScreen from './components/MapScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen() {
  return(
  <Tab.Navigator>
    <Tab.Screen name="Home" component={BeachScreen} />
    <Tab.Screen name="Settings" component={SettingScreen} />
  </Tab.Navigator>
  )
}

export default function App() {
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