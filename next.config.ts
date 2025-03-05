import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const DOCS = [
    './src/docs/**/*',
    './docs/**/*'
]

const nextConfig: NextConfig = {
    sassOptions: {
        silenceDeprecations: ["legacy-js-api", "color-functions", "global-builtin"],
    },
    outputFileTracingIncludes: {
        '*': DOCS,
        '/*': DOCS,
        '/\\[module\\]/\\[\\.\\.\\.path\\]': DOCS
    }
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {}
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
