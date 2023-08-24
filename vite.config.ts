import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

// https://vitejs.dev/config/
const aliases = {
  '@assets': './src/assets',
  '@atoms': './src/components/atoms',
  '@molecules': './src/components/molecules',
  '@organisms': './src/components/organisms',
  '@templates': './src/components/templates',
  '@constants': './src/constants',
  '@core': './src/core',
  '@dapp': './src/dapp',
  '@hooks': './src/hooks',
  '@pages': './src/pages',
  '@store': './src/store',
  '@styles': './src/styles',
  '@translations': './src/translations',
};

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
  resolve: {
    alias: Object.entries(aliases).map(([key, value]) => ({
      find: key,
      replacement: path.resolve(__dirname, value),
    })),
  },
  envDir: 'environments',
});
