import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import chroma from 'chroma-js';
import { IMemoAttribute } from '@/lib/memo';

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

interface MemoCardProps {
    memo: IMemoAttribute;
}

const MemoCard: React.FC<MemoCardProps> = ({ memo }) => {
    const [color] = useState<string>(chroma(chroma.random()).darken(1).css());

    return (
        <motion.div className="pr-4 pt-5 mb-4"
                    custom={Math.cos(Math.PI * Math.random()) + 1}
                    initial="initial"
                    animate="show"
                    exit="show"
                    variants={variants}>
            <div className="px-8 py-6 bg-white rounded-lg break-inside relative">
                <div className="w-16 h-16 absolute -right-5 -top-5 rounded-full border-8 border-gray-100
                                text-white text-lg flex justify-center items-center"
                     style={{ backgroundColor: color }}>
                    {format(new Date(memo.date), 'MM')}月
                </div>
                <div className="mt-4">{memo.message}</div>
                {
                    memo.author ?
                        <div className="w-full mt-4 text-right">—— {memo.author}</div>
                        : <div className="mt-4"/>
                }
            </div>
        </motion.div>
    );
};

export default MemoCard;
