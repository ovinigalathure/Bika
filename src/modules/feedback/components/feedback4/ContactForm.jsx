import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase"; // Firebase imports
import { useNavigate } from "react-router-dom"; // For redirection
import quection from "../../assets/image.png";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth listener
import "./profile.css"; // Ensure styles for layout and image

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [user, setUser] = useState(null); // State for logged-in user
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  // Check login status and fetch user profile
  useEffect(() => {
    const fetchUserProfile = async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Fetch profile by UID
          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setFormData((prevData) => ({
              ...prevData,
              name: profileData.name || currentUser.displayName || "",
              email: profileData.email || currentUser.email || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching profile: ", error);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update logged-in user state
      if (currentUser) {
        fetchUserProfile(currentUser); // Fetch profile data for logged-in user
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for the field on change
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }
    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Please use a valid Gmail address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) {
      return;
    }

    try {
      // Save message to Firestore
      await addDoc(collection(db, "contacts"), {
        name: user ? formData.name : formData.name, // Name from user or input
        email: user ? formData.email : formData.email, // Email from user or input
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date(),
      });
      console.log("Message saved to contacts.");

      // Send notification only if user is logged in
      if (user) {
        await addDoc(collection(db, "notifications"), {
          userEmail: formData.email,
          message: `Thank you, ${formData.name}, for reaching out to us. We have received your message!`,
          timestamp: new Date(),
          seen: false,
        });
        console.log("Notification sent for logged-in user.");

        // Display success message
        setSuccessMessage("Successfully sent your message");

        // Redirect after a delay
        setTimeout(() => {
          navigate("/notifications", { state: { name: formData.name } });
        }, 2000);
      } else {
        // Prevent navigation and show error if user is not logged in
        setErrorMessage("Please log in to submit your message.");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (e) {
      console.error("Error saving to Firestore: ", e);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        {!user && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </>
        )}
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <p className="error-text">{errors.subject}</p>}
        <textarea
          name="message"
          placeholder="Enter your question..."
          className="form-textarea"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && <p className="error-text">{errors.message}</p>}
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>

      {successMessage && (
        <div className="success-message-box">
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="error-message-box">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="question-image-container">
        <img src={quection} alt="Contact Us" className="question-image" />
      </div>
    </div>
  );
};

export default ContactForm;
