import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Document, Page } from 'react-pdf';
import { FileSystem } from 'expo-file-system';
import * as OpenAnything from 'react-native-openanything';
const OneDoc = ({ route }) => {
  const { getDoc } = route.params;
  const [content, setContent] = useState(null);

  useEffect(() => {
    console.log(getDoc.image)
    const fetchData = async () => {
      if (getDoc.image) {
        setContent(<Image source={{ uri: getDoc.image }} style={styles.content} />);
      } 
      else if(getDoc.document){
        OpenAnything.Pdf(getDoc.document);
      }
    };

    fetchData();
  }, [getDoc]);

  return (
    <View style={styles.container}>
      {content }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default OneDoc;