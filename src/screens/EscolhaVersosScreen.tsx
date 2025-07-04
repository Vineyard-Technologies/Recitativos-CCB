import React from "react";
import styled from "styled-components/native";
import Button from "@components/Button";
import NavBar from "@components/NavBar";
import { ArrowFatLeft, ArrowFatRight, Check, Checks } from "phosphor-react-native";
import ARC from "@assets/ARC.json";
import { FlatList, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useRecitativos } from "@contexts/RecitativosContext";

const EscolhaVersosScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const route = useRoute<RouteProp<Record<string, { bookName?: string; chapterIndex?: number }>, string>>();
  const { recitativos, addRecitativo } = useRecitativos();
  const { bookName, chapterIndex } = route.params || {};

  const book = ARC.find((book: { name: string }) => book.name === bookName);
  const chapterVerses = (book && chapterIndex !== undefined && book.chapters[chapterIndex]) ? book.chapters[chapterIndex] : [];
  const [checked, setChecked] = React.useState<Set<number>>(new Set());

  const allSelected = checked.size === chapterVerses.length && chapterVerses.length > 0;
  const handleSelectAll = () => {
    if (allSelected) {
      setChecked(new Set());
    } else {
      setChecked(new Set(chapterVerses.map((_: string, idx: number) => idx)));
    }
  };

  const handlePress = (idx: number) => {
    setChecked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const handleBack = () => navigation.goBack();

  const handleDecorar = () => {
    if (!bookName || chapterIndex === undefined) return;
    if (checked.size === 0) return;
    // Compose title like Genesis 1:1-3
    const sorted = Array.from(checked).sort((a, b) => a - b);
    const first = sorted[0] + 1;
    const last = sorted[sorted.length - 1] + 1;
    const title = sorted.length === 1
      ? `${bookName} ${chapterIndex + 1}:${first}`
      : `${bookName} ${chapterIndex + 1}:${first}-${last}`;

    const isDuplicate = recitativos.some(r => r.title === title);
    if (isDuplicate) {
      Alert.alert("Seleção Duplicada", "Esta seleção já está na sua lista de versos.");
      return;
    }

    const verses = sorted.map(idx => chapterVerses[idx]);
    addRecitativo({ title, verses });
    navigation.navigate('Decorar', { title, verses });
  };

  return (
    <Container>
      <NavBar title={`Escolha um verso`} />
      <BookListContainer>
        <ListBorder />
        <FlatList
          data={chapterVerses}
          keyExtractor={(_, idx) => `${bookName}-${chapterIndex}-${idx}`}
          renderItem={({ item: verse, index: idx }) => {
            const reference = `${bookName ?? ''} ${chapterIndex !== undefined ? chapterIndex + 1 : ''}:${idx + 1}`;
            return (
              <BookItem
                key={idx}
                onPress={() => handlePress(idx)}
                checked={checked.has(idx)}
              >
                <BookText ellipsizeMode="tail">
                  {reference}
                  {checked.has(idx) && (
                    <CheckBoxInline>
                      <Check size={20} color="#2e7d32" weight="bold" />
                    </CheckBoxInline>
                  )}
                  {"\n"}
                  {verse}
                </BookText>
              </BookItem>
            );
          }}
          contentContainerStyle={{ flexGrow: 0 }}
        />
        <ListBorder />
      </BookListContainer>
      <ButtonRow>
        <BottomButton>
          <Button label="Voltar" onPress={handleBack} icon={<ArrowFatLeft size={24} color="#fff" />} />
        </BottomButton>
        <BottomButton>
          <Button label="Todos" onPress={handleSelectAll} icon={<Checks size={24} color="#fff" />} />
        </BottomButton>
        <BottomButton>
          <Button label="Decorar" onPress={handleDecorar} icon={<ArrowFatRight size={24} color="#fff" />} />
        </BottomButton>
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

const BookItem = styled.TouchableOpacity<{ checked?: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.COLORS.HIGHLIGHT_LIGHT_INVERSE : theme.COLORS.NEUTRAL_LIGHT_LIGHT};
  align-items: stretch;
  flex-direction: row;
  justify-content: center;
`;

const BookText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  text-align: center;
  width: 100%;
`;

const CheckBoxContainer = styled.View`
  margin-left: 12px;
`;

const CheckBoxInline = styled.View`
  margin-left: 6px;
  position: relative;
  top: 2px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0px;
  left: 24px;
  right: 24px;
`;

const BottomButton = styled.View`
  flex: 1;
  align-items: center;
`;

const ListBorder = styled.View`
  height: 3px;
  background-color: #000;
  width: 100%;
`;

export default EscolhaVersosScreen;
