import React from "react";
import styled from "styled-components/native";
import Button from "@components/Button";
import NavBar from "@components/NavBar";
import { ArrowFatLeft } from "phosphor-react-native";
import ARC from "@assets/ARC.json";
import { FlatList } from "react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';

const EscolhaCapituloScreen = () => {
  const route = useRoute<RouteProp<Record<string, { bookName?: string }>, string>>();
  const { bookName } = route.params || {};
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();

  const book = ARC.find((book: { name: string }) => book.name === bookName);
  const chaptersArray = book ? book.chapters : [];

  const chapters = [];
  for (let idx = 0; idx < chaptersArray.length; idx++) {
    let previewVerse = "";
    let entryIdx = 0;
    while (
      entryIdx < chaptersArray[idx].length &&
      previewVerse.length < 50
    ) {
      if (previewVerse.length > 0) previewVerse += " ";
      previewVerse += chaptersArray[idx][entryIdx];
      entryIdx++;
    }
    chapters.push(bookName + " " + (idx + 1) + "\n" + previewVerse);
  }

  const handleBack = () => navigation.goBack();
  const handleChapterPress = (chapterIndex: number) => navigation.navigate('EscolhaVersos', { bookName, chapterIndex });

  return (
    <Container>
      <NavBar title={`Escolha um capítulo`} />
      <BookListContainer>
        <ListBorder />
        <FlatList
          data={chapters}
          keyExtractor={(item, idx) => `${bookName}-${idx}`}
          renderItem={({ item, index }) => (
            <BookItem key={item} onPress={() => handleChapterPress(index)}>
              <BookText numberOfLines={2} ellipsizeMode="tail">{item}</BookText>
            </BookItem>
          )}
          contentContainerStyle={{ flexGrow: 0 }}
        />
        <ListBorder />
      </BookListContainer>
      <ButtonRow>
        <Button label="Voltar" onPress={handleBack} icon={<ArrowFatLeft size={24} color="#fff" />} />
      </ButtonRow>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;

const BookListContainer = styled.View`
  flex: 1;
  margin-top: 16px;
  margin-bottom: 96px;
`;

const BookItem = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_LIGHT_LIGHT};
  align-items: center;
`;

const BookText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  text-align: center;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  left: 24px;
  right: 24px;
`;

const ListBorder = styled.View`
  height: 3px;
  background-color: #000;
  width: 100%;
`;

export default EscolhaCapituloScreen;
