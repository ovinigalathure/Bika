import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Import Firestore configuration
import './NewsletterForm.css';
import logobig from '../../assets/__kk - Copy.jpg';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To show success or error message

  // Helper function to validate email domain
  const isValidGmail = (email) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the email is a valid Gmail address
    if (!isValidGmail(email)) {
      setMessage('Please enter a valid @gmail.com email address.');
      return;
    }

    try {
      // Add email to Firestore collection
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        subscribedAt: new Date(),
      });
      setMessage('Thank you for subscribing!');
      setEmail(''); // Clear the email input after submission
    } catch (error) {
      console.error('Error saving subscription:', error);
      setMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="newsletter-container">
      <div className="logo1H">
        <img src={logobig} alt="logo" className="logo" />
      </div>
      <div className="newsletter-content">
        <h2>Stay Informed About Special Offers</h2>
        <p>Subscribe to the newsletter</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
          <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NewsletterForm;
