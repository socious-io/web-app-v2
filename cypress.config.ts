import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.VITE_ENV = process.env.VITE_ENV || 'development';
      return config;
    },
    env: {
      VITE_ENV: 'test',
    },
    supportFile: 'cypress/support/e2e.ts',
  },
});
