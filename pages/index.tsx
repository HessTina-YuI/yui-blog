import { NextPage } from 'next';
import React from 'react';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import CountCard from '@/components/CountCard';
import ToolTip from '@/components/ToolTip';

const Home: NextPage = () => {

    return (
        <PageLayout>
            <SectionContainer>
                <Banner className="w-full h-3/5"/>
                <div className="w-full h-52 mt-2 pb-4 flex overflow-x-scroll overflow-y-hidden">
                    <ToolTip className="h-full pr-6 flex-grow"/>
                    <CountCard className="h-full flex-none"/>
                </div>
            </SectionContainer>
        </PageLayout>
    );
};

export default Home;
