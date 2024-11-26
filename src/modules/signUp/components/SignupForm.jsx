import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import googleIcon from "../assets/google.png";
import fbIcon from "../assets/fb.png";
import "./SignupForm.css";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Helper function for email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function for phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Helper function for password validation
  const validatePassword = (password) => {
    // Password should have at least 8 characters, one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateFields = () => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!phone || !validatePhone(phone))
      errors.phone = "Phone must be 10 digits";
    if (!email || !validateEmail(email))
      errors.email = "Enter a valid email address";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!password || !validatePassword(password))
      errors.password =
        "Password must be at least 8 characters, with at least one uppercase, one lowercase, and one number";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields before proceeding
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      setError("Error signing up with Google: " + error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error signing up with Facebook:", error);
      setError("Error signing up with Facebook: " + error.message);
    }
  };

  return (
    <div className="form-box1">
      <h2 className="form-heading">SIGN UP</h2>
      <form onSubmit={handleSubmit} className="frm">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`form-input ${fieldErrors.name ? "input-error" : ""}`}
        />
        {fieldErrors.name && <p className="error-text">{fieldErrors.name}</p>}

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`form-input ${fieldErrors.phone ? "input-error" : ""}`}
        />
        {fieldErrors.phone && (
          <p className="error-text">{fieldErrors.phone}</p>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`form-input ${fieldErrors.email ? "input-error" : ""}`}
        />
        {fieldErrors.email && (
          <p className="error-text">{fieldErrors.email}</p>
        )}

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`form-input ${fieldErrors.address ? "input-error" : ""}`}
        />
        {fieldErrors.address && (
          <p className="error-text">{fieldErrors.address}</p>
        )}

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`form-input ${fieldErrors.city ? "input-error" : ""}`}
        />
        {fieldErrors.city && <p className="error-text">{fieldErrors.city}</p>}

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${
              fieldErrors.password ? "input-error" : ""
            }`}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-toggle"
          />
        </div>
        {fieldErrors.password && (
          <p className="error-text">{fieldErrors.password}</p>
        )}

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-input ${
              fieldErrors.confirmPassword ? "input-error" : ""
            }`}
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="show-password-toggle"
          />
        </div>
        {fieldErrors.confirmPassword && (
          <p className="error-text">{fieldErrors.confirmPassword}</p>
        )}

        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-button">
          SIGN UP
        </button>
      </form>

      <div className="social-auth">
        <p>OR</p>
        <div className="social-iconss">
          <button onClick={handleGoogleSignUp} className="google-icons">
            <img src={googleIcon} alt="Sign up with Google" />
          </button>
          <button onClick={handleFacebookSignUp} className="facebook-icons">
            <img src={fbIcon} alt="Sign up with Facebook" />
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
