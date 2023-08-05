import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import MobileMenu from "./MobileMenu";
import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import "./MainHeader.css";

const MainHeader = (props) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isConactModalOpen, setIsContactModalOpen] = useState(false);
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;
  const userProfile = dataCtx.userProfile;
  const handleLogout = dataCtx.handleLogout;
  const handleMenuOpen = () => {
    setIsMobileMenuActive(true);
  };

  const handleMenuClose = () => {
    setIsMobileMenuActive(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      {isConactModalOpen && (
        <Modal
          onClose={closeContactModal}
          title="Contact Us"
          content="Email: contact@whatsthemove.us"
        />
      )}
      <header className="main-header">
        <Link className="college-logo" to="/home">
          <img
            src={`${process.env.PUBLIC_URL}/${props.src}`}
            alt="logo"
            className="logoImage"
          />
          <h3>What's The Move?</h3>
        </Link>
        <nav>
          <ul className="nav__links">
            <li>
              <Link to={`/city/${props.cityId}/${props.universityId}`}>
                Home
              </Link>
            </li>
            <li onClick={openContactModal}>Contact</li>
            <li>
              <Link to={`/friends/${props.cityId}/${props.universityId}`}>
                Friends
              </Link>
            </li>
            {/*userProfile?.subscription && (
              <li>
                <Link to={`/event/${props.cityId}/${props.universityId}`}>
                  Add Event
                </Link>
              </li>
            )*/}
          </ul>
        </nav>
        {user ? (
          <>
            <img
              src={userProfile.photoURL || user.photoURL}
              className="profile-picture"
              onClick={toggleDropdown}
              alt="profile"
            />
            {dropdownVisible && (
              <div className="header-dropdown-menu">
                <ul>
                  <li
                    onClick={() => {
                      handleLogout();
                      toggleDropdown();
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link className={props.cityId} to={`/`}>
            Sign In
          </Link>
        )}
        <button
          className="menu main-navigation__menu-btn"
          onClick={handleMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <MobileMenu
        isActive={isMobileMenuActive}
        onClose={handleMenuClose}
        cityId={props.cityId}
        universityId={props.universityId}
      />
    </>
  );
};

export default MainHeader;
