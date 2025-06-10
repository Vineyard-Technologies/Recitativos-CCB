import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EscolhaLivroScreen from "@screens/EscolhaLivroScreen";
import EscolhaCapituloScreen from "@screens/EscolhaCapituloScreen";
import EscolhaVersosScreen from "@screens/EscolhaVersosScreen";
import MainScreen from "@screens/MainScreen";
import DecorarScreen from "@screens/DecorarScreen";

const Stack = createStackNavigator();

export default function AppNavigator({ initialParams }: { initialParams?: any }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="EscolhaLivro" component={EscolhaLivroScreen} />
        <Stack.Screen name="EscolhaCapitulo" component={EscolhaCapituloScreen} />
        <Stack.Screen name="EscolhaVersos" component={EscolhaVersosScreen} />
        <Stack.Screen name="Decorar" component={DecorarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
