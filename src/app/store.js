import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../features/chart/chartSlice';
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    theme: themeReducer
  },
});
