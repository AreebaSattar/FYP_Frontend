import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useSectionContext } from 'src/layouts/dashboard/SectionContext';
import { useInstructorContext } from 'src/layouts/dashboard/InstructorContext';
import { useCourseContext } from 'src/layouts/dashboard/CourseContext';

const ResponseModule = () => {
  const [responseText, setResponseText] = useState('');
  const { selectedSection } = useSectionContext();
  const { selectedInstructor } = useInstructorContext();
  const { selectedCourses } = useCourseContext(); 
  const [shouldDisplayModule, setShouldDisplayModule] = useState(false);

  useEffect(() => {
    // Initially, Response Module should not display
    setShouldDisplayModule(false);
  }, []);
  useEffect(() => {
    // Initially, Response Module should not display
    setShouldDisplayModule(false);
  }, [selectedSection, selectedInstructor, selectedCourses]);

  useEffect(() => {
    // Call the API when a section, instructor, or course is selected
    if (selectedSection && selectedInstructor && selectedCourses) {
      checkResponseFromBackend();
    }
  }, [selectedSection, selectedInstructor, selectedCourses]);

  const handleInputChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/category_wise', {
        response: responseText,
      });
      // Clear the response text field after successful submission
      setResponseText('');
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  const checkResponseFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:8000/check_same_logged');
      const shouldDisplay = response.data.value;
      console.log("shouldDisplay:",shouldDisplay)
      if (shouldDisplay== true) {
        setShouldDisplayModule(true);
        setResponseText('');
        
      } else if (!shouldDisplay){
        setShouldDisplayModule(false);
      }
      else{
      console.log("here")
        setShouldDisplayModule(true);
          setResponseText(response.data.value);
    
      }
    } catch (error) {
      console.error('Error checking response from backend:', error);
    }
  };

  // Render ResponseModule only if shouldDisplayModule is true
  if (!shouldDisplayModule) {
    return null;
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.7rem' }}>Response</span>
      <TextField
        multiline
        rows={4}
        value={responseText}
        onChange={handleInputChange}
        fullWidth
        style={{ backgroundColor: 'white', width: '98%' }}
        InputLabelProps={{
          shrink: true,
          style: { fontWeight: 'bold', fontSize: '1.2rem', marginTop: '10px' }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={shouldDisplayModule && responseText !== ''}
        style={{
          position: 'absolute',
          top: 'calc(100% + 16px)',
          left: 'calc(100% - 110px)',
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ResponseModule;
