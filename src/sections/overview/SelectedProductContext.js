// Step 1: Create a context
import React, { createContext, useContext, useState } from 'react';

const SelectedProductContext = createContext();

// Step 2: Create a provider component
export const SelectedProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleButtonClick = (product) => {
    setSelectedProduct(product.name);
  };

  return (
    <SelectedProductContext.Provider value={{ selectedProduct, handleButtonClick }}>
      {children}
    </SelectedProductContext.Provider>
  );
};

// Step 3: Create a custom hook to consume the context value
export const useSelectedProduct = () => useContext(SelectedProductContext);
