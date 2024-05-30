// screens/MyAccount.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MyAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      {/* Display all registered user IDs and face IDs here */}
      <Text>List of User IDs and Face IDs will be displayed here.</Text>

      <View style={styles.createSection}>
        <Button
          title="Create New User ID"
          onPress={() => navigation.navigate('Create User ID/Face ID')}
        />
      </View>
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
  createSection: {
    marginTop: 40,
  },
});

export default MyAccount;
