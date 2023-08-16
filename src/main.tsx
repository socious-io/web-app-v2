import { defineCustomElements } from '@ionic/pwa-elements/loader'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet'
import App from './App'
import './index.scss'

console.log('version: 6.1.30')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //   <React.StrictMode>
  <>
    <Helmet>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Socious</title>
    </Helmet>
    <App />
  </>
  //   </React.StrictMode>
)
defineCustomElements(window)
