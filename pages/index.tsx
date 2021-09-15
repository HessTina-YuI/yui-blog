import { NextPage } from 'next';
import { useEffect } from 'react';
import { Events, scroller } from 'react-scroll';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';

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
                <div className="w-full h-full">
                    <Banner/>
                </div>
            </SectionContainer>
        </PageLayout>
    );
};

export default Home;
