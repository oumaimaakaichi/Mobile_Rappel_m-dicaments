import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import profile from "../assets/prof.png";
import { getClientData } from "../utils/AsyncStorageClient";
import { LinearGradient } from "expo-linear-gradient";
// Tab ICons...
import home from "../assets/home.png";
import Hor from "../assets/hr.png";
import logout from "../assets/logout.png";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
// Menu
import Contact from "../assets/b.png";
import conta from "../assets/contact.png";
import menu from "../assets/menu.png";

import cland from "../assets/clandr.png";
import list from "../assets/hihi.png";
import enfant1 from "../assets/enfant.png";
import close from "../assets/close.png";
import document from "../assets/doc.png";
import p from "../assets/cjt.png";
import medicament from "../assets/med.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";
import { Button } from "react-native-paper";
export default function AddContactt({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showPopup, setShowPopup] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState("");
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [Num_tel, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [spécialite, setSpecialité] = useState("");
  const [error, setError] = useState(false);
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  useEffect(async () => {
    const data = await getClientData();
    setUser(data);
    console.log("ddddddd" + data._id);
  }, []);
  const addContact = async () => {
    const data = await getClientData();
    if (
      !nom ||
      !prenom ||
      !adresse ||
      !spécialite ||
      !Num_tel ||
      Num_tel < 0 ||
      Num_tel.length != 8 ||
      (!regEx.test(email) && email != "")
    ) {
      setError(true);
      return false;
    }
    try {
      // Construire l corps de la requête avec les données du contact
      const requestBody = JSON.stringify({
        nom_docteur: nom,
        Prenom_docteur: prenom,
        num_telephone: Num_tel,
        email: email,
        adresse_doc: adresse,
        Specialite_docteur: spécialite,
        utilisateur: data.Data._id,
      });

      const response = await fetch(
        "http://192.168.43.116:5000/api/AddContact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        setNom("");
        setPrenom("");
        setNumero("");
        setEmail("");
        setAdresse("");
        setSpecialité("");
        navigation.navigate("contact");
      } else {
        console.error("Échec de l'ajout du condtact.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact:", error);
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
                source={{ uri: user?.avatar }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "whitesmoke",
                marginTop: 11,
              }}
            >
              {user.nom} {user.prenom}
            </Text>

            <View style={{ flexGrow: 1 }}>
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
                    navigation.navigate("doc");
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
                        width: 50,
                        height: 50,
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
                      marginTop: 10,
                    }}
                  >
                    <Image
                      source={cland}
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

                        color: "white",
                      }}
                    >
                      Ajouter rendez-vous{" "}
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
                    width: 30,
                    height: 30,
                    tintColor: "#rgb(97, 172, 243)",
                    marginTop: 40,
                  }}
                ></Image>
              </TouchableOpacity>

              <ScrollView horizontal={true}>
                <View style={styles.popupContainer}>
                  <Image
                    source={conta}
                    style={{
                      width: 190,
                      height: 140,
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                  />
                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="user"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Nom Docteur"
                      style={styles.input}
                      onChangeText={(val) => setNom(val)}
                    />
                  </View>
                  {error && !nom && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="user"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Prenom Docteur"
                      style={styles.input}
                      onChangeText={(val) => setPrenom(val)}
                    />
                  </View>
                  {error && !prenom && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="phone"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Numéro de téléphone"
                      style={styles.input}
                      onChangeText={(val) => setNumero(val)}
                    />
                  </View>
                  {error && !Num_tel && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}
                  {error && Num_tel < 0 && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      Numéro du téléphone doit etre positive
                    </Text>
                  )}
                  {error && Num_tel.length != 8 && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      Numéro du téléphone doit etre positive
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="mail"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Email Docteur"
                      style={styles.input}
                      onChangeText={(val) => setEmail(val)}
                    />
                  </View>
                  {error && !email && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}
                  {error && !regEx.test(email) && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      email invalide
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="home"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Adresse Docteur"
                      style={styles.input}
                      onChangeText={(val) => setAdresse(val)}
                    />
                  </View>
                  {error && !adresse && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}

                  <View style={styles.inputContainer}>
                    <AntDesign
                      name="user"
                      color="rgb(70, 143, 183)"
                      size={20}
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="Spécialité du Docteur"
                      style={styles.input}
                      onChangeText={(val) => setSpecialité(val)}
                    />
                  </View>
                  {error && !spécialite && (
                    <Text
                      style={{ color: "red", fontSize: 10, fontWeight: "bold" }}
                    >
                      {" "}
                      champ obligatoire *
                    </Text>
                  )}

                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.signIn}
                      onPress={addContact}
                    >
                      <LinearGradient
                        colors={["#0147A6", "#0147A6"]}
                        style={styles.linearGradient}
                      >
                        <Text style={[styles.textSign, { color: "#fff" }]}>
                          Ajouter
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Votre bouton "Ajouter un contact" */}
              </ScrollView>
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
    backgroundColor: "#0147A6",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#0147A6",
    marginTop: -100,
  },
  button: {
    alignItems: "center",
    marginTop: 70,
    borderRadius: 8,
  },

  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 5,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 20,
  },

  signIn: {
    backgroundColor: "#0147A6",
    width: WIDTH - 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
    marginTop: -50, // Supprimer les guillemets autour du nombre négatif
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginFormTextInput: {
    width: WIDTH - 55,
    height: 45,
    borderBottomWidth: 1,
    borderColor: "#rgb(97, 172, 243)",
    fontSize: 16,
    paddingLeft: 45,
    marginHorizontal: 25,
    marginTop: 25,
  },
  popupContainer: {
    backgroundColor: "white",
    padding: 10,
    marginLeft: 20,
    borderRadius: 10,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: "#000", // Pour l'ombre sur iOS
    shadowOffset: { width: 0, height: 2 }, // Pour l'ombre sur iOS
    shadowOpacity: 0.25, // Pour l'ombre sur iOS
    shadowRadius: 3.84,
    alignItems: "center",
    width: "90%", // Utilisez un pourcentage de la largeur de l'écran
    marginTop: "30%",
    alignSelf: "center",
    // Pour l'ombre sur iOS
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6, // Ajoutez d'autres styles de bordure selon vos besoins
    borderColor: "#01BACF", // Couleur de la bordure
    borderRadius: 5, // Bordure arrondie
    paddingHorizontal: 10, // Marge horizontale interne
    marginTop: 20,
    height: 50, // Espacement vers le haut
  },

  icon: {
    marginRight: 11,
    color: "#01BACF",
    // Espacement à droite de l'icône
  },
  input: {
    flex: 1, // Pour que le TextInput prenne tout l'espace restant
    height: 70, // Hauteur du TextInput
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "rgb(70, 143, 183)",
    borderRadius: 8,
    paddingHorizontal: 0,
  },
  buttons: {
    backgroundColor: "#0147A6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
