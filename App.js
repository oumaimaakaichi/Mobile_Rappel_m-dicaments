import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginC from './screens/login';
import React from 'react';
import Login from './screens/log';
import WelcomeScreen from './screens/welcome';
import InscriC from './screens/inscription';
import Dashboard from './screens/dashboars';
import Profile from './screens/profil';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={LoginC} />
        <Stack.Screen name="home" component={WelcomeScreen} />
        <Stack.Screen name="registre" component={InscriC} />
        <Stack.Screen name="dash" component={Dashboard} />
        <Stack.Screen name="update" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
