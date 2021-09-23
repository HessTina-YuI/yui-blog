import { visit } from 'unist-util-visit';

enum DirectorEnum {
    none = 'remark-director',
    info = 'remark-director remark-director-info',
    warning = 'remark-director remark-director-warning',
    error = 'remark-director remark-director-error'
}

const remarkCustomDirector = (options: any) => {
    return (tree: any) =>
        visit(tree, 'containerDirective', (node, index, parent) => {
            const name = node.name;

            const titleNode = {
                type: 'mdxJsxFlowElement',
                name: 'div',
                attributes: [{
                    type: 'mdxJsxAttribute',
                    name: 'className',
                    value: "remark-director-title"
                }],
                children: [{ type: 'text', value: name.toUpperCase() }],
                data: { _xdmExplicitJsx: true }
            };

            const newNode = {
                type: 'mdxJsxFlowElement',
                name: 'div',
                attributes: [{
                    type: 'mdxJsxAttribute',
                    name: 'className',
                    // @ts-ignore
                    value: DirectorEnum[name] ?? DirectorEnum.none
                }],
                data: { _xdmExplicitJsx: true },
                // children: node.children
                children: [titleNode, ...node.children]
            };

            index ? tree.children[index] = newNode : null;
        });
};

export default remarkCustomDirector;
