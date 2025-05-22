import { DetailedHTMLProps, HTMLAttributes } from "react"
import styles from './Button.module.scss';
import cx from "@/app/util/cx";

type ButtonProps = {
    size?: 'large';
    variant?: 'cta' | 'plain';
    square?: boolean;
};

export default function Button({ children, size, variant, square, ...other }: ButtonProps & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button className={cx(styles, 'button', size, variant ?? 'plain', square && 'square')} {...other}>
        {children}
    </button>
}

export function AnchorButton({ children, size, variant, square, ...other }: ButtonProps & DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    return <a target="_blank" rel="noreferrer" className={cx(styles, 'button', size, variant ?? 'plain', square && 'square')} {...other}>
        {children}
    </a>
}
