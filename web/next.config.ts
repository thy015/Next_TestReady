import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig
