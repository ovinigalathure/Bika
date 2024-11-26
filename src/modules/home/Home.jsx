import React from 'react';
import Header from './components/Home 1/Header';
import HeroSection from './components/Home 1/HeroSection';
import './Home.css';
import Banner from '../home/components/Home 2/Banner';
import BestSellers from './components/Home 3/BestSellers';
import DineInDelivery from './components/Home 4/DineInDelivery';
import Reviews from './components/Home 5/Reviews';
import ContactCard from './components/Home 6/ContactCard';
import LocationCard from './components/Home 7/LocationCard';
import NewsletterForm from './components/Home 8/NewsletterForm';
import Comment from './components/Home 9/Comment';
import Footer from './components/Home 10/Footer';
// import Effect from '../home/components/effect/SmokeEffect'



// import Authentication from './components/Home 1/Authenfication';
// import Promotion from '../../../../../Admin/frontEnd/src/modules/Promotions/components/promotion/Promotions';
// import SocialMediaLinks from './components/Home 10/SocialMediaLinks';
// import LocationInfo from './components/Home 10/LocationInfo';


function Home() {
  return (
    <div className="home-container">
      {/* <Effect /> */}
      <Header />
      <HeroSection />
      <Banner/>
      <BestSellers />
      {/* <Promotion /> */}
      <DineInDelivery />
      <Reviews />
      <LocationCard />
      <NewsletterForm />
      <Comment />
      <Footer />
      {/* <Authentication/> */}
      {/* <SocialMediaLinks /> */}
      {/* <LocationInfo /> */}

  
    </div>
  );
}

export default Home;
