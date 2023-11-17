/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.lichviet.org"],
  },
  env: {
    API_URL: 'http://test.api.lichviet.org/json/api/organizations',
  },
};

module.exports = nextConfig;
