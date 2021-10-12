import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { motion, useCycle } from 'framer-motion';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Link from '@/components/Link';
import { getAllFilesFrontMatter, IFrontMatterAttribute } from '@/lib/mdx';

const variantsParent = {
    show: {
        transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    },
    hidden: {
        transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
};

const variantsChildren = {
    show: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    hidden: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

export const POSTS_PER_PAGE = 5;

let i = 0;

// @ts-ignore
const Blog: NextPage = ({ posts, initialDisplayPosts, pagination }) => {

    const [isOpen, toggleOpen] = useCycle(false, true);

    const [test, setTest] = useState<Array<any>>([]);

    useEffect(() => {
        toggleOpen();
        setTest([{ name: 'a', id: i++ }, { name: 'a', id: i++ }, { name: 'a', id: i++ }, {
            name: 'a', id: i++
        }, { name: 'a', id: i++ }]);
    }, []);

    let b: NodeJS.Timeout | null = null;

    const a = () => {
        return setTimeout(() => {
            const b = [{ name: 'a', id: i++ }, { name: 'a', id: i++ }, { name: 'a', id: i++ }, {
                name: 'a',
                id: i++
            }, { name: 'a', id: i++ }];

            setTest(b);

            toggleOpen();
        }, 2000);
    };

    const click = () => {
        toggleOpen();

        setTimeout(() => {
            const b = [{ name: 'a', id: i++ }, { name: 'a', id: i++ }, { name: 'a', id: i++ }, { name: 'a', id: i++ },
                { name: 'a', id: i++ }];
            setTest(b);

            toggleOpen();
        }, 0.1 * 1000 * 5 + 100);
    };

    return (
        <PageLayout>
            <SectionContainer>
                <button onClick={click}>
                    add
                </button>
                <motion.div className="w-full xl:w-2/3 grid grid-cols-1 xl:grid-cols-2"
                            initial={false} animate={isOpen ? 'show' : 'hidden'}
                            variants={variantsParent}>
                    {
                        test.map((value, index) => {
                            return (
                                <Link href={`/blog/${value.name}`} key={value.id}>
                                    <motion.div className="w-full h-40 p-2"
                                                style={{ backgroundColor: colors[index % 5] }}
                                                variants={variantsChildren}>
                                    </motion.div>
                                </Link>
                            );
                        })
                    }
                </motion.div>
            </SectionContainer>
        </PageLayout>
    );

};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('blog');
    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE)
    };

    return { props: { initialDisplayPosts, posts, pagination } };
};

export default Blog;
