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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setEmail(localStorage.getItem("email"));
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    setPhoneNumber(localStorage.getItem("userPN")); // Corrected key
    setAddress(localStorage.getItem("address")); // Corrected key
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
        isAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
