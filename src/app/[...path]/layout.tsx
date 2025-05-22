import { ReactNode } from 'react';
// import styles from './layout.module.scss';
import '@/app/util/tocParser';
import parseTOC from '@/app/util/tocParser';
import { readFile } from 'fs/promises';
import { normalize } from 'path';
import Root from './layoutClient';
import { unstable_cache } from 'next/cache';
// import Appbar from '../appbar';

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
            <Root rootPage={rootPage}>
                {children}
            </Root>
            {/* <Appbar title={rootPage.name} />

            <div className={styles.root}>
                <PageNavAside rootPage={rootPage} />

                <div className={styles.scrim} />

                <main>{children}</main>
                <aside>
                    <p>
                        (table of contents here)
                    </p>
                </aside>
            </div> */}
        </>
    );
}
