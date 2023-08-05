import React, { useState, useRef, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import MainHeader from "../navigation/MainHeader";
import MobileMenu from "../navigation/MobileMenu";
import LoadingModal from "../loading/LoadingModal";
import DataContext from "../data/data-context";
import Friend from "./Friend";
import "./Friends.css";

const Friends = () => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const cityId = useParams().cityId;
  const universityId = useParams().universityId;
  const dataCtx = useContext(DataContext);
  const DUMMY_DATA = dataCtx.data;
  const userProfile = dataCtx.userProfile;
  const userFriends = userProfile?.friends || [];
  const userFriendRequests = userProfile?.friendRequests || [];
  const userList = dataCtx.userList;
  const userDataFetched = dataCtx.userDataFetched;

  const cityItem = DUMMY_DATA.find((item) => item.id === cityId);
  const universityItem = cityItem.universities.find(
    (university) => university.id === universityId
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setDropdownVisible(e.target.value.trim() !== "");
  };

  const handleInputFocus = () => {
    if (inputValue.trim() !== "") {
      setDropdownVisible(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setDropdownVisible(false);
    }, 100);
  };

  const handleClearIconClick = () => {
    setInputValue("");
    inputRef.current.focus();
    setDropdownVisible(false);
  };

  const sortedUserList = useMemo(() => {
    const sortList = [...userList];
    sortList.sort((a, b) => {
      if (
        userFriendRequests.includes(a.id) &&
        !userFriendRequests.includes(b.id)
      ) {
        return -1;
      }
      if (
        !userFriendRequests.includes(a.id) &&
        userFriendRequests.includes(b.id)
      ) {
        return 1;
      }
      return 0;
    });
    return sortList;
  }, [userList, userFriendRequests]);

  const filteredUserList = useMemo(() => {
    if (inputValue.trim() === "") {
      return sortedUserList;
    }
    return sortedUserList.filter((user) =>
      user.username.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [sortedUserList, inputValue]);

  return (
    <>
      {userDataFetched ? (
        <>
          <MainHeader
            src={universityItem.logo}
            cityId={cityId}
            universityId={universityId}
          />
          <MobileMenu />
          <div className="friend-body">
            <h2 className="friend-h2">Add Friends</h2>
            <div className="friend-search-container">
              <form action="#">
                <div className="friend-input-container">
                  <input
                    type="text"
                    className="friend-input"
                    placeholder="Find Friends"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    ref={inputRef}
                  />
                  <span className="friend-icon"></span>
                  {inputValue.trim() !== "" && (
                    <span
                      className="clear-icon"
                      onClick={handleClearIconClick}
                    ></span>
                  )}
                </div>
              </form>
              <div className="friend-dropdown-menu">
                <ul>
                  {dropdownVisible &&
                    inputValue.length >= 1 &&
                    filteredUserList.map((user) => {
                      const isFriendRequest = userFriendRequests.includes(
                        user.id
                      );
                      const isFriend = userFriends.includes(user.id);
                      return (
                        <Friend
                          key={user.id}
                          friend={user}
                          user={userProfile}
                          type={
                            isFriendRequest
                              ? "friendRequest"
                              : isFriend
                              ? "friend"
                              : "other"
                          }
                        />
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingModal
          onClose={() => {
            setLoading(false);
          }}
        />
      )}
    </>
  );
};

export default Friends;
