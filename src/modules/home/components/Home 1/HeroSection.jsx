import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import foodImage from '../../assets/biriyani-image.png.jpg';
import './HeroSection.css';
import ManImage from '../../assets/Ashen1.png';
import TextImage from '../../assets/Text.png';
import WaweImage from '../../assets/wawe.png';

function HeroSection() {
  const navigate = useNavigate(); 

  const handleOrderNowClick = () => {
    navigate('/menu'); 
    window.scrollTo(0, 0); 
  };

  return (
    <div className="hero-section">
      <img src={foodImage} alt="Delicious food" className="food-image" />
      <img src={WaweImage} alt="Wave Shape" className="wave-image" />
      <img src={ManImage} alt="Man Holding Biriyani" className="man-image" />
      <img src={TextImage} alt="Promotional Text" className="text-image" />

      <div className="hero-text">
        <div className="hero-text-container">
          <button className="order-btn" onClick={handleOrderNowClick}>ORDER NOW!!</button>
          <div class="fire"></div>
          <p className="hero-subtitle">Number one Biriyani in Sri Lanka</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
