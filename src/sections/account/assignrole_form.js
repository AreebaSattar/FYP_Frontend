import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';

const AssignForm = ({ open, handleClose }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch users
      const usersResponse = await fetch('http://localhost:8000/assign_role_person');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.users_not_in_exclude_groups);
      } else {
        console.error('Failed to fetch users');
      }

      // Fetch roles
      const rolesResponse = await fetch('http://localhost:8000/assign_role');
      if (rolesResponse.ok) {
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.roles);
      } else {
        console.error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSave = async() => {
    if (!selectedRole || !selectedUser) {
      // Display an alert if no role is selected
      window.alert('Please select a role');
      return;
    }
    try {
        const response = await fetch('http://localhost:8000/save_data', {
          method: 'POST', // Or 'PUT', 'PATCH', etc. depending on your API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: selectedRole,
            user: selectedUser,
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
      <DialogTitle>Assign Role</DialogTitle>
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
              <FormControl sx={{ minWidth: 200, marginBottom: 1.5 }}>
                <InputLabel>Users</InputLabel>
                <Select
                  value={selectedUser}
                  onChange={handleUserChange}
                  label="Users"
                >
                  {users.map((user) => (
                    <MenuItem key={user.teacher_id} value={user.teacher_id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200, marginBottom: 1.5 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default AssignForm;
