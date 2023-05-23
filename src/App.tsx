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

async function onInit() {
  const refresh_token = await nonPermanentStorage.get('refresh_token');
  if (refresh_token) {
    const newAuth = await endpoint.post.auth.refresh({ refresh_token });
    await setAuthCookies(newAuth);
    return true;
  }
  return true;
}

onInit();
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
