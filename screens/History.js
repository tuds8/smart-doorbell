import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import COLORS from '../constants/colors';

const HistoryItem = React.memo(({ item }) => (
  <View style={styles.historyItem}>
    <Image source={{ uri: item.photoUrl }} style={styles.image} />
    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
  </View>
));

const getStatusColor = (status) => {
  switch (status) {
    case 'allowed':
      return '#4CAF50'; // green
    case 'denied':
      return '#F44336'; // red
    default:
      return '#FF9800'; // orange
  }
};

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('https://ygp3dwqpaa.execute-api.eu-west-2.amazonaws.com/dev/history');
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistoryData();
    }, [])
  );

  const renderItem = useCallback(({ item }) => <HistoryItem item={item} />, []);

  return (
    <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
      <Text style={styles.title}>Recent Pictures</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    alignItems: 'center',
  },
  historyItem: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000', // Black color for the item border
  },
  image: {
    width: 330,
    height: 330,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2, // Border width for the image
    borderColor: '#000', // Black color for the image border
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});

export default History;
