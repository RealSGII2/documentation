import createMDX from '@next/mdx';
import { readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import type { NextConfig } from 'next';
import { join, normalize } from 'path';

const DOCS = [
    './src/docs/**/*',
    './docs/**/*'
]

function getIncludePaths() {
    const data = readdirSync(join(process.cwd(), 'src', 'docs'), {
        recursive: true,
        withFileTypes: true,
    });

    return data
        .filter(x => x.isFile())
        .filter(x => x.name.endsWith('.mdx'))
        .map(x => {
            return {
                docpath: normalize(
                    '.' + x.parentPath.replace(process.cwd(), '') + '/' + x.name
                ),
                route: '/' + x.parentPath.replace(process.cwd(), '').replace(/\\/g, '/').split('/').slice(3).join('/') + '/' + x.name.replace('.mdx', ''),
            };
        });
}

function config(): NextConfig {
    return {
        sassOptions: {
            silenceDeprecations: ["legacy-js-api", "color-functions", "global-builtin"],
        },
        // Object.fromEntries(getIncludePaths().map(x => [x.route, [x.docpath]]))
        outputFileTracingRoot: __dirname,
        outputFileTracingIncludes: {
            '/': [
                './src/docs/temperatures/index.mdx'
            ],
            ...Object.fromEntries(getIncludePaths().map(x => [x.route, [x.docpath]]))
        },
    };
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {}
});

// Merge MDX config with Next.js config
export default withMDX(config());
