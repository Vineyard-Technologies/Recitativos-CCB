import React from "react";
import styled from "styled-components/native";
import NavBar from "@components/NavBar";
import { ArrowFatLeft } from "phosphor-react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

const DecorarScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const route = useRoute<RouteProp<Record<string, { title: string; verses: string[] }>, string>>();
  const { title, verses } = route.params || {};

  const inputRef = React.useRef<TextInput>(null);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [wordStates, setWordStates] = React.useState<{ [verseIdx: number]: number }>({});
  const [lastKey, setLastKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Open keyboard on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Helper: split verse into words (preserve punctuation)
  const splitWords = (text: string) => text.match(/\S+|\s+/g) || [];

  // Handle key press for React Native (mobile)
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (!Array.isArray(verses)) return;
    const key = e.nativeEvent.key;
    let updated = { ...wordStates };
    let found = false;
    for (let vIdx = 0; vIdx < verses.length; vIdx++) {
      const verse = verses[vIdx];
      const words = splitWords(verse).filter(w => w.trim().length > 0);
      let currIdx = updated[vIdx] ?? 0;
      for (let wIdx = currIdx; wIdx < words.length; wIdx++) {
        const word = words[wIdx];
        const firstChar = word[0]?.toLowerCase();
        if (firstChar && key?.toLowerCase() === firstChar) {
          updated[vIdx] = wIdx + 1;
          found = true;
          break;
        }
        break;
      }
      if (found) break;
    }
    if (found) setWordStates(updated);
    setLastKey(key);
  };

  const handleBack = () => navigation.navigate('Main');

  const handleScreenPress = () => {
    if (keyboardOpen) {
      Keyboard.dismiss();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress} accessible={false}>
      <Container>
        <NavBar 
          title={title || "Decorar"}
          leftIcon={<ArrowFatLeft size={24} color="#fff" />} 
          leftOnPress={handleBack}
        />
        <HiddenInput ref={inputRef} onKeyPress={handleKeyPress} />
        <VersesScroll keyboardShouldPersistTaps="handled">
          {Array.isArray(verses) && verses.length > 0 ? (
            verses.map((verse: string, vIdx: number) => {
              const words = splitWords(verse);
              const currIdx = wordStates[vIdx] ?? 0;
              let wordIdx = 0;
              return (
                <VerseLine key={vIdx}>
                  {words.map((word, idx) => {
                    // Only count non-whitespace for progression
                    const isWord = word.trim().length > 0;
                    let opacity = 0.5;
                    if (isWord) {
                      if (wordIdx < currIdx) opacity = 1;
                      else if (wordIdx === currIdx) opacity = 0.5;
                      else opacity = 0.5;
                      wordIdx++;
                    }
                    return (
                      <WordText key={idx} style={{ opacity }}>{word}</WordText>
                    );
                  })}
                </VerseLine>
              );
            })
          ) : (
            <VerseText>Nenhum verso selecionado.</VerseText>
          )}
        </VersesScroll>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;

const VersesScroll = styled.ScrollView`
  flex: 1;
  padding: 24px 24px 0 24px;
`;

const VerseLine = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const WordText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  text-align: left;
`;

const VerseText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  text-align: left;
  margin-bottom: 24px;
`;

const HiddenInput = styled.TextInput.attrs({
  editable: true,
  autoFocus: false,
  style: { height: 0, width: 0, padding: 0, margin: 0, borderWidth: 0, color: 'transparent', backgroundColor: 'transparent', opacity: 0 },
  caretHidden: true,
  underlineColorAndroid: 'transparent',
  value: '', // Always empty
  showSoftInputOnFocus: true,
  maxLength: 0, // Prevent any input from being displayed
  selectTextOnFocus: false,
  contextMenuHidden: true,
})``;

export default DecorarScreen;
