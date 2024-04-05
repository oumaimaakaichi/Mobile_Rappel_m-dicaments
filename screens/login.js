import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Dimensions,
  LogBox,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "react-native-paper";

import { storeClientData } from "../utils/AsyncStorageClient";

import Icon from "react-native-vector-icons/Feather";
LogBox.ignoreAllLogs(true);
const LoginC = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const [error, setError] = useState(false);
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = () => {
    if (!data.email || !data.password) {
      setError(true);
      console.log("Champs obligatoires non remplis");
      return;
    }

    fetch("http://192.168.1.20:5000/api/utlisateur/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Identifiants invalides");
        }
        return response.json();
      })
      .then((res) => {
        /* console.log("Réponse de l'API :", res); // Afficher la réponse complète de l'API
        console.log("Contenu de res.Data :", res.Data); // Afficher le contenu de res.Data
        console.log("Contenu de res.Data.email :", res.Data.email); // Tentative d'accéder à res.Data.email
        storeClientData(res.Data);*/
        navigation.navigate("dash");
        console.log("Réponse de l'API :", res); // Afficher la réponse complète de l'API
        storeClientData(res); // Enregistrer la réponse complète dans AsyncStorage
        navigation.navigate("dash");
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/k2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor="white" />
          <></>

          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.background,
                marginLeft: 10,
                marginRight: 10,
                textAlign: "center",
                marginTop: 120,
                borderRadius: 20,
              },
            ]}
          >
            {/*<Text style={styles.text_header}>aaa</Text>*/}
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginLeft: 2,
                },
              ]}
            >
              Email
            </Text>
            <View style={styles.action}>
              <Icon name="user" color="black" style={styles.icon} size={20} />

              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    marginTop: 5,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {error && !data.email && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {" "}
                champ obligatoire *
              </Text>
            )}

            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  email doit contenir minimum 3 caractéres
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                  fontSize: 15,
                  marginLeft: 2,
                },
              ]}
            >
              Mot de passe
            </Text>
            <View style={styles.action}>
              <Feather
                name="lock"
                style={styles.icon}
                color={colors.text}
                size={20}
              />
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                    marginTop: 5,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {error && !data.password && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {" "}
                champ obligatoire *
              </Text>
            )}

            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password doit contenir minimum 6 caractéres
                </Text>
              </Animatable.View>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  loginHandle();
                }}
              >
                <LinearGradient
                  colors={["rgb(97, 172, 243)", "#rgb(97, 172, 243)"]}
                  style={styles.signIn}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Se connecter
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("registre")}
                style={[
                  styles.signIn,
                  {
                    borderColor: "#rgb(97, 172, 243);",
                    borderWidth: 1,
                    marginTop: 30,
                    marginBottom: 50,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#rgb(97, 172, 243);",
                    },
                  ]}
                >
                  Créer nouveau compte
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default LoginC;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor:"rgb(97, 172, 243)",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 100,
    paddingBottom: 40,
    marginTop: 10,
  },
  footer: {
    flex: 3,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  text_footer: {
    color: "#12769E",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4A919E",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#003C57",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    marginTop: 40,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginTop: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
