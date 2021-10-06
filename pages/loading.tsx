import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import PageLayout from '@/layouts/PageLayout';

const Loading: NextPage = () => {

    const router = useRouter();

    useEffect(() => {
        const { url } = router.query;
        url ? router.push(Base64.decode(url.toString())) : router.push('404');
    }, []);

    return (
        <PageLayout>
            {/* todo: 加载动画 */}
        </PageLayout>
    );
};

export default Loading;
