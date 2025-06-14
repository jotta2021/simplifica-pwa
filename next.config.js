/** @type {import("next").NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [],
    };

    config.watchOptions = {
      ignored: ['**/Ambiente de Impressão/**'],
    };

    return config;
  },
};
