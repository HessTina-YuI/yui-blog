import { NextPage } from 'next';
import { useEffect } from 'react';
import { Element, Events, scroller } from 'react-scroll';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import PageLayout from '@/layouts/PageLayout';

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
    });

    const downClick = () => {
        scroller.scrollTo('container', {
            duration: 1500,
            delay: 0,
            smooth: 'easeInOutQuint'
        });
    };

    return (
        <PageLayout>
            <Banner downClick={downClick}/>
            <Element name="container"/>
            <SectionContainer>
                <div className="w-full h-screen bg-yellow-50"/>
                <div className="w-full h-screen bg-red-300"/>
            </SectionContainer>
        </PageLayout>
    );
};

export default Home;
