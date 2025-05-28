import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'window', // Define global as window
  },
  plugins: [react(), tsconfigPaths(), wasm(), nodePolyfills()],
  optimizeDeps: { exclude: [`@ionic/pwa-elements/loader`] },
  build: {
    target: 'es2022',
  },
});
