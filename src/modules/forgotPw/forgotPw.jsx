// profile/profile.jsx
import React from 'react';
// import Header from './components/Header';
import ForgotPassword from './components/ForgotPassword';
import './forgot.css';

const Profile = () => {
  return (
    <div className="profile-container">
      {/* <Header /> */}
      <ForgotPassword />
    </div>
  );
};

export default Profile;
