import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@splinetool/react-spline/next': path.join(rootDir, 'node_modules/@splinetool/react-spline/dist/react-spline.js'),
      '@splinetool/react-spline': path.join(rootDir, 'node_modules/@splinetool/react-spline/dist/react-spline.js'),
    }

    return config
  },
}

export default nextConfig
