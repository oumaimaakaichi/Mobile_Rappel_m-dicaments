import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { getClientData } from "../utils/AsyncStorageClient";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
// Menu

import conta from "../assets/docIm-removebg-preview.jpg";
import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
const AddDoc = (navigation) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const userData = await getClientData();
    setUser(userData.data._id);
    console.log(user);
  }, []);
  const [nom_document, setNom] = useState("");
  const [utilisateur, setUtilisateur] = useState("");
  const handleDocumentPick = async () => {
    try {
      // Vérifiez si une sélection de doctument est déjà en cours
      if (isDocumentPicking) {
        return;
      }

      // Définissez l'état ipour indiquer qu'une sélection de document est en cours
      setIsDocumentPicking(true);

      // Sélectionnez le docuument
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log(result);

      // Réinitialisez l'état une fois la sélection terminée
      setIsDocumentPicking(false);
    } catch (error) {
      console.log("Erreur lors de la sélection du document PDF :", error);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
      console.log(result.assets[0].uri);
    } catch (error) {
      console.log("Erreur loors de la sélectinon de l'image :", error);
    }
  };

  const [isDocumentPicking, setIsDocumentPicking] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
      console.log(result.assets[0].uri);
    } catch (error) {
      console.log("Erreur lors de la prise de la photo :", error);
    }
  };

  const handleUpload = async () => {
    try {
      const data = await getClientData();
      const formData = new FormData();

      // Ajouter l'image sélectionnée au FormData
      if (selectedImage) {
        const imageFile = {
          uri: selectedImage,
          type: "image/jpeg",
          name: "image.jpg",
        };
        formData.append("image", imageFile);
      }

      // Ajouter le document sélectionné au FormData
      if (selectedDocument) {
        const documentFile = {
          uri: selectedDocument,
          type: "application/pdf",
          name: "document.pdf",
        };
        formData.append("document", documentFile);
      }

      // Ajouter d'autres champs nécedssaires (nom_document, utilisateur, etc.) au FormData
      formData.append("nom_document", nom_document);
      formData.append("utilisateur", data.Data._id);

      // Envoyer la requête POST au backend
      const response = await fetch("http://192.168.43.116:5000/add-document", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      console.log("Réponse de l'API :", responseData);
    } catch (error) {
      console.log("Erreur lors de l'envoi des fichiers à l'API :", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.backIconContainer}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("doc");
            }}
          />
        </View>
        <Image
          source={conta}
          style={{
            width: 220,
            height: 200,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        />

        <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
          <AntDesign
            name="upload"
            color="rgb(70, 143, 183)"
            size={25}
            style={styles.icon}
          />
          <Text style={styles.txt}>Sélectionner une image du document</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleTakePhoto}
          style={styles.uploadButton1}
        >
          <AntDesign
            name="camerao"
            color="rgb(70, 143, 183)"
            size={25}
            style={styles.icon}
          />
          <Text style={styles.txt}>Prendre une nouvelle photo </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <AntDesign
            name="mail"
            color="rgb(70, 143, 183)"
            size={20}
            style={styles.icon}
          />
          <TextInput
            placeholder="Nom du document"
            style={styles.input}
            onChangeText={(val) => setNom(val)}
          />
        </View>
        {/* Afficher l'image sélectionnnée */}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} onPress={handleUpload}>
          <LinearGradient
            colors={["rgb(97, 172, 243)", "rgb(97, 172, 243)"]}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#fff" }]}>Ajouter</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    marginTop: 21,
    alignItems: "center",
  },
  image: {
    width: WIDTH - 40,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
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
  txt: {
    fontSize: 15,
    fontWeight: "300",
  },
  button: {
    alignItems: "center",
    marginTop: 40,
    borderRadius: 8,
  },
  signIn: {
    width: WIDTH - 40,
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
  popupContainer: {
    backgroundColor: "white",
    padding: 10,
    width: 282,
    borderRadius: 10,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: "#000", // Pour l'ombre sur iOS
    shadowOffset: { width: 0, height: 2 }, // Pour l'ombre sur iOS
    shadowOpacity: 0.25, // Pour l'ombre sur iOS
    shadowRadius: 3.84, // Pour l'ombre sur iOS
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
  },
  uploadButton1: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 25,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6, // Ajoutez d'autres styles de bordure selon vos besoins
    borderColor: "rgb(70, 143, 183)", // Couleur de la bordure
    borderRadius: 5, // Bordure arrondie
    paddingHorizontal: 10, // Marge horizontale interne
    marginTop: 20,
    height: 50,
    width: WIDTH - 40, // Espacement vers le haut
  },

  icon: {
    marginRight: 11, // Espacement à droite de l'icône
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
    backgroundColor: "rgb(70, 143, 183)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
});

export default AddDoc;
