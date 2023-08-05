import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import DataContext from "../data/data-context";
import "./Home.css";

function Home() {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);

  const navigate = useNavigate();
  const dataCtx = useContext(DataContext);
  const DUMMY_DATA = dataCtx.data;

  const cities = DUMMY_DATA.flatMap((cityItem) =>
    cityItem.universities.map((universityItem) => universityItem.university)
  );

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setDropdownVisible(false);
  };

  const filterCities = (input) => {
    const filtered = cities.filter((city) =>
      city
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(input.toLowerCase().replace(/\s+/g, ""))
    );
    setFilteredCities(filtered);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const cityItem = DUMMY_DATA.find((item) =>
        item.universities.some(
          (university) => university.university === selectedCity
        )
      );
      if (cityItem === undefined) {
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 820);
        return;
      }
      const universityItem = cityItem.universities.find(
        (university) => university.university === selectedCity
      );
      navigate(`/city/${cityItem.id}/${universityItem.id}`, true);
    }
  };

  return (
    <div className="home-body">
      <div className="login-wrapper">
        <form action="" className={`form${shakeForm ? " shake" : ""}`}>
          <img
            className="home-logo"
            src={`${process.env.PUBLIC_URL}/../../images/Larger_Red_Cup_Favicon.png`}
            alt="Red Cup"
          />
          <h2>What's The Move?</h2>
          <div className="input-group">
            <input
              type="text"
              name="loginUser"
              id="loginUser"
              placeholder="Enter University"
              value={selectedCity}
              onChange={(event) => {
                setSelectedCity(event.target.value);
                filterCities(event.target.value);
              }}
              onKeyDown={handleKeyPress}
              onFocus={() => setDropdownVisible(true)}
              onBlur={() => setTimeout(() => setDropdownVisible(false), 150)}
            />
          </div>
          {dropdownVisible && filteredCities.length > 0 && (
            <ul className="dropdown-menu">
              {filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;
