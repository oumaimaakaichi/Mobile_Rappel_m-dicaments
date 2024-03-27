import React from 'react';
import { View, Text, TouchableOpacity ,Dimensions} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

const Login = (props) => {
  return (
    <Background>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 0.1 * Dimensions.get('window').height, // Adjust font size dynamically
            fontWeight: 'bold',
            marginVertical: 0.05 * Dimensions.get('window').height, // Adjust margin dynamically
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 0.28 * Dimensions.get('window').width, // Adjust border radius dynamically
            paddingTop: 0.15 * Dimensions.get('window').height, // Adjust padding dynamically
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 0.08 * Dimensions.get('window').height, color: darkGreen, fontWeight: 'bold' }}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 0.024 * Dimensions.get('window').height, // Adjust font size dynamically
              fontWeight: 'bold',
              marginBottom: 0.027 * Dimensions.get('window').height, // Adjust margin dynamically
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Password" secureTextEntry={true} />
          <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 0.034 * Dimensions.get('window').width, marginBottom: 0.15 * Dimensions.get('window').height }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 0.034 * Dimensions.get('window').width }}>
              Forgot Password ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => alert("Logged In")} />
          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 0.034 * Dimensions.get('window').width, fontWeight: "bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 0.034 * Dimensions.get('window').width }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;
