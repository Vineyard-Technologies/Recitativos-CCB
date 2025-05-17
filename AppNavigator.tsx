import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import EscolhaLivroScreen from "@screens/EscolhaLivroScreen";
import EscolhaCapituloScreen from "@screens/EscolhaCapituloScreen";
import EscolhaVersosScreen from "@screens/EscolhaVersosScreen";
import MainScreen from "@screens/MainScreen";

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
        <Stack.Screen name="EscolhaLivro" component={EscolhaLivroScreen as any} />
        <Stack.Screen name="EscolhaCapitulo" component={EscolhaCapituloScreen as any} />
        <Stack.Screen name="EscolhaVersos" component={EscolhaVersosScreen as any} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
