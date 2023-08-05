import { createContext } from "react";

const DataContext = createContext({
  user: null,
  setUser: () => {},
  userProfile: null,
  setUserProfile: () => {},
  handleLogout: () => {},
  isAuthChecked: null,
  dataFetched: null,
  setDataFetched: () => {},
  dataState: null,
  setDataState: () => {},
});

export default DataContext;
