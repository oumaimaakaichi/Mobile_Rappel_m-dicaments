import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import React from "react";
import COLORS from "./config/COLORS";
import SPACING from "./config/SPACING";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import AllVacination from "./allVacination";
const DetailleVacination = ({ route }) => {
  // État local pour stocker la liste des rendez-vous

  const { Vacination } = route.params;
  const navigation = useNavigation();
  const [VacinationList, setVacinationList] = useState([]);
  const [tempRendezVousList, setTempRendezVousList] = useState([]);

  const handleEdit = () => {
    navigation.navigate("ModifierVacination", { Vacination });
  };

  const fetchRendezVousList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.43.116:5000/api/vacination/getVacination"
      );
      setVacinationList(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous : ", error);
    }
  };

  useEffect(() => {
    fetchRendezVousList();
  }, []);
  /*
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://192.168.1.14:5000/api/rendezVous/supprimerRendez-vous/${rendezVous._id}`
      );

      const updatedRendezVousList = rendezVousList.filter(
        (item) => item._id !== rendezVous._id
      );
      setRendezVousList(updatedRendezVousList);

      navigation.navigate("AllRendez_vous", {
        updatedList: updatedRendezVousList,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous : ", error);
    }
  };*/
  const handleDelete = async () => {
    try {
      // Supprimer le rendez-vous depuis l'API
      await axios.delete(
        `http://192.168.43.116:5000/api/vacination/deletevacination/vac/${Vacination._id}`
      );

      // Mettre à jour la liste localement
      const updatedRendezVousList = VacinationList.filter(
        (item) => item._id !== Vacination._id
      );
      setVacinationList(updatedRendezVousList);

      // Naviguer vers la page AllRendez_vous avec un paramètre de mise à jour
      /*navigation.navigate("AllVacination", {
        updatedList: updatedRendezVousList,
      });*/
      navigation.navigate("AllVacination");
    } catch (error) {
      console.error("Erreur lors de la suppression du vacination : ", error);
    }
  };

  // Dans le composant AllRendez_vous où la liste est affichée, vous pouvez mettre à jour la liste comme suit :

  useEffect(() => {
    if (route.params && route.params.updatedList) {
      // Mettre à jour la liste avec l'état temporaire
      setVacinationList(route.params.updatedList);
    } else {
      // Utiliser l'état temporaire si aucun paramètre de mise à jour n'est reçu
      setVacinationList(tempRendezVousList);
    }
  }, [route.params, tempRendezVousList]);

  // Dans le composant AllRendez_vous où la liste est affichée, vous pouvez mettre à jour la liste comme suit :

  useEffect(() => {
    if (route.params && route.params.updatedList) {
      setVacinationList(route.params.updatedList);
    }
  }, [route.params]);

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={require("../assets/2.jpg")}
          style={{ width: "100%", height: 500 }}
        >
          <SafeAreaView>
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
                <Ionicons
                  name="chevron-back"
                  color={COLORS.primary}
                  size={SPACING * 3}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingBottom: SPACING * 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.white,
                    width: SPACING * 4,
                    height: SPACING * 4,
                    borderRadius: SPACING * 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={SPACING * 3}
                  />
                </TouchableOpacity>
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
            height: 320,
          }}
        >
          <View style={{ marginVertical: SPACING * 2 }}>
            <View style={{ flexDirection: "row", marginBottom: SPACING * 2 }}>
              <TouchableOpacity
                style={{ paddingVertical: SPACING, marginRight: SPACING * 2 }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
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
                <Text>{Vacination.lieu}</Text>
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
                  <Ionicons name="time" size={SPACING * 3} color="#01BACF" />
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
                    {Vacination.heure}
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
                  <Ionicons
                    name="calendar"
                    size={SPACING * 3}
                    color="#01BACF"
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
                    ya {/*  {tour.rating} out of 5*/}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{ color: COLORS.dark }}>
                {/*{tour.description}*/} sosa
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
          flexDirection: "row", // Ajout de cette ligne pour aligner les éléments horizontalement
          justifyContent: "center", // Pour centrer les éléments horizontalement
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
          <Ionicons
            name="create-outline"
            size={SPACING * 3}
            color={COLORS.white}
          />
        </TouchableOpacity>

        {/* Ajout du deuxième bouton */}
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
          <Ionicons
            name="trash-outline"
            size={SPACING * 3}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailleVacination;
