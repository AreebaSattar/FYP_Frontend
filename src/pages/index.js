import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import OverviewLatestOrders from 'src/sections/overview/overview-latest-orders';
import OverviewLatestProducts from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewCourses } from 'src/sections/overview/overview_courses';
import {HistoryGraph } from 'src/sections/overview/linegraph_history';
import ResponseModule from 'src/sections/overview/Response_Module';
import { useInstructorContext } from 'src/layouts/dashboard/InstructorContext';
import { useCourseContext } from 'src/layouts/dashboard/CourseContext';
import { useSectionContext } from 'src/layouts/dashboard/SectionContext';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import React, { useState, useEffect } from 'react';
import { useFromContext } from 'src/layouts/dashboard/FromContext.js';
import { useToContext } from 'src/layouts/dashboard/ToContext.js';

// const fetchData = async (apiEndpoint) => {
//   try {
//     const response = await fetch(apiEndpoint);
//     const data = await response.json();
//     return data.value; // Assuming the value is nested under "value" property
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };
// const fetchDataa = async (url) => {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     // You may want to handle errors or return a default value in case of an error
//     return null;
//   }
// };


// const Index = (props) => {
//   const { products = [], sx, onSelectCategory } = props;
//   const { selectedInstructor } = useInstructorContext();
//   const { selectedCourses } = useCourseContext();
//   const{selectedSection}= useSectionContext();
//   const [totalCustomersData, setTotalCustomersData] = useState(null);
//   const [tasksProgressData, setTasksProgressData] = useState(null);
//   const [budgetData, setBudgetData] = useState(null);
//   const [totalProfitData, setTotalProfitData] = useState(null);
//   const [selectedCategoryText, setSelectedCategoryText] = useState(null);
//   const [chartData, setChartData] = useState({ positive: [], negative: [] });
//   const [chartData1, setChartData1] = useState({ positive: [], negative: [],course_name:[] });
//   const [chartData2, setChartData2] = useState({ positive: [], negative: [],semester_year:[] });
//   const handleResponseSubmit = (responseText) => {
//     // Handle the submission of the response here, e.g., send it to the server
//   };

//   useEffect(() => {
//     // Fetch data only when instructorSelected, courseSelected, or sectionSelected changes
//     if (selectedInstructor || selectedCourses || selectedSection) {
//       fetchData('http://localhost:8000/registeredstudents').then((value) => setTotalCustomersData(value));
//       fetchData('http://localhost:8000/feedbacksrec').then((value) => setTasksProgressData(value));
//       fetchData('http://localhost:8000/constcomment').then((value) => setBudgetData(value));
//       fetchData('http://localhost:8000/negcom').then((value) => setTotalProfitData(value));
//       fetchDataa('http://localhost:8000/commentscategorywise').then((data) => {
//         if (data) {
//           setChartData({
//             positive: data.positive || [],
//             negative: data.negative || [],
//           });
//         }
//       });
//       fetchDataa('http://localhost:8000/course_analysis').then((data) => {
//         if (data) {
//           setChartData1({
//             positive: data.positive || [],
//             negative: data.negative || [],
//             course_name: data.course_name || [],
//           });
//         }
//       });
//       fetchDataa('http://localhost:8000/years_of_teacher').then((data) => {
//         if (data) {
//           setChartData2({
//             positive: data.positive || [],
//             negative: data.negative || [],
//             semester_year: data.semester_year || [],
//           });
//           // console.log('Semester Yearn:', data.semester_year);

//         }
        
//       });
//     }
//   }, [selectedInstructor, selectedCourses, selectedSection]);

//   const handleSelectCategory = (selectedCategory) => {
//     // setSelectedCategory(selectedCategory);
//     setSelectedCategoryText(selectedCategory);
//   };
const fetchData = async (apiEndpoint) => {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data.value; // Assuming the value is nested under "value" property
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
const fetchDataa = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // You may want to handle errors or return a default value in case of an error
    return null;
  }
};
const fetchData1 = async (apiEndpoint, requestData) => {
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

const Index = () => {
  const { selectedInstructor } = useInstructorContext();
  const { selectedCourses } = useCourseContext();
  const { selectedFrom } = useFromContext();
  const { selectedTo } = useToContext();
  const [totalCustomersData, setTotalCustomersData] = useState(null);
  const [tasksProgressData, setTasksProgressData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [totalProfitData, setTotalProfitData] = useState(null);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null);
  const [chartData, setChartData] = useState({ positive: [], negative: [] });
  const [chartData1, setChartData1] = useState({ positive: [], negative: [], course_name: [] });
  const [chartData2, setChartData2] = useState({ positive: [], negative: [], semester_year: [] });
  const handleResponseSubmit = (responseText) => {

    // Handle the submission of the response here, e.g., send it to the server
  };
  useEffect(() => {
    fetchData('http://localhost:8000/registeredstudents').then((value) => 
    {setTotalCustomersData(value);
      console.log('Total Profit Data:', value); // Log the total profit data
    });
    fetchData('http://localhost:8000/feedbacksrec').then((value) => 
    {setTasksProgressData(value);
      console.log('Total Profit Data:', value);});
    fetchData('http://localhost:8000/constcomment').then((value) => setBudgetData(value));
    fetchData('http://localhost:8000/negcom').then((value) => {
      setTotalProfitData(value);
      console.log('Total Profit Data:', value); // Log the total profit data
    });

    
  }, []);
  useEffect(() => {
    const fetchDataForInstructor = async () => {
      if (selectedInstructor) {
        const data = await fetchData1('http://localhost:8000/registeredstudents', { selectedInstructor });
        setTotalCustomersData(data.value);
        const data1 = await fetchData1('http://localhost:8000/feedbacksrec', { selectedInstructor });
        setTasksProgressData(data1.value);
        const data2 = await fetchData1('http://localhost:8000/constcomment', { selectedInstructor });
        setBudgetData(data2.value);
        const data3 = await fetchData1('http://localhost:8000/negcom', { selectedInstructor });
        setTotalProfitData(data3.value);
      } 
    };
  
    const fetchDataForCourses = async () => {
      if (selectedInstructor && selectedCourses) {
        const data = await fetchData1('http://localhost:8000/registeredstudents', { selectedInstructor, selectedCourses });
        setTotalCustomersData(data.value);
        const data1 = await fetchData1('http://localhost:8000/feedbacksrec', { selectedInstructor, selectedCourses });
        setTasksProgressData(data1.value);
        const data2 = await fetchData1('http://localhost:8000/constcomment', { selectedInstructor, selectedCourses });
        setBudgetData(data2.value);
        const data3 = await fetchData1('http://localhost:8000/negcom', { selectedInstructor, selectedCourses });
        setTotalProfitData(data3.value);
      } 
    };
  
    const fetchDataForFromTo = async () => {
      if (selectedInstructor && selectedCourses && selectedFrom && selectedTo) {
        const data = await fetchData1('http://localhost:8000/registeredstudents', { selectedInstructor, selectedCourses, selectedFrom, selectedTo });
        setTotalCustomersData(data.value);
        const data1 = await fetchData1('http://localhost:8000/feedbacksrec', { selectedInstructor, selectedCourses, selectedFrom, selectedTo });
        setTasksProgressData(data1.value);
        const data2 = await fetchData1('http://localhost:8000/constcomment', { selectedInstructor, selectedCourses, selectedFrom, selectedTo });
        setBudgetData(data2.value);
        const data3 = await fetchData1('http://localhost:8000/negcom', { selectedInstructor, selectedCourses, selectedFrom, selectedTo });
        setTotalProfitData(data3.value);
      } 
    };
    const fetchDataForFromToinstructor = async () => {
      if (selectedInstructor && selectedFrom && selectedTo) {
        const data = await fetchData1('http://localhost:8000/registeredstudents', { selectedInstructor, selectedFrom, selectedTo });
        setTotalCustomersData(data.value);
        const data1 = await fetchData1('http://localhost:8000/feedbacksrec', { selectedInstructor,  selectedFrom, selectedTo });
        setTasksProgressData(data1.value);
        const data2 = await fetchData1('http://localhost:8000/constcomment', { selectedInstructor,  selectedFrom, selectedTo });
        setBudgetData(data2.value);
        const data3 = await fetchData1('http://localhost:8000/negcom', { selectedInstructor,  selectedFrom, selectedTo });
        setTotalProfitData(data3.value);
      } 
    };
  
    if (selectedInstructor && selectedCourses && selectedFrom && selectedTo) {
      fetchDataForFromTo();
    } 
    else if (selectedInstructor  && selectedFrom && selectedTo) {
      fetchDataForFromToinstructor();
    }else if (selectedInstructor && selectedCourses) {
      fetchDataForCourses();
    } else if (selectedInstructor) {
      fetchDataForInstructor();
    }
    // } else {
    //   // Reset state if none of the conditions are met
    //   setTotalCustomersData(null);
    //   setTasksProgressData(null);
    //   setBudgetData(null);
    //   setTotalProfitData(null);
    // }
  }, [selectedInstructor, selectedCourses, selectedFrom, selectedTo]);
  
  //   setTotalCustomersData('')
  //   if (selectedInstructor && selectedCourses) {
  //     fetchData();
  //   }
  // }, [selectedInstructor,selectedCourses]);

  // useEffect(() => {
  //   setTotalCustomersData('')
  //   if (selectedFrom && selectedTo) {
  //     fetchData();
  //   }
  // }, [selectedFrom, selectedTo,selectedInstructor,selectedCourses]);

  
  useEffect(() => {

      fetchDataa('http://localhost:8000/commentscategorywise').then((data) => {
        if (data) {
          setChartData({
            positive: data.positive || [],
            negative: data.negative || [],
          });
        }
      });
      fetchDataa('http://localhost:8000/course_analysis').then((data) => {
        if (data) {
          setChartData1({
            positive: data.positive || [],
            negative: data.negative || [],
            course_name: data.course_name || [],
          });
        }
      });
      fetchDataa('http://localhost:8000/years_of_teacher').then((data) => {
        if (data) {
          setChartData2({
            positive: data.positive || [],
            negative: data.negative || [],
            semester_year: data.semester_year || [],
          });
        }
      });
    
  }, [selectedInstructor, selectedCourses]);

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategoryText(selectedCategory);
  };

return(
  <>
    <Head>
      <title>
        Student Feedback Analyzer
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={totalCustomersData}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={tasksProgressData}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={budgetData}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value={totalProfitData}
            />
          </Grid>
          <Grid
              spacing={4}
              container
              sx={{
                width: '100%', // Set the width to 100%
              }}
            >
              <Grid
                item
                xs={6}
                lg={6}
              >
               
        <OverviewSales
          chartSeries={[
            {
              name: 'Positive Comments',
              data: chartData.positive
            },
            {
              name: 'Criticized Comments',
              data: chartData.negative
            }
          ]}
          sx={{ height: '90%', width: '100%' }}
        />
    
              </Grid>
              <Grid
                item
                xs={6}
                lg={6}
              >
                <OverviewCourses
                  chartSeriesa={[
                    {
                      name: 'Positive Comments',
                      data: chartData1.positive
                    },
                    {
                      name: 'Constructive Criticism Comments',
                      data: chartData1.negative
                    }
                  ]}
                  sx={{ height: '90%' , width: '100%' }}
                />

              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
              >
                <HistoryGraph
                  chartSeriesb={[
                    {
                      name: 'Positive Comments',
                      data: chartData2.positive
                    },
                    {
                      name: 'Constructive Criticism Comments',
                      data: chartData2.negative
                    }
                  ]}
                  semesterYears={chartData2.semester_year}
                  sx={{ height: '90%' , width: '100%' }}
                />

              </Grid>
            </Grid>
           

            <Grid
              spacing={4}
              container
              sx={{
                width: '100%', // Set the width to 100%
              }}
            >
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            
            {/* 'Instructor’s quality of delivery of lectures and classroom learning environment',
        'Course Content and Organization',
        'Assignment, Quizzes  Evaluation',
        'Learning Material (Textbook, References Books, Videos etc)' */}
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-6.png',
                  name: 'Instructor’s quality of delivery of lectures and classroom learning environment',
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-3.png',
                  name: 'Course Content and Organization',
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-1.png',
                  name: 'Assignment, Quizzes  Evaluation',
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-4.png',
                  name: 'Learning Material (Textbook, References Books, Videos etc)',
                },
                
              ]}
              sx={{ height: '100%' }}
              onSelectCategory={handleSelectCategory}

            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={8}
          >
            <OverviewLatestOrders
  sx={{ padding: 0, height: '100%' }}
  selectedCategoryText={selectedCategoryText} 
/>


           
          </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
        <ResponseModule onSubmit={handleResponseSubmit} />
      </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
 };

Index.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Index;