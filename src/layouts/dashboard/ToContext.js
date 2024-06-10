// ToContext.js
import React, { createContext, useContext, useState } from 'react';

export const ToContext = createContext();

export const useToContext = () => useContext(ToContext);

export const ToProvider = ({ children }) => {
  const [selectedTo, setSelectedTo] = useState('');
  const [Tos, setTo] = useState([]); // Define To state

  return (
    <ToContext.Provider value={{ selectedTo, setSelectedTo, Tos, setTo }}>
      {children}
    </ToContext.Provider>
  );
};
