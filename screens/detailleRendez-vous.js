import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import COLORS from "./config/COLORS";
import SPACING from "./config/SPACING";
import Toast from "react-native-toast-message";
const DetailleRendezvous = ({ route }) => {
  const { rendezVous } = route.params;
  const navigation = useNavigation();
  const [rendezVousList, setRendezVousList] = useState([]);
  const [tempRendezVousList, setTempRendezVousList] = useState([]);

  const handleEdit = () => {
    navigation.navigate("Modifier", { rendezVous });
  };

  const fetchRendezVousList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.105:5000/api/rendezVous/getRendez-vous"
      );
      setRendezVousList(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous : ", error);
    }
  };

  useEffect(() => {
    fetchRendezVousList();
  }, []);




  const handleDelete = async (id) => {
    try {
      await fetch(`http://192.168.43.105:5000/api/rendezVous/supprimerRendez-vous/${rendezVous._id}`, {
        method: "DELETE",
      });
      Toast.show({
        position: "top",
        type: "success",

        text1: "Supprimer un Rendez-vous",
        text2: " Rendez-vous supprimè avec succès",
        

        autoHide: true,
        visibilityTime: 8000,
        autoHide: true,
        onHide: () => {
          navigation.navigate("AllRendez_vous");
        },
        onShow: () => {},
      });
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
    }
  };
  
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Pad month and day with leading zeros if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}/${month}/${day}`;
  };
  useEffect(() => {
    if (route.params && route.params.updatedList) {
      setRendezVousList(route.params.updatedList);
    } else {
      setRendezVousList(tempRendezVousList);
    }
  }, [route.params, tempRendezVousList]);

  useEffect(() => {
    if (route.params && route.params.updatedList) {
      setRendezVousList(route.params.updatedList);
    }
  }, [route.params]);

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={require("../assets/lpppp.jpg")}
          style={{ width: "100%", height: 500 }}
        >
          <SafeAreaView>
            <Toast/>
            <View
              style={{
                paddingHorizontal: SPACING,
                justifyContent: "space-between",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("AllRendez_vous")}
                style={{
                  backgroundColor: COLORS.white,
                  width: SPACING * 4,
                  height: SPACING * 4,
                  borderRadius: SPACING * 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/back.png")}
                  style={{ width: SPACING * 3, height: SPACING * 3 }}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingBottom: SPACING * 8,
                }}
              >
               
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SPACING * 2,
            borderRadius: SPACING * 3,
            bottom: SPACING * 3,
            height: 350,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "bold",
                color: COLORS.dark,
              }}
            >
              {rendezVous.nom_docteur}
            </Text>
          </View>
          <View style={{ marginVertical: SPACING * 2 }}>
            <View style={{ flexDirection: "row", marginBottom: SPACING * 2 }}>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 2 }}
              >
                <Text
                  style={{
                    color: "#3AA6B9",
                    fontWeight: "bold",
                    fontSize: SPACING * 1.7,
                  }}
                >
                  LIEU :
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 2 }}
              >
                <Text>{rendezVous.lieu}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: SPACING * 2, flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.1,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Image
                    source={require("../assets/clockm.png")}
                    style={{ width: SPACING * 3, height: SPACING * 3  , tintColor:"#3AA6B9"  , width:40 , height:40 }}
                  />
                </View>
                <View style={{ marginRight: SPACING * 2 }}>
                  <Text
                    style={{
                      fontSize: SPACING + 1,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Heure
                  </Text>
                  <Text style={{ fontSize: SPACING * 1.6, fontWeight: "700" }}>
                    {rendezVous.heure}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.dark,
                    shadowOffset: { width: SPACING / 2, height: SPACING },
                    shadowRadius: SPACING / 2,
                    shadowOpacity: 0.1,
                    padding: SPACING / 2,
                    borderRadius: SPACING / 2,
                    marginRight: SPACING,
                  }}
                >
                  <Image
                    source={require("../assets/clandr.png")}
                    style={{ width: SPACING * 3, height: SPACING * 3 , width:65 , height:65 , tintColor:"#3AA6B9"  ,marginTop:-20}}
                  />
                </View>
                <View style={{ marginRight: SPACING * 2 }}>
                  <Text
                    style={{
                      fontSize: SPACING + 1,
                      marginBottom: SPACING / 2,
                      textTransform: "uppercase",
                    }}
                  >
                    DATE
                  </Text>
                  <Text style={{ fontSize: SPACING * 1.6, fontWeight: "700" }}>
                  {formatDate(rendezVous.date)}
                    
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}>
                {rendezVous.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: SPACING * 2,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#01BACF",
            padding: SPACING * 1.5,
            marginHorizontal: SPACING * 1.6,
            borderRadius: SPACING * 2,
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={handleEdit}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SPACING * 2,
              fontWeight: "bold",
              marginRight: SPACING * 1,
              marginLeft: SPACING * 1,
            }}
          >
            Modifier
          </Text>
          <Image
            source={require("../assets/edit.png")}
            style={{ width: SPACING * 3, height: SPACING * 3  , tintColor:"white" , width:25 , height:25}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={{
            backgroundColor: "#01BACF",
            padding: SPACING * 1.5,
            marginHorizontal: SPACING * 1.6,
            borderRadius: SPACING * 2,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SPACING * 2,
              fontWeight: "bold",
              marginRight: SPACING * 1,
              marginLeft: SPACING * 1,
            }}
          >
            Supprimer
          </Text>
          <Image
            source={require("../assets/delete.png")}
            style={{ width: SPACING * 3, height: SPACING * 3  , tintColor:'white' , width:25 , height:25}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailleRendezvous;
