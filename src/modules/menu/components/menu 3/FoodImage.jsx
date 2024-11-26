import React from 'react';
import './FoodImage.css';
import food from '../../assets/image.png';

const FoodImage = () => {
    return (
        <div className="food-image2">
            <img src={food} alt="Food" />
        </div>
    );
};

export default FoodImage;
