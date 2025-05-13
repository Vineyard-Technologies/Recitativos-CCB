import React, { useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider } from "@contexts/tema";
import styled from "styled-components/native";
import NavBar from "@components/NavBar";
import ListItemComponent, { ListItemProps } from "@components/ListItem";
import { Bell, Info, ShieldCheck, Gear, Plus } from "phosphor-react-native";
import Button from "./components/Button";
import EscolhaLivroScreen from "./src/screens/EscolhaLivroScreen";
import EscolhaCapituloScreen from "./src/screens/EscolhaCapituloScreen";
import EscolhaVersosScreen from "./src/screens/EscolhaVersosScreen";

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
      hasRightIcon: true,
    },
    // TODO: Adicione esses itens às configurações
    // {
    //   type: "Icon",
    //   title: "Privacidade e segurança",
    //   leftIcon: <ShieldCheck />,
    //   hasRightIcon: true,
    // },
    // {
    //   type: "Icon",
    //   title: "Sobre este app",
    //   leftIcon: <Info />,
    //   hasRightIcon: true,
    // },
  ] as ListItemProps[];

  const [screen, setScreen] = useState<'main' | 'escolhaLivro' | 'escolhaCapitulo' | 'escolhaVersos'>("main");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar barStyle="default" />
      <Container>
        {screen === "main" ? (
          <>
            <NavBar title="Meus Recitativos" />
            <ScrollView>
              {list.map((item, index) => (
                <ListItemComponent key={index} {...item} />
              ))}
            </ScrollView>
            <Button
              label="Configurações"
              icon={<Gear color="#fff" size={20} />}
              position="left"
              onPress={() => {}}
            />
            <Button
              label="Adicionar Verso"
              icon={<Plus color="#fff" size={20} />}
              position="right"
              onPress={() => setScreen('escolhaLivro')}
            />
          </>
        ) : screen === "escolhaLivro" ? (
          <EscolhaLivroScreen
            onBack={() => setScreen('main')}
            onBookPress={(bookName: string) => {
              setSelectedBook(bookName);
              setScreen('escolhaCapitulo');
            }}
          />
        ) : screen === "escolhaCapitulo" && selectedBook ? (
          <EscolhaCapituloScreen
            bookName={selectedBook}
            onBack={() => setScreen('escolhaLivro')}
            onChapterPress={(chapterIndex: number) => {
              setSelectedChapter(chapterIndex);
              setScreen('escolhaVersos');
            }}
          />
        ) : screen === "escolhaVersos" && selectedBook !== null && selectedChapter !== null ? (
          <EscolhaVersosScreen
            bookName={selectedBook}
            chapterIndex={selectedChapter}
            onBack={() => setScreen('escolhaCapitulo')}
          />
        ) : null}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;
