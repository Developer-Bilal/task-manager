"use client";

import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    // On mount, check if token exists
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const user = await res.json();
      if (user.token) {
        setToken(user.token);
        localStorage.setItem("token", user.token);
        Swal.fire({
          title: "Logged In! 🔥",
          icon: "success",
          draggable: true,
        });
        router.push("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Credentials!",
        });
      }
    } catch (error) {
      // localStorage.setItem("token", "");
      console.log({ message: "Request Failed", error: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    router.push("/");
  };

  return (
    <>
      <authContext.Provider value={{ token, setToken, login, logout }}>
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
