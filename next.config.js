const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  i18n,
  serverRuntimeConfig: {
    access_token_private_key: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    access_token_public_key: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    access_token_sign_options: { expiresIn: '15m', algorithm: 'RS256' },
    refresh_token_private_key: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refresh_token_public_key: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    refresh_token_sign_options: { expiresIn: '1y', algorithm: 'RS256' },
    mongo_uri: process.env.MONGO_URI,
    log_level: 'info',
  },
};
