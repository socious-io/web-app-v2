import { Provider } from 'react-redux';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { routes } from './core/routes';
import store from './store/store';
import { Menu } from './design-system/pages/menu/menu';

const location = new ReactLocation();

function App() {
  return (
    <Provider store={store}>

      <Router location={location} routes={routes}>
        <Menu />
        <Outlet />
      </Router>
    </Provider>
  );
}

export default App;
