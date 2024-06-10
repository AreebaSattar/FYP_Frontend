// AddUser.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import  UseForm  from 'src/sections/account/use_form';

export const AddUser = () => {
    // const navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddUser = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveUser = () => {
    // You can add logic to save the user data or perform any other actions
    // For now, let's just redirect to the home page after saving
    setIsFormOpen(false);
    // navigate('/'); // Replace '/' with the desired redirect path
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
          <GroupAddSharpIcon
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
            onClick={handleAddUser}
          >
            Register User
          </Button>
        </Box>
      </CardContent>

      {/* Render the UserForm component with the necessary props */}
      <UseForm open={isFormOpen} handleClose={handleCloseForm} handleSave={handleSaveUser}/>
    </Card>
  );
};

export default AddUser;
