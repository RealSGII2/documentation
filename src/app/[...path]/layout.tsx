import { ReactNode } from 'react';
import styles from './layout.module.scss';
import '@/app/util/tocParser';
import parseTOC from '@/app/util/tocParser';
import { readFile } from 'fs/promises';
import { normalize } from 'path';
import { PageLink } from './layoutClient';
import { unstable_cache } from 'next/cache';
import Appbar from '../appbar';

export default async function ModuleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{
        path: string[];
    }>;
}) {
    const { path: rawPath } = await params;

    const rootPage = await unstable_cache(
        async () =>
            parseTOC(
                (
                    await readFile(
                        normalize(
                            `${process.cwd()}/src/docs/${
                                rawPath[0]
                            }/SUMMARY.toc`
                        )
                    )
                ).toString()
            ),
        [rawPath[0]]
    )();

    return (
        <>
            <Appbar title={rootPage.name} />

            <div className={styles.root}>
                <aside>
                    <ul className={styles.pageList}>
                        {rootPage.children.map((x, i) =>
                            x.type == 'link' ? (
                                <PageLink data={x} key={x.href} />
                            ) : (
                                <hr key={i} />
                            )
                        )}
                    </ul>
                </aside>
                <main>{children}</main>
                <aside></aside>
            </div>
        </>
    );
}
