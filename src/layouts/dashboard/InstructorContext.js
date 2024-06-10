// InstructorContext.js
import React, { createContext, useContext, useState } from 'react';

export const InstructorContext = createContext();

export const useInstructorContext = () => useContext(InstructorContext);

export const InstructorProvider = ({ children }) => {
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [instructors, setInstructors] = useState([]);

  return (
    <InstructorContext.Provider value={{ selectedInstructor, setSelectedInstructor, instructors, setInstructors }}>
      {children}
    </InstructorContext.Provider>
  );
};
