import { ReactNode } from 'react';
import styles from './layout.module.scss';
import '@/app/util/tocParser'
import parseTOC from '@/app/util/tocParser';
import { readFile } from 'fs/promises';
import { normalize } from 'path';
import { PageLink } from './layoutClient';

export default async function ModuleLayout({ children, params }: { children: ReactNode, params: Promise<{
    module: string;
}> }) {
    const { module: moduleName } = await params
    const rootPage = parseTOC((await readFile(normalize(`${process.cwd()}/src/docs/${moduleName}/SUMMARY.toc`))).toString())

    return (
        <div className={styles.root}>
            <aside>
                <ul className={styles.pageList}>
                    {rootPage.children.map(x => <PageLink data={x} key={x.href} />)}
                </ul>
            </aside>
            <main>{children}</main>
            <aside></aside>
        </div>
    );
}
