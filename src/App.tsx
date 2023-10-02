import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { currentIdentities } from 'src/core/api/auth/auth.service';
import router from 'src/core/router';

import { Spinner } from './components/atoms/spinner/spinner';
import { Modal } from './components/templates/modal/modal';
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
    store.dispatch(currentIdentities());
  }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={router.routes} />
      <ModalPlaceholder />
      <DeepLinks />
      <Spinner />
    </Provider>
  );
}

export default App;
