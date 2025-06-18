import React from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" gap={2} flexWrap="wrap">
        <DatePicker
          label="Start Date"
          value={startDate ? new Date(startDate) : null}
          onChange={(newValue) => {
            if (newValue) onStartChange(newValue);
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              fullWidth: true,
              error: false,
              helperText: '',
            }
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate ? new Date(endDate) : null}
          onChange={(newValue) => {
            if (newValue) onEndChange(newValue);
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              fullWidth: true,
              error: false,
              helperText: '',
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
