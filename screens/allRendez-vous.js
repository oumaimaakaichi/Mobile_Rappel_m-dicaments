import React, { useRef, useState, useEffect } from "react";
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
import logout from "../assets/logout.png";

// Menu

import Contact from "../assets/b.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import medicament from "../assets/med.png";
import p from "../assets/cjt.png";
import rendez from "../assets/rendez.avif";
import document from "../assets/doc.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";

import DetailleRendezvous from "./detailleRendez-vous";
export default function AllRendez_vous({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
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

  // Définir les données de la liste

  // Fonction de rendu des éléments de la liste
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://192.168.1.20:5000/api/rendezVous/getRendez-vous"
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
            source={require("../assets/cland.png")}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <Text style={styles.title}>
            Date de prochain rendezVous : {"\n"} {formattedDate}
            {"\n"} l'heure de rendezVous : {item.heure}
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
            <Image
              source={p}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                marginTop: 10,
              }}
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "whitesmoke",
                marginTop: 20,
              }}
            >
              {user.nom} {user.prenom}
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
                    navigation.navigate("reservationConfirmé");
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
                    navigation.navigate("Medicament");
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
                      Médicaments{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Medicament");
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
                      source={rendez}
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
                      Médicaments{" "}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("signin");
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
                    width: 20,
                    height: 20,
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
    backgroundColor: "blue",
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
    backgroundColor: "#rgb(97, 172, 243)",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 60,
  },

  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#rgb(97, 172, 243)",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 60,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#52D7FA",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    width: 450,
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
    elevation: 5,
  },
});
