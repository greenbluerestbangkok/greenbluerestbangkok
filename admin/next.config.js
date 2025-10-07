/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove basePath for standalone admin panel
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
      'gmdvkegcejrbrobtrhfm.supabase.co'
    ],
  },
};

module.exports = nextConfig;
