import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import {
    formatSlug,
    getAllFilesFrontMatter,
    getFileBySlug,
    getFiles,
    IBlogAttribute,
    IFrontMatterAttribute
} from '@/lib/mdx';
import PostLayout from '@/layouts/PostLayout';
import { MDXLayoutRenderer } from '@/components/markdown/MDXComponents';
import TOCComponent from '@/components/markdown/TOCComponent';
import Image from '@/components/Image';

interface BlogProps {
    post: IBlogAttribute;
    prev: IFrontMatterAttribute;
    next: IFrontMatterAttribute;
}

interface StaticProps {
    slug: string;
}

const Blog: NextPage<BlogProps> = ({ post, prev, next }) => {

    const el = useRef<HTMLDivElement>(null);
    const typed = useRef<Typed>(null);

    const { mdxSource, toc, frontMatter } = post;

    const [loadFinish, setLoadFinish] = useState('');

    useEffect(() => {
        const options = {
            strings: [post.frontMatter.title],
            typeSpeed: 100,
            backSpeed: 50,
            shuffle: true,
            loop: true
        };

        // @ts-ignore
        typed.current = new Typed(el.current, options);
        return () => {
            // @ts-ignore
            typed.current.destroy();
        };
    }, [post.frontMatter.title]);

    useEffect(() => {
        setLoadFinish('footnote-back');
    }, []);

    useEffect(() => {
        if (loadFinish) {
            const items = document.querySelectorAll(`.${loadFinish}`);
            items.forEach((val) => {
                val.innerHTML = '←';
            });
        }
    }, [loadFinish]);

    return (
        <PostLayout>
            <div className="w-full sticky top-0 bg-cover flex justify-center items-center"
                // @ts-ignore
                 style={{ height: '60vh', zIndex: '-10' }}>
                <Image src={post.frontMatter.hero ?? ''} alt="hero" layout="fill" objectFit="cover"
                       objectPosition="top"/>
                <div className="text-4xl text-white z-0">
                    <span ref={el}/>
                </div>
            </div>
            <div className="w-full py-10 pl-20 flex justify-center bg-gray-100">
                <article className="w-3/5 prose">
                    <MDXLayoutRenderer
                        toc={toc}
                        mdxSource={mdxSource}
                        frontMatter={frontMatter}
                        prev={prev}
                        next={next}/>
                </article>
                <div className="ml-12 w-1/5 relative">
                    <TOCComponent
                        className="overflow-y-scroll sticky top-0 hidden lg:block no-scroll-theme"
                        toc={toc}/>
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
