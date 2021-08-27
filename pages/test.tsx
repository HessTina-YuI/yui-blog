import { NextPage } from 'next';
import { motion } from 'framer-motion';
import PageLayout from '@/layouts/PageLayout';

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
};


const Test: NextPage = () => {
    return (
        <>
            <PageLayout>
                <div className="w-full h-screen bg-blue-200"/>
            </PageLayout>
        </>
    );
};

export default Test;
