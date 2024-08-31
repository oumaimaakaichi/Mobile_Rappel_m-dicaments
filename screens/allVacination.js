import React, { useRef, useState, useEffect , useCallback } from "react";
import axios from "axios";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import profile from "../assets/prof.png";
import { getClientData } from "../utils/AsyncStorageClient";

// Tab ICons...
import home from "../assets/home.png";
import Hor from "../assets/hr.png";

// Menu

import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import p from "../assets/cjt.png";
import rendez from "../assets/rendez.avif";
import document from "../assets/doc.png";
import { useIsFocused , useFocusEffect} from "@react-navigation/native";
import historique from "../assets/histo.png";
import { useRoute } from "@react-navigation/native";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import enfant1 from "../assets/enfant.png";
import logout from "../assets/logout.png";
import DetailleRendezvous from "./detailleRendez-vous";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function AllVacination({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [vacinationList, setVacinationList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRoute();
  useEffect(() => {
    if (route.params && route.params.updatedList) {
      // Mettre à jour la liste avec les données fournies
      setVacinationList(route.params.updatedList);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientData();
      setUser(data);
      console.log("ddfd" + data.email);
    };

    fetchData();
  }, []);




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
  useEffect(() => {
    console.log(data);
    getNotificationPermission();
  }, []);
  const scheduleNotifications = async (vaccinations) => {
    vaccinations.forEach(async (item) => {
      // Heure et date de vaccination
      const vaccinationTimeParts = item.heure.split(":");
      console.log("bbbb"+vaccinationTimeParts)
      const vaccinationDate = new Date(item.date);
      vaccinationDate.setHours(parseInt(vaccinationTimeParts[0], 10));
      vaccinationDate.setMinutes(parseInt(vaccinationTimeParts[1], 10));
      console.log("bbbb"+vaccinationDate)
      // Date de notheuren avant l'heure de vaccination
      const notificationDate = new Date(vaccinationDate.getTime() - 2 * 60 * 60 * 1000);
  
      // Vérifier si la notification doit être planifue
      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Rappel de vaccination",
             body: `Vous avez un rendez-vous de vaccination à ${item.heure} dans ${item.lieu}`,
    
            data: { item },
          },
          trigger: { date: notificationDate },
        });
      }
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData();
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.43.105:5000/api/vacination/vaccinationGet/${data?.Data?._id}`
        );
        setData(response.data);
        setIsLoading(false);
        scheduleNotifications(response.data);
      } catch (error) {
        console.error("Error fetching rendez-vous data: ", error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.43.105:5000/api/vacination/vaccinationGet/${data?.Data?._id}`
      );
      setData(response.data);
      setIsLoading(false);
      scheduleNotifications(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  
  useEffect(() => {
    fetchData();
    scheduleNotifications
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData();
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.43.105:5000/api/vacination/vaccinationGet/${data?.Data?._id}`
        );
        setData(response.data);
        setIsLoading(false);
        scheduleNotifications(response.data);
      } catch (error) {
        console.error("Error fetching rendez-vous data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const rendezVousDate = new Date(item.date);
    const formattedDate = `${rendezVousDate.getFullYear()}-${
      rendezVousDate.getMonth() + 1
    }-${rendezVousDate.getDate()}`;
    const formattedTime = `${rendezVousDate.getHours()}:${rendezVousDate.getMinutes()}`;

    const navigateToDetails = () => {
      // Naviguer vers la page de détails en passant les données de l'élément sélectionné
      navigation.navigate("DetailleVacination", { Vacination: item });
    };

    return (
      <TouchableOpacity onPress={navigateToDetails}>
        <View style={styles.item}>
          <Image
            source={require("../assets/get.png")}
            style={{ width: 80, height: 70, marginRight: 10 }}
          />
          {/*<Text style={styles.title}>
            Date de prochain rendezVous : {"\n"} {formattedDate}
            {"\n"} l'heure de rendezVous : {item.heure}
    </Text>*/}
          <Text style={styles.title}>
            <Text style={styles.whiteText}>
              Date de prochain Vacination : {"\n"}{" "}
              <Text style={styles.blackText}>{formattedDate}</Text>
            </Text>
            {"\n"} l'heure de Vacination :{" "}
            <Text style={styles.blackText}>{item.heure}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
                      marginTop: 20,
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
                      backgroundColor: "white",
                      paddingLeft: 13,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={enfant1}
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
              <ScrollView style={styles.s}>
                {/* Votre code existant */}
              </ScrollView>

              <Animated.View>
                {/* Votre code existant */}
                <ScrollView style={{ marginVertical: 0 }}>
                  {/* Votre code existant */}
                  <ScrollView horizontal={true}>
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={(item) => item._id}
                      style={styles.flatList}
                    
                    />
                  </ScrollView>
                </ScrollView>
              </Animated.View>
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
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#0147A6",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
 marginRight:50,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 50,
    marginBottom:20
  },
  whiteText: {
    color: "white",
  },
  blackText: {
    color: "#0147A6",
  },

  
  
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01BACF",
    padding: 20,
    marginVertical: 8,
 
    borderRadius: 10,
    width: 380,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  flatList: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:400
  },
});
