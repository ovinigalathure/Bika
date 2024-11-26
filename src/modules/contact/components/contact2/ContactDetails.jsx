// profile/components/ContactDetails.jsx
import React from 'react';
import './ContactDetails.css';

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <div className="contact-item">
        <span className="icon">📞</span>
        <p className='par'>Phone: 077-7123766</p>
      </div>
      <div className="contact-item">
        <span className="icon">📍</span>
        <p className='par'>Location: No 50, Moraketiya Road, Pallegama, Embilipitiya</p>
      </div>
      <div className="contact-item">
        <span className="icon">✉️</span>
        <p className='par'>Email: bikaembilipitiya@gmail.com</p>
      </div>
    </div>
  );
};

export default ContactDetails;
