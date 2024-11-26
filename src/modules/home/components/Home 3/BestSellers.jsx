import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from '../../../firebase'; // Ensure correct import path
import './BestSellers.css'; // Make sure this file contains your CSS for styling
import buttonImage from '../../assets/click to collect.png'; // Update with correct path to button image

function BestSellers() {
  const navigate = useNavigate(); 
  const [items, setItems] = useState([]); // State to hold items from Firestore

  // Fetch items from "web-promos" collection in Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "web-promos"), (snapshot) => {
      const itemsArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsArray); // Update state with fetched items
    }, (error) => {
      console.error("Error fetching web promotions: ", error);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Updated handleButtonClick function
  const handleButtonClick = (item) => {
    // Navigate to the "/order" page and pass the item details as orderDetails in the state
    navigate("/order", { state: { orderDetails: [{ ...item, quantity: 1 }] } });
  };

  return (
    <div className="best-sellers">
      <h2 className="best-sellers-title">PROMOTIONS</h2>
      <div className="best-sellers-items">
        {items.map((item) => (
          <div className="best-seller-item" key={item.id}>
            <img src={item.image} alt={`Item ${item.id}`} className="best-seller-image" />
            <div className="best-seller-overlay">
              <h3 className="product-name">{item.productName}</h3>
              <p className="product-price">Price: Rs. {item.price}</p>
              <p className="product-discount">Discount: {item.discount}%</p>
              <p className="product-description">{item.description}</p>
            </div>
            {buttonImage && (
              <img 
                src={buttonImage} 
                alt={`Button for Item ${item.id}`} 
                className="best-seller-button-image" 
                onClick={() => handleButtonClick(item)} 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
