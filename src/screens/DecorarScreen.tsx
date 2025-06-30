import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import NavBar from "@components/NavBar";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { ArrowFatLeft } from "phosphor-react-native";
import { TextInput, InteractionManager, TextStyle, StyleProp } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IGNORE_ACCENTS_KEY = '@ignoreAccents';

const DecorarScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const route = useRoute<RouteProp<Record<string, { title: string; verses: string[] }>, string>>();
  const { title, verses } = route.params || { title: '', verses: [] };
  const theme = useTheme();
  const [ignoreAccents, setIgnoreAccents] = useState(true);

  // Store the verses to display in a variable
  const versesToDisplay = verses.join(' ');

  const wordArray = versesToDisplay.split(' ');

  const firstLetters = wordArray.map(word => word.charAt(0));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordStyles, setWordStyles] = useState<StyleProp<TextStyle>[]>
    (Array(wordArray.length).fill({ opacity: 0.75 }));

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(IGNORE_ACCENTS_KEY);
        if (savedValue !== null) {
          setIgnoreAccents(JSON.parse(savedValue));
        }
      } catch (e) {
        console.error("Failed to load settings.", e);
      }
    };
    loadSettings();
  }, []);

  // Handle key press events from the keyboard
  const handleKeyPress = (event: { nativeEvent: { key: string } }) => {
    const keyPressed = event.nativeEvent.key;

    if (currentWordIndex < wordArray.length) {
      const expectedFirstLetter = firstLetters[currentWordIndex];

      const newWordStyles = [...wordStyles];
      const currentStyle = (wordStyles[currentWordIndex] as TextStyle) || {};

      const newStyle: TextStyle = { ...currentStyle, opacity: 1 };

      const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      let match = keyPressed.toLowerCase() === expectedFirstLetter.toLowerCase();

      if (ignoreAccents && !match) {
        match = normalize(keyPressed.toLowerCase()) === normalize(expectedFirstLetter.toLowerCase());
      }

      if (!match) {
        newStyle.color = theme.COLORS.ERROR_MEDIUM;
      }

      newWordStyles[currentWordIndex] = newStyle;
      setWordStyles(newWordStyles);
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  useEffect(() => {
    // Focus the input and open the keyboard when the screen mounts
    InteractionManager.runAfterInteractions(() => {
      inputRef.current?.focus();
    });
  }, []);

  const handleBack = () => navigation.navigate('Main');

  return (
    <Container>
      <NavBar
        title={title}
        leftIcon={<ArrowFatLeft size={24} color="#fff" />}
        leftOnPress={handleBack}
      />
      <VersesContainer>
        <TextInput
          ref={inputRef}
          style={{ height: 0, width: 0, position: 'absolute', opacity: 0 }}
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
          keyboardType="visible-password"
          onKeyPress={handleKeyPress}
        />
        <VerseTextContainer
          onPress={() => inputRef.current?.focus()}
        >
          {wordArray.map((word, index) => (
            <VerseText key={index} style={wordStyles[index]}>
              {word}{' '}
            </VerseText>
          ))}
        </VerseTextContainer>
      </VersesContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;

const VersesContainer = styled.ScrollView`
  flex: 1;
  margin: 16px;
`;

const VerseTextContainer = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  margin-bottom: 16px;
`;

const VerseText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
`;

export default DecorarScreen;
