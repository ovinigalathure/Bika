import React from 'react';
import './Banner.css';
import backImage from '../../assets/image8.png';
import lImage from '../../assets/image14.png';

const Banner = () => {
    return (
        <div className="banner">

          <div className="yel-image">
              <img src={backImage} alt="yellow" />
            </div>

            <p className="banner-text">Perfectly spiced and aromatic, with tender meat and fragrant rice.</p>
            <img src={lImage} alt="logo" />
            <div className="banner-dots">. . .</div>
        </div>
    );
}

export default Banner;