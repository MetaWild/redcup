import React, { useState } from "react";
import "./LoginPage.css";

const ProfileSetup = () => {
  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event.target.result);
      setShowPlaceholder(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="main-container">
      <div className="account-container">
        <div className="content">
          <div className="image-upload">
            <label htmlFor="imageUpload">
              <img
                id="userImage"
                src={imageSrc}
                alt="Upload Image"
                className="center-image"
              />
              {showPlaceholder && (
                <span className="placeholder-text">Upload Image</span>
              )}
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <h2 className="display-name">{displayName}</h2>
          <p className="small-name">{userName}</p>

          <form>
            <div className="input-field">
              <input
                type="text"
                id="displayName"
                name="display name"
                placeholder="Enter displayname"
                required
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="input-field">
              <input
                type="text"
                id="userName"
                name="username"
                placeholder="Enter username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <label className="question">Are you a college student?</label>
            <div className="radio-options">
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                name="student"
                id="yes"
                value="yes"
                required
              />
              <label htmlFor="no">No</label>
              <input type="radio" name="student" id="no" value="no" required />
            </div>

            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
