import React from 'react';
import './MarketingRepresentative.css';
import ashen from '../../assets/camashen.jpg';
import clogo from '../../assets/circlelogo.png';

const MarketingRepresentative = () => {
  return (
    <div className="marketing-container">
      <div className="marketing-content">
        <h2 className="marketing-title">Our Marketing Representative</h2>
        <div className="marketing-text">
          <img src={clogo} alt="Bika Logo" className="logo" />
          <p className="marketing-description">
            Founded by the talented Ashen, is more than just a biryani spot – it’s a celebration of flavors and traditions. Ashen, with his passion for marketing and deep appreciation for Sri Lankan cuisine, set out to create a place where people could enjoy the finest biryani, prepared with love and authenticity. His journey to perfecting the biryani recipe involved countless hours of experimentation, ensuring every grain of rice and piece of meat contributed to an unforgettable dining experience.
          </p>
        </div>
      </div>
      <div className="marketing-image">
        <img src={ashen} alt="Ashen" />
      </div>
    </div>
  );
};

export default MarketingRepresentative;
