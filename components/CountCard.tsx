import React, { useEffect, useState } from 'react';
import { RiBookFill } from 'react-icons/ri';
import CountCardItem, { CountCardItemProps } from '@/components/CountCardItem';
import { IProps } from '@/lib/CommonProps';

interface CountCardProps extends IProps {

}

const CountCard: React.FC<CountCardProps> = ({ className }) => {

    const [card, setCard] = useState<Array<CountCardItemProps>>();

    useEffect(() => {
        setCard([{
            id: '1',
            name: '文章',
            count: 10,
            description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
            icon: <RiBookFill/>,
            url: '/article'
        }, {
            id: '2',
            name: '故事',
            count: 102,
            description: '',
            icon: <RiBookFill/>,
            url: '/story'
        }, {
            id: '3',
            name: '收藏',
            count: 1,
            description: '测试',
            icon: <RiBookFill/>,
            url: '/collector'
        }
        ]);
    }, []);

    return (
        <div className={`${className} flex`}>
            {
                card?.map(((value, index) =>
                        <CountCardItem key={value.id} {...value}
                                       className={`${index !== 0 ? 'ml-6' : ''}`}/>
                ))
            }
        </div>
    );
};

export default CountCard;
