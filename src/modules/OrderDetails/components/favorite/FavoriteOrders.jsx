import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Import Firestore and Auth from firebase config
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FavoriteOrders.css';
import Header from '../../../home/components/Home 1/Header';

const FavoriteOrders = () => {
  const [favoriteOrders, setFavoriteOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFavoriteOrders = async () => {
      try {
        const user = auth.currentUser; // Get the currently logged-in user
        if (user) {
          // Query to find products ordered more than 3 times by the user
          const orderQuery = query(
            collection(db, 'confirmedOrders'),
            where('userEmail', '==', user.email)
          );
          
          const orderSnapshot = await getDocs(orderQuery);
          const ordersMap = {};

          // Process the orders and count how many times each product has been ordered
          orderSnapshot.docs.forEach((doc) => {
            doc.data().items.forEach((item) => {
              const { productName } = item;
              if (!ordersMap[productName]) {
                ordersMap[productName] = { ...item, orderCount: 0 };
              }
              ordersMap[productName].orderCount += 1;
            });
          });

          const favoriteOrders = Object.values(ordersMap).filter(order => order.orderCount >= 3);

          // Fetch the product images from the Menu collection based on productName
          const menuQuery = query(collection(db, 'Menu'));
          const menuSnapshot = await getDocs(menuQuery);
          const menuItems = menuSnapshot.docs.map(doc => doc.data());

          // Match favorite orders with images from the Menu collection
          const favoriteOrdersWithImages = favoriteOrders.map(order => {
            const menuItem = menuItems.find(item => item.productName === order.productName);
            return {
              ...order,
              productImage: menuItem ? menuItem.image : null // Assign image if found, otherwise set as null
            };
          });

          setFavoriteOrders(favoriteOrdersWithImages);
        } else {
          setError('User is not logged in.'); // Set error if no user is logged in
        }
      } catch (error) {
        console.error('Error fetching favorite orders:', error);
        setError('An error occurred while fetching favorite orders. Please try again.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteOrders();
  }, []); // Ensure the effect runs once on component mount

  // Function to navigate to MenuDetails page
  const handleCardClick = (order) => {
    // Format productName for the URL
    const formattedProductName = order.productName.toLowerCase().replace(/\s+/g, '-'); // Replace spaces with hyphens
    console.log('Navigating to:', `/menu-details/${formattedProductName}`); // Debugging log
    navigate(`/menu-details/${formattedProductName}`); // Navigate using the formatted product name
  };

  return (
    <div className='h'>
      <Header />
      <div className="favorite-orders-container">
      <div className="favorite-orders-header">
        <h1>Favorite Orders</h1>
      </div>
      <div className="favorite-orders-body">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <p className="error-message">{error}</p> // Show error message if present
        ) : favoriteOrders.length > 0 ? (
          <div className="favorite-orders-grid">
            {favoriteOrders.map((order) => (
              <div key={order.productName} className="favorite-order-card" onClick={() => handleCardClick(order)}>
                <div className="favorite-order-image-container">
                  {order.productImage ? (
                    <img src={order.productImage} alt={order.productName} className="favorite-order-image" />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
                <h3>{order.productName}</h3>
                <p className="order-count">Ordered {order.orderCount} times</p>
                <p><strong>Price:</strong> Rs.{order.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No favorite orders found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default FavoriteOrders;
