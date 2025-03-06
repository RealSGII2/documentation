'use client';

import { useMDXComponents } from '@/mdx-components';
// import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from './MDXRemotePatch';

export default function Markdown({ source }: { source: MDXRemoteSerializeResult }) {
    return <MDXRemote {...source} components={useMDXComponents({})} />;
}
