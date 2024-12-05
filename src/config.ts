export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  socketURL: import.meta.env.VITE_SOCKET_URL,
  dappENV: import.meta.env.VITE_DAPP_ENV,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  jpStripePublicKey: import.meta.env.VITE_JP_STRIPE_PUBLIC_KEY,
  appBaseURL: import.meta.env.VITE_APP_URL,
  webTokenClientId: import.meta.env.VITE_CLIENT_SECRET_TOKEN_CLIENT_ID,
  webTokenRedirectURL: import.meta.env.VITE_CLIENT_SECRET_TOKEN_REDIRECT_URL,
  logDiscordWebHook: import.meta.env.VITE_LOG_DISCORD_WEBHOOK,
  datadogAppId: import.meta.env.VITE_DATADOG_APP_ID,
  datadogClientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  googleOauthClientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
  googleOauthClientIdAndroid: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID_ANDROID,
  googleOauthClientIdIos: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID_IOS,
  appleOauthClientId: import.meta.env.VITE_APPLE_OAUTH_CLIENT_ID,
  googleRecaptchaSiteKey: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY,
};

export const isTestingEnvironment = config.env === 'test';
