import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';

import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import UseForm from 'src/sections/account/removeuse_form'; // Import the UserForm component

export const DeleteUser = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRemoveUser = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleRemoveUserConfirm = () => {
    // Logic to remove the user from the database goes here
    // For now, just close the form
    setIsFormOpen(false);
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
          <GroupRemoveIcon
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
            onClick={handleRemoveUser}
          >
            Remove User
          </Button>
        </Box>
      </CardContent>

      {/* Render the UserForm component with the necessary props */}
      <UseForm
        open={isFormOpen}
        handleClose={handleCloseForm}
        handleSave={handleRemoveUserConfirm} // Use handleSave for removal confirmation
        formTitle="Remove User" // Set custom title for the form
        submitButtonText="Remove" // Set custom text for the submit button
      />
    </Card>
  );
};



export default DeleteUser;
