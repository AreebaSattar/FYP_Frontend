// CourseContext.js
import React, { createContext, useContext, useState } from 'react';

export const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [selectedCourses, setSelectedCourses] = useState('');
  const [departments, setDepartments] = useState([]);

  return (
    <CourseContext.Provider value={{ selectedCourses, setSelectedCourses, departments, setDepartments }}>
      {children}
    </CourseContext.Provider>
  );
};
