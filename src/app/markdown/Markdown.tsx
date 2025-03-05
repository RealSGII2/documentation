import { useMDXComponents } from '@/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function Markdown({ source }: { source: string }) {
    return <MDXRemote source={source} components={useMDXComponents({})} />;
}
