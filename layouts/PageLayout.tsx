import React, { Fragment, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
    children: ReactNode
}

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'easy-in-out', delay: 2, duration: 1 }
};

const PageLayout: React.FC<Props> = ({ children }) => {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}>
            <AnimatePresence initial={true}>
                <Fragment key={useRouter().route}>
                    {children}
                </Fragment>
            </AnimatePresence>
        </motion.div>

    );
};

export default PageLayout;
