import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//import DatePicker from "react-native-date-picker";
import DatePicker from "@react-native-community/datetimepicker";
import TimePicker from "@react-native-community/datetimepicker";
//import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
const ModifierVacination = ({ route }) => {
  const navigation = useNavigation();
  const [objet, setObjet] = useState("");
  const [lieu, setLieu] = useState("");
  const [nom_docteur, setNom_docteur] = useState("");
  const [date, setDate] = useState(new Date());
  const [heure, setHeure] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker); // Fonction pour afficher ou masquer le sélecteur de temps
  };
  const { Vacination } = route.params;
  console.log(Vacination);
  /*const AddRendez_vous = () => {
    // Fonction pour ajouter le rendez-vous
    // Vous pouvez implémenter la logique pour envoyer les données au serveur ici
    console.log("Ajouter le rendez-vous avec les données suivantes : ", {
      objet,
      lieu,
      nom_docteur,
      date,
      heure,
    });
    // Réinitialiser les champs après l'ajout du rendez-vous
    setObjet("");
    setLieu("");
    setNom_docteur("");
    setDate(new Date());
    setHeure("");
  };*/

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker); // Fonction pour afficher ou masquer le sélecteur de date
  };
  const updateRendezVous = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.116:5000/api/vacination/modifier/idut/${Vacination._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            objet,
            lieu,
            date,
            heure,
          }),
        }
      );

      if (response.ok) {
        console.log("Rendez-vous modifié avec succès!");
        navigation.navigate("AllVacination");
      } else {
        console.error("Erreur lors de la modification du rendez-vous.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du rendez-vous:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/ya.png")}
              style={{ width: 170, height: 170 }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              marginVertical: 20,
              color: "#01BACF",
            }}
          >
            Nouveau Rendez-vous
          </Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>Objet du Vacin</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#01BACF",
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="Objet du rendezVous"
              defaultValue={Vacination.objet}
              onChangeText={(val) => setObjet(val)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>lieu</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#01BACF",
                borderRadius: 5,
                padding: 10,
              }}
              placeholder="lieu"
              defaultValue={Vacination.lieu}
              onChangeText={(val) => setLieu(val)}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>Date du rendez-vous:</Text>
            <TouchableOpacity
              onPress={toggleDatePicker}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#01BACF",
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Date du rendez-vous"
                value={date.toLocaleDateString("fr-FR")}
                editable={false}
              />
              <Icon name="calendar" size={20} color="#01BACF" />
            </TouchableOpacity>

            {showDatePicker && (
              <DatePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                  setShowDatePicker(false);
                }}
              />
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>Heure du rendez-vous:</Text>
            <TouchableOpacity
              onPress={toggleTimePicker}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#01BACF",
                  borderRadius: 5,
                  padding: 10,
                }}
                placeholder="Heure du rendez-vous"
                value={heure}
                editable={false}
              />
              <Icon name="clock" size={20} color="#01BACF" />
            </TouchableOpacity>

            {showTimePicker && (
              <TimePicker
                value={date}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  if (selectedTime) {
                    const selectedHour = selectedTime.toLocaleTimeString(
                      "fr-FR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );
                    setHeure(selectedHour);
                  }
                  setShowTimePicker(false);
                }}
              />
            )}
          </View>
          <TouchableOpacity onPress={updateRendezVous}>
            <View
              style={{
                backgroundColor: "blue",
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Enregistrer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModifierVacination;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    justifyContent: "flex-start",
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "whitesmoke",
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#rgb(97, 172, 243)",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  s: {
    color: "#rgb(97, 172, 243)",
    backgroundColor: "#rgb(97, 172, 243)",
  },
  uploadBtnContainer: {
    height: 120,
    width: 120,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 0,
    overflow: "hidden",
    marginTop: 60,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
