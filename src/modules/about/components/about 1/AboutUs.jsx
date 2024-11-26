import React from 'react';
import './aboutUs.css';
import right from '../../assets/about yellow.png';
import left from '../../assets/bigback.jpeg';
import plate1 from '../../assets/plate4.png';
import plate2 from '../../assets/plate 5.png';
import plate3 from '../../assets/plate6.png';

const AboutUs = () => {
    return (
        <section className="about">
            <div className="about-text">
                
                <h1 className="about-title">About Us</h1>
                <p className="about-subtitle">Crafting a Culinary Journey from Your Screen to Your Plate.</p>
            </div>
            
            <div className="about-images">
                <img src={left} alt="Main Dish-left" className="main-image-left" />
                <img src={right} alt="Main Dish-right" className="main-image-right" />

                <div className="small-images">
                    <img src={plate1} alt="Dish 1" className="small-image" />
                    <img src={plate2} alt="Dish 2" className="small-image" />
                    <img src={plate3} alt="Dish 3" className="small-image" />
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
