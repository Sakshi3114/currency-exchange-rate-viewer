import React from 'react';
import { Button, Stack } from '@mui/material';
import { exportChartAsImage, exportChartAsCSV } from '../utils/exportUtils';

const ChartExportButtons = ({ chartRefId, chartData, baseCurrency, targetCurrency }) => {
  const handleExportImage = () => {
    const chartNode = document.getElementById(chartRefId);
    exportChartAsImage(chartNode, 'exchange-rate-chart.png');
  };

  const handleExportCSV = () => {
    exportChartAsCSV(chartData, baseCurrency, targetCurrency, 'exchange-rate-data.csv');
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      <Button variant="contained" color="primary" onClick={handleExportImage}>
        Export as Image
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleExportCSV}>
        Export as CSV
      </Button>
    </Stack>
  );
};

export default ChartExportButtons;
