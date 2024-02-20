import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Home';
import {Editor} from './Editor/Editor';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Editor">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
