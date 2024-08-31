import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

import conta from '../assets/h12.png';

export default function OneContact({ route, navigation }) {
  const { itemId, getContact } = route.params;
  const [contact, setContact] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editedContact, setEditedContact] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (getContact) {
      setContact(getContact);
      setEditedContact(getContact);
    }
  }, [getContact]);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://192.168.43.105:5000/updateContact/${contact._id}`, editedContact);
      console.log("eeee"+response.da)
      setMessage(response.data.message);
      setContact(response.data);
      setEditedContact(response.data)
      setModalVisible(false);
    } catch (error) {
      setMessage('Error updating contact');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ height: HEIGHT , backgroundColor:'white' }}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
                  source={require('../assets/back.png')}
                  style={{width:40 , height:40 , marginTop:20}}
                />
        </TouchableOpacity>
        <Image source={conta} style={styles.image} />
        <Text style={styles.title}>Informations de la Contact</Text>


        <View style={styles.contactCard}>
          <View style={{ flex: 1, flexDirection: 'column', padding: 10, width: '81%' }}>
            <Text style={styles.contactHeader}>Contact:</Text>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Docteur:         </Text>
              <Text style={styles.contactValue}>{contact.nom_docteur} {contact.Prenom_docteur}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Spécialité:     </Text>
              <Text style={styles.contactValue}>{contact.Specialite_docteur}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}><AntDesign name="mail" size={19} style={styles.icon} />Email:             </Text>
              <Text style={styles.contactValue}>{contact.email}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}><AntDesign name="phone" size={22} style={styles.icon} />Téléphone:    </Text>
              <Text style={styles.contactValue}>{contact.num_telephone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}><AntDesign name="home" size={22} style={styles.icon} />Adresse:        </Text>
              <Text style={styles.contactValue}>{contact.adresse_doc}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
                  source={require('../assets/update.png')}
                  style={{width:40 , height:40}}
                />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Modifier le Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom Docteur"
              value={editedContact.nom_docteur}
              onChangeText={(text) => setEditedContact({ ...editedContact, nom_docteur: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Prénom Docteur"
              value={editedContact.Prenom_docteur}
              onChangeText={(text) => setEditedContact({ ...editedContact, Prenom_docteur: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Spécialité"
              value={editedContact.Specialite_docteur}
              onChangeText={(text) => setEditedContact({ ...editedContact, Specialite_docteur: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedContact.email}
              onChangeText={(text) => setEditedContact({ ...editedContact, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              value={editedContact.num_telephone}
              onChangeText={(text) => setEditedContact({ ...editedContact, num_telephone: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={editedContact.adresse_doc}
              onChangeText={(text) => setEditedContact({ ...editedContact, adresse_doc: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleEdit} style={styles.saveButton}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>   Annuler   </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 241,
    alignSelf: 'center',
    marginTop: 46,
  },
  icon: {
    width: 30,
    height: 30,
    marginStart:20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 35,
  },
  contactCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#CDE8E5',
    marginBottom: 80,
    marginTop: 10,
    borderRadius: 11,
    shadowColor: '#000',
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
  contactHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  contactLabel: {
  color:"black",
  fontWeight:'bold',
    fontSize: 16,
    color:'#5C88C4'
  },
  contactValue: {
    fontSize: 16,
   
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  modalView: {
    margin: 20,
    marginTop:80,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginTop:20,
    fontSize: 24,
    fontWeight: 'bold',
    color:"#3AA6B9",
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:20,
    marginBottom:20,
  },
  saveButton: {
    backgroundColor: '#0147A6',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#3AA6B9',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
   
    color: 'white',
    fontWeight: 'bold',
  },
});
