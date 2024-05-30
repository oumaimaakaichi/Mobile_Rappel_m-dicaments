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
} from "react-native";
import { DataTable } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");
import conta from "../assets/tt.png";
const { height: HEIGHT } = Dimensions.get("window");
export default function OneContact({ route, navigation }) {
  const { itemId, getContact } = route.params;
  const [contact, setContact] = useState("");
  useEffect(async () => {
    if (getContact) {
      setContact(getContact);
    }
  }, []);

  return (
    <SafeAreaView style={{ height: HEIGHT }}>
      <ScrollView>
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
            marginBottom: 35,
          }}
        >
          Informations de la Contact
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "red;",
            marginBottom: 80,
            marginTop: 10,
            borderRadius: 11,
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 10,
              width: "81%",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
                textDecoration: "underline",
              }}
            >
              Contact:
            </Text>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginStart: 10, fontSize: 16 }}
              >
                Docteur:{" "}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "blue" }}>
                {contact.nom_docteur}{" "}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "blue" }}>
                {contact.Prenom_docteur}{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ marginStart: 10, marginTop: 15 }}>
                Spécialité:{" "}
                <Text style={{ color: "red" }}>
                  {contact.Specialite_docteur}
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ marginStart: 10, marginTop: 15 }}>
                {" "}
                <AntDesign
                  name="mail"
                  color="rgb(70, 143, 183)"
                  size={19}
                  style={styles.icon}
                />{" "}
                &nbsp;&nbsp; &nbsp;&nbsp;Email : {contact.email}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ marginStart: 10, marginTop: 15 }}>
                {" "}
                <AntDesign
                  name="phone"
                  color="rgb(70, 143, 183)"
                  size={22}
                  style={styles.icon}
                />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp; Téléphone : {contact.num_telephone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ marginStart: 10, marginTop: 15 }}>
                {" "}
                <AntDesign
                  name="home"
                  color="rgb(70, 143, 183)"
                  size={22}
                  style={styles.icon}
                />
                &nbsp;&nbsp; &nbsp;&nbsp;Adresse : {contact.adresse_doc}
              </Text>
            </View>
          </View>
          <View></View>
        </View>

        {/*<View style={styles.container}>
        <DataTable>
        <DataTable.Header>
        <DataTable.Cell style={{fontSize:20}}><AntDesign name="user" color="rgb(70, 143, 183)" size={20} style={styles.icon} />   Nom Docteur</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{contact.nom_docteur}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
             <DataTable.Header>
                    <DataTable.Cell >
                    <AntDesign name="user" color="rgb(70, 143, 183)" size={20} style={styles.icon} />    Prenom  docteur</DataTable.Cell>
                    <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{contact.Prenom_docteur}</DataTable.Title>
      
            
             
             </DataTable.Header>
    
             <DataTable.Header>
             <DataTable.Cell style={{fontSize:20}}> <AntDesign name="mail" color="rgb(70, 143, 183)" size={20} style={styles.icon} />   Email</DataTable.Cell>
            <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{contact.email}</DataTable.Title>
      
             </DataTable.Header>
            
             <DataTable.Header>
                    <DataTable.Cell >
                    <AntDesign name="phone" color="rgb(70, 143, 183)" size={20} style={{marginRight:'10px'}} />   Numéro du télephone</DataTable.Cell>
                    <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{contact.num_telephone}</DataTable.Title>
      
            
             
             </DataTable.Header>
             <DataTable.Header>
                    <DataTable.Cell  >
                    <AntDesign name="home" color="rgb(70, 143, 183)" size={20} style={styles.icon} />   Adresse  docteur</DataTable.Cell>
                    <DataTable.Title style={{width:WIDTH/2 , marginLeft:40}}>{contact.adresse_doc}</DataTable.Title>
      
            
             
             </DataTable.Header>
              <DataTable.Header>
                <DataTable.Cell>    Action</DataTable.Cell>
                <DataTable.Title  style={{width:WIDTH/2 , marginLeft:80 }}>
                  <TouchableOpacity  >
                    <AntDesign name="checkcircle"  size={27} color="#22780F"  />     
                    </TouchableOpacity>
                    </DataTable.Title>
                    <DataTable.Title>         
                    <TouchableOpacity >  
                                      
                                      <MaterialIcons name='delete'size= {30} color='#D90115'   />  
                    </TouchableOpacity>
                              
                  </DataTable.Title>
              
              </DataTable.Header>
        
        </DataTable>
</View>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },

  f: {
    fontStyle: "italic",
    color: "red",
  },
});
