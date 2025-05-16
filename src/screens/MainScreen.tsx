import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from 'styled-components/native';
import NavBar from "@components/NavBar";
import ListItemComponent, { ListItemProps } from "@components/ListItem";
import Button from "../components/Button";
import { Gear, Plus } from "phosphor-react-native";

export default function MainScreen({ navigation }: any) {
  const theme = useTheme();

  const list: ListItemProps[] = [
    {
      type: "Icon",
      title: "Genesis 1:1",
      description: "No princípio, Deus criou os céus e a terra.",
      hasRightIcon: true,
      avatar: { uri: "" }, // Provide a dummy avatar for type compatibility
    },
    // ... add more items as needed
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.COLORS.NEUTRAL_LIGHT_MEDIUM }} contentContainerStyle={{ flexGrow: 1 }}>
      <NavBar title="Meus Recitativos" />
      {list.map((item, index) => (
        <ListItemComponent key={index} {...item} />
      ))}
      <Button
        label="Configurações"
        icon={<Gear color="#fff" size={20} />}
        position="left"
        onPress={() => {}}
      />
      <Button
        label="Adicionar Verso"
        icon={<Plus color="#fff" size={20} />}
        position="right"
        onPress={() => navigation.navigate('EscolhaLivro')}
      />
    </ScrollView>
  );
}
