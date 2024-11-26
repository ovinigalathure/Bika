import React from 'react';
import './ShowcaseBanner.css';
import Header from '../../../home/components/Home 1/Header';
import back from '../../Assets/image1.png';

const ShowcaseBanner = () => {
  return (
    <section className="showcase-banner">
        
      <div className="showcase-content">
        <h1>"Explore tastes, discover joy."</h1>
      </div>
      {/* <div className="showcase-image">
        <img src={back} alt="Delicious Food" />
      </div> */}
      <div className="carousel-indicators">
        <span className="indicator"></span>
        <span className="indicator"></span>
        <span className="indicator"></span>
      </div>
    </section>
  );
};

export default ShowcaseBanner;
