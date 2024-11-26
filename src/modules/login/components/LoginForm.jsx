import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import googleIcon from '../assets/google.png'; // Adjust the path to your image
import fbIcon from '../assets/fb.png'; // Adjust the path to your image
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to log in. Please check your credentials.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Error signing in with Google: ' + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      setError('Error signing in with Facebook: ' + error.message);
    }
  };

  return (
    <div className="form-boxl">
      <h1 className="form-title">LOGIN</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-toggle"
          />
        </div>

        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="login-button1">LOGIN</button>
      </form>
      <div className="options">
        <Link to="/forgotPassword" className="forgot-link">Forgot Password?</Link>
      </div>
      <div className="social-auth">
        <p>OR</p>
        <div className="social-iconsl">
          <button onClick={handleGoogleLogin} className="social-iconl">
            <img src={googleIcon} alt="Login with Google" />
          </button>
          <button onClick={handleFacebookLogin} className="social-iconl">
            <img src={fbIcon} alt="Login with Facebook" />
          </button>
        </div>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
