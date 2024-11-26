import React, { useState } from 'react';
import './ProductCard2.css';
import SearchBar from './SearchBar'; // Ensure this path is correct
import Header from '../../../home/components/Home 1/Header';
import cfriedRice from '../../assets/chicken f rice.jpg';
import eggRice from '../../assets/egg&veg.jpg';
import mixFRice from '../../assets/mixed rice.jpg';
import seaRice from '../../assets/see food rice.jpg';
import nasiRice from '../../assets/nasi.jpg';
import seaNasi from '../../assets/sea nasi.jpg';

const products = [
  {
    name: 'EGG & VEGETABLE FRIED RICE',
    price: 650,
    image: eggRice,
  },
  {
    name: 'CHICKEN FRIED RICE',
    price: 10000,
    image: cfriedRice,
  },
  {
    name: 'MIXED FRIED RICE',
    price: 1200,
    image: mixFRice,
  },
  {
    name: 'SEAFOOD RICE',
    price: 1150,
    image: seaRice,
  },
  {
    name: 'NASIGORENG RICE',
    price: 1200,
    image: nasiRice,
  },
  {
    name: 'SEAFOOD NASIGORENG RICE',
    price: 1200,
    image: seaNasi,
  },
];

function ProductCard4() {
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
      <h1 className="main-title">FRIED RICE</h1>
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

export default ProductCard4;
