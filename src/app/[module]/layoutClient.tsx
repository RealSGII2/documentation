'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsLine } from '../util/tocParser';
import styles from './layout.module.scss';
import cx from '../util/cx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function PageLink({ data }: { data: TableOfContentsLine }) {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const expandedItems = [
            ...(localStorage.getItem('expandedItems')?.split(',') ?? []),
        ];
        
        setExpanded(expandedItems.includes(data.href));
    }, [data.href])

    return (
        <li
            className={cx(
                styles,
                expanded && 'expanded',
                data.href == pathname && 'selected'
            )}
        >
            <Link href={data.href}>{data.label}</Link>

            {!!data.children.length && (
                <>
                    <button
                        onClick={() => {
                            setExpanded(value => !value);
                            let expandedItems = localStorage
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
                            <path d='M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z'></path>
                        </svg>
                    </button>

                    {expanded && (
                        <ul>
                            {data.children.map(child => (
                                <PageLink data={child} key={data.href} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </li>
    );
}
