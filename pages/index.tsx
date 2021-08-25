import { NextPage } from 'next';
import SectionContainer from '@/components/SectionContainer';
import Header from '@/components/Header';

const Home: NextPage = () => {
    return (
        <>
            <Header/>
            <SectionContainer>
                <div className="w-full h-screen bg-white"/>
                <div className="w-full h-screen bg-red-300"/>
            </SectionContainer>
        </>
    );
};

export default Home;