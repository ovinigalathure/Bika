import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import './ShoppingCart.css';
import Header from '../../home/components/Home 1/Header';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuMessage, setMenuMessage] = useState('');

  // Get the current user
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const cartCollection = collection(db, `users/${user.email}/cart`);
        const cartSnapshot = await getDocs(cartCollection);
        const items = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      }
    };
    if (user) fetchCartItems();
  }, [user]);

  // Handle item selection
  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  // Remove item from the cart
  const handleRemove = async (itemId) => {
    if (!user) return;
    const cartDoc = doc(db, `users/${user.email}/cart`, itemId);
    try {
      await deleteDoc(cartDoc);
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      setMenuMessage('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Update item quantity
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (!user || newQuantity < 1) return;

    const cartDoc = doc(db, `users/${user.email}/cart`, itemId);
    try {
      await updateDoc(cartDoc, { quantity: newQuantity });
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      setMenuMessage('Quantity updated successfully.');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id));
    if (selectedCartItems.length === 0) {
      setMenuMessage('Please select at least one item to proceed to checkout.');
      return;
    }
    navigate('/order', { state: { orderDetails: selectedCartItems } });
  };

  return (
    <div className="head">
      <Header />
      <div className="shopping-cart-container">
        <div className="cart-header">
          <button className="back-buttonC" onClick={() => navigate(-1)}>
            🔙 Back
          </button>
          <h1>Your Shopping Cart</h1>
        </div>

        {user ? (
          <>
            {cartItems.length > 0 ? (
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Customizations</th>
                    <th>Total Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const basePrice = parseFloat(item.price) || 0;
                    const discount = item.discount || 0;
                    const discountedPrice = basePrice * ((100 - discount) / 100);
                    const customizationTotal = item.customizeDetails
                      ? item.customizeDetails.reduce(
                          (acc, customization) => acc + customization.quantity * customization.price,
                          0
                        )
                      : 0;
                    const totalPrice = (
                      discountedPrice * item.quantity + customizationTotal
                    ).toFixed(2);

                    return (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </td>
                        <td>{item.productName}</td>
                        <td>
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-button"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </td>
                        <td>Rs. {basePrice.toFixed(2)}</td>
                        <td>{discount}%</td>
                        <td>
                          {item.customizeDetails && item.customizeDetails.length > 0 ? (
                            <ul>
                              {item.customizeDetails.map((customization, index) => (
                                <li key={index}>
                                  {customization.item} (x{customization.quantity}) - Rs.
                                  {customization.quantity * customization.price}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            'None'
                          )}
                        </td>
                        <td>Rs. {totalPrice}</td>
                        <td>
                          <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        ) : (
          <p>Please log in to view your cart.</p>
        )}

        {menuMessage && (
          <div className="menu-message">
            <p>{menuMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
