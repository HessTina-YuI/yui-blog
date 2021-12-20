const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    images: {
        domains: ['assets.vercel.com', 'avatars.githubusercontent.com', 'cdn.jsdelivr.net'],
        formats: ['image/avif', 'image/webp']
    },
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config, { dev, isServer }) => {
        // config.module.rules.push({
        //     test: /\.(png|jpe?g|gif|mp4)$/i,
        //     use: [
        //         {
        //             loader: 'file-loader',
        //             options: {
        //                 publicPath: '/_next',
        //                 name: 'static/media/[name].[hash].[ext]'
        //             }
        //         }
        //     ]
        // });

        if (!dev && !isServer) {
            // Replace React with Preact only in client production build
            Object.assign(config.resolve.alias, {
                'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            });
        }

        return config;
    }
});
