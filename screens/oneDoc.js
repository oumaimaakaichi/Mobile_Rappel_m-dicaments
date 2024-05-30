import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Document, Page } from "react-pdf";
import * as FileSystem from "expo-file-system";

const OneDoc = ({ route }) => {
  const { getDoc, docPDF } = route.params;
  const [pdfUri, setPdfUri] = useState("");

  return (
    <View style={styles.container}>
      <Image source={{ uri: getDoc.image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  document: {
    flex: 1,
  },
});

export default OneDoc;
