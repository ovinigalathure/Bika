import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { Timestamp } from 'firebase/firestore';
import Select from 'react-select';
import './MenuDetails.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuType } = location.state;
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCustomizeOptions, setSelectedCustomizeOptions] = useState({});
  const [customizedQuantities, setCustomizedQuantities] = useState({});
  const [quantities, setQuantities] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const q = query(collection(db, 'Menu'), where('menuType', '==', menuType));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);

        const initialSelectedOptions = {};
        const initialQuantities = {};
        const initialCustomizedQuantities = {};
        items.forEach((item) => {
          initialSelectedOptions[item.id] = [];
          initialQuantities[item.id] = 1;
          if (item.customizeItems) {
            item.customizeItems.forEach((option) => {
              initialCustomizedQuantities[`${item.id}-${option.item}`] = 1;
            });
          }
        });
        setSelectedCustomizeOptions(initialSelectedOptions);
        setQuantities(initialQuantities);
        setCustomizedQuantities(initialCustomizedQuantities);
      } catch (error) {
        console.error('Error fetching menu items: ', error);
      }
    };

    fetchMenuItems();
  }, [menuType]);

  const handleCustomizeChange = (itemId, selectedOptions) => {
    const newCustomizeQuantities = { ...customizedQuantities };
    selectedOptions.forEach((option) => {
      const key = `${itemId}-${option.value}`;
      if (!newCustomizeQuantities[key]) {
        newCustomizeQuantities[key] = 1; // Initialize the quantity if not already present
      }
    });

    setSelectedCustomizeOptions((prevState) => ({
      ...prevState,
      [itemId]: selectedOptions,
    }));
    setCustomizedQuantities(newCustomizeQuantities);
  };

  const handleCustomizeQuantityChange = (itemId, optionItem, value) => {
    setCustomizedQuantities((prevState) => ({
      ...prevState,
      [`${itemId}-${optionItem}`]: value,
    }));
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantities((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] + 1,
    }));
  };

  const handleDecreaseQuantity = (itemId) => {
    setQuantities((prevState) => ({
      ...prevState,
      [itemId]: prevState[itemId] > 1 ? prevState[itemId] - 1 : 1,
    }));
  };

  const handleAddToCart = async (item) => {
    if (!user) {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in to add items to your cart.',
        icon: 'info',
        confirmButtonText: 'Log In',
      }).then(() => {
        navigate('/login');
      });
      return;
    }
  
    try {
      const cartCollection = collection(db, `users/${user.email}/cart`);
      const itemQuery = query(cartCollection, where('productName', '==', item.productName));
      const querySnapshot = await getDocs(itemQuery);
  
      // Extract selected customization details with prices
      const selectedOptions = selectedCustomizeOptions[item.id] || [];
      const customizeDetails = selectedOptions.map((option) => {
        const optionDetails = item.customizeItems.find((customizeItem) => customizeItem.item === option.value);
        return {
          item: option.value,
          quantity: customizedQuantities[`${item.id}-${option.value}`] || 1,
          price: optionDetails?.price || 0, // Ensure price is fetched
        };
      });
  
      if (!querySnapshot.empty) {
        // If item exists in the cart, update it
        const cartItemDoc = querySnapshot.docs[0];
        const cartDocRef = doc(db, `users/${user.email}/cart`, cartItemDoc.id);
  
        await updateDoc(cartDocRef, {
          quantity: cartItemDoc.data().quantity + quantities[item.id],
          customizeDetails,
        });
  
        Swal.fire({
          title: 'Updated!',
          text: `${item.productName} quantity has been updated in the cart!`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        // If item does not exist in the cart, add it
        await addDoc(cartCollection, {
          productName: item.productName,
          quantity: quantities[item.id],
          price: item.price,
          discount: item.discount || 0,
          customizeDetails,
          timestamp: Timestamp.fromDate(new Date()),
        });
  
        Swal.fire({
          title: 'Added to Cart!',
          text: `${item.productName} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while adding the item to the cart. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  

  const handleBuyNow = (item) => {
    if (!user) {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in to proceed with your order.',
        icon: 'info',
        confirmButtonText: 'Log In',
      }).then(() => {
        navigate('/login');
      });
      return;
    }
  
    const selectedOptions = selectedCustomizeOptions[item.id] || [];
    const customizeDetails = selectedOptions.map((option) => ({
      item: option.value,
      quantity: customizedQuantities[`${item.id}-${option.value}`] || 1,
      price: item.customizeItems.find((opt) => opt.item === option.value)?.price || 0,
    }));
  
    const orderDetails = {
      productName: item.productName,
      price: item.price,
      quantity: quantities[item.id],
      discount: item.discount || 0,
      customizeDetails,
      totalPrice:
        (item.price -
          (item.price * (item.discount || 0)) / 100 +
          customizeDetails.reduce((acc, detail) => acc + detail.quantity * detail.price, 0)) *
        quantities[item.id],
    };
  
    navigate('/order', { state: { orderDetails: [orderDetails] } });
  };
  
  

  return (
    <div className="menu-details-page">
      <h1 className="menu-details-title">{menuType.toUpperCase()}</h1>
      <div className="menu-items-container">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div className="menu-item-card" key={item.id}>
              <img src={item.image} alt={item.productName} className="menu-item-image" />
              <h3 className="menu-item-title">{item.productName}</h3>
              <p className="menu-item-price">Rs. {item.price}</p>
              <p className="menu-item-discount">Discount: {item.discount}%</p>

              <div className="menu-item-customize">
                <strong>Customize Options:</strong>
                <Select
                  isMulti
                  options={
                    item.customizeItems &&
                    item.customizeItems.map((option) => ({
                      value: option.item,
                      label: `${option.item} - Rs. ${option.price}`,
                    }))
                  }
                  value={selectedCustomizeOptions[item.id]}
                  onChange={(selectedOptions) =>
                    handleCustomizeChange(item.id, selectedOptions)
                  }
                  placeholder="Select customization"
                />
                {selectedCustomizeOptions[item.id]?.map((option, index) => (
                  <div key={index} className="customize-quantity">
                    <strong>{option.value} Quantity:</strong>
                    <input
                      type="number"
                      min="1"
                      value={customizedQuantities[`${item.id}-${option.value}`] || 1}
                      onChange={(e) =>
                        handleCustomizeQuantityChange(item.id, option.value, parseInt(e.target.value))
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="menu-item-quantity">
                <strong>Quantity:</strong>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <span>{quantities[item.id]}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <div className="menu-item-actions">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
                <button className="buy-now-btn" onClick={() => handleBuyNow(item)}>
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items available for {menuType}</p>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
