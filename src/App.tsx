import { Provider } from 'react-redux';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { routes } from './core/routes';
import store from './store/store';
import { Menu } from './pages/menu/menu';
import { Spinner } from './components/atoms/spinner/spinner';
import { hapticsImpactMedium } from './core/haptic/haptic';

const location = new ReactLocation();
hapticsImpactMedium();

function App() {
  return (
    <Provider store={store}>
      <Router location={location} routes={routes}>
        <Spinner />
        <Menu />
        <Outlet />
      </Router>
    </Provider>
  );
}

export default App;
