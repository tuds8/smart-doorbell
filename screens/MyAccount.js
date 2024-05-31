import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockData = [
  { userId: 'Tudor', faceId: 'faceID1' },
  { userId: 'Nata', faceId: 'faceID2' },
  { userId: 'Guest', faceId: 'faceID3' },
];

const MyAccount = ({ navigation }) => {
  const [users, setUsers] = useState(mockData);

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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    flex: 0.9,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#007bff',
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
