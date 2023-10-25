import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#004A46',
      light: '#42a5f5',
      dark: '#912082',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#344054',
      light: '#FFFFFF',
      dark: '#F9FAFB',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D92D20',
      dark: '#B42318',
      contrastText: '#FFFFFF',
    },
  },
});
