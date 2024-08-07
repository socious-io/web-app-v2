import { createTheme } from '@mui/material/styles';
import variables from 'src/styles/constants/_exports.module.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: variables.color_primary_600,
      dark: variables.color_primary_700,
      contrastText: variables.color_white,
    },
    secondary: {
      main: variables.color_grey_700,
      dark: variables.color_grey_300,
      contrastText: variables.color_white,
    },
    error: {
      main: variables.color_error_600,
      dark: variables.color_error_400,
      contrastText: variables.color_white,
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(','),
    h3: {
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: '38px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },

    h5: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
    caption: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0em',
      fontFamily: 'Inter',
    },
  },
});
