import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    env: {
      VITE_ENV: 'test',
    },
    supportFile: 'cypress/support/e2e.ts',
  },
});
