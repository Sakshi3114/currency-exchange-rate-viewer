import axios from 'axios';

export const fetchExchangeRates = async (base, target, startDate, endDate) => {
  try {
    const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${target}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data.rates) {
      // data.rates is { date: { CUR: rate } }
      return data.rates;
    } else {
      throw new Error('No rates data found');
    }
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
