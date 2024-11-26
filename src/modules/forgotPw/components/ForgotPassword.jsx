import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase method
import { auth } from '../../firebase'; // Import Firebase config
import './ForgotPassword.css';
import fog from '../assets/image1.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // To show success or error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage(`Reset link sent to ${email}`);
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Adjust the path according to your routes
      }, 2000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
      
    } catch (error) {
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Handle specific Firebase Auth error codes
      if (error.code === 'auth/user-not-found') {
        setMessage('No user found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email address.');
      } else {
        setMessage('Failed to send reset link. Please try again later.');
      }
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          <h1>Forgot Your Password?</h1>
          <p>Enter your email to reset the password.</p>
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email-input"
            />
            <button type="submit" className="continue-button">Continue</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="forgot-password-image">
          <img src={fog} alt="Forgot Password Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
