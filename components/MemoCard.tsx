import React from 'react';
import { IMemoAttribute } from '@/lib/memo';
import { motion } from 'framer-motion';

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
    return (
        <motion.div className="px-8 py-6 mb-6 bg-white rounded-lg break-inside"
                    custom={Math.cos(Math.PI * Math.random()) + 1}
                    initial="initial"
                    animate="show"
                    exit="show"
                    variants={variants}>
            <div>{memo.message}</div>
            {
                memo.author &&
                <div className="w-full mt-4 text-right">—— {memo.author}</div>
            }
        </motion.div>
    );
};

export default MemoCard;
