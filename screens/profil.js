import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import conta from "../assets/asmaaa.png";
import { getClientData, updateClientData } from "../utils/AsyncStorageClient";
import Toast from "react-native-toast-message";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default function Profiil({ navigation }) {
  const [user, setUser] = useState({});
  const [age, setAge] = useState("");
  const [Num_tel, setNumTel] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientData();
        setUser(data);
        setAge(data?.Data?.age || "");
        setNumTel(data?.Data?.Num_tel || "");
        setEmail(data?.Data?.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const editProfile = async () => {
    if (
      !age ||
      !Num_tel ||
      Num_tel < 0 ||
      Num_tel.length !== 8 ||
      (!validateEmail(email) && email !== "")
    ) {
      setError(true);
      return false;
    }

    try {
      const res = await fetch(
        `http://192.168.43.105:5000/api/utlisateur/modifier/${user?.Data?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age,
            Num_tel,
            email,
          }),
        }
      );

      const data = await res.json();
     
        Toast.show({
          position: "top",
          type: "success",

          text1: "Profil",
          text2: "Mise à jours avec succès",

          autoHide: true,
          visibilityTime: 4000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("dash");
          },
          onShow: () => {},
        });
      
      console.log(data);

      const newUser = { ...user, Data: { ...user.Data, age, Num_tel, email } };
      await updateClientData(newUser);
      console.log("succès");
    } catch (error) {
      console.log("erreur", error);
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT  , backgroundColor:"#0147A6"}}>
      <ScrollView>
      
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
                  source={require('../assets/back.png')}
                  style={{width:40 , height:40 , marginTop:20 , tintColor:"white"}}
                />
        </TouchableOpacity>
        <Toast/>
        <View style={styles.popupContainer}>

     
          <Image
            source={conta}
            style={{
              width: 190,
              height: 220,
              alignSelf: "center",
              marginTop: 5,
            }}
          />
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
              value={Num_tel}
              defaultValue={Num_tel}
              onChangeText={(val) => setNumTel(val)}
            />
          </View>
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
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </View>

          <View style={styles.inputContainer}>
            <AntDesign
              name="user"
              color="rgb(70, 143, 183)"
              size={20}
              style={styles.icon}
            />
            <TextInput
              placeholder="Age"
              style={styles.input}
              value={age}
              onChangeText={(val) => setAge(val)}
            />
          </View>

          {error && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 10 }}>
              Veuillez remplir tous les champs correctement.
            </Text>
          )}

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={editProfile}>
              <LinearGradient
                colors={["rgb(97, 172, 243)", "rgb(97, 172, 243)"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Mettre à jour
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: "white",
    padding: 10,
    width: WIDTH - 20,
    height:600,
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 80,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 0.6,
    borderColor: "rgb(70, 143, 183)",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
  },
  icon: {
    marginRight: 11,
  },
  input: {
    flex: 1,
    height: 70,
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "rgb(70, 143, 183)",
    borderRadius: 8,
    paddingHorizontal: 0,
  },
  button: {
    alignItems: "center",
    marginTop: 70,
    borderRadius: 8,
  },
  signIn: {
    width: WIDTH - 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
