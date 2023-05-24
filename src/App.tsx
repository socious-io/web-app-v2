import { Provider } from 'react-redux';
import { Outlet, Router } from '@tanstack/react-location';
import { routes } from './core/routes/routes';
import store from './store/store';
import { Spinner } from './components/atoms/spinner/spinner';
import { Sidebar } from './pages/sidebar/sidebar';
import { location } from './core/routes/config.routes';
import { DeepLinks } from './core/deepLinks';
import { nonPermanentStorage } from './core/storage/non-permanent';
import { endpoint } from './core/endpoints';
import { setAuthCookies } from './pages/sign-in/sign-in.services';
import { PostRefreshResp } from './core/endpoints/index.types';

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

function App() {
  return (
    <Provider store={store}>
      <Router location={location} routes={routes}>
        <DeepLinks />
        <Spinner />
        <Sidebar />
        <Outlet />
      </Router>
    </Provider>
  );
}

export default App;
