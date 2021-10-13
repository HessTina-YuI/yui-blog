import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import { getAllFilesFrontMatter, IFrontMatterAttribute } from '@/lib/mdx';
import Card from '@/components/Card';

export const POSTS_PER_PAGE = 5;

// @ts-ignore
const Blog: NextPage = ({ posts, pagination }) => {

    const [list, setList] = useState<IFrontMatterAttribute[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(pagination.currentPage);

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

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const next = () => {
        if (currentPage < pagination.totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <PageLayout>
            <SectionContainer>
                <div className="w-full xl:w-2/3 grid grid-cols-1">
                    {
                        list.map((value, index) => {
                            return <Card key={value.slug} index={index} post={value} url={`/blog/${value.slug}`}/>;
                        })
                    }
                </div>
                <div className="w-full xl:w-2/3 h-20 mt-2 pb-4 grid grid-cols-2 gap-x-6">
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
            </SectionContainer>
        </PageLayout>
    );

};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('blog');
    // const posts = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }, { slug: 'd' }, { slug: 'e' }, { slug: 'f' }, { slug: 'g' }, { slug: 'h' }, { slug: 'i' }];
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
        total: posts.length
    };

    return { props: { posts, pagination } };
};

export default Blog;
