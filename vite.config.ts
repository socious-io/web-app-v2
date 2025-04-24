import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: { exclude: [`@ionic/pwa-elements/loader`] },
});
