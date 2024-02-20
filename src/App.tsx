import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Home';
import {Editor} from './Editor/Editor';
import {useLocalEditorSrc} from './utils/useLocalEditorSrc';
import {RootStackParamList, navigationRef} from './utils/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useLocalEditorSrc();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          // Don't show header on editor route
          headerShown: route.name === 'Editor' ? false : true,
        })}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
