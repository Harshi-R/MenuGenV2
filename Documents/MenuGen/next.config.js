/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir is now stable in Next.js 14
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'images.unsplash.com'],
  },
  env: {
    // Environment variables will be added here when needed
  },
}

module.exports = nextConfig 