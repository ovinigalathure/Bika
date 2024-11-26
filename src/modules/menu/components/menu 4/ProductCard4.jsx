import React, { useState } from 'react';
import './ProductCard2.css';
import SearchBar from './SearchBar'; // Ensure this path is correct
import Header from '../../../home/components/Home 1/Header';
import eggnoodle from '../../assets/chickennoodle.jpg';
import cfriednoodle from '../../assets/egg&veg.jpg';
import seanoodle from '../../assets/seanoodle.jpg';
import mixnoodle from '../../assets/mixnoodle.jpg';


const products = [
  {
    name: 'EGG & VEGETABLE NOODLES',
    price: 600,
    image: eggnoodle,
  },
  {
    name: 'CHICKEN FRIED NOODLES',
    price: 700,
    image: cfriednoodle,
  },
  {
    name: 'SEAFOOD NOODLES',
    price: 1000,
    image: seanoodle,
  },
  {
    name: 'MIXED NOODLES',
    price: 1100,
    image: mixnoodle,
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
      <h1 className="main-title">NOODLES</h1>
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
