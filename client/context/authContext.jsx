"use client";

import { createContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <>
      <authContext.Provider value={{ token, setToken }}>
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthProvider;

// // src/context/ThemeContext.js
// import React, { createContext, useState } from 'react';

// // Create a context with a default value
// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   // Toggle between light and dark themes
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeContext;
