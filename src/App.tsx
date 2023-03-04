import { Provider } from 'react-redux';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { routes } from './core/routes';
import store from './store/store';
import { Spinner } from './components/atoms/spinner/spinner';
import { Sidebar } from './pages/sidebar/sidebar';

const location = new ReactLocation();

function App() {
  return (
    <Provider store={store}>
      <Router location={location} routes={routes}>
        <Spinner />
        <Sidebar />
        <Outlet />
      </Router>
    </Provider>
  );
}

export default App;
