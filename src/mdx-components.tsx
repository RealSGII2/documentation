import type { MDXComponents } from 'mdx/types';
import { Children, ReactElement } from 'react';
import CodeBlock from './app/markdown/components/CodeBlock';
import GuidePicker from './app/markdown/components/GuidePicker';
import Button, { AnchorButton } from './app/markdown/components/Button';
import styles from './app/markdown/general.module.scss';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        
        pre: ({ children }) => {
            const child = Children.only(children) as ReactElement<{
                children: string;
                className: string;
            }>

            return <CodeBlock language={child.props.className.slice(9)}>{child.props.children.trim()}</CodeBlock>;
        },
        guidepicker: () => <GuidePicker  />,
        Step: ({ children }: { children: string; }) => <span className={styles.step}>{children}</span>,
        Button, AnchorButton
    };
}
