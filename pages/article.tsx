import { NextPage } from 'next';
import PageLayout from '@/layouts/PageLayout';
import Link from '@/components/Link';

const Article: NextPage = () => {

    return (
        <PageLayout>
            <div className="w-full h-screen bg-blue-700">
                <Link href={"/blog/a"}>
                    aaaaaaaaaaaaaaa
                </Link>
            </div>
        </PageLayout>
    );

};

export default Article;
