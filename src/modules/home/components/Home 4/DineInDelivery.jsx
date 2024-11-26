import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './DineInDelivery.css';
import dineinImage from '../../assets/de1.png';
import takeawayImage from '../../assets/de2.png';
import deliveryImage from '../../assets/de3.png';
import deliveryPerson from '../../assets/delivery.png';
import { db } from '../../../firebase';

function DineInDelivery() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook for programmatic navigation

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Menu"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Filter menu items based on the search query and "productName"
  const filteredItems = menuItems.filter(item =>
    item.productName && item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle item selection from the dropdown and navigate to the relevant item page
  const handleSelectItem = (item) => {
    setSearchQuery(item.productName); // Set search query to the selected item name

    // Find the item in menuItems array using productName to ensure the selected item is navigated to
    const selectedItem = menuItems.find(menuItem => menuItem.productName === item.productName);

    // Navigate to the item's page using menuType if it exists
    if (selectedItem) {
      const formattedMenuType = selectedItem.menuType.toLowerCase().replace(/\s+/g, '-'); // Format menuType for URL
      navigate(`/menu-details/${formattedMenuType}`, { state: { menuType: selectedItem.menuType } });
    } else {
      console.error('Item not found for navigation');
    }
  };

  return (
    <div className="dinein-delivery-section">
      <h1 className="dinein-title">Dine In, Takeaway, and Delivery Foods</h1>
      <div className="dinein-content">
        <input 
          type="text" 
          className="search-menu" 
          placeholder="Search Menu"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
        />

        {/* Dropdown list */}
        {searchQuery && (
          <div className="dine-dropdown">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="dine-dropdown-item"
                  onClick={() => handleSelectItem(item)} // Handle selection and navigation
                >
                  {item.productName}
                </div>
              ))
            ) : (
              <p className="dine-dropdown-no-items">No items found</p>
            )}
          </div>
        )}

        <div className="dinein-icons">
          <div className="icon">
            <img src={dineinImage} alt="dine in" className="Dinein" />
          </div>
          <div className="icon">
            <img src={takeawayImage} alt="takeaway" className="Takeaway" />    
          </div>
          <div className="icon">
            <img src={deliveryImage} alt="delivery" className="Delivery" />
          </div>
        </div>
        <div className="delivery-image">
          <img src={deliveryPerson} alt="delivery person" className="deliveryPerson" />
        </div>

        {/* Loading indication */}
        {loading ? (
          <p>Loading menu items...</p>
        ) : (
          <div className="menu-items">
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DineInDelivery;
