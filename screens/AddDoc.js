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
import * as ImagePicker from "expo-image-picker";
import { getClientData } from "../utils/AsyncStorageClient";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import conta from "../assets/joo.png";

const { width: WIDTH } = Dimensions.get("window");

const AddDoc = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [nom_document, setNom] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true; 

    const fetchUserData = async () => {
      const userData = await getClientData();
      if (isMounted) {
        setUser(userData.data._id);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false; 
    };
  }, []);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setSelectedDocument(result.uri);
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

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erreur lors de la sélection de l'image :", error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Erreur lors de la prise de la photo :", error);
    }
  };

  const handleUpload = async () => {
    if (!nom_document) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const data = await getClientData();
      const formData = new FormData();

      if (selectedImage) {
        const imageFile = {
          uri: selectedImage,
          type: "image/jpeg",
          name: "image.jpg",
        };
        formData.append("image", imageFile);
      }

      if (selectedDocument) {
        const documentFile = {
          uri: selectedDocument,
          type: "application/pdf",
          name: "document.pdf",
        };
        formData.append("document", documentFile);
      }

      formData.append("nom_document", nom_document);
      formData.append("utilisateur", data.Data._id);

      const response = await fetch("http://192.168.43.105:5000/add-document", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        navigation.navigate('docc');
      }
    } catch (error) {
      console.log("Erreur lors de l'envoi des fichiers à l'API :", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
        <Image source={require('../assets/back.png')} style={{ width: 40, height: 40, marginBottom: 70 }} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Toast style={{ marginTop: 41 }} />
        <Image source={conta} style={styles.headerImage} />

        <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
          <Image source={require('../assets/pload.png')} style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Télécharger une photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto} style={styles.uploadButton}>
          <Image source={require('../assets/camera-to-take-photos.png')} style={styles.cameraIcon} />
          <Text style={styles.uploadText}>Prendre une nouvelle photo</Text>
        </TouchableOpacity>
        {error && !selectedImage  && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 10 }}>
            Veuillez sélectionner une image.
          </Text>
        )}
        <View style={styles.inputContainer}>
          <AntDesign name="mail" color="rgb(70, 143, 183)" size={20} style={styles.icon} />
          <TextInput
            placeholder="Nom du document"
            style={styles.input}
            onChangeText={(val) => setNom(val)}
          />
          {error && !nom_document && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 10 }}>
              Champ obligatoire
            </Text>
          )}
        </View>
        
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}

        
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleUpload}>
          <LinearGradient colors={["#61acf3", "#61acf3"]} style={styles.signInButton}>
            <Text style={styles.signInText}>Ajouter</Text>
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
    backgroundColor: "white",
  },
  headerImage: {
    width: 300,
    height: 230,
    alignSelf: "center",
    marginTop: 130,
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
    marginBottom: 51,
    left: 20,
    zIndex: 1,
  },
});

export default AddDoc;
