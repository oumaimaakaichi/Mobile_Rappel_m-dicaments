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
  TextInput,
  Alert, // Import manquant pour Alert
} from "react-native";
import profile from "../assets/prof.png";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Feather";
import home from "../assets/home.png";
import Hor from "../assets/hr.png";
import logout from "../assets/logout.png";
import DatePicker from "@react-native-community/datetimepicker";

import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import document from "../assets/doc.png";
import p from "../assets/cjt.png";
import medicament from "../assets/med.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";
import { Button } from "react-native-paper";
//import Sound from "react-native-sound";
import AllRendez_vous from "./allRendez-vous";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as Device from "expo-device";
import enfant1 from "../assets/enfant.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import { getClientData } from "../utils/AsyncStorageClient";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Rendez({ navigation }) {
  const [date, setDate] = useState(new Date());

  const [heure, setHeure] = useState("");
  const [objet, setObjet] = useState("");
  const [nom_docteur, setNom_docteur] = useState("");
  const [lieu, setLieu] = useState("");
  const [error, setError] = useState("");

  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [user, setUser] = useState(""); // Déclaration de la variable user
  const handleSave = () => {};
  const [selectedTime, setSelectedTime] = useState("");
  const [currentTab, setCurrentTab] = useState("Home");
  const [userId, setUserId] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getClientData();
        setUser(userData);
        setUserId(userData.Data._id); // Mettre à jouur la variable d'état avec il'ID de l'utilisateur
        console.log("UserData:", userData);
        console.log("User ID:", userData.Data._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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

  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Notification de Rendez-vous!",
      body: "vous avez un rendez-vous dans 2 heures",
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

  const addAppointment = async () => {
    try {


      if (
        !date ||
        !heure ||
        !nom_docteur ||
        !objet ||
        !lieu 
       
      ) {
        setError(true);
        return false;
      }
      
      const u = userId;
      console.log("b " + " " + u);
      const now = new Date();

      const dataToSend = {
        date: date,
        heure: heure,
        objet: objet,
        nom_docteur: nom_docteur,
        lieu: lieu,
        utilisateur: userId,
      };

      const response = await fetch(
        "http://192.168.43.105:5000/api/rendezVous/ajoutren",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        Toast.show({
          position: "top",
          type: "success",

          text1: "Ajouter un rendez-vous",
          text2: "Renez-vous ajouté avec succès",
          

          autoHide: true,
          visibilityTime: 4000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("AllRendez_vous");
          },
          onShow: () => {},
        });
       
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          // Si les autorisations n'ont pas déjà été accordées, demandez-les à l'utilisateur
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("Permission not granted to send notifications");
          return;
        }

        // Convertir l'heure de la chaîne en objet Date
        const [hours, minutes] = heure.split(":");
        const appointmentTime = new Date(date);
        appointmentTime.setHours(hours);
        appointmentTime.setMinutes(minutes);

        // Calculer deux heures avant l'heure du rendez-vous
        const twoHoursBefore = new Date(
          appointmentTime.getTime() - 2 * 60 * 60 * 1000
        );

        // Extraire la date sans l'heure
        const appointmentDate = new Date(date);
        appointmentDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit

        const oneDayBefore = new Date(appointmentDate);
        console.log(oneDayBefore);
        oneDayBefore.setDate(oneDayBefore.getDate() - 1);
        oneDayBefore.setHours(22, 1, 0, 0);

        const delayNotification = oneDayBefore.getTime() - now.getTime();
        console.log(delayNotification);
        // Calculer le délai pour l'envoi de la notification
        const delay = twoHoursBefore.getTime() - now.getTime();
        console.log(delay);
        // Vérifier que le délai est positif avant de déclencher la notification
        if (delay > 0) {
          setTimeout(() => {
            sendNotification(); // Appel de sendNotification
          }, delay);
        }

        // Vérifier que le délai pour la notification 2 est positif avant de déclencher la notification
        if (delayNotification > 0) {
          setTimeout(() => {
            sendNotification2();
            // Appel de sendNotification2
          }, delayNotification);
        }
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de l'ajout du rendez-vous.");
    }
  };
  /*const addAppointment = async () => {
    try {
      // Utilisez directement la variable d'état userId pour obtenir l'ID de l'utilisateur connecté
      const u = userId;
      console.log("bb " + " " + u);
      // Autres étapes d'enregistrement du rendez-vous...

      const dataToSend = {
        utilisateur: u, // Utiliser l'ID de l'utilisateur connecté
        date: date,
        heure: heure,
        objet: objet,
        nom_docteur: nom_docteur,
        lieu: lieu,
      };

      const response = await fetch(
        "http://192.168.1.14:5000/api/rendezVous/ajoutren",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      // Autres étapes d'enregistrement du rendez-vous...
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de l'ajout du rendez-vous.");
    }
  };
*/

const logoutUser = async () => {
         
  navigation.navigate("LoginC");

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
                marginRight:80
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate("dash");
                  }}>
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
                      source={home}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: "#fff",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 15,
                        color: "#fff",
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
                      backgroundColor: "white",
                      paddingLeft: 7,
                      paddingRight: 35,

                      borderRadius: 8,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={cland}
                      style={{
                        width: 45,
                        height: 45,
                        tintColor: "#rgb(97, 172, 243)",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingLeft: 4,
                        color: "#rgb(97, 172, 243)",
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
                      paddingLeft: 2,
                      paddingRight: 24,
                      borderRadius: 8,
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={list}
                      style={{
                        width: 55,
                        height: 55,
                        tintColor: "white",
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
marginLeft:20,
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
            paddingHorizontal: 15,
            paddingVertical: 20,
            borderRadius: showMenu ? 15 : 0,
            // Transforming View...
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
            // Menu Button...
          }
          <ScrollView style={{ marginVertical: 0 }}>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: closeButtonOffset,
                  },
                ],
              }}
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
              >
                <Image
                  source={showMenu ? close : menu}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "#rgb(97, 172, 243)",
                    marginTop: 40,
                  }}
                ></Image>
              </TouchableOpacity>

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
<Toast/>
<SafeAreaView style={styles.container}>

  <View style={styles.formContainer}>
 
    <View style={styles.form}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/ya.png")}
          style={{ width: 170, height: 170 }}
        />
      </View>

      <Text style={styles.title}>Nouveau rendez-vous</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Objet du rendez-vous</Text>
        <TextInput
          style={styles.input}
          placeholder="Objet"
          value={objet}
          onChangeText={setObjet}
        />
      </View>
      {error && !objet && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lieu</Text>
        <TextInput
          style={styles.input}
          placeholder="Lieu"
          value={lieu}
          onChangeText={setLieu}
        />
      </View>
      {error && !lieu && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom du docteur</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom du docteur"
          value={nom_docteur}
          onChangeText={setNom_docteur}
        />
      </View>
      {error && !nom_docteur && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date du rendez-vous :</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateInput}
        >
          <TextInput
            style={[styles.input, { width: "85%" }]}
            placeholder="Date"
            value={date.toLocaleDateString("fr-FR")}
            editable={false}
          />
           
          <Icon
            name="calendar"
            size={20}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Heure du rendez-vous :</Text>

        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.timeInput}
        >
          <TextInput
            style={[styles.input, { width: "85%" }]}
            placeholder="Heure"
            value={heure}
            editable={false}
          />
          <Icon
            name="clock"
            size={20}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date()}
      />

      <DateTimePickerModal
        isVisible={showTimePicker}
        value={date}
        mode="time"
        onConfirm={(selectedDate) => {
          const selectedTime = selectedDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          });
          setHeure(selectedTime);
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />

      <TouchableOpacity onPress={addAppointment}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
</SafeAreaView>

            </Animated.View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    shadowColor: "#000", // Couleur de l'ombre
    shadowOffset: {
      width: 0,
      height: 2,
    }, // Décalage de l'ombre
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 3.84, // Rayon de l'ombre
    elevation: 5, // Pour les ombres sur Android
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    justifyContent: "flex-start",
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "whitesmoke",
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    width:380
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: "#01BACF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    color: "#01BACF",
  },
  button: {
    backgroundColor: "#0147A6",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#0147A6",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
 marginRight:80,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 60,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});