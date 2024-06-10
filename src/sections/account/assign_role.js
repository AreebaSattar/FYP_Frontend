import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignForm from 'src/sections/account/assignrole_form'; // Import the AssignForm component

export const AssignRole = () => {
  const [isFormOpen, setIsFormOpen] = useState(false); // State to manage the form open/close

  const handleAssignRole = () => {
    setIsFormOpen(true); // Open the form when the button is clicked
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Close the form
  };

  const handleSaveUser = () => {
    // Logic to save the user data goes here
    setIsFormOpen(false); // Close the form after saving
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <AssignmentIndIcon
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              color: '#8da4ba'
            }}
          />
          <Button
            variant="text"
            sx={{
              width: 'auto',
              fontSize: '25px',
              alignItems: 'center',
              color: '#1b1c1b',
              fontWeight: 'bold',
              backgroundColor: '#f5f7f6'
            }}
            onClick={handleAssignRole} // Open the form when the button is clicked
          >
            Assign Role
          </Button>
        </Box>
      </CardContent>

      {/* Render the AssignForm component with the necessary props */}
      <AssignForm open={isFormOpen} handleClose={handleCloseForm} handleSave={handleSaveUser} />
    </Card>
  );
};

export default AssignRole;
