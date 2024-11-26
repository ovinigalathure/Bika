import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./notifications.css";
import NotificationHeader from "./components/NotificationHeader";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../home/components/Home 1/Header";
import { FaTrashAlt } from "react-icons/fa";

const Notifications = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [unreadCounts, setUnreadCounts] = useState({
    all: 0,
    promotion: 0,
    customerPromo: 0,
    cartReminder: 0,
  });
  const [notificationCount, setNotificationCount] = useState(0);

  // Authenticate user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(
        currentUser
          ? { ...currentUser, name: currentUser.displayName || currentUser.email }
          : null
      );
    });
    return () => unsubscribe();
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (!user) return;

    const collections = [
      { name: "products", type: "promotion", key: "read" },
      { name: "customer-promos", type: "customerPromo", key: "read" },
      { name: `users/${user.email}/cartReminder`, type: "cartReminder", key: "seen" },
    ];

    const unsubscribes = collections.map(({ name, type, key }) =>
      onSnapshot(collection(db, name), (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            [key]: docData[key] || false,
            type,
            timestamp: docData.timestamp
              ? docData.timestamp.toDate
                ? docData.timestamp.toDate()
                : new Date(docData.timestamp) // Handle string timestamps
              : null, // Handle missing timestamps
          };
        });
        updateUnreadCounts(data, type, key);
        setNotifications((prev) => [
          ...prev.filter((n) => n.type !== type),
          ...data,
        ]);
      })
    );

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [user]);

  // Update unread counts
  const updateUnreadCounts = (notifications, type, key) => {
    const unreadCount = notifications.filter((n) => !n[key]).length;

    setUnreadCounts((prev) => {
      const updatedCounts = { ...prev, [type]: unreadCount };
      updatedCounts.all =
        updatedCounts.promotion +
        updatedCounts.customerPromo +
        updatedCounts.cartReminder;

      setNotificationCount(updatedCounts.all); // Update the notification count
      return updatedCounts;
    });
  };

  // Filter notifications
  useEffect(() => {
    const filtered =
      activeCategory === "all"
        ? notifications
        : notifications.filter((n) => n.type === activeCategory);
    setFilteredNotifications(filtered);
  }, [notifications, activeCategory]);

  // Mark as read
  const markAsRead = async (id, type) => {
    try {
      const collectionName =
        type === "promotion"
          ? "products"
          : type === "customerPromo"
          ? "customer-promos"
          : `users/${user.email}/cartReminder`;

      const docRef = doc(db, collectionName, id);
      const updateField = type === "cartReminder" ? { seen: true } : { read: true };

      await updateDoc(docRef, updateField);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updateField } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (id, type) => {
    try {
      const collectionName =
        type === "promotion"
          ? "products"
          : type === "customerPromo"
          ? "customer-promos"
          : `users/${user.email}/cartReminder`;

      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <Header notificationCount={notificationCount} />
      <div className="notifications-container">
        <NotificationHeader />
        <div className="notifications-content">
          <div className="filter-buttons">
            {["all", "promotion", "customerPromo", "cartReminder"].map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                {unreadCounts[category] > 0 && `(${unreadCounts[category]})`}
              </button>
            ))}
          </div>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-box ${
                  notification.type === "cartReminder"
                    ? notification.seen
                      ? "notification-read"
                      : "notification-unread"
                    : notification.read
                    ? "notification-read"
                    : "notification-unread"
                }`}
              >
                <p>
                  <strong>
                    {notification.type === "promotion"
                      ? "Promotion"
                      : notification.type === "customerPromo"
                      ? "Customer Promo"
                      : "Cart Reminder"}:
                  </strong>{" "}
                  {notification.message || notification.description}
                </p>
                {notification.type === "cartReminder" && (
                  <p>
                    <em>
                      Sent on:{" "}
                      {notification.timestamp
                        ? notification.timestamp.toLocaleString()
                        : "Unknown date"}
                    </em>
                  </p>
                )}
                <div className="notification-actions">
                  <button onClick={() => markAsRead(notification.id, notification.type)}>
                    Mark as Read
                  </button>
                  <FaTrashAlt
                    className="delete-icon"
                    onClick={() => deleteNotification(notification.id, notification.type)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No notifications found for {activeCategory}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
