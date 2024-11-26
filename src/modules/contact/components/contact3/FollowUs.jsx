import React from 'react';
import './FollowUs.css';

// Importing the social media icons
import instagramIcon from './../../Assets/inster.png';
import facebookIcon from './../../Assets/fb.png'; // Update this path as necessary
import tiktokIcon from './../../Assets/tiktok.png'; // Update this path as necessary

const FollowUs = () => {
  return (
    <div className="follow-us">
      <img
        src="path/to/your/image.jpg"
        alt="Delicious food"
        className="follow-us-image"
      />
      <div className="follow-us-overlay">
        <h2>Give us follow</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg==" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://www.tiktok.com/@biriyanikade?_t=8oxzwrN6MPC&_r=1https://www.instagram.com/asankanchandima?igsh=MTdub3NkdzN3NDV6cg==https://wa.me/94777123766https://www.facebook.com/people/Bika-Embilipitiya-Restaurant-%E0%B6%B6%E0%B7%92%E0%B6%9A-%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/61551519525412/" target="_blank" rel="noopener noreferrer">
            <img src={tiktokIcon} alt="TikTok" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
