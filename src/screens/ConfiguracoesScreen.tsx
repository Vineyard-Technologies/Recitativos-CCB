import React, { useState, useEffect } from "react";
import styled, { useTheme } from 'styled-components/native';
import Button from "@components/Button";
import { ArrowFatLeft } from "phosphor-react-native";
import NavBar from "@components/NavBar";
import { Switch, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IGNORE_ACCENTS_KEY = '@ignoreAccents';

export default function ConfiguracoesScreen({ navigation }: any) {
  const theme = useTheme();
  const [ignoreAccents, setIgnoreAccents] = useState(true);

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

  const handleToggleSwitch = async (value: boolean) => {
    setIgnoreAccents(value);
    try {
      await AsyncStorage.setItem(IGNORE_ACCENTS_KEY, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save settings.", e);
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <Container style={{ backgroundColor: theme.COLORS.NEUTRAL_LIGHT_MEDIUM }}>
      <NavBar title="Configurações" />
      <Content>
        <OptionContainer>
          <OptionText>Aceitar letras não acentuadas no lugar de letras acentuadas</OptionText>
          <Switch
            value={ignoreAccents}
            onValueChange={handleToggleSwitch}
            trackColor={{ false: "#767577", true: theme.COLORS.HIGHLIGHT_MEDIUM }}
            thumbColor={ignoreAccents ? theme.COLORS.HIGHLIGHT_DARK : "#f4f3f4"}
          />
        </OptionContainer>
      </Content>
      <ButtonRow>
        <Button
          label="Voltar"
          onPress={handleBack}
          icon={<ArrowFatLeft size={24} color="#fff" />}
        />
      </ButtonRow>
    </Container>
  );
}

const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const OptionText = styled.Text`
  ${({ theme }) => theme.HEADING.H3};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_LIGHTEST};
  flex-shrink: 1;
  margin-right: 16px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.NEUTRAL_LIGHT_MEDIUM};
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  left: 24px;
  right: 24px;
`;
