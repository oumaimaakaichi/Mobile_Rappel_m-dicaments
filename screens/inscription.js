import React, { useState, useEffect } from "react";
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
  ImageBackground,
  Dimensions,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import * as FilesSystem from "expo-file-system";
const InscriC = ({ navigation }) => {
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

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
  const [error, setError] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [Num_tel, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [nbr_enfants, setNombreEnf] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!response.cancelled) {
        console.log("ffffffffff" + response.assets[0].uri);
        setAvatar(response.assets[0].uri);
        FilesSystem.uploadAsync(
          "http://192.168.43.116:5000/api/utlisateur/upload-image",
          response.assets[0].uri,
          {
            fieldName: "avatar",
            uploadType: FilesSystem.FileSystemUploadType.MULTIPART,
          }
        ).then((res) => setAvatarFile(res.body));
      }
    }
  };

  const AddClient = async () => {
    console.log("file" + avatarFile);
    if (
      !password ||
      !email ||
      !nom ||
      !prenom ||
      !Num_tel ||
      Num_tel < 0 ||
      password.length < 6 ||
      Num_tel.length != 8 ||
      (!regEx.test(email) && email != "")
    ) {
      setError(true);
      return false;
    }

    try {
      const formData = new FormData();

      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("Num_tel", Num_tel);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("nbr_enfants", nbr_enfants);
      formData.append("avatar", avatarFile);
      const response = await fetch(
        "http://192.168.43.116:5000/api/utlisateur/add-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.email !== "" && data.password !== "") {
        navigation.navigate("LoginC");
        Toast.show({
          position: "top",
          type: "success",

          text1: "Inscription",
          text2: "Inscription validée",

          autoHide: true,
          visibilityTime: 5000,
          autoHide: true,
          onHide: () => {
            navigation.navigate("signin");
          },
          onShow: () => {},
        });
        console.log("ajouter avec suctcès");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function Add() {
    console.log(avatarFile);

    const data = {
      nom,
      prenom,
      age,
      Num_tel,
      email,
      password,
      avatar: avatarFile,
      nbr_enfants,
    };

    axios
      .post("http://192.168.43.116:5000/api/utlisateur/add-user", data)
      .then(({ data }) => {
        if (data) {
          if (data.email != "" && data.password != "") {
            console.log("suycc");
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <ImageBackground
      source={require("../assets/k2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Toast />

          <StatusBar backgroundColor="white" />

          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.background,
                marginTop: 100,
                marginLeft: 15,
                marginRight: 15,
              },
            ]}
          >
            <View>
              <TouchableOpacity
                onPress={openImageLibrary}
                style={styles.uploadBtnContainer}
              >
                {avatar ? (
                  <Image
                    source={{ uri: avatar }} // Utilisez l'URI de l'image sélectionnée
                    style={{ width: "70%", height: "100%" }}
                  />
                ) : (
                  <Text
                    style={styles.uploadBtn}
                    onChangeText={(text) => setProfileImage(text)}
                  >
                    Cliquer pour choisir une image
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 25,
                  marginBottom: 15,
                },
              ]}
            >
              Nom
            </Text>
            <View style={styles.action}>
              <Icon
                name="user"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />

              <TextInput
                placeholder="nom "
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setNom(val)}
              />
            </View>
            {error && !nom && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                {" "}
                champ obligatoire *
              </Text>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Prenom
            </Text>
            <View style={styles.action}>
              <Icon
                name="user"
                style={{
                  marginTop: -10,
                }}
                color="#01BACF"
                size={20}
              />
              <TextInput
                placeholder="prenom "
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setPrenom(val)}
              />
            </View>
            {error && !prenom && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                {" "}
                champ obligatoire *
              </Text>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Numéro du téléphone
            </Text>
            <View style={styles.action}>
              <Icon
                name="phone"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />
              <TextInput
                placeholder=" Numéro  du téléphone"
                placeholderTextColor="#666666"
                keyboardType="numeric"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setNumero(val)}
              />
            </View>
            {error && !Num_tel && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                {" "}
                champ obligatoire *
              </Text>
            )}
            {error && Num_tel.length != 8 && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                Numéro du téléphone doit contenir 8 chiffres
              </Text>
            )}
            {error && Num_tel < 0 && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                Numéro du téléphone doit etre positive
              </Text>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Age
            </Text>
            <View style={styles.action}>
              <Icon
                name="calendar"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />

              <TextInput
                placeholder=" Age"
                placeholderTextColor="#666666"
                keyboardType="numeric"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setAge(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Nombre d'enfants
            </Text>
            <View style={styles.action}>
              <Icon
                name="users"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />

              <TextInput
                placeholder=" Nombre des enfants"
                placeholderTextColor="#666666"
                keyboardType="numeric"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setNombreEnf(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  fontSize: 15,
                  marginTop: 35,
                  marginBottom: 15,
                },
              ]}
            >
              Email
            </Text>
            <View style={styles.action}>
              <Icon
                name="mail"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />
              <TextInput
                placeholder="email du client"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
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

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                  fontSize: 15,
                  marginBottom: 15,
                },
              ]}
            >
              Mot de passe
            </Text>
            <View style={styles.action}>
              <Feather
                name="lock"
                color="#01BACF"
                size={20}
                style={{
                  marginTop: -10,
                }}
              />
              <TextInput
                placeholder="Mot de passe du client"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => setPassword(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {error && !password && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                {" "}
                champ obligatoire *
              </Text>
            )}
            {error && password.length < 6 && (
              <Text style={{ color: "red", fontSize: 10, fontWeight: "bold" }}>
                {" "}
                Mot de passe doit contenir minimum 6 caractéres{" "}
              </Text>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  AddClient();
                }}
              >
                <LinearGradient
                  colors={["#01BACF", "#0EBFE3"]}
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
                    S'inscrire
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("LoginC")}
                style={[
                  styles.signIn,
                  {
                    borderColor: "#01BACF",
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
                      color: "#01BACF",
                    },
                  ]}
                >
                  Connexion
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default InscriC;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0147A6",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: "#01BACF",
    borderWidth: 1,
    alignSelf: "center",
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: "#01BACF",
  },
  text_footer: {
    color: "#4A919E",
    fontSize: 18,
  },
  action: {
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
    color: "#4A919E",
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
});
