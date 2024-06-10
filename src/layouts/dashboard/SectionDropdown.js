import React, { useContext, useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { InstructorContext } from './InstructorContext';
import { CourseContext } from './CourseContext';
import { useSectionContext } from './SectionContext'; // Import useSectionContext hook

import { ToContext } from './ToContext';
import { FromContext } from './FromContext';
const SectionDropdown = () => {
  const { selectedInstructor } = useContext(InstructorContext);
  const { selectedCourses } = useContext(CourseContext);
  const { selectedFrom } = useContext(FromContext);
  const { selectedTo } = useContext(ToContext);
  // const [sections, setSections] = useState([]);
  // const [selectedSection, setSelectedSection] = useState('');
  const { sections, setSections, selectedSection, setSelectedSection } = useSectionContext(); // Use useSectionContext hook


  useEffect(() => {
    setSelectedSection('')
    if (selectedInstructor && selectedCourses) {
      fetchData();
    }
  }, [selectedInstructor,selectedCourses]);

  useEffect(() => {
    setSelectedSection('')
    if (selectedFrom && selectedTo) {
      fetchData();
    }
  }, [selectedFrom, selectedTo,selectedInstructor,selectedCourses]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/get_instructor_coursen', {
        selectedInstructor,
        selectedFrom,
        selectedTo,
        selectedCourses
      });
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // useEffect(() => {
  //   setSelectedSection('');
  //   const fetchData = async () => {
  //     if (selectedInstructor &&  selectedCourses) {
  //       try {
  //         const response = await axios.post('http://localhost:8000/get_instructor_coursen', {
  //           selectedInstructor,
  //           selectedCourses
  //         });
  //         // console.log('Response from server:', response.data); // Log the response data here
  //         setSections(response.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     }
  //     else{
  //       setSections([]);
  //     }
  //   };
  //   if (selectedInstructor && selectedCourses) {
  //     fetchData();
  //   }

  //   // fetchData(); // Call fetchData inside the useEffect body

  // }, [selectedInstructor, selectedCourses, setSelectedSection, setSections]);

  const handleSectionChange = async (selectedSection) => {
    try {
      const apiResponse = await axios.post('http://localhost:8000/setSection', {
        selectedSection,
      });
      // console.log(selectedSection)
      // Handle the response as needed
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleSectionSelection = (event) => {
    const selectedSection = event.target.value;
    setSelectedSection(selectedSection);
    handleSectionChange(selectedSection); // Call the function to handle section change
    // console.log("selectedsection",selectedSection)
  };

  // console.log("sections:", sections); // Log the sections state here

  return (
    <div>
      <TextField
        select
        label="Section"
        value={selectedSection}  
        onChange={handleSectionSelection}
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
        {Array.isArray(sections.sectionn) &&
          sections.sectionn.map((section, index) => (
            <MenuItem key={index} value={section}>
              {section}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
};

export default SectionDropdown;
