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
  Dimensions,
  FlatList,
} from "react-native";
import profile from "../assets/prof.png";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import enfant1 from "../assets/enfant.png";
import { getClientData } from "../utils/AsyncStorageClient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
// Tab ICons...
import home from "../assets/home.png";
import Hor from "../assets/hr.png";
import logout from "../assets/logout.png";
import { scheduleNotificationAsync } from "expo-notifications";

// Menuuu
import { useIsFocused , useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import p from "../assets/cjt.png";
import rendez from "../assets/rendez.avif";
import document from "../assets/doc.png";

import historique from "../assets/histo.png";
const { width: WIDTH } = Dimensions.get("window");
import DetailleRendezvous from "./detailleRendez-vous";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function AllMedicament({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientData();
      setUser(data);
      console.log("dddfd" + data.email);
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
  const scheduleNotifications = async (medicaments) => {
    medicaments.forEach(async (med) => {
      if (med.prendre) {
        const { Matin, demi_journe, nuit } = med;
        console.log("tttttttt" + med.prendre);

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
              sound: "default",
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
              to: expoPushToken,

              title: "Rappel de médicament",
              body: `C'est l'heure de prendre le médicament: ${med.nom_medicament} (Demi-journée)`,
              sound: "default",
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true,
            },
          });
        }

        if (nuit.nuit) {
          console.log("ggggggg"+nuit.nuit)
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
              to: expoPushToken,
              title: "Rappel de médicament",
              body: `C'est l'heure de prendre le médicament: ${med.nom_medicament}`,
              sound: "default",
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
  const fetchDataa = async () => {
    const data = await getClientData();
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.43.105:5000/medUtilisateur/${data.Data._id}`
      );
      setData(response.data);
      console.log(response.data);
      setIsLoading(false);
      scheduleNotifications(response.data);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientData();
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://192.168.43.105:5000/medUtilisateur/${data.Data._id}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
        scheduleNotifications(response.data);
      } catch (error) {
        console.error("Error fetching rendez-vous data: ", error);
        setIsLoading(false);
      }
    };

    fetchDataa();
  }, []);


  useEffect(() => {
    fetchDataa();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDataa();
    }, [])
  );



  const renderItem = ({ item }) => {
    const navigateToDetails = () => {
    
      navigation.navigate("oneMedicament", { med: item });
    };

    return (
      <TouchableOpacity onPress={navigateToDetails}>
        <View style={styles.item}>
          <Image
            source={require("../assets/bas.png")}
            style={{ width: 70, height: 60, marginRight: 10 }}
          />

          <Text style={styles.title}>
            {"\n"} Nom Médicament : {item.nom_medicament}
          </Text>

         
        </View>
      </TouchableOpacity>
    );
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
            <View style={{ flexGrow: 1, marginTop: 10 }}>
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
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={home}
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
                    navigation.navigate("AllDoc");
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
                        width: 24,
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
                    navigation.navigate("AllMed");
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
                      marginTop: 20,
                    }}
                  >
                    <Image
                      source={medicament}
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
                      Médicaments{" "}
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LoginC");
                  }}
                >
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
          
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          {
           
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
                  
                    toValue: showMenu ? 0 : 230,
                    duration: 301,
                    useNativeDriver: true,
                  }).start();

                  Animated.timing(closeButtonOffset, {
                 
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
                    marginTop: 51,
                  }}
                ></Image>
              </TouchableOpacity>

              <Animated.View>
                <View style={{ marginBottom: 10 }}>
                  <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => {
                      navigation.navigate("addMed");
                    }}
                  >
                    <Image
                      source={require("../assets/add.png")}
                      style={styles.contactButtonImage}
                    />
                  </TouchableOpacity>
                </View>
               
                <ScrollView style={{ marginVertical: 0 }}>
                  
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

    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    }, // Décalage
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    elevation: 5, 
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#4793AF",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
 marginRight:40,

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 50,
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#0147A6",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 1,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginHorizontal: 100,
    width: 30,
    height: 30,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 21,
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: 30,
    height: 30,
    marginHorizontal: 131,
  },
  contactButtonImage: {
    width: 42,
    height: 42,
    tintColor: "#rgb(97, 172, 243)",
    marginLeft: 130,
  },
 
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01BACF",
    padding: 10,
    marginVertical: 8,
  
    borderRadius: 10,
    width: 331,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  title: {
    fontSize: 18,
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
  },
});
