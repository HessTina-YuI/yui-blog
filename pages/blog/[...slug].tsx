import React, { useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
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
import SkipTool from '@/components/SkipTool';

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

    const [footnotes, setFootnotes] = useState<string>('');

    useEffect(() => {
        setFootnotes('.footnote-back');
    }, []);

    useEffect(() => {
        if (footnotes) {
            const items = document.querySelectorAll(footnotes);
            items.forEach((val) => {
                val.innerHTML = '←';
            });
        }
    }, [footnotes]);

    useEffect(() => {
        const options = {
            strings: [post.frontMatter.title],
            typeSpeed: 80,
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

    return (
        <PostLayout>
            <div className="w-full h-[60vh] sticky top-0 z-[-10] bg-cover flex justify-center items-center">
                <div className="w-full h-full relative">
                    <Image src={post.frontMatter.hero ?? ''} alt="hero" layout="fill" objectFit="cover"
                           objectPosition="top"/>
                </div>
                <div className="text-6xl text-white absolute z-0">
                    <span ref={el}/>
                </div>
                <div className="text-base text-white flex absolute bottom-10 z-0">
                    <div>
                        <span>文章发布于 {post.frontMatter.date}</span>
                    </div>
                    <div className="mx-10">
                        <span>文本字数约为 {(post.frontMatter.readingTime.words / 1000).toFixed(1)}k 字</span>
                    </div>
                    <div>
                        <span>阅读时长约为 {Math.ceil(post.frontMatter.readingTime.minutes)} 分钟</span>
                    </div>
                </div>
            </div>
            <div className="w-full py-10 pl-20 flex justify-center bg-gray-100">
                <div className="w-3/5 bg-white rounded-xl py-10 flex justify-center">
                    <article className="w-full prose">
                        <MDXLayoutRenderer
                            toc={post.toc}
                            mdxSource={post.mdxSource}
                            frontMatter={post.frontMatter}
                            prev={prev}
                            next={next}/>
                    </article>
                </div>
                <div className="ml-12 w-1/4 relative">
                    <div className="max-h-[500px] pl-5 py-5 rounded-xl bg-white sticky top-4">
                        <TOCComponent
                            className="h-full overflow-hidden overflow-y-scroll hidden lg:block prime-scroll-theme"
                            toc={post.toc}/>
                    </div>
                </div>
            </div>
            <SkipTool showHeight={400}
                      current={post.frontMatter.slug}
                      prev={prev ? prev.slug : null}
                      next={next ? next.slug : null}/>
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
    const prev = allPosts[postIndex - 1] || null;
    const next = allPosts[postIndex + 1] || null;
    // @ts-ignore
    const post = await getFileBySlug('blog', params.slug.join('/'));

    return {
        props: { post, prev, next }
    };
};
