import PropTypes from 'prop-types';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';

export const OverviewTasksProgress = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Total Received Feedbacks
                          </Typography>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                margin: '50 auto',
              }}
            >
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#008080',
              height: 56,
              width: 56
            }}
          >
            <FeedRoundedIcon />
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
