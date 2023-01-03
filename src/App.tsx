import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { routes } from './core/routes';

const location = new ReactLocation();

function App() {
  return (
    <Router location={location} routes={routes}>
      <Outlet />
    </Router>
  );
}

export default App;
