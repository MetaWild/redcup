import { useContext } from "react";
import { useParams } from "react-router-dom";

import VenueList from "./VenueList";
import DataContext from "../data/data-context";
import MainHeader from "../navigation/MainHeader";
import MobileMenu from "../navigation/MobileMenu";
import "./City.css";

function City() {
  const cityId = useParams().cityId;
  const universityId = useParams().universityId;
  const dataCtx = useContext(DataContext);
  const DUMMY_DATA = dataCtx.data;

  /*useEffect(() => {
    const fetchData = async () => {
      await dataCtx.setVenueCount(DUMMY_DATA);
      setDataFetched(true); // Set dataFetched to true after the data is fetched
    };
    console.log("loading");
    fetchData();
  }, []);*/

  const cityItem = DUMMY_DATA.find((item) => item.id === cityId);
  const universityItem = cityItem.universities.find(
    (university) => university.id === universityId
  );
  const fraternities = (universityItem?.fraternities ?? [])
    .sort((a, b) => {
      const aIdNum = parseInt(a.id.slice(1));
      const bIdNum = parseInt(b.id.slice(1));

      return aIdNum - bIdNum;
    })
    .sort((a, b) => b.count - a.count);

  const schoolOrganizations = (universityItem?.schoolOrganizations ?? [])
    .sort((a, b) => {
      const aIdNum = parseInt(a.id.slice(1));
      const bIdNum = parseInt(b.id.slice(1));

      return aIdNum - bIdNum;
    })
    .sort((a, b) => b.count - a.count);

  const bars = (cityItem?.bars ?? [])
    .sort((a, b) => {
      const aIdNum = parseInt(a.id.slice(1));
      const bIdNum = parseInt(b.id.slice(1));

      return aIdNum - bIdNum;
    })
    .sort((a, b) => b.count - a.count);

  const organizations = (cityItem?.organizations ?? [])
    .sort((a, b) => {
      const aIdNum = parseInt(a.id.slice(1));
      const bIdNum = parseInt(b.id.slice(1));

      return aIdNum - bIdNum;
    })
    .sort((a, b) => b.count - a.count);

  const combinedVenues = [
    ...fraternities,
    ...schoolOrganizations,
    ...bars,
    ...organizations,
  ];

  return (
    <>
      <MainHeader
        src={universityItem.logo}
        cityId={cityId}
        universityId={universityId}
      />
      <MobileMenu />
      <div className="grid">
        <VenueList
          venues={combinedVenues}
          cityId={cityId}
          universityId={universityId}
        />
      </div>
    </>
  );
}

export default City;
