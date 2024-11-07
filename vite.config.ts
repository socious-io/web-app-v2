import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    wasm(),
    topLevelAwait(),
    nodePolyfills({
      globals: { Buffer: true, global: true },
      protocolImports: true,
    }),
  ],
  define: {
    global: 'globalThis',
  },

  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`, `@syntect/wasm`],
  },
});
