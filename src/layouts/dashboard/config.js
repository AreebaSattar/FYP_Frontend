import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertInvitationSharpIcon from '@mui/icons-material/InsertInvitationSharp';
import TodaySharpIcon from '@mui/icons-material/TodaySharp';
import { SvgIcon } from '@mui/material';
import React from 'react';
import InstructorDropdown from './InstructorsDropdown'; 
// import InstructorDropdown from './CoursesDropdown'; 
import CoursesDropdown from './CoursesDropdown'; 

import SectionDropdown from './SectionDropdown';
import FromDropdown from './FromDropdown';
import ToDropdown from './ToDropdown';

export const items = [
  {
    title: 'Overview',
    path: '',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: <InstructorDropdown />, 
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    hideForAdmin: true // Hide this item for Admin
  },
  {
    title: <FromDropdown />,
    icon: (
      <SvgIcon fontSize="small">
        <InsertInvitationSharpIcon />
      </SvgIcon>
    ),    hideForAdmin: true // Hide this item for Admin

  },
  {
    title: <ToDropdown />, 
    icon: (
      <SvgIcon fontSize="small">
        <TodaySharpIcon />
      </SvgIcon>
    ), hideForAdmin: true // Hide this item for Admin
  },
  {
    title: <CoursesDropdown />, 
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
    hideForAdmin: true // Hide this item for Admin
  },
  {
    title: <SectionDropdown />, 
    icon: (
      <SvgIcon fontSize="small">
        <ApartmentIcon />
      </SvgIcon>
    ),    hideForAdmin: true // Hide this item for Admin

  },
 
];

export const getPathForUserRole = (userRole) => {
  if (userRole === 'HOS') {
    return '/';
  } else if (userRole === 'Admin') {
    return '/account';
  } else {
    return '/'; // Handle other cases if needed
  }
};
