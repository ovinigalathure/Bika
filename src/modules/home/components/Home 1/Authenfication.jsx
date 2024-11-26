import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from '../Home 1/Header';

const Authentication = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
        
  useEffect(() => {
    const listenAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticatedUser(user);
      } else {
        setAuthenticatedUser(null);
      }
    });
    return () => {
      listenAuth();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => console.log("Error signing out:", error));
  };

  return (
    <>
      {authenticatedUser === null ? (
        <>
          <NavLink to="/login">
            <button className="login-button">Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="signup-button">Sign Up</button>
          </NavLink>
        </>
      ) : (
        <>
          <span>Welcome, {authenticatedUser.email}</span>
          <NavLink to="/" onClick={userSignOut}>
            <button className="logout-button">Sign Out</button>
          </NavLink>
        </>
      )}
    </>
  );
}

export default Authentication;
