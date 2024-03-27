import { View , Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen(){
    return(
        <SafeAreaView className="flex-1" style={{backgroundColor:"red"}}>
            <View className="flex-1 flex justify-around my-4">
<Text className="text-white font-bold text-4xl text-center">
    Let's Get started§
</Text>
            </View>
        </SafeAreaView>
    )
}