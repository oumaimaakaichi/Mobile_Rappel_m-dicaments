import React, { useState, useEffect , useCallback } from "react";
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
import { getClientData } from "../utils/AsyncStorageClient";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as OpenAnything from "react-native-openanything";
import { useFocusEffect } from '@react-navigation/native';
const { width: WIDTH } = Dimensions.get("window");

export default function ListDoc({ navigation }) {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userData = await getClientData();
      console.log("User ID:", userData?._id);
      const response = await fetch(
        `http://192.168.43.105:5000/docUser/${userData?.Data?._id}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
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
      await fetch(`http://192.168.43.105:5000/deleteDoc/${id}`, {
        method: "DELETE",
      });
      Toast.show({
        type: "error",
        text1: "Échec",
        text2: "Échec de la suppression",
        visibilityTime: 1000,
        position: "top",
      });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 11,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#A0DEFF",
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
        <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10 }}>
          Document:
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", marginStart: 10 }}>Document: </Text>
          <Text style={styles.WrapText}>{item.nom_document}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              if (item.image) {
                navigation.navigate("oneDoc", {
                  itemId: item._id,
                  getDoc: item,
                  docPDF: item.document,
                  navigation: navigation,
                });
              } else if (item.document) {
                OpenAnything.Pdf(item.document);
              }
            }}
          >
            <Image
              source={require("../assets/yeux2-removebg-preview.png")}
              style={{ width: 50, height: 50, marginLeft: 80, marginTop: -10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteContact(item._id)}>
            <Image
              source={require("../assets/delete.png")}
              style={{ width: 30, height: 30, marginLeft: 30, tintColor: "#2A629A" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );

  const filteredData = data
    ? data.filter((item) =>
        item.nom_document.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: "white", width: WIDTH - 30 }}>
      <View style={styles.inputContainer}>
        <Image source={require("../assets/search.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder="Rechercher"
        />
      </View>
      <View style={StyleSheet.container}>
        {isLoading ? (
          <Text>Loading...</Text>
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
    backgroundColor: "white",
  },
  WrapText: {
    marginStart: 2,
    marginEnd: 0,
    fontSize: 13,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    height: 50,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 11,
    width: 30,
    height: 30,
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
});
