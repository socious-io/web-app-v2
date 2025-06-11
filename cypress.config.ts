import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.VITE_ENV = process.env.VITE_ENV || 'development';
      return config;
    },
    env: {
      VITE_ENV: 'test',
    },
  },
});
