// CommonParent.js
import React, { useState } from 'react';
import CoursesDropdown from './CoursesDropdown';
import AnotherComponent from './InstructorsDropdown';

const CommonParent = () => {
  const [selectedCourses, setSelectedCourses] = useState('');

  const handleCoursesChange = (value) => {
    setSelectedCourses(value);
  };

  return (
    <div>
      <CoursesDropdown
        selectedCourses={selectedCourses}
        onCoursesChange={handleCoursesChange}
      />
      <AnotherComponent selectedCourses={selectedCourses} />
    </div>
  );
};

export default CommonParent;
