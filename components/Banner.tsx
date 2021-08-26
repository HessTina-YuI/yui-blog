import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { BiChevronsDown } from 'react-icons/bi';

const Banner: NextPage = () => {
    return (
        <div className="relative w-full h-screen bg-fixed">
            <div className="w-full h-full bg-blue-400 bg-no-repeat bg-cover"
                 style={{ backgroundImage: 'url(/static/images/2021-02-17-01.png)' }}/>

            <div className="absolute bottom-4 w-full text-white text-4xl flex justify-center">
                <motion.div
                    animate="visible"
                    variants={{
                        visible: {
                            y: [-5, 5, -5],
                            opacity: [0.2, 0.6, 1, 0.2]
                        }
                    }}
                    transition={{ ease: 'easeInOut', duration: 1, repeat: Infinity }}
                >
                    <BiChevronsDown className="hover:cursor-pointer"/>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
