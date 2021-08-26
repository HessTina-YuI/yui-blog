import { NextPage } from 'next';
import SectionContainer from '@/components/SectionContainer';
import Banner from '@/components/Banner';
import Header from '@/components/Header';

const Home: NextPage = () => {
    return (
        <>
            <Header/>
            <Banner/>
            <SectionContainer>
                <div className="w-full h-screen bg-yellow-50"/>
                <div className="w-full h-screen bg-red-300"/>
            </SectionContainer>
        </>
    );
};

export default Home;
