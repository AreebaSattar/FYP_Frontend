import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
// import { AccountProfile } from 'src/sections/account/account-profile';
import { AddUser } from 'src/sections/account/add_user';
import { DeleteUser } from 'src/sections/account/delete_user';
import { AssignRole } from 'src/sections/account/assign_role';
import { ChangeRole } from 'src/sections/account/change_role';

// import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
// import { AssignRole } from 'src/sections/account/assign_role';

const Page = () => (
  <>
    <Head>
      <title>
        Account | Student Feedback Analyzer
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Admin 
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                <AddUser />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                <DeleteUser />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                <AssignRole />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={6}
              >
                <ChangeRole />
              </Grid>
              
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
