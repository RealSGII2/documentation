const LINE_PARSER = /( *)-\s*"(.+?)"\s(.+)/g;

export type TableOfContentsLinkLine = {
    type: 'link';
    label: string;
    href: string;
    children: TableOfContentsLine[];
};

export type RootTableOfContentsLinkLine = TableOfContentsLinkLine & {
    name: string;
}

export type TableOfContentsDividerLine = {
    type: 'divider';
}

export type TableOfContentsLine = TableOfContentsLinkLine | TableOfContentsDividerLine;

export default function parseTOC(table: string) {
    const lines = table.split('\n');
    const rootLine = lines.shift()!;

    const root: RootTableOfContentsLinkLine = {
        type: 'link',
        label: '#root',
        href: rootLine.slice(6),
        children: [],

        name: ''
    };
    let lastParents: TableOfContentsLinkLine[] = [root];

    let lastItem: TableOfContentsLine | null = null;
    let currentIndent = 0;

    for (const line of lines) {
        if (!line.trim().length) continue;

        if (line.trim() == '---') {
            lastParents[0].children.push({
                type: 'divider'
            });

            continue;
        }

        if (line.startsWith('#name ')) {
            (lastParents[0] as RootTableOfContentsLinkLine).name = line.slice(5);
            continue;
        }

        const [[, whitespace = '', label, href]] = [...line.matchAll(LINE_PARSER) ?? []];

        const indent = Math.floor(whitespace.length / 4);

        const item: TableOfContentsLine = {
            type: 'link',
            label,
            href,
            children: [],
        };

        if (indent > currentIndent) {
            if (lastItem) {
                lastParents.push(lastItem);
                lastItem.children.push(item);
            }
        } else {
            if (indent < currentIndent) lastParents = lastParents.slice(0, indent + 1);
            lastParents[lastParents.length - 1].children.push(item);
        }

        currentIndent = indent;
        lastItem = item;
    }

    return root;
} 
