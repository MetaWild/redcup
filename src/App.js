import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Home from "./home/Home";
import City from "./city/City";
import LoginPage from "./login/LoginPage";
import CollegeStudent from "./login/CollegeStudent";
import ProfileSetup from "./login/ProfileSetup";
import DataContext from "./data/data-context";

function App() {
  const dataCtx = useContext(DataContext);
  const isAuthChecked = dataCtx.isAuthChecked;
  const dataFetched = dataCtx.dataFetched;

  if (!isAuthChecked) {
    return <div></div>;
  } else if (isAuthChecked && dataFetched) {
    return (
      <Routes>
        <Route path="/privacy" element={<PrivacyPolicy />} exact />
        <Route path="/contact" element={<Contact />} exact />
        {dataCtx.user ? (
          <>
            <Route path="/home" element={<Home />} exact />
            <Route
              path="/city/:cityId/:universityId"
              element={<City />}
              exact
            />
            <Route
              path="/friends/:cityId/:universityId"
              element={<Friends />}
              exact
            />
            {/*subscription && (
        <Route
          path="/event/:cityId/:universityId"
          element={<AddEvent />}
          exact
        />
      )*/}
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} exact />
            <Route path="/profile/setup" element={<ProfileSetup />} exact />
            <Route
              path="/student/verification"
              element={<CollegeStudent />}
              exact
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    );
  } else {
    return <div></div>;
  }
}

export default App;
