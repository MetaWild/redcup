import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import "./MobileMenu.css";

const MobileMenu = ({ isActive, onClose, cityId, universityId }) => {
  const [isConactModalOpen, setIsContactModalOpen] = useState(false);
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;
  const userProfile = dataCtx.userProfile;
  const handleLogout = dataCtx.handleLogout;

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
      <div
        id="mobile__menu"
        className={`overlay${isActive ? " overlay--active" : ""}`}
      >
        <Link className="close" onClick={onClose}>
          &times;
        </Link>
        <div className="overlay__content">
          <Link to={`/city/${cityId}/${universityId}`} onClick={onClose}>
            Home
          </Link>
          <Link
            onClick={() => {
              onClose();
              openContactModal();
            }}
          >
            Contact
          </Link>
          <Link to={`/friends/${cityId}/${universityId}`} onClick={onClose}>
            Friends
          </Link>
          {/*userProfile?.subscription && (
            <Link to={`/event/${cityId}/${universityId}`} onClick={onClose}>
              Add Event
            </Link>
          )*/}
          {user ? (
            <Link
              onClick={() => {
                onClose();
                handleLogout();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to={`/`} onClick={onClose}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
