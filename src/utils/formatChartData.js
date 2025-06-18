export const formatRatesForChart = (ratesObject, targetCurrency) => {
    return Object.entries(ratesObject).map(([date, rateObj]) => ({
      date,
      rate: rateObj[targetCurrency],
    }));
  };