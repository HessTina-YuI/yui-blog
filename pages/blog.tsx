import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Link from '@/components/Link';
import { getAllFilesFrontMatter, IFrontMatterAttribute } from '@/lib/mdx';

const variants = {
    initial: {
        y: -10,
        opacity: 0
    },
    show: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.2,
            duration: 0.5
        }
    })
};

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

export const POSTS_PER_PAGE = 4;

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
        setCurrentPage(currentPage - 1);
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <PageLayout>
            <SectionContainer>
                <button onClick={prev}>
                    prev
                </button>
                <button className="ml-4" onClick={next}>
                    next
                </button>
                <div className="w-full xl:w-2/3 grid grid-cols-1 xl:grid-cols-2">
                    {
                        list.map((value, index) => {
                            return (
                                <Link href={`/blog/${value.slug}`} key={value.slug}>
                                    <motion.div className="w-full h-40 p-2"
                                                style={{ backgroundColor: colors[index % 5] }}
                                                custom={index}
                                                initial="initial"
                                                animate="show"
                                                exit="show"
                                                variants={variants}>
                                        {value.slug}
                                    </motion.div>
                                </Link>
                            );
                        })
                    }
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
