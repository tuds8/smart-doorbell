// navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../screens/MainScreen';
import UserOptions from '../screens/UserOptions';
import MyAccount from '../screens/MyAccount';
import History from '../screens/History';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Home" component={MainScreen} />
      <Drawer.Screen name="My Account" component={MyAccount} />
      <Drawer.Screen name="Create User ID/Face ID" component={UserOptions} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
