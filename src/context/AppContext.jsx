import { createContext, useContext, useState } from 'react';

export const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const contextValue = {
    open,
    setOpen,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
