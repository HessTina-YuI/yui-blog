import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { IBlogAttribute, IFrontMatterAttribute } from '@/lib/mdx';
import Heading from '@/components/markdown/Heading';

interface MDXLayoutRendererProps extends IBlogAttribute {
    prev?: IFrontMatterAttribute | null;
    next?: IFrontMatterAttribute | null;
}

export const MDXComponents = {
    h1: (props: any) => <Heading level="h1" {...props}/>,
    h2: (props: any) => <Heading level="h2" {...props}/>,
    h3: (props: any) => <Heading level="h3" {...props}/>,
    h4: (props: any) => <Heading level="h4" {...props}/>,
    h5: (props: any) => <Heading level="h5" {...props}/>,
    h6: (props: any) => <Heading level="h6" {...props}/>

};

export const MDXLayoutRenderer: React.FC<MDXLayoutRendererProps> = ({ mdxSource, ...rest }) => {
    const MDXLayout = useMemo(() => getMDXComponent(mdxSource),
        [mdxSource]);

    return <MDXLayout components={MDXComponents} {...rest} />;
};
