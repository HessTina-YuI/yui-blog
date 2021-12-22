import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import CountCard from '@/components/CountCard';
import Tip from '@/components/Tip';
import siteMetaData from '@/data/siteMetaData';
import { getAllFilesCount } from '@/lib/mdx';
import { getAllFiles, IMemoAttribute } from '@/lib/memo';

interface HomeProps {
    blogCount: number;
    storyCount: number;
    collectionCount: number;
}

const Home: NextPage<HomeProps> = ({ blogCount, storyCount, collectionCount }) => {

    const images = siteMetaData.banner;

    return (
        <PageLayout>
            <SectionContainer>
                <Banner className="w-full h-3/5" images={images}/>
                <div className="w-full h-60 mt-2 pb-4 flex overflow-x-scroll overflow-y-hidden">
                    <Tip className="h-full pr-6 flex-grow"/>
                    <CountCard className="h-full flex-none" blogCount={blogCount} storyCount={storyCount}
                               collectionCount={collectionCount}/>
                </div>
            </SectionContainer>
        </PageLayout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const blogCount: number = await getAllFilesCount('blog');

    const memo: IMemoAttribute[] = await getAllFiles('memo');
    const storyCount = memo.length;

    const collectionCount = 0;

    return { props: { blogCount, storyCount, collectionCount } };
};
