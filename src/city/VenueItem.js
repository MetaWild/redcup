import { useCallback, useState, useContext } from "react";
import { Link } from "react-router-dom";

import DataContext from "../data/data-context";
import "./City.css";

function VenueItem(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;

  function isAppleDevice() {
    const userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  }

  const handleVenueClick = useCallback(async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_backendUrl}/api/venues/${props.cityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            venueId: props.id,
            universityId: props.universityId,
          }),
        }
      );
    } catch (err) {
      console.log("Error");
    }
  }, [props.cityId, props.id, props.universityId]);

  const flipCard = useCallback(() => {
    setIsFlipped((prevFlipped) => !prevFlipped);
  }, []);

  const link = isAppleDevice() ? props.location : props.googleLocation;

  return (
    <div className="col">
      <div className="image-text-container">
        <img src={props.logo} alt="Logo" className="grid-image" />
        <span>{props.host}</span>
      </div>
      <div className="maincontainer" onClick={flipCard}>
        <div className={`thecard ${isFlipped ? "is-flipped" : ""}`}>
          <div className="thefront">
            <div
              className="square-image-container"
              style={{ backgroundImage: `url('${props.poster}')` }}
            ></div>
          </div>
          <div className="theback">
            <div className="app-logo-container">
              <Link to="https://www.uber.com" target="_blank">
                <img
                  src={`${process.env.PUBLIC_URL}/../../images/Uber.PNG`}
                  alt="Uber"
                  className="app-logo"
                />
              </Link>
              <Link to="https://www.lyft.com" target="_blank">
                <img
                  src={`${process.env.PUBLIC_URL}/../../images/Lyft.png`}
                  alt="Lyft"
                  className="app-logo"
                />
              </Link>
              <Link to={link} onClick={handleVenueClick} target="_blank">
                <img
                  src={`${process.env.PUBLIC_URL}/../../images/Google_Maps.PNG`}
                  alt="Google Maps"
                  className="app-logo"
                />
              </Link>
              <Link to="https://www.instagram.com" target="_blank">
                <img
                  src={`${process.env.PUBLIC_URL}/../../images/Instagram.png`}
                  alt="Instagram"
                  className="app-logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3 className="venue-h3"> People Interested: {props.count} </h3>
      <br />
      <h4 className="venue-h4">{props.description}</h4>
      <br />
    </div>
  );
}

export default VenueItem;
