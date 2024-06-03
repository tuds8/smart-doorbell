import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

const MyAccount = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    // Simulate API call with mock data
    const mockData = [
      { userId: 'Tudor', faceId: 'faceID1' },
      { userId: 'Nata', faceId: 'faceID2' },
      { userId: 'Guest', faceId: 'faceID3' },
    ];
    setUsers(mockData);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.userId !== userId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.userId}</Text>
        <Text style={styles.cell}>{item.faceId}</Text>
        <TouchableOpacity onPress={() => deleteUser(item.userId)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
      <Text style={styles.title}>Users</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.userId}
        />
      </View>
      <View style={styles.createSection}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Create User ID/Face ID')}
        >
          <Text style={styles.createButtonText}>Create New User ID</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.white,
  },
  listContainer: {
    flex: 0.9,
    width: '100%',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#F44336', // red
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccount;
