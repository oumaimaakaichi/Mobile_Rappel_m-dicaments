import React, { useRef, useState, useEffect ,useCallback} from "react";
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
import { useFocusEffect } from '@react-navigation/native';
// Tab ICons...
import home from "../assets/home.png";
import Hor from "../assets/hr.png";
import logout from "../assets/logout.png";
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
//u
import enfant1 from "../assets/enfant.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import p from "../assets/cjt.png";
import rendez from "../assets/rendez.avif";
import document from "../assets/doc.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";
import { useRoute } from "@react-navigation/native";

import DetailleRendezvous from "./detailleRendez-vous";
export default function 


AllRendez_vous({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intiallst be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [rendezVousList, setRendezVousList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const route = useRoute();
  useEffect(() => {
    if (route.params && route.params.updatedList) {
      // Mettre à jour la liste avec les données fournies
      setRendezVousList(route.params.updatedList);
    }
  }, [route.params]);



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
        console.log("tokenn: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);
 

  const scheduleNotificationss = async (rendezvous) => {
    console.log("baba"+rendezvous)
    rendezvous.forEach(async (item) => {
      const rendezvousTimeParts = item.heure.split(":");
      const rendezvousDate = new Date(item.date);
      rendezvousDate.setHours(parseInt(rendezvousTimeParts[0], 10));
      rendezvousDate.setMinutes(parseInt(rendezvousTimeParts[1], 10));
  
      const notificationDate = new Date(
        rendezvousDate.getTime() - 2 * 60 * 60 * 1000
      );
  
      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Rappel de rendez-vous",
            body: `Vous avez un rendez-vous à ${item.heure} dans ${item.lieu}`,
            data: { item },
            sound: 'default'
          },
          trigger: { date: notificationDate },
        });
      }
    });
  };


  const fetchData = async () => {
    try {
      const data = await getClientData();
      setIsLoading(true);
      const response = await axios.get(
        `http://192.168.43.105:5000/api/rendezVous/rendezVous/${data?.Data?._id}`
      );
      
      setData(response.data);
      scheduleNotificationss(response.data)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching rendez-vous data: ", error);
      setIsLoading(false);
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: 'default',  
      });
    }
    
    if (Platform.OS === "ios") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default', 
      });
  
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
    }
  
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  
    return token;
  }
  useEffect(() => {
    const fetchDataa = async () => {
      const data = await getClientData();
      setUser(data);
      console.log("d" + data.email);
    };

    fetchDataa();
  }, []);

  useEffect(() => {
    fetchData();
    scheduleNotificationss()
    getNotificationPermission
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
          `http://192.168.43.105:5000/api/rendezVous/rendezVous/${data?.Data?._id}`
        );
        setData(response.data);
        setIsLoading(false);
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
      navigation.navigate("DetailleRendezvous", { rendezVous: item });
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
              Date de rendezVous : {"\n"}{" "}
              <Text style={styles.blackText}>{formattedDate}</Text>
            </Text>
            {"\n"} Heure rendez-vous :{" "}
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
                <TouchableOpacity  onPress={() => {
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
                      backgroundColor: "transparent",
                      paddingLeft: 8,
                      paddingRight: 35,

                      borderRadius: 8,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={cland}
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: "#fff",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
marginLeft:10,
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
                      paddingVertical: 5,
                      backgroundColor: "white",
                      paddingLeft: 6,
                      paddingRight: 35,
                      borderRadius: 8,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={list}
                      style={{
                        width: 50,
                        height: 50,
                        tintColor: "#rgb(97, 172, 243)",
                      }}
                    ></Image>

                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",

                        color: "#rgb(97, 172, 243)",
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

  whiteText: {
    color: "white",
  },
  blackText: {
    color: "#0147A6",
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01BACF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    width: 360,
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
  },
});
