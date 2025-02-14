import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Axiforma': require('./assets/fonts/Axiforma.ttf'),
    'Axiforma Bold': require('./assets/fonts/Axiforma-Bold.ttf'),
  });
};
