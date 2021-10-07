import { NextPage } from 'next';
import { motion } from 'framer-motion';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Link from '@/components/Link';

const item = ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];

const variantsParent = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4
        }
    }
};

const variantsChildren = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
};

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

const Blog: NextPage = () => {

    return (
        <PageLayout>
            <SectionContainer>
                <motion.div className="w-full xl:w-2/3 grid grid-cols-1 xl:grid-cols-2"
                            initial="hidden" animate="show" exit="show"
                            variants={variantsParent}>
                    {
                        item.map((value, index) => {
                            return (
                                <Link href={`/blog/${value}`} key={index}>
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

export default Blog;
