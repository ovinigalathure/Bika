import React, { createContext, useState, useContext } from "react";

// Create the Notification Context
const NotificationContext = createContext();

// Provide the Notification Context
export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Create the custom hook to access the context
export const useNotificationContext = () => {
  return useNotificationContext(NotificationContext);
};
