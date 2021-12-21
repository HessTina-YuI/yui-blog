import { GetStaticProps, NextPage } from 'next';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import MemoCard from '@/components/MemoCard';
import { getAllFiles, IMemoAttribute } from '@/lib/memo';

interface StoryProps {
    allMemo: IMemoAttribute[];
}

const Story: NextPage<StoryProps> = ({ allMemo }) => {

    return (
        <PageLayout>
            <SectionContainer>
                <div
                    className="box-border w-full mx-auto pb-6 xl:masonry-3 md:masonry-2 before:box-inherit after:box-inherit">
                    {
                        allMemo?.map((value, index) => {
                            return <MemoCard key={index} memo={value}/>;
                        })
                    }
                </div>
            </SectionContainer>
        </PageLayout>
    );

};

export default Story;

export const getStaticProps: GetStaticProps = async ({}) => {
    const allMemo: IMemoAttribute[] = await getAllFiles('memo');

    return {
        props: { allMemo }
    };
};
