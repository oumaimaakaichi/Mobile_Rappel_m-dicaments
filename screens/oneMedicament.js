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
import conta from "../assets/yaya.png";

const { height: HEIGHT } = Dimensions.get("window");
export default function OneMed({ route, navigation }) {
  const { med } = route.params;
  const [contact, setContact] = useState("");
  useEffect(async () => {
    console.log("bbb" + med);
    if (med) {
      setContact(med);
    }
  }, []);

  return (
    <SafeAreaView style={{ height: HEIGHT, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={{ backgroundColor: "#fff" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={40}
              color="black"
              style={{ marginLeft: 10 }}
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
                  <Text style={{ marginStart: 10, marginTop: 15 }}>
                    Démi journée:{" "}
                    <Text style={{ color: "#0147A6" }}>
                      {contact.demi_journe.DatePrise}
                    </Text>
                  </Text>
                </View>
              )}

              {contact.nuit?.DatePrise && (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginStart: 10, marginTop: 15 }}>
                    Nuit:{" "}
                    <Text style={{ color: "red" }}>
                      {contact.nuit.DatePrise}
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View></View>
        </View>

        {/*<View style={styles.containr}>
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
    backgroundColor: "#fff",
  },

  f: {
    fontStyle: "italic",
    color: "red",
  },
});
