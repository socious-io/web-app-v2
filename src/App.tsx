import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

import { setupInterceptors } from './core/api';
import { DeepLinks } from './core/deepLinks';
import { Spinner } from './Nowruz/modules/general/components/spinner/spinner';
import store from './store';

import 'src/core/translation/i18n';

function App() {
  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentIdentities());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router.routes} />
        </ThemeProvider>
        <DeepLinks />
        <Spinner />
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
