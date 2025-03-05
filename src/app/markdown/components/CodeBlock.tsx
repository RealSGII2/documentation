import { BundledLanguage, codeToTokens } from 'shiki';
import { ReactNode } from 'react';
import CodeBlockClient from './CodeBlockClient';
import styles from './CodeBlock.module.scss';

export default async function CodeBlock({
    children: code,
    language,
}: // language,
{
    children?: ReactNode;
    language: string;
}) {
    console.log(code?.toString());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { grammarState: _, ...tokens } = await codeToTokens(String(code), {
        // lang: language as BundledLanguage,
        lang: language as BundledLanguage,
        theme: 'github-light',
    });

    return (
        <div className={styles.wrapper}>
            <CodeBlockClient tokens={tokens} language={language} />
        </div>
    );
}
