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
import conta from "../assets/joo.png";
import Toast from "react-native-toast-message";
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

      const response = await fetch("http://192.168.43.105:5000/add-document", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      if(response.ok){
       navigation.navigate('docc')
          Toast.show({
           position: "top",
           type: "success",
 
           text1: "Ajout d'un document",
           text2: "Document ajouté avec succès",
           
 
           autoHide: true,
           visibilityTime: 8000,
           autoHide: true,
           onHide: () => {
             navigation.navigate("docc");
           },
           onShow: () => {},
         });
        }
      console.log("Réponse de l'API :", responseData);
    } catch (error) {
      console.log("Erreur lors de l'envoi des fichiers à l'API :", error);
    }
  };

  return (
    <ScrollView style={{backgroundColor:"white"}}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
        <Image source={require('../assets/back.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
        
     <Toast/>
      <Image source={conta} style={styles.headerImage} />
       



<TouchableOpacity onPress={handleDocumentPick} style={styles.uploadButton}>
          <Image source={require('../assets/pload.png')} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Télécharger un pdf</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleUpload}>
          <LinearGradient colors={["#61acf3", "#61acf3"]} style={styles.signInButton}>
            <Text style={styles.signInText}>Ajouter</Text>
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
  headerImage: {
    width: 300,
    height: 230,
    alignSelf: "center",
    marginTop: 170,
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#e0f0ff",
  },
  uploadIcon: {
    width: 40,
    height: 40,
  },
  cameraIcon: {
    width: 37,
    height: 37,
    tintColor: "blue",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(70, 143, 183)",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
    width: WIDTH - 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 0,
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: WIDTH - 40,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 200,
    borderRadius: 8,
  },
  signInButton: {
    width: WIDTH - 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
});

export default AddDocPDF;
