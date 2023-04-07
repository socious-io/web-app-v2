import { Capacitor } from '@capacitor/core';
import { CapacitorConfig } from '@capacitor/cli';

function defineHostname() {
  return Capacitor.getPlatform() === 'ios' ? 'socious.io' : 'capacitor.native';
}

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: defineHostname(),
    androidScheme: 'https',
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
