import '@/css/tailwind.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import { AnimatePresence } from 'framer-motion';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <Header/>
            <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <Component {...pageProps} key={router.route}/>
            </AnimatePresence>
        </ThemeProvider>
    );
};

export default MyApp;
