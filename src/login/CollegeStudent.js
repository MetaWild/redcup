import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import DataContext from "../data/data-context";
import "./LoginPage.css";

const CollegeStudent = () => {
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;
  const userProfile = dataCtx.userProfile;
  const handleLogout = dataCtx.handleLogout;
  const navigate = useNavigate();

  const handleMicrosoftSignup = async () => {
    const provider = new OAuthProvider("microsoft.com");
    provider.addScope("User.Read");
    const result = await signInWithPopup(auth, provider);
    navigate("/home");
    //setOAuthAccessToken(result._tokenResponse.oauthAccessToken);
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <img
          className="login-logo"
          src={`${process.env.PUBLIC_URL}/../../images/Login/Red_Cup_Logo.png`}
          alt="Logo"
        ></img>
        <h2 className="welcome-text">Student Email Only!</h2>
        <div className="oauth-container">
          <button className="btn-content" onClick={handleMicrosoftSignup}>
            <img
              width="20px"
              alt="Microsoft sign-in"
              src={`${process.env.PUBLIC_URL}/../../images/Login/MicrosoftLogin.png`}
            />
            Connect Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeStudent;

/* <div className="oauth-container">
          <button className="btn-content" onClick={handleMicrosoftSignup}>
            <img
              width="20px"
              alt="Microsoft sign-in"
              src={`${process.env.PUBLIC_URL}/../../images/Login/MicrosoftLogin.png`}
            />
            Continue with Microsoft
          </button>
        </div>*/
