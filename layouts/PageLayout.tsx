import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';

type Props = {
    children: ReactNode
}

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
};

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <motion.main
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: 'linear', duration: .8 }}>
                <AnimatePresence initial={true}>
                    <div key={nanoid()}>
                        {children}
                    </div>
                </AnimatePresence>
            </motion.main>
        </>
    );
};

export default PageLayout;
