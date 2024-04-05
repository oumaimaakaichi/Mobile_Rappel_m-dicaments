import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { getClientData } from "../utils/AsyncStorageClient";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const { width: WIDTH } = Dimensions.get('window')
export default function ListContact({ navigation }) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(async() => {
    const userData = await getClientData();
    const response = await fetch(
      `http://192.168.43.105:5000/contactsUtilisateur/${userData?._id}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  }, []);

  const fetchData = async () => {
    const userData = await getClientData();
    const response = await fetch(
      `http://192.168.43.105:5000/contactsUtilisateur/${userData?._id}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`http://192.168.43.105:5000/api/deleteC/${id}`, {
        method: "DELETE",
      });
      Toast.show({
        type: "error",
        text1: "Echec",
        text2: "Echec de refus",
        visibilityTime: 1000,
        position: "top",
      });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "rgb(187, 205, 215);",
            marginBottom: 11,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            padding: 10,
            marginStart: 7,
            marginEnd: 8,
          }}
        >
          <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>Contact:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", marginStart: 10 }}>Docteur: </Text>
              <Text style={styles.WrapText}>{item.nom_docteur} </Text>
              <Text style={styles.WrapText}>{item.Prenom_docteur} </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginStart: 10 }}>Spécialité: {item.Specialite_docteur}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OneContact", {
                    itemId: item._id,
                    getContact: item,
                    navigation: navigation,
                  });
                }}
              >
                <AntDesign name="eyeo" size={27} color="blue" style={{ marginStart: 10, marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(item._id)}>
                <MaterialIcons name="delete" size={25} color="#D90115" />
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                  navigation.navigate("UpdateContact", {
                    itemId: item._id,
                    getContact: item,
                    navigation: navigation,
                  });
                }}>
      <MaterialIcons name="update" size={25} color="green" />
    </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#F0F0F0",
          }}
        ></View>
      </>
    );
  };

  const filteredData = data
    ? data.filter(
        (item) =>
          item.Specialite_docteur.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nom_docteur.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.adresse_doc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "rgb(237, 243, 247)" , width:WIDTH-30 }}>
         <View style={styles.inputContainer}>
  <AntDesign name="search1" color="rgb(70, 143, 183)" size={20} style={styles.icon} />
  <TextInput

    style={styles.input}
    onChangeText={(text) => setSearchQuery(text)}
    value={searchQuery}
    placeholder="Rechercher"
  />
</View>
     
      <View style={StyleSheet.container}>
        {data == null ? (
          <Text>Loading</Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  WrapText: {
    marginStart: 2,
    marginEnd: 0,
    fontSize: 13,
    marginBottom: 15,
  },


  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6, // Ajoutez d'autres styles de bordure selon vos besoins
    borderColor: 'black', // Couleur de la bordure
    borderRadius: 5, // Bordure arrondie
    paddingHorizontal: 10, // Marge horizontale interne
    marginTop: 20,
    height:50 // Espacement vers le haut
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
});
