import { ScrollView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@contexts/tema";
import styled from "styled-components/native";
import NavBar from "@components/NavBar";
import ListItemComponent, { ListItemProps } from "@components/ListItem";
import { Bell, Info, ShieldCheck, SignOut } from "phosphor-react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "CormorantGaramond-Bold": require("./assets/fonts/CormorantGaramond-Bold.ttf"),
    "CormorantGaramond-SemiBold": require("./assets/fonts/CormorantGaramond-SemiBold.ttf"),
    "CormorantGaramond-Regular": require("./assets/fonts/CormorantGaramond-Regular.ttf"),
    "CormorantGaramond-Medium": require("./assets/fonts/CormorantGaramond-Medium.ttf"),
  });

  const list = [
    {
      type: "Icon",
      title: "Genesis 1:1",
      description: "No princípio, Deus criou os céus e a terra.",
    },
    {
      type: "Icon",
      title: "Privacidade e segurança",
      leftIcon: <ShieldCheck />,
      hasRightIcon: true,
    },
    {
      type: "Icon",
      title: "Sobre este app",
      leftIcon: <Info />,
      hasRightIcon: true,
    },
  ] as ListItemProps[];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar barStyle="default" />
      <Container>
        <NavBar title="Meus Recitativos" />
        <ScrollView>
          {list.map((item, index) => (
            <ListItemComponent key={index} {...item} />
          ))}
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.NEUTRAL_LIGHT_LIGHTEST};
`;
