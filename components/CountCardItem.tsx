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
        <div className={`${className} w-full h-full p-4 xl:p-6 bg-white rounded-2xl shadow-lg relative`}>
            <div className="flex justify-between">
                <div className="inline-block p-3 xl:p-4 rounded-lg bg-blue-500 text-2xl xl:text-4xl text-white">
                    {props.icon}
                </div>
                <span className="mr-4 text-2xl xl:text-4xl">{props.count}</span>
            </div>
            <div className="mt-2 xl:mt-4 font-bold text-2xl">
                {props.name}
            </div>
            <div className="w-full h-2/5 xl:h-1/5 mt-2 overflow-hidden">
                {props.description}
            </div>
            <Link href={props.url ? props.url : '#'}>
                <div
                    className="w-20 h-8 bg-blue-500 rounded-full absolute bottom-4 right-6 xl:right-9">
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
