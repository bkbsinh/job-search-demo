/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    async rewrites() {
      return [
        {
          source: '/_api/:path*',
          destination: 'http://localhost:5000/:path*',
        },
      ]
    },
  }

// export default nextConfig;
