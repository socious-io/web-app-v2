import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import React from 'react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

console.log('version: 6.1.33');



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

defineCustomElements(window);
