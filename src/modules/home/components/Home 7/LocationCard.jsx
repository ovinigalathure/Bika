import React from 'react';
import './LocationCard.css';
import locicon from '../../assets/locicon.png';

const LocationCard = () => {
  return (
    <div className="location-card-container">
      <div className="location-icon">
        <img src={locicon} alt="location" className="location-icon" />
      </div>
      <div className="location-text">
        <h2>Find Us On,</h2>
        <p>No. 50,<br /> Moraketiya Road,<br /> Pallegama, Embilipitiya.</p>
      </div>
      <div className='map-section'>
      <div className='gmap-frame'>
      <iframe width="520" height="400" frameborder="0" scrolling='no' marginWidth="0" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=bika%20embilipitiya+(Bika%20Embilipitiya)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe>
      </div>
      </div>
    </div>
  );
};

export default LocationCard;
