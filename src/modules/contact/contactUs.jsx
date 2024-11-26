import React from 'react'
import Header from '../home/components/Home 1/Header';
import './contactUs.css';
import ShowcaseBanner from './components/contact1/ShowcaseBanner';
import ContactDetails from './components/contact2/ContactDetails';
import FollowUs from './components/contact3/FollowUs';
import Footer from '../home/components/Home 10/Footer';
import LocationCard from '../home/components/Home 7/LocationCard';


function ContactUs() {
  return (
    <div className="contact-container">
      <Header />
      <ShowcaseBanner />
      <ContactDetails/>
      <FollowUs />
      <LocationCard />
      <Footer />

    </div>
  )
}

export default ContactUs;