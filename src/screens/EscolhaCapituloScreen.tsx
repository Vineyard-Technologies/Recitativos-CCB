import React from "react";
import styled from "styled-components/native";
import Button from "../../components/Button";
import NavBar from "../components/NavBar";
import { ArrowFatLeft } from "phosphor-react-native";
import ARC from "../../assets/ARC.json";

const books = ARC.map((book: { name: string }) => book.name);

const EscolhaCapituloScreen = ({ bookName, onBack, onChapterPress }: { bookName: string; onBack: () => void; onChapterPress: (chapterIndex: number) => void }) => {

  const book = ARC.find((book: { name: string }) => book.name === bookName);
  const chaptersArray = book ? book.chapters : [];

  const chapters = [];
  for (let idx = 0; idx < chaptersArray.length; idx++) {
    const chapterTitles = chaptersArray[idx].join(" ");
    chapters.push(bookName + " " + (idx + 1) + "\n" + chapterTitles);
  }

  return (
    <Container>
      <NavBar title={`Escolha um capítulo`} />
      <BookListContainer>
        <ListBorder />
        <BookList>
          {chapters.map((chapter, idx) => (
            <BookItem key={chapter} onPress={() => onChapterPress(idx)}>
              <BookText numberOfLines={2} ellipsizeMode="tail">{chapter}</BookText>
            </BookItem>
          ))}
        </BookList>
        <ListBorder />
      </BookListContainer>
      <ButtonRow>
        <Button label="Voltar" onPress={onBack} icon={<ArrowFatLeft size={24} color="#fff" />} />
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

const BookList = styled.ScrollView`
  flex-grow: 0;
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
