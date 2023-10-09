import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { config } from './config';
import App from './App';
import './index.scss';
import FallBack from './pages/fall-back/fall-back';
import { logError } from './pages/fall-back/fall-back.services';
import { datadogRum } from '@datadog/browser-rum';

const VERSION = '7.0.0';

if (config.datadogClientToken && config.datadogAppId) {
  datadogRum.init({
    applicationId: config.datadogAppId,
    clientToken: config.datadogClientToken,
    site: 'datadoghq.com',
    service: 'Socious-Webapp',
    sampleRate: 100,
    trackInteractions: true,
  });

  datadogRum.addRumGlobalContext('env', config.env);
  datadogRum.addRumGlobalContext('version', VERSION);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="version" content={VERSION} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Socious</title>
    </Helmet>
    <ErrorBoundary fallback={<FallBack />} onError={logError}>
      <App />
    </ErrorBoundary>
  </>,
  //   </React.StrictMode>
);
defineCustomElements(window);
