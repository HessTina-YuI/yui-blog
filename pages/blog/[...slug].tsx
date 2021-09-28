import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
    getFiles,
    IBlogAttribute,
    IFrontMatterAttribute
} from '@/lib/mdx';
import { MDXLayoutRenderer } from '@/components/markdown/MDXComponents';
import PostLayout from '@/layouts/PostLayout';
import React, { useEffect, useState } from 'react';
import TOCComponent from '@/components/markdown/TOCComponent';

interface BlogProps {
    post: IBlogAttribute;
    prev: IFrontMatterAttribute;
    next: IFrontMatterAttribute;
}

interface StaticProps {
    slug: string;
}

const Blog: NextPage<BlogProps> = ({ post, prev, next }) => {

    const { mdxSource, toc, frontMatter } = post;

    const [stylesItem, setStylesItem] = useState('');

    useEffect(() => {
        setStylesItem('footnote-back');
    }, []);

    useEffect(() => {
        if (stylesItem) {
            const items = document.querySelectorAll(`.${stylesItem}`);
            items.forEach((val) => {
                val.innerHTML = '←';
            });
        }
    }, [stylesItem]);

    return (
        <PostLayout>
            <div className="w-full bg-fixed bg-cover bg-center"
                 style={{ height: '60vh', backgroundImage: `url(/static/images/2021-02-25-01.jpg)` }}/>
            <div className="w-full py-10 flex justify-center bg-gray-100">
                <article className="w-3/5 prose">
                    <MDXLayoutRenderer
                        toc={toc}
                        mdxSource={mdxSource}
                        frontMatter={frontMatter}
                        prev={prev}
                        next={next}/>
                </article>
                <div className="ml-12 relative">
                    <TOCComponent
                        className="overflow-y-scroll sticky top-0 hidden lg:block no-scroll-theme"
                        toc={toc}
                        frontMatter={frontMatter}/>
                </div>
            </div>
        </PostLayout>
    );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getFiles('blog');

    return {
        paths: posts.map((post: string) => {
            return {
                params: {
                    slug: formatSlug(post).split('/')
                }
            };
        }),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const allPosts = await getAllFilesFrontMatter('blog');

    // @ts-ignore
    const postIndex = allPosts.findIndex((post: StaticProps) => formatSlug(post.slug) === params.slug.join('/'));
    const prev = allPosts[postIndex + 1] || null;
    const next = allPosts[postIndex - 1] || null;
    // @ts-ignore
    const post = await getFileBySlug('blog', params.slug.join('/'));

    return {
        props: { post, prev, next }
    };
};
