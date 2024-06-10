import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import React, { useState, useEffect } from 'react';

export const AccountPopover = (props) => {

  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
const [userRole, setUserRole] = useState(null); // Initialize with null or a default value

  useEffect(() => {
    // Fetch data from your backend API
    fetch('http://localhost:8000/check_HOS', {
      method: 'POST',
      body: JSON.stringify({ /* any data to send */ }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserRole(data.role); // Update the userRole state with the fetched role
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error scenarios
      });
  }, []); 
  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        {userRole && (
        <Typography color="text.secondary" variant="body2">
          {userRole}
        </Typography>
      )}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
