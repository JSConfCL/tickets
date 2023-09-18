/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack'
        },
      ],
    });
    return config;
  }
};

module.exports = nextConfig;
