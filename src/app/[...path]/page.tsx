import { readdir, readFile } from 'fs/promises';
import { join, normalize } from 'path';
import { existsSync } from 'fs';
import { notFound } from 'next/navigation';
import PageClient from './pageClient';
import { serialize } from 'next-mdx-remote/serialize';

type DocPageParams = Promise<{ path: string[] }>;

async function pullContents(params: DocPageParams) {
    const { path } = await params;

    const basePath = join(process.cwd(), 'src', 'docs', ...path.slice(0, -1));
    let pagePath = join(basePath, path[path.length - 1] + '.mdx');

    if (!existsSync(pagePath))
        pagePath = join(basePath, path[path.length - 1], 'index.mdx');

    if (!existsSync(pagePath)) return notFound();

    return (await readFile(pagePath)).toString();
}

export default async function DocPage({ params }: { params: DocPageParams }) {
    const pageContents = await pullContents(params);
    return <PageClient contents={await serialize(pageContents)} />;
}

export async function generateStaticParams() {
    const data = await readdir(join(process.cwd(), 'src', 'docs'), {
        recursive: true,
        withFileTypes: true,
    });

    return data
        .filter(x => x.isFile())
        .filter(x => x.name.endsWith('.mdx'))
        .filter(x => x.name !== 'index.mdx')
        .map(x => {
            const parent = x.parentPath.slice(
                process.cwd().length + '/src/docs'.length
            );
            const parentBits = parent.replace(/\\/g, '/').split('/');

            return {
                module: normalize(parentBits.shift() ?? ''),
                path: join(...parentBits, x.name.replace('.mdx', ''))
                    .replace(/\\/g, '/')
                    .split('/'),
            };
        });
}
