import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'dev.socious.io',
  },
};

export default config;
