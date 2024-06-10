import React, { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Grid,
  TextField,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { getPathForUserRole } from './config';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user role data from your backend API
    fetch('http://localhost:8000/check_HOS', {
      method: 'POST',
      body: JSON.stringify({ /* any data to send */ }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.role === 'Admin') {
          setIsAdmin(true);
          
        }
        setUserRole(data.role);
      }
      )
      .catch(error => {
        console.error('Error:', error);
        // Handle error scenarios
      });
  }, []);

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const filteredItems = items.filter(item => {
    // Filter out items that should be hidden for admin role
    return !isAdmin || !item.hideForAdmin;
  });

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
       < Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <Box
            component={NextLink}
            
            href={userRole === 'Admin' ? '/account' : '/'}
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32,
              marginRight: 1, // Adjust the spacing between logo and text
            }}
          >
            <SchoolIcon style={{ color: 'white', fontSize: "35px" }} />
          </Box>
          <Typography variant="h6">Student Feedback Analyzer</Typography>
        </Box>

        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {filteredItems.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Box component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}>
          <Grid container spacing={3}>
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
              /> */}
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>

    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
