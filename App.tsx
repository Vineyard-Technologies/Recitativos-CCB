import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@contexts/tema";
import { RecitativosProvider } from "@contexts/RecitativosContext";
import styled from "styled-components/native";
import AppNavigator from "./AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    "CormorantGaramond-Bold": require("./assets/fonts/CormorantGaramond-Bold.ttf"),
    "CormorantGaramond-SemiBold": require("./assets/fonts/CormorantGaramond-SemiBold.ttf"),
    "CormorantGaramond-Regular": require("./assets/fonts/CormorantGaramond-Regular.ttf"),
    "CormorantGaramond-Medium": require("./assets/fonts/CormorantGaramond-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RecitativosProvider>
        <StatusBar barStyle="default" />
        <Container>
          <AppNavigator />
        </Container>
      </RecitativosProvider>
    </ThemeProvider>
  );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;
