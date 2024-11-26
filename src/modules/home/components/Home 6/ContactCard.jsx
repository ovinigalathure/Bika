import React from 'react';
import './ContactCard.css';
import AshenImage from '../../assets/Ashen.png';
import fbicon from '../../assets/15047435-removebg-preview.png';
import gogleicon from '../../assets/google-icon-2048x2048-pks9lbdv-removebg-preview.png';
import tiktokicon from '../../assets/25858688_3d_realistic_tiktok_icon-removebg-preview.png';
import logoTe from '../../assets/bikaTNlogo.png';
import bplate from '../../assets/plate.jpg';

const ContactCard = () => {
  return (
    <div className="contact-card-container" style={{ backgroundImage: `url(${bplate})` }}>
      <div className="contact-header">
        <h2>Give us a follow</h2>
        <div className="person-image">
          <img src={AshenImage} alt="ashen" className="person-image" />
        </div>
        <div className="social-icons">
          <img src={fbicon} alt="Facebook Icon" className="social-icon" />
          <img src={tiktokicon} alt="TikTok Icon" className="social-icon" />
          <img src={gogleicon} alt="Google Icon" className="social-icon" />
        </div>
      </div>
      <div className="contact-details">
        <p>Contactless Delivery Available</p>
        <p className="phone-number">0777123766</p>
      </div>
      <div className="brand-label-img">
        <img src={logoTe} alt="logo" className="brand-label-img" />
      </div>
    </div>
  );
};

export default ContactCard;
