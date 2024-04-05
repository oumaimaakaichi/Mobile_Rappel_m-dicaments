import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginC from "./screens/login";
import React from "react";
import Login from "./screens/log";
import WelcomeScreen from "./screens/welcome";

import Dashboard from "./screens/dashboars";
import Profile from "./screens/profil";
const Stack = createNativeStackNavigator();

import Logo from "./Logo";
import Medicament from "./screens/rendez";
import AllRendez_vous from "./screens/allRendez-vous";
import DetailleRendezvous from "./screens/detailleRendez-vous";
import Rendez from "./screens/rendez";
import Modifier from "./screens/modifier";

import AddContactt from './screens/AddContact';
import OneContact from './screens/OneContact';
import UpdateContact from './screens/updateContact';
import Profiil from './screens/updateContact';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="LoginC" component={LoginC} />
        <Stack.Screen name="home" component={WelcomeScreen} />

        <Stack.Screen name="dash" component={Dashboard} />
        <Stack.Screen name="update" component={Profile} />
        <Stack.Screen name="contact" component={Contactt} />

        <Stack.Screen name="Medicament" component={Medicament} />
        <Stack.Screen name="AllRendez_vous" component={AllRendez_vous} />
        <Stack.Screen
          name="DetailleRendezvous"
          component={DetailleRendezvous}
        />
        <Stack.Screen name="Rendez" component={Rendez} />
        <Stack.Screen name="Modifier" component={Modifier} />

        <Stack.Screen name="addContact" component={AddContactt} />
        <Stack.Screen name="OneContact" component={OneContact} />
        <Stack.Screen name="UpdateContact" component={UpdateContact} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
