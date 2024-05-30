import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
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
import Contactt from "./screens/contact";
import AddContactt from "./screens/AddContact";
import OneContact from "./screens/OneContact";
import UpdateContact from "./screens/updateContact";
import Profiil from "./screens/updateContact";
import InscriC from "./screens/inscription";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
/*import PushNotification from "react-native-push-notification";
import registerNNPushToken from "native-notify";*/
import { Button, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import Document from "./screens/document";
import AddDocPDF from "./screens/AddDocPdf";
import AddDoc from "./screens/AddDoc";
import OneDoc from "./screens/oneDoc";
import Medicaments from "./screens/medicament";
import AddMedicament from "./screens/addMedicament";
import AllMedicament from "./screens/AllMedicament";
import OneMed from "./screens/oneMedicament";
import enfant from "./screens/enfant";
import AllVacination from "./screens/allVacination";
import DetailleVacination from "./screens/detailleVacination";
import ModifierVacination from "./screens/modifierVacination";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "2cabd58e-13b7-4adc-bcd2-ea8675f091ce",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    // Dans la méthode pour planifier la notification

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Logo" component={Logo} />
        <Stack.Screen name="LoginC" component={LoginC} />
        <Stack.Screen name="home" component={WelcomeScreen} />
        <Stack.Screen name="InscriC" component={InscriC} />
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
        <Stack.Screen name="docc" component={Document} />
        <Stack.Screen name="pdfDOC" component={AddDocPDF} />
        <Stack.Screen name="addDoc" component={AddDoc} />
        <Stack.Screen name="oneDoc" component={OneDoc} />
        <Stack.Screen name="Medi" component={Medicaments} />
        <Stack.Screen name="addMed" component={AddMedicament} />
        <Stack.Screen name="Allmedicament" component={AllMedicament} />
        <Stack.Screen name="oneMedicament" component={OneMed} />
        <Stack.Screen name="enfant" component={enfant} />
        <Stack.Screen name="AllVacination" component={AllVacination} />
        <Stack.Screen
          name="DetailleVacination"
          component={DetailleVacination}
        />
        <Stack.Screen
          name="ModifierVacination"
          component={ModifierVacination}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{ marginTop: 100, alignItems: "center" }}>
    //<Text style={{ marginVertical: 30 }}>Expo RN Push Notifications</Text>
    //<Button title="Send push notification" onPress={sendNotification} />
    // </View>
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
