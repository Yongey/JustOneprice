// ToastContext.js
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000); // Auto-hide after 3 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </ToastContext.Provider>
  );
};
