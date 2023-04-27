import { Provider } from 'react-redux';
import { Outlet, Router } from '@tanstack/react-location';
import { routes } from './core/routes/routes';
import store from './store/store';
import { Spinner } from './components/atoms/spinner/spinner';
import { Sidebar } from './pages/sidebar/sidebar';
import { location } from './core/routes/config.routes';
import { DeepLinks } from './core/deepLinks';

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
