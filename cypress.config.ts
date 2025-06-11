import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.api_server = process.env.VITE_BASE_URL;
      config.env.app_url = process.env.VITE_APP_URL;

      return config;
    },
  },
});
