import React, { useEffect, useState } from "react";
import { ScrollView,StyleSheet, Image, Keyboard, KeyboardAvoidingView, Text, Dimensions, TextInput, TouchableWithoutFeedback, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import profl from '../assets/asmaaa.png';
import { getClientData, updateClientData } from "../utils/AsyncStorageClient";

const { width: WIDTH } = Dimensions.get('window');

export default function Profile({ navigation }) {
  const [user, setUser] = useState('');
  const [age, setAge] = useState('');
  const [Num_tel, setNumTel] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const editProfile = async () => {
    if (!age || !Num_tel || Num_tel < 0 || Num_tel.length !== 8 || (!validateEmail(email) && email !== "")) {
      setError(true);
      return false;
    }

    try {
      const res = await fetch(`http://192.168.43.105:5000/api/utlisateur/modifier/${user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          age,
          Num_tel,
          email
        })
      });

      const data = await res.json();
      console.log(data);

      const newUser = { ...user, age, Num_tel, email };
      await updateClientData(newUser);
      console.log('succès');
    } catch (error) {
      console.log('erreur', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getClientData();
      setUser(data);
      setAge(data.age);
      setNumTel(data.Num_tel);
      setEmail(data.email);
    };

    fetchData();
  }, []);

  const validateEmail = (email) => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return regex.test(email);
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginScreenContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={profl} style={styles.imageStyle} />
              </View>
              <TextInput
                placeholder="Age"
                placeholderTextColor="#c4c3cb"
                value={user.age}
                onChangeText={text => setAge(text)}
                style={styles.loginFormTextInput}
              />
              {error && !age && <Text style={styles.errorText}>Champ obligatoire *</Text>}

              <TextInput
                placeholder="Numéro de téléphone"
                placeholderTextColor="#c4c3cb"
                value={user.Num_tel}
                keyboardType="numeric"
                onChangeText={text => setNumTel(text)}
                style={styles.loginFormTextInput}
              />
              {error && !Num_tel && <Text style={styles.errorText}>Champ obligatoire *</Text>}
              {error && (Num_tel.length !== 8 || Num_tel < 0) && <Text style={styles.errorText}>Numéro de téléphone invalide</Text>}

              <TextInput
                placeholder="Email"
                placeholderTextColor="#c4c3cb"
                value={user?.email}
                onChangeText={text => setEmail(text)}
                style={styles.loginFormTextInput}
              />
              {error && !email && <Text style={styles.errorText}>Champ obligatoire *</Text>}
              {error && !validateEmail(email) && <Text style={styles.errorText}>Email invalide</Text>}

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={editProfile}
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    
  },
  loginFormTextInput: {
    width: WIDTH - 55,
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#rgb(97, 172, 243)',
    fontSize: 16,
    paddingLeft: 45,
    marginHorizontal: 25,
    marginTop: 25,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: WIDTH - 55,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom:30
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
