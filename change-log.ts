import { defineConfig, loadEnv } from 'vite';
console.log('evn: ', defineConfig);

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  console.log('evn: ', env);
  return {
    // vite config
  };
});
