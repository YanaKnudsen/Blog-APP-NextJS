import type { NextConfig } from "next";

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },

};

export default withNextIntl(nextConfig);


