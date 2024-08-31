import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect, useCallback } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { getClientData } from "./utils/AsyncStorageClient";

// Ss=
import Logo from "./Logo";
import LoginC from "./screens/login";
import Login from "./screens/log";
import WelcomeScreen from "./screens/welcome";
import Dashboard from "./screens/dashboars";
import Profile from "./screens/profil";
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

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
      });
    }

    if (Platform.OS === "ios") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
      });

      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("Failed to get permission for push notifications!");
        return;
      }
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  }

  const getNotificationPermission = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === "granted";
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData();
    fetchDataa();
    fetchDataaa();
    getNotificationPermission();

    const intervalId = setInterval(() => {
      fetchDataa();
      fetchDataaa();
    }, 60000); // Every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const clientData = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.1.14:5000/api/vacination/vaccinationGet/${clientData?.Data?._id}`
      );
      setData(response.data);
      setIsLoading(false);
      scheduleNotifications(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };

  const fetchDataa = async () => {
    try {
      const clientData = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.1.14:5000/api/rendezVous/rendezVous/${clientData?.Data?._id}`
      );
      setData(response.data);
      console.log("Data: " + response.data);
      setIsLoading(false);
      scheduleNotificationsss(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };

  const fetchDataaa = async () => {
    try {
      const clientData = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.1.14:5000/medUtilisateur/${clientData?.Data?._id}`
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
      scheduleNotificationsM(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };

  const scheduleNotifications = async (vaccinations) => {
    vaccinations.forEach(async (item) => {
      const vaccinationTimeParts = item.heure.split(":");
      const vaccinationDate = new Date(item.date);
      vaccinationDate.setHours(parseInt(vaccinationTimeParts[0], 10));
      vaccinationDate.setMinutes(parseInt(vaccinationTimeParts[1], 10));

      const notificationDate = new Date(
        vaccinationDate.getTime() - 2 * 60 * 60 * 1000 // 2 hours before
      );

      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Rappel de vaccination",
            body: `Vous avez un rendez-vous de vaccination à ${item.heure} dans ${item.lieu}`,
            data: { item },
            sound: "default", // Set sound
          },
          trigger: { date: notificationDate },
        });
      }
    });
  };

  const scheduleNotificationsss = async (rendezvous) => {
    console.log("Rendezvous: " + rendezvous);
    rendezvous.forEach(async (item) => {
      const rendezvousTimeParts = item.heure.split(":");
      const rendezvousDate = new Date(item.date);
      rendezvousDate.setHours(parseInt(rendezvousTimeParts[0], 10));
      rendezvousDate.setMinutes(parseInt(rendezvousTimeParts[1], 10));

      const notificationDate = new Date(
        rendezvousDate.getTime() - 2 * 60 * 60 * 1000 // 2 hours before
      );

      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Rappel de rendez-vous",
            body: `Vous avez un rendez-vous à ${item.heure} dans ${item.lieu}`,
            data: { item },
            sound: "default", // Set sound
          },
          trigger: { date: notificationDate },
        });
      }
    });
  };

  const scheduleNotificationsM = async (medicaments) => {
    medicaments.forEach(async (med) => {
      if (med.prendre) {
        const { Matin, demi_journe, nuit } = med;

        if (Matin.matin) {
          const hoursMinutes = Matin.DatePrise.split(":");
          const now = new Date();
          const notificationTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(hoursMinutes[0]),
            parseInt(hoursMinutes[1]),
            0
          );
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Rappel de médicament",
              body: `C'est l'heure de prendre le médicament: ${med.nom_medicament} (Matin)`,
              sound: "default", // Set sound
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true,
            },
          });
        }

        if (demi_journe.demi_journe) {
          const hoursMinutes = demi_journe.DatePrise.split(":");
          const now = new Date();
          const notificationTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(hoursMinutes[0]),
            parseInt(hoursMinutes[1]),
            0
          );
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Rappel de médicament",
              body: `C'est l'heure de prendre le médicament: ${med.nom_medicament} (Demi-journée)`,
              sound: "default", // Set sound
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true,
            },
          });
        }

        if (nuit.nuit) {
          const hoursMinutes = nuit.DatePrise.split(":");
          const now = new Date();
          const notificationTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            parseInt(hoursMinutes[0]),
            parseInt(hoursMinutes[1]),
            0
          );
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Rappel de médicament",
              body: `C'est l'heure de prendre le médicament: ${med.nom_medicament} (Nuit)`,
              sound: "default", // Set sound
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true,
            },
          });
        }
      }
    });
  };

  return (
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
  );
}
