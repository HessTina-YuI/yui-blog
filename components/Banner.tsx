import { motion } from 'framer-motion';
import { BiChevronsDown } from 'react-icons/bi';
import React from 'react';

type bannerProps = {
    downClick?: Function | null
}

const variants = {
    visible: {
        y: [-5, 5, -5],
        opacity: [0.2, 0.6, 1, 0.2]
    }
};

const Banner: React.FC<bannerProps> = ({ downClick }) => {
    return (
        <div className="relative w-full h-screen bg-fixed">
            <div className="w-full h-full bg-no-repeat bg-cover"
                 style={{ backgroundImage: 'url(/static/images/2021-02-17-01.png)' }}/>

            <div className="absolute bottom-4 w-full text-white text-4xl flex justify-center">
                <motion.div
                    animate="visible"
                    variants={variants}
                    transition={{ ease: 'easeInOut', duration: 1, repeat: Infinity }}
                >
                    <BiChevronsDown className="hover:cursor-pointer"
                                    onClick={() => {
                                        if (downClick) {
                                            downClick();
                                        }
                                    }}/>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
