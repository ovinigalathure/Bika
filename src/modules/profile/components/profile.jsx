import React, { useState, useEffect } from 'react';
import './Profile.css';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    password: '',
    image: '',
  });
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({}); // State for storing validation errors

  useEffect(() => {
    const fetchProfileData = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
          if (userDoc.data().image) {
            setProfilePicture(userDoc.data().image);
          }
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching profile: ', error);
      }
    };

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      fetchProfileData(user.uid);
    } else {
      console.log('No user is logged in');
    }
  }, []);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsEditable(false);
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (!user) throw new Error("No user is logged in");

      const userDocRef = doc(db, 'users', user.uid);

      if (selectedImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);

        await uploadString(storageRef, selectedImage, 'data_url');
        const imageUrl = await getDownloadURL(storageRef);

        const updatedProfile = { ...profile, image: imageUrl };

        await setDoc(userDocRef, updatedProfile, { merge: true });
        console.log('Profile saved successfully with image!', updatedProfile);
      } else {
        await setDoc(userDocRef, profile, { merge: true });
        console.log('Profile saved successfully without image!', profile);
      }

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (error) {
      console.error('Error saving profile: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    const errors = {};
    if (!profile.name || profile.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!profile.mobile || !phoneRegex.test(profile.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profile.email || !emailRegex.test(profile.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!profile.address || profile.address.trim().length < 5) {
      errors.address = 'Address must be at least 5 characters long.';
    }
    if (!profile.city || profile.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters long.';
    }
    return errors;
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-left">
        <div className="user-profile-picture-container">
          <img
            className="user-profile-picture"
            src={profilePicture}
            alt="Profile"
          />
          <label htmlFor="profile-picture-input" className="user-profile-picture-icon">
            <i className="fas fa-camera"></i>
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            style={{ display: 'none' }}
          />
        </div>
        <h1 className="user-profile-name">{profile.name || 'Loading...'}</h1>
      </div>

      <div className="user-profile-right">
        <h2>Your Account</h2>

        <div className="user-profile-details">
          <div className="user-profile-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="user-profile-field">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
          </div>

          <div className="user-profile-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="user-profile-field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>

          <div className="user-profile-field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              readOnly={!isEditable}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
        </div>

        <div className="user-profile-buttons">
          {!isEditable ? (
            <button className="user-profile-edit-button" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="user-profile-save-button" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </div>

      {showPopup && <div className="popup-message">Profile updated successfully!</div>}
    </div>
  );
};

export default Profile;
