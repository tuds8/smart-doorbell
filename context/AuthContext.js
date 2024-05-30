// // context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check login status (e.g., from AsyncStorage or an API)
//     const checkLoginStatus = async () => {
//       // Simulate an async login check
//       const loggedIn = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Replace with real login status check
//       setIsLoggedIn(loggedIn);
//     };

//     checkLoginStatus();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompletingSetup, setIsCompletingSetup] = useState(false);

  useEffect(() => {
    // Check login status (e.g., from AsyncStorage or an API)
    const checkLoginStatus = async () => {
      // Simulate an async login check
      const loggedIn = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Replace with real login status check
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    // Check if user is completing setup (e.g., from AsyncStorage or an API)
    const checkSetupStatus = async () => {
      // Simulate an async check for completing setup
      const completingSetup = await new Promise((resolve) => setTimeout(() => resolve(false), 1000)); // Replace with real setup status check
      setIsCompletingSetup(completingSetup);
    };

    checkSetupStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isCompletingSetup, setIsCompletingSetup }}>
      {children}
    </AuthContext.Provider>
  );
};

