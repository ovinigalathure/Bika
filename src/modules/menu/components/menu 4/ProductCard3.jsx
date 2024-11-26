import React, { useState } from 'react';
import './ProductCard3.css'; 
import SearchBar from './SearchBar';
import Header from '../../../home/components/Home 1/Header';
import ckottu from '../../assets/ckottu.jpg';
import cckottu from '../../assets/cckottu.jpg';
import chkottu from '../../assets/chkottu.jpg';
import kottuc from '../../assets/kottuc.jpg';

const products = [
  {
    name: 'CHICKEN KOTTU REGULAR',
    price: 1200,
    image: ckottu , // Directly assign the image
  },
  {
    name: 'CHEESE CHICKEN KOTTU REGULAR',
    price: 1300,
    image: cckottu, // Directly assign the image
  },
  {
    name: 'CHEESE CHICKEN KOTTU REGULAR(7PEX)',
    price: 1750,
    image: chkottu, // Directly assign the image
  },
  {
    name: 'CHEESE CHICKEN KOTTU REGULAR(7PEX)',
    price: 1750,
    image: kottuc, // Directly assign the image
  },
];

function ProductCard3() {
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
      <h1 className="main-title">KOTTU</h1>
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

export default ProductCard3;
