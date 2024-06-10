import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Box, CardHeader } from '@mui/material';
import axios from 'axios';
import { useInstructorContext } from 'src/layouts/dashboard/InstructorContext';
import { useCourseContext } from 'src/layouts/dashboard/CourseContext';
import { useSectionContext } from 'src/layouts/dashboard/SectionContext';
import { useFromContext } from 'src/layouts/dashboard/FromContext.js';
import { useToContext } from 'src/layouts/dashboard/ToContext.js';
const fetchData = async (apiEndpoint, requestData) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const OverviewLatestOrders = ({ sx, selectedCategoryText }) => {
  const { selectedInstructor } = useInstructorContext();
  const { selectedCourses, setSelectedCourses } = useCourseContext(); // assuming you have setSelectedCourses function in your context
  const { selectedSection, setSelectedSection } = useSectionContext(); // assuming you have setSelectedSection function in your context
  const { selectedFrom, setSelectedFrom } = useFromContext(); // assuming you have setSelectedFrom function in your context
  const { selectedTo, setSelectedTo } = useToContext(); // assuming you have setSelectedTo function in your context


  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/getcomments');
  //       const data = await response.json();
  //       setComments(data.comments_data);
  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };

  //   if (selectedInstructor && selectedCourses && selectedSection) {
  //     fetchComments();
  //   }
  //   handleCatSelection({ target: { value: selectedCategoryText } });

  // }, [selectedInstructor,selectedCourses,selectedSection,selectedCategoryText]); // Fetch comments only when selectedInstructor changes
  useEffect(() => {
    // Reset instructor-related state when selectedInstructor changes
    setSelectedCourses('');
    setSelectedSection('');
    setSelectedFrom('');
    setSelectedTo('');
    handleCatSelection({ target: { value: '' } });
  }, [selectedInstructor]);
  useEffect(() => {
    // When selectedInstructor changes, set products to an empty array
    
    handleCatChange('');
    handleCatSelection({ target: { value: '' } });
    
  }, [selectedInstructor]);
  useEffect(() => {
    // Reset instructor-related state when selectedInstructor changes
    // setSelectedCourses('');
     setSelectedSection('');
    // setSelectedFrom('');
    // setSelectedTo('');
  }, [selectedCourses]);
  useEffect(() => {
    // Reset instructor-related state when selectedInstructor changes
    setSelectedCourses('');
    setSelectedSection('');
    // // setSelectedFrom('');
     setSelectedTo('');
  }, [selectedFrom]);
  useEffect(() => {
    // Reset instructor-related state when selectedInstructor changes
    setSelectedCourses('');
    setSelectedSection('');
    // setSelectedFrom('');
    //  setSelectedTo('');
  }, [selectedTo]);
  useEffect(() => {
    fetchData('http://localhost:8000/getcomments').then((value) => setComments(value.comments_data));   
  }, []);

  useEffect(() => {
    
    const fetchDataForInstructor = async () => {
      if (selectedInstructor) {
       
        // handleCatSelection({ target: { value: '' } });
        const data = await fetchData('http://localhost:8000/getcomments', { selectedInstructor });
        setComments(data.comments_data);
        // handleCatSelection({ target: { value: '' } });        
      } 
    };
  
    const fetchDataForCourses = async () => {
      if (selectedInstructor && selectedCourses) {
        const data = await fetchData('http://localhost:8000/getcomments', { selectedInstructor, selectedCourses });
        setComments(data.comments_data);
       
      } 
    };
    const fetchDataForCoursesFromTo = async () => {
      if (selectedInstructor && selectedCourses && selectedFrom && selectedTo) {
        const data = await fetchData('http://localhost:8000/getcomments', { selectedInstructor, selectedCourses ,selectedFrom, selectedTo});
        setComments(data.comments_data);
       
      } 
    };
  
    const fetchDataForFromTo = async () => {
      if (selectedInstructor && selectedFrom && selectedTo) {
        const data = await fetchData('http://localhost:8000/getcomments', { selectedInstructor, selectedFrom, selectedTo });
        setComments(data.comments_data);
        
      } 
    };
    const fetchDataForFromToCourseSection = async () => {
      if (selectedInstructor && selectedCourses && selectedFrom && selectedTo && selectedSection) {
        const data = await fetchData('http://localhost:8000/getcomments', { selectedInstructor, selectedFrom, selectedTo ,selectedCourses,selectedSection});
        setComments(data.comments_data);
        
      } 
    };
    if (selectedInstructor && selectedCourses && selectedFrom && selectedTo && selectedSection) {
      fetchDataForFromToCourseSection();
    }
    else if (selectedInstructor && selectedCourses && selectedFrom && selectedTo) {
      fetchDataForCoursesFromTo();
    }
    else if (selectedInstructor  && selectedFrom && selectedTo) {
      fetchDataForFromTo();
    }  else if (selectedInstructor && selectedCourses) {
      fetchDataForCourses();
    } else if (selectedInstructor) {
      fetchDataForInstructor();
    }
    handleCatSelection({ target: { value: selectedCategoryText } });
  }, [selectedInstructor, selectedCourses, selectedFrom, selectedTo,selectedSection,selectedCategoryText]);

  const handleCatChange = async (selectedCategory) => {
    try {
      const apiResponse = await axios.post('http://localhost:8000/setCategory', {
        selectedCategory,
      });
      // Handle the response as needed
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleCatSelection = (event) => {
    const selectedCategory = event.target.value;
    handleCatChange(selectedCategory);
  };

  return (
    <Card sx={sx}>
      <CardHeader
title={selectedCategoryText ? selectedCategoryText : 'Comments'}
        titleTypographyProps={{
          component: 'div',
          sx: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: 0,
          },
        }}
      />

      <Box sx={{ width: '100%', height: '100%' }}>
        {/* Display comments */}
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id}>{comment}</li>
          ))}
        </ul>
      </Box>
    </Card>
  );
};

OverviewLatestOrders.propTypes = {
  sx: PropTypes.object,
  selectedCategoryText: PropTypes.string,
};

export default OverviewLatestOrders;
