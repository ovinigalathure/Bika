import React from 'react';
import './FoodCard.css';

function FoodCard({ item }) {
  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Rs.{item.price}</p>
      <button>Customize</button>
      <button>Add to cart</button>
      <button>Buy Now</button>
    </div>
  );
}

export default FoodCard;
