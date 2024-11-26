import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp
import { db, auth } from '../../firebase';
import './OrderNow.css';

const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || [];
  const [orderItems, setOrderItems] = useState(orderDetails);
  const [user, setUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState('Take Away');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const DELIVERY_CHARGE = 300.0;

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserProfile(currentUser.uid);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (location.state && location.state.orderDetails) {
      setOrderItems(location.state.orderDetails);
    }
  }, [location.state]);

  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name || '');
        setAddress(userData.address || '');
        setPhone(userData.phone || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const calculateTotalPrice = () => {
    const itemsTotal = orderItems.reduce((total, item) => {
      const basePrice = parseFloat(item.price) || 0;
      const discountValue = item.discount ? (basePrice * (item.discount / 100)) : 0;

      const customizationTotal = item.customizeDetails
        ? item.customizeDetails.reduce((acc, detail) => acc + detail.quantity * detail.price, 0)
        : 0;

      // Total price per item after applying the discount and adding customization prices
      const itemTotalPrice = (basePrice - discountValue + customizationTotal) * item.quantity;

      return total + itemTotalPrice;
    }, 0);

    // Add delivery charge if 'Delivery' option is selected
    return deliveryOption === 'Delivery' ? itemsTotal + DELIVERY_CHARGE : itemsTotal;
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      alert('Your order is empty.');
      return;
    }

    if (user) {
      setSubmitting(true);
      const orderId = `OD${Date.now().toString().slice(-6)}`;

      const orderData = {
        orderId,
        userEmail: user.email,
        items: orderItems.map((item) => ({
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount || 0,
          customizeDetails: item.customizeDetails || [],
        })),
        totalPrice,
        deliveryOption,
        address: deliveryOption === 'Delivery' ? address : '',
        phone,
        name,
        createdAt: serverTimestamp(), // Use Firebase server timestamp
      };

      try {
        await setDoc(doc(db, 'OrderNow', orderId), orderData);
        setOrderItems([]);
        navigate('/invoice', {
          state: {
            userEmail: user.email,
            orderDetails: orderData.items,
            deliveryOption,
            deliveryCharge: deliveryOption === 'Delivery' ? DELIVERY_CHARGE : 0,
            userName: name,
            address,
            phone,
          },
        });
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error submitting order. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      alert('Please log in to place an order');
      navigate('/login');
    }
  };

  return (
    <div className="order-now-container">
      <header className="order-now-header">
        <div className="order-now-header-left">
          <button className="order-now-back-button" onClick={() => navigate(-1)} aria-label="Go Back">
            🔙 Back
          </button>
        </div>
        <div className="order-now-header-right">
          <button className="order-now-menu-button" onClick={() => navigate('/menu')} aria-label="Menu">
            ☰
          </button>
          <button className="order-now-user-button" onClick={() => navigate('/profile')} aria-label="User Profile">
            👤
          </button>
          <button className="order-now-cart-button" onClick={() => navigate('/cart')} aria-label="Shopping Cart">
            🛒
          </button>
        </div>
      </header>

      <h1 className="order-now-title">ORDER NOW</h1>
      <div className="order-now-important-message">
        <p>
          ⚠️ Important: We accept cash on delivery only.
          <br />
          ⚠️ Important: If you want to cancel the order, contact our hotline-077-7123766 within 5 minutes.
        </p>
      </div>

      <div className="order-now-user-info">
        <p>
          <strong>Name:</strong> {name || 'Guest'}
        </p>
        <p>
          <strong>Phone:</strong> {phone || 'No phone number available'}
        </p>
      </div>

      <div className="order-now-delivery-option">
        <label htmlFor="deliveryOption">Choose Delivery Option:</label>
        <select
          id="deliveryOption"
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)}
        >
          <option value="Take Away">Take Away</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      {deliveryOption === 'Delivery' && (
        <div className="order-now-address">
          <label htmlFor="address">Delivery Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
          <small>
            Note: You can enter another address. We deliver only within 3km. A delivery charge of Rs. 300.00 will be
            added to the bill.
          </small>
        </div>
      )}

      {orderItems.length === 0 ? (
        <div>Your order is empty.</div>
      ) : (
        <div className="order-now-table">
          <div className="order-now-header-row">
            <span>Product Name</span>
            <span>Quantity</span>
            <span>Base Price</span>
            <span>Discount</span>
            <span>Customized Items</span>
            <span>Customized Price</span>
            <span>Actions</span>
          </div>
          {orderItems.map((item, index) => (
            <div className="order-now-row" key={index}>
              <span>{item.productName}</span>
              <div className="order-now-quantity">
                <button
                  onClick={() =>
                    setOrderItems((prev) =>
                      prev.map((el, i) =>
                        i === index ? { ...el, quantity: el.quantity > 1 ? el.quantity - 1 : 1 } : el
                      )
                    )
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    setOrderItems((prev) =>
                      prev.map((el, i) => (i === index ? { ...el, quantity: el.quantity + 1 } : el))
                    )
                  }
                >
                  +
                </button>
              </div>
              <span>Rs. {parseFloat(item.price).toFixed(2)}</span>
              <span>{item.discount ? `${item.discount}%` : '0%'}</span>
              <span>
                {item.customizeDetails && item.customizeDetails.length > 0
                  ? item.customizeDetails
                      .map(
                        (detail) =>
                          `${detail.item} (x${detail.quantity}) - Rs. ${(detail.quantity * detail.price).toFixed(2)}`
                      )
                      .join(', ')
                  : 'None'}
              </span>
              <span>
                Rs.{' '}
                {item.customizeDetails
                  ? item.customizeDetails
                      .reduce((acc, detail) => acc + detail.quantity * detail.price, 0)
                      .toFixed(2)
                  : '0.00'}
              </span>
              <span>
                <button
                  onClick={() => setOrderItems((prev) => prev.filter((_, i) => i !== index))}
                  className="order-now-delete-button"
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
          <div className="order-now-total">
            <span>Total</span>
            <span>Rs. {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      <button className="order-now-submit" onClick={handleSubmit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default OrderNow;
