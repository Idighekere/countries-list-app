import React, { useState, useEffect } from 'react';
import RootNavigator from './src/navigation'
import { ThemeProvider } from '@/context/ThemeContext'
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// import AppLoading from 'expo-app-loading';
import { loadFonts } from './font';
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {

      try {
        await loadFonts();

      } catch (error) {
        console.warn(error)
      } finally {

        setAppIsReady(true);
      }
    };

    prepare();
  }, []);


  useEffect(() => {
    if (appIsReady) {
      const hideSplashScreen = async () => {
        await SplashScreen.hideAsync()
      }
      hideSplashScreen()
    }



  }, [appIsReady])


  if (!appIsReady) {
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
