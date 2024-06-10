

import React, { useState, useEffect ,useContext} from 'react';
import { TextField, MenuItem } from '@mui/material';
import CoursesDropdown from './CoursesDropdown';
import { useInstructorContext } from './InstructorContext';
import axios from 'axios';
import { useAuth } from 'src/hooks/use-auth'; // Import the useAuth hook

const InstructorDropdown = () => {
  const [instructors, setInstructors]  = useState('');
  const { selectedInstructor, setSelectedInstructor } = useInstructorContext();
  // const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_instructors');
        const data = await response.json();
        setInstructors(data.teachers_name);
        // setSelectedInstructor(auth.user.name);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchData();
  }, []);

  // const handleInstructorChange = (event) => {
  //   const newSelectedInstructor = event.target.value;
  //   setSelectedInstructor(newSelectedInstructor);
  // };
  useEffect(() => {
    // Set the selected instructor as the default value
    setSelectedInstructor(selectedInstructor);
  }, [selectedInstructor, setSelectedInstructor]);
  // console.log("selectedInstructor: ",selectedInstructor)

    const handleInstructorChange = async (event) => {
    const newSelectedInstructor = event.target.value;
    setSelectedInstructor(newSelectedInstructor);
    try {
      // Send the selected instructor to the server
      const response = await axios.post('http://localhost:8000/setinstructor', {
        newSelectedInstructor
      });

    } catch (error) {
      console.error('Error fetching instructor:', error);
    }

    // try {
    //   // Send the selected instructor to the server
    //   const response = await axios.post('http://localhost:8000/getcourses', {
    //     selectedInstructor: newSelectedInstructor,
    //   });

    // } catch (error) {
    //   console.error('Error fetching courses:', error);
    // }
  };
  // Log the selectedInstructor variable to check its value
// console.log("Selected Instructor:", selectedInstructor);


  return (
    <div>
      <TextField
        select
        label="Instructor"
        value={selectedInstructor}
        onChange={handleInstructorChange}
        sx={{ minWidth: 200 }}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          style: {
            color: 'white',
          },
        }}
        InputLabelProps={{ style: { fontSize: '16px', textAlign: 'center' } }}
      >
        {Array.isArray(instructors) && instructors.map((instructor, index) => (
          <MenuItem key={index} value={instructor}>
            {instructor}
          </MenuItem>
        ))}
      </TextField>
      {/* <div>
        <CoursesDropdown selectedInstructor={selectedInstructor} />
        
      </div> */}
    </div>
  );
};

export default InstructorDropdown;
