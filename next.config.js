// @ts-check

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/** @type {import("next").NextConfig} */
const baseConfig = {
  reactStrictMode: true,
};

module.exports = (phase) => {
  // ⛔ Não ativa o PWA no desenvolvimento!
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
      disable: false,
    });
    return withPWA(baseConfig);
  }

  // ✅ Em modo dev, retorna config sem PWA
  return baseConfig;
};
