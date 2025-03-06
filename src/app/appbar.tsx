import styles from './layout.module.scss';
import Logo from '../docs/logo';
import * as ProductPicker from './components/docs/ProductPicker';
import ProductPopover from '../docs/popover';
import { ReactNode } from 'react';

export default function Appbar({ title }: { title: ReactNode; }) {
    return (
        <nav className={styles.appbar}>
            <Logo />

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
