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
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { getClientData } from "../utils/AsyncStorageClient";
import { AntDesign } from "@expo/vector-icons";
import conta from "../assets/docIm-removebg-preview.jpg";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
const { width: WIDTH } = Dimensions.get("window");

const AddDocPDF = ({ navigation }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [nomDocument, setNomDocument] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getClientData();
      setUser(userData.Data._id);
    };
    fetchUser();
  }, []);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.cancelled) {
        setSelectedDocument(result.assets[0].uri);
      }
      console.log("pdfs" + JSON.stringify(result, null, 2));
    } catch (error) {
      console.log("Erreur lors de la sélection du document PDF :", error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      if (selectedDocument) {
        const documentFile = {
          uri: selectedDocument,
          type: "application/pdf",
          name: "document.pdf",
        };
        formData.append("document", documentFile);
      }
      formData.append("nom_document", nomDocument);
      formData.append("utilisateur", user);

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
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.navigate("doc")}
          />
        </View>
        <Image
          source={conta}
          style={{
            width: 220,
            height: 200,
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 30,
          }}
        />
        <Button
          style={{ backgroundColor: "transparent", borderColor: "transparent" }}
        >
          <TouchableOpacity
            onPress={handleDocumentPick}
            style={styles.uploadButton}
          >
            <AntDesign
              name="upload"
              color="rgb(70, 143, 183)"
              size={25}
              style={styles.icon}
            />
            <Text style={styles.tx}>Sélectionner un PDF</Text>
          </TouchableOpacity>
        </Button>
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
            onChangeText={(val) => setNomDocument(val)}
          />
        </View>
        {selectedDocument && (
          <View style={styles.imageContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Fichier sélectionné :
            </Text>
            <Text>{selectedDocument}</Text>
          </View>
        )}
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
  uploadButton: {
    flexDirection: "row",

    marginTop: 60,
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
    width: WIDTH - 30,
  },
  tx: {
    fontSize: 20, // Taille de la police en nombre, pas en chaîne de caractères
    fontWeight: "500",
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
    width: WIDTH - 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
});

export default AddDocPDF;
