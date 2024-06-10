import PropTypes from 'prop-types';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewTotalProfit = (props) => {
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
              variant="overline"
            >
              Criticized Comments
            </Typography>
            <Typography variant="h3">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#708090',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <NotesOutlinedIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
