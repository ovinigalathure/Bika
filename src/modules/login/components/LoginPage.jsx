import React from 'react';
import LoginForm from './LoginForm';
import foodImage from '../assets/Image.png';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-image">
        <img src={foodImage} alt="Delicious food" className="image" />
      </div>
      <div className="login-form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
