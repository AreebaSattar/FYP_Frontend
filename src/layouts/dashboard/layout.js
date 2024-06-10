// Layout.js

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import { InstructorProvider } from './InstructorContext'; // Import as named export
import { CourseProvider } from './CourseContext'; // Import as named export
import { SectionProvider } from './SectionContext'; // Import as named export
import { FromProvider } from './FromContext'; // Import as named export
import { ToProvider } from './ToContext'; // Import as named export

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  },
  backgroundColor: '#f7fafa', 

}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  // const [selectedInstructor, setSelectedInstructor] = useState(null); // Define selectedInstructor state

  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <FromProvider>

    <InstructorProvider> {/* Use InstructorProvider instead of InstructorContext.Provider */}
      <CourseProvider>
        <SectionProvider>
          <ToProvider>  
              <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
    </ToProvider>

    </SectionProvider>
    </CourseProvider>
    </InstructorProvider>
    </FromProvider>

  );
});
