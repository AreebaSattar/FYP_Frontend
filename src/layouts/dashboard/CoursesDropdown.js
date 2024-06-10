
import React, { useState, useEffect, useContext } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useCourseContext } from './CourseContext';
import { InstructorContext } from './InstructorContext';
import { ToContext } from './ToContext';
import { FromContext } from './FromContext';


const CoursesDropdown = () => {
  const { selectedCourses, setSelectedCourses, departments,setDepartments } = useCourseContext();
  const { selectedInstructor } = useContext(InstructorContext);
  const { selectedFrom } = useContext(FromContext);
  const { selectedTo } = useContext(ToContext);
  // useEffect(() => {
  //   // Set selected course to empty when the component mounts or a new instructor is selected
  //   setSelectedCourses('');
  // }, [selectedInstructor]);
  useEffect(() => {
    setSelectedCourses('')
    if (selectedInstructor ) {
      fetchData();
    }
  }, [selectedInstructor]);

  useEffect(() => {
    setSelectedCourses('')
    if (selectedFrom && selectedTo &&selectedInstructor) {
      fetchData();
    }
  }, [selectedFrom, selectedTo,selectedInstructor]);

  const fetchData = async () => {
    try {
      const instructorResponse = await axios.post('http://localhost:8000/getcourses', {
        selectedInstructor,
        selectedFrom,
        selectedTo
      });
      setDepartments(instructorResponse.data.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setSelectedCourses('');
        // Call handleCourseSelection to trigger setcourse API
        handleCourseSelection({ target: { value: '' } }); // Passing an empty event to reset the selection
    // try {
    //   // Send the selected instructor to the server
    //   const response = await axios.post('http://localhost:8000/getcourses', {
    //     selectedInstructor: newSelectedInstructor,
    //   });

    // } catch (error) {
    //   console.error('Error fetching courses:', error);
    // }
  };
  const handleCourseSelection = async(event) => {
    const selectedCourse = event.target.value;
    setSelectedCourses(selectedCourse);
    // handleCoursesChange(selectedCourse); // Call the function to handle course change
    try {
      // Send the selected course to the server
      await axios.post('http://localhost:8000/setcourse', {
        selectedCourse,
      });
    } catch (error) {
      console.error('Error setting course:', error);
    }
  };

  return (
    <div>
      <TextField
        select
        label="Course"
        value={selectedCourses}
        onChange={handleCourseSelection}
        sx={{ minWidth: 200, fontSize: '50px' }}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: {
            color: 'white',
          },
        }}
        InputLabelProps={{ style: { fontSize: '16px', textAlign: 'center' } }}
      >
        {Array.isArray(departments) &&
          departments.map((dep, index) => (
            <MenuItem key={index} value={dep.course_code}>
              {dep.course_code}
            </MenuItem>
          ))}
      </TextField>
      <div></div>
    </div>
  );
};

export default CoursesDropdown;
