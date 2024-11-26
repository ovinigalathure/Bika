import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import './MenuSection.css';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]); // State for menu items
  const [menuTypes, setMenuTypes] = useState([]); // State for menu types
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch menu items and types from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching menuItems from the "Menu" collection
        const itemsSnapshot = await getDocs(collection(db, 'Menu')); // Change to "Menu"
        const itemsData = itemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(itemsData);

        // Fetching menuTypes
        const typesSnapshot = await getDocs(collection(db, 'menuTypes'));
        const typesData = typesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuTypes(typesData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchData();
  }, []);

  // Handle the navigation when clicking on a menu type
  const handleNavigation = (type) => {
    const formattedType = type.toLowerCase().replace(/\s+/g, '-'); // Format the type for URL
    navigate(`/menu-details/${formattedType}`, { state: { menuType: type } }); // Pass the menuType as state
  };

  // Filter menu items based on search query
  const filteredItems = menuItems.filter((item) =>
    item.productName && item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle item selection from the dropdown and navigate to the relevant item page
  const handleSelectItem = (item) => {
    setSearchQuery(item.productName); // Set search query to the selected item name

    const formattedMenuType = item.menuType.toLowerCase().replace(/\s+/g, '-'); // Format menuType for URL
    navigate(`/menu-details/${formattedMenuType}`, { state: { menuType: item.menuType } }); // Navigate to the item's detail page
  };

  return (
    <section className="menu-section">
      <div className="menu-header">
        <h1>OUR MENU</h1>
        <div className="search-bar2">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for foods"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
            />
            <span className="search-icon">&#128269;</span> {/* Unicode search icon */}
          </div>

          {/* Dropdown list for filtered items */}
          {searchQuery && (
            <div className="menu-dropdown">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="menu-dropdown-item"
                    onClick={() => handleSelectItem(item)} // Handle selection and navigation
                  >
                    {item.productName}
                  </div>
                ))
              ) : (
                <p className="menu-dropdown-no-items">No items found</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Display Menu Types */}
      <div className="menu-types-grid">
        {menuTypes.length > 0 ? (
          menuTypes.map((type) => (
            <button
              key={type.id}
              className="menu-type-button"
              onClick={() => handleNavigation(type.type)} // Navigate when clicking the button
            >
              <img src={type.imageUrl} alt={type.title} />
              <h2>{type.type}</h2>
            </button>
          ))
        ) : (
          <p>No types found</p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
