import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import profile from "../assets/prof.png";
import { getClientData } from "../utils/AsyncStorageClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import vertImage from "../assets/vert.png"; // Assurez-vous que le chemin d'accès à votre image est correct

// Tab ICons...
import home from "../assets/home.png";
import Hor from "../assets/hr.png";
import logout from "../assets/logout.png";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
// Menu

import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import enfant1 from "../assets/enfant.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import p from "../assets/cjt.png";
import rendez from "../assets/rendez.avif";
import document from "../assets/doc.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";
import AllRendez_vous from "./allRendez-vous";
import AllVacination from "./allVacination";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Button } from "react-native-paper";
import Svg, { Circle, Path } from "react-native-svg";
import { Alert } from "react-native";
import enfant from "./enfant";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function Dashboard({ navigation }) {
  const [notificationColor, setNotificationColor] = useState("green");
  const [currentTab, setCurrentTab] = useState("Home");
  const [expoPushToken, setExpoPushToken] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState("");
  const [rendezVous, setRendezVous] = useState([]);
  const [selectedRendezVous, setSelectedRendezVous] = useState(null);
  // Assurez-vous que les valeurs des champs de formulaire sont correctement initialisées
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getClientData();
        setUser(userData);
        setUserId(userData.Data._id); // Mettre à jour la variable d'état avec l'ID de l'utilisateur
        console.log("UserData:", userData);
        console.log("User ID:", userData.Data._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("voila le user id : " + userId);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Appeler checkAndSendNotifications à intervalles réguliers (par exemple, toutes les heures)
      checkAndSendNotifications();
    }, 60000); // Exécuter toutes les heures (3600000 millisecondes)

    // Nettoyer la minuterie lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

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
  const sendNotification1 = async () => {
    console.log("Sending push notification 2...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification de Rendez-vous!",
      body: "Vous avez un rendez-vous apres deux heure, n'oubliez pas!",
    };

    console.log("Notification message:", message);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        console.log("Notification sent successfully!");
      } else {
        console.error(
          "Failed to send notification. Server response:",
          response
        );
      }
    } catch (error) {
      console.error("Error while sending notification:", error);
    }
  };
  const sendNotification2 = async () => {
    console.log("Sending push notification 2...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification de Rendez-vous!",
      body: "Vous avez un rendez-vous demain, n'oubliez pas!",
    };

    console.log("Notification message:", message);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        console.log("Notification sent successfully!");
      } else {
        console.error(
          "Failed to send notification. Server response:",
          response
        );
      }
    } catch (error) {
      console.error("Error while sending notification:", error);
    }
  };
  /*
  const checkAndSendNotifications = async () => {
    try {
      console.log("Avant la récupération des rendez-vous");
      const response = await fetch(
        `http://192.168.1.14:5000/api/rendezVous/getbyutlisateur/ut/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user's appointments");
      }

      const rendezVous = await response.json();
      console.log(rendezVous);
      const now = new Date();

      // Parcours des rendez-vous
      rendezVous.forEach(async (rdv) => {
        const appointmentTime = new Date(rdv.date);

        appointmentTime.setHours(parseInt(rdv.heure.split(":")[0]));
        appointmentTime.setMinutes(parseInt(rdv.heure.split(":")[1]));

        const oneDayBefore = new Date(
          appointmentTime.getTime() - 1 * 24 * 60 * 60 * 1000
        );

        // Vérification de la condition spécifiée
        if (
          now.getFullYear() === appointmentTime.getFullYear() &&
          now.getMonth() === appointmentTime.getMonth() &&
          now.getDate() === appointmentTime.getDate() - 1 && // Vérifier si c'est la veille
          now.getHours() === 0 &&
          now.getMinutes() === 39
        ) {
          // Si la condition est vérifiée, envoyer la notification
          await sendNotification2();
        }
      });
    } catch (error) {
      console.error(error);
      setError(
        "Une erreur s'est produite lors de la récupération des rendez-vous."
      );
    }
  };
*/

  const checkAndSendNotifications = async () => {
    try {
      console.log("Avant la récupération des rendez-vous");
      const response = await fetch(
        `http://192.168.43.116:5000/api/rendezVous/getbyutlisateur/ut/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user's appointments");
      }

      const rendezVous = await response.json();
      console.log(rendezVous);
      const now = new Date();

      // Parcours des rendez-vous
      rendezVous.forEach(async (rdv) => {
        const appointmentTime = new Date(rdv.date);

        appointmentTime.setHours(parseInt(rdv.heure.split(":")[0]));
        appointmentTime.setMinutes(parseInt(rdv.heure.split(":")[1]));

        // Calculer deux heures avant le rendez-vous
        const twoHoursBefore = new Date(
          appointmentTime.getTime() - 2 * 60 * 60 * 1000
        );

        // Vérifier si c'est le même jour que le rendez-vous et si c'est deux heures avant
        if (
          now.getFullYear() === appointmentTime.getFullYear() &&
          now.getMonth() === appointmentTime.getMonth() &&
          now.getDate() === appointmentTime.getDate() &&
          now.getHours() === twoHoursBefore.getHours() &&
          now.getMinutes() === twoHoursBefore.getMinutes()
        ) {
          // Si la condition est vérifiée, envoyer la notification 1
          await sendNotification1();
        }

        // Vérifier si c'est la veille du rendez-vous à minuit et 39 minutes
        if (
          now.getFullYear() === appointmentTime.getFullYear() &&
          now.getMonth() === appointmentTime.getMonth() &&
          now.getDate() === appointmentTime.getDate() - 1 && // Vérifier si c'est la veille
          now.getHours() === 0 &&
          now.getMinutes() === 59
        ) {
          // Si la condition est vérifiée, envoyer la notification 2
          await sendNotification2();
        }
      });
    } catch (error) {
      console.error(error);
      setError(
        "Une erreur s'est produite lors de la récupération des rendez-vous."
      );
    }
  };

  checkAndSendNotifications();
  // Appel de la fonction pour vérifier et envoyer les notifications

  useEffect(() => {
    const checkAndSetNotificationColor = async () => {
      try {
        console.log("Avant la récupération des rendez-vous");
        const response = await fetch(
          `http://192.168.43.116:5000/api/rendezVous/getbyutlisateur/ut/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user's appointments");
        }

        const rendezVous = await response.json();
        console.log(rendezVous);
        // Par exemple, vous pouvez utiliser la date actuelle et comparer avec l'heure du rendez-vous
        const now = new Date();
        const appointmentTime =
          new Date(/* Mettez ici la date et l'heure du rendez-vous */);

        const twoHoursBefore = new Date(
          appointmentTime.getTime() - 2 * 60 * 60 * 1000
        );
        const oneDayBefore = new Date(
          appointmentTime.getTime() - 1 * 24 * 60 * 60 * 1000
        );

        // Si le rendez-vous est dans les deux heures suivantes, changer la couleur de l'icône en rouge
        if (now >= twoHoursBefore && now < appointmentTime) {
          setNotificationColor("red");
        }

        // Si le rendez-vous est dans la journée précédente, changer également la couleur de l'icône en rouge
        if (now >= oneDayBefore && now < twoHoursBefore) {
          setNotificationColor("red");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Appeler la fonction pour vérifier et définir la couleur de l'icône de notification
    checkAndSetNotificationColor();
  }, []); // Déclencher l'effet uniquement une fois au chargement du composant

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.43.116:5000/api/rendezVous/getRendez-vous/hier/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setRendezVous(responseData);
        console.log("rendezvous AAAAAAAAAAAAAAAAA");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleImageClick = (rendezVousData) => {
    setSelectedRendezVous(rendezVousData);
  };

  const sendNotification3 = async () => {
    console.log("Sending push notification 2...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification de Vacination!",
      body: "Vous avez un rendez-vous de Vacination apres deux heure, n'oubliez pas!",
    };

    console.log("Notification message:", message);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        console.log("Notification sent successfully!");
      } else {
        console.error(
          "Failed to send notification. Server response:",
          response
        );
      }
    } catch (error) {
      console.error("Error while sending notification:", error);
    }
  };
  const sendNotification4 = async () => {
    console.log("Sending push notification 2...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification de Vacination!",
      body: "Vous avez un rendez-vous e Vacination demain, n'oubliez pas!",
    };

    console.log("Notification message:", message);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          host: "exp.host",
          accept: "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        console.log("Notification sent successfully!");
      } else {
        console.error(
          "Failed to send notification. Server response:",
          response
        );
      }
    } catch (error) {
      console.error("Error while sending notification:", error);
    }
  };
  const checkAndSendNotificationsvac = async () => {
    try {
      console.log("Avant la récupération des rendez-vous");
      const response = await fetch(
        `http://192.168.43.116:5000/api/vacination/getvacinationbyid/idut/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user's appointments");
      }

      const rendezVous = await response.json();
      console.log(rendezVous);
      const now = new Date();

      // Parcours des rendez-vous
      rendezVous.forEach(async (rdv) => {
        const appointmentTime = new Date(rdv.date);

        appointmentTime.setHours(parseInt(rdv.heure.split(":")[0]));
        appointmentTime.setMinutes(parseInt(rdv.heure.split(":")[1]));

        // Calculer deux heures avant le rendez-vous
        const twoHoursBefore = new Date(
          appointmentTime.getTime() - 2 * 60 * 60 * 1000
        );

        // Vérifier si c'est le même jour que le rendez-vous et si c'est deux heures avant
        if (
          now.getFullYear() === appointmentTime.getFullYear() &&
          now.getMonth() === appointmentTime.getMonth() &&
          now.getDate() === appointmentTime.getDate() &&
          now.getHours() === twoHoursBefore.getHours() &&
          now.getMinutes() === twoHoursBefore.getMinutes()
        ) {
          // Si la condition est vérifiée, envoyer la notification 1
          await sendNotification3();
        }

        // Vérifier si c'est la veille du rendez-vous à minuit et 39 minutes
        if (
          now.getFullYear() === appointmentTime.getFullYear() &&
          now.getMonth() === appointmentTime.getMonth() &&
          now.getDate() === appointmentTime.getDate() - 1 && // Vérifier si c'est la veille
          now.getHours() === 0 &&
          now.getMinutes() === 59
        ) {
          // Si la condition est vérifiée, envoyer la notification 2
          await sendNotification4();
        }
      });
    } catch (error) {
      console.error(error);
      setError(
        "Une erreur s'est produite lors de la récupération des rendez-vous."
      );
    }
  };
  checkAndSendNotificationsvac();

  const logoutUser = async () => {
    try {
      // Nettoyer les données d'authentification dans AsyncStorage
      await AsyncStorage.removeItem("userData");

      // Effacer les données saisies précédemment dans le stockage local
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");

      // Réinitialiser les valeurs des champs de formulaire
      setEmail("");
      setPassword("");

      // Rediriger l'utilisateur vers la page de connexion
      navigation.navigate("LoginC");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.s}>
          <View
            style={{
              justifyContent: "flex-start",
              padding: 15,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity style={styles.uploadBtnContainer}>
              <Image
                source={{ uri: user?.Data?.avatar }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "whitesmoke",
                marginTop: 20,
                marginRight: 70,
              }}
            >
              {user?.Data?.nom} {user?.Data?.prenom}
            </Text>

            <View style={{ flexGrow: 1, marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  if (title == "LogOut") {
                  } else {
                    setCurrentTab(title);
                  }
                }}
              >
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "white",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={home}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "#rgb(97, 172, 243)",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "#rgb(97, 172, 243)",
                      }}
                    >
                      Acceuil
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("update");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={profile}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Profile
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("docc");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={document}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Document
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("contact");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 21,
                    }}
                  >
                    <Image
                      source={Contact}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Contacts{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Medicament", { user: user });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={cland}
                      style={{
                        width: 45,
                        height: 45,
                        tintColor: "white",

                        marginLeft: -10,
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",

                        color: "white",
                      }}
                    >
                      Ajouter rendez-vous{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AllRendez_vous");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,

                      borderRadius: 8,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={list}
                      style={{
                        width: 55,
                        height: 55,
                        tintColor: "white",
                        marginLeft: -20,
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",

                        color: "white",
                      }}
                    >
                      Rendez-vous{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Allmedicament");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={medicament}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Médicament{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("enfant");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={enfant1}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Espace enfant{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DashHoraire");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={Hor}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Rendez-vous{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
*/}

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AllVacination");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={enfant1}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Tous vacination{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={logoutUser}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      backgroundColor: "transparent",
                      paddingLeft: 13,
                      paddingRight: 30,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={logout}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "white",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "white",
                      }}
                    >
                      Déconnexion
                    </Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Animated.View
          style={{
            flexGrow: 1,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: showMenu ? 15 : 0,
            // Transforming View...
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
            // Menu Button...
          }
          <ImageBackground
            source={require("../assets/dd.png")}
            style={{ flex: 2, width: "400px" }}
          >
            <ScrollView
              style={{ marginVertical: 0 }}
              source={require("../assets/4.jpg")}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      translateY: closeButtonOffset,
                    },
                  ],
                }}
                source={require("../assets/4.jpg")}
              >
                <TouchableOpacity
                  onPress={() => {
                    Animated.timing(scaleValue, {
                      toValue: showMenu ? 1 : 0.88,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(offsetValue, {
                      // YOur Random Value...
                      toValue: showMenu ? 0 : 230,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    Animated.timing(closeButtonOffset, {
                      // YOur Random Value...
                      toValue: !showMenu ? -30 : 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();

                    setShowMenu(!showMenu);
                  }}
                  source={require("../assets/4.jpg")}
                >
                  <Image
                    source={showMenu ? close : menu}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: "white",
                      marginTop: 40,
                      marginLeft: 20,
                    }}
                  ></Image>
                </TouchableOpacity>
                <View style={styles.content}>
                  {/* Affichage de l'image kk.png si des données sont récupérées */}
                  {rendezVous.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => handleImageClick(rendezVous[0])}
                    >
                      <Image
                        source={require("../assets/rouge.png")}
                        style={{ width: 70, height: 70, marginLeft: 300 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                      source={require("../assets/blanc.png")}
                      style={{ width: 70, height: 70, marginLeft: 300 }}
                    />
                  )}
                  {/* Affichage des détails du rendez-vous sélectionné */}
                  {/*  {selectedRendezVous && (
                  <View style={styles.detailsContainer}>
                    <Text>Date: {selectedRendezVous.date}</Text>
                    <Text>Heure: {selectedRendezVous.heure}</Text>
                    <Text>
                      Nom du docteur: {selectedRendezVous.nom_docteur}
                    </Text>
                  
                  </View>
                )}*/}

                  {selectedRendezVous &&
                    Alert.alert(
                      "Détails du rendez-vous",
                      `Date: ${selectedRendezVous.date}\nHeure: ${selectedRendezVous.heure}\nNom du docteur: ${selectedRendezVous.nom_docteur}`,
                      [
                        {
                          text: "OK",
                          onPress: () => console.log("OK Pressed"),
                        },
                      ],
                      { cancelable: false, titleStyle: { color: "red" } }
                    )}
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    alignSelf: "center",
                    marginTop: 30,
                    color: "#427CA2",
                    marginBottom: 20,
                  }}
                ></Text>
                <ScrollView horizontal={true}></ScrollView>

                {/* <Image
                source={require("../assets/gg.jpg")}
                style={{ width: 400, height: 250 }}
              />*/}
              </Animated.View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",
                  color: "#427CA2",
                  marginTop: 400, // Vous pouvez ajuster ou retirer ce marginTop si nécessaire
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 10,
                }}
              >
                Bienvenue,
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  alignSelf: "center",

                  color: "#427CA2",

                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                  padding: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 10,
                }}
              >
                nous sommes à votre service
              </Text>
            </ScrollView>
          </ImageBackground>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0147A6",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#0147A6",
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 60,
  },
});
