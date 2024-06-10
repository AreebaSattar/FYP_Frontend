import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
 
} from '@mui/material';
import OverviewLatestOrders from 'src/sections/overview/overview-latest-orders';
import { useInstructorContext } from 'src/layouts/dashboard/InstructorContext';


export const OverviewLatestProducts = (props) => {
  const { products = [], sx ,onSelectCategory} = props;
  const { selectedInstructor } = useInstructorContext();

  const [selectedCategoryText, setSelectedCategoryText] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');
  useEffect(() => {
    // When selectedInstructor changes, set products to an empty array
    setSelectedCat('');
    handleCatChange('');
    setSelectedCategoryText('');
    handleCatSelection({ target: { value: '' } });
    
  }, [selectedInstructor]);

  const handleButtonClick = (product) => {
    const selectedProductName = product.name;
  
    if (onSelectCategory && typeof onSelectCategory === 'function') {
      onSelectCategory(selectedProductName);
    } else {
      console.error('onSelectCategory is not a function!');
    }
  
    setSelectedCat(selectedProductName);
    handleCatChange(selectedProductName); // Call the function to handle course change
    handleCatSelection({ target: { value: selectedProductName } }); // Call handleCatSelection
  };
  const handleCatChange = async (selectedCategory) => {
    
    try {
      const apiResponse = await axios.post('http://localhost:8000/setCategory', {
        selectedCategory,
      });
      // Handle the response as needed
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleCatSelection = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCat(selectedCategory);
    handleCatChange(selectedCategory); // Call the function to handle course change
    // console.log("selectedcourse",selectedCategory)
  };
    return (
    <Card sx={sx}>
    <CardHeader
  title="Feedback Categories"
  titleTypographyProps={{
    sx: {
      fontSize: '24px',
      fontWeight: 'bold', // Change 'bolder' to 'bold'
    },
  }}
/>

      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;

          return (
            <Button
              key={product.id}
              variant="contained" // You can adjust the variant based on your design
              sx={{
                width: '100%', // Make the button take full width
                height: '100%', // Set a fixed height for the button
                display: 'flex', // Use flexbox to align content vertically
                flexDirection: 'column', // Stack content vertically
                justifyContent: 'space-between', // Space content evenly
                marginBottom: hasDivider ? 1 : 0,
                backgroundColor: 'white', // Set your custom color
                color: 'black',

                '&:hover': {
                  backgroundColor: '#D3D3D3', // Set your custom hover background color
                  color: 'yourTextHoverColorHere', // Set your custom hover text color
                },
            
                // Custom styles for focus state
                '&:focus': {
                  backgroundColor: 'yourCustomFocusColorHere', // Set your custom focus background color
                  color: 'yourTextFocusColorHere', // Set your custom focus text color
                },
                
              }}
              onClick={() => handleButtonClick(product)} // Pass the individual product
              >
              <ListItem
                disableGutters
                divider={hasDivider}
              >
                <ListItemAvatar>
                  {product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'black',
                        height: 48,
                        width: 48,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
                
              </ListItem>
            </Button>
          );
        })}
      </List>
      <Divider />
      {selectedCategoryText && (
        <OverviewLatestOrders
          sx={{ padding: 2, height: '100%' }}
          />
      )}
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
};export default OverviewLatestProducts;
