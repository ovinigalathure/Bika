import React, { useState, useEffect } from 'react';
import './comment.css';
import personImage from '../../assets/personF.png';
import { db } from '../../../firebase';
import { auth } from '../../../firebase'; // Import Firebase auth instance
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // Import for auth state listener

const CommentSection = () => {
  const [name, setName] = useState('');
  const [item, setItem] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null); // State to store the logged-in user

  // Check if a user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state based on the logged-in user
    });
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Check if the user is logged in
    if (!user) {
      setError('You must be logged in to add a comment.'); // Show error message for non-logged-in users
      return;
    }

    // Simple validation
    if (!name || !item || !city || !comment) {
      setError('All fields are required.');
      return;
    }

    try {
      const commentsRef = collection(db, 'Comments');
      await addDoc(commentsRef, {
        name,
        item,
        city,
        comment,
        userId: user.uid, // Store user ID for reference
        createdAt: new Date(),
      });

      setName('');
      setItem('');
      setCity('');
      setComment('');
      setSuccessMessage('Comment sent successfully!');

    } catch (error) {
      console.error('Error adding comment: ', error);
      setError('Failed to add comment. Please try again later.');
    }
  };

  return (
    <div className="comment-section">
      <div className="left-panel">
        <img src={personImage} alt="Person" className="person-image" />
        <div className="labels">
          {/* <div className="label-top">Your Thoughts</div> */}
          {/* <div className="label-bottom">Share your feedback!</div> */}
        </div>
      </div>
      <div className="right-panel">
        <h2>Drop a Comment</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="comment-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Item" 
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="City" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required 
          />
          <textarea 
            placeholder="Drop a Comment..." 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required 
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
