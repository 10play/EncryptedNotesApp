import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Home';
import {Editor} from './Editor/Editor';
import {useLocalEditorSrc} from './utils/useLocalEditorSrc';
import {RootStackParamList, navigationRef} from './utils/navigation';
import {ThemeProvider} from 'styled-components';
import {DarkNavigationTheme, themes} from './theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  useLocalEditorSrc();

  return (
    <ThemeProvider theme={themeMode === 'light' ? themes.light : themes.dark}>
      <NavigationContainer
        ref={navigationRef}
        theme={themeMode === 'dark' ? DarkNavigationTheme : undefined}>
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
    </ThemeProvider>
  );
};

export default App;
