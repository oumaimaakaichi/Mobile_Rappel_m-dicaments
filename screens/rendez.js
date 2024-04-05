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
import { getClientData } from "../utils/AsyncStorageClient";
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
export default function Rendez({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [heure, setHeure] = useState("");
  const [error, setError] = useState(false);
  const [objet, setObjet] = useState("");
  const [nom_docteur, setNom_docteur] = useState("");
  const [lieu, setLieu] = useState("");
  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [user, setUser] = useState(""); // Déclaration de la variable user
  const handleSave = () => {};
  const [selectedTime, setSelectedTime] = useState("");
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  const AddRendez_vous = async () => {
    const navigation = useNavigation();
    try {
      const dataToSend = {
        lieu: lieu,
        nom_docteur: nom_docteur,
        objet: objet,
        heure: heure,
        date: date,
      };

      const response = await fetch(
        "http://192.168.1.20:5000/api/rendezVous/ajoutren",
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
      navigation.navigate("AllRendez_vous");
    } catch (error) {
      console.error(error);
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("dash");
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
                      backgroundColor: "white",
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
                      Contacts{" "}
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
                        source={require("../assets/ya.png")} // Remplacez "votre_image.png" par le chemin de votre image
                        style={{ width: 170, height: 170 }}
                      />
                    </View>

                    <Text style={styles.title}>Nouveau Rendez-vous</Text>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Objet du rendezVous</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Heure"
                        value={objet}
                        onChangeText={(val) => setObjet(val)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>lieu</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="lieu "
                        value={lieu}
                        onChangeText={(val) => setLieu(val)}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Nom du docteur</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Heure"
                        value={nom_docteur}
                        onChangeText={(val) => setNom_docteur(val)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Date du rendez-vous:</Text>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateInput}
                      >
                        <TextInput
                          style={[styles.input, { width: "85%" }]}
                          placeholder="Date"
                          // value={date.toLocaleDateString("fr-FR")}
                          value={date.toLocaleDateString("fr-FR")}
                          editable={false}
                          onChangeText={(val) => setDate(val)}
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
                      <Text style={styles.label}>Heure du rendez-vous:</Text>
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        style={styles.timeInput}
                      >
                        <TextInput
                          style={[styles.input, { width: "85%" }]}
                          placeholder="Heure"
                          value={heure}
                          onChangeText={(val) => setHeure(val)}
                        />
                        <Icon
                          name="clock"
                          size={20}
                          color="black"
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                      <DatePicker
                        style={{ width: "100%", color: "black" }}
                        value={date}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || date;
                          setDate(currentDate);
                          setShowDatePicker(false);
                        }}
                      />
                    )}

                    {showTimePicker && (
                      <DatePicker
                        style={{ width: "100%", color: "black" }}
                        value={date}
                        mode="time"
                        display="default"
                        onChange={(event, selectedDate) => {
                          if (selectedDate) {
                            const selectedTime =
                              selectedDate.toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            setHeure(selectedTime); // Mettre à jour l'état `heure` avec la nouvelle heure
                          }
                          setShowTimePicker(false);
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        AddRendez_vous();
                      }}
                    >
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
    backgroundColor: "#FFFFFF",
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
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
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
  },
  button: {
    backgroundColor: "#rgb(97, 172, 243)",
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
