import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import h from "./assets/abc.png";
import LoginC from "./screens/login";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Logo = ({ navigation }) => {
  useEffect(() => {
    if (navigation) {
      const timer = setTimeout(() => {
        navigation.navigate("LoginC");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MédicoAlerte</Text>
      <Image source={h} style={styles.logo} resizeMode="contain" />

      <Text style={styles.texte}>
        Votre santé est notre priorité. Avec MédicoAlerte, restez en contrôle de
        votre bien-être
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LoginC")} // Navigation vers LoginC
      >
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37D0F9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -screenHeight * 0.3,
  },
  logo: {
    width: screenWidth * 0.8, // 80% de la largeur de l'écran
    height: screenHeight * 0.5, // 50% de la hauteur de l'écran
  },
  button: {
    width: 250,
    backgroundColor: "#FF6347", // Couleur de fond du bouton
    borderRadius: 5, // Bord arrondi du bouton
    paddingVertical: 10, // Espace à l'intérieur du bouton
    marginTop: 20, // Marge en haut du bouton
    alignItems: "center", // Alignement des éléments à l'intérieur du bouton
  },
  buttonText: {
    color: "#FFFFFF", // Couleur du texte du bouton
    fontSize: 16, // Taille de police du texte du bouton
    fontWeight: "bold", // Gras pour le texte du bouton
  },
  texte: {
    textAlign: "center",

    fontSize: 18, // Changer la taille de la police selon vos préférences
    color: "#ffffff", // Couleur du texte en blanc
  },
  title: {
    marginTop: screenHeight * 0.2,
    // Utilisation de la police Arial
    fontSize: 18,
    color: "#ffffff",
  },
});

export default Logo;
