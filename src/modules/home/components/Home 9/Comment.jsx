// src/components/Comment.jsx
import React from 'react';
import './Comment.css';
import human from '../../assets/Ashen.png';
import bubble from '../../assets/talk.png';

const Comment = () => {
  return (
    <section className="Comment">
      <div className="Comment-content">
      <img src={human} alt="man" className="human" />
      <div className="Comment-text">
        <img src={bubble} alt="bubble" className="bubble" />
          <p>“Delight in Authentic Sri Lankan Flavors, Delivered to Your Doorstep by Bika Restaurant”</p>
          <small>Number one Biriyani in Sri Lanka</small>
        </div>
      </div>
    </section>
  );
};

export default Comment;