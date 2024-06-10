// InstructorContext.js
import React, { createContext, useContext, useState } from 'react';

export const SectionContext = createContext();

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({ children }) => {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
  return (
    <SectionContext.Provider value={{ selectedSection, setSelectedSection, sections, setSections }}>
      {children}
    </SectionContext.Provider>
  );
};
