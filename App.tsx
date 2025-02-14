import React, { useState, useEffect } from 'react';
import RootNavigator from './src/navigation'
import { ThemeProvider } from '@/context/ThemeContext'
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// import AppLoading from 'expo-app-loading';
import { loadFonts } from './font';
SplashScreen.preventAutoHideAsync();

const App = () => {
   const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsyncFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsyncFonts();
  }, []);

   if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <ThemeProvider>

      <RootNavigator />
    </ThemeProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App
