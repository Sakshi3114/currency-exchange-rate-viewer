import React, { useRef }  from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Typography, Box} from '@mui/material';

const ExchangeRateChart = ({ data, base, target, chartType }) => {
  const chartRef = useRef();
  return (
    <Box ref={chartRef} id="chart-download">
      <Typography variant="subtitle1" gutterBottom>
        Exchange Rate: {base} → {target}
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#1976d2" dot />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Bar dataKey="rate" fill="#388e3c" />
          </BarChart>
        )}
      </ResponsiveContainer>
            
    </Box>
  );
};

export default ExchangeRateChart;
