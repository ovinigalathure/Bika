import React from 'react';
import Navbar from '../../components/menu 4/Navbar';
import SearchBar from '../../components/menu 4/SearchBar';
import ProductCard from '../../components/menu 4/ProductCard';
import Footer from '../../components/menu 4/Footer';
import './Profile.css';
import chickenbiriyani from '../../assets/biriyani.png';
import biriyanisawan from '../../assets/biriyanisawan.jpeg';

const products = [
  { id: 1, name: 'CHICKEN BIRIYANI REGULAR', price: 1500.00, imageUrl:{chickenbiriyani} , description: 'Single serving of Chicken Biriyani.' },
  { id: 2, name: 'BIRIYANI SAWAN (7 PAX)', price: 10000.00, imageUrl: {biriyanisawan}, description: 'Family pack for 7 people.' }
];

function Profile() {
  return (
    <div className="profile-container">
      <Navbar />
      <header className="profile-header">
        <h1>CHICKEN BIRIYANI</h1>
        <SearchBar />
      </header>
      <div className="profile-content">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
