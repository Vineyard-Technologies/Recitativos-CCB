import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import Button from "../../components/Button";
import NavBar from "../components/NavBar";
import ARC from "../../assets/ARC.json";
import { ArrowFatLeft } from "phosphor-react-native";

const books = ARC.map((book: { name: string }) => book.name);

const EscolhaLivroScreen = ({ onBack, onBookPress }: { onBack: () => void; onBookPress: (bookName: string) => void }) => {
  return (
    <Container>
      <NavBar title="Escolha um livro" />
      <BookListContainer>
        <ListBorder />
        <FlatList
          data={books}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <BookItem onPress={() => onBookPress(item)}>
              <BookText>{item}</BookText>
            </BookItem>
          )}
          contentContainerStyle={{ flexGrow: 0 }}
        />
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

export default EscolhaLivroScreen;
