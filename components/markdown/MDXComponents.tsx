import React, { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { IBlogAttribute, IFrontMatterAttribute } from '@/lib/mdx';
import HeadingComponents from '@/components/markdown/HeadingComponents';
import CodeComponents from '@/components/markdown/CodeComponents';
import CustomLink from '@/components/Link';
import GithubComponents from '@/components/markdown/GithubComponents';

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
    code: (props: any) => {
        const name: string[] = props.className ? props.className.split(' ') : [];

        let language: string | null = null;
        for (const temp of name) {
            if (temp.indexOf('language-') != -1) {
                language = temp.split('language-')[1];
            }
        }

        if (!language) {
            return <></>;
        }

        if (language === 'github') {
            return <GithubComponents {...props}/>;
        }

        return <CodeComponents language={language} {...props}/>;
    }
};

export const MDXLayoutRenderer: React.FC<MDXLayoutRendererProps> = ({ mdxSource, ...rest }) => {
    const MDXLayout = useMemo(() => getMDXComponent(mdxSource),
        [mdxSource]);


    return <MDXLayout components={MDXComponents} {...rest} />;
};
