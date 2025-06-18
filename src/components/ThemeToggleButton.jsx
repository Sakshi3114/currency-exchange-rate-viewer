import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { toggleTheme } from '../features/theme/themeSlice';

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Box
      sx={{
        position: 'fixed', // Stick it on the screen
        top: { xs: 8, sm: 12, md: 16 },
        right: { xs: 8, sm: 12, md: 16 },
        zIndex: 9999,
      }}
    >
      <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={() => dispatch(toggleTheme())}
          color="inherit"
          size="large"
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeToggleButton;
