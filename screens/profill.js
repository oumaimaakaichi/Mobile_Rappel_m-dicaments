import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { DataTable } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
import conta from "../assets/asmaaa.png";
const { height: HEIGHT } = Dimensions.get("window");
import { getClientData, updateClientData } from "../utils/AsyncStorageClient";
export default function Profiil({ navigation }) {
  const [user, setUser] = useState("");
  const [age, setAge] = useState("");
  const [Num_tel, setNumTel] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientData();
      setUser(data);
      setAge(data?.age);
      setNumTel(data?.Num_tel);
      setEmail(data.email);
    };

    fetchData();
  }, []);
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
        `http://192.168.1.17:5000/api/utlisateur/modifier/${user?._id}`,
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
      console.log(data);

      const newUser = { ...user, age, Num_tel, email };
      await updateClientData(newUser);
      console.log("succèss");
    } catch (error) {
      console.log("erreur", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getClientData();
        setUser(userData);
        setUserId(userData.Data._id);
        console.log("UserData:", userData);
        console.log("User ID:", userData.Data._id);
      } catch (error) {
        console.error("Error fetching user dbata:", error);
      }
    };

    
  }, []);
  return (
    <SafeAreaView style={{ height: HEIGHT }}>
      <ScrollView>
        <View style={styles.popupContainer}>
          <Image
            source={conta}
            style={{
              width: 190,
              height: 190,
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
              defaultValue={user?.Data?.Num_tel}
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
              defaultValue={user?.Data?.email}
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
              defaultValue={user?.Data?.age}
              onChangeText={(val) => setAge(val)}
            />
          </View>

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
  container: {
    paddingTop: 25,
    backgroundColor: "beige",
  },

  f: {
    fontStyle: "italic",
    color: "red",
  },
  popupContainer: {
    backgroundColor: "white",
    padding: 10,
    width: WIDTH - 20,
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
    marginTop: 40,
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
});
