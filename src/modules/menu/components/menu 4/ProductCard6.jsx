import React, { useState } from 'react';
import './ProductCard6.css';
import SearchBar from './SearchBar'; // Ensure this path is correct
import Header from '../../../home/components/Home 1/Header';
import devfish from '../../assets/dfish.jpg';
import ffish from '../../assets/ffish.jpg';
import fstew from '../../assets/fstew.jpg';
import ffinger from '../../assets/ffinger.jpg';

const products = [
  {
    name: 'DEVILED FISH(250g)',
    price: 2200,
    image: devfish,
  },
  {
    name: 'FRIED FISH(250g)',
    price: 1400,
    image: ffish,
  },
  {
    name: 'FISH STEW (250g)',
    price: 1600,
    image: fstew,
  },

  {
    name: 'FISH FINGER (250g)',
    price: 1800,
    image: ffinger,
  },

];

function ProductCard6() {
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
      <h1 className="main-title">FISH DISHES</h1>
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

export default ProductCard6;
