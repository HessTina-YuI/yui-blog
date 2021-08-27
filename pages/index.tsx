import { NextPage } from 'next';
import { motion } from 'framer-motion';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import PageLayout from '@/layouts/PageLayout';

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
};

const Home: NextPage = () => {

    const downClick = () => {
        console.log('xxxxxxxx');
    };

    return (
        <>
            <PageLayout>
                <Banner downClick={downClick}/>
                <SectionContainer>
                    <div className="w-full h-screen bg-yellow-50"/>
                    <div className="w-full h-screen bg-red-300"/>
                </SectionContainer>
            </PageLayout>
        </>
    );
};

export default Home;
