import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import { getAllFilesFrontMatter, IFrontMatterAttribute } from '@/lib/mdx';
import Card from '@/components/Card';
import Image from '@/components/Image';
import siteMetaData from '@/data/siteMetaData';

export const POSTS_PER_PAGE = 5;

interface BlogProps {
    posts: IFrontMatterAttribute[];
    pagination: {
        currentPage: number;
        totalPages: number;
        total: number;
    };
}

const Blog: NextPage<BlogProps> = ({ posts, pagination }) => {

    const [list, setList] = useState<IFrontMatterAttribute[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(pagination.currentPage);
    const [displayTop, setDisplayTop] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        let page: number = 1;
        if (router.query.page && typeof router.query.page === 'string') {
            page = parseInt(router.query.page, 0);
        }

        if (page > 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    }, [router.query.page]);

    useEffect(() => {
        setList(posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE));
    }, [currentPage]);

    useEffect(() => {
        window.addEventListener('scroll', handlerScroller);

        return () => {
            window.removeEventListener('scroll', handlerScroller);
        };
    }, []);

    const prev = () => {
        if (currentPage > 1) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            setCurrentPage(currentPage - 1);
        }
    };

    const next = () => {
        if (currentPage < pagination.totalPages) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            setCurrentPage(currentPage + 1);
        }
    };

    const handlerScroller = () => {
        const scroller = document.scrollingElement;
        if (!scroller) {
            return;
        }

        if (scroller.scrollTop > 80) {
            setDisplayTop(false);
        } else {
            setDisplayTop(true);
        }
    };

    return (
        <PageLayout>
            <SectionContainer>
                <div className="w-full h-[140px]"/>
                <div className="w-full h-full flex">
                    <div className="w-full h-64 xl:w-2/3 grid grid-cols-1">
                        {
                            list.map((value, index) => {
                                return (
                                    <div className="h-60 mb-6" key={value.slug + index}>
                                        <Card index={index} post={value} url={`/blog/${value.slug}`}/>
                                    </div>
                                );
                            })
                        }
                        <div className="w-full h-20 mt-2 pb-4 grid grid-cols-2 gap-x-6">
                            <div className={`w-full flex justify-center items-center bg-white rounded-xl shadow-sm
                                    transition-all duration-300 hover:bg-blue-400 hover:text-white
                                    ${currentPage > 1 ? 'opacity-100' : 'opacity-0'}`}
                                 onClick={prev}>
                                上一页
                            </div>
                            <div className={`w-full flex justify-center items-center bg-white rounded-xl shadow-sm
                                    transition-all duration-300 hover:bg-blue-400 hover:text-white
                                    ${currentPage < pagination.totalPages ? 'opacity-100' : 'opacity-0'}`}
                                 onClick={next}>
                                下一页
                            </div>
                        </div>
                    </div>
                    <aside className="w-1/3 pl-10 pr-2 hidden xl:block">
                        <div className="w-full bg-white rounded-2xl pt-1">
                            <div className={`w-60 h-60 mx-auto rounded-2xl transition-all duration-500 overflow-hidden
                                            ${displayTop ? '-mt-32' : 'mt-10'}`}>
                                <Image src={siteMetaData.avatar} alt="avatar" layout="fill"
                                       objectFit="cover"/>
                            </div>
                            <div className="my-8 text-3xl flex justify-center">
                                HessTina YuI
                            </div>
                            <div className="w-full h-60 bg-blue-100 rounded-b-2xl">

                            </div>
                        </div>
                    </aside>
                </div>
            </SectionContainer>
        </PageLayout>
    );

};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('blog');

    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
        total: posts.length
    };

    return { props: { posts, pagination } };
};

export default Blog;
