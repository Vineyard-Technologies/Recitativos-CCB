import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import Button from "@components/Button";
import NavBar from "@components/NavBar";
import ARC from "@assets/ARC.json";
import { ArrowFatLeft } from "phosphor-react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

const books = ARC.map((book: { name: string }) => book.name);

const EscolhaLivroScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const handleBack = () => navigation.goBack();
  const handleBookPress = (bookName: string) => navigation.navigate('EscolhaCapitulo', { bookName });
  return (
    <Container>
      <NavBar 
        title="Escolha um livro" 
        leftIcon={<ArrowFatLeft size={24} color="#fff" />} 
        leftOnPress={handleBack}
      />
      <BookListContainer>
        <ListBorder />
        <FlatList
          data={books}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <BookItem onPress={() => handleBookPress(item)}>
              <BookText>{item}</BookText>
            </BookItem>
          )}
          contentContainerStyle={{ flexGrow: 0 }}
        />
      </BookListContainer>
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

const ListBorder = styled.View`
  height: 3px;
  background-color: #000;
  width: 100%;
`;

export default EscolhaLivroScreen;
