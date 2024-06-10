import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import SchoolIcon from '@mui/icons-material/School';

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/login"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <SchoolIcon style={{ color: 'Black', fontSize: '40px' }} />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={10}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            padding: 0, // Remove padding
            margin: 0, // Remove margin
            '& img': {
              objectFit: 'cover', // Ensure the image covers the container
              width: '100%',
              height: '100%', // Set the height to 100%
              margin: 0, // Remove margin
              padding: 0, // Remove padding
              boxSizing: 'border-box', // Ensure box-sizing is set
            }
          }}
        >
          <Box sx={{ p: 0, height: '78.5%' }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '35px',
                lineHeight: '20px',
                mb: 3
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"
              >
                Student Feedback Analyzer
              </Box>
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              sx={{
                fontSize: '24px',
                lineHeight: '20px',
                mb: 3
              }}
            >
              Empowering growth through constructive insights
            </Typography>

            <img
              alt=""
              src="/assets/image22.jpg"
              sx={{ mb: 20 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};
