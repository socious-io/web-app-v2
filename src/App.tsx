import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from 'src/core/router';

import { Spinner } from './components/atoms/spinner/spinner';
import { Modal } from './components/templates/modal/modal';
import { DeepLinks } from './core/deepLinks';
import { endpoint } from './core/endpoints';
import { PostRefreshResp } from './core/endpoints/index.types';
import { nonPermanentStorage } from './core/storage/non-permanent';
import { Sidebar } from './pages/sidebar/sidebar';
import { setAuthCookies } from './pages/sign-in/sign-in.services';
import { closeModal } from './store/reducers/modal.reducer';
import store, { RootState } from './store/store';


async function fetchNewAuth(
  refresh_token: Awaited<ReturnType<typeof nonPermanentStorage.get>>
): Promise<PostRefreshResp | void> {
  if (refresh_token) {
    const newAuth = await endpoint.post.auth.refresh({ refresh_token });
    return newAuth;
  }
}

async function storeNewAuth(newAuth: Awaited<ReturnType<typeof fetchNewAuth>>) {
  if (newAuth !== undefined) {
    await setAuthCookies(newAuth);
  }
}

function refreshToken() {
  nonPermanentStorage.get('refresh_token').then(fetchNewAuth).then(storeNewAuth);
}

refreshToken();

setInterval(refreshToken, 1000 * 60 * 15);

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
  return (
    <Provider store={store}>
      <RouterProvider router={router.routes} />
      <ModalPlaceholder />
      <DeepLinks />
      <Spinner />
      <Sidebar />
    </Provider>
  );
}

export default App;
