import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get('https://ygp3dwqpaa.execute-api.eu-west-2.amazonaws.com/dev/history');
        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching history data:', error);
      }
    };

    fetchHistoryData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
      <Text style={[styles.statusText, { color: item.status === 'allowed' ? 'green' : 'denied' ? 'red' : 'orange'}]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent pictures</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    fontSize: 24,
    marginBottom: 20,
  },
  listContainer: {
    alignItems: 'center',
  },
  historyItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 375,
    height: '70%',
    borderRadius: 10,
  },
  statusText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default History;
