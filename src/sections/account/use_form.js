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
  const [rollno, setRoll] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleRollnoChange = (e) => setRoll(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSave = async () => {
    if (!firstName || !lastName || !email || !rollno ) {
      window.alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          teacher_roll_number: rollno,
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to create user');
      }
      // If user created successfully
      window.alert('User created successfully');
      handleClose();
    } catch (error) {
      console.error('Error creating user:', error);
      window.alert('Failed to create user. Please try again later.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter User Information</DialogTitle>
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
                label="First Name"
                variant="outlined"
                margin="normal"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                label="Teacher Roll No."
                variant="outlined"
                margin="normal"
                value={rollno}
                onChange={handleRollnoChange}
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
