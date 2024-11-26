import React from 'react'
import './menu.css';
import Header from '../home/components/Home 1/Header';
// import MenuButton from './components/menu 1/MenuButton';
import FirstSection from './components/menu 1/firstsection';
import MenuSection from './components/menu 2/MenuSection';
import BikaBiteSwan from './components/menu 3/BikaBiteSwan';
import FoodImage from './components/menu 3/FoodImage';
import TodaySpecialOffers from './components/menu 3/TodaySpecialOffers';
import Footer from '../home/components/Home 10/Footer';
import Navbar from './components/menu 4/Navbar';
import ProductCard from './components/menu 4/ProductCard';
// import profile from './components/menu 4/profile'
import SearchBar from './components/menu 4/SearchBar';
import ProductCard2 from './components/menu 4/ProductCard2';
import ProductCard3 from './components/menu 4/ProductCard3';

function Menu() {
  return (

    <div className="menu-container">
      
      <Header />
      <FirstSection />
      <MenuSection />
      <BikaBiteSwan />
      <FoodImage />
      <TodaySpecialOffers />
      {/* <profile/> */}
      <Footer />

    </div>
  )
}

export default Menu;