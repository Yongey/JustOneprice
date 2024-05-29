import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userEmail, setEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, username, setUsername, userEmail, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
