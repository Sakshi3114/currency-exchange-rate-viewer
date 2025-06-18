// AppWrapper.jsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { useSelector } from 'react-redux';

function AppWrapper() {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f0f4f8',
              paper: '#ffffff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
