import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import PageLayout from '@/layouts/PageLayout';

const Loading: NextPage = () => {

    const router = useRouter();

    useEffect(() => {
        const { from, to } = router.query;
        to ? router.replace(Base64.decode(to.toString())) : router.push('404');
    }, []);

    return (
        <PageLayout>
            {/* todo: 加载动画 */}
        </PageLayout>
    );
};

export default Loading;
