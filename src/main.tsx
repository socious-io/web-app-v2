import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { init } from 'src/core/datadog';

import App from './App';
import './index.scss';
import FallBack from './pages/error/fallback/fallback';
import { logError } from './pages/error/fallback/fallback.services';

const VERSION = '7.0.0';
init(VERSION);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="version" content={VERSION} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <title>{'Socious'}</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <App />
    </ErrorBoundary>
  </>,
);
defineCustomElements(window);
