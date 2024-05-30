// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import DrawerNavigator from './navigation/DrawerNavigator';
// import AuthNavigator from './navigation/AuthNavigator';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// //import Amplify from 'aws-amplify';
// //import awsconfig from './aws-exports'; // Ensure this import

// // Configure Amplify
// //Amplify.configure(awsconfig);

// const App = () => {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// const AppNavigator = () => {
//   const { isLoggedIn, isCompletingSetup } = useContext(AuthContext);

//   if (isCompletingSetup) {
//     return <DrawerNavigator initialRouteName="User Options" />; // Directly render DrawerNavigator with User Options
//   }

//   return isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />;
// };

// export default App;
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './navigation/DrawerNavigator';
import Welcome from './screens/Welcome';
//import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    //<AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
   // </AuthProvider>
  );
};

export default App;
