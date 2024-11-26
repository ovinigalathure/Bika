import React from 'react';
import Header from '../home/components/Home 1/Header';
import './about.css';
import AboutUs from '../about/components/about 1/AboutUs';
import DiscoverUs from './components/about 2/DiscoverUs';
import MarketingRepresentative from './components/about 3/MarketingRepresentative';
import NewsletterForm from '../home/components/Home 8/NewsletterForm';
import Footer from '../home/components/Home 10/Footer';
import HeadpartA from './components/about 4/Headpart';
import AmenitiesA from './components/about 4/Amenities';

function About() {
    return (
        <div className="About-container2">
            <Header />
            <AboutUs />
            <DiscoverUs />
            <MarketingRepresentative />
            
            <AmenitiesA />
            <NewsletterForm />
            <Footer />

        </div>
    );
}

export default About;
