import React from 'react';
import './firstsection.css';
import menuback from '../../assets/menuback.png'; // Food background image
import title from '../../assets/Text.png'; // Text image
import man from '../../assets/1-removebg-preview (1).png'; // Image of the man
import MenuButton from './MenuButton'; 

const FirstSection = () => {
    return (
        <section className="hero-section">
            <div className='btn'>
            <MenuButton className="btn" />
            </div>
            <div className="food-background">
                <img src={menuback} alt="Food Background" className="background-image2" />
                <div className="overlay-content">
                    <img src={title} alt="Title" className="title-image2" />
                    <img src={man} alt="Person" className="man-image2" />
                </div>
            </div>
        </section>
    );
};

export default FirstSection;
