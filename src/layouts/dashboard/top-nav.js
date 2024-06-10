import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DriveFolderUploadTwoToneIcon from '@mui/icons-material/DriveFolderUploadTwoTone';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState, useEffect } from 'react';
import {
  
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

// export const TopNav = (props) => {

//check_HOS
export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const [displayUploadButton, setDisplayUploadButton] = useState(false);
  useEffect(() => {
    // Fetch data from your backend API
    // Assuming you use fetch or axios for making API calls
    fetch('http://localhost:8000/check_HOS', {
      method: 'POST',
      body: JSON.stringify({ /* any data to send */ }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.role === 'HOS') {
          setDisplayUploadButton(true); // If 'HOS' is returned, display the button
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error scenarios
      });
  }, []); 
  const handleButtonClick = () => {
    // Make a fetch request to localhost:8000/apisomehing
    fetch('http://localhost:8000/uploadpdf', {
       // You can change the method as needed
      // Add headers if needed
    })
      .then(response => {
        // Handle the response
        if (response.ok) {
          // Do something with the successful response
        } else {
          // Handle the error response
        }
      })
      .catch(error => {
        // Handle errors during the fetch
        console.error('Error during fetch:', error);
      });
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            {/* <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="Large">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
             {displayUploadButton && (
            <Tooltip title="Upload Folder">
              <IconButton onClick={handleButtonClick}>
                <SvgIcon fontSize="medium">
                  <DriveFolderUploadIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
             )}
            <Tooltip title="Notifications">
              <IconButton onClick={handleButtonClick}>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/new.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
