import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import profl from "../assets/asmaaa.png";
import { getClientData, updateClientData } from "../utils/AsyncStorageClient";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const [user, setUser] = useState("");
  const [age, setAge] = useState("");
  const [Num_tel, setNumTel] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const editProfile = async () => {
    if (
      !age ||
      age < 0 ||
      !Num_tel ||
      Num_tel < 0 ||
      Num_tel.length != 8 ||
      (!regEx.test(email) && email != "")
    ) {
      setError(true);
      return false;
    }
    try {
      const res = await fetch(
        `http://192.168.43.116:5000/api/utlisateur/modifier/${user?._id}`,
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
      alert("succèss");
    } catch (error) {
      console.log("erreur", error);
    }
  };

  useEffect(async () => {
    const data = await getClientData();
    setUser(data);
    setAge(data?.age);
    setNumTel(data?.Num_tel);
    setEmail(data?.email);

    fetchData();
  }, []);

  const validateEmail = (email) => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return regex.test(email);
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View style={styles.popupContainer}>
          <Image
            source={profl}
            style={{
              width: 250,
              height: 140,
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
              defaultValue={Num_tel}
              onChangeText={(val) => setNumTel(val)}
            />
          </View>
          {error && !Num_tel && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
              {" "}
              champ obligatoire *
            </Text>
          )}
          {error && Num_tel < 0 && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
              Numéro du téléphone doit etre positive
            </Text>
          )}
          {error && Num_tel.length != 8 && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
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
              placeholder="Email "
              style={styles.input}
              defaultValue={email}
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          {error && !email && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
              {" "}
              champ obligatoire *
            </Text>
          )}
          {error && !regEx.test(email) && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
              {" "}
              email invalide
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
              placeholder="Age"
              style={styles.input}
              defaultValue={age}
              onChangeText={(val) => setAge(val)}
            />
          </View>
          {error && !age && (
            <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
              {" "}
              champ obligatoire *
            </Text>
          )}

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={editProfile}>
              <LinearGradient
                colors={["#01BACF", "#0EBFE3"]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 300,
    height: 300,
    alignSelf: "center",
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

  errorText: {
    color: "red",
    fontSize: 10,
    fontWeight: "bold",
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
    height: "H",
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
