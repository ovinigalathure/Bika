import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the path to your Firebase config file
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication
import "./OrderDetails.css"; // Ensure this file contains your custom styles
import Header from "../../../home/components/Home 1/Header";
import deliveryBikeGif from "../status/Animation - 1731785894841.gif"; // Replace with the correct path to your GIF

const OrderDetails = () => {
  const [notifications, setNotifications] = useState([]); // Notifications data
  const [selectedMessage, setSelectedMessage] = useState(null); // Selected message for the modal
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  const auth = getAuth();

  // Fetch notifications from Firestore and exclude cart reminders
  const fetchNotifications = async (userEmail) => {
    try {
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userEmail", "==", userEmail)
      );
      const notificationSnapshot = await getDocs(notificationsQuery);

      if (!notificationSnapshot.empty) {
        const fetchedNotifications = notificationSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              timestamp: data.timestamp?.toDate() || new Date(),
            };
          })
          // Filter out cart reminders based on the message content
          .filter(
            (notification) => !notification.message.includes("Reminder: You have")
          );

        // Sort the notifications by timestamp in descending order (newest first)
        fetchedNotifications.sort((a, b) => b.timestamp - a.timestamp);

        setNotifications(fetchedNotifications);
      } else {
        setNotifications([]);
        setError("No messages found.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Error fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  // Mark a message as read in Firestore and update the UI
  const markAsRead = async (messageId) => {
    try {
      const messageDoc = doc(db, "notifications", messageId);
      await updateDoc(messageDoc, { read: true });

      // Update the UI
      setNotifications((prevNotifications) =>
        prevNotifications.map((message) =>
          message.id === messageId ? { ...message, read: true } : message
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // Open a modal for the selected message
  const openMessageModal = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id); // Mark the message as read when opened
    }
  };

  // Close the modal
  const closeModal = () => {
    setSelectedMessage(null);
  };

  // Check if the user is authenticated and fetch their messages
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchNotifications(user.email);
      } else {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="loading-container">
          <img src={deliveryBikeGif} alt="Loading..." className="loading-gif" />
          <p className="loading-text">Loading your messages...</p>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="order-details-container">
          <h1 className="os">Order Status</h1>

          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((message) => (
                <div
                  key={message.id}
                  className={`notification-item ${
                    message.read ? "notification-read" : "notification-unread"
                  }`}
                  onClick={() => openMessageModal(message)}
                >
                  <p className="notification-message">{message.message}</p>
                  <p className="notification-timestamp">
                    {message.timestamp.toLocaleDateString()}{" "}
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No messages found.</p>
            )}
          </div>

          {selectedMessage && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Message Details</h3>
                <p>
                  <strong>Order ID:</strong> {selectedMessage.orderId}
                </p>
                <p>
                  <strong>Message:</strong> {selectedMessage.message}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedMessage.timestamp.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {selectedMessage.timestamp.toLocaleTimeString()}
                </p>
                <button className="close-modal-button" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
