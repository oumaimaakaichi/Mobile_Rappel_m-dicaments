import AsyncStorage from "@react-native-async-storage/async-storage";

export const getClientData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("client");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeClientData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
   
  
      await AsyncStorage.setItem("client", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

 