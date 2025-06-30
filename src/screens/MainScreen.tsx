import React from "react";
import { FlatList, View, Text, Alert, AlertButton } from "react-native";
import styled, { useTheme } from 'styled-components/native';
import NavBar from "@components/NavBar";
import ListItemComponent, { ListItemProps } from "@components/ListItem";
import Button from "@components/Button";
import { Gear, Plus } from "phosphor-react-native";
import { useRecitativos } from "@contexts/RecitativosContext";

export default function MainScreen({ navigation }: any) {
  const theme = useTheme();
  const { recitativos, moveRecitativoUp, moveRecitativoDown, deleteRecitativo } = useRecitativos();

  const handleLongPress = (index: number) => {
    const menuOptions: AlertButton[] = [];

    if (index > 0) {
      menuOptions.push({
        text: "Mover para cima",
        onPress: () => moveRecitativoUp(index),
      });
    }

    if (index < recitativos.length - 1) {
      menuOptions.push({
        text: "Mover para baixo",
        onPress: () => moveRecitativoDown(index),
      });
    }

    menuOptions.push(
      {
        text: "Excluir",
        onPress: () => deleteRecitativo(index),
        style: "destructive",
      },
      {
        text: "Cancelar",
        style: "cancel",
      }
    );

    Alert.alert("Ações", "", menuOptions, { cancelable: true });
  };

  const list: ListItemProps[] = recitativos.map((item, index) => ({
    type: "Icon",
    title: item.title,
    hasRightIcon: true,
    onPress: () => navigation.navigate('Decorar', { title: item.title, verses: item.verses }),
    onLongPress: () => handleLongPress(index),
    avatar: { uri: "" }, // Provide a dummy avatar for type compatibility
  }));

  const renderItem = ({ item }: { item: ListItemProps }) => (
    <View style={{ marginBottom: 12 }}>
      <ListItemComponent {...item} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.NEUTRAL_LIGHT_MEDIUM }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={list}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<NavBar title="Meus Recitativos" />}
        ListEmptyComponent={
          <EmptyListContainer>
            <EmptyListText>não há versos salvos</EmptyListText>
          </EmptyListContainer>
        }
      />
      <View style={{ padding: 16 }}>
        <Button
          label="Configurações"
          icon={<Gear color="#fff" size={20} />}
          position="left"
          onPress={() => navigation.navigate('Configuracoes')}
        />
        <Button
          label="Adicionar Verso"
          icon={<Plus color="#fff" size={20} />}
          position="right"
          onPress={() => navigation.navigate('EscolhaLivro')}
        />
      </View>
    </View>
  );
}

const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyListText = styled.Text`
  ${({ theme }) => theme.HEADING.H2};
  color: ${({ theme }) => theme.COLORS.NEUTRAL_DARK_LIGHTEST};
  font-style: italic;
`;
