import { useContext } from "react";

import VenueItem from "./VenueItem";
import DataContext from "../data/data-context";

function VenueList(props) {
  /*const arrOfObj = Object.keys(props.venues).map((key) => {
    return {
      ...props.venues[key],
    };
  });*/
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;

  let orderedVenues = props.venues.filter(
    (item) => item.poster !== "../../images/Saltlakecity_Images/Events/"
  );

  let emailDomain = "com";

  if (user) {
    emailDomain = user.email.split(".").pop();
  }

  if (emailDomain) {
    if (emailDomain !== "edu") {
      orderedVenues = orderedVenues.filter(
        (venue) =>
          venue.id[0].toLowerCase() !== "f" && venue.id[0].toLowerCase() !== "s"
      );
    }
  }

  return orderedVenues.map((venue) => (
    <VenueItem
      key={venue.id}
      id={venue.id}
      cityId={props.cityId}
      universityId={props.universityId}
      host={venue.host}
      location={venue.location}
      googleLocation={venue.googleLocation}
      description={venue.description}
      logo={venue.logo}
      count={venue.count}
      poster={venue.poster}
    />
  ));
}

export default VenueList;
