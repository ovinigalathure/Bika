import React from 'react';
import './Headpart.css';
import logobig from '../../assets/__kk - Copy.jpg';

function HeadpartA() {
  return (
    <div className="headpart">
      <img src={logobig} alt="logo" className="logoA" />
      <h1>Restaurant Amenities</h1>
    </div>
  );
}

export default HeadpartA;
