import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CurrencySelector = ({ baseCurrency, targetCurrency, onBaseChange, onTargetChange }) => {
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Base</InputLabel>
        <Select value={baseCurrency} label="Base" onChange={onBaseChange}>
          {currencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Target</InputLabel>
        <Select value={targetCurrency} label="Target" onChange={onTargetChange}>
          {currencies.map((curr) => (
            <MenuItem key={curr} value={curr}>
              {curr}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrencySelector;
