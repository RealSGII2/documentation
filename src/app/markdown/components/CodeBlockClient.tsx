'use client';

import { CodeBlock as CodeBlockPrimitive } from 'react-code-block/shiki';
import { TokensResult } from 'shiki';
import styles from './CodeBlock.module.scss';

export default function CodeBlockClient({ tokens, language }: { tokens: TokensResult, language: string }) {
    return (
        <>
            <div className={styles.header}>
                {language}
            </div>
            <CodeBlockPrimitive tokens={tokens}>
                <CodeBlockPrimitive.Code className={styles.root}>
                    <div className={styles.row}>
                        <CodeBlockPrimitive.LineNumber
                            className={styles.line}
                        />

                        <CodeBlockPrimitive.LineContent
                            className={styles.content}
                        >
                            <CodeBlockPrimitive.Token />
                        </CodeBlockPrimitive.LineContent>
                    </div>
                </CodeBlockPrimitive.Code>
            </CodeBlockPrimitive>
        </>
    );
}
