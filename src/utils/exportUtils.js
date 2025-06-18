import { toPng } from 'html-to-image';
import download from 'downloadjs';

/**
 * Export chart as PNG image
 * @param {HTMLElement} element - DOM node to export
 * @param {string} filename - Name of the downloaded image
 */
export const exportChartAsImage = (element, filename = 'chart.png') => {
  if (!element) return;

  toPng(element)
    .then((dataUrl) => {
      download(dataUrl, filename);
    })
    .catch((err) => {
      console.error('Failed to export chart image:', err);
    });
};

/**
 * Export chart data as CSV file
 * @param {Array} chartData - Array of { date, value }
 * @param {string} baseCurrency - e.g., USD
 * @param {string} targetCurrency - e.g., INR
 * @param {string} filename - CSV filename
 */
export const exportChartAsCSV = (chartData, baseCurrency, targetCurrency, filename = 'chart-data.csv') => {
  if (!chartData || chartData.length === 0) return;

  const csvRows = [
    ['Date', `${baseCurrency} to ${targetCurrency}`],
    ...chartData.map(({ date, value }) => [date, value]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  download(URL.createObjectURL(blob), filename);
};
