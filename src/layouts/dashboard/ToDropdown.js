import React, { useEffect, useContext } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios'; // Import axios
import { InstructorContext } from './InstructorContext';
// import { SectionContext } from './SectionContext';
// import { CourseContext } from './CourseContext';
import { useToContext } from './ToContext';
import { FromContext } from './FromContext'; // Make sure this is correctly imported

const ToDropdown = () => {
  const { selectedInstructor } = useContext(InstructorContext);
  const { Tos, setTo, selectedTo, setSelectedTo } = useToContext();
  const { selectedFrom } = useContext(FromContext); // Make sure FromContext is imported and exported correctly
  // const { selectedSection } = useContext(SectionContext);
  // const { selectedCourses } = useContext(CourseContext);

  useEffect(() => {
    setSelectedTo('');
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/setToDropdown', {
          selectedInstructor,
          // selectedSection,
          // selectedCourses,
          selectedFrom
        });
        // console.log('Response from server:', response.data);
        setTo(response.data); // Assuming response.data is what you want to set
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data if all necessary values are available
    if (selectedInstructor && selectedFrom) {
      fetchData();
    }
  }, [selectedInstructor,selectedFrom, setTo, setSelectedTo]);

  // const handleToChange = async (selectedTo) => {
  //   try {
  //     console.log(selectedTo);
  //     // console.log('selectedTo');
  //     // Handle the response as needed
  //   } catch (error) {
  //     console.error('Error calling API:', error);
  //   }
  // };

  const handleToSelection = (event) => {
    const selectedTo = event.target.value;
    setSelectedTo(selectedTo);
    // handleToChange(selectedTo);
    // console.log("selectedTo", selectedTo);
  };

  return (
    <TextField
      select
      label="To"
      value={selectedTo}
      onChange={handleToSelection}
      sx={{ minWidth: 200 }}
      variant="standard"
      InputProps={{
        disableUnderline: true,
        style: {
          color: 'white', // Change the color of the selected value
        },
      }}
      InputLabelProps={{ style: { fontSize: '16px', textAlign: 'center' } }} // Adjust the fontSize as needed
    >
      {Array.isArray(Tos.semesterYear) &&
        Tos.semesterYear.map((year, index) => (
          <MenuItem key={index} value={year}>
            {year}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default ToDropdown;
