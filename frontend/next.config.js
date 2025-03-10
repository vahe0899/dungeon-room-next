const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
    reactStrictMode: true,
    output: 'export',
    images: {
        loader: 'custom',
        deviceSizes: [414, 828, 1024, 1440, 1920, 2560, 3840],
    },

    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg)$/i,
            type: 'asset',
            resourceQuery: /url/, // *.svg?url
        });

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            resourceQuery: { not: [/url/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: { removeViewBox: false },
                                    },
                                },
                                'prefixIds',
                            ],
                        },
                        titleProp: true,
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.(glsl|frag|vert)$/,
            use: [require.resolve('@davcri/webpack-glsl-loader'), require.resolve('glslify-loader')],
        });

        return config;
    },
});

module.exports = nextConfig;
