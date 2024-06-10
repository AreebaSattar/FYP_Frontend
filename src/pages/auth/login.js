// import { useCallback, useState } from 'react';
// import Head from 'next/head';
// import NextLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import {
//   Alert,
//   Box,
//   Button,
//   FormHelperText,
//   Link,
//   Stack,
//   Tab,
//   Tabs,
//   TextField,
//   Typography
// } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
// import { Layout as AuthLayout } from 'src/layouts/auth/layout';

// const Page = () => {
//   const router = useRouter();
//   const auth = useAuth();
//   const [method, setMethod] = useState('email');
//   const formik = useFormik({
//     initialValues: {
//       email: 'demo@devias.io',
//       password: 'Password123!',
//       submit: null
//     },
//     validationSchema: Yup.object({
//       email: Yup
//         .string()
//         .email('Must be a valid email')
//         .max(255)
//         .required('Email is required'),
//       password: Yup
//         .string()
//         .max(255)
//         .required('Password is required')
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         await auth.signIn(values.email, values.password);
//         router.push('/');
//       } catch (err) {
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     }
//   });

//   const handleMethodChange = useCallback(
//     (event, value) => {
//       setMethod(value);
//     },
//     []
//   );

//   const handleSkip = useCallback(
//     () => {
//       auth.skip();
//       router.push('/');
//     },
//     [auth, router]
//   );

//   return (
//     <>
//       <Head>
//         <title>
//           Login | Devias Kit
//         </title>
//       </Head>
//       <Box
//         sx={{
//           backgroundColor: 'background.paper',
//           flex: '1 1 auto',
//           alignItems: 'center',
//           display: 'flex',
//           justifyContent: 'center'
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: 550,
//             px: 3,
//             py: '100px',
//             width: '100%'
//           }}
//         >
//           <div>
//             <Stack
//               spacing={1}
//               sx={{ mb: 3 }}
//             >
//               <Typography variant="h4">
//                 Login
//               </Typography>
              
//             </Stack>
            
//             {method === 'email' && (
//               <form
//                 noValidate
//                 onSubmit={formik.handleSubmit}
//               >
//                 <Stack spacing={3}>
//                   <TextField
//                     error={!!(formik.touched.email && formik.errors.email)}
//                     fullWidth
//                     helperText={formik.touched.email && formik.errors.email}
//                     label="Email Address"
//                     name="email"
//                     onBlur={formik.handleBlur}
//                     onChange={formik.handleChange}
//                     type="email"
//                     value={formik.values.email}
//                   />
//                   <TextField
//                     error={!!(formik.touched.password && formik.errors.password)}
//                     fullWidth
//                     helperText={formik.touched.password && formik.errors.password}
//                     label="Password"
//                     name="password"
//                     onBlur={formik.handleBlur}
//                     onChange={formik.handleChange}
//                     type="password"
//                     value={formik.values.password}
//                   />
//                 </Stack>
                
//                 <Button
//                   fullWidth
//                   size="large"
//                   sx={{ mt: 3 }}
//                   type="submit"
//                   variant="contained"
//                 >
//                   Continue
//                 </Button>
                
               
//               </form>
//             )}
            
//           </div>
//         </Box>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

// export default Page;




import { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // Include authentication logic similar to the old code here
        const username = values.email;
        const password = values.password;
        await auth.signIn('demo@devias.io', 'Password123!');
        
        const response = await axios.post('http://localhost:8000/api/signin/', { username, password });
        const data = response.data;
        if (data.role) {
          const userRole = data.role;
          sessionStorage.setItem('userRole', userRole);

          if (data.role === "HOS") {
            // auth.setAuthenticated(true); 
            router.push('/');
            //idhar humnay ek toh jo role aayegaa uss kaa sabsay pehlay set instructor call krnaa hai
            //we will set instructor abb jabb keh instructor set huaa huaa hai i think we should set the role as well
            // role keh 
          
          } 
          else if (data.role === "Admin")
          {
            router.push('/account')
          }
          else {
            // Handle non-admin case
            router.push('/');
          }
        } else if (data.error) {
          console.error(data.error); // Handle the error message for invalid credentials
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: data.error }); // Set error message
        }
      } catch (error) {
        console.error('Error occurred:', error); // Handle any other errors that occur during the request
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: 'An error occurred during login.' }); // Set a generic error message
      } finally {
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">Login</Typography>
            </Stack>
            {method === 'email' && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
