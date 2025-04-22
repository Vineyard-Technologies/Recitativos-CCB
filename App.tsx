import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  console.log("hello world");
  
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {}}
        activeOpacity={0.7}
      >
        <Image 
          source={require('./src/components/plus-solid.png')} 
          style={[styles.addIcon, { tintColor: '#00FF00', alignSelf: 'center' }]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 10,
    fontSize: 36,
    fontFamily: 'CormorantGaramond-SemiBold',
  },
  addButton: {
    position: 'absolute',
    top: '90%',
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});