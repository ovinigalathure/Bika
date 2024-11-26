import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import './OrderHistory.css';
import Header from '../../../home/components/Home 1/Header';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserEmail(user.email);
          const q = query(collection(db, 'confirmedOrders'), where('userEmail', '==', user.email));
          const querySnapshot = await getDocs(q);
          const orders = querySnapshot.docs.map((doc, index) => {
            const data = doc.data();
            let formattedTimestamp = 'No timestamp available';

            if (data.timestamp) {
              if (typeof data.timestamp.toDate === 'function') {
                // Firestore Timestamp
                formattedTimestamp = data.timestamp.toDate().toLocaleString();
              } else if (data.timestamp.seconds && data.timestamp.nanoseconds) {
                // Object with seconds and nanoseconds
                formattedTimestamp = new Date(data.timestamp.seconds * 1000).toLocaleString();
              }
            }

            return {
              id: `CO${String(index + 1).padStart(4, '0')}`, // Generate a readable ID
              ...data,
              timestamp: formattedTimestamp
            };
          });
          setOrderHistory(orders);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className='headcon'>
      <Header className='h' />
      <div className="order-history-container">
      <div className="order-history-header">
        <h1>Order History</h1>
      </div>
      <div className="order-history-body">
        {loading ? (
          <p>Loading...</p>
        ) : orderHistory.length > 0 ? (
          <div className="order-cards">
            {orderHistory.map((order, index) => (
              <div className="order-card" key={index}>
                <div className="order-card-content">
                  <h3>Order ID: {order.id}</h3>
                  <p><strong>User Email:</strong> {userEmail}</p>
                  <p><strong>Products:</strong> {order.items.map(item => item.productName).join(', ')}</p>
                  <p><strong>Total Price:</strong> Rs.{order.totalPrice.toFixed(2)}</p>
                  <p><strong>Status:</strong> {order.status || 'Confirmed'}</p>
                  <p><strong>Timestamp:</strong> {order.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No order history found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderHistory;
