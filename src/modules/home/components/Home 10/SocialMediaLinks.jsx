import React from 'react';
import './SocialMediaLinks.css';
import btnlogo from '../../assets/__kk - Copy.jpg';
import fblink from '../../assets/fblink.png';
import insterlink from '../../assets/inslink.png';
import wapplink from '../../assets/wapplink.png';
import tiktoklink from '../../assets/tiktoklink.png';

const SocialMediaLinks = () => {
  return (
    <div className="social-media-links">
      <button className="logo-button">
        <img src={btnlogo} alt="logo-button" className="logo" />
      </button>
      <p>Connect with us on our <br />social media platforms <br />to stay updated with <br />the latest news, offers, <br />and more. Follow us <br />on,</p>
      <div className="icons">
        <a href="https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/" target="_blank" rel="noopener noreferrer">
          <img src={fblink} alt="Facebook" className="icon" />
        </a>
        <a href="https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg==" target="_blank" rel="noopener noreferrer">
          <img src={insterlink} alt="Instagram" className="icon" />
        </a>
        <a href="https://www.tiktok.com/@biriyanikade?_t=8oxzwrN6MPC&_r=1https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg==https://wa.me/94777123766https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/" target="_blank" rel="noopener noreferrer">
          <img src={tiktoklink} alt="TikTok" className="icon" />
        </a>
      </div>
      
    </div>
  );
};

export default SocialMediaLinks;
