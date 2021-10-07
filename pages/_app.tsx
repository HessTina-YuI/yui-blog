import '@/css/tailwind.css';
import '@/css/prism.css';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import React from 'react';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <Toaster/>
            <Navbar>
                <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                >
                    <Component {...pageProps} key={router.asPath}/>
                </AnimatePresence>
            </Navbar>
        </ThemeProvider>
    );
};

export default MyApp;
