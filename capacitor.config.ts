import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'socious.io',
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
