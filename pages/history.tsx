import { NextPage } from 'next';
import PageLayout from '@/layouts/PageLayout';
import Heatmap from '@/components/Heatmap';

const History: NextPage = () => {

    return (
        <PageLayout>
            <div className="w-full h-screen">
                <Heatmap/>
            </div>
        </PageLayout>
    );

};

export default History;
