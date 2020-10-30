import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './screens/add'
import ListScreen from './screens/list'
import { Provider as PaperProvider } from 'react-native-paper';
const Tab = createBottomTabNavigator();
const App = () => {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Add" component={AddScreen}  />
          <Tab.Screen name="Settings" component={ListScreen} />
        </Tab.Navigator>
    </NavigationContainer>
   </PaperProvider>
  )
}
export default App;