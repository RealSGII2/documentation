'use client';

import styles from './layout.module.scss';
import Logo from '../docs/logo';
import * as ProductPicker from './components/docs/ProductPicker';
import ProductPopover from '../docs/popover';
import { ReactNode } from 'react';
import Button from './markdown/components/Button';
import cx from './util/cx';
import useBreakpoint from './hooks/useBreakpoint';

export default function Appbar({
    title,
    onButtonClick,
}: {
    title: ReactNode;
    onButtonClick: () => void;
}) {
    const isMobile = useBreakpoint(1000);

    return (
        <nav className={styles.appbar}>
            {isMobile && <Button square style={{ marginRight: 12 }} onClick={onButtonClick}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    width='16'
                    height='16'
                >
                    <path
                        fill='currentcolor'
                        d='M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z'
                    ></path>
                </svg>
            </Button>}

            <Logo />

            {!isMobile && (
                <ProductPicker.Root>
                    <ProductPicker.Trigger asChild>
                        <button className={styles.pickerButton}>
                            <h1>
                                <span className={styles.appbarName}>
                                    {title}
                                </span>
                            </h1>

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
                    </ProductPicker.Trigger>

                    <ProductPicker.Anchor />

                    <ProductPicker.Content align='center' sideOffset={16}>
                        <ProductPopover />
                    </ProductPicker.Content>
                </ProductPicker.Root>
            )}
        </nav>
    );
}

export function MobileNavAppbar({
    title,
    onButtonClick,
}: {
    title: ReactNode;
    onButtonClick: () => void;
}) {
    return (
        <nav className={cx(styles, 'appbar', 'mobile')}>
            <Button square onClick={onButtonClick}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    width='20'
                    height='20'
                >
                    <path fill='currentcolor' d='M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z'></path>
                </svg>
            </Button>

            <ProductPicker.Root>
                <ProductPicker.Trigger asChild>
                    <button className={styles.pickerButton}>
                        <h1>
                            <span className={styles.appbarName}>{title}</span>
                        </h1>

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
                </ProductPicker.Trigger>

                <ProductPicker.Anchor />

                <ProductPicker.Content align='center' sideOffset={16}>
                    <ProductPopover />
                </ProductPicker.Content>
            </ProductPicker.Root>
        </nav>
    );
}
