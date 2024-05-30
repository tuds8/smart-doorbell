import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import COLORS from '../constants/colors';
import axios from 'axios';

const MainScreen = () => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [message, setMessage] = useState('No one is at your door.');

  useEffect(() => {
    // Fetch photo from AWS Lambda using axios
    const fetchPhoto = async () => {
      try {
        const response = await axios.get('https://ygp3dwqpaa.execute-api.eu-west-2.amazonaws.com/dev/image', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        if (data.image_url) {
          setPhotoUrl(data.image_url);
          setMessage('This person is at your door.');
        } else {
          setPhotoUrl(null);
          setMessage('No one is at your door.');
        }

      } catch (error) {
        console.error('Error fetching photo:', error);
        setPhotoUrl(null);
        setMessage('No one is at your door.');
      }
    };

    fetchPhoto();
  }, []);

  const handleAccept = () => {
    console.log('Entry Accepted');
  };

  const handleDeny = () => {
    console.log('Entry Denied');
  };

  const handleCallSecurity = () => {
    console.log('Security Called');
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <Text style={styles.welcomeText}>Welcome!</Text>
      <View style={styles.photoContainer}>
        {photoUrl ? (
          <Image source={{ uri: photoUrl }} style={styles.image} />
        ) : (
          <Text style={styles.noPhotoText}>{message}</Text>
        )}
        {photoUrl && <Text style={styles.photoMessage}>{message}</Text>}
      </View>
      <View style={styles.buttonRow}>
        <Button title="Accept Entry" onPress={handleAccept} filled style={[styles.button, styles.acceptButton]} textStyle={styles.buttonText} />
        <Button title="Deny Entry" onPress={handleDeny} filled style={[styles.button, styles.denyButton]} textStyle={styles.buttonText} />
      </View>
      <Button title="Call Security" onPress={handleCallSecurity} filled style={[styles.button, styles.callSecurityButton]} textStyle={styles.buttonText} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: COLORS.white,
  },
  photoContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  noPhotoText: {
    color: COLORS.black,
    textAlign: 'center',
  },
  photoMessage: {
    color: COLORS.white,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#E0F2F1', // Greenish-white background
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#E0F2F1',
  },
  buttonText: {
    color: COLORS.primary, // Dark green text
  },
  denyButton: {
    backgroundColor: '#FFCDD2', // Light red background for deny button
  },
  callSecurityButton: {
    backgroundColor: '#FFE082', // Yellow background for call security button to stand out
    width: '100%',
  },
});

export default MainScreen;
