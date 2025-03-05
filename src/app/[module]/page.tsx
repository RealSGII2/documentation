// import Markdown from 'react-markdown'
import { readFile } from 'fs/promises';
import { normalize } from 'path';
import { existsSync } from 'fs';
import { notFound } from 'next/navigation';
import Markdown from '../markdown/Markdown';

type DocPageParams = Promise<{ module: string; }>;

async function pullContents(params: DocPageParams) {
    const { module: moduleName } = await params;
    const pagePath = normalize(
        `${process.cwd()}/docs/${moduleName}/index.mdx`
    );

    if (!existsSync(pagePath)) return notFound();

    return (await readFile(pagePath)).toString();
}

export default async function DocPage({ params }: { params: DocPageParams }) {
    const pageContents = await pullContents(params);
    return <article className='docbody'>
        <Markdown source={pageContents} />
    </article>
    // return <Markdown className='docbody' {...markdownProps}>{pageContents}</Markdown>;
    // return <pre><code>{pageContents}</code></pre>
}
