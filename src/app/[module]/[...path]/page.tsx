import { readFile } from 'fs/promises';
import { normalize } from 'path';
import { existsSync } from 'fs';
import { notFound } from 'next/navigation';
import PageClient from './pageClient';

type DocPageParams = Promise<{ module: string; path: string[] }>;

async function pullContents(params: DocPageParams) {
    const { module: moduleName, path: docPath } = await params;
    const pagePath = normalize(
        `${process.cwd()}/docs/${moduleName}/${docPath.join('/')}.mdx`
    );

    if (!existsSync(pagePath)) return notFound();

    return (await readFile(pagePath)).toString();
}

export default async function DocPage({ params }: { params: DocPageParams }) {
    const pageContents = await pullContents(params);
    return <PageClient contents={pageContents} />;
}
