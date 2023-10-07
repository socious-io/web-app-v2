import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

import { Spinner } from './components/atoms/spinner/spinner';
import { Modal } from './components/templates/modal/modal';
import { setupInterceptors } from './core/api';
import { DeepLinks } from './core/deepLinks';
import store from './store';
import { closeModal } from './store/reducers/modal.reducer';

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
    <Provider store={store}>
      <RouterProvider router={router.routes}>
        <DeepLinks />
      </RouterProvider>
      <ModalPlaceholder />
      <Spinner />
    </Provider>
  );
}

export default App;
