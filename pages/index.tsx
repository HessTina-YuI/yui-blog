import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { Events, scroller } from 'react-scroll';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import CountCard from '@/components/CountCard';

const Home: NextPage = () => {

    useEffect(() => {
        Events.scrollEvent.register('begin', () => {
        });
        Events.scrollEvent.register('end', () => {
        });

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    const downClick = () => {
        scroller.scrollTo('container', {
            duration: 1500,
            delay: 0,
            smooth: 'easeInOutQuint'
        });
    };

    return (
        <PageLayout>
            <SectionContainer>
                <Banner className="w-full h-3/5"/>
                <CountCard className="w-full h-2/5"/>
            </SectionContainer>
        </PageLayout>
    );
};

export default Home;
