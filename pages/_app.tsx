import '@/css/tailwind.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider attribute="class">
            <Component { ...pageProps } />
        </ThemeProvider>
    );
};

export default MyApp;
