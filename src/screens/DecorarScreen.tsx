import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import NavBar from "@components/NavBar";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { ArrowFatLeft } from "phosphor-react-native";
import { TextInput, InteractionManager } from "react-native";

const DecorarScreen = () => {
  const navigation = useNavigation<NavigationProp<Record<string, object | undefined>>>();
  const route = useRoute<RouteProp<Record<string, { title: string; verses: string[] }>, string>>();
  const { title, verses } = route.params || { title: '', verses: [] };

  const inputRef = useRef<TextInput>(null);

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
        />
        {verses.map((verse, idx) => (
          <VerseText key={idx} onPress={() => inputRef.current?.focus()}>{verse}</VerseText>
        ))}
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

const VerseText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_DARKEST};
  margin-bottom: 16px;
`;

export default DecorarScreen;
