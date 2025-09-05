import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'material.theme';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { currentIdentities } from 'src/store/thunks/identity.thunks';
import { WagmiProvider } from 'wagmi';

import { setupInterceptors } from './core/api';
import { queryClient, wagmiConfig } from './dapp/dapp.connect';
import { Spinner } from './modules/general/components/spinner/spinner';
import store from './store';

import 'src/core/translation/i18n';

// function ModalPlaceholder() {
//   const modal = useSelector<RootState>((state) => state.modal);
//   const dispatch = useDispatch();
//   return (
//     <Modal open={modal.open} onClose={() => dispatch(closeModal())}>
//       {modal.children}
//     </Modal>
//   );
// }

function App() {
  useEffect(() => {
    setupInterceptors(store);
    store.dispatch(currentIdentities());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router.routes} />
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
        {/* <ModalPlaceholder /> */}
        <Spinner />
      </Provider>
    </StyledEngineProvider>
  );
}

export default App;
