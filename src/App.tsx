import { Provider, useDispatch, useSelector } from 'react-redux';
import router from 'src/core/router';
import store, { RootState } from './store/store';
import { Spinner } from './components/atoms/spinner/spinner';
import { Sidebar } from './pages/sidebar/sidebar';
import { location } from './core/router/config.routes';
import { DeepLinks } from './core/deepLinks';
import { nonPermanentStorage } from './core/storage/non-permanent';
import { endpoint } from './core/endpoints';
import { setAuthCookies } from './pages/sign-in/sign-in.services';
import { PostRefreshResp } from './core/endpoints/index.types';
import { closeModal } from './store/reducers/modal.reducer';
import { Modal } from './components/templates/modal/modal';
import { useEffect } from 'react';
import { getIdentities } from './core/api';
import { setIdentityList } from './store/reducers/identity.reducer';
import { RouterProvider } from 'react-router-dom';

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
