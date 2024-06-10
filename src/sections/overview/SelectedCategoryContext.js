// SelectedCategoryContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedCategoryContext = createContext();

export const useSelectedCategory = () => useContext(SelectedCategoryContext);

export const SelectedCategoryProvider = ({ children }) => {
  const [selectedCategoryText, setSelectedCategoryText] = useState(null);

  return (
    <SelectedCategoryContext.Provider value={{ selectedCategoryText, setSelectedCategoryText }}>
      {children}
    </SelectedCategoryContext.Provider>
  );
};
