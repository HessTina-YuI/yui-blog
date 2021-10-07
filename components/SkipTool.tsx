import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { animateScroll } from 'react-scroll';
import toast from 'react-hot-toast';
import { IoChevronBackOutline, IoChevronForwardOutline, IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5';

interface SkipToolProps {
    showHeight?: number;
    current: string | URL;
    prev?: string | URL | null;
    next?: string | URL | null;
}

let VALID_HEIGHT: number = 0;

const SkipTool: React.FC<SkipToolProps> = ({ ...props }) => {

        const [process, setProcess] = useState<number>(0);
        const [show, setShow] = useState<boolean>(false);

        const router = useRouter();

        useEffect(() => {
            const bindHandleScroll = (event: any) => {

                const scrollTop = event.target.documentElement.scrollTop;
                const process = Math.floor(scrollTop * 100 / VALID_HEIGHT);

                const showHeight = props.showHeight ?? 0;

                if (scrollTop >= showHeight) {
                    setShow(true);
                } else if (scrollTop < showHeight) {
                    setShow(false);
                }

                setProcess(process > 100 ? 100 : process);
            };

            window.addEventListener('scroll', bindHandleScroll);

            const browserHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
            const visualHeight = window.innerHeight || document.documentElement.clientHeight;

            VALID_HEIGHT = browserHeight - visualHeight;

            const showHeight = props.showHeight ?? 0;
            if (document.body.scrollTop > showHeight) {
                setShow(true);
            }

            return () => {
                window.removeEventListener('scroll', bindHandleScroll);
            };
        }, [props.showHeight]);

        const prevClick = () => {
            if (props.prev) {
                router.push('/blog/[...slug]', '/blog/' + props.prev)
                    .then(r => {
                    });
            } else {
                toast('已经是第一篇了');
            }
        };

        const nextClick = () => {
            if (props.next) {
                router.push('/blog/[...slug]', '/blog/' + props.next)
                    .then(r => {
                    });
            } else {
                toast('已经是最后一篇了');
            }
        };

        return (
            <div className={`w-40 h-9 fixed bottom-2 z-10 transition duration-500 ease-in-out 
                        ${show ? 'translate-y-0' : 'translate-y-12'}`}
                 style={{ right: '10vw' }}>
                <ul className="w-full h-full pt-2 rounded-tl-xl rounded-tr-xl bg-white flex text-xl">
                    {/* pre article */}
                    <li className="w-1/4 flex justify-center hover:cursor-pointer" onClick={prevClick}>
                        <IoChevronBackOutline/>
                    </li>
                    {/* to top */}
                    <li className="w-1/4 flex justify-center hover:cursor-pointer"
                        onClick={() => animateScroll.scrollToTop()}>
                        <IoArrowUpOutline/>
                    </li>
                    {/* to bottom */}
                    <li className="w-1/4 flex justify-center hover:cursor-pointer"
                        onClick={() => animateScroll.scrollToBottom()}>
                        <IoArrowDownOutline/>
                    </li>
                    {/* next article */}
                    <li className="w-1/4 flex justify-center hover:cursor-pointer" onClick={nextClick}>
                        <IoChevronForwardOutline/>
                    </li>
                </ul>
                <div className="w-full h-1 rounded-bl-xl rounded-br-xl bg-blue-500" style={{ width: `${process}%` }}/>
            </div>
        );
    }
;

export default SkipTool;
