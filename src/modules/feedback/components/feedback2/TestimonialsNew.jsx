import React, { useEffect, useState } from 'react';
import './TestimonialsNew.css';
import { db } from '../../../firebase'; // Ensure you import your Firestore instance
import { collection, getDocs } from 'firebase/firestore';

function CommentsNew() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRef = collection(db, 'Comments'); // Reference to the Comments collection
        const querySnapshot = await getDocs(commentsRef);
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Use the auto-generated Document ID (e.g., "Com001")
          ...doc.data(),
        }));

        // Sort comments by 'createdAt' (most recent first)
        const sortedComments = commentsData.sort((a, b) => {
          // Ensure 'createdAt' is a valid timestamp
          return b.createdAt?.seconds - a.createdAt?.seconds;
        });

        // Set the comments state
        setComments(sortedComments);
      } catch (error) {
        console.error('Error fetching comments: ', error);
        setError('Failed to load comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Function to format the timestamp to a readable date
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : timestamp; // Support both Firestore timestamps and Date objects
    return date.toLocaleString(); // Format the date to a readable string
  };

  return (
    <section className="comments-new">
      <div className="comments-content">
        {loading && <p>Loading comments...</p>} {/* Loading indicator */}
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        {/* Display comments */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                {/* Display name */}
                <p className="user-name">Name: {comment.name}</p>
              </div>
              <div className="comment-body">
                {/* Display comment text */}
                <p className="comment-text">Comment: {comment.comment}</p>

                {/* Display item */}
                <p className="user-item">Item: {comment.item}</p>

                {/* Display city */}
                <p className="user-city">City: {comment.city}</p>

                {/* Display createdAt */}
                <p className="comment-date">Posted on: {formatTimestamp(comment.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}

export default CommentsNew;
