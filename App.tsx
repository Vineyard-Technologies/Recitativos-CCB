import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'CormorantGaramond-SemiBold': require('./assets/fonts/CormorantGaramond-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.header}>Meus Recitativos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 10,
    fontSize: 36,
    fontFamily: 'CormorantGaramond-SemiBold',
  },
});
