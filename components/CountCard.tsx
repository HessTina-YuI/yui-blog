import React, { useEffect, useState } from 'react';
import { RiBookFill } from 'react-icons/ri';
import CountCardItem, { CountCardItemProps } from '@/components/CountCardItem';
import { IProps } from '@/interface/IProps';

interface CountCardProps extends IProps {
    blogCount: number;
    storyCount: number;
    collectionCount: number;
}

const CountCard: React.FC<CountCardProps> = ({ className, ...reset }) => {

    const [card, setCard] = useState<CountCardItemProps[]>();

    useEffect(() => {
        setCard([{
            name: '文章',
            count: reset.blogCount,
            description: '日常中我整理出来的一些在工作、学习的见闻',
            icon: <RiBookFill/>,
            url: '/blog'
        }, {
            name: '故事',
            count: reset.storyCount,
            description: '一些记录、短句、感悟',
            icon: <RiBookFill/>,
            url: '/story'
        }, {
            name: '收藏',
            count: reset.collectionCount,
            description: '关于我在编程方面常用的一些收藏',
            icon: <RiBookFill/>,
            url: '/collector'
        }
        ]);
    }, [reset.blogCount, reset.collectionCount, reset.storyCount]);

    return (
        <div className={`${className} flex`}>
            {
                card?.map(((value, index) =>
                        <CountCardItem key={value.name} {...value}
                                       className={`${index !== 0 ? 'ml-6' : ''}`}/>
                ))
            }
        </div>
    );
};

export default CountCard;
