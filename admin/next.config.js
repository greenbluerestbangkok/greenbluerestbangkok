/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove basePath and assetPrefix for Vercel deployment
  // basePath: '/admin',
  // assetPrefix: '/admin',
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: [
      'raw.githubusercontent.com', 
      'github.com',
      'localhost:1337',
      'your-strapi-domain.com'
    ],
  },
  // Remove rewrites for Vercel deployment
  // async rewrites() {
  //   return [
  //     {
  //       source: '/admin/api/:path*',
  //       destination: '/api/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
