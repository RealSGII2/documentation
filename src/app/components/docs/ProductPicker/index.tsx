'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

export function Product({
    children,
    href,
}: {
    children?: ReactNode;
    href: string;
}) {
    return (
        <Link className={styles.product} href={href}>
            {children}
        </Link>
    );
}

export function Content({
    children,
    ...props
}: PopoverPrimitive.PopoverContentProps) {
    return (
        <AnimatePresence>
            <PopoverPrimitive.Content
                {...props}
                asChild
                className={styles.content}
            >
                <motion.div exit={{ opacity: 0 }}>{children}</motion.div>
            </PopoverPrimitive.Content>
        </AnimatePresence>
    );
}

export { Root, Trigger, Anchor, Portal } from '@radix-ui/react-popover';
