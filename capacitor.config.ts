import { CapacitorConfig } from '@capacitor/cli';

// hostname: 'capacitor',
// hostname: 'android',
// androidScheme: 'native',

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'capacitor.native',
    androidScheme: 'https',
  },
  //   server: {
  //     hostname: 'capacitor',
  //     // androidScheme: 'native',
  //   },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
// ALLOWED_ORIGINS=socious.io,capacitor://socious.io,https://capacitor,native://socious.io,capacitor://localhost,capacitor.native,webapp2.socious.io
