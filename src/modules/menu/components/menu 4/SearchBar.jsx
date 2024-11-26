import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for foods" className="search-input" />
      <button className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;
