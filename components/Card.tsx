import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from '@/components/Link';
import { IFrontMatterAttribute } from '@/lib/mdx';

const variants = {
    initial: {
        y: -10,
        opacity: 0
    },
    show: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.4,
            duration: 1
        }
    })
};

interface CardProps {
    post: IFrontMatterAttribute;
    index: number;
    url: URL | string;
}

interface ContentProps {
    post: IFrontMatterAttribute;
    url: URL | string;
    hover: boolean;
}

const colors = ['#33425B', '#5BAAEC', '#526ED0', '#484CB0'];

const Card: React.FC<CardProps> = ({ ...reset }) => {

    const [hover, setHover] = useState<boolean>(false);

    const hoverStart = () => {
        setHover(true);
    };

    const hoverEnd = () => {
        setHover(false);
    };

    return (
        <Link href={reset.url}>
            <motion.div className="w-full h-60 my-2 bg-white rounded-xl shadow-lg overflow-hidden"
                        custom={reset.index}
                        initial="initial"
                        animate="show"
                        exit="show"
                        variants={variants}
                        onHoverStart={hoverStart}
                        onHoverEnd={hoverEnd}>
                {
                    reset.index % 2 == 0 ?
                        <RightContent url={reset.url} hover={hover} post={reset.post}/> :
                        <LeftContent url={reset.url} hover={hover} post={reset.post}/>
                }
            </motion.div>
        </Link>
    );
};

const RightContent: React.FC<ContentProps> = ({ ...reset }) => {

    const post: IFrontMatterAttribute = reset.post;

    return (
        <div className="w-full h-full relative overflow-hidden flex">
            <div className="w-2/5 h-full transition-transform overflow-hidden">
                <div className={`w-full h-full transition-transform duration-500 bg-no-repeat bg-center
                                     ${reset.hover ? 'scale-110 -rotate-1' : ''}`}
                     style={{ backgroundImage: 'url(/static/images/2021-02-20-01.png)' }}/>
            </div>
            <div className="w-2/5 h-full bg-l-mask absolute top-0 left-0 z-10"/>
            <div className="w-3/5 h-full pl-4">
                <div className="text-3xl mt-6">
                    {post.title}
                </div>
                <div className="mt-2">
                    {
                        post.tags?.map((value, index) => {
                            return <span key={index} className="text-sm mr-2 px-2 py-1 rounded-lg text-white"
                                         style={{ backgroundColor: colors[index] }}>
                                {value}
                            </span>;
                        })
                    }
                </div>
                <p className="w-full h-20 mt-4 leading-relaxed line-clamp-3" style={{ textIndent: '2rem' }}>
                    {post.summary}
                </p>
                <div>
                    test test
                </div>
            </div>
        </div>
    );
};

const LeftContent: React.FC<ContentProps> = ({ ...reset }) => {

    const post: IFrontMatterAttribute = reset.post;

    return (
        <div className="w-full h-full relative overflow-hidden flex flex-row-reverse">
            <div className="w-2/5 h-full transition-transform overflow-hidden">
                <div className={`w-full h-full transition-transform duration-500 bg-no-repeat bg-center
                                     ${reset.hover ? 'scale-110 rotate-1' : ''}`}
                     style={{ backgroundImage: 'url(/static/images/2021-02-20-01.png)' }}/>
            </div>
            <div className="w-2/5 h-full bg-r-mask absolute top-0 right-0 z-10"/>
            <div className="w-3/5 h-full pl-6">
                <div className="text-3xl mt-6">
                    {post.title}
                </div>
                <div className="mt-2">
                    {
                        post.tags?.map((value, index) => {
                            return <span key={index} className="text-sm mr-2 px-2 py-1 rounded-lg text-white"
                                         style={{ backgroundColor: colors[index] }}>
                                {value}
                            </span>;
                        })
                    }
                </div>
                <p className="w-full h-20 mt-4 leading-relaxed line-clamp-3" style={{ textIndent: '2rem' }}>
                    {post.summary}
                </p>
                <div>
                    test test
                </div>
            </div>
        </div>
    );
};

export default Card;