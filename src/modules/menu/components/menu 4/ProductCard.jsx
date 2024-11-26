import React, { useState, useEffect } from 'react';
import './ProductCard.css';
import SearchBar from './SearchBar';
import Header from '../../../home/components/Home 1/Header';
import { db } from '../../../firebase'; // Adjust the path to your firebase.js
import { collection, getDocs } from 'firebase/firestore';

function ProductCard() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsByType, setProductsByType] = useState({});
  const [menuTypes, setMenuTypes] = useState([]);
  
  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Menu')); // Ensure 'Menu' is the correct collection name
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().productName,
          image: doc.data().image,
          price: parseFloat(doc.data().price),
          menuType: doc.data().menuType, // Get the menuType from Firestore
          customizeItem: doc.data().customizeItem
        }));

        // Group products by menuType
        const groupedProducts = productsData.reduce((acc, product) => {
          const type = product.menuType;
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(product);
          return acc;
        }, {});

        setProductsByType(groupedProducts);
        setMenuTypes(Object.keys(groupedProducts)); // Set menu types for rendering
        setFilteredProducts(productsData); // Initialize filtered products with fetched products
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = Object.values(productsByType).flat().filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <Header className="nav" />
      <h1 className="main-title">CHICKEN BIRIYANI</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="product-container">
        {menuTypes.map((type) => (
          <div key={type}>
            <h2 className="menu-type-title">{type}</h2>
            <div className="product-list">
              {productsByType[type].map((product) => (
                <div className="product-card" key={product.id}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`product-image`} 
                  />
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">Rs. {product.price.toFixed(2)}</p>
                  <select className="product-customize">
                    {product.customizeItem && product.customizeItem.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                  <div className="button-group">
                    <button className="add-to-cart">Add to cart</button>
                    <button className="buy-now">Buy Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
