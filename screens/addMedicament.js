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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import { RadioButton } from "react-native-paper";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Contact from "../assets/b.png";
import asma2 from "../assets/lmmm-removebg-preview.png";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import document from "../assets/doc.png";
import p from "../assets/cjt.png";
import medicament from "../assets/med.png";
import enfant1 from "../assets/enfant.png";
import { useIsFocused } from "@react-navigation/native";
import historique from "../assets/histo.png";
import { Button } from "react-native-paper";
import list from "../assets/hihi.png";
import cland from "../assets/clandr.png";
export default function AddMedicament({ navigation }) {
  const [currentTab, setCurrentTab] = useState("Home");

  const [showPopup, setShowPopup] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  const [showMatin, setShowMatin] = useState(false);
  const [showDemiJournee, setShowDemiJournee] = useState(false);
  const [showNuit, setShowNuit] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const [selectedInput, setSelectedInput] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userId, setUserId] = useState("");
  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
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
  const [selectedTimeMatin, setSelectedTimeMatin] = useState("");
  const [selectedTimeDemiJournee, setSelectedTimeDemiJournee] = useState("");
  const [selectedTimeNuit, setSelectedTimeNuit] = useState("");
  const [selectedInputMatin, setSelectedInputMatin] = useState("");
  const [selectedInputDemiJournee, setSelectedInputDemiJournee] = useState("");
  const [selectedInputNuit, setSelectedInputNuit] = useState("");

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleInputFocus = (option) => {
    setSelectedInput(option);
    showDateTimePicker();
  };


  const handleDateConfirm = (date) => {
    const selectedHour = date.getHours();
    const selectedMinutes = date.getMinutes();
    const formattedTime = ` ${selectedHour}:${
      selectedMinutes < 10 ? "0" + selectedMinutes : selectedMinutes
    }`;
    switch (selectedInput) {
      case "Matin":
        setSelectedTimeMatin(formattedTime);
        break;
      case "Demi-journée":
        setSelectedTimeDemiJournee(formattedTime);
        break;
      case "Nuit":
        setSelectedTimeNuit(formattedTime);
        break;
      default:
        break;
    }
    hideDateTimePicker();
  };

  const addMedicament = async () => {

    if (
      !nom 
      
    ) {
      setError(true);
      return false;
    }





    try {
      const requestBody = JSON.stringify({
        nom_medicament: nom,
        matin: {
          matin: showMatin,
          DatePrise: selectedTimeMatin, 
        },
        nuit: {
          nuit: showNuit,
          DatePrise: selectedTimeNuit, 
        },
        demi_journe: {
          demi_journe: showDemiJournee,
          DatePrise: selectedTimeDemiJournee, 
        },
        utilisateur: user.Data._id, 
      });

      const response = await fetch(
        "http://192.168.43.105:5000/api/AddMedicament",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );

      if (response.ok) {
        Toast.show({
          position: "top",
          type: "success",

          text1: "Ajouter un Médicament",
          text2: "Médicament ajouté avec succès",
          

          autoHide: true,
          visibilityTime: 8000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("Allmedicament");
          },
          onShow: () => {},
        });
      
      } else {
      
        console.error("Échec de l'ajout du médicament");
      }
    } catch (error) {
   
      console.error("Erreur lors de l'ajout du médicament:", error);
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
              marginBottom: 21,
              marginTop:120
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
                fontSize: 21,
                fontWeight: "bold",
                color: "whitesmoke",
                marginTop: 11,
              }}
            >
              {user?.Data?.nom} {user?.Data?.prenom}
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
                    navigation.navigate("Medi");
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
                    duration: 300,
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
                    marginTop: 40,
                  }}
                ></Image>
              </TouchableOpacity>

              <ScrollView horizontal={true}>
                
                <View style={styles.popupContainer}>
                <Toast/>
                  <Image
                    source={asma2}
                    style={{
                      width: 250,
                      height: 190,
                      alignSelf: "center",
                      marginTop: 20,
                      marginBottom: 10,
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
                      placeholder="Nom Médicament"
                      style={styles.input}
                      onChangeText={(val) => setNom(val)}
                    />
                  </View>
                  {error && !nom && (
            <Text style={{ color: 'red', fontSize: 10, fontWeight: 'bold' }}>
              champ obligatoire *
            </Text>
          )}


                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 30,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => toggleOption("Matin")}
                        tyle={{ marginLeft: 11 }}
                      >
                        <RadioButton.Android
                          value="Matin"
                          status={
                            selectedOptions.includes("Matin")
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            toggleOption("Matin");
                            setShowMatin(!showMatin);
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 3 }}>Matin</Text>

                      <TouchableOpacity
                        onPress={() => toggleOption("Demi-journée")}
                        style={{ marginLeft: 5 }}
                      >
                        <RadioButton.Android
                          value="Demi-journée"
                          status={
                            selectedOptions.includes("Demi-journée")
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            toggleOption("Demi-journée");
                            setShowDemiJournee(!showDemiJournee);
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 3 }}>Demi-journée</Text>

                      <TouchableOpacity
                        onPress={() => toggleOption("Nuit")}
                        style={{ marginLeft: 5 }}
                      >
                        <RadioButton.Android
                          value="Nuit"
                          status={
                            selectedOptions.includes("Nuit")
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => {
                            toggleOption("Nuit");
                            setShowNuit(!showNuit);
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 3, marginRight: 11 }}>
                        Nuit
                      </Text>
                    </View>
                  </View>
                  {showMatin && selectedOptions.includes("Matin") && (
                    <View style={styles.inputContainer}>
                      <AntDesign
                        name="clockcircleo"
                        color="rgb(70, 143, 183)"
                        size={20}
                        style={styles.icon}
                      />
                      <TouchableOpacity
                        onPress={() => handleInputFocus("Matin")}
                        style={styles.input}
                      >
                        <TextInput
                          placeholder="Heure Matin"
                          style={styles.input}
                          editable={false}
                          value={selectedTimeMatin}
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  {showDemiJournee &&
                    selectedOptions.includes("Demi-journée") && (
                      <View style={styles.inputContainer}>
                        <AntDesign
                          name="clockcircleo"
                          color="rgb(70, 143, 183)"
                          size={20}
                          style={styles.icon}
                        />
                        <TouchableOpacity
                          onPress={() => handleInputFocus("Demi-journée")}
                          style={styles.input}
                        >
                          <TextInput
                            placeholder="Heure demi_journe"
                            style={styles.input}
                            editable={false}
                            value={selectedTimeDemiJournee}
                          />
                        </TouchableOpacity>
                      </View>
                    )}

                  {showNuit && selectedOptions.includes("Nuit") && (
                    <View style={styles.inputContainer}>
                      <AntDesign
                        name="clockcircleo"
                        color="rgb(70, 143, 183)"
                        size={20}
                        style={styles.icon}
                      />
                      <TouchableOpacity
                        onPress={() => handleInputFocus("Nuit")}
                        style={styles.input}
                      >
                        <TextInput
                          placeholder="Heure de nuit"
                          style={styles.input}
                          editable={false}
                          value={selectedTimeNuit}
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDateTimePicker}
                  />

                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.signIn}
                      onPress={addMedicament}
                    >
                      <LinearGradient
                        colors={["#01BACF", "#0EBFE3"]}
                        style={styles.signIn}
                      >
                        <Text style={[styles.textSign, { color: "#fff" }]}>
                          Ajouter
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
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
  button: {
    alignItems: "center",
    marginTop: 40,
    borderRadius: 8,
    padding: 20,
  },
  signIn: {
    width: WIDTH - 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 0,
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
    marginLeft: 30,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    alignItems: "center",
    width: "85%",
   
    alignSelf: "center",
    height: "100%",
    marginBottom:50,
    marginTop:80

    // Pour l'ombre sur iOS
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6, 
    borderColor: "rgb(70, 143, 183)", 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    marginTop: 20,
    height: 50, 
  },

  icon: {
    marginRight: 11,
    color: "#01BACF", 
  },
  input: {
    flex: 1, 
    height: 70, 
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "#01BACF",
    borderRadius: 8,
    paddingHorizontal: 0,
  },
  buttons: {
    backgroundColor: "rgb(70, 143, 183)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
