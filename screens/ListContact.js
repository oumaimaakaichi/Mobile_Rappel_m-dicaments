import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { getClientData } from "../utils/AsyncStorageClient";
import Toast from "react-native-toast-message";
import { useFocusEffect } from '@react-navigation/native';
const { width: WIDTH } = Dimensions.get('window');
export default function ListContact({ navigation }) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchData = async () => {
    const userData = await getClientData();
    const response = await fetch(
      `http://192.168.43.105:5000/contactsUtilisateur/${userData?.Data?._id}`
    );
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const deleteContact = async (id) => {
    try {
      await fetch(`http://192.168.43.105:5000/api/deleteC/${id}`, {
        method: "DELETE",
      });
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Contact supprimé",
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
        <View style={styles.itemContainer}>
          <View style={styles.itemContent}>
            <Text style={styles.contactText}>Contact:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", marginStart: 10 }}>Docteur: </Text>
              <Text style={styles.WrapText}>{item.nom_docteur} </Text>
              <Text style={styles.WrapText}>{item.Prenom_docteur} </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.marginText}>Spécialité: {item.Specialite_docteur}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("OneContact", {
                    itemId: item._id,
                    getContact: item,
                    navigation: navigation,
                  });
                }}
                style={{marginLeft:90}}
              >
                <Image
                  source={require('../assets/yeux2-removebg-preview.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(item._id)}>
                <Image
                  source={require('../assets/delete.png')}
                  style={{tintColor:"#2A629A", width:30, height:30, marginLeft:30}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.separator}></View>
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/search.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder="Rechercher"
        />
      </View>
      <View style={styles.listContainer}>
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
    backgroundColor: "rgb(237, 243, 247)",
    width: WIDTH - 30,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor:"#2A629A"
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderWidth: 0,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 11,
    marginTop: 10,
    borderRadius: 10,
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
  },
  itemContent: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  contactText: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    marginStart: 10,
  },
  marginText: {
    marginStart: 10,
  },
  WrapText: {
    marginStart: 2,
    fontSize: 13,
    marginBottom: 15,
  },
  icon: {
    width: 35,
    height: 35,
    marginStart:20,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
});
