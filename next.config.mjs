/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/page/:page(\\d+)',
        destination: '/blog/page/:page',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
    ],
  },
}

export default nextConfig
