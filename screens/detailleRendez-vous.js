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

const DetailleRendezvous = ({ route }) => {
  const { rendezVous } = route.params;
  const navigation = useNavigation();
  const [rendezVousList, setRendezVousList] = useState([]); // État local pour stocker la liste des rendez-vous

  const handleEdit = () => {
    // Naviguez vers la page de modification
    navigation.navigate("Modifier", { rendezVous });
  };

  const fetchRendezVousList = async () => {
    try {
      // Faites une requête pour récupérer la liste des rendez-vous
      const response = await axios.get(
        "http://192.168.1.20:5000/api/rendezVous/getRendez-vous"
      );
      // Mettez à jour l'état avec la nouvelle liste des rendez-vous
      setRendezVousList(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la liste des rendez-vous : ",
        error
      );
    }
  };

  useEffect(() => {
    // Appelez fetchRendezVousList lorsque le composant est monté pour la première fois
    fetchRendezVousList();
  }, []);

  const handleDelete = async () => {
    try {
      // Faites la requête pour supprimer le rendez-vous en utilisant axios
      await axios.delete(
        `http://192.168.1.20:5000/api/rendezVous/supprimerRendez-vous/${rendezVous._id}`
      );

      // Mettez à jour la liste des rendez-vous une fois la suppression effectuée avec succès
      setRendezVousList((prevList) =>
        prevList.filter((item) => item._id !== rendezVous._id)
      );

      // Revenir à la page précédente (la liste de tous les rendez-vous)
      navigation.goBack();

      // Rafraîchir la liste des rendez-vous sur la page de tous les rendez-vous
      navigation.navigate("AllRendez_vous");
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous : ", error);
    }
  };

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={require("../assets/abc.png")}
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
                  <Ionicons
                    name="time"
                    size={SPACING * 3}
                    color={COLORS.primary}
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
                  <Ionicons
                    name="calendar"
                    size={SPACING * 3}
                    color={COLORS.primary}
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
            backgroundColor: COLORS.primary,
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
            backgroundColor: COLORS.primary,
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

export default DetailleRendezvous;
