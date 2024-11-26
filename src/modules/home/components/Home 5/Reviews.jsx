import React from 'react';
import './Reviews.css';
import ladyImage from '../../assets/rew1.png';
import groupImage from '../../assets/rew2.png';
import selfiImage from '../../assets/rew3.png';

const Reviews = () => {
  const reviews = [
    { text: "I don't remember a single mouthful I didn't enjoy!", image: ladyImage, align: 'left' },
    { text: "Bika Biriyani’s are some of the most tastiest Biriyani I've had!", image: groupImage, align: 'right' },
    { text: "Pretty impressive! Legit taste of biriyani!!!", image: selfiImage, align: 'left' },
  ];

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">REVIEWS</h2>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div className={`review-item ${review.align}`} key={index}>
            <div className="review-image">
              <img src={review.image} alt={`Review ${index + 1}`} className="review-image-item" />
            </div>
            <div className="review-text">
              <p>"{review.text}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
