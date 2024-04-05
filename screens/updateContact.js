import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import conta from '../assets/tt.png';
import { updateClientData } from "../utils/AsyncStorageClient";

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default function UpdateContact({ route, navigation }) {
    const { itemId, getContact } = route.params;
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(getContact);
    const [num_telephone, setNumero] = useState(contact?.num_telephone);
    const [email, setEmail] = useState(contact?.email);
    const [adresse_doc, setAdresse] = useState(contact?.adresse_doc);
    
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    const editContact = async () => {
       
console.log(contact._id)
if( !adresse_doc|| !num_telephone||(!regEx.test(email) && email!="")){
    setError(true);
    return false;
      
  }
        try {
            const res = await fetch(`http://192.168.43.105:5000/api/update/${contact._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    email,
                    
                    num_telephone,
                    adresse_doc
                })
            });

            const data = await res.json();
           
            alert('Misee à jour réussiee');
        } catch (error) {
            console.log('Erreuyr:', error);
            alert('Une erreur s\'est produite lors de la mise à jour.');
        }
    };
    useEffect(() => {
        
        
        setNumero(getContact?.num_telephone);
        setEmail(getContact?.email);
        setAdresse(getContact?.adresse_doc);
    }, [getContact]);
    return (
        <SafeAreaView style={{ height: HEIGHT }}>
            <ScrollView>
                <View style={styles.popupContainer}>
                    <Image
                        source={conta}
                        style={{
                            width: 190,
                            height: 140,
                            alignSelf: 'center',
                            marginTop: 5
                        }}
                    />
                    <View style={styles.inputContainer}>
                        <AntDesign name="phone" color="rgb(70, 143, 183)" size={20} style={styles.icon} />
                        <TextInput
                            placeholder="Numéro de téléphone"
                            style={styles.input}
                            defaultValue={num_telephone}
                            onChangeText={(val) => setNumero(val)}
                        />
                       
                    </View>
                    {error && !num_telephone &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
                  {error && num_telephone<0 &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} >Numéro du téléphone doit  etre positive</Text>}
                 
                    <View style={styles.inputContainer}>
                        <AntDesign name="mail" color="rgb(70, 143, 183)" size={20} style={styles.icon} />
                        <TextInput
                            placeholder="Email Docteur"
                            style={styles.input}
                            defaultValue={email}
                            onChangeText={(val) => setEmail(val)}
                        />

             
                    </View>
                    {error && !email &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
            {error && !regEx.test(email) &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > email invalide</Text>}
      
                    <View style={styles.inputContainer}>
                        <AntDesign name="home" color="rgb(70, 143, 183)" size={20} style={styles.icon} />
                        <TextInput
                            placeholder="Adresse Docteur"
                            style={styles.input}
                            defaultValue={adresse_doc}
                            onChangeText={(val) => setAdresse(val)}
                        />
                        
                    </View>
                    {error && !adresse_doc &&<Text style={{color:'red' ,fontSize:10 , fontWeight:'bold'}} > champ obligatoire *</Text>}
            
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={editContact}
                        >
                            <LinearGradient
                                colors={['rgb(97, 172, 243)', 'rgb(97, 172, 243)']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Mettre à jour</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: "white",
        padding: 10,
        width: WIDTH - 20,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 80
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderColor: 'rgb(70, 143, 183)',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
        height: 50,
    },
    icon: {
        marginRight: 11,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderWidth: 0,
        borderColor: "rgb(70, 143, 183)",
        borderRadius: 8,
        paddingHorizontal: 0,
    },
    button: {
        alignItems: "center",
        marginTop: 40,
        borderRadius: 8
    },
    signIn: {
        width: WIDTH - 50,
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
});
