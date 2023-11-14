import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

import { Spinner } from './components/atoms/spinner/spinner';
import { Modal } from './components/templates/modal/modal';
import { setupInterceptors } from './core/api';
import { DeepLinks } from './core/deepLinks';
import store, { RootState } from './store';
import { closeModal } from './store/reducers/modal.reducer';

import 'src/core/translation/i18n';

function ModalPlaceholder() {
  const modal = useSelector<RootState>((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <Modal open={modal.open} onClose={() => dispatch(closeModal())}>
      {modal.children}
    </Modal>
  );
}

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
        <ModalPlaceholder />
        <Spinner />
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
