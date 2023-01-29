import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.6:3000',
    cleartext: true,
  },
};

export default config;
