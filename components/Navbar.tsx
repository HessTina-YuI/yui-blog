import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    BiArrowToLeft, BiArrowToRight, BiHomeAlt,
    BiBookContent, BiHistory, BiPencil, BiBox
} from 'react-icons/bi';
import NavbarItem from '@/components/NavbarItem';
import { Url } from 'url';

let waitAnimationEnd: boolean = true;
const initWidth = 10;
const narrowWidth = 5;

const Navbar: React.FC = ({ children }) => {

    const router = useRouter();
    const [navWidth, setNavWidth] = useState<number>(initWidth);
    const [navOpen, setNavOpen] = useState<boolean>(true);
    const [navMouseOn, setNavMouseOn] = useState<boolean>(false);

    useEffect(() => {
        navOpen ? setNavWidth(initWidth) : setNavWidth(narrowWidth);
    }, [navOpen]);

    const navRouteClick = (url: Url | string) => {
        router.replace(url).then(r => r ? null : console.error(`${url} is  ${r}`));
    };

    const navOpenClick = () => {
        setNavOpen(!navOpen);

        setNavMouseOn(false);
        waitAnimationEnd = false;
        setTimeout(() => {
            waitAnimationEnd = true;
        }, 500);
    };

    const navMouseOver = () => {
        waitAnimationEnd ? setNavMouseOn(true) : null;
    };

    const navMouseLeave = () => {
        waitAnimationEnd ? setNavMouseOn(false) : null;
    };

    return (
        <>
            <nav
                className="h-full px-6 fixed top-0 left-0 z-20 text-white text-2xl bg-black transition-all duration-500 overflow-visible"
                style={{ width: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}>
                <div className="w-full h-32 mt-2 mb-4">
                    <div className="my-2 pl-1.5 rounded-lg flex items-center hover:cursor-pointer">
                    </div>
                </div>
                <div>
                    <NavbarItem.Item navOpen={navOpen} title="首页" onClick={() => navRouteClick('/')}>
                        <NavbarItem.Icon><BiHomeAlt/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="文章" onClick={() => navRouteClick('/article')}>
                        <NavbarItem.Icon><BiBookContent/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="记录" onClick={() => navRouteClick('/history')}>
                        <NavbarItem.Icon><BiHistory/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="故事" onClick={() => navRouteClick('/story')}>
                        <NavbarItem.Icon><BiPencil/></NavbarItem.Icon>
                    </NavbarItem.Item>
                    <NavbarItem.Item navOpen={navOpen} title="收藏" onClick={() => navRouteClick('/collector')}>
                        <NavbarItem.Icon><BiBox/></NavbarItem.Icon>
                    </NavbarItem.Item>
                </div>
            </nav>
            <div
                className={`w-12 h-12 rounded-xl rotate-45 transition-all duration-500 ease-in-out hover:cursor-pointer
                            fixed z-10 top-16 bg-black ${navMouseOn ? '-translate-x-7' : '-translate-x-14'}`}
                style={{ left: `${navWidth}rem` }} onMouseOver={navMouseOver} onMouseLeave={navMouseLeave}
                onClick={navOpenClick}>
                <div className="-rotate-45">
                    {navOpen ?
                        <BiArrowToLeft className="text-xl text-white translate-x-4 translate-y-2"/> :
                        <BiArrowToRight className="text-xl text-white translate-x-4 translate-y-2"/>
                    }
                </div>
            </div>
            <main className="relative transition-all duration-500"
                  style={{ width: `calc(100% - ${navWidth}rem)`, left: `${navWidth}rem` }}>
                {children}
            </main>
        </>
    );
};

export default Navbar;
