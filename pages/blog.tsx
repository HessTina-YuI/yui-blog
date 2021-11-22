import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { RiSearch2Line } from 'react-icons/ri';
import PageLayout from '@/layouts/PageLayout';
import SectionContainer from '@/components/SectionContainer';
import { getAllFilesFrontMatter, getFilesFrontMatterByFileNames, IFrontMatterAttribute } from '@/lib/mdx';
import Card from '@/components/Card';
import Image from '@/components/Image';
import siteMetaData from '@/data/siteMetaData';
import toast from 'react-hot-toast';

export const POSTS_PER_PAGE = 5;

interface BlogProps {
    posts: IFrontMatterAttribute[];
    tops: IFrontMatterAttribute[];
    pagination: {
        currentPage: number;
        totalPages: number;
        total: number;
    };
}

const Blog: NextPage<BlogProps> = ({ posts, tops, pagination }) => {

    const [list, setList] = useState<IFrontMatterAttribute[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(pagination.currentPage);
    const [displayTop, setDisplayTop] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        let page: number = 1;
        if (router.query.page && typeof router.query.page === 'string') {
            page = parseInt(router.query.page, 0);
        }

        if (page > 1 && page <= pagination.totalPages) {
            setCurrentPage(page);
        }
    }, [pagination.totalPages, router.query.page]);

    useEffect(() => {
        setList(posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE));
    }, [currentPage, posts]);

    useEffect(() => {
        window.addEventListener('scroll', handlerScroller);

        return () => {
            window.removeEventListener('scroll', handlerScroller);
        };
    }, []);

    const prev = () => {
        if (currentPage > 1) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            setCurrentPage(currentPage - 1);
        }
    };

    const next = () => {
        if (currentPage < pagination.totalPages) {
            window.scrollTo({ top: 0, behavior: 'auto' });
            setCurrentPage(currentPage + 1);
        }
    };

    const topClick = (slug: string) => {
        router.push('/blog/[...slug]', '/blog/' + slug)
            .then(r => console.error(r));
    };

    const notify = () => toast('功能还在施工中');

    const handlerScroller = () => {
        const scroller = document.scrollingElement;
        if (!scroller) {
            return;
        }

        if (scroller.scrollTop > 80) {
            setDisplayTop(false);
        } else {
            setDisplayTop(true);
        }
    };

    return (
        <PageLayout>
            <SectionContainer>
                <div className="w-full h-[140px] flex items-end">
                    <div onClick={notify}
                         className="w-80 h-10 mb-6 rounded-full bg-white shadow-sm flex items-center hover:cursor-pointer">
                        <RiSearch2Line className="ml-3 text-2xl"/>
                        <span className="ml-4 text-sm text-gray-400">搜索文章标题</span>
                    </div>
                </div>
                <div className="w-full h-full flex">
                    <div className="w-full h-64 xl:w-2/3 grid grid-cols-1">
                        {
                            list.map((value, index) => {
                                return (
                                    <div className="h-60 mb-6" key={value.slug + index}>
                                        <Card index={index} post={value} url={`/blog/${value.slug}`}/>
                                    </div>
                                );
                            })
                        }
                        <div className="w-full h-20 mt-2 pb-4 grid grid-cols-2 gap-x-6">
                            <div className={`w-full flex justify-center items-center bg-white rounded-xl shadow-sm
                                    transition-all duration-300 hover:bg-blue-400 hover:text-white
                                    ${currentPage > 1 ? 'opacity-100' : 'opacity-0'}`}
                                 onClick={prev}>
                                上一页
                            </div>
                            <div className={`w-full flex justify-center items-center bg-white rounded-xl shadow-sm
                                    transition-all duration-300 hover:bg-blue-400 hover:text-white
                                    ${currentPage < pagination.totalPages ? 'opacity-100' : 'opacity-0'}`}
                                 onClick={next}>
                                下一页
                            </div>
                        </div>
                    </div>
                    <aside className="w-1/3 pl-10 pr-2 hidden xl:block">
                        <div className="w-full bg-white rounded-2xl pt-1">
                            <div className={`w-60 h-60 mx-auto rounded-2xl transition-all duration-500 overflow-hidden
                                            ${displayTop ? '-mt-32' : 'mt-10'}`}>
                                <Image src={siteMetaData.avatar} alt="avatar" layout="fill"
                                       objectFit="cover"/>
                            </div>
                            <div className="my-8 text-3xl flex justify-center">
                                HessTina YuI
                            </div>
                            <div className="w-full px-8 pt-4 pb-8 bg-blue-100 rounded-b-2xl">
                                <div className="mb-4 border-dashed">
                                    置顶文章
                                </div>
                                {
                                    tops.map((value, index) => (
                                            <div key={index} onClick={() => topClick(value.slug)}
                                                 className="w-full py-4 rounded-xl bg-white flex justify-center transition-shadow duration-300
                                                    hover:cursor-pointer hover:shadow-lg">
                                                {value.title}
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </aside>
                </div>
            </SectionContainer>
        </PageLayout>
    );

};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllFilesFrontMatter('blog');

    const tops = await getFilesFrontMatterByFileNames('blog', siteMetaData.topBlog);

    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
        total: posts.length
    };

    return { props: { posts, tops, pagination } };
};

export default Blog;
