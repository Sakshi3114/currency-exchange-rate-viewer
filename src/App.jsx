import { getCacheKey, getCache, setCache } from './utils/cache';
import React, { useState, useEffect } from 'react';
import {Container, Typography, Box,CircularProgress, Alert,
  Paper, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { Grid } from '@mui/system';
import CurrencySelector from './components/CurrencySelector';
import DateRangePicker from './components/DateRangePicker';
import ExchangeRateChart from './components/ExchangeRateChart';
import ThemeToggleButton from './components/ThemeToggleButton';
import { fetchExchangeRates } from './services/api';
import { formatRatesForChart } from './utils/formatChartData';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBaseCurrency, setTargetCurrency,
  setStartDate, setEndDate, setChartType
} from './features/chart/chartSlice';
import ChartExportButtons from './components/ChartExportButtons';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const {
    baseCurrency, targetCurrency,
    startDate, endDate, chartType
  } = useSelector((state) => state.chart);

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];


  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      setError(null);
    
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      const cacheKey = getCacheKey(baseCurrency, targetCurrency, formattedStart, formattedEnd);
    
      const cached = getCache(cacheKey);
    
      if (cached) {
        console.log('Loaded from cache');
        setChartData(cached.data);
        setLoading(false);
        return;
      }
    
      try {
        const rawRates = await fetchExchangeRates(baseCurrency, targetCurrency, formattedStart, formattedEnd);
        const formattedData = formatRatesForChart(rawRates, targetCurrency);
        setChartData(formattedData);
        setCache(cacheKey, { data: formattedData });
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };    

    if (baseCurrency && targetCurrency && startDate && endDate) {
      getRates();
    }
  }, [baseCurrency, targetCurrency, startDate, endDate]);



  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
      <ThemeToggleButton />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 3,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Currency Exchange Rate Viewer
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <CurrencySelector
                baseCurrency={baseCurrency}
                targetCurrency={targetCurrency}
                onBaseChange={(e) => dispatch(setBaseCurrency(e.target.value))}
                onTargetChange={(e) => dispatch(setTargetCurrency(e.target.value))}
              />
            </Grid>

            <Grid item xs={12}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartChange={(date) => dispatch(setStartDate(date?.toISOString()))}
              onEndChange={(date) => dispatch(setEndDate(date?.toISOString()))}
            />
            </Grid>
          </Grid>

          {loading && (
            <Box my={3} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box my={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          <Box mt={3} display="flex" justifyContent="center">
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={(e, value) => {
                if (value !== null) dispatch(setChartType(value));
              }}
              aria-label="chart type"
              color="primary"
            >
              <ToggleButton value="line" aria-label="line chart">
                Line Chart
              </ToggleButton>
              <ToggleButton value="bar" aria-label="bar chart">
                Bar Chart
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box mt={3}>
            <ExchangeRateChart
              data={chartData}
              base={baseCurrency}
              target={targetCurrency}
              chartType={chartType}
            />
          </Box>
          {chartData.length > 0 && (
            <ChartExportButtons
              chartRefId="chart-download"
              chartData={chartData}
              baseCurrency={baseCurrency}
              targetCurrency={targetCurrency}
            />
          )}
        
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
