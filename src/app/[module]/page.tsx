// import Markdown from 'react-markdown'
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { notFound } from 'next/navigation';
import Markdown from '../markdown/Markdown';

type DocPageParams = Promise<{ module: string; }>;

async function pullContents(params: DocPageParams) {
    const { module: moduleName } = await params;
    // const pagePath = normalize(
    //     `${process.cwd()}/src/docs/${moduleName}/index.mdx`
    // );

    const pagePath = join(process.cwd(), 'src', 'docs', moduleName, 'index.mdx');

    if (!existsSync(pagePath)) return notFound();

    return (await readFile(pagePath)).toString();
}

export default async function DocPage({ params }: { params: DocPageParams }) {
    // return <p dangerouslySetInnerHTML={{
    //     __html: (await generateStaticParams()).map(x => x.module).join("<br/><br/>")
    // }} />

    const pageContents = await pullContents(params);
    return <article className='docbody'>
        <Markdown source={pageContents} />
    </article>
}

export async function generateStaticParams() {
    const data = await readdir(join(process.cwd(), 'src', 'docs'), {
        'withFileTypes': true
    })

    return data
        .filter(x => x.isDirectory())
        .map(x => ({
            module: x.name
        }))
}
