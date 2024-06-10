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
import React, { useState, useEffect,useContext } from 'react';
import { useInstructorContext  } from 'src/layouts/dashboard/InstructorContext.js';
// import { CourseContext } from './CourseContext';

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
const useChartOptions = (selectedInstructor) => {
  const theme = useTheme();
  const [rerender, setRerender] = useState(false);
  // const { selectedInstructor } = useContext(InstructorContext);
  // const { selectedCourses } = useContext(CourseContext);
  const [chartData, setChartData] = useState({ positive: [], negative: [] ,course_name: []});
//   const theme = useTheme();

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchDataa('http://localhost:8000/course_analysis');
      setChartData({
        positive: data.positive || [],
        negative: data.negative || [],
        course_name: data.course_name || [],
      });
      // console.log('course_name:', data.course_name);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (selectedInstructor) {
    fetchData();
  }

}, [selectedInstructor]);
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
      bar: {
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
      categories: chartData.course_name,
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

export const OverviewCourses = (props) => {
  const { chartSeriesa, sx } = props;
  const { selectedInstructor } = useInstructorContext ();
  const chartOptionsa = useChartOptions(selectedInstructor);

  return (
    <Card sx={sx}>
      <CardHeader
        title="Course Based Performance"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptionsa}
          series={chartSeriesa}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

OverviewCourses.protoTypes = {
  chartSeriesa: PropTypes.array.isRequired,
  sx: PropTypes.object
};

