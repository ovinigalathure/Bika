import React from 'react';
import SignupForm from './SignupForm';
import foodImage from '../assets/Image.png';
import './SignupPage.css';

const SignupPage = () => {
  return (
    <div className="signup-wrapper">
      <div className="image-section">
        <img src={foodImage} alt="Delicious food" className="food-photo" />
      </div>
      <div className="form-section">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
