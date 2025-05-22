'use client';

import { ReactNode, useEffect, useState } from 'react';
import {
    RootTableOfContentsLinkLine,
    TableOfContentsLinkLine,
} from '../util/tocParser';
import styles from './layout.module.scss';
import cx from '../util/cx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Appbar, { MobileNavAppbar } from '../appbar';
import useBreakpoint from '../hooks/useBreakpoint';

export function PageLink({ data }: { data: TableOfContentsLinkLine }) {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    let linkProps = {};

    if (data.href.startsWith('newtab:'))
        linkProps = {
            rel: 'noreferrer',
            target: '_blank',
        };

    useEffect(() => {
        const expandedItems = [
            ...(localStorage.getItem('expandedItems')?.split(',') ?? []),
        ];

        setExpanded(expandedItems.includes(data.href));
    }, [data.href]);

    return (
        <li
            className={cx(
                styles,
                expanded && 'expanded',
                data.href == pathname && 'selected'
            )}
        >
            <Link href={data.href.replace('newtab:', '')} {...linkProps}>
                {data.label}
            </Link>

            {!!data.children.length && (
                <>
                    <button
                        onClick={() => {
                            setExpanded(value => !value);
                            let expandedItems =
                                localStorage
                                    .getItem('expandedItems')
                                    ?.split(',') ?? [];

                            if (expanded)
                                expandedItems = expandedItems.filter(
                                    x => x != data.href
                                );
                            else expandedItems.push(data.href);

                            console.log(expandedItems);

                            localStorage.setItem(
                                'expandedItems',
                                expandedItems.join(',')
                            );
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 16 16'
                            width='16'
                            height='16'
                        >
                            <path
                                fill='currentcolor'
                                d='M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z'
                            ></path>
                        </svg>
                    </button>

                    {expanded && (
                        <ul>
                            {data.children
                                .filter(x => x.type == 'link')
                                .map(child => (
                                    <PageLink data={child} key={child.href} />
                                ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    );
}

export function PageNavAside({
    rootPage,
    onButtonClick
}: {
    rootPage: RootTableOfContentsLinkLine;
    onButtonClick: () => void;
}) {
    const isMobile = useBreakpoint(1000);

    return (
        <aside>
            {isMobile && <MobileNavAppbar title={rootPage.name} onButtonClick={onButtonClick} />}

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
    );
}

export default function Root({
    rootPage,
    children,
}: {
    rootPage: RootTableOfContentsLinkLine;
    children: ReactNode;
}) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <Appbar title={rootPage.name} onButtonClick={() => setMenuOpen(true)} />

            <div className={cx(styles, 'root', menuOpen && 'menuOpen')}>
                <PageNavAside rootPage={rootPage} onButtonClick={() => setMenuOpen(false)} />

                <div className={styles.scrim} onClick={() => setMenuOpen(false)} />

                <main>{children}</main>
                <aside>
                    {/* <p>(table of contents here)</p> */}
                </aside>
            </div>
        </>
    );
}
