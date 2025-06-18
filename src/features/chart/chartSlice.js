import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseCurrency: 'USD',
  targetCurrency: 'INR',
  chartType: 'line',
  startDate: new Date('2023-01-01').toISOString(),
  endDate: new Date('2023-01-10').toISOString(),
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setTargetCurrency: (state, action) => {
      state.targetCurrency = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const {
  setBaseCurrency,
  setTargetCurrency,
  setStartDate,
  setEndDate,
  setChartType,
} = chartSlice.actions;

export default chartSlice.reducer;
