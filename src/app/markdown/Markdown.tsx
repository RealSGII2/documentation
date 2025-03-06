import { useMDXComponents } from '@/mdx-components';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function Markdown({ source }: { source: MDXRemoteSerializeResult }) {
    return <MDXRemote {...source} components={useMDXComponents({})} />;
}
