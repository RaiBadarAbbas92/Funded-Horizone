let userConfig;
try {
  userConfig = await import('./v0-user-next.config');
} catch (e) {
  // Ignore error if the user config file doesn't exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Heroku and similar deployments
  reactStrictMode: true, // Helps catch React issues
  trailingSlash: true, // Ensures correct static export behavior
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  compress: true, // Enables gzip and brotli compression
  images: {
    unoptimized: false, // Enables Next.js image optimizations
    formats: ['image/avif', 'image/webp'], // Faster image formats
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
        },
      ],
    },
  ],
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

// Merge user configuration if it exists
if (userConfig) {
  for (const key in userConfig) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      nextConfig[key] = { ...nextConfig[key], ...userConfig[key] };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
