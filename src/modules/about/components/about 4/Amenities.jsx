import React from 'react';
import './Amenities.css';
import logobig from '../../assets/__kk - Copy.jpg';

import '@fortawesome/fontawesome-free/css/all.min.css';


function AmenitiesA() {
  return (
    <div className="amenities-container">
      <table>
        <th>
          <tr>
            <img src={logobig} alt="logo" className="logoA" />
            <h1 className="title">Restaurant <br />Amenities</h1>
          </tr>
        </th>
      </table>
      <div className="amenities">
      <div className="amenity">
        <i className="fas fa-shopping-cart"></i>
        <p>Online Order</p>
      </div>
      <div className="amenity">
        <i className="fas fa-truck"></i>
        <p>Fast Delivery</p>
      </div>
      <div className="amenity">
        <i className="fas fa-utensils"></i>
        <p>Take away</p>
      </div>
      <div className="amenity">
        <i className="fas fa-chair"></i>
        <p>Clam Dining</p>
      </div>
      <div className="amenity">
        <i className="fas fa-users"></i>
        <p>Family Gathering</p>
      </div>
      <div className="amenity">
        <i className="fas fa-birthday-cake"></i>
        <p>Celebrations</p>
      </div>
    </div>

      </div>
    
  );
}

export default AmenitiesA;
