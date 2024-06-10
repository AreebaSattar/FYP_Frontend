import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import React, { useState, useEffect } from 'react';
import { useInstructorContext } from 'src/layouts/dashboard/InstructorContext';
import { useCourseContext } from 'src/layouts/dashboard/CourseContext';
import { useSectionContext } from 'src/layouts/dashboard/SectionContext';
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
const useChartOptionsb = async () => {
  const theme = useTheme();
  const [rerender, setRerender] = useState(false);
  const { selectedInstructor } = useInstructorContext();
  const { selectedCourses } = useCourseContext();
  const{selectedSection}= useSectionContext();

  const [chartData2, setChartData2] = useState({ positive: [], negative: [] ,semester_year: []});
//   const theme = useTheme();

// useEffect(() => {
//   if (selectedInstructor || selectedCourses || selectedSection) {
//   fetchDataa('http://localhost:8000/years_of_teacher').then((data) => {
//     setChartData({
//       positive: data.positive || [],
//       negative: data.negative || [],
//       semester_year: data.semester_year || [],
//     });

//   });

//   }
// }, [selectedInstructor]);
// // , selectedCourses, selectedSection
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchDataa('http://localhost:8000/years_of_teacher');
      setChartData2({
        positive: data.positive || [],
        negative: data.negative || [],
        semester_year: data.semester_year || [],
      });
      // console.log('Semester Year:', data.semester_year);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (selectedInstructor) {
    fetchData();
  }

}, [selectedInstructor]); 
// const categories = chartData2.semester_year.map((year) => ({ name: year }));
const categories = chartData2.semester_year.map((year) => ({ name: year }));
  // console.log('Categories:', categories);
  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      line: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: categories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
      
  
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const HistoryGraph = (props) => {
  const {  chartSeriesb,semesterYears, sx } = props;
  const { selectedInstructor } = useInstructorContext ();
  const chartOptionsb = useChartOptionsb(selectedInstructor);

  return (
    <Card sx={sx}>
      <CardHeader
        title="Performance History"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptionsb}
          series={chartSeriesb}
          type="line"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

HistoryGraph.ProtoTypes = {
  chartSeriesb: PropTypes.array.isRequired,
  semesterYears: PropTypes.array.isRequired, // Define prop types for semesterYears

  sx: PropTypes.object
};


