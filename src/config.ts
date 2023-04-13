export const config = {
  env: import.meta.env.VITE_ENV ?? 'development',
  baseURL: import.meta.env.VITE_BASE_URL ?? 'https://dev.socious.io/api/v2',
};
