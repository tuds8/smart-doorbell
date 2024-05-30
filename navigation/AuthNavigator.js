// navigation/AuthNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
//import UserOptions from '../screens/UserOptions';
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Create User ID/Face ID" 
        component={UserOptions} 
        options={{ headerShown: false }} 
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
