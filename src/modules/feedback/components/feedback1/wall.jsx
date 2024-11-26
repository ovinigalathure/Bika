import React from 'react';
import './wall.css';
import foodImage from '../../assets/image2.png'; 
import personImage from '../../assets/image5.png'; 
// import backImage from '../../assets/image1.png'; 
import textImage from '../../assets/image3.png'; 



function wall() {
  return (
    <section className="wall-section">
      {/* <div className="back-image-container">
        <img src={backImage} alt="wall" className="back-image-container" />
      </div> */}
      <div className="nice-image-container">
        <img src={foodImage} alt="Delicious Food" className="nice-image-container" />
      </div>
      <div className="textf-container">
      <img src={textImage} alt="text" className="nice-text-container" />
      </div>
      <div className="villan-image-container">
        <img src={personImage} alt="villan with Food" className="villan-image" />
      </div>
    </section>
  );
}

export default wall;
