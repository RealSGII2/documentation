import { Components, Options } from 'react-markdown';
import CodeBlock from './components/CodeBlock';
import { Children, ReactElement } from 'react';
import remarkPragma from './plugins/remarkPragma';
import remarkDirective from './plugins/remarkDirective';
import GuidePicker from './components/GuidePicker';
import styles from './general.module.scss'
import Button from './components/Button';

const markdownProps = {
    components: {
        pre: ({ children }) => {
            const child = Children.only(children) as ReactElement<{
                children: string;
                className: string;
            }>

            return <CodeBlock language={child.props.className.slice(9)}>{child.props.children.trim()}</CodeBlock>;
        },
        guidepicker: () => <GuidePicker  />,
        step: ({ children }: { children: string; }) => <span className={styles.step}>{children}</span>,
        Button: Button
    } as Components & object,
    remarkPlugins: [
        // [remarkFrontmatter, ['yaml']],
        remarkPragma,
        [remarkDirective, {
            'components': {
                guidepicker: {
                    datatype: 'guidepicker'
                },
                step: {
                    datatype: 'step'
                }
            }
        }]
    ]
} satisfies Options;

export default markdownProps;
