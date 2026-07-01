const withPWA = require('@ducanh2912/next-pwa').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  }
}

module.exports = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
})(nextConfig)
