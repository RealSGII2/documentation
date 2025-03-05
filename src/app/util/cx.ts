export default function cx(
    styleObject: {
        [index: string | number | symbol]: string;
    },
    ...names: (string | boolean | null | undefined)[]
) {
    const result: string[] = [];

    for (const name of names)
        if (typeof name == 'string') result.push(styleObject[name]);

    return result.filter(x => x).join(' ');
}
