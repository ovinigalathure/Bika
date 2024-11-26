import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logoimg from "../../assets/__kk - Copy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";

function Header({ notificationCount }) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async (email) => {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("email", "==", email));

      onSnapshot(userQuery, (snapshot) => {
        const userDoc = snapshot.docs[0]?.data();
        setUserName(userDoc?.name || email);
        setProfileImage(userDoc?.image || "");
      });
    };

    const fetchCartCount = (email) => {
      const cartRef = collection(db, `users/${email}/cart`);
      return onSnapshot(cartRef, (snapshot) => {
        setCartCount(snapshot.size);
      });
    };

    const fetchNotificationCounts = (email) => {
      const collections = [
        { name: "products", key: "read", type: "promotion" },
        { name: "customer-promos", key: "read", type: "customerPromo" },
        { name: `users/${email}/cartReminder`, key: "seen", type: "cartReminder" },
      ];

      let totalUnread = 0;

      collections.forEach(({ name, key }) => {
        const collectionRef = collection(db, name);
        onSnapshot(collectionRef, (snapshot) => {
          const unreadCount = snapshot.docs.filter((doc) => !doc.data()[key]).length;
          totalUnread += unreadCount;
          setNotificationsCount(totalUnread);
        });
      });
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const email = currentUser.email;
        fetchUserData(email);
        fetchCartCount(email);
        fetchNotificationCounts(email);
      }
    });

    return () => unsubscribeAuth();
  }, [db]);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Error signing out:", error));
    setUser(null);
    setShowLogoutPopup(false);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleLogoutPopup = () => setShowLogoutPopup(!showLogoutPopup);

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logoimg} alt="logo" className="header__logo" />
      </div>
      <nav className="header__center">
        <NavLink to="/" className={({ isActive }) => (isActive ? "header__nav-active" : "header__nav-link")}>
          Home
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => (isActive ? "header__nav-active" : "header__nav-link")}>
          Menu
        </NavLink>
        <NavLink to="/AboutUs" className={({ isActive }) => (isActive ? "header__nav-active" : "header__nav-link")}>
          About
        </NavLink>
        <NavLink to="/feedback" className={({ isActive }) => (isActive ? "header__nav-active" : "header__nav-link")}>
          Feedback
        </NavLink>
        <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "header__nav-active" : "header__nav-link")}>
          Contact
        </NavLink>
      </nav>
      <div className="header__right">
        {user ? (
          <>
            <div className="header__user-info">
              {profileImage && (
                <img src={profileImage} alt="Profile" className="header__profile-picture" onClick={toggleLogoutPopup} />
              )}
              <span className="header__welcome-message">Welcome, {userName || user.email}</span>
              {showLogoutPopup && (
                <div className="header__logout-popup">
                  <span className="header__popup-welcome">Welcome, {userName || user.email}</span>
                  <button onClick={() => handleNavigation("/profile")} className="header__profile-button">
                    Profile
                  </button>
                  <button onClick={handleLogout} className="header__logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="header__icons">
              <NavLink to="/cart">
                <div className="cart-icon">
                  <FontAwesomeIcon icon={faShoppingCart} className="header__icon" />
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </div>
              </NavLink>
              <NavLink to="/notifications">
                <div className="notification-icon">
                  <FontAwesomeIcon icon={faBell} className="header__icon" />
                  {notificationsCount > 0 && <span className="notification-count">{notificationsCount}</span>}
                </div>
              </NavLink>
              <div className="header__dropdown">
                <FontAwesomeIcon icon={faBars} className="header__icon" onClick={toggleDropdown} />
                {showDropdown && (
                  <div className="header__dropdown-content">
                    <button onClick={() => handleNavigation("/status")} className="header__dropdown-item">
                      Order Status
                    </button>
                    <button onClick={() => handleNavigation("/history")} className="header__dropdown-item">
                      Order History
                    </button>
                    <button onClick={() => handleNavigation("/fav")} className="header__dropdown-item">
                      Favorite Orders
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__login-button" onClick={() => handleNavigation("/login")}>
              Login
            </button>
            <button className="header__signup-button" onClick={() => handleNavigation("/signup")}>
              Signup
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
