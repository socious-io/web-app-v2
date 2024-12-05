import { CapacitorConfig } from '@capacitor/cli';
// import { Capacitor } from '@capacitor/core';

// function defineHostname() {
//   const platform = Capacitor.getPlatform();
//   return platform === 'ios' || platform === 'android' ? 'socious.io' : 'capacitor.native';
// }

const config: CapacitorConfig = {
  appId: 'jp.socious.network',
  appName: 'Socious',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    hostname: 'app.socious.io',
    androidScheme: 'https',
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
