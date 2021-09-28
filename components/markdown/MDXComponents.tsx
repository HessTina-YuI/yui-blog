import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { IBlogAttribute, IFrontMatterAttribute } from '@/lib/mdx';
import HeadingComponents from '@/components/markdown/HeadingComponents';
import CodeComponents from '@/components/markdown/CodeComponents';
import CustomLink from '@/components/Link';

interface MDXLayoutRendererProps extends IBlogAttribute {
    prev?: IFrontMatterAttribute | null;
    next?: IFrontMatterAttribute | null;
}

export const MDXComponents = {
    h1: (props: any) => <HeadingComponents level="h1" {...props}/>,
    h2: (props: any) => <HeadingComponents level="h2" {...props}/>,
    h3: (props: any) => <HeadingComponents level="h3" {...props}/>,
    h4: (props: any) => <HeadingComponents level="h4" {...props}/>,
    h5: (props: any) => <HeadingComponents level="h5" {...props}/>,
    h6: (props: any) => <HeadingComponents level="h6" {...props}/>,
    a: (props: any) => <CustomLink {...props}/>,
    pre: CodeComponents
};

export const MDXLayoutRenderer: React.FC<MDXLayoutRendererProps> = ({ mdxSource, ...rest }) => {
    const MDXLayout = useMemo(() => getMDXComponent(mdxSource),
        [mdxSource]);


    return <MDXLayout components={MDXComponents} {...rest} />;
};
