/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // domains: ['your-image-cdn.com'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig