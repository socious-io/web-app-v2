import { CapacitorConfig } from '@capacitor/cli';
import { Capacitor } from '@capacitor/core';

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
  ios: {
    contentInset: 'always',
  },

  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
