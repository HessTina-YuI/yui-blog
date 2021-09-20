import '@/css/tailwind.css';
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import { AnimatePresence } from 'framer-motion';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar>
                <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                >
                    <Component {...pageProps} key={router.route}/>
                </AnimatePresence>
            </Navbar>
        </ThemeProvider>
    );
};

export default MyApp;
