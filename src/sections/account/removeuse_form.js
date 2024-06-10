// UserForm.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';

const UserForm = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSave = async() => {
    if ( !email ) {
        // Display an alert if any field is empty
        window.alert('Please fill in all fields');
        return;
      }
    try {
        const response = await fetch('http://localhost:8000/deleteuser', {
          method: 'POST', // Or 'PUT', 'PATCH', etc. depending on your API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          }),
        });
    
        if (response.ok) {
          // Data saved successfully
          console.log('Data saved successfully');
        } else {
          console.error('Failed to save data:', response.statusText);
          window.alert('Failed to save data. Please try again later.');
        }
      } catch (error) {
        console.error('Error saving data:', error);
        window.alert('Error saving data. Please try again later.');
      }
    handleClose();
  };

 

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter User ID</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
             
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={handleEmailChange}
              />
              
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
