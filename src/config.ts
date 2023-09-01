export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL_2,
  dappENV: import.meta.env.VITE_DAPP_ENV,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  jpStripePublicKey: import.meta.env.VITE_JP_STRIPE_PUBLIC_KEY,
};
