import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Friends.css";

function Friend(props) {
  const { sendRequest } = useHttpClient();

  async function handleAcceptFriendRequest() {
    const url =
      "https://whatsthemove-3y5d.onrender.com/api/users/acceptFriendRequest";
    const body = {
      userId: props.user.id,
      friendId: props.friend.id,
    };
    try {
      const response = await sendRequest(url, "POST", body, {
        "Content-Type": "application/json",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDenyFriendRequest() {
    const url =
      "https://whatsthemove-3y5d.onrender.com/api/users/denyFriendRequest";
    const body = {
      userId: props.user.id,
      friendId: props.friend.id,
    };
    try {
      const response = await sendRequest(url, "POST", body, {
        "Content-Type": "application/json",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleAddFriend() {
    const url =
      "https://whatsthemove-3y5d.onrender.com/api/users/sendFriendRequest";
    const body = {
      userId: props.user.id,
      friendId: props.friend.id,
    };
    try {
      const response = await sendRequest(url, "POST", body, {
        "Content-Type": "application/json",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li>
      <img src={props.friend.photoURL} alt="Profile Picture" />
      <div className="name-container">
        <span className="friend-name">{props.friend.name}</span>
        <span className="friend-username">{props.friend.username}</span>
      </div>
      {props.type === "friendRequest" && (
        <>
          <button className="accept-btn" onClick={handleAcceptFriendRequest}>
            Accept
          </button>
          <button class="accept-btn2" onClick={handleDenyFriendRequest}>
            Decline
          </button>
        </>
      )}
      {props.type === "other" && (
        <button className="add-btn" onClick={handleAddFriend}>
          Add +
        </button>
      )}
    </li>
  );
}

export default Friend;
