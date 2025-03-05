import { readdir, readFile } from 'fs/promises';
import { join, normalize } from 'path';
import { existsSync } from 'fs';
import { notFound } from 'next/navigation';
import PageClient from './pageClient';

type DocPageParams = Promise<{ module: string; path: string[] }>;

async function pullContents(params: DocPageParams) {
    const { module: moduleName, path: docPath } = await params;
    // const pagePath = normalize(
    //     `${process.cwd()}/src/docs/${moduleName}/${docPath.join('/')}.mdx`
    // );

    const pagePath = join(
        process.cwd(),
        'src',
        'docs',
        moduleName,
        ...docPath.slice(0, -1),
        docPath[docPath.length - 1] + '.mdx'
    );

    if (!existsSync(pagePath)) return notFound();

    return (await readFile(pagePath)).toString();
}

export default async function DocPage({ params }: { params: DocPageParams }) {
    // const paths = generateStaticParams();

    // return (
    //     <p
    //         dangerouslySetInnerHTML={{
    //             __html: (await paths())
    //                 .map(x => `${x.module}:${x.path.join('/')}`)
    //                 .join('<br/><br/>'),
    //         }}
    //     ></p>
    // );

    const pageContents = await pullContents(params);
    return <PageClient contents={pageContents} />;
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
            const parentBits = parent.replace(/\\/g, '/').split('/').slice(1);

            return {
                module: normalize(parentBits.shift() ?? ''),
                path: join(...parentBits, x.name.replace('.mdx', ''))
                    .replace(/\\/g, '/')
                    .split('/'),
            };
        });
}
