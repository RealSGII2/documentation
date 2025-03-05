import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';
import { Literal, Parent } from 'unist';

const regex = /\@(\w+)(\[\w+\])?/g;

const remarkDirective: Plugin<
    [
        {
            components: {
                [index: string]: {
                    datatype: string;
                };
            };
        }
    ]
> = ({ components }) => {
    return tree => {
        const visitor = (node: Parent) => {
            if (node.children[0] && node.children[0].type == 'text') {
                const text = node.children[0] as Literal & {
                    value: string;
                };

                const results = [...text.value.matchAll(regex)];
                const newChildren = [];

                if (!results.length) return;

                for (const result of results) {
                    if (!result || !components[result[1]]) return;

                    const component = components[result[1]];
                    const { datatype } = component;

                    newChildren.push(
                        u(
                            datatype,
                            {
                                data: {
                                    hName: datatype,
                                },
                            },
                            result[2] ? [
                                u('text', {
                                    value: result[2].slice(1, -1)
                                })
                            ] : []
                        ),
                        u('text', {
                            value: text.value.slice(result[0].length)
                        })
                    );
                }

                // node.data = {
                //     hName: 'oldPragma',
                // };

                node.children = newChildren;
            }
        };

        visit(tree, 'paragraph', visitor);
        visit(tree, 'heading', visitor);
    };
};

export default remarkDirective;
