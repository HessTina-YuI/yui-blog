import { visit } from 'unist-util-visit';
// @ts-ignore
import { slug } from 'github-slugger';
import { toString } from 'hast-util-to-string';

export interface ITocAttribute {
    value: string;
    url: string;
    depth: number;
}

const remarkTocHeadings = (options: any) => {
    return (tree: any) =>
        visit(tree, 'heading', (node, index, parent) => {
            const textContent = toString(node);

            const ref: ITocAttribute = {
                value: textContent,
                url: '#' + slug(textContent),
                depth: node.depth
            };

            options.exportRef.push(ref);
        });
};

export default remarkTocHeadings;
