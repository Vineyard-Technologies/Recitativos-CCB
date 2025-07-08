import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { Alert } from "react-native";
import { useRecitativos } from "@contexts/RecitativosContext";
import NavBar from "@components/NavBar";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { ArrowFatLeft } from "phosphor-react-native";
import { TextInput, InteractionManager, TextStyle, StyleProp } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IGNORE_ACCENTS_KEY = '@ignoreAccents';

const DecorarScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const route = useRoute<RouteProp<Record<string, { title: string; verses: string[]; level?: number }>, string>>();
  const { title, verses, level: initialLevel } = route.params || { title: '', verses: [], level: 1 };
  const theme = useTheme();
  const [ignoreAccents, setIgnoreAccents] = useState(true);

  // Store the verses to display in a variable
  const versesToDisplay = verses.join(' ');

  const wordArray = versesToDisplay.split(' ');

  const firstLetters = wordArray.map(word => word.charAt(0));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordStyles, setWordStyles] = useState<StyleProp<TextStyle>[]>
    (Array(wordArray.length).fill(
      (initialLevel ?? 1) === 2
        ? undefined // will be set after first success
        : { opacity: 0.5 }
    ));
  const [correctCount, setCorrectCount] = useState(0);
  const [level, setLevel] = useState(initialLevel ?? 1);
  const { updateRecitativoLevel } = useRecitativos();

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
    // Set initial word styles for level 2 or 3
    if ((initialLevel ?? 1) === 2) {
      setWordStyles(wordArray.map((_, i) => (i % 2 === 1 ? { opacity: 0 } : { opacity: 0.5 })));
    } else if ((initialLevel ?? 1) === 3) {
      setWordStyles(Array(wordArray.length).fill({ opacity: 0 }));
    }
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

      if (match) {
        setCorrectCount(prev => prev + 1);
      } else {
        newStyle.color = theme.COLORS.ERROR_MEDIUM;
      }

      newWordStyles[currentWordIndex] = newStyle;
      setWordStyles(newWordStyles);
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);

      // If last word, evaluate result
      if (nextIndex === wordArray.length) {
        setTimeout(() => {
          const percent = Math.round(((correctCount + (match ? 1 : 0)) / wordArray.length) * 100);
          if (level === 3) {
            Alert.alert(
              "Resultado",
              `Você acertou ${percent}% das palavras!`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate('Main');
                  }
                }
              ]
            );
          } else if (level === 2) {
            if (percent >= 90) {
              Alert.alert(
                "Bom trabalho!",
                "Agora vamos ver se você decorou mesmo!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      updateRecitativoLevel(title, 3);
                      setLevel(3);
                      setWordStyles(Array(wordArray.length).fill({ opacity: 0 }));
                      setCurrentWordIndex(0);
                      setCorrectCount(0);
                    }
                  }
                ]
              );
            } else {
              Alert.alert(
                "Muitos erros!",
                "Tente novamente!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Restart with current level 2 wordStyles
                      setWordStyles(wordArray.map((_, i) => (i % 2 === 1 ? { opacity: 0 } : { opacity: 0.5 })));
                      setCurrentWordIndex(0);
                      setCorrectCount(0);
                    }
                  }
                ]
              );
            }
          } else if (percent >= 90) {
            Alert.alert(
              "Bom trabalho!",
              "Agora, tente novamente, com algumas palavras escondidas!",
              [
                {
                  text: "OK",
                  onPress: () => {
                    updateRecitativoLevel(title, 2);
                    setLevel(2);
                    // Hide every other word
                    const newStyles = wordArray.map((_, i) =>
                      i % 2 === 1 ? { opacity: 0 } : { opacity: 0.5 }
                    );
                    setWordStyles(newStyles);
                    setCurrentWordIndex(0);
                    setCorrectCount(0);
                  }
                }
              ]
            );
          } else {
            Alert.alert(
              "Muitos erros!",
              "Tente novamente!",
              [
                {
                  text: "OK",
                  onPress: () => {
                    // Restart with all visible
                    setWordStyles(Array(wordArray.length).fill({ opacity: 0.5 }));
                    setCurrentWordIndex(0);
                    setCorrectCount(0);
                  }
                }
              ]
            );
          }
        }, 300);
      }
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
