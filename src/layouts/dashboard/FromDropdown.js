import React, { useEffect ,useContext} from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useFromContext } from './FromContext';
import { InstructorContext } from './InstructorContext';
// import { SectionContext } from './SectionContext';
// import { CourseContext } from './CourseContext';

const FromDropdown = () => {
  const { selectedInstructor } = useContext(InstructorContext);
  const { From, setFrom, selectedFrom, setSelectedFrom } = useFromContext();
  // const { selectedSection } = useContext(SectionContext);
  // const { selectedCourses } = useContext(CourseContext);

  useEffect(() => {
    setSelectedFrom('')
    const fetchData = async () => {
      if (selectedInstructor ) {
        try {
          const response = await axios.post('http://localhost:8000/setFromDropdown', {
            selectedInstructor,
            // selectedSection,
            // selectedCourses
          });
          // console.log('Response from server:', response.data);
          setFrom(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedInstructor, setFrom,setSelectedFrom]);

  // const handleFromChange = async (selectedFrom) => {
  //   try {
  //     console.log(selectedFrom);
  //     // console.log('selectedFrom');
  //     // Handle the response as needed
  //   } catch (error) {
  //     console.error('Error calling API:', error);
  //   }
  // };

  const handleFromSelection = (event) => {
    const selectedFrom = event.target.value;
    setSelectedFrom(selectedFrom);
    // handleFromChange(selectedFrom);
    // console.log("selectedFrom", selectedFrom);
  };

  return (
    <TextField
      select
      label="From"
      value={selectedFrom}
      onChange={handleFromSelection}
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
      {Array.isArray(From.semesterYear) &&
        From.semesterYear.map((year, index) => (
          <MenuItem key={index} value={year}>
            {year}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default FromDropdown;
