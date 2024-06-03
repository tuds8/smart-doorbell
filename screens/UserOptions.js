import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../constants/colors';

const UserOptions = () => {
  const [userName, setUserName] = useState('');
  const [userPhotos, setUserPhotos] = useState([]);

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

  const handleSubmit = () => {
    console.log('UserID Submitted:', userName);
  };

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen comes into focus
      setUserName('');
      setUserPhotos([]);
    }, [])
  );

  return (
    <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.title}>Create UserID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter User ID Name"
            placeholderTextColor={COLORS.lightGray}
            value={userName}
            onChangeText={setUserName}
          />
          <TouchableOpacity style={styles.button} onPress={pickUserImages}>
            <Text style={styles.buttonText}>Pick Images</Text>
          </TouchableOpacity>
          {userPhotos.length >= 5 && (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit UserID</Text>
            </TouchableOpacity>
          )}
          <View style={styles.imagesContainer}>
            {userPhotos.map((photo, index) => (
              <Image key={index} source={{ uri: photo.uri }} style={styles.image} />
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});

export default UserOptions;
