// src/components/LocationInfo.jsx
import React from 'react';
import './LocationInfo.css';

const LocationInfo = () => {
  return (
    <div className="location-info">
      <h3>OUR LOCATION</h3>
      <p>No. 50,<br />Moraketiya Road,<br />Pallegama,<br />Embilipitiya.</p>
      <a href="https://www.google.com/maps/place/Bika+Embilipitiya+-+%E0%B6%B6%E0%B7%92%E0%B6%9A+%E0%B6%87%E0%B6%B9%E0%B7%92%E0%B6%BD%E0%B7%92%E0%B6%B4%E0%B7%92%E0%B6%A7%E0%B7%92%E0%B6%BA/@6.334122,80.8523661,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae401077d86a5b1:0x275bc8a8671bbb36!8m2!3d6.334122!4d80.854941!16s%2Fg%2F11l1jm11_v?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D" className="get-direction">Get Direction</a>
      <div className="footer-bottom">
        <p>Copyright © 2024</p>
        <p>Powered by [Bika Embilipitiya]</p>
      </div>
    </div>
  );
};

export default LocationInfo;
