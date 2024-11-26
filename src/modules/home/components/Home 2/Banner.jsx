import React from 'react';
import './components.css';
import riceImage from '../../assets/home 2 banner.jpg';
import Tlogo from '../../../home/assets/bikaTlogo.png';
import Button from './Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Banner() {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/AboutUs'); 
    window.scrollTo(0, 0); 
  };

  return (
    <div className="banner-container">
      <div className="banner-left">
        <div className="Tlogo">
          <img src={Tlogo} alt="Logo" className="small-icon" />
        </div>
        <p className="banner-description">
          "Experience the ease of having mouthwatering meals delivered right to your doorstep with our top-tier food delivery service. Whether you're craving gourmet dishes or comfort food, our extensive selection of local restaurants offers something to satisfy every taste. With our user-friendly platform, you can effortlessly browse diverse menus, customize your order, and place it in just a few clicks. We prioritize speed and reliability, ensuring that your meal arrives hot, fresh, and exactly as you ordered it. Plus, with real-time tracking, you can monitor your delivery every step of the way, so you can sit back, relax, and savor every bite in the comfort of your home—no cooking, no traffic, just great food made easy."
        </p>
        <Button text="EXPLORE MORE >>" onClick={handleButtonClick} />
        <p className="banner-footer">Number one Biriyani in Sri Lanka</p>
      </div>
      <div className="banner-right">
        <img src={riceImage} alt="Delicious food" className="food2img" />
      </div>
    </div>
  );
}

export default Banner;
