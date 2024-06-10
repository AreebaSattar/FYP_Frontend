import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  const user = {
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  //add user 
  //delete user
  //assign role
  //change role
  export const ChangeRole = () => (
    <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Use the GroupRemoveIcon instead of Avatar */}
        <ManageAccountsIcon
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
            width: 'auto', // Not full width
            fontSize: '25px', // Adjust the text size
            alignItems: 'center',
            color: '#1b1c1b',
            fontWeight: 'bold',
            backgroundColor: '#f5f7f6' // Light background color
          }}
        >
          Change Role
        </Button>
      </Box>
    </CardContent>
  </Card>
    
  );
  