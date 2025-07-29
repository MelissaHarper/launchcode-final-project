import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:8080/api";

  const contextValue = {
    baseUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
