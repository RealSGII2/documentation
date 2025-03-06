'use client';

import {
    GuidePageContext,
    GuidePageProvider,
} from '@/app/context/GuidePageContext';
import { useMemo, useState } from 'react';
import styles from './page.module.scss';
import Markdown from '../markdown/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
// import { PageMarkdown } from './pageInner';

function splitSections(contents: string) {
    const lines = contents.split('\n');

    const sections = [];

    for (const line of lines) {
        if (line.startsWith('# ')) sections.push('');

        sections[sections.length - 1] += line + '\n';
    }

    return sections;
}

function pullPragma(contents: string) {
    const properties: {
        [index: string]: string;
    } = {};

    for (const line of contents.split('\n')) {
        if (line.startsWith('@')) {
            const [name, value = 'true'] = line.split('=');

            properties[name.slice(1)] = value.trim();
        } else break;
    }

    return properties;
}

export default function PageClient({ contents }: { contents: MDXRemoteSerializeResult; }) {
    const [page, setPage] = useState(-1);
    const guidePage = new GuidePageContext(page, setPage);

    const sections = useMemo(() => splitSections(contents.compiledSource), [contents]);
    const pragmas = useMemo(() => pullPragma(contents.compiledSource), [contents]);

    return (
        <GuidePageProvider value={guidePage}>
            {pragmas['type'] == 'guide' ? (
                <>
                    {/* <Markdown className='docbody' {...markdownProps}>
                        {sections[page + 1]}
                    </Markdown> */}

                    {page > -1 && (
                        <div className={styles.guideActionRow}>
                            <button
                                className={styles.mutedButton}
                                onClick={() => guidePage.home()}
                            >
                                Close guide
                            </button>

                            <div className={styles.spacer} />

                            <button
                                className={styles.mutedButton}
                                onClick={() => guidePage.previous()}
                            >
                                Back
                            </button>
                            {page + 2 < sections.length && (
                                <button
                                    className={styles.ctaButton}
                                    onClick={() => guidePage.next()}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}

                    {/* {page == -2 && (
                        <Markdown className='docbody' {...markdownProps}>
                            {contents}
                        </Markdown>
                    )} */}
                </>
            ) : (
                <article className='docbody'>
                    <Markdown source={contents} />
                </article>
            )}
        </GuidePageProvider>
    );
}
