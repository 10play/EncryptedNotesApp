import React, {createContext, useState, useContext} from 'react';
import {ThemeProvider as NativeThemeProvider} from 'styled-components/native';
import {themes} from './theme';
// Define types for theme and theme context
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a context for managing themes
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to consume the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return [context.theme, context.toggleTheme] as const;
};

// Provider component to wrap your app and provide the theme context
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [themeMode, setTheme] = useState<Theme>('light'); // Default theme is 'light'

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme: themeMode, toggleTheme}}>
      <NativeThemeProvider
        theme={themeMode === 'light' ? themes.light : themes.dark}>
        {children}
      </NativeThemeProvider>
    </ThemeContext.Provider>
  );
};
