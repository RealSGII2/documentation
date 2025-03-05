import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
// import { u } from 'unist-builder';
import { Literal, Parent } from 'unist';

const regex = /\@\w+=\w+/g;

const remarkPragma: Plugin = () => {
	return (tree) => {
		visit(tree, 'paragraph', (node: Parent, _: number, parent: Parent) => {
			if (node.children[0] && node.children[0].type == 'text') {
				const text = node.children[0] as Literal & {
                    value: string;
                };
				
				const results = [...(text.value.matchAll(regex))];

				if (!results.length) return;

                delete parent.children[parent.children.indexOf(node)];
                parent.children = parent.children.filter(x => x)

				// for (const result of results) {
				// 	if (!result || !result[2]) return;

				// 	newChildren.push(
				// 		u(
				// 			'workflow',
				// 			{
				// 				data: {
				// 					hName: 'workflow',
				// 					hProperties: {
				// 						href: result[1],
				// 					},
				// 				},
				// 			},
				// 			[
				// 				u('text', {
				// 					value: result[2],
				// 				}),
				// 			]
				// 		)
				// 	);
				// }

				// node.data = {
				// 	hName: 'oldPragma'
				// }

				// node.children = newChildren;
			}
		});
	};
};

export default remarkPragma;