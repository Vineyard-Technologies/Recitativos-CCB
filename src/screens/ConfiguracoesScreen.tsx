import React from "react";
import styled, { useTheme } from 'styled-components/native';
import Button from "@components/Button";
import { ArrowFatLeft } from "phosphor-react-native";
import NavBar from "@components/NavBar";

export default function ConfiguracoesScreen({ navigation }: any) {
  const theme = useTheme();
  const handleBack = () => navigation.goBack();

  return (
    <Container style={{ backgroundColor: theme.COLORS.NEUTRAL_LIGHT_MEDIUM }}>
      <NavBar title="Configurações" />
      {/* Adicione aqui as opções de configuração desejadas */}
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
