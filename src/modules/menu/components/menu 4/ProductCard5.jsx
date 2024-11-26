import React, { useState } from 'react';
import './ProductCard5.css';
import SearchBar from './SearchBar'; // Ensure this path is correct
import Header from '../../../home/components/Home 1/Header';
import devchicken from '../../assets/dchicken.jpg';
import fchicken from '../../assets/fchicken.jpg';
import chstew from '../../assets/chstew.jpg';


const products = [
  {
    name: 'DEVILED CHICKEN (250g)',
    price: 1200,
    image: devchicken,
  },
  {
    name: 'FRIED CHICKEN(250g)',
    price: 990,
    image: fchicken,
  },
  {
    name: 'CHICKEN STEW(250g)',
    price: 1100,
    image: chstew,
  },

];

function ProductCard5() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <Header className="nav" />
      <h1 className="main-title">CHICKEN DISHES</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="product-container">
        {filteredProducts.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-title">{product.name}</h3>
            <p className="product-price">Rs. {product.price.toFixed(2)}</p>
            <select className="product-customize">
              <option>Customize</option>
            </select>
            <div className="button-group">
              <button className="add-to-cart">Add to cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard5;
