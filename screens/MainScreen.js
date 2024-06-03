import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import COLORS from '../constants/colors';

const MainScreen = () => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [message, setMessage] = useState('No one is at your door.');
  const currentImage = useRef("initial");
  const webSocket = useRef(null);

  useEffect(() => {
    // Set up WebSocket connection
    webSocket.current = new WebSocket('wss://dpklgkhpz9.execute-api.eu-west-2.amazonaws.com/development/');

    webSocket.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    webSocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      if (data.image_url && data.image_name !== currentImage.current) {
        setPhotoUrl(data.image_url);
        setMessage('This person is at your door.');
        currentImage.current = data.image_name;
      } else if (!data.image_url) {
        setPhotoUrl(null);
        setMessage('No one is at your door.');
      }
    };

    webSocket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    webSocket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      webSocket.current.close();
    };
  }, []);

  const handleDecision = async (decision) => {
    try {
      const response = await axios.post('https://ygp3dwqpaa.execute-api.eu-west-2.amazonaws.com/dev/decision', {
        decision: decision,
      });
      console.log("called api with", decision);

      if (response.status === 200) {
        setMessage(decision === 'accept' ? 'Accepted Entry' : 'Denied Entry');
        setPhotoUrl(null);  // Clear the photoUrl to stop displaying the image
      } else {
        setMessage('Failed to accept/deny entry');
        throw new Error('An error has occurred');
      }
    } catch (error) {
      console.error('Error making decision:', error);
      setMessage('An error occurred while making a decision.');
    }
  };

  const handleCallSecurity = () => {
    setMessage('Security Called!');
  };

  return (
    <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
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
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleDecision('accept')}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.denyButton]} onPress={() => handleDecision('deny')}>
          <Text style={styles.buttonText}>Deny</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.callSecurityButton} onPress={handleCallSecurity}>
        <Text style={styles.buttonText}>Call Security</Text>
      </TouchableOpacity>
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
    marginBottom: 40,
    color: COLORS.white,
  },
  photoContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  image: {
    width: '100%',
    height: '110%',
    borderRadius: 10,
  },
  noPhotoText: {
    color: COLORS.black,
    textAlign: 'center',
  },
  photoMessage: {
    color: COLORS.white,
    top: 10,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E0F2F1',
    borderColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.primary,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  acceptButton: {
    backgroundColor: '#E0F2F1',
  },
  denyButton: {
    backgroundColor: '#FFCDD2',
  },
  callSecurityButton: {
    paddingVertical: 10,
    borderColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FFE082',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default MainScreen;
