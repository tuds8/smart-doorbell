// screens/History.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const History = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {/* Display history of photos taken by the Raspberry Pi camera */}
      <Text>History of photos and their access status will be displayed here.</Text>
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
});

export default History;
