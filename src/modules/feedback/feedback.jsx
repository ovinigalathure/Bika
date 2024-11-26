import React from 'react'
import Header from '../home/components/Home 1/Header';
// import './feedback.css';
import Wall from '../feedback/components/feedback1/wall';
import TestimonialsNew from './components/feedback2/TestimonialsNew';
import ContactForm from './components/feedback4/ContactForm';
import Profile from './components/feedback4/Profile';
import FAQ from './components/feedback4/FAQ';
import Footer from '../home/components/Home 10/Footer';
import CommentSection from './components/feedback5/comment';

function Feedback() {
  return (
    
    <div className="feedback-container">
      <Header />
      <Wall />
      <TestimonialsNew />
      <CommentSection />
      <Profile />
      <Footer />



    </div>

  )
}

export default Feedback;