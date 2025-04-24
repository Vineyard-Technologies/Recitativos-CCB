import {StatusBar} from "react-native";
import {useFonts} from "expo-font";
import {ThemeProvider} from "@contexts/tema";
import styled from "styled-components/native";
import NavBar from "@components/NavBar";

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
			<StatusBar barStyle="default"/>
			<Container>
				<NavBar title='Meus Recitativos'/>
			</Container>
		</ThemeProvider>
	);
}

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.NEUTRAL_LIGHT_LIGHTEST};
`;
