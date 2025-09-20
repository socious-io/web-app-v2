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
  server: {
    headers: {
      // Allow WebAssembly execution in development
      'Content-Security-Policy':
        "default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob: wasm-unsafe-eval; script-src * 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; worker-src * 'self' blob:;",
    },
  },
  plugins: [react(), tsconfigPaths(), wasm(), nodePolyfills()],
  optimizeDeps: {
    exclude: [
      `@ionic/pwa-elements/loader`,
      // Exclude Midnight packages with WASM and top-level await issues
      '@midnight-ntwrk/onchain-runtime',
    ],
    include: [
      // Force pre-bundling of packages with CommonJS/ESM issues
      '@midnight-ntwrk/compact-runtime',
      '@midnight-ntwrk/midnight-js-indexer-public-data-provider',
      '@midnight-ntwrk/ledger',
    ],
    esbuildOptions: {
      target: 'es2022',
      supported: {
        'top-level-await': true,
      },
    },
  },
  build: {
    target: 'es2022',
  },
});
