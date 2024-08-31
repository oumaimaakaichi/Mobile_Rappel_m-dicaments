import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width: WIDTH } = Dimensions.get("window");
import conta from "../assets/yaya.png";
import { LinearGradient } from "expo-linear-gradient";

import { MaterialIcons } from "@expo/vector-icons";
const { height: HEIGHT } = Dimensions.get("window");

export default function OneMed({ route, navigation }) {
  const { med } = route.params;
  const [contact, setContact] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editedContact, setEditedContact] = useState({});
  const [formData, setFormData] = useState({
    nom_medicament: '',
    Matin: { matin: false, DatePrise: '' },
    nuit: { nuit: false, DatePrise: '' },
    demi_journe: { demi_journe: false, DatePrise: '' },
    duree: 0,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setContact(med);
    setFormData(med);
  }, []);

  const handleUpdateMedicament = async () => {
    console.log('Attempting to update medicament:', formData);

    try {
      const response = await fetch(`http://192.168.43.105:5000/medicamentsUpdate/${contact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Update response data:', data);
      setMessage(data.message || 'Medication updated successfully');
      setContact(data);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating medication:', error);
      setMessage('Error updating medication');
    }
  };

  const handleUpdatePrendre = async () => {
    console.log('Attempting to update prendre field');

    try {
      const response = await fetch(`http://192.168.43.105:5000/medicamentsPrendre/${contact._id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Update prendre response data:', data);
      setMessage(data.message || 'Prendre field updated successfully');
      setContact(data);
    } catch (error) {
      console.error('Error updating prendre field:', error);
      setMessage('Error updating prendre field');
    }
  };
  const deleteContact = async (id) => {
    try {
      await fetch(`http://192.168.43.105:5000/deleteMed/${contact._id}`, {
        method: "DELETE",
      });

      
      navigation.navigate("Allmedicament")
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
    }
  };
  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ backgroundColor: "#fff" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
                  source={require('../assets/back.png')}
                  style={{width:40 , height:40 , marginTop:20}}
                />
          </TouchableOpacity>
        </View>
        <Image
          source={conta}
          style={{
            width: "80%",
            height: 240,
            alignSelf: "center",
            marginTop: 46,
          }}
        />
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 19,
            alignSelf: "center",
            marginTop: 11,
            marginBottom: 36,
          }}
        >
          Informations de la Médicament
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "red;",
            marginBottom: 80,
            marginTop: 30,
            borderRadius: 11,
            backgroundColor: "#01BACF",
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 10,
              width: "81%",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBottom: 20,
                  textDecoration: "underline",
                  color: "#0147A6",
                }}
              >
                Médicament
              </Text>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginStart: 10,
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Nom du Médicament:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#0147A6",
                  }}
                >
                  {contact.nom_medicament}{" "}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginStart: 10, marginTop: 15, color: "#fff" }}>
                  Date de prise de ce médicament
                </Text>
              </View>

              {contact.Matin?.DatePrise && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ marginStart: 10, marginTop: 15, color: "#fff" }}
                  >
                    Matin:{" "}
                    <Text style={{ color: "#0147A6" }}>
                      {contact.Matin.DatePrise}
                    </Text>
                  </Text>
                </View>
              )}

              {contact.demi_journe?.DatePrise && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginStart: 10, marginTop: 15 , color:"white" }}>
                    Démi journée:{" "}
                    <Text style={{ color: "#0147A6" }}>
                      {contact.demi_journe.DatePrise}
                    </Text>
                  </Text>
                </View>
              )}

              {contact.nuit?.DatePrise && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginStart: 10, marginTop: 15 , color:"white" }}>
                    Nuit:{" "}
                    <Text style={{ color: "#0147A6" }}>
                      {contact.nuit.DatePrise}
                    </Text>
                  </Text>
                </View>
              )}
             
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {contact.prendre && (
                <TouchableOpacity onPress={handleUpdatePrendre}>
                  <Image
                    source={require('../assets/ollp.png')}
                    style={{
                      width: 45,
                      height: 45,
                      color: "white",
                      marginLeft: 30,
                      marginRight: 20,
                      tintColor: "white"
                    }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={require('../assets/update.png')}
                  style={{
                    width: 45,
                    height: 45,
                    color: "white",
                    tintColor: "white"
                  }}
                />
              </TouchableOpacity>



              <TouchableOpacity
            style={{  marginLeft: 30 }}
            onPress={() => deleteContact()}
          >
            <MaterialIcons name="delete" size={42} color="white" />
          </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Modifier Médicament</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom du Médicament"
              value={formData.nom_medicament}
              onChangeText={(text) => setFormData({ ...formData, nom_medicament: text })}
            />
            {formData.Matin.DatePrise && (
              <TextInput
                style={styles.input}
                placeholder="Matin Date Prise"
                value={formData.Matin.DatePrise}
                onChangeText={(text) => setFormData({ ...formData, Matin: { ...formData.Matin, DatePrise: text } })}
              />
            )}
            {formData.demi_journe.DatePrise && (
              <TextInput
                style={styles.input}
                placeholder="Demi-journée Date Prise"
                value={formData.demi_journe.DatePrise}
                onChangeText={(text) => setFormData({ ...formData, demi_journe: { ...formData.demi_journe, DatePrise: text } })}
              />
            )}
            {formData.nuit.DatePrise && (
              <TextInput
                style={styles.input}
                placeholder="Nuit Date Prise"
                value={formData.nuit.DatePrise}
                onChangeText={(text) => setFormData({ ...formData, nuit: { ...formData.nuit, DatePrise: text } })}
              />
            )}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleUpdateMedicament}>
                <LinearGradient colors={['#01BACF', '#01BACF']} style={styles.signIn}>
                  <Text style={[styles.textSign, { color: '#fff' }]}>Modifier</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <LinearGradient colors={['#8EACCD', '#8EACCD']} style={styles.signIn}>
                  <Text style={[styles.textSign, { color: '#fff' }]}>Annuler</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  f: {
    fontStyle: "italic",
    color: "red",
  },
  image: {
    width: '80%',
    height: 241,
    alignSelf: 'center',
    marginTop: 46,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    marginLeft: 10
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30
  },
  signIn: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
  },
  signInn: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 30,
    marginLeft: 20
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    marginTop: 11,
  },
  medicamentInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 11,
    shadowColor: "#000",
    height: 300,
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
  medicamentTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: 'rgb(97, 172, 243)',
  },
  medicamentDetail: {
    fontSize: 16,
    marginStart: 10,
    marginTop: 15,
  },
  medicamentValue: {
    color: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color:"#8EACCD"
  },
  input: {
    width: WIDTH - 70,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH - 70,
  },
  modalButton: {
    flex: 1,
    margin: 5,
  },
});
