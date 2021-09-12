import { NextPage } from 'next';
import PageLayout from '@/layouts/PageLayout';

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
