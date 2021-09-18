import React from 'react';
import { ImArrowRight2 } from 'react-icons/im';
import { Url } from 'url';
import { motion } from 'framer-motion';
import { IProps } from '@/lib/CommonProps';
import Link from '@/components/Link';

export interface CountCardItemProps extends IProps {
    id?: string;
    name?: string;
    count?: number;
    description?: string;
    icon?: React.ReactNode;
    url?: Url | string;
}

const variants = {
    hover: {
        x: [0, 6, 0],
        transition: { type: 'linear', repeat: Infinity }
    }
};

const CountCardItem: React.FC<CountCardItemProps> = ({ className, ...props }) => {
    return (
        <div className={`${className} w-60 h-full p-4 bg-white rounded-2xl shadow-lg`}>
            <div className="h-1/4 flex justify-between">
                <div className="inline-block p-2 rounded-lg bg-blue-500 text-2xl text-white">
                    {props.icon}
                </div>
                <span className="mr-4 text-2xl xl:text-4xl">{props.count}</span>
            </div>
            <div className="mt-2 font-bold text-xl">
                {props.name}
            </div>
            <div className="w-full h-1/3 mt-1 text-xs overflow-hidden">
                {props.description}
            </div>
            <Link href={props.url ? props.url : '#'}>
                <div
                    className="w-20 h-8 -mt-2 bg-blue-500 rounded-full float-right">
                    <motion.div className="w-full h-full flex justify-center items-center"
                                whileHover="hover"
                                variants={variants}>
                        <ImArrowRight2 className="text-white text-2xl"/>
                    </motion.div>
                </div>
            </Link>
        </div>
    );
};

export default CountCardItem;
