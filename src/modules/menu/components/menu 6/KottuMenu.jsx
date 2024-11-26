import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import FoodCard from './FoodCard';
import './styles/KottuMenu.css';

const kottuItems = [
  { id: 1, name: 'Chicken Kottu Regular', price: 1200, image: 'path_to_image' },
  { id: 2, name: 'Chicken Kottu Regular(7PCX)', price: 1750, image: 'path_to_image' },
  { id: 3, name: 'Cheese Chicken Kottu Regular', price: 1300, image: 'path_to_image' },
  { id: 4, name: 'Cheese Chicken Kottu Regular(8PCX)', price: 1900, image: 'path_to_image' },
];

function KottuMenu() {
  return (
    <div className="kottu-container">
      <Header />
      <SearchBar />
      <div className="food-list">
        {kottuItems.map(item => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default KottuMenu;
