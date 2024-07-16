import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || null
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin")) || false
  );
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("userPN") || null // Corrected key
  );
  const [address, setAddress] = useState(
    localStorage.getItem("address") || null // Corrected key
  );
  const [userId, setUserId] = useState(localStorage.getItem("user_id") || null); // New state for user_id
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    setPhoneNumber(localStorage.getItem("userPN")); // Corrected key
    setAddress(localStorage.getItem("address")); // Corrected key
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const isAdminUser = () => {
    return isAdmin;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername,
        email,
        setEmail,
        isAdmin,
        setIsAdmin,
        phoneNumber,
        setPhoneNumber,
        address,
        setAddress,
        userId, // Provide user_id in the context
        setUserId, // Provide setUserId function in the context
        isAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
