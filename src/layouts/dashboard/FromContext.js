// FromContext.js
import React, { createContext, useContext, useState } from 'react';

export const FromContext = createContext();

export const useFromContext = () => useContext(FromContext);

export const FromProvider = ({ children }) => {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [From, setFrom] = useState([]);

  return (
    <FromContext.Provider value={{ selectedFrom, setSelectedFrom, From, setFrom }}>
      {children}
    </FromContext.Provider>
  );
};
