import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import FoodCard from './FoodCard';
import './Profile.css';

const foodItems = [
  { id: 1, name: 'Egg & Vegetable Fried Rice', price: 650, image: 'path_to_image' },
  { id: 2, name: 'Chicken Fried Rice', price: 880, image: 'path_to_image' },
  { id: 3, name: 'Mixed Fried Rice', price: 1200, image: 'path_to_image' },
  { id: 4, name: 'Seafood Rice', price: 1150, image: 'path_to_image' },
  { id: 5, name: 'Nasigoreng Rice', price: 1200, image: 'path_to_image' },
  { id: 6, name: 'Seafood Nasigoreng Rice', price: 1200, image: 'path_to_image' },
];

function Profile() {
  return (
    <div className="profile-container">
      <Header />
      <SearchBar />
      <div className="food-list">
        {foodItems.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
