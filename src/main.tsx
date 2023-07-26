import { defineCustomElements } from '@ionic/pwa-elements/loader';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

console.log('version: 6.1.31');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <App />
  //   </React.StrictMode>
);

defineCustomElements(window);
