import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
// import SemDropdown from './SemDropdown';
      // <SemDropdown selectedInstructor={selectedCourses} />
const SemDropdown = ({ selectedCourses }) => {
  const [selectedSem, setSelectedSem] = useState('');
  const [departments, setDepartments] = useState([]);

  const handleCoursesChange = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getcourses');
      const everything = response.data;
      setDepartments(everything.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorResponse = await axios.post('http://localhost:8000/getsemester', {
          selectedCourses,
        });

        const response = await axios.get('http://localhost:8000/getsemester');
        const everything = response.data;
        setDepartments(everything.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCourses]);

  return (
    <div>
    <TextField
      select
      label="Course"
      value={selectedSem}  // Make sure this value is one of the course_code values
      onChange={(event) => setSelectedSem(event.target.value)}
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
    
    </div>
  );
};

export default SemDropdown;
