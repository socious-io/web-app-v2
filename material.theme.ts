import { createTheme } from '@mui/material/styles';
import variables from 'src/components/_exports.module.scss';

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
});
