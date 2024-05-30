// UserOptions.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserOptions = () => {
  const [userName, setUserName] = useState('');
  const [userPhotos, setUserPhotos] = useState([]);
  // const [facePhoto, setFacePhoto] = useState(null);

  const pickUserImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUserPhotos([...userPhotos, ...result.assets]);
    }
  };

  // const pickFaceImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         quality: 1,
  //     });

  //     if (!result.canceled) {
  //         setFacePhoto(result.assets[0]);
  //     }
  // };

  const handleSubmit = () => {
    console.log('UserID Submitted:', userName);
    // You can add your submit logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Create UserID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter User ID Name"
          value={userName}
          onChangeText={setUserName}
        />
        <Button title="Pick Images" onPress={pickUserImages} />
        {userPhotos.length >= 5 && <Button title="Submit UserID" onPress={handleSubmit} />}
        <View style={styles.imagesContainer}>
          {userPhotos.map((photo, index) => (
            <Image key={index} source={{ uri: photo.uri }} style={styles.image} />
          ))}
        </View>
      </View>

      {/* <View style={styles.section}>
        <Text style={styles.title}>Create FaceID</Text>
        <Button title="Pick Image" onPress={pickFaceImage} />
        {facePhoto && <Button title="Submit FaceID" onPress={() => console.log('FaceID Submitted')} />}
        {facePhoto && (
          <Image source={{ uri: facePhoto.uri }} style={styles.image} />
        )}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default UserOptions;
   