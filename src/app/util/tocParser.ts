const LINE_PARSER = /( *)-\s*"(.+?)"\s(.+)/g;

export type TableOfContentsLine = {
    label: string;
    href: string;
    children: TableOfContentsLine[];
};

export default function parseTOC(table: string) {
    const lines = table.split('\n');
    const rootLine = lines.shift()!;

    const root: TableOfContentsLine = {
        label: '#root',
        href: rootLine.slice(6),
        children: [],
    };
    let lastParents: TableOfContentsLine[] = [root];

    let lastItem: TableOfContentsLine | null = null;
    let currentIndent = 0;

    for (const line of lines) {
        const [[, whitespace = '', label, href]] = [...line.matchAll(LINE_PARSER) ?? []];

        const indent = Math.floor(whitespace.length / 4);

        const item: TableOfContentsLine = {
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

    return root
}
