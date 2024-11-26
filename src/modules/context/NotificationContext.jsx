import React, { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";

// Create a context
export const NotificationContext = createContext();

// Create a provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]); // All notifications
  const [unreadCount, setUnreadCount] = useState(0); // Total unread count

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;

        // Define collections to listen to
        const collections = [
          { name: "products", type: "promotion", key: "read" },
          { name: "customer-promos", type: "customerPromo", key: "read" },
          { name: "contacts", type: "contact", key: "read" },
          { name: `users/${email}/cartReminder`, type: "cartReminder", key: "seen" },
        ];

        // Combine notifications from all collections
        const unsubscribes = collections.map(({ name, type, key }) =>
          onSnapshot(collection(db, name), (snapshot) => {
            const newNotifications = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              [key]: doc.data()[key] || false,
              type,
              timestamp: doc.data().timestamp?.toDate() || new Date(),
            }));

            // Update notifications and unread count
            setNotifications((prev) => {
              const filtered = prev.filter((n) => n.type !== type); // Remove old notifications of this type
              return [...filtered, ...newNotifications];
            });
            updateUnreadCount(newNotifications, key);
          })
        );

        return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Update unread count
  const updateUnreadCount = (newNotifications, key) => {
    const count = newNotifications.filter((n) => !n[key]).length;
    setUnreadCount((prevCount) => prevCount + count);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
